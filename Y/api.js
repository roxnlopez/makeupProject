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

	document.getElementById("makeupName").addEventListener('keypress', myFunction, false);
});

function myFunction() {
    var brand = document.getElementById("makeupName").innerHTML;
    var url = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=' + brand;
    $.ajax ({
        method: 'GET',
        url: url,
        dataType: "json",
        success: function(res) {
            console.log('hello');
            console.log(res); 
        }
    });
 }   
