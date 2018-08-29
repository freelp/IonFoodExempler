import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileClass } from './../profile/profile.class';
import { AccountProvider } from './../../../providers/database/firebase/account/account.provider';

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {

  title: string;;
  form: FormGroup;
  user: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private userProvider: AccountProvider) {
  }

  ngOnInit() {
    this.setTitle();
    this.createForm();
    this.getUser();
  }

  setTitle() {
    this.title = "Concluir Cadastro";
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [],
      picture: [],
      //
      street: [],
      houseNumber: [],
      district: [],
      city: []
    });
  }

  getUser() {
    this.user = this.navParams.data;
    console.log(this.user);
  }

  createProfile() {
    let user = new ProfileClass();
    user.name = this.form.value.name;
    user.phone = this.user.phone;
    user.picture = this.form.value.picture;
    //
    user.street = this.form.value.street;
    user.houseNumber = this.form.value.houseNumber;
    user.district = this.form.value.district;
    user.city = this.form.value.city;

    return user;
  }

  onSubmit() {
    this.userProvider.createProfile(this.createProfile(), this.user.uid)
      .then((result) => {
        this.navCtrl.setRoot('ProfilePage', { uid: this.user.uid })
      })
      .catch((error)=> {
        console.log(error);
      })
  }
}
