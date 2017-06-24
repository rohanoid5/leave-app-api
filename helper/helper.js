function toCampground(body, campground) {	
	return new campground(
			{
				name: body.name,
				image: body.image,			
			});
}

exports.create = function(model, campgroundArr, requestBody) {
	var campground = toCampground(requestBody, model);
	return campgroundArr.push(campground);
};

exports.normalizePort = function(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}