import { ItemOrderClass } from './../../order/item-order.class';
import { ProductProvider } from './../../../providers/database/firebase/product/product.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-list-menu',
  templateUrl: 'list-menu.html',
})
export class ListMenuPage {

  title;
  list: Observable<any>;
  listItemOrder: ItemOrderClass[] = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private productProvider: ProductProvider) { }

  ngOnInit() {
    this.setTitle();
    this.getListProduct('snack');
  }

  setTitle() {
    this.title = "Cardapio";
  }

  openItem(item: 'ProductClass') {
    let modal = this.modalCtrl.create('DetailMenuPage', { item: item });
    modal.onDidDismiss(data => {
      this.listItemOrder.push(data);
    });
    modal.present();
  }

  getListProduct(type_product: string) {
    this.list = this.productProvider.get(type_product);
  }

  openOrder() {
    this.navCtrl.push('EditOrderPage', { list: this.listItemOrder });
  }

}
