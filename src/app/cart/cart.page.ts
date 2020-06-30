import { Product,CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit{

  cart: Product[]=[];

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    //here initially i=0,so
    //0+5*3 = 15
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);  //[{price: 5, amount:3}]
  }



 
}
