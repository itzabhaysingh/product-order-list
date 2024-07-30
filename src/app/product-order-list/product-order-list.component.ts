import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-product-order-list',
  templateUrl: './product-order-list.component.html',
  styleUrls: ['./product-order-list.component.css']
})
export class ProductOrderListComponent {
  productOptions: string[] = ['Pencil', 'Eraser', 'Pens'];
  quantities: number[] = [0, 1, 2, 3, 4, 5];
  products: Product[] = [{ name: '', quantity: 0 }];
  orders: Product[] = [];
  orderVisible = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  addProduct(index: number) {
    if (this.products[index].name && this.products[index].quantity) {
      if (index === this.products.length - 1 && this.products.length < 8) {
        this.products.push({ name: '', quantity: 0 });
      }
    } else {
      this.errorMessage = 'Please select both product and quantity before adding.';
      setTimeout(() => this.errorMessage = '', 3000);
    }
  }

  showOrder() {
    this.orders = this.products.filter(product => product.name && product.quantity);
    this.orderVisible = true;
  }

  readOrder() {
    const orderText = this.orders.map(order => `${order.name}: ${order.quantity}`).join(', ');
    const apiUrl = 'https://api.voicerss.org/?key=eccffd2276f4465faa989f67e58169ec&hl=en-us&src=' + encodeURIComponent(orderText);
    console.log(orderText)
    this.http.get(apiUrl, { responseType: 'arraybuffer' }).subscribe(audioBuffer => {
      const audio = new Audio(URL.createObjectURL(new Blob([audioBuffer], { type: 'audio/wav' })));
      audio.play();
    });
  }
}
