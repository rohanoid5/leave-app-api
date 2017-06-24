// const campground = require('../models/campground');
// const comment = require('../models/comment');

let data = [
	{
		"name": "Rupkund",
      	"image": "image_one",
      	"description": "A nice place to go for trekking."
    },
    {
    	"name": "Baranti",
      	"image": "image_two",
      	"description": "A place where rookies go to get the first trekking experience"
  	},
  	{
  		"name": "Simla",
      	"image": "image_three",
      	"description": "A chill place to do some badass trekking and snowball fighting."
  	},
  	{
  		"name": "Himachal Prades",
      	"image": "image_four",
     	 "description": "The paradise of true trekkers in India."
  	}
];

function seedDb() {

	// comment.remove({}, (err, cData) => {
	// 	if (err) console.log(err);
	// 	else console.log("Removed all comments");
	// });
	//
	// campground.remove({}, (err, data) => {
	// 	if (err) console.log(err);
	// 	else {
	// 		console.log("Removed all campgrounds");
	// 		// comment.remove({}, (err, cData) => {
	// 		// 	if (err) console.log(err);
	// 		// 	else console.log("Removed all comments");
	// 		// });
	// 	}
	// });
	//
	// data.forEach((seed) => {
	// 	campground.create(seed, (err, campgroundData) => {
	// 		if (err) console.log(err);
	// 		else {
	// 			//console.log("Added "+campgroundData);
	// 			comment.create(
	// 				{
	// 					"text": "This is a wondeful place to visit.",
	// 					"author": "Homer"
	// 				}, (err, commentData) => {
	// 					if(err) console.log(err);
	// 					else {
	// 						//console.log("Added comment "+commentData);
	// 						campgroundData.comments.push(commentData);
	// 						campgroundData.save();
	// 					}
	// 				}
	// 			);
	// 		}
	// 	});
	// });
}

module.exports = seedDb;
