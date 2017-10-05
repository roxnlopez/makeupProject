//client front side
var wishMakeup = new Firebase('https://what-the-blush.firebaseio.com/');

$(document).ready(function() {
	console.log("api.js laoded!");

	var secondaryAppConfig = {
    authDomain: "what-the-blush.firebaseapp.com",
    databaseURL: "https://makeup-api.herokuapp.com/api/v1/products.json/",
    storageBucket: "what-the-blush.appspot.com",
    };
});
document.getElementById("hit").addEventListener('click', myFunction, false);

var result;
function myFunction() {
    var brands = document.getElementById("makeupName").innerHTML;
    console.log(brands);
    var url = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=' + brands + '';
    $.ajax ({
        method: 'GET',
        url: url,
        dataType: "json",
        success: function(data) {
            console.log('hello!'+ JSON.stringify(data[0][1].brand));
            result = JSON.stringify(data[0][1].brand;
            saveToList();
        }
    });
 }   
//synthetic or cached database firebase
 function saveToList(event) {
    //when user hits enter, will attempt to save data
        var makeupName = document.getElementById('makeupName').value.trim();
        if(makeupName.length > 0) {
            saveToFB(makeupName, result);
            // console.log(result);
        }
        document.getElementById('makeupName').value = '';
        return false;
}

//save data to Firebase
function saveToFB(makeupName, result) {
	// console.log(result);
	wishMakeup.push({
		name: makeupName,
		returnedBrand: result
	});
	// console.log(result);
}

function refreshUI(list) {
	var lis = '';
	console.log(list);
	for (var i = 0; i < list.length; i++) {
		// console.log(result);
		lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' ' + list[i].returnedBrand + ' [' + genLinks(list[i].key, list[i].name, list[i].returnedBrand) + ']</li>';
		// console.log(result);
	}
	document.getElementById('wishMakeup').innerHTML = lis;
}


function genLinks(key, muName) {
	var links = '';
	links += '<a href="javascript:edit(\'' + key + '\',\'' + muName + '\')">&nbsp; Edit &nbsp;</a> | ';
  	links += '<a href="javascript:del(\'' + key + '\',\'' + muName + '\')">&nbsp; Delete &nbsp;</a> | ';
  	// links += '<a href="javascript:a(\'' + key + '\',\'' + muName + '\')">' + heart + '</a>';
  	links += '<span class="heart">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
  	return links;
}

//modal
console.log("Tuesday");
var modal = document.getElementById('myModal');
var btn = document.getElementById('hit');
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
	modal.style.display = "block";
};

span.onclick = function() {
	modal.style.display = "none";
};
// console.log("Wednesday");
window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
};

//edit 
function edit(key, muName) {
	var makeupName = prompt("Update the makeup name", muName);
	if(makeupName && makeupName.length > 0) {
		//build FB endpoint to item in makeup collection
		var updateMakeupRef = buildEndPoint(key);
		updateMakeupRef.update({
			name: makeupName
		});
	}
}

//delete
function del(key, muName) {
	var response = confirm("Are you certain about removing \"" + muName + "\" from the list?");
	if(response === true) {
		//build FB endpoint to item in makeup collection
		var deleteMakeupRef = buildEndPoint(key);
		deleteMakeupRef.remove();
	}
}

//heart favorites
/* when a user clicks, toggle the 'is-animating' class */
$(".heart").on('click', function() {
  $(this).toggleClass('is_animating');
});
// when the animation is over, remove the class
$(".heart").on('animationend', function() {
  $(this).toggleClass('is_animating');
});


function buildEndPoint (key) {
	return new Firebase('https://what-the-blush.firebaseio.com/'+ key);
}

//this will get fired on initial load as well as when there is a change in the data
wishMakeup.on("value", function(snapshot) {
	var data = snapshot.val();
	var list = [];
	for (var key in data) {
		if(data.hasOwnProperty(key)) {
			name = data[key].name ? data[key].name : '';
			returnedBrand = data[key].returnedBrand ? data[key].returnedBrand : '';
			if(name.trim().length > 0) {
				list.push({
					name: name,
					key: key,
					returnedBrand: result
				});
			}
		}
	}
	//refresh UI
	refreshUI(list);
});