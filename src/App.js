import React, { Component } from 'react';
import logo from './assets/leetgradelogo.png';
import { fire, dbase } from './js/firebase';
import './App.css';
var clearDocuments = function(doms) {
	doms.forEach(function(dom) {
		dom.innerHTML = '';
	});
};

var onSignupComplete = function(error) {
	var signupForm = document.getElementById('signup-form');
	var signupSuccess = document.getElementById('signup-success');
	var signupError = document.getElementById('signup-error');
	var signupBtn = document.getElementById('signup-button');

	clearDocuments([signupError, signupSuccess]);

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
	var usersRef = dbase.ref('users/');
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

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div className="row">
						<div className="col-md-6 offset-md-3 text-center">
							<img src={logo} alt="Leetgrade" />
							<h2>A Tool Teachers Deserve</h2>
							<br />
							<h5>
								Book keeping and marking was not why you became
								a teacher, so why waste energy on them? We
								believe teachers’ time is best spent in the
								classroom and connecting with students, and that
								is why we want to create a gradebook with that
								purpose in mind. With Leetgrade, you can do
								everything a gradebook can do, plus additional
								features, such as email integration, calendar
								invites, report subscriptions, analytics. We
								want gradekeeping to be easy, stress-free, and a
								pleasant experience. For first access and free
								features, subscribe to our mailing list.
							</h5>
							<div className="signup">
								<p
									id="signup-success"
									className="text-success"
								/>
								<p id="signup-error" className="text-danger" />
								<div className="col-md-6 offset-md-3 text-center">
									<form
										className="signup-form text-center"
										id="signup-form"
										role="form"
									>
										<input
											className="form-control"
											name="name"
											type="name"
											placeholder="Your name"
											required
										/>
										<input
											className="form-control"
											name="email"
											type="email"
											placeholder="Your email"
											required
										/>
										<button
											className="btn btn-info"
											id="signup-button"
											type="submit"
										>
											Sign up for Leetgrade beta!
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</header>
				<div className="col-md-12 text-center">
					<br />
					2019 © Leetgrade
				</div>
			</div>
		);
	}
}

export default App;
