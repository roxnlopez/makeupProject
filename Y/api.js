// $(document).ready(function() {
// 	console.log("api.js laoded!");

// 	var secondaryAppConfig = {
//     authDomain: "what-the-blush.firebaseapp.com",
//     databaseURL: "https://makeup-api.herokuapp.com/api/v1/products.json/",
//     storageBucket: "what-the-blush.appspot.com",
//     };

// 	document.getElementById("hit").addEventListener('click', myFunction, false);
// });
// var result;
// function myFunction() {
//     var brands = document.getElementById("makeupName").innerHTML;
//     console.log(brands);
//     var url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=' + brands + '';
//     $.ajax ({
//         method: 'GET',
//         url: url,
//         dataType: "json",
//         success: function(data) {
//             console.log('hello!'+ JSON.stringify(data[0].brand));
//             result = JSON.stringify(data[0].brand);
//             saveToList();
//         }
//     });
//  }   

//  function saveToList(event) {
//     //when user hits enter, will attempt to save data
//     if(event.which == 13 || event.keyCode == 13) {
//         var makeupName = document.getElementById('makeupName').value.trim();
//         if(makeupName.length > 0) {
//             saveToFB(makeupName);
//         }
//         document.getElementById('makeupName').value = '';
//         return false;
//     }
// }