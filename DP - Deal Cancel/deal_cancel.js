// Opens the popup
function dealCancel() {
	var dealCancelPopup = document.getElementById("dealCancelPopup");
	dealCancelPopup.classList.toggle("showPopup");
}

// Closes the popup
function clickClose() {
	var dealCancelPopup = document.getElementById("dealCancelPopup");
	dealCancelPopup.classList.toggle("showPopup");
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

firebase.initializeApp(firebaseConfig);

function bringFromDatabase(){
	//�ش��ϴ� database���� ������ ������
}