
export const UTILS = {
  kmlLookUp: performKMLLookUp,
  naipoiLookUp: performLocationLookUp,

};
function performLocationLookUp(currentLatLong) {
  let nai = JSON.parse(localStorage.getItem('NAI'));

      
let poi=JSON.parse(localStorage.getItem("POI"));

      //locations=nai.concat(poi),
      
let naiDistances =[]; let poiDistances = [];
  for(var i = 0; nai[i]; i++) {
    let xDistance = nai[i].locationLongitude - currentLatLong.longitude;

          
let yDistance = nai[i].locationLatitude-currentLatLong.latitude;

          
let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    naiDistances.push({ distance, index: i });
  }
  naiDistances.sort(function(a, b) {
    return a.distance - b.distance;
  });
  for(var i = 0; poi[i]; i++) {
    let xDistance = poi[i].locationLongitude - currentLatLong.longitude;

          
let yDistance = poi[i].locationLatitude-currentLatLong.latitude;

          
let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    poiDistances.push({ distance, index: i });
  }
  poiDistances.sort(function(a, b) {
    return a.distance - b.distance;
  });
  return [nai[naiDistances[0].index], poi[poiDistances[0].index]];


}
function performKMLLookUp(currentLatLong) {
  const centerPoints = [];
  const KMLdata = JSON.parse(localStorage.getItem('KMLdata'));
  for(let i = 0; KMLdata[i]; i++) {
    if(KMLdata[i].CenterPoint) {
      const centers = KMLdata[i].CenterPoint.split(';');
      if(centers.length > 1) {
        for(let j = 0; centers[j]; j++) {
          centerPoints.push({ CCIRPIRId: KMLdata[i].CCIRPIRId, missionName: KMLdata[i].MissionName, point: centers[j], KMLUri: KMLdata[i].EffectiveAreaKML, CCIRPIR: KMLdata[i].Description1, CountryId: KMLdata[i].CountryId });
        }
      } else{
        centerPoints.push({ CCIRPIRId: KMLdata[i].CCIRPIRId, missionName: KMLdata[i].MissionName, point: centers, KMLUri: KMLdata[i].EffectiveAreaKML, CCIRPIR: KMLdata[i].Description1, CountryId: KMLdata[i].CountryId });

      }
    }

  }
  console.log('centers', centerPoints);


  // finding nearest point

  const distances = [];
  for(let i = 0; centerPoints[i]; i++) {
    const point = centerPoints[i].point.split(',');
    if(!isNaN(point[0]) && !isNaN(point[1])) {

      const xDistance = Number(point[0]) - currentLatLong.longitude;
      const yDistance = Number(point[1]) - currentLatLong.latitude;
      const distance = Math.sqrt(yDistance * yDistance + xDistance * xDistance);
      distances.push({ distance, index: i });
    }

  }

  distances.sort(function(a, b) {
    return a.distance - b.distance;
  });
  console.log('nearest--', centerPoints[distances[0].index]);
  return centerPoints[distances[0].index];


}
