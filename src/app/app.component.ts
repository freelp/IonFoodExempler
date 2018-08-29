import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ListMenuPage';

  pages: Array<{ title: string, component: any }>;

  constructor( private afAuth: AngularFireAuth) {

    this.loadPageSideMenu();
    this.setTitlePageSideMenu();
  }

  setTitlePageSideMenu() {
    this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) this.pages[1] = { title: 'Minha Conta', component: 'ProfilePage' };
    });
  }

  loadPageSideMenu() {
    this.pages = [
      { title: 'Cardapio', component: 'ListMenuPage' },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Painel de Controle', component: 'DashboardPage' },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
