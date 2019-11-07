function kmlGenerator(parentEntity, multigeometry){
  var kml = new XMLWriter('UTF-8');
  kml.writeStartDocument( );
  kml.writeStartElement('kml');
  kml.writeAttributeString('xmlns', "http://www.opengis.net/kml/2.2");
  kml.writeAttributeString('xmlns:gx', "http://www.google.com/kml/ext/2.2");
  kml.writeAttributeString('xmlns:kml', "http://www.opengis.net/kml/2.2");
  kml.writeAttributeString('xmlns:atom', "http://www.w3.org/2005/Atom");

  kml.writeStartElement('Document');
  kml.writeStartElement('Folder');
  kml.writeStartElement('Placemark');

  if (parentEntity.label != undefined)
  {
    kml.writeElementString('name', parentEntity.label.text._value);
  }
  else
  {
    kml.writeElementString('name', parentEntity.name);
  }
  kml.writeElementString('open', 'false');

  kml.writeElementString('description', parentEntity.description._value);

  if (multigeometry){
    kml.writeStartElement('MultiGeometry');
    var children = new Array();
    children = parentEntity._children;
    for(var ent=0; ent< children.length; ent++){
      addEntity(children[ent], kml);
    }
    kml.writeEndElement();
  } else{
      addEntity(parentEntity, kml);
  }

  addStyle(parentEntity, kml)

  kml.writeEndElement();

  kml.writeEndElement();
  kml.writeEndElement();
  kml.writeEndElement();
  kml.writeEndDocument();

  return kml.flush();
}

function addStyle(entity, kml)
{
  var graphics;
  if (entity.polygon != null)
  {
    graphics = entity.polygon;
  }

  else if (entity.polyline != null)
  {
    graphics = entity.polyline;
  }

  else if (entity.wall != null)
  {
    graphics = entity.wall;
  }

  else if (entity.label != null)
  {
    graphics = entity.label;

    if (entity.billboard != null)
    {
      kml.writeStartElement('Style');
      kml.writeStartElement('IconStyle');
      kml.writeStartElement('Icon');
      kml.writeElementString('href', "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png");
      kml.writeEndElement();
      kml.writeEndElement();
      kml.writeEndElement();
    }

    return;
  }

  if (graphics == undefined) return;

  kml.writeStartElement('Style');
  kml.writeStartElement('LineStyle');
  if (graphics.outlineColor != undefined)
  {
    kml.writeElementString('color', rgbaToKmlColor(graphics.outlineColor._value));
  }
  if (graphics.width != undefined)
  {
    kml.writeElementString('width', graphics.width._value + "");
  }
  else if (graphics.outlineWidth != undefined)
  {
    kml.writeElementString('width', graphics.outlineWidth._value + ""); 
  }
  kml.writeEndElement();

  kml.writeStartElement('PolyStyle');
  kml.writeElementString('color', rgbaToKmlColor(graphics.material.color._value));
  kml.writeElementString('fill', 'true');
  kml.writeElementString('outline', 'true');
  kml.writeEndElement();
  kml.writeEndElement();
}

function addEntity(entity, kml)
{
  if (entity.polygon != null)
  {
    addPolygon(entity, kml);
  }

  if (entity.polyline != null)
  {
    addPolyline(entity, kml);
  }

  if (entity.wall != null)
  {
    addLabel(entity, kml);
  }

  if (entity.label != null)
  {
    addLabel(entity, kml)
  }
}

function addLabel(entity, kml)
{
  kml.writeStartElement('Point');
  kml.writeElementString('altitudeMode', 'relativeToSeaFloor');
  kml.writeStartElement('coordinates');
  var cartesianArray = new Array();

  cartesianArray.push(entity.position._value);
  var positions = degreesArrayFromCartesian(cartesianArray);
  for (var n=0; n<positions.length; n++){
    kml.writeString( positions[n].longitude +","+ positions[n].latitude + ","+ positions[n].altitude);
  }
  kml.writeEndElement();
  kml.writeEndElement();
}

