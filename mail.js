
// Initialize Firebase

var config = {
	apiKey: "AIzaSyALdTPfDLE6QvVewrPcADliioxs4CCd3tU",
	authDomain: "leetgrademailinglist.firebaseapp.com",
	databaseURL: "https://leetgrademailinglist.firebaseio.com",
	projectId: "leetgrademailinglist",
	storageBucket: "leetgrademailinglist.appspot.com",
	messagingSenderId: "551938700891"
};

firebase.initializeApp(config);

var database = firebase.database()

var clearDocuments = function (doms) {
	doms.forEach(function(dom) {
		dom.innerHTML = '';
	})
}

var onSignupComplete = function (error) {
	var signupForm = document.getElementById('signup-form');
	var signupSuccess = document.getElementById('signup-success');
	var signupError = document.getElementById('signup-error');
	var signupBtn = document.getElementById('signup-button');

	clearDocuments([signupError, signupSuccess])

	signupBtn.disabled = false;
	if (error) {
		signupError.innerHTML = 'Sorry. Could not signup.';
	} else {
		signupSuccess.innerHTML = 'Thanks for signing up!';
		// hide the form
		signupForm.style.display = 'none';
	}
};

function signup(formObj) {
	// Store emails to firebase
	var usersRef = database.ref('users/')
	var signupBtn = document.getElementById('signup-button');

	usersRef.push(
		{
			name: formObj.name.value,
			email: formObj.email.value
		},
		onSignupComplete
	);
	signupBtn.disabled = true;
	return false;
}
