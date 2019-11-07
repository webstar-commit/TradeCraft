var KLVModel 		= function()
{
	var main			= this;

	var viewer 			= null;
	var model 			= null;
	var polylines 		= null;
	var region  		= null;
	var targetMarker 	= null;

	var lng, lat, alt, target_lng, target_lat, target_alt, vertical, horizontal, heading, pitch, roll;

	var average_alt 	= 0;

	main.init 			= function(view)
	{
		viewer 	= view;
	}

	main.addModel 		= function(url, position)
	{
		model = viewer.entities.add({
	        position : position,
	        model : {
	            uri : './model/Cesium_Air.gltf',
	            minimumPixelSize : 128,
	            maximumScale : 20000
	        }
	    });

		viewer.trackedEntity = model;
	}

	main.removeModel 	= function()
	{
		viewer.entities.remove(model);
		viewer.entities.remove(targetMarker);
		viewer.scene.groundPrimitives.remove(region);
		polylines.removeAll();
		viewer.trackedEntity = undefined;
	}

	function getCameraFocusPosition(camera) {
    	return getRayFocusPosition(camera.positionWC, camera.directionWC);
	}

	function getRayFocusPosition(origin, direction)
	{
	    var rayScratch = new Cesium.Ray();
	    rayScratch.origin = origin;
	    rayScratch.direction = direction;
	    
	    result = viewer.scene.globe.pick(rayScratch, main.viewer.scene);

	    return result;
	}

	function bearingDegrees(lat1, long1, lat2, long2) { 
	    var degToRad = Math.PI / 180.0; 

	    var phi1 = lat1 * degToRad; 
	    var phi2 = lat2 * degToRad; 
	    var lam1 = long1 * degToRad; 
	    var lam2 = long2 * degToRad; 

	    return Math.atan2(Math.sin(lam2 - lam1) * Math.cos(phi2), 
	        Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1)) * 180 / Math.PI; 
	}

	function setViewCamera(camera, sPosition, pPosition)
	{
		var target = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pPosition); 
		target.latitude = target.latitude * (180 / Math.PI); 
		target.longitude = target.longitude * (180 / Math.PI); 


		var eye = Cesium.Ellipsoid.WGS84.cartesianToCartographic(sPosition); 
		eye.latitude = eye.latitude * (180 / Math.PI); 
		eye.longitude = eye.longitude * (180 / Math.PI); 

		var bearing = bearingDegrees(target.latitude, target.longitude, eye.latitude, eye.longitude); 
		bearing = (bearing - 180) * (Math.PI / 180); 
		            
		var distance = Cesium.Cartesian3.distance(sPosition, pPosition); 
		var diff = target.height - eye.height; 
		var tilt = Math.atan(diff / distance); 

		camera.setView({
			destination : sPosition,
		    orientation: {
		        heading : bearing, 
		        pitch : tilt,
		        roll : 0.0
		    }
		});

		if (model != null)
		{
			var hpr = new Cesium.HeadingPitchRoll(bearing - Math.PI / 2, tilt, 0);
			model.position = sPosition;
			model.orientation = Cesium.Transforms.headingPitchRollQuaternion(sPosition, hpr);
		}

		// viewer.camera.setView({
		// 	destination : sPosition,
		//     orientation: {
		//         heading : bearing, 
		//         pitch : tilt,
		//         roll : 0.0
		//     }
		// });

		camera.lookAtTransform(Cesium.Matrix4.IDENTITY); 
	}

	function getCameraVisibilityRegionPositions()
	{
		var camera  = new Cesium.Camera(viewer.scene);

		camera.position = Cesium.Cartesian3.fromDegrees(lng, lat, alt);

		setViewCamera(camera, camera.position, Cesium.Cartesian3.fromDegrees(target_lng, target_lat, target_alt));

	    var carto = new Cesium.Cartographic(camera.positionCartographic.longitude, 
                camera.positionCartographic.latitude);

	    polylines.add({
	        positions : [
	            camera.position,
	            Cesium.Cartesian3.fromDegrees(lng, lat, average_alt)
	        ],
	        width : 5.0,
	        material : Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
	            color   : Cesium.Color.WHITE
	        })
	    });

    	polylines.add({
	        positions : [
	            camera.position,
	            targetMarker.position._value
	        ],
	        width : 5.0,
	        material : Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
	            color   : Cesium.Color.RED
	        })
	    });

	    var linePositions   = [];

    	camera.lookLeft(Cesium.Math.toRadians(horizontal / 2));
	    camera.lookDown(Cesium.Math.toRadians(vertical / 2));

	    var diff    = 1;
	    var up      = 0; 
	    var right   = 0;

	    var position;

	    position    = getCameraFocusPosition(camera);
	    if (position != undefined)
        {
            linePositions.push(position);
        }

        camera.lookRight(Cesium.Math.toRadians(horizontal));

        position    = getCameraFocusPosition(camera);
	    if (position != undefined)
        {
            linePositions.push(position);
        }

        camera.lookUp(Cesium.Math.toRadians(vertical));

        position    = getCameraFocusPosition(camera);
	    if (position != undefined)
        {
            linePositions.push(position);
        }

        camera.lookLeft(Cesium.Math.toRadians(horizontal));

        position    = getCameraFocusPosition(camera);
	    if (position != undefined)
        {
            linePositions.push(position);
        }

	    for (var i = 0; i < linePositions.length; i ++)
	    {
	        polylines.add({
	            positions : [
	                camera.position,
	                linePositions[i]
	            ],
	            width : 5.0,
	            material : Cesium.Material.fromType(Cesium.Material.PolylineArrowType, {
	                color   : Cesium.Color.RED
	            })
	        });
	    }

	    return linePositions;
	}

	main.drawCameraViewRegion 	= function()
	{
		if (model == undefined) return;

		if (polylines == undefined)
        	polylines       = viewer.scene.primitives.add(new Cesium.PolylineCollection());

        polylines.removeAll();

        if (region != null)
	    {
	        viewer.scene.groundPrimitives.remove(region);
	        // viewer.entities.remove(region);
	    }

        var positions   = getCameraVisibilityRegionPositions();

	    if (positions == undefined || positions.length != 4) return;

	    var polygonHierarchy = { positions : positions };
	    var color = Cesium.Color.RED;

	    color = color.withAlpha(0.5);

	    region  = new Cesium.GroundPrimitive({
	        geometryInstances : new Cesium.GeometryInstance({
	            geometry : new Cesium.PolygonGeometry({
	                polygonHierarchy : polygonHierarchy
	            }),
	            attributes: {
	                color: Cesium.ColorGeometryInstanceAttribute.fromColor(color)
	            },
	            id : 'region'
	        })
	    });
	    
	    viewer.scene.groundPrimitives.add(region);
	}

	main.getDetailGroundHeight 	= function(terrainSamplePositions, process)
	{
		Cesium.when(Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, terrainSamplePositions), function(samples) {
        	if (process != undefined) process(samples);
        });
	}

	main.showCameraViewRegion 	= function(lon, lati, alti, target_lon, target_lati, target_alti, head, pitc, rol, horizon, vert)
	{
		lng = lon;
		lat = lati;
		alt = alti;
		heading = head;
		pitch = pitc;
		roll = rol;
		horizontal = horizon;
		vertical = vert;
		target_lng = target_lon;
		target_lat = target_lati;
		target_alt = target_alti;

		main.getDetailGroundHeight([Cesium.Cartographic.fromDegrees(target_lng, target_lat), 
			Cesium.Cartographic.fromDegrees(lng, lat)], function(points) {

			target_alt += points[0].height;
			alt += points[1].height;

			average_alt = (points[0].height + points[1].height) / 2;

			if (targetMarker == null)
			{
				targetMarker = viewer.entities.add({
				    position : Cesium.Cartesian3.fromDegrees(target_lng, target_lat, target_alt),
				    billboard : {
				        image : "./images/target.png",
				        verticalOrigin : Cesium.VerticalOrigin.CENTER,
				        width:30,
				        height:30
				    }
				});
			}
			else
			{
				targetMarker.position = Cesium.Cartesian3.fromDegrees(target_lng, target_lat, target_alt);
			}

		    if (model == null)
		    {
		    	main.addModel("", Cesium.Cartesian3.fromDegrees(lng, lat, alt));
		    }

		    model.position = Cesium.Cartesian3.fromDegrees(lng, lat, alt);
		    main.drawCameraViewRegion();
		})
	}
}