import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): AngularFireList<Order> {
    return this.db.list('/order');
  }

  getOrdersByUser(userId: string): AngularFireList<Order>  {
    return this.db.list('/order', ref => ref.orderByChild('userId').equalTo(userId));
  }
}
