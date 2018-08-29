import { MyApp } from './../../../app/app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AccountProvider } from './../../../providers/database/firebase/account/account.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  title: string;
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private accountDatabase: AccountProvider,
    private afAuth: AngularFireAuth,
    private myApp: MyApp) {
  }

  ngOnInit() {
    this.setTitle();
    this.getProfile();
    this.myApp.pages[1] = { title: 'Minha Conta', component: 'ProfilePage' };
  }

  private setTitle() {
    this.title = "Meu Perfil"
  }

  getProfile() {
    return this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        const usuarioLogado = this.accountDatabase.getUserInfo().subscribe(userData => {
          this.user = userData;
          usuarioLogado.unsubscribe();
        });
      } else console.log("USUARIO NÃO LOGADO")
    })
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.navCtrl.setRoot('LoginPage');
        this.myApp.pages[1] = { title: 'Login', component: 'LoginPage' };
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
