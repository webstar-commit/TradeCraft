var KLVParser 	= function()
{
	var main	 = this;

	var klvUrl 		= "";
	main.klvDatas	= [];
	main.initTime 	= -1;

	main.setUrl 	= function(url)
	{
		klvUrl = url;
		main.klvDatas = [];
	}

	main.reset 		= function()
	{
		klvUrl = "";
		main.klvDatas = [];
		main.initTime = -1;
	}

	main.parseKLV 	= function(complete)
	{
		$.get(klvUrl, function (readData) 
		{
			if (complete != undefined)
			{
				complete();
			}
			for (var i = 0; i < readData.length; i ++)
			{
				var data = new KLVData();

				for (var j = 0; j < readData[i][1].length; j ++)
				{
					setKLVData(data, readData[i][1][j][0], readData[i][1][j][1]);
				}
				main.klvDatas.push(data);
			}
		});
	}

	function setKLVData(data, key, value)
	{
		if (key == 'unix-timestamp')
		{
			data.time = value;
		}
		else if (key == 'platform-heading')
		{
			data.heading = parseFloat(value);
		}
		else if (key == 'platform-pitch')
		{
			data.pitch = parseFloat(value);
		}
		else if (key == 'platform-roll')
		{
			data.roll = parseFloat(value);
		}
		else if (key == 'image-coordinate-system')
		{
			data.mgrs = value;
		}
		else if (key == 'image-source-sensor')
		{
			data.mgrs = value;
		}
		else if (key == 'sensor-lat')
		{
			data.plat_lat = parseFloat(value);
		}
		else if (key == 'sensor-lon')
		{
			data.plat_lon = parseFloat(value);
		}
		else if (key == 'sensor-true-alt')
		{
			data.plat_alt = parseFloat(value);
		}
		else if (key == 'platform-ground-speed')
		{
			data.plat_speed = parseFloat(value);
			data.target_speed = parseFloat(value);
		}
		else if (key == 'target-location-lat')
		{
			data.target_lat = parseFloat(value);
		}
		else if (key == 'target-location-lon')
		{
			data.target_lon = parseFloat(value);
		}
		else if (key == 'target-location-elevation')
		{
			data.target_elevation = parseFloat(value);
		}
		else if (key == 'frame-center-lat')
		{
			data.target_lat = parseFloat(value);
		}
		else if (key == 'frame-center-lon')
		{
			data.target_lon = parseFloat(value);
		}
		else if (key == 'frame-center-elevation')
		{
			data.target_elevation = parseFloat(value);
		}
		else if (key == 'sensor-relative-azimuth')
		{
			data.bearing = parseFloat(value);
		}
		else if (key == 'sensor-horizontal-fov')
		{
			data.horizontal_fov = parseFloat(value);
		}
		else if (key == 'sensor-vertical-fov')
		{
			data.vertical_fov = parseFloat(value);
		}
	}
}

var KLVData 	= function()
{
	var main 	= this;

	main.time 	= 0;
	main.plat_lat = 0;
	main.plat_lon = 0;
	main.mgrs 	= '';
	main.plat_alt = 0;
	main.plat_speed = 0;
	main.pitch 	= 0;
	main.heading 	= 0;
	main.roll 	= 0;
	main.bearing 	= 0;
	main.target_lat = 0;
	main.target_lon = 0;
	main.target_elevation = 0;
	main.target_speed = 0;
	main.horizontal_fov = 0;
	main.vertical_fov = 0;
}