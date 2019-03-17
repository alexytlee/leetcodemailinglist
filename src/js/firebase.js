import * as firebase from 'firebase';
let config = {
	apiKey: 'AIzaSyALdTPfDLE6QvVewrPcADliioxs4CCd3tU',
	authDomain: 'leetgrademailinglist.firebaseapp.com',
	databaseURL: 'https://leetgrademailinglist.firebaseio.com',
	projectId: 'leetgrademailinglist',
	storageBucket: 'leetgrademailinglist.appspot.com',
	messagingSenderId: '551938700891'
};
firebase.initializeApp(config);
var dbase = firebase.database();

export { dbase };
