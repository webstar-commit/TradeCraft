var Drawing = function()
{
	var main 		= this;

	viewer 	= null;

	main.type 		= -1;
	// 0 - rectangle, 1 - polygon, 2 - circle, 3 - line, 4 - path line
	// 5 - Text, 6 - place mark

	main.font 		= "benderbold";
	//Bander, Open Sans, Tahoma
	main.fontSize 	= 12;
	main.fontColor 	= "#000000";

	main.fillColor 	= "#000000";
	main.fillLine 	= 1;
	main.fillAlpha 	= 0.5;

	main.outColor 	= "#000000";
	main.outLine 	= 1;
	main.outAlpha 	= 0.5;

	polygonArray 	= [];
	textLabels 		= [];
	placeArray 		= [];

	selectPolygon 	= null;
	uniqueId 		= 0;

	currentHighLight = "";
	isRightDown 	= false;

	pinBuilder = new Cesium.PinBuilder();

	map = null;

	var positionLabel;

	var RECTANGLE_TYPE  = 0;
	var POLYGON_TYPE    = 1;
	var CIRCLE_TYPE     = 2;
	var LINE_TYPE       = 3;
	var PATH_TYPE       = 4;
	var TEXT_TYPE       = 5;
	var PLACE_TYPE      = 6;
	var HEIGHT_TYPE     = 7;
	var ALTITUDE_TYPE   = 8;
	var DELETE_TYPE     = 9;
	var FREE_TYPE     = 10;
	var MULTIMEDIA_TYPE = 11;

	main.init 		= function(view, map_class)
	{
		viewer = view;
		initCesiumEvent();

		positionLabel = viewer.entities.add({
	        label : {
	            show : false,
	            showBackground : true,
	            font : 'bold 14px monospace',
	            horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
	            verticalOrigin : Cesium.VerticalOrigin.TOP,
	            pixelOffset : new Cesium.Cartesian2(15, 0)
	        }
	    });

	    map = map_class;
	}

	main.exportKML 	= function()
	{
		for (var i = 0; i < polygonArray.length; i ++)
		{
			polygonArray[i].exportKML(polygonArray[i].polygonID + "_polygon");
		}

		for (var i = 0; i < textLabels.length; i ++)
		{
			map.kmlManager.exportKML(textLabels[i], i + "_textlabel");
		}

		for (var i = 0; i < placeArray.length; i ++)
		{
			map.kmlManager.exportKML(placeArray[i], i + "_placemark");
		}
	}

	main.reset 		= function()
	{
		selectPolygon = null;

		for (var i = 0; i < polygonArray.length; i ++) 
			polygonArray[i].reset();

		polygonArray = [];

		for (var i = 0; i < textLabels.length; i ++) 
		{
			viewer.entities.remove(textLabels[i]);
		}
		textLabels = [];

		for (var i = 0; i < placeArray.length; i ++) 
		{
			viewer.entities.remove(placeArray[i]);
		}
		placeArray = [];

		uniqueId = 0;
		currentHighLight = "";

	}

	function createPolygon()
	{
		selectPolygon = new Polygon()

		selectPolygon.init(viewer, uniqueId ++, main.type, main.fillColor, main.fillLine, main.fillAlpha, main.outColor, main.outLine, main.outAlpha);
	}

	function getCesiumPosition(windowPosition)
	{
	    var position = viewer.camera.pickEllipsoid(windowPosition, viewer.scene.globe.ellipsoid);

	    if (position == undefined)
	    	return new Cesium.Cartographic(0, 0, 0);

	    var cartographicPosition    = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);

	    return cartographicPosition;
	}

	function getGroundHeight(position, process) {
	    var promise = Cesium.sampleTerrain(viewer.terrainProvider, 11, [position]);

	    Cesium.when(promise, function (cartoPosition) {
	        process(cartoPosition);
	    });
	}

	function getMapCenter() {            
        var windowPosition = new Cesium.Cartesian2(viewer.container.clientWidth / 2, viewer.container.clientHeight / 2);
        var pickRay = viewer.scene.camera.getPickRay(windowPosition);
        var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
        if (pickPosition == undefined) return undefined;
        var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);

        return pickPositionCartographic;
	}

	function initCesiumEvent()
	{
		// document.addEventListener('contextmenu', event => event.preventDefault());

		document.body.style.cursor  = 'crosshair';

		viewer.camera.percentageChanged  = 0.001;

		viewer.camera.changed.addEventListener(function() {
			var cartographic = getMapCenter();

			if (cartographic == undefined) return;

			var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
			var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

			$('.lat').html('<span style="color: #1cc15d;">LAT: </span>' + latitude + '\u00B0');
			$('.lon').html('<span style="color: #727914;">LON: </span>' + longitude + '\u00B0');
			$('.alt').html('<span style="color: #d66619;">ALT: </span>' + Cesium.Cartographic.fromCartesian(viewer.camera.position).height.toFixed(2) + 'm');

			if (map.centerMarker == null)
			{
				map.centerMarker = viewer.entities.add({
				    position : Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude),
				    billboard : {
				        image : "/vendor/drawing/images/center_marker.png",
				        verticalOrigin : Cesium.VerticalOrigin.CENTER,
				        heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
				    }
				});
			}
			else
			{
				map.centerMarker.position = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude);
			}

			getGroundHeight(cartographic, function(cartoPosition) 
		    {
		        $('.elv').html('<span style="color: #f02011;">ELV: </span>' + cartographic.height.toFixed(2) + 'm');
		    });
		});

		var handler     = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	    handler.setInputAction(clickRight,
	        Cesium.ScreenSpaceEventType.RIGHT_CLICK
	    );
	    handler.setInputAction(mouseMove,
	        Cesium.ScreenSpaceEventType.MOUSE_MOVE
	    );
	    handler.setInputAction(rightDown,
	        Cesium.ScreenSpaceEventType.RIGHT_DOWN
	    );
	    handler.setInputAction(rightUp,
	        Cesium.ScreenSpaceEventType.RIGHT_UP
	    );
	    handler.setInputAction(leftDoubleClick,
	        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK 
	    );

	    $('#cancel_button').on('click', function() 
	    {
	        if (textLabels.length != 0)
	        {
	        	viewer.entities.remove(textLabels[textLabels.length - 1]);
	        	textLabels.splice(textLabels.length - 1, 1);
	        }
	        $("#text_create").hide();
	    });

	    $('#save_button').on('click', function() 
	    {
	    	if (textLabels.length != 0)
	        {
	        	var text  = document.getElementById('text_create_value').value;
	        	textLabels[textLabels.length - 1]._label._text._value = text;
	        }
	        $("#text_create").hide();

	        var cartesian = textLabels[textLabels.length - 1]._position._value;
			var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

			positionLabel.position = cartesian;
            positionLabel.label.show = true;
            positionLabel.label.text =
                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
	    });

	    $('.droppoi-pin-popup .clearfix .btn-cancel').on('click', function() 
	    {
	        $(".droppoi-pin-popup").fadeOut();
	        placemarkPosition = null;
	    });

	    $('.droppoi-pin-popup .clearfix .btn-save').on('click', function() 
	    {
	    	if (placemarkPosition == null) return;

	    	$(".droppoi-pin-popup").fadeOut();

	    	var name = $( ".drop_pin_name" ).val();
	    	var desc = $( ".drop_pin_description" ).val();
	    	var color 	= Cesium.Color.fromCssColorString(main.fontColor);

	    	placeArray.push(viewer.entities.add({
			    name : name,
			    description : desc,
			    id : (uniqueId ++) + "_placemark",
			    position : Cesium.Cartesian3.fromRadians(placemarkPosition.longitude, placemarkPosition.latitude, placemarkPosition.height),
			    billboard : {
			        image : "/vendor/drawing/images/pin_icon.png",
			        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			    },
			    label: {
	                text: name,
	                fillColor : color,
	                verticalOrigin : Cesium.VerticalOrigin.UP,
	                font : 'bold ' + (main.fontSize + 5) + 'px' + main.font,
	            }
			}));

			var cartesian = Cesium.Cartesian3.fromRadians(placemarkPosition.longitude, placemarkPosition.latitude, placemarkPosition.height);
			var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

			positionLabel.position = cartesian;
            positionLabel.label.show = true;
            positionLabel.label.text =
                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
	    });

	    $(document).keyup(function(event) {
		    if (event.keyCode == 27) {
		        pointList = [];
		    }
		});

		document.getElementById('fileImport').addEventListener('change', function(event) {
			var file = event.target.files[0];
		    if (!file || !file.name.toLowerCase().includes(".kml")) {
		        return;
		    }

		    var reader = new FileReader();

		    reader.onload = function(event) {
		        map.kmlManager.loadKML($.parseXML(event.target.result));
		    };

		    reader.readAsText(file);
		}, false);

		document.getElementById('fileImport').addEventListener('change', function(event) {
			var file = event.target.files[0];
		    if (!file || !file.name.toLowerCase().includes(".kml")) {
		        return;
		    }

		    var reader = new FileReader();

		    reader.onload = function(event) {
		        map.kmlManager.loadKML($.parseXML(event.target.result));
		    };

		    reader.readAsText(file);
		}, false);
	}

	main.resetPoint 	= function()
	{
		pointList 	= [];
	}

	var pointList 	= [];

	function leftDoubleClick(click)
	{
		pointList = [];
	}

	function drawRectangle(position)
	{
		if (polygonArray == null)
		{
			polygonArray 	= [];
		}

		if (pointList.length > 1)
		{
			pointList[1] = getCesiumPosition(position);
			selectPolygon.setPoint(pointList[1], 1);
		}
		else
		{
			pointList.push(getCesiumPosition(position));
			
			createPolygon();
			polygonArray.push(selectPolygon);

			selectPolygon.setPoint(pointList[0]);
			selectPolygon.setPoint(pointList[1]);
		}

		selectPolygon.drawRectangle();
	}

	function drawPolygon(position)
	{
		if (polygonArray == null)
		{
			polygonArray 	= [];
		}

		if (pointList.length == 0)
		{	
			createPolygon();
			polygonArray.push(selectPolygon);
		}

		pointList.push(getCesiumPosition(position));

		selectPolygon.setPoint(getCesiumPosition(position));

		selectPolygon.drawPolygon();
	}

	function drawCircle(position)
	{
		if (polygonArray == null)
		{
			polygonArray 	= [];
		}

		if (pointList.length > 1)
		{
			pointList[1] = getCesiumPosition(position);
			selectPolygon.setPoint(pointList[1], 1);
		}
		else
		{
			pointList.push(getCesiumPosition(position));
			
			createPolygon();
			polygonArray.push(selectPolygon);

			selectPolygon.setPoint(pointList[0]);
			selectPolygon.setPoint(pointList[1]);
		}

		selectPolygon.drawCircle();
	}

	function drawLine(position)
	{
		if (polygonArray == null)
		{
			polygonArray 	= [];
		}

		if (pointList.length > 1)
		{
			pointList[1] = getCesiumPosition(position);
			selectPolygon.setPoint(pointList[1], 1);
		}
		else
		{
			pointList.push(getCesiumPosition(position));

			createPolygon();
			polygonArray.push(selectPolygon);

			selectPolygon.setPoint(pointList[0]);
			selectPolygon.setPoint(pointList[1]);
		}

		selectPolygon.drawLine();
	}

	function drawPathLine(remove)
	{
		if (polygonArray == null)
		{
			polygonArray 	= [];
		}

		if (pointList.length == 1)
		{
			createPolygon();
			polygonArray.push(selectPolygon);

			selectPolygon.setPoint(pointList[0]);

			return;
		}

		if (remove == true)
		{
			selectPolygon.setPoint(pointList[pointList.length - 1], pointList.length - 1)
		}
		else
		{
			selectPolygon.setPoint(pointList[pointList.length - 1]);
		}

		selectPolygon.drawPathLine();
	}

	function addTextLabel(position)
	{
		var cesiumPosition = getCesiumPosition(position);

		var color 	= Cesium.Color.fromCssColorString(main.fontColor);

		if (textLabels == null) textLabels = [];

		textLabels.push(viewer.entities.add({
            position: Cesium.Cartesian3.fromRadians(cesiumPosition.longitude, cesiumPosition.latitude, cesiumPosition.height),
            id : (uniqueId ++) + "_textlabel",
            name : (uniqueId ++) + " label",
            description : (uniqueId ++) + " label",
            label: {
                text: "Template",
                fillColor : color,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                font : (main.fontSize + 5) + 'px ' + main.font,
            }
        }))

        $('#text_create').css('left', position.x - 95);
		$('#text_create').css('top', position.y - 100);
		$('#text_create_value').val("");
        $('#text_create').show();
	}

	var placemarkPosition;	

	function addPlace(position)
	{
		var cesiumPosition = getCesiumPosition(position);

		if (placeArray == null) placeArray = [];

		placemarkPosition = cesiumPosition;

		$('.popups-block').fadeOut();
	    $('.droppoi-popup-block').fadeIn();
	}

	function clickRight(click)
	{
		var pickedFeature = pickPosition(click.position);

		if (pickedFeature != undefined && main.type == DELETE_TYPE)
		{
			if (pickedFeature.id instanceof Cesium.Entity)
			{
				if (pickedFeature.id._id.includes('_textlabel'))
				{
					var index = getTextIndexFrom(pickedFeature.id._id);
					viewer.entities.remove(textLabels[index]);
					textLabels.splice(index, 1);
				}
				else if (pickedFeature.id._id.includes('_placemark'))
				{
					var index = getPlaceIndexFrom(pickedFeature.id._id);
					viewer.entities.remove(placeArray[index]);
					placeArray.splice(index, 1);
				}
				else if (pickedFeature.id._id.includes('_polygon'))
				{
					var index = getIndexFrom(pickedFeature.id._id);
					polygonArray[index].reset();
					polygonArray.splice(index, 1);
				}
			}
			return;
		}

		if (main.type == POLYGON_TYPE)
		{
			drawPolygon(click.position)
		}
		else if (main.type == LINE_TYPE)
		{
			if (pointList.length == 0)
			{
				pointList.push(getCesiumPosition(click.position));
				return;
			}
			drawLine(click.position);

			if (pointList.length == 2)
			{
				pointList = [];
			}
		}
		else if (main.type == PATH_TYPE)
		{
			pointList.push(getCesiumPosition(click.position));

			drawPathLine(false);
		}
		else if (main.type == TEXT_TYPE)
		{
			addTextLabel(click.position);
		}
		else if (main.type == PLACE_TYPE)
		{
			addPlace(click.position);
		}
		else if (main.type == MULTIMEDIA_TYPE)
		{
			mediaManager.addMultiMedia(click.position);
		}
	}

	function pickPosition(position)
	{
	    var pickedObjects = viewer.scene.drillPick(position, 10);
	    
	    for (var i = 0; i < pickedObjects.length; i ++)
	    {
	        if (pickedObjects[i].id == undefined) continue;

	        return pickedObjects[i];
	    }

	    return undefined;
	}

	function getIndexFrom(id)
	{
	    var index = id.indexOf("_");
	    var value = id.substring(0, index);

	    var result = -1;

	    for (var i = 0; i < polygonArray.length; i ++)
	    {
	        if (polygonArray[i].polygonID == value) result = i;
	    }
	    return result;
	}

	function getTextIndexFrom(id)
	{
	    var result = -1;

	 	for (var i = 0; i < textLabels.length; i ++)
	    {
	        if (textLabels[i].id == id) result = i;
	    }
	    return result;   		
	}

	function getPlaceIndexFrom(id)
	{
	    var result = -1;

	 	for (var i = 0; i < placeArray.length; i ++)
	    {
	        if (placeArray[i].id == id) result = i;
	    }
	    return result;   		
	}

	function mouseMove(movement)
	{
		var pickedFeature = pickPosition(movement.endPosition);
		positionLabel.label.show = false;

		if (pickedFeature != undefined && pickedFeature.id != undefined && (pickedFeature.id instanceof Cesium.Entity) && pickedFeature.id._id.includes("_polygon"))
		{
			if (currentHighLight != "" && currentHighLight != pickedFeature.id._id)
			{
				var index = getIndexFrom(currentHighLight);

				if (index != -1)
				{
					document.body.style.cursor  = 'crosshair';
					polygonArray[index].removeHighLight();
					currentHighLight = "";
				}
					
			}
			var index = getIndexFrom(pickedFeature.id._id);

			if (index != -1)
			{
				polygonArray[index].setHighLight();

				if (main.type == HEIGHT_TYPE || main.type == ALTITUDE_TYPE)
				{
					document.body.style.cursor  = 'ns-resize';
				}

				currentHighLight = pickedFeature.id._id;	
			}
		}
		else
		{
			if (currentHighLight != "" && isRightDown == false)
			{
				var index = getIndexFrom(currentHighLight);
				if (index != -1)
				{
					document.body.style.cursor  = 'crosshair';
					polygonArray[index].removeHighLight();
					currentHighLight = "";
				}
			}
		}

		if (main.type == HEIGHT_TYPE && isRightDown && currentHighLight != "")
		{
			var index = getIndexFrom(currentHighLight);
			var distance    = movement.startPosition.y - movement.endPosition.y;
			polygonArray[index].changeHeight(distance);
		}
		else if (main.type == ALTITUDE_TYPE && isRightDown && currentHighLight != "")
		{
			var index = getIndexFrom(currentHighLight);
			var distance    = movement.startPosition.y - movement.endPosition.y;
			polygonArray[index].changeAltitude(distance);
			return;
		}

		if (pointList.length == 0)
			return;

		if (main.type == RECTANGLE_TYPE)
		{
			drawRectangle(movement.endPosition);

			var cartesian = viewer.camera.pickEllipsoid(movement.endPosition);
	        if (cartesian) {
	            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
	            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
	            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

	            positionLabel.position = cartesian;
	            positionLabel.label.show = true;
	            positionLabel.label.text =
	                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
	                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0';
	        } else {
	            positionLabel.label.show = false;
	        }
		}
		if (main.type == POLYGON_TYPE)
		{
			if (pointList.length >= 1)
			{
				var cartesian = viewer.camera.pickEllipsoid(movement.endPosition);
				if (cartesian)
				{
					var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
		            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
		            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

		            var distance 	= Cesium.Cartesian3.distance(
						Cesium.Cartesian3.fromRadians(pointList[pointList.length - 1].longitude, pointList[pointList.length - 1].latitude), 
						Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude)
					).toFixed(2);

					positionLabel.position = cartesian;
		            positionLabel.label.show = true;
		            positionLabel.label.text =
		                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
		                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
		                '\nDistance: ' + '   ' + distance + ' m';
				}
				else
				{
					positionLabel.label.show = false;
				}
			}
			else
			{
				positionLabel.label.show = false;
			}
		}
		else if (main.type == CIRCLE_TYPE)
		{
			drawCircle(movement.endPosition);

			if (pointList.length >= 2)
			{
				var longitudeString = Cesium.Math.toDegrees(pointList[0].longitude).toFixed(2);
	            var latitudeString = Cesium.Math.toDegrees(pointList[0].latitude).toFixed(2);
	            var radius 	= Cesium.Cartesian3.distance(
					Cesium.Cartesian3.fromRadians(pointList[0].longitude, pointList[0].latitude), 
					Cesium.Cartesian3.fromRadians(pointList[1].longitude, pointList[1].latitude)
				).toFixed(2);

				positionLabel.position = Cesium.Cartesian3.fromRadians(pointList[1].longitude, pointList[1].latitude);
	            positionLabel.label.show = true;
	            positionLabel.label.text =
	                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
	                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
	                '\nRadius: ' + '   ' + radius + ' m';
			}
			else
			{
				positionLabel.label.show = false;
			}
		}
		else if (main.type == LINE_TYPE)
		{
			drawLine(movement.endPosition);

			if (pointList.length >= 2)
			{
				var longitudeString = Cesium.Math.toDegrees(pointList[1].longitude).toFixed(2);
	            var latitudeString = Cesium.Math.toDegrees(pointList[1].latitude).toFixed(2);
	            var distance 	= Cesium.Cartesian3.distance(
					Cesium.Cartesian3.fromRadians(pointList[0].longitude, pointList[0].latitude), 
					Cesium.Cartesian3.fromRadians(pointList[1].longitude, pointList[1].latitude)
				).toFixed(2);

				positionLabel.position = Cesium.Cartesian3.fromRadians(pointList[1].longitude, pointList[1].latitude);
	            positionLabel.label.show = true;
	            positionLabel.label.text =
	                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
	                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
	                '\nDistance: ' + '   ' + distance + ' m';
			}
			else
			{
				positionLabel.label.show = false;
			}
		}
		else if (main.type == PATH_TYPE)
		{
			if (pointList.length == 0) return;
			if (pointList.length > 1)
			{
				pointList.splice(pointList.length - 1, 1);
			}
			pointList.push(getCesiumPosition(movement.endPosition));

			drawPathLine(true);

			if (pointList.length >= 2)
			{
				var longitudeString = Cesium.Math.toDegrees(pointList[pointList.length - 1].longitude).toFixed(2);
	            var latitudeString = Cesium.Math.toDegrees(pointList[pointList.length - 1].latitude).toFixed(2);
	            var distance 	= Cesium.Cartesian3.distance(
					Cesium.Cartesian3.fromRadians(pointList[pointList.length - 2].longitude, pointList[pointList.length - 2].latitude), 
					Cesium.Cartesian3.fromRadians(pointList[pointList.length - 1].longitude, pointList[pointList.length - 1].latitude)
				).toFixed(2);

				positionLabel.position = Cesium.Cartesian3.fromRadians(pointList[pointList.length - 1].longitude, pointList[pointList.length - 1].latitude);
	            positionLabel.label.show = true;
	            positionLabel.label.text =
	                'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
	                '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
	                '\nDistance: ' + '   ' + distance + ' m';
			}
			else
			{
				positionLabel.label.show = false;
			}
		}
		else if (main.type == FREE_TYPE && isRightDown == true)
		{
			if (pointList.length == 1) 
			{
				createPolygon();
				polygonArray.push(selectPolygon);

				selectPolygon.setPoint(pointList[0]);
			}

			pointList.push(getCesiumPosition(movement.endPosition));
			selectPolygon.setPoint(pointList[pointList.length - 1]);
			selectPolygon.drawFreeLine();
		}
	}

	function rightDown(click)
	{
		isRightDown = true;

		if (main.type == RECTANGLE_TYPE || main.type == CIRCLE_TYPE || main.type == FREE_TYPE)
		{
			pointList.push(getCesiumPosition(click.position));	
		}
		
		viewer.scene.screenSpaceCameraController.enableZoom = false;
	}

	function rightUp()
	{
		isRightDown = false;

		if (main.type == RECTANGLE_TYPE || main.type == CIRCLE_TYPE)
		{
			pointList = [];
		}
		
		viewer.scene.screenSpaceCameraController.enableZoom = true;
	}

}