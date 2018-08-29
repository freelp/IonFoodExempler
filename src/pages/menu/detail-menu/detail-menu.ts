import { ItemOrderClass } from './../../order/item-order.class';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-detail-menu',
  templateUrl: 'detail-menu.html',
})
export class DetailMenuPage {

  title: string;
  product: any;
  form: FormGroup;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private viewCtrl: ViewController) { }

  ngOnInit() {
    this.setTitle();
    this.product = this.navParams.data.item;
    this.createForm();
  }

  private setTitle() {
    this.title = "Adicionar Pedido !";
  }

  private createForm() {
    this.form = this.formBuilder.group({
      amount: [1],
      note: []
    });
  }

  onSubmit() {
    let itemOrder = new ItemOrderClass();
    itemOrder.product = this.product;
    itemOrder.amount = this.form.value.amount;
    itemOrder.note = this.form.value.note;
    itemOrder.price_unit = this.product.price;
    itemOrder.price_total = (itemOrder.amount * itemOrder.price_unit);

    this.viewCtrl.dismiss(itemOrder);
    console.log("Item Adicionado ao Pedido")
  }

}
