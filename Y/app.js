//client front side
var wishMakeup = new Firebase('https://what-the-blush.firebaseio.com/');

function saveToList(event) {
	//when user hits enter, will attempt to save data
	if(event.which == 13 || event.keyCode == 13) {
		var makeupName = document.getElementById('makeupName').value.trim();
		if(makeupName.length > 0) {
			saveToFB(makeupName);
		}
		document.getElementById('makeupName').value = '';
		return false;
	}
}

//save data to Firebase
function saveToFB(makeupName) {
	wishMakeup.push({
		name: makeupName
	});
}

$.ajax ({
	method: 'GET',
	url: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=&product_type=',
	data: JSON.stringify({
			url: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=&product_type='
			}),
	contentType: "application/json",
	success: console.log('success')
});
document.getElementById("makeupName").addEventListener("click", myFunction);

function myFunction() {
	var url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=&product_type=';
    document.getElementById("makeupName").innerHTML = JSON.stringify(url);
}

function refreshUI(list) {
	var lis = '';
	for (var i = 0; i < list.length; i++) {
		lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' [' + genLinks(list[i].key, list[i].name) + ']</li>';
	}
	document.getElementById('wishMakeup').innerHTML = lis;
}

function genLinks(key, muName) {
	var links = '';
	links += '<a href="javascript:edit(\'' + key + '\',\'' + muName + '\')">Edit</a> | ';
  	links += '<a href="javascript:del(\'' + key + '\',\'' + muName + '\')">Delete</a> | ';
  	links += '<a href="javascript:love(\'' + key + '\',\'' + muName + '\')">&#x2764</a>';
  	return links;
}

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

//love favorites
function love(key, muName) {
	// var loveMakeupRef = buildEndPoint(key);
	// loveMakeupRef.update();
}

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
			if(name.trim().length > 0) {
				list.push({
					name: name,
					key: key
				});
			}
		}
	}
	//refresh UI
	refreshUI(list);
});