function addWall(entity, kml)
{
  kml.writeStartElement('LineString');
  var height = entity.wall._maximumHeights._value[0] - entity.wall._minimumHeights._value[0];
  if (height > 0)
    kml.writeElementString('extrude', "1");
  else
    kml.writeElementString('extrude', "0");

  kml.writeElementString('altitudeMode', 'relativeToSeaFloor');
  kml.writeElementString('tessellate', '1');
  kml.writeStartElement('coordinates');
  var cartesianArray = new Array();

  cartesianArray = entity.wall.positions._value;
  var positions = degreesArrayFromCartesian(cartesianArray);
  for (var n=0; n<positions.length; n++){
    kml.writeString( positions[n].longitude +","+ positions[n].latitude + ","+ entity.wall._maximumHeights._value[0]);
  }
  kml.writeEndElement();
  kml.writeEndElement();
}

function addPolyline(entity, kml)
{
  kml.writeStartElement('LineString');
  kml.writeElementString('altitudeMode', 'relativeToSeaFloor');
  kml.writeStartElement('coordinates');
  var cartesianArray = new Array();

  cartesianArray = entity.polyline.positions._value;
  var positions = degreesArrayFromCartesian(cartesianArray);
  for (var n=0; n<positions.length; n++){
    kml.writeString( positions[n].longitude +","+ positions[n].latitude + ","+ positions[n].altitude );
  }
  kml.writeEndElement();
  kml.writeEndElement();
}

function addPolygon(entity, kml){
  kml.writeStartElement('Polygon');
  if (entity.polygon._extrudedHeight != undefined && entity.polygon._extrudedHeight._value - entity.polygon._height._value > 0)
  {
    kml.writeElementString('extrude', "1");
  }
  else
  {
    kml.writeElementString('extrude', "0");
  }

  kml.writeElementString('altitudeMode', 'relativeToSeaFloor');
  kml.writeStartElement('outerBoundaryIs');
  kml.writeStartElement('LinearRing');
  kml.writeElementString('altitudeMode', 'relativeToSeaFloor');
  kml.writeStartElement('coordinates');
  var cartesianArray = new Array();

  cartesianArray = entity.polygon.hierarchy._value;
  var positions = degreesArrayFromCartesian(cartesianArray);

  for (var n=0; n<positions.length; n++){
    kml.writeString( positions[n].longitude +","+ positions[n].latitude + "," + entity.polygon._extrudedHeight._value );
  }
  kml.writeEndElement();
  kml.writeEndElement();
  kml.writeEndElement();
  kml.writeEndElement();

}

function degreesArrayFromCartesian(cartesianArray){
  var degreesArray = new Array();
  var cartArray = new Array();
  cartArray = cartesianArray;
  for (var coordinates=0; coordinates< cartArray.length; coordinates++){
    var carto  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartArray[coordinates]);
    var lon = Cesium.Math.toDegrees(carto.longitude);
    var lat = Cesium.Math.toDegrees(carto.latitude);
    degreesArray.push({longitude: lon, latitude: lat, altitude : carto.height});
  }
  return degreesArray;
}

function rgbaToKmlColor(rgba){
  var blue = rgba.blue * 255;
  var green = rgba.green * 255;
  var red = rgba.red * 255;
  var alpha = rgba.alpha;

  alpha = parseInt(alpha * 255, 10);
  alpha = alpha.toString(16);

  blue = blue.toString(16);
  green = green.toString(16);
  red = red.toString(16);
  if (alpha.length < 2) op = "0" + op;
  if (blue.length < 2) blue = "0" + blue;
  if (green.length < 2) green = "0" + green;
  if (red.length < 2) red = "0" + red;
  return alpha + blue + green + red;
}

function saveKML(filename, text) {
  var elem = document.createElement('a');
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  elem.setAttribute('download', filename);
  elem.click();
}