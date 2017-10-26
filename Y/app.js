//client front side
var wishMakeup = new Firebase('https://what-the-blush.firebaseio.com/');

$(document).ready(function() {
	console.log("api.js laoded!");

	var secondaryAppConfig = {
    authDomain: "what-the-blush.firebaseapp.com",
    databaseURL: "https://makeup-api.herokuapp.com/api/v1/products.json/",
    storageBucket: "what-the-blush.appspot.com",
   };

   $('#productTypeForm').on('submit', function (e) { e.preventDefault(); retrieveBrands(); });
});

function filterBrands(brands) {

  // Filter out nulls
	brands = brands.filter(function (brand) { return brand; });

	// Get unique brands
	brandSet = {}; // Keys of an object form a set
	brands.map(function (brand) { brandSet[brand] = 1; });
	brands = Object.keys(brandSet);

	return brands;
}

//var result; // DONT USE GLOBAL VARIABLES
function retrieveBrands() { //myFunction() { // BETTER FUNCTION NAMES
    var productType = document.getElementById("productType").value.trim();
    var url = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + productType;
    $.ajax ({
        method: 'GET',
        url: url,
        dataType: "json",
        success: function(data) {
        	var brands = data.map(function (datum) { return datum.brand; });

        	brands = filterBrands(brands)

            // saveToList(productType, brand); 
            displayProductListModal(productType, brands);
            $('#productListModal').modal('show');
        }
    });
 }

 function displayProductListModal(productType, brands) {
 	console.log('displayProductListModal', productType, brands);

 	$('#productTypeLabel').text(productType);

	var content = '';
	brands.map(function (brand) {
		content += '<a class="item">' + brand + '</a>';
	});
 	$('#productList').children().remove();
 	$('#productList').append(content);

 	$('#productList .item').on('click', function(e) {
 		e.preventDefault();
 		var brand = $(e.target).text();
 		saveToList(productType, brand);
 		$('#productListModal').modal('hide');
 	});

 	$('#productListModal').modal('show');

 }

//synthetic or cached database firebase
function saveToList(productType, brand) { // Pass brand into saveToList, don't use global vars
    //when user hits enter, will attempt to save data
        if(productType.length > 0) {
            saveToFB(productType, brand);
            // console.log(result);
        }
        document.getElementById('productType').value = '';
        return false;
}

//save data to Firebase
function saveToFB(productType, brand) {
	// console.log(brand);
	wishMakeup.push({
		name: productType,
		returnedBrand: brand
	});
}

function refreshUI(list) {
	var lis = '';
  console.log('refreshUI', list);
	for (var i = 0; i < list.length; i++) {
		// console.log(result);
		//lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' ' + list[i].returnedBrand + ' [' + genLinks(list[i].key, list[i].name, list[i].returnedBrand) + ']</li>';
		var key = list[i].key;
		var brand = list[i].returnedBrand;
		var productType = list[i].name;
		lis +=  '<div class="item">' +
		         	'<i class="icon paint brush"></i>' +
	            	'<div class="content">' +
		            	'<span class="brandName">' + brand + '</span> <span class="productType">' + productType + '</span>' + '&nbsp' + '&nbsp' + 
								  	'<div class="ui black mini buttons">' +
											'<button class="ui edit button" data-key="'+key+'" data-product="'+productType+'">Edit</button>' +
											'<button class="ui delete button" data-key="'+key+'" data-product="'+productType+'">Delete</button>' +
											'<button class="ui heart button"><i class="heart icon"></i></button>' +
										'</div>' +
									'</div>' +
								'</div>';
		// console.log(result);
	}
	document.getElementById('wishMakeup').innerHTML = lis;

	$('#wishMakeup .button').on('click', function(e) {
		e.preventDefault();
		var btn = $(e.target);
		var key = btn.data('key');
		var productType = btn.data('product');

		if (btn.hasClass('edit')) {
			edit(key, productType);
		} else if (btn.hasClass('delete')) {
			del(key, productType);
		} else if (btn.hasClass('heart')) {
			// TODO
		}
	});
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
// var modal = document.getElementById('myModal');
// var btn = document.getElementById('hit');
// var span = document.getElementsByClassName("close")[0];

// btn.onclick = function() {
// 	modal.style.display = "block";
// };

// span.onclick = function() {
// 	modal.style.display = "none";
// };
// console.log("Wednesday");
// window.onclick = function(event) {
// 	if(event.target == modal) {
// 		modal.style.display = "none";
// 	}
// };

//edit
function edit(key, muName) {
	var productType = prompt("Update the makeup name", muName);
	if(productType && productType.length > 0) {
		//build FB endpoint to item in makeup collection
		var updateMakeupRef = buildEndPoint(key);
		updateMakeupRef.update({
			name: productType
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
		        var name = data[key].name ? data[key].name : '';
                        var returnedBrand = data[key].returnedBrand ? data[key].returnedBrand : '';
			if(name.trim().length > 0) {
				list.push({
					name: name,
					key: key,
					returnedBrand: returnedBrand
				});
			}
		}
	}
	//refresh UI
	refreshUI(list);
});
