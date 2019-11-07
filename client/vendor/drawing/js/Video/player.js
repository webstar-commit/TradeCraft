var VideoPlayer 	= function()
{
	var main 		= this;

	var video 		= null;
	var videoContainer 	= null;
	var streamUrl 	= "";
	var completeloaded = false;
	var autoPlay 		= false;
	var klvParser 		= null;

	var hls,events, stats, enableStreaming = true, autoRecoverError = true, enableWorker = true, levelCapping = -1, defaultAudioCodec = undefined;

	main.init 		= function()
	{
		video = $('#myVideo');
		videoContainer = $('#video-player-content');
		video[0].removeAttribute("controls");

		initEvent();
	}

	function initEvent()
	{
		video.on('click', function() { playpause(); } );

		$('.btn-play').on('click', function() { playpause(); } );

		// Video Player Track Time
	    $('.play-track-block').mousemove(function(event) {
	    	if (video[0] == null) return;

	        var pos = $(this).offset();
	        var pageX = event.pageX;
	        var x = pageX - pos.left - 20;

	        var timeBlockWidth = $('.time-video').width();

			var maxduration = video[0].duration;
			if (isNaN(maxduration)) return;

			var rate = x / $('.play-track-block').width() * maxduration;

			$('.time-video').text( timeFormat(rate) );

	        $(this).find('.time-video').css({
	            'display' : 'block',
	            'left' : x - (timeBlockWidth/2) + 'px'
	        });
	    });

	    $('.play-track-block').mouseout(function() {
	        $(this).find('.time-video').hide();
	    });

		video.on('canplay', function() {
			$('.loading').fadeOut(10);
		});

		video.on('ended', function() {
			$('.btn-play').removeClass('pause');
			video[0].pause();
		});

		video.on('canplaythrough', function() {
			completeloaded = true;
		});

		//video seeking event
		video.on('seeking', function() {
			//if video fully loaded, ignore loading screen
			if(!completeloaded) { 
				$('.loading').fadeIn(100);
			}	
		});

		//video seeked event
		video.on('seeked', function() { });
		
		//video waiting for more data event
		video.on('waiting', function() {
			$('.loading').fadeIn(100);
		});

		video.on('timeupdate', function() {
			var currentPos = video[0].currentTime;
			var maxduration = video[0].duration;
			var perc = 100 * currentPos / maxduration;
			$('.play-track-viewed').css('width',perc+'%');	
			$('.current').text(timeFormat(currentPos));
		});

		function klvUpdate()
		{
			var currentPos = video[0].currentTime;
			var maxduration = video[0].duration;

			var currentKLVIndex = currentPos / maxduration * (klvParser.klvDatas.length - 1);

			updateKLVData(klvParser.klvDatas[Math.floor(currentKLVIndex)]);

			if (currentPos < maxduration)
			{
				setTimeout(klvUpdate, 100);
			}
		}

		function updateKLVData(data)
		{
			$('#plat_lat').html('<span>LAT: </span>' + data.plat_lat.toFixed(5));
			$('#plat_lon').html('<span>Long: </span>' + data.plat_lon.toFixed(5));
			$('#plat_mgrs').html('<span>MGRS: </span>' + data.mgrs);
			$('#plat_alt').html('<span>Altitude: </span>' + data.plat_alt.toFixed(5));
			$('#plat_speed').html('<span>Speed: </span>' + data.plat_speed.toFixed(2) + " MPH");
			$('#plat_pitch').html('<span>Pitch: </span>' + data.pitch.toFixed(5));
			$('#plat_yaw').html('<span>Yaw: </span>' + data.heading.toFixed(5));
			$('#plat_roll').html('<span>Roll: </span>' + data.roll.toFixed(5));
			$('#plat_bearing').html('<span>Bearing: </span>' + data.bearing.toFixed(5));

			$('#target_lat').html('<span>LAT: </span>' + data.target_lat.toFixed(5));
			$('#target_lon').html('<span>LONG: </span>' + data.target_lon.toFixed(5));
			$('#target_mgrs').html('<span>MGRS: </span>' + data.mgrs);
			$('#target_elevat').html('<span>Elevation: </span>' + data.target_elevation.toFixed(5));
			$('#target_speed').html('<span>Speed: </span>' + data.target_speed.toFixed(2) + " MPH");

			klvModel.showCameraViewRegion(data.plat_lon, data.plat_lat, data.plat_alt, data.target_lon, data.target_lat, data.target_elevation, data.heading, data.pitch, data.roll, data.horizontal_fov, data.vertical_fov);
		}

		video.on('loadedmetadata', function() {
			$('.current').text(timeFormat(0));
			$('.duration').text(timeFormat(video[0].duration));

			setTimeout(startBuffer, 150);

			$('.btn-play').addClass('pause');
			$(this).unbind('click');
			video[0].play();

			if (klvParser != null)
			{
				klvUpdate();
			}
		});

		$('.backward a').on('click', function() { 

			if (video[0] == null) return;
			var name = $(this).attr("info");
			var rate = 1.0;

			if (name == '1x')
			{
				rate = 1.0;
			} 
			else if (name == '2x')
			{
				rate = 0.5;
			}
			else if (name == '3x')
			{
				rate = 0.3;
			}
			else if (name == '5x')
			{
				rate = 0.2;
			}
			else if (name == '10x')
			{
				rate = 0.1;
			}

			video[0].playbackRate = rate;

		} );

		$('.forward a').on('click', function() { 
			if (video[0] == null) return;
			var name = $(this).attr("info");
			var rate = 1.0;

			if (name == '1x')
			{
				rate = 1.0;
			} 
			else if (name == '2x')
			{
				rate = 2.0;
			}
			else if (name == '3x')
			{
				rate = 3.0;
			}
			else if (name == '5x')
			{
				rate = 5.0;
			}
			else if (name == '10x')
			{
				rate = 10.0;
			}

			video[0].playbackRate = rate;

		} );
	}

	//Time format converter - 00:00
	var timeFormat = function(seconds){
		var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
		var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	};	

	function playpause() {
		if(video[0].paused || video[0].ended) {
			$('.btn-play').addClass('pause');
			video[0].play();
		}
		else {
			$('.btn-play').removeClass('pause');
			video[0].pause();
		}
	};

	function loadStream(url) {
	    if(Hls.isSupported()) {
	        if(hls) {
	            hls.destroy();
	            if(hls.bufferTimer) {
	                clearInterval(hls.bufferTimer);
	                hls.bufferTimer = undefined;
	            }
	            hls = null;
	        }

	        //events = { url : url, t0 : performance.now(), load : [], buffer : [], video : [], level : [], bitrate : []};
	        //recoverDecodingErrorDate = recoverSwapAudioCodecDate = null;
	        hls = new Hls({debug:false, enableWorker : enableWorker, defaultAudioCodec : defaultAudioCodec});
	        hls.loadSource(url);
	        hls.autoLevelCapping = levelCapping;
	        hls.attachMedia(video[0]);
	    } else {
	        if(navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
	        	alert("you are using Firefox, it looks like MediaSource is not enabled,\nplease ensure the following keys are set appropriately in about:config\nmedia.mediasource.enabled=true\nmedia.mediasource.mp4.enabled=true\nmedia.mediasource.whitelist=false");
	        } else {
	            alert("your Browser does not support MediaSourceExtension / MP4 mediasource");
	        }
	    }
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function getURLParam(sParam, defaultValue) {
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) {
	            return "undefined" == sParameterName[1] ? undefined : sParameterName[1];
	        }
	    }
	    return defaultValue;
	}

	var startBuffer = function() {
		var currentBuffer = video[0].buffered.end(0);
		var maxduration = video[0].duration;
		var perc = 100 * currentBuffer / maxduration;
		$('.play-track-uploaded').css('width',perc+'%');
			
		if(currentBuffer < maxduration) {
			setTimeout(startBuffer, 500);
		}
	}

	main.setStreamUrl 	= function(url)
	{
		main.streamUrl 	= url;
	}

	main.startPlayUrl 	= function(url, klvUrl, auto)
	{
		$('.loading').fadeIn(100);
		$('.videoBack').fadeOut(100);

		main.setStreamUrl(url);
		autoPlay = auto;

		if (klvUrl != undefined)
		{
			if (klvParser == null)
			{
				klvParser = new KLVParser();
			}
			
			klvParser.reset();
			klvParser.setUrl(klvUrl);
			klvParser.parseKLV(function() {
				loadStream(decodeURIComponent(getURLParam('src', main.streamUrl)));
			});
		}
		else
		{
			klvParser = null;
			loadStream(decodeURIComponent(getURLParam('src', main.streamUrl)));
		}		
	}
}