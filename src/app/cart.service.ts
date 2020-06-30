import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//exporting product properties to cart.page.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  private data = [
    {
      category: 'Xiomi',
      expanded: true,
      product: [
        { id: 0, name: 'mi note 8', price: '8000',amount:'1', imageUrl:'./assets/note8.jpg' },
        { id: 1, name: 'mi note 8 pro', price: '14000',amount:'1', imageUrl:'./assets/8pro.jpg'  },
        { id: 2, name: 'mi k20', price: '18000',amount:'1', imageUrl:'./assets/k20.jpg'  },
        { id: 3, name: 'note 9 pro', price: '19000',amount:'1', imageUrl:'./assets/9pro.jpg'  }
      ]
    },
    {
      category: 'realme',
      product: [
        { id: 4, name: 'realme c3', price: '10000',amount:'1', imageUrl:'./assets/c3.jpg'  },
        { id: 5, name: 'realme 5 pro', price: '8000',amount:'1', imageUrl:'./assets/5pro.jpg'  } //retriving images from assets
      ]
    },
    {
      category: 'oppo',
      product: [
        { id: 6, name: 'oppo a12', price: '8500',amount:'1', imageUrl:'./assets/a12.jpg'  },
        { id: 7, name: 'oppo reno 3 pro', price: '30000',amount:'1', imageUrl:'./assets/reno3pro.jpg'  },
        { id: 8, name: 'oppo f11 pro', price: '11000',amount:'1', imageUrl:'./assets/f11pro.jpg'  }
      ]
    }
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 

  constructor() { }

  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for(let p of this.cart){
      if(p.id === product.id){
        p.amount +=1;
        added=true;
        break;
      }
    }
    if(!added){
      this.cart.push(product)     //push cmd is used to send the products with details 
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product){
    for(let [index,p] of this.cart.entries()){
      if(p.id === product.id){
        p.amount -=1;
        if(p.amount == 0){
          this.cart.splice(index, 1);     //splice will return the removed item(s)
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
  removeProduct(product){
    for(let [index,p] of this.cart.entries()){
      if(p.id === product.id){
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
        }
      }
  }
}
