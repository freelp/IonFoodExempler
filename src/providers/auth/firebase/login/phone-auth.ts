import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class PhoneAuthProvider {

  resultCode: any;
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth) {
    }

  recaptchaInit() {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  sendCodeVerify(phone, recaptcha) {
    return this.afAuth.auth.signInWithPhoneNumber(phone, recaptcha)
      .then((result => {
        this.resultCode = result;
      }))
      .catch((err => { console.log(err); }))
  }

  verifyCode(codeVerify) {
    const credential = firebase.auth.PhoneAuthProvider.credential
      (this.resultCode.verificationId, codeVerify);

    return firebase.auth().signInWithCredential(credential)
      .then((result) => {
        console.log(result);
        return { uid: result.uid, phone: result.phoneNumber };
      })
      .catch((error) => {
        return error;
      })
  } 
}
