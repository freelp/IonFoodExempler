////////// NATIVE ANGULAR IONIC //////////
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

////////// MY PROVIDERS //////////
import { ProductProvider } from './../providers/database/firebase/product/product.provider';
import { OrderProvider } from './../providers/database/firebase/order/order.provider';
import { AccountProvider } from './../providers/database/firebase/account/account.provider';
import { PhoneAuthProvider } from '../providers/auth/firebase/login/phone-auth';


////////// FIREBASE //////////
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAfR79U1ZRqV_zgSZ6SqwYxT7IcNc7dBFo",
  authDomain: "disk-lanche-app.firebaseapp.com",
  databaseURL: "https://disk-lanche-app.firebaseio.com",
  projectId: "disk-lanche-app",
  storageBucket: "disk-lanche-app.appspot.com",
  messagingSenderId: "775064612993"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    OrderProvider,
    AngularFireAuth,
    AccountProvider,
    PhoneAuthProvider
  ]
})
export class AppModule {}
