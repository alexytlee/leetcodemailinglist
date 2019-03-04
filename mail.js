var signupForm = document.getElementById('signup-form');
var signupSuccess = document.getElementById('signup-success');
var signupError = document.getElementById('signup-error');
var signupBtn = document.getElementById('signup-button');

// Initialize Firebase

var config = {
	apiKey: '<API_KEY>',
	authDomain: '<PROJECT_ID>.firebaseapp.com',
	databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
	projectId: '<PROJECT_ID>',
	storageBucket: '<BUCKET>.appspot.com',
	messagingSenderId: '<SENDER_ID>'
};
firebase.initializeApp(config);

var onSignupComplete = function(error) {
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
	var myFirebaseRef = new Firebase(
		'https://yourappname.firebaseio.com/signups'
	);
	myFirebaseRef.push(
		{
			name: formObj.name.value,
			email: formObj.email.value
		},
		onSignupComplete
	);
	signupBtn.disabled = true;
	return false;
}
