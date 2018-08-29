import { ProductClass } from './../../../../pages/product/product.class';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PATH_PRODUCT } from '../path-database';

@Injectable()
export class ProductProvider {

  constructor(private db: AngularFireDatabase) { }

  get(type_product: string) {
    return this.db.list(PATH_PRODUCT + type_product)
      .snapshotChanges()
      .map(changes => {
        return changes.map(product => ({
          key: product.payload.key, ...product.payload.val()
        }));
      })
  }

  save(product: ProductClass) {
    return new Promise((resolve, reject) => {
      if (product.key) {
        this.db.list(PATH_PRODUCT + product.type_product)
          .update(product.key, {
            name: product.name,
            detail: product.detail,
            price: product.price,
            type_product: product.type_product,
            available: product.available,
          })
          .then(() => resolve())
          .catch((erro) => reject(erro));
      } else {
        this.db.list(PATH_PRODUCT + product.type_product)
          .push({
            name: product.name,
            detail: product.detail,
            price: product.price,
            type_product: product.type_product,
            available: product.available,
          })
          .then(() => resolve());
      }
    });
  }

  remove(key: string, type_product: string) {
    return this.db.list(PATH_PRODUCT + type_product).remove(key);
  }

}