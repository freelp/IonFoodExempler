import { OrderClass } from './../../../../pages/order/order.class';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PATH_ORDER } from '../path-database';

@Injectable()
export class OrderProvider {

  constructor(private db: AngularFireDatabase) { }

  get() {
    return this.db.list(PATH_ORDER)
      .snapshotChanges()
      .map(changes => {
        return changes.map(order => ({
          key: order.payload.key, ...order.payload.val()
        }));
      })
  }

  save(order: OrderClass) {
    return new Promise((resolve, reject) => {
      if (order.key) {
        console.log("update order");
        this.db.list(PATH_ORDER)
          .update(order.key, {
            //date: order.date,
            //client: order.client,
            item_order: order.item_order,
            //delivery_address: order.delivery_address,
            price_subtotal: order.price_subtotal,
            //price_total: order.price_total,
            //status: order.status
          })
          .then(() => resolve())
          .catch((erro) => reject(erro));
      } else {
        console.log("save order");
        this.db.list(PATH_ORDER)
          .push({
           // date: order.date,
            //client: order.client,
            item_order: order.item_order,
            //delivery_address: order.delivery_address,
            price_subtotal: order.price_subtotal,
            //price_total: order.price_total,
            //status: order.status
          })
          .then(() => resolve());
      }
    });
  }

  remove(key: string) {
    return this.db.list(PATH_ORDER).remove(key);
  }

}
