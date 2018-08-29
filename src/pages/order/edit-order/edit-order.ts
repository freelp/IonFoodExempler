import { OrderClass } from './../order.class';
import { OrderProvider } from './../../../providers/database/firebase/order/order.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-order',
  templateUrl: 'edit-order.html',
})
export class EditOrderPage {

  listItemOrder: any[];
  title;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private orderProvider: OrderProvider) {
  }

  ngOnInit() {
    this.setTitle();
    this.listItemOrder = this.navParams.data.list;
  }

  private setTitle() {
    this.title = "Itens do Pedido";
  }

  remove(item) {
    this.listItemOrder.forEach((element, index) => {
      if (item === element) {
        this.listItemOrder.splice(index, 1);
      }
    });
  }

  onSubmit() {
    let item = new OrderClass();
    item.item_order = this.listItemOrder;
    item.price_subtotal = this.calcularSubTotal();
    this.orderProvider.save(item)
    .then(() => {
      this.toastCtrl.create({ message: 'Pedido Enviado !', duration: 2000, position: 'top' }).present();
      this.navCtrl.pop();
    })
  }

  calcularSubTotal() {
    let total: number = 0;
    this.listItemOrder.forEach(element => {
      total += element.price_total;
    });
    return total;
  }

}
