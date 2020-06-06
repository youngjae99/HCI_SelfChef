// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBjFa6ITtLwyYNPwAt9YWZx0crJviZYj8g",
    authDomain: "cs374-d.firebaseapp.com",
    databaseURL: "https://cs374-d.firebaseio.com",
    projectId: "cs374-d",
    storageBucket: "cs374-d.appspot.com",
    messagingSenderId: "774674175555",
    appId: "1:774674175555:web:fcf3a66700feb62352a6f6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage().ref('/images/');

window.onload = function() {
    initialize()
    getInfo("-M8ywY0Ui2yOOLRt-CT3")
}

function initialize() {
    var d = new Date()
    $('#amount').val(1);
}

function up() {
    cval = Number($('#amount').val());
    $('#amount').val(cval + 1);
}

function down() {
    cval = Number($('#amount').val());
    if (cval > 1) $('#amount').val(cval - 1);
}

function getInfo(key) {
    return firebase.database().ref('/groups/').once('value').then(function(snapshot) {
        var myValue = snapshot.val();
        var myInfo = myValue[key]
        var name = myInfo.name
        var enddate = myInfo.enddate
        var endamount = myInfo.endamount
        var pickupplace = myInfo.pickupplace
        var price = myInfo.price
        var unit = myInfo.unit
        var imageurl = myInfo.imageurl

        $('#productname').html(name)
        $('#pickupplace').html(pickupplace)
        $('#price').html(price + '/' + unit)
    })
}