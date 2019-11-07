var MultiMedia 	= function()
{
	var main 	= this;
	var viewer 	= null;

	main.fontColor 	= "#000000";

	var mediaMarkers 	= [];
	var mediaArrays 	= [];
	var desc 		 	= '';
	var uniqueId 		= 0;

	var multimediaPosition;

	main.init 			= function(view)
	{
		initEvent();
		viewer 		= view;
		uniqueId	= 0;
	}

	function getCesiumPosition(windowPosition)
	{
	    var position = viewer.camera.pickEllipsoid(windowPosition, viewer.scene.globe.ellipsoid);

	    if (position == undefined)
	    	return new Cesium.Cartographic(0, 0, 0);

	    var cartographicPosition    = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);

	    return cartographicPosition;
	}

	main.addMultiMedia 			= function(position)
	{
		var cesiumPosition = getCesiumPosition(position);

		multimediaPosition = cesiumPosition;

		// Drop Multimedia Popup
        $('.popups-block').fadeOut();
        $('.drop-multimedia-popup').fadeIn();
	}

	function uploadMultiMediaFile(file, name, desc, type, complete)
	{

		if (complete != undefined)
		{
			complete(name, desc, type, "");
		}
	}

	function getType(filename)
	{
		var parts = filename.split('.');
		var extension 	= parts[parts.length - 1];

		switch (extension.toLowerCase()) {
			case 'jpg':
		    case 'gif':
		    case 'bmp':
		    case 'png':
		    	return 'img';
		    case 'm4v':
		    case 'avi':
		    case 'mpg':
		    case 'mp4':
		    	return 'video';
		    case 'mp3':
		    case 'wmv':
		    	return 'audio';
		};

		return 'unknown';
	}

	function initEvent ()
	{
		$('.drop-multimedia-popup .clearfix .btn-cancel').on('click', function() 
	    {
	        $(".drop-multimedia-popup").fadeOut();
	        multimediaPosition = null;
	    });

	    $('.drop-multimedia-popup .clearfix .btn-save').on('click', function() 
	    {
	    	if (multimediaPosition == null) return;

	    	var input = document.getElementById('multimedia_file');
	    	var name	= $('.drop_pin_multimedia_name').val();
	    	var desc	= $('.drop_pin_multimedia_description').text();

	    	if (name == '')
	    	{

	    	}

	    	var file = input.files[0];

	    	if (file == undefined) return;

	    	var type 	= getType(file.name);

	    	if (type == 'unknown')
	    	{
	    		return;
	    	}

	    	uploadMultiMediaFile(file, name, desc, type, function (name, desc, type, path) {
	    		var media_file 	= new MediaFile();
	    		media_file.init(name, path, multimediaPosition, type);
	    		mediaArrays.push(media_file);

	    		var color 	= Cesium.Color.fromCssColorString(main.fontColor);

	    		var url 	= "/vendor/drawing/images/image_marker_icon.png";

	    		if (type == 'img')
	    		{
					url 	= "/vendor/drawing/images/image_marker_icon.png";
	    		}
	    		else if (type == 'video')
	    		{
	    			url 	= "/vendor/drawing/images/audio_marker_icon.png";
	    		}
	    		else 
	    		{
	    			url 	= "/vendor/drawing/images/video_marker_icon.png";
	    		}

	    		mediaMarkers.push(viewer.entities.add({
				    name : name,
				    description : desc,
				    id : (uniqueId ++) + "_media",
				    position : Cesium.Cartesian3.fromRadians(multimediaPosition.longitude, multimediaPosition.latitude, multimediaPosition.height),
				    billboard : {
				        image : url,
				        width : 30,
				        height: 30,
				        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				    },
				    label: {
		                text: name,
		                fillColor : color,
		                verticalOrigin : Cesium.VerticalOrigin.UP,
		                font : 'bold ' + '20px benderbold'
		            }
				}));

	    		$(".drop-multimedia-popup").fadeOut();
	    	});
	    });
	}

}