var Polygon 	= function()
{
	var main 	= this;

	var viewer 	= null;

	main.polygonID 	= ""
	main.height 	= 0;
	main.altitude 	= 0;
	main.points 	= [];

	main.type 		= -1;

	var fillColor 	= "#000000";
	var fillLine 	= 1;
	var fillAlpha 	= 0.5;

	var outColor 	= "#000000";
	var outLine 	= 1;
	var outAlpha 	= 0.5;

	var highLightColor 	= Cesium.Color.fromCssColorString("#3499DC").withAlpha(0.5);
	var isHighLight = false;
	var orgColor 	= null;

	var polygon 	= null;

	main.init 		= function(view, id, type, fColor, fLine, fAlpha, oColor, oLine, oAlpha)
	{
		viewer = view;

		fillColor 	= fColor;
		fillLine 	= fLine;
		fillAlpha 	= fAlpha;

		outColor 	= oColor;
		outLine 	= oLine;
		outAlpha 	= oAlpha;

		main.type 	= type;
		main.polygonID 	= id;
	}

	main.setPoint 	= function(position, index)
	{
		if (index == undefined)
		{
			main.points.push(position);
		}
		else
			main.points[index] = position;
	}

	main.reset 		= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}
	}

	main.setHighLight 	= function()
	{
		if (isHighLight) return;

		isHighLight = true;

		var graphics;

		if (main.type == RECTANGLE_TYPE || main.type == POLYGON_TYPE || main.type == CIRCLE_TYPE)
		{
			graphics = polygon._polygon;
		}
		else if (main.type == LINE_TYPE) 
		{
			graphics = polygon._wall;
		}

		orgColor = graphics._material._color._value;

		graphics.material = highLightColor;
	}

	main.removeHighLight = function()
	{
		if (isHighLight == false) return;

		isHighLight = false;

		if (main.type == RECTANGLE_TYPE || main.type == POLYGON_TYPE || main.type == CIRCLE_TYPE)
		{
			graphics = polygon._polygon;
		}
		else if (main.type == LINE_TYPE) 
		{
			graphics = polygon._wall;
		}

		graphics.material = orgColor;
	}

	main.changeHeight 	= function(distance)
	{
		var height 	= main.height + distance;

		if (height < 0) height = 0;

		main.height = height;

		if (main.type == RECTANGLE_TYPE) main.drawRectangle();
		else if (main.type == POLYGON_TYPE) main.drawPolygon();
		else if (main.type == CIRCLE_TYPE) main.drawCircle();
		else if (main.type == LINE_TYPE) main.drawLine();
		else if (main.type == PATH_TYPE) main.drawPathLine();
	}

	main.changeAltitude 	= function(distance)
	{
		var altitude 	= main.altitude + distance;

		if (altitude < 0) altitude = 0;

		main.altitude = altitude;

		if (main.type == RECTANGLE_TYPE) main.drawRectangle();
		else if (main.type == POLYGON_TYPE) main.drawPolygon();
		else if (main.type == CIRCLE_TYPE) main.drawCircle();
		else if (main.type == LINE_TYPE) main.drawLine();
		else if (main.type == PATH_TYPE) main.drawPathLine();
	}

	main.drawCircle 	= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var color 	= Cesium.Color.fromCssColorString(fillColor);
		color.alpha = fillAlpha;

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		var dist_lon = main.points[0].longitude - main.points[1].longitude;
		var dist_lat = main.points[0].latitude - main.points[1].latitude;

		var radius 	= Math.sqrt(dist_lon * dist_lon + dist_lat * dist_lat);
			
		var pointList = [];
		var pi2 = Math.PI * 2;
		var steps 	= 25;

		for (var i = 0; i <= steps; i ++)
		{
			var lat = main.points[0].latitude + radius * Math.cos(i / steps * pi2);
			var lon = main.points[0].longitude + radius * Math.sin(i / steps * pi2);
			pointList.push(lon);
			pointList.push(lat);
		}

		polygon = viewer.entities.add({
		    name : 'Circle Shape',
		    description : 'Circle Shape',
		    id : main.polygonID + '_polygon',
		    polygon : {
		        hierarchy : Cesium.Cartesian3.fromRadiansArray(pointList),
				height: main.altitude,
		        extrudedHeight: main.height + main.altitude,
		        material : (isHighLight)?highLightColor:color,
		        outline : true,
        		outlineColor : outlinecolor,
        		outlineWidth : outLine,
		        closeTop : true,
		        closeBottom : true
		    }
		});
	}

	main.drawRectangle 	= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var color 	= Cesium.Color.fromCssColorString(fillColor);
		color.alpha = fillAlpha;

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		polygon = viewer.entities.add({
		    name : 'Rectangle Shape',
		    description : 'Rectangle Shape',
		    id : main.polygonID + '_polygon',
		    polygon : {
		        hierarchy : Cesium.Cartesian3.fromRadiansArray([
					main.points[0].longitude, main.points[0].latitude,
					main.points[0].longitude, main.points[1].latitude,
					main.points[1].longitude, main.points[1].latitude,
					main.points[1].longitude, main.points[0].latitude,
				]),
				height: main.altitude,
		        extrudedHeight: main.height + main.altitude,
		        material : (isHighLight)?highLightColor:color,
		        outline : true,
        		outlineColor : outlinecolor,
        		outlineWidth : outLine,
		        closeTop : true,
		        closeBottom : true
		    }
		});
	}

	main.drawPolygon 	= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var pointList = [];
		for (var i = 0; i < main.points.length; i ++)
		{
			pointList.push(main.points[i].longitude);
			pointList.push(main.points[i].latitude);
		}

		var color 	= Cesium.Color.fromCssColorString(outColor);
		color.alpha = outAlpha;

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		if (pointList.length == 4) {

			var pointList = [];
			for (var i = 0; i < main.points.length; i ++)
			{
				pointList.push(main.points[i].longitude);
				pointList.push(main.points[i].latitude);
				pointList.push(main.altitude);
			}

			polygon = viewer.entities.add({
			    name : 'Polygon Shape',
			    description : 'Polygon Shape',
			    polyline : {
			        positions : Cesium.Cartesian3.fromRadiansArray(pointList),
			        material : outlinecolor,
	        		width : outLine
			    }
			});			
			return;
		}

		polygon = viewer.entities.add({
		    name : 'Polygon Shape',
		    description : 'Polygon Shape',
		    id : main.polygonID + '_polygon',
		    polygon : {
		        hierarchy : Cesium.Cartesian3.fromRadiansArray(pointList),
				height: main.altitude,
		        extrudedHeight: main.height + main.altitude,
		        material : (isHighLight)?highLightColor:color,
		        outline : true,
        		outlineColor : outlinecolor,
        		outlineWidth : outLine,
		        closeTop : true,
		        closeBottom : true
		    }
		});

	}

	main.drawLine 		= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var vHeight = main.height;

		if (vHeight == 0) vHeight = 1;

		var color 	= Cesium.Color.fromCssColorString(fillColor);
		color.alpha = fillAlpha;

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		polygon = viewer.entities.add({
		    name : 'Line Shape',
		    description : 'Line Shape',
		    id : main.polygonID + '_polygon',
		    wall : {
		        positions : Cesium.Cartesian3.fromRadiansArray([
		        	main.points[0].longitude, main.points[0].latitude,
		            main.points[1].longitude, main.points[1].latitude,
		            ]),
		     	minimumHeights : [main.altitude, main.altitude],
		        maximumHeights : [main.altitude + vHeight, main.altitude + vHeight],
		        material : (isHighLight)?highLightColor:color,
		        outline : true,
        		outlineColor : outlinecolor,
        		outlineWidth : outLine
		    }
		});
	}

	main.drawPathLine 	= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var pointList = [];
		for (var i = 0; i < main.points.length; i ++)
		{
			pointList.push(main.points[i].longitude);
			pointList.push(main.points[i].latitude);
			pointList.push(main.altitude);
		}

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		polygon = viewer.entities.add({
		    name : 'PathLine Shape',
		    description : 'PathLine Shape',
		    polyline : {
		        positions : Cesium.Cartesian3.fromRadiansArrayHeights(pointList),
		        material : new Cesium.PolylineDashMaterialProperty({
		            color: outlinecolor
		        }),
        		width : outLine
		    }
		});
	}

	main.drawFreeLine 	= function()
	{
		if (polygon != undefined)
		{
			viewer.entities.remove(polygon);
			polygon 	= null;
		}

		var pointList = [];
		for (var i = 0; i < main.points.length; i ++)
		{
			pointList.push(main.points[i].longitude);
			pointList.push(main.points[i].latitude);
			pointList.push(main.altitude);
		}

		var outlinecolor 	= Cesium.Color.fromCssColorString(outColor);
		outlinecolor.alpha = outAlpha;

		polygon = viewer.entities.add({
		    name : 'PathLine Shape',
		    description : 'PathLine Shape',
		    polyline : {
		        positions : Cesium.Cartesian3.fromRadiansArrayHeights(pointList),
		        material : outlinecolor,
        		width : outLine
		    }
		});
	}

	main.exportKML 	= function(filename)
	{
		if (polygon != undefined)
			map.kmlManager.exportKML(polygon, filename);
	}

}