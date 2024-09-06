import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.sass']
})
export class OrderDetailsComponent implements OnInit {
  order = null;
  orderloading = false;
  @Input() id: any = null;
  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.getOrderDetails(this.id);
    }
  }

  async getOrderDetails(id): Promise<void> {
    try{
      this.orderloading = true;
      let  orderData: any = [];
      if (await this.userService.isAuthenticated()) {
        orderData = await this.orderService
        .getOrderById(id)
        .toPromise();
      } else {
        orderData = await this.orderService
        .getGuestOrderById(this.id)
        .toPromise();
      }

      this.order = orderData.data;
      this.orderloading = false;
    }catch (err){
      this.orderloading = false;
    }
  }

}
