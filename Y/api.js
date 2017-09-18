$(document).ready(function() {
	console.log("api.js laoded!");

	var secondaryAppConfig = {
    authDomain: "what-the-blush.firebaseapp.com",
    databaseURL: "https://makeup-api.herokuapp.com/api/v1/products.json/",
    storageBucket: "what-the-blush.appspot.com",
    };
    
    // var secondary = firebase.initializeApp(secondaryAppConfig, "secondary");
    // var secondaryDatabase = secondary.database();

     // Use the otherApp variable to retrieve the other app's services
    // var otherStorage = secondary.storage();
    // var otherDatabase = secondary.database();

    $.ajax ({
	method: 'GET',
	url: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=&product_type=',
	dataType: "json",
	success: myFunction
	});
	document.getElementById("makeupName").addEventListener('keypress', myFunction, false);
});

function myFunction(data) {
	
    console.log(data[0]);
}
