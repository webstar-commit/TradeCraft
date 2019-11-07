
var KMLManager 	= function ()
{
	var main 	= this;

	main.viewer 	= null;
	main.options 	= null;

	main.init 			= function(viewer)
	{
		main.viewer 	= viewer;

		main.options 	= {
		    camera : main.viewer.scene.camera,
		    canvas : main.viewer.scene.canvas
		};
	}

	main.loadKML 		= function(path)
	{
		var dataSource 	= new Cesium.KmlDataSource(main.options);
		dataSource.load(path);

		main.viewer.clock.shouldAnimate = false;
	    main.viewer.dataSources.add(dataSource).then(function(dataSource) 
	    {
	    	main.viewer.clock.currentTime = main.viewer.clock.stopTime;
	    	// console.log(dataSource);
	     //    main.viewer.flyTo(dataSource, { 
	     //    	duration: 4.0, 
	     //    	offset: { 
	     //    		heading: heading, 
	     //    		pitch: pitch, 
	     //    		range: range 
	     //    	} 
	     //    }).then (function () 
	     //    {
	        	
	     //    });
	    });

	    return dataSource;
	}

	main.exportKML 		= function(selectedEntity, fileName)
	{
		var kml = "";
		if (selectedEntity._children.length == 0)
			kml = kmlGenerator(selectedEntity, false);
		else
			kml = kmlGenerator(selectedEntity.parent, true);

		var file = fileName + ".kml";
        var blob = new Blob([kml], {type: "text/plain;charset=utf-8"});
        saveAs(blob, file);
	}
}