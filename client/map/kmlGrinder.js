/*
 * kmlGrinder.js: for processing uploaded KML and extracting data from KML
 */


/**
 * getKMLCenter: returns the centerPoints of KML region
 * @param {*} kmlSource 
 */

import Contour from "map/Contour";
export function getKMLCenter (kmlSource){
   
    //let vertices = __readKML(kmlSource);
   // let centerPoints = __getCenterPoints(vertices);
    return __readKML(kmlSource);
    
}
/**
 * @private method __readKML; reads KML and returns coordinates
 * @param {*} kmlSource, type XML as a string
 * @returns {*} coordinates, type array
 */
function __readKML(kmlSource){
    let  parser = new DOMParser();
    let xmlDoc = parser.parseFromString(kmlSource,"text/xml");

    let corrdinateElements = xmlDoc.getElementsByTagName("coordinates");
    
    let centerPointStr = "";
    for(let i=0; corrdinateElements[i]; i++) {
        var coordinates = corrdinateElements[i].innerHTML.replace(/(\r\n\t|\n|\r\t)/gm,"").
                            replace(/\s/g, "*").
                            split("*").
                            clean("").
                            clean(undefined);
        for(let i=0;coordinates[i];i++){
            let xyzValues = coordinates[i].split(",");
            coordinates[i] = {
                x: Number(xyzValues[0]),
                y: Number(xyzValues[1]),
                z: Number(xyzValues[2]),
            }
            
        }
        let con = new Contour(coordinates);
        centerPointStr += con.centroid().x+","+con.centroid().y+","+coordinates[0].z+";";

    }
    return centerPointStr;
}

/**
 * @private method __getCenterPoints; returns centerPoints of kmlregion
 * @param {*} vertices  type array
 * @returns {*} centerPoints type string
 */
function __getCenterPoints(vertices){
    let centerPoints = "";
    for(let i=0; vertices[i]; i++){
        let con = new Contour(vertices);
        centerPoints += con.centroid().x+","+con.centroid().y+","+vertices[0].z+";";
    }
    return centerPoints;
}