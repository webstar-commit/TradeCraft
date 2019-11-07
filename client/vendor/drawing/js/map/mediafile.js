var MediaFile 		= function()
{
	var main 	= this;

	var name 	= '';
	var path	= '';
	var position		= null;
	var type 	= "img"; // img, video, audio

	main.init 	= function(nam, pth, pos, tp)
	{
		name 	= nam;
		path 	= pth;
		position 	= pos;
		type 		= tp;
	}
}