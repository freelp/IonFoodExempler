import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductProvider } from './../../../providers/database/firebase/product/product.provider';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  title: string;
  form: FormGroup;
  product: any;
  type_product: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private formBuilder: FormBuilder, private productProvider: ProductProvider) { }

  ngOnInit() {
    this.setupPageTitle();
    this.loadValue();
    this.createForm();
  }

  private loadValue() {
    if (this.navParams.data.product) {
      this.product = this.navParams.data.product;
      this.type_product = this.product.type_product;
    } else {
      this.product = {};
      this.type_product = this.navParams.data.type_product;
    }
  }

  private setupPageTitle() {
    this.title = this.navParams.data.product ? 'Alterando Produto' : 'Novo Produto';
  }

  private createForm() {
    this.form = this.formBuilder.group({
      key: [this.product.key],
      name: [this.product.name, Validators.required],
      detail: [this.product.detail, Validators.required],
      price: [this.product.price, Validators.required],
      type_product: [this.type_product],
      available: [this.product.available]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.productProvider.save(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Produto Salvo !', duration: 2000, position: 'top' }).present();
          this.navCtrl.pop();
        })
        .catch((erro) => {
          this.toastCtrl.create({ message: 'Produto NÃO Salvo !', duration: 2000, position: 'top' }).present();
        })
    }
  }

}
