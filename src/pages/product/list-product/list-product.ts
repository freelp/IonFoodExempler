import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';;

import { ProductProvider } from './../../../providers/database/firebase/product/product.provider';

@IonicPage()
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage {

  list: Observable<any>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private productProvider: ProductProvider) { }

   ngOnInit() {
    this.getListProduct('snack');
  }

   getListProduct(type_product: string) {
    this.list = this.productProvider.get(type_product);
  }

   newProduct(type_product: string) {
    this.navCtrl.push('EditProductPage', { type_product: type_product });
  }

   editProduct(product: any) {
    this.navCtrl.push('EditProductPage', { product: product });
  }

   removeProduct(key: string, type_product: string){
    this.productProvider.remove(key, type_product);
  }

}
