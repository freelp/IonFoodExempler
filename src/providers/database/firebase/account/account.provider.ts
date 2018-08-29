import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { PATH_USER } from '../path-database'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'

@Injectable()
export class AccountProvider {

  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
  }

  createProfile(user, uid) {
    return this.afDatabase.object(PATH_USER + uid).set(user)
      .then((result) => {
        console.log("Profile Criado");
      })
      .catch((error) => { return error })
  }

  verifyNewUser(uid) {
    let newUser: boolean;

    return firebase.database().ref(PATH_USER + uid)
      .once("value", snapshot => {
        newUser = (snapshot.val()) ? false : true;
        console.log("New User " + newUser);
      })
      .then((result) => {
        return newUser;
      })
  }

  getUserInfo() {
    return this.afDatabase.object(PATH_USER + this.afAuth.auth.currentUser.uid)
      .snapshotChanges()
      .map(changes => {
        return { key: changes.key, ...changes.payload.val() };
      });
  }
}
