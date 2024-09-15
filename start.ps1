
# set pwd variable to the current directory
$pwd = Get-Location

# first terminal try to run conda activate dongtian if possible
# then run python server/core.py

# second terminal cd ui and run npm run dev, before that, make sure D:\Program Files\nodejs is in the PATH
# if not, add it to the PATH by running the following command

Write-Host "Starting the server and the UI..."

Start-Process powershell -ArgumentList "-noexit -command `"conda activate dongtian; python $pwd\server\core.py`"" -WorkingDirectory $pwd

# run the command directly in the second terminal
# Start-Process powershell -ArgumentList "-noexit -command `"$env:PATH += 'D:\Program Files\nodejs;'; cd $pwd\ui; npm run dev`"" -WorkingDirectory $pwd