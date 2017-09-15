// //back server side
// var firebase = require('firebase').initializeApp({
//   	serviceAccount: "path/to/serviceAccountKey.json",
//   	databaseURL: "https://what-the-blush.firebaseio.com/"
// });

// var wantList = {text: 'hey guys', timestamp: new Date().toString()};
// var ref = firebase.database().ref().child('what-the-blush');
// var logsRef = ref.child('logs');
// var wantListsRef = ref.child('wantList');
// var wantListRef = wantListsRef.push(wantList);

// logsRef.child(wantListRef.key).set(wantList);

// logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
// 	console.log('added', snap.val());
// });

// logsRef.on('child_removed', function(snap) {
// 	console.log('removed', snap.val());
// });

// logsRef.on('child_changed', function(snap) {
// 	console.log('changed', snap.val());
// });

// logsRef.on('value', function(snap) {
// 	console.log('value', snap.val());
// });
// //   //basic write operation
// //   function writeUserData(userId, name, email, imageUrl) {
// //   firebase.database().ref('users/' + userId).set({
// //     username: name,
// //     email: email,
// //     profile_picture : imageUrl
// //   });
// // }

// // //listen for value event
// // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// // starCountRef.on('value', function(snapshot) {
// //   updateStarCount(postElement, snapshot.val());
// // });

// // //read once...not expected to change
// // var userId = firebase.auth().currentUser.uid;
// // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
// //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// //   // ...
// // });

// // //create a post
// // function writeNewPost(uid, username, picture, title, body) {
// //   // A post entry.
// //   var postData = {
// //     author: username,
// //     uid: uid,
// //     body: body,
// //     title: title,
// //     starCount: 0,
// //     authorPic: picture
// //   };

// //   // Get a key for a new Post.
// //   var newPostKey = firebase.database().ref().child('posts').push().key;

// //   // Write the new post's data simultaneously in the posts list and the user's post list.
// //   var updates = {};
// //   updates['/posts/' + newPostKey] = postData;
// //   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

// //   return firebase.database().ref().update(updates);
// // }

// // // Create a new post reference with an auto-generated id
// // var newPostRef = postListRef.push();
// // newPostRef.set({
// //     // ...
// // });