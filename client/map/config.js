const env = {
    production: false,
    dev: true,
}
const mapDictionary = {
    production: "",
    dev: "http://ec2-18-220-128-32.us-east-2.compute.amazonaws.com:8080/geoserver/wms",
}
/**
 * getImageryurl: Returns Imagery URL corresponding to server instance
 */
export function getImageryurl(){
    if(!(env.production^env.dev)) {
        throw "Atleast one environment must be set or unset";
    }
    let candidateKeyName;
    for(let key in env){
        candidateKeyName = env[key] && key;
        if(candidateKeyName){
            break;
        }
    }
    return mapDictionary[candidateKeyName];
}
