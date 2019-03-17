import React, { Component } from 'react';
import logo from './assets/leetgradelogo.png';
import { dbase } from './js/firebase';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: [],
			alert: false,
			alertData: {}
		};
	}

	showAlert(type, message) {
		this.setState({
			alert: true,
			alertData: { type, message }
		});
		setTimeout(() => {
			this.setState({ alert: false });
		}, 4000);
	}

	resetForm() {
		this.refs.contactForm.reset();
	}

	componentWillMount() {
		let formRef = dbase
			.ref('form')
			.orderByKey()
			.limitToLast(6);
		formRef.on('child_added', snapshot => {
			const { name, email } = snapshot.val();
			//const data = { name, email };
			//console.log(data);
		});
	}

	sendMessage(e) {
		e.preventDefault();
		const params = {
			name: this.inputName.value,
			email: this.inputEmail.value
		};
		if (params.name && params.email) {
			dbase
				.ref('users')
				.push(params)
				.then(() => {
					this.showAlert('success', 'Thanks for signing up!');
				})
				.catch(() => {
					this.showAlert(
						'danger',
						"Oh no! Error occured. We're on it!"
					);
				});
			this.resetForm();
		} else {
			this.showAlert('warning', 'Please fill the form');
		}
	}

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
						</div>
					</div>

					<div>
						<br />
						<form
							onSubmit={this.sendMessage.bind(this)}
							ref="contactForm"
						>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="Name"
									ref={name => (this.inputName = name)}
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									id="email"
									placeholder="Email"
									ref={email => (this.inputEmail = email)}
								/>
							</div>
							<button type="submit" className="btn btn-info">
								Sign up for Leetgrade beta!
							</button>
						</form>
						<br />
						{this.state.alert && (
							<div
								className={`alert alert-${
									this.state.alertData.type
								}`}
								role="alert"
							>
								<div className="container">
									{this.state.alertData.message}
								</div>
							</div>
						)}
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
