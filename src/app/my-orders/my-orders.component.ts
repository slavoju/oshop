import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import {switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.orders$ = authService.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges()));
  }
}
