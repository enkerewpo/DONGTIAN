# first get the full diff of the changes from uncommit to HEAD
# should contain all line changes

# first parse input args
# ./deploy.ps1 [-c]

Function Write-Log {
    param(
        [string]$Message = '',
        [ValidateSet('Info', 'Warning', 'Error', 'Success', 'Verbose', 'Debug')]
        [string]$Severity = 'Info',
        [switch]$LogToFile,
        [string]$LogFileName
    )
    If (!($LogFileName)) {
        # LogFile parameter not specified (null), so determine one
        $LogFolder = $PSScriptRoot
        $LogName = Split-Path -Path $MyInvocation.ScriptName
        $LogFileName = Join-Path -Path $LogFolder -ChildPath ('{0}-{1}.log' -f [string](Get-Date -format "yyyyMMdd"), $LogName)
    }
    $datetime = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $SERVERY = $Severity.ToUpper()
    $hostname = $env:COMPUTERNAME
    $FormattedMessage = '[{0}] [{1}] [{2}] {3}' -f $datetime, $hostname, $SERVERY, $Message
    Switch ($Severity) {
        'Warning' {
            Write-Host $FormattedMessage -ForegroundColor $host.PrivateData.WarningForegroundColor -BackgroundColor $host.PrivateData.WarningBackgroundColor
        }
        'Error' {
            Write-Host $FormattedMessage -ForegroundColor $host.PrivateData.ErrorForegroundColor -BackgroundColor $host.PrivateData.ErrorBackgroundColor        
        }
        'Verbose' {
            Write-Host $FormattedMessage -ForegroundColor $host.PrivateData.VerboseForegroundColor -BackgroundColor $host.PrivateData.VerboseBackgroundColor
        }
        'Success' {
            # green text
            Write-Host $FormattedMessage -ForegroundColor Green
        }
        'Info' {
            Write-Host $FormattedMessage
        }
        'Debug' {
            # Only log debug messages if debug stream shown
            If ($DebugPreference -ine 'SilentlyContinue') {
                $FormattedMessage = '[DEBUG] {0}' -f $Message
                Write-Host $FormattedMessage -ForegroundColor $host.PrivateData.DebugForegroundColor -BackgroundColor $host.PrivateData.DebugBackgroundColor
            }
            # Never log debug messages to file
            $LogToFile = $false
        }
        Default {
            $FormattedMessage = '{0}' -f $Message
            Write-Host $FormattedMessage
        }
    }
    If ($LogToFile) {
        [pscustomobject]@{
            Time     = [string](Get-Date -format 'yyyyMMddHHmmss')
            Severity = $Severity
            Message  = $Message
        } | Export-Csv -Path $LogFileName -Append -NoTypeInformation   
    }
}

# Write-Host "args: $args"

$commit = $false

if ($args -contains "-c") {
    $commit = $true
}
# read openai.json
$openai = Get-Content openai.json | ConvertFrom-Json
$url = $openai.url
$key = $openai.key
$scp_host = $openai.scp_host
$scp_user = $openai.scp_user
$scp_password = $openai.scp_password
$scp_target_folder = $openai.scp_target_folder

Write-Log -Severity Info -Message "Welcome to deploy script(wheatfox<enkerewpo@hotmail.com>)"

if ($commit) {
    Write-Log -Severity Info -Message "commit is true"

    $diff = git diff HEAD

    # output to tmp_diff.txt
    $diff | Out-File -FilePath tmp_diff.txt

    Write-Log -Severity Warning -Message "url: $url key: $key"

    # ask openai to understand the diff and generate a summary as commit message

    # generate a list of history of the changes, each item is a dictionary with keys: role, content
    # role: user or assistant, we are user
    $history = New-Object System.Collections.ArrayList


    # curl https://{url}/chat/completions \
    # -H "Content-Type: application/json" \
    # -H "Authorization: Bearer $OPENAI_API_KEY" \
    # -d '{
    #    "model": "gpt-4",
    #    "messages": [{"role": "user", "content": "Say this is a test!"}],
    #    "temperature": 0.7
    #  }'

    $content = "Please review the changes and generate a commit message no more then 10 words, for example: 'fix./feat./... : {one sentence summary of the changes}'. diff: $diff"
    $content = $content -replace "`r`n", " "
    $history.Add(@{role = "user"; content = $content })

    # convert history to json
    $history_json = $history | ConvertTo-Json

    # remove any \n or \r
    $history_json = $history_json -replace "`r`n", " "

    # Write-Host "history_json: $history_json"

    # call openai to generate a commit message
    $payload = @{
        'model'       = 'gpt-4'
        'messages'    = $history
        'temperature' = 0.7
    }

    $payload_json = $payload | ConvertTo-Json

    # use built-in Invoke-RestMethod to call openai
    $full_url = "$url/chat/completions"
    $headers = @{
        'Content-Type'  = 'application/json'
        'Authorization' = 'Bearer ' + $key
    }
    $response = Invoke-RestMethod -Uri $full_url -Method Post -Headers $headers -Body $payload_json
    $choices = $response.choices[0].message.content
    # Write-Host "response: $choices"
    Write-Log -Severity Info -Message "commit message: $choices"

    git add .
    git commit -m $choices
    git push

}

# Write-Host "copying core.db to target"
Write-Log -Severity Info -Message "copying core.db to target"

# first generate a hash file of core.db so we don't need to copy it if it's the same

$hash = Get-FileHash core.db -Algorithm SHA256 | Select-Object -ExpandProperty Hash

# Write-Host "hash current core.db: $hash"
Write-Log -Severity Info -Message "hash current core.db: $hash"

# if hash file don't exist, create it with empty content
if (-not (Test-Path core.db.hash)) {
    New-Item -Path core.db.hash -ItemType file
}

$old_hash = Get-Content core.db.hash
# Write-Host "old hash: $old_hash"
Write-Log -Severity Info -Message "old hash: $old_hash"

if ($hash -eq $old_hash) {
    # Write-Host "core.db is the same, no need to copy"
    Write-Log -Severity Info -Message "core.db is the same, no need to copy"
}
else {
    # Write-Host "core.db is different, copying"
    Write-Log -Severity Info -Message "core.db is different, copying"
    $hash | Out-File -FilePath core.db.hash
    $pscp_param = '-pw ' + '"' + $scp_password + '"' + ' core.db ' + $scp_user + '@' + $scp_host + ':' + $scp_target_folder + '/core.db'
    $cmd = 'pscp ' + $pscp_param
    Write-Host "cmd: $cmd"
    Write-Log -Severity Info -Message "cmd: $cmd"
    Invoke-Expression $cmd
}


# Write-Host "done!"
Write-Log -Severity Success -Message "done!"