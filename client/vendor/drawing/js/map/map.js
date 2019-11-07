Cesium.BingMapsApi.defaultKey       = 'KfV8wdPtnDWQhBokvFQu~XZLc5YQAVAZ9fPUgPdXJPg~At-c_UY2pdQYIGTUDYUL8ynhX4LXwO4TamJi-LhAny8yTUne6oPIjzttr1enFUez';

var isBreakout 		= false;

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

var CesiumMap 	= function()
{
	var main 		= this;	
	main.viewer 	= null;
	main.baseLayers 	= null;
	main.imageryLayers 	= null;
	main.viewModel 		= null;
	main.kmlManager 	= null;
	main.screenOverlay 	= "";

	main.centerMarker 	= null;

	var selectBaseMap 	= "Satellite";

	var isColumbus 	= false;

	var selectedLayer 	= null;

	main.init 		= function()
	{
		main.viewer  = new Cesium.Viewer('cesiumContainer', {
            homeButton : false,
            creditContainer : null,
            navigationHelpButton : false,
            navigationInstructionsInitiallyVisible: false,
            selectionIndicator:false,
            fullscreenElement: 'previewContent',
            baseLayerPicker: false,
            imageryProvider	: new Cesium.BingMapsImageryProvider({
                url : 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.AERIAL
            }),
            terrainProvider: Cesium.createWorldTerrain({
		        requestWaterMask : true,
		        requestVertexNormals : true
		    }),
      //       terrainProvider : new Cesium.CesiumTerrainProvider({
		    //     url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
		    //     requestWaterMask : true,
		    //     requestVertexNormals : true
		    // }),
            infoBox : false,
            sceneModePicker : false,
        });

        main.viewer.scene.pickTranslucentDepth  = true;

        main.kmlManager 	= new KMLManager();
        main.kmlManager.init(main.viewer);

        var options = {};
		// options.defaultResetView = Cesium.Rectangle.fromDegrees(71, 3, 90, 14);
		// Only the compass will show on the map
		options.enableCompass= true;
		options.enableZoomControls= true;
		options.enableDistanceLegend= false;
		options.enableCompassOuterRing= true;

        main.viewer.extend(Cesium.viewerCesiumNavigationMixin, options);

        setupGUI();

        initDrawingEvent();
        initMultiMediaEvent();
        initBreakoutEvent();

        // main.kmlManager.loadKML('./sampledata/aprs.kml');

        var longitude   = 135;
		var latitude    = 35.012;
		var altitude    = 400;
		var heading     = 0;
		var pitch       = -45;
		var roll        = 0.0;


		if (main.centerMarker == null)
		{
			var cartographic = Cesium.Cartographic.fromCartesian(main.viewer.camera.position);
			main.centerMarker = main.viewer.entities.add({
			    position : Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude),
			    billboard : {
			        image : "/vendor/drawing/images/center_marker.png",
			        verticalOrigin : Cesium.VerticalOrigin.CENTER,
			        heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
			    }
			});
		}
	}

	function fly(position)
	{
	    main.viewer.camera.flyTo({
	        destination : Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.altitude),
	        orientation : {
	            heading : Cesium.Math.toRadians(position.heading),
	            pitch : Cesium.Math.toRadians(position.pitch),
	            roll : position.roll
	        },
	        complete    : function()
	        {
	            
	        }
	    });
	}

	function removeActive()
	{
		$('.rectangle-link').removeClass('active');
		$('.polygon-link').removeClass('active');
		$('.circle-link').removeClass('active');
		$('.line-link').removeClass('active');
		$('.path-link').removeClass('active');
		$('.text-link').removeClass('active');
		$('.height-link').removeClass('active');
		$('.altitude-link').removeClass('active');
		$('.drop-poi-link').removeClass('active');
		$('.erase-link').removeClass('active');
		$('.edit-link').removeClass('active');
		$('.drop-multimedia-link').removeClass('active');
		drawing.resetPoint();
	}

	function initBreakoutEvent()
	{
		main.viewer.scene.postRender.addEventListener(function(scene, time) {
		    if (isBreakout == true)
		    {
		    	var destCtx = document.getElementById("break-out-map-content");
				var context = destCtx.getContext('2d');

		    	var img = new Image();
				img.onload = function(){
				    context.drawImage(img, 0, 0, destCtx.width, destCtx.height);
				};

				img.src = main.viewer.scene.canvas.toDataURL("image/png");
		    }

		});

		$('.break-out').on('click', function () {
			if (isBreakout == false)
			{
				var destCtx = document.getElementById("break-out-map-content");
				var context = destCtx.getContext('2d');

				var rate 	= main.viewer.scene.canvas.height / main.viewer.scene.canvas.width;

				var img = new Image();
				img.onload = function(){
					var height = $('.break-out-wrapper').width() * rate;
					$('.break-out-wrapper').css({
		                'height': height + 48
		            });

				    context.drawImage(img, 0, 0, destCtx.width, destCtx.height);

				    isBreakout = true;
					$('.break-out-map').fadeIn(500);
				};

				img.src = main.viewer.scene.canvas.toDataURL("image/png");
			}
			else
			{
				isBreakout = false;
				$('.break-out-map').fadeOut(500);
			}
			
		});

		$('#close-break-out').on('click', function() {
			isBreakout = false;
			$('.break-out-map').fadeOut(500);
		});
	}

	function initMultiMediaEvent()
	{
		mediaManager = new MultiMedia();
		mediaManager.init(main.viewer);
	}

	function initDrawingEvent()
	{
		drawing = new Drawing();

		drawing.init(main.viewer, main);
		$('.rectangle-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= RECTANGLE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.polygon-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= POLYGON_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.circle-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= CIRCLE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.line-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= LINE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.path-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= PATH_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.height-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= HEIGHT_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.altitude-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= ALTITUDE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.text-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= TEXT_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.drop-poi-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= PLACE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.drop-multimedia-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= MULTIMEDIA_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

	    $('.erase-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= DELETE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });

		$('.edit-link').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= FREE_TYPE;
	        removeActive();
	        $(this).addClass('active');
	    });	 

	    $('.new-link').click(function(ev){
	        ev.preventDefault();

	        drawing.reset();
	    });

	    $('.btn-clear').click(function(ev){
	        ev.preventDefault();

	        drawing.reset();
	    });	    
	    $('.btn-delete').click(function(ev){
	        ev.preventDefault();

	        drawing.type 	= DELETE_TYPE;
	        removeActive();
	        $('.erase-link').addClass('active');
	    });	

	    $('.drawing-popup-block .clearfix .btn-save').click(function(ev){
	        ev.preventDefault();
	        
	        drawing.exportKML();
	    });

	    $('.save-link').click(function(ev){
	        ev.preventDefault();
	        
	        drawing.exportKML();
	    });

	    var input = document.getElementById('search_address');

    	var autocomplete = new google.maps.places.Autocomplete(input);

    	autocomplete.addListener('place_changed', function() {
	        var place = autocomplete.getPlace();
	        if (place != undefined && place.geometry != undefined)
	        {
	            var geometry = place.geometry.location;

	            var longitude   = geometry.lng();
				var latitude    = geometry.lat();
				var altitude    = 1000;
				var heading     = 0;
				var pitch       = -45;
				var roll        = 0.0;

		        fly({
			        longitude : longitude,
			        latitude  : latitude,
			        altitude : altitude,
			        heading : heading,
			        pitch   : pitch,
			        roll    : roll
			    });
	        }
	    });
	}

	main.setScreenOverlay		= function(name, url)
	{
	    screenOverlay = name;
	    $("#screenoverlay").attr("src",url);
	    $("#screenoverlay").fadeIn(500);
	}

	function setupGUI()
	{
		main.imageryLayers	= main.viewer.imageryLayers;

		main.baseLayers = new Map();
		setupLayers();
		setToolbar();
	}

	function resetMapSelect()
	{
		$('.satellite-link').removeClass('active');
		$('.street-link').removeClass('active');
		$('.sea-link').removeClass('active');
		$('.air-link').removeClass('active');

		resetLayer();
	}

	function resetLayer()
	{
		$('#base_layer').removeClass('active');
		$('#top_layer').removeClass('active');

		selectedLayer = null;
	}

	main.setSelectedOpacity 	= function(value)
	{
		if (selectedLayer != null)
		{
			selectedLayer.alpha = value;
		}
	}

	function setToolbar()
	{
		//Bind the viewModel to the DOM elements of the UI that call for it.
		$('.satellite-link').click(function() 
		{
			if (selectBaseMap == "Satellite") return;
			main.imageryLayers.remove(main.baseLayers.get(selectBaseMap), false);
			main.imageryLayers.add(main.baseLayers.get("Satellite"));
			main.imageryLayers.lower(main.baseLayers.get("Satellite"));
			selectBaseMap = "Satellite";
			resetMapSelect();
			$('.satellite-link').addClass('active');
		});

		$('.street-link').click(function() 
		{
			if (selectBaseMap == "Street") return;
			main.imageryLayers.remove(main.baseLayers.get(selectBaseMap), false);
			main.imageryLayers.add(main.baseLayers.get("Street"));
			main.imageryLayers.lower(main.baseLayers.get("Street"));
			selectBaseMap = "Street";
			resetMapSelect();
			$('.street-link').addClass('active');
		});

		$('.sea-link').click(function() 
		{
			if (selectBaseMap == "Sea") return;
			main.imageryLayers.remove(main.baseLayers.get(selectBaseMap), false);
			main.imageryLayers.add(main.baseLayers.get("Sea"));
			main.imageryLayers.lower(main.baseLayers.get("Sea"));
			selectBaseMap = "Sea";
			resetMapSelect();
			$('.sea-link').addClass('active');
		});

		$('.air-link').click(function() 
		{
			if (selectBaseMap == "Air") return;
			main.imageryLayers.remove(main.baseLayers.get(selectBaseMap), false);
			main.imageryLayers.add(main.baseLayers.get("Air"));
			main.imageryLayers.lower(main.baseLayers.get("Air"));
			selectBaseMap = "Air";
			resetMapSelect();
			$('.air-link').addClass('active');
		});

		$('#base_layer').click(function() 
		{
			resetLayer();
			$('#base_layer').addClass('active');

			selectedLayer = main.imageryLayers.get(0);
			 $('#fuse_capacity').slider('value', selectedLayer.alpha * 100);
		});

		$('#top_layer').click(function() 
		{
			resetLayer();
			$('#top_layer').addClass('active');

			selectedLayer = main.imageryLayers.get(main.imageryLayers.length - 1);
			$('#fuse_capacity').slider('value', selectedLayer.alpha * 100);
		});

	}

	function addBaseLayerOption(name, imageryProvider) {
	    var layer;
	    if (typeof imageryProvider === 'undefined') {
	        layer = main.imageryLayers.get(0);
	    } else {
	        layer = new Cesium.ImageryLayer(imageryProvider);
	    }

	    layer.name = name;
	    main.baseLayers.set(name, layer);
	}

	function addAdditionalLayerOption(name, imageryProvider, alpha, show) {
	    var layer = main.imageryLayers.addImageryProvider(imageryProvider);
	    layer.alpha = Cesium.defaultValue(alpha, 0.5);
	    layer.show = Cesium.defaultValue(show, true);
	    layer.name = name;
	    main.baseLayers.set(name, layer)
	}

	function setupLayers() {
	    // Create all the base layers that this example will support.
	    // These base layers aren't really special.  It's possible to have multiple of them
	    // enabled at once, just like the other layers, but it doesn't make much sense because
	    // all of these layers cover the entire globe and are opaque.

	    $('.satellite-link').addClass('active');

	    addBaseLayerOption(
	            'Satellite',
	            undefined); // the current base layer

	    addBaseLayerOption(
	            'Street',
	            Cesium.createOpenStreetMapImageryProvider());

	    addBaseLayerOption(
	            'Sea',
	            new Cesium.BingMapsImageryProvider({
                url : 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.ROAD
            }));

	    addBaseLayerOption(
	            'Air',
	            new Cesium.BingMapsImageryProvider({
                url : 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.AERIAL
            }));

	    // Create the additional layers
	    addAdditionalLayerOption(
            'NowCoast Weather Radar',
            new Cesium.ArcGisMapServerImageryProvider(
            {
                url : 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export',
                layers : '3',
                // proxy : new Cesium.DefaultProxy('/proxy/')
            }));
	}

	main.getColumbus 		= function()
	{
		return isColumbus;
	}

	main.setColumbusView 	= function()
	{
		if (isColumbus)
		{
			isColumbus = false;
			main.viewer.scene.morphTo3D();
		}
		else
		{
			isColumbus = true;
			main.viewer.scene.morphToColumbusView();
		}
	}
}