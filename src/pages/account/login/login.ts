import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from './../../../providers/database/firebase/account/account.provider';
import { PhoneAuthProvider } from './../../../providers/auth/firebase/login/phone-auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  title: string;
  formPhone; formCode: FormGroup;
  recaptcha: any;
  hiddeDiv: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loginAuth: PhoneAuthProvider,
    private accountProvider: AccountProvider, ) {
  }

  ngOnInit() {
    this.setTitle();
    this.createForm();
    this.recaptchaInit();
  }

  private setTitle() {
    this.title = "Acesse sua Conta";
  }

  private createForm() {
    this.formPhone = this.formBuilder.group({
      dddNumber: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });

    this.formCode = this.formBuilder.group({
      codeVerify: [null, Validators.required],
    });
  }

  recaptchaInit() {
    this.recaptcha = this.loginAuth.recaptchaInit();
    this.recaptcha.render();
  }

  sendCode() {
    this.hiddeDiv = this.loginAuth.sendCodeVerify( // TESTAR ESSA HIDDEDIV ESTA FUNFA
      this.getPhoneNumber(), this.recaptcha);
  }

  getPhoneNumber() {
    return "+55" + this.formPhone.value.dddNumber + this.formPhone.value.phoneNumber;
  }

  verifyCode() {
    this.loginAuth.verifyCode(this.formCode.value.codeVerify)
      .then((result) => {
        this.verifyUser(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  verifyUser(value) {
    this.accountProvider.verifyNewUser(value.uid)
      .then((result) => {
        this.goToPage(result, value);
      })
  }

  goToPage(result, user) {
    if (result) {
      this.navCtrl.setRoot('CreateProfilePage', { uid: user.uid, phone: user.phone })
    } else this.navCtrl.setRoot('ProfilePage')
  }

  phoneErr() {
    location.reload();
  }

}