//[start] upper bar//
function go_mainpage() {
    location.href = "/MainPage_all/MainPage.html?" + now_ID
}
function go_myorderlist() {
    location.href = "/OrderList/OrderList.html?" + now_ID
}
function go_search() {
    return
}

var firebaseConfig = {
  apiKey: "AIzaSyBjFa6ITtLwyYNPwAt9YWZx0crJviZYj8g",
  authDomain: "cs374-d.firebaseapp.com",
  databaseURL: "https://cs374-d.firebaseio.com",
  projectId: "cs374-d",
  storageBucket: "cs374-d.appspot.com",
  messagingSenderId: "774674175555",
  appId: "1:774674175555:web:fcf3a66700feb62352a6f6"
};

var formatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month, day)
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

var daysLeft = function(input) {
  var inputDate = parseDate(input);
  var today = new Date();
  var timeDiff = inputDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

var orderProList;
var preorderProList;


function firebaseLoad(){
  $('<div class="loader"></div>').appendTo("#ongoingList");

  firebase.initializeApp(firebaseConfig);
  firebase.database().ref('/user').child("KSW").child("join").on('value', function(snapshot) {
    var myValue = snapshot.val();
    console.log("myValue", keyList);
    var keyList = Object.keys(myValue); //this is exampleKey, exampleKey3, ...
    console.log("myValue", keyList);
    ans_list = [];
    for (var i = 0; i < keyList.length; i++) {
            var groupKey = myValue[keyList[i]].groupKey; //access groupKey under user
            var groupRef = firebase.database().ref("groups").child(groupKey);
            groupRef.once('value', function(snapshot) {
            //from here, youngjae
                		var cur = snapshot.val(); //keyList[i] is the key, cur is the object
            	console.log(cur);

                		var originPrice = parseFloat(cur.price);
                		var price = formatter.format(originPrice);

                		var duedate = daysLeft(cur.enddate);
                		if (duedate <= 0) {
                  	duedate = "Finished!";
                		} else {
                  	duedate += " days left";
                		}
                //add item according to firebase
                $('<li class="ongoingProduct" id=' + 'exampleKey2' + '>' +
                  '<a class="ongoingProductLink" href=' + cur.url + '>' +
                  '<dl>' +
                  '<div class="with-bg-size" style="background-image: url(' + cur.imageurl + ');"></div>' +
                  '<div class="progress-container">' +
                  '<div class="progressbar" style="width:' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%"></div></div>' +
                  '<dd class="descriptions">' +
                  '<div class="badges">' +
                  '<p class="progressPercent">' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%' + '</p>' +
                  '<p class="progressPercent"><i class="fas fa-user"></i>' + cur.currentamount + ' joined' + '</p>' +
                  '<p class="progressNote">' + cur.enddate + '</p></div>' +
                  '<p class="progressNote">' + duedate + '</p></div>' +
                  '<div class="name">' + cur.name + '</div>' +
                  '<div class="location">' +
                  '<i class="fas fa-map-marker-alt"></i>' + ' ' + cur.pickupplace + '</div>' +
                  '<div class="price-area">' +
                  '<div class="price-wrap">' +
                  '<span class="prev-cost">' + 'now the price is' + '</span>' +
                  '<span class="cost">' + price + '</span></div></dd></dl></a>' +
                  '<div class="deleteBtn">Cancel</div></li>').appendTo("#ongoingList");
                //orderProList.push([cur.question, cur.input, cur.ans, cur.ox]);
            }); //end of groupRef.once
          } //end of for loop
	         $( ".loader" ).remove();
  });
}

$(document).ready(function() {
  now_ID = location.href.split("?", 2)[1];
  searchfor= location.href.split("?", 2);

  document.getElementById("My_Name").innerHTML = now_ID;
  firebaseLoad();
/*
  $('<div class="loader"></div>').appendTo("#ongoingList");

  //firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
  }

  firebase.database().ref('/groups').on('value', function(snapshot) {
    var myValue = snapshot.val();
    console.log("myValue", keyList);
    var keyList = Object.keys(myValue);
    console.log("myValue", keyList);
    ans_list = [];
    for (var i = 0; i < keyList.length; i++) {
      var cur = myValue[keyList[i]];

      var originPrice = parseFloat(cur.price);
      var price = formatter.format(originPrice);

      var duedate = daysLeft(cur.enddate);
      if (duedate <= 0) {
        duedate = "Finished!";
      } else {
        duedate += " days left";
      }
      //add item according to firebase
      $('<li class="ongoingProduct" id=' + 'exampleKey2' + '>' +
        '<a class="ongoingProductLink" href=' + cur.url + '>' +
        '<dl>' +
        '<div class="with-bg-size" style="background-image: url(' + cur.imageurl + ');"></div>' +
        '<div class="progress-container">' +
        '<div class="progressbar" style="width:' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%"></div></div>' +
        '<dd class="descriptions">' +
        '<div class="badges">' +
        '<p class="progressPercent">' + ((cur.currentamount / cur.endamount) * 100).toFixed(1) + '%' + '</p>' +
        '<p class="progressPercent"><i class="fas fa-user"></i>' + cur.currentamount + ' joined' + '</p>' +
        '<p class="progressNote">' + cur.enddate + '</p></div>' +
        '<p class="progressNote">' + duedate + '</p></div>' +
        '<div class="name">' + cur.name + '</div>' +
        '<div class="location">' +
        '<i class="fas fa-map-marker-alt"></i>' + ' ' + cur.pickupplace + '</div>' +
        '<div class="price-area">' +
        '<div class="price-wrap">' +
        '<span class="prev-cost">' + 'now the price is' + '</span>' +
        '<span class="cost">' + price + '</span></div></dd></dl></a></li>').appendTo("#ongoingList");
      //orderProList.push([cur.question, cur.input, cur.ans, cur.ox]);
    }
    $( ".loader" ).remove();
  });
*/

  //del button click events
  $(document).on("click", ".deleteBtn", function() { //del button click events

    var n = this.parentNode.id; //the id is the key to delete; for now: exampleKey2
    console.log("delete", n);
    var check = confirm("Are you sure to cancel " + n + "?");
    if (check) {
      $("#" + n).remove();
      //remove item from firebase
      firebase.database().ref("user").child("KSW").child("join").child(n).remove();
    }
    // ==========================
    // >>> Delete element in firebase db
    // ==========================
  });

  $(document).on("mouseover", ".ongoingProduct", function() {
    $(this).css("box-shadow", "0px 0px 22px -6px gray");
  });
  $(document).on("mouseleave", ".ongoingProduct", function() {
    $(this).css("box-shadow", "0px 0px 0px 0px gray");
  });

  now_ID=location.href.split("?",2)[1]


  //search button event handler
  var searchButton = document.getElementById("button_search");
  var searchInput = document.getElementById("search");
  searchButton.onclick = function() {
	var searchedText = searchInput.value; //this is the text searched
	var returnedKeys = keySearched(searchedText); //return the keys that were searched
	//console.log(returnedKeys);
	searchInput.value = ""; //clear out the input space
	searchInput.focus(); //focus on the search input
  }

  //function that returns the keys searched
  function keySearched(searchedText) {
	  var returnKeyList = []; //list of keys that will be returned
	  firebase.database().ref('/groups').on('value', function(snapshot) {
		if(snapshot.exists()){
			var myValue = snapshot.val();
			var keyList = Object.keys(myValue); //these are the keys in 'groups'

			for (var i = 0; i < keyList.length; i++) {
				var myGroup = myValue[keyList[i]];
				//nameCompare: true means name contains searchedText
				var nameCompare = myGroup.name.toUpperCase().includes(searchedText.toUpperCase());
				//tagCompare: true means at least one tag contains searchedText
				var tagArray = myGroup.tag.split(" "); //array of tags (with #)
				var tagCompare = false;
				for(var k=0; k < tagArray.length; k++){
					if(tagArray[k].toUpperCase().includes(searchedText.toUpperCase())){
						tagCompare = true;
						break;
					}
				}

				if(nameCompare || tagCompare){
					returnKeyList.push(keyList[i]);
				}
			}

		}
	  });
	  return returnKeyList;
  }


});