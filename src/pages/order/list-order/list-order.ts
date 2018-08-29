import { OrderProvider } from './../../../providers/database/firebase/order/order.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-list-order',
  templateUrl: 'list-order.html',
})
export class ListOrderPage {

  listOrder: Observable<any>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private orderProvider: OrderProvider) {
  }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.listOrder = this.orderProvider.get();
  }

}
