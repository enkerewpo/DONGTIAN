function parseReferenceRaw(reference_json) {
    // format is crossref's reference json
    // { key: "", unstructured: "", DOI: ""}
    // first replace all single quotes with double quotes
    // but don't replace the single quotes which before numbers like '23
    for (let i = 0; i < reference_json.length; i++) {
        if (reference_json[i] === "'") {
            // check next char is number or not
            if (i + 1 < reference_json.length) {
                if (reference_json[i + 1] >= '0' && reference_json[i + 1] <= '9') {
                    continue;
                }
            }
            reference_json = reference_json.substring(0, i) + '"' + reference_json.substring(i + 1);
        }
    }
    console.log(reference_json);
    let references = JSON.parse(reference_json);
    console.log(references);
    let ret = [];
    for (let i = 0; i < references.length; i++) {
        let key = references[i].key;
        let unstructured = references[i].unstructured;
        let DOI = references[i].DOI;
        ret = ret.concat({ key: key, unstructured: unstructured, DOI: DOI });
    }
    return ret;
}

import api from "./api";
async function getCrossRef(doi) {
    // if https://doi.org/10.1007/1234 use 10.1007/1234
    if (doi.startsWith("http")) {
        // remove everything before the end of the domain, three slashes
        let split1 = doi.split("://");
        let split2 = split1[1].split("/");
        // merge the rest
        doi = split2.slice(1).join("/");
    }
    let url = 'https://api.crossref.org/works/' + doi;
    console.log(url);
    try {
        let response = await api.get(url);
        console.log("getCrossRef ok");
        console.log(response.data.message);
        return response.data.message;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export { parseReferenceRaw, getCrossRef };