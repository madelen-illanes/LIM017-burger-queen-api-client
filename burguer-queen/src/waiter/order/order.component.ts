import { Component, OnInit, Input, Output } from '@angular/core';
import { MenuService } from '../../app/services/menu.service';
import { Order } from '../../app/app.module';
import { Product, ProductCart, WaiterService } from '../waiter.service';
import { Direction } from '@angular/cdk/bidi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  public products: any = [];
  title = 'Ecuafood';
  totalOrder: number = 0;
  direction: Direction = "ltr";
  form!: FormGroup;

  constructor(private menuService: MenuService,
    public waiterService: WaiterService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.comeToService();
    this.form = this.formBuilder.group({
      client: ["", Validators.required],
      userId: ["", Validators.required],});
  }
  comeToService(){
    this.waiterService.getProducts()
    .subscribe(res=> {
      this.products = res;
      // console.log("array que acumula las ordenes que vienen del servicio",this.products)
      this.totalOrder = this.orderOfClient(this.products);
    })
  }
  orderOfClient(products:ProductCart[]){
    // console.log("orden del cliente",products)
    let grandTotal = 0;
    products.map((e:any) => {
      grandTotal += e.total;
    })
    return grandTotal;
  }

  removeItem(product: any){
    this.waiterService.removeCartItem(product)
  }
  emptyCart(){
    this.waiterService.removeAllCart()
  }

  addQuantity(product:Product) {
    console.log(product)
    Object.assign(product,{quantity:product.quantity + 1})
    this.addSubTotal(product)
    console.log("lista actualizadaaaaaaaaaaaaaaaaaaaaaaaa",this.products)
    this.totalOrder = this.calctotalOrder(this.products)
    

  }
  removeQuantity(product: Product) {
    console.log(product)
    if (product.quantity > 1) {
      Object.assign(product, { quantity: product.quantity - 1 });
    }
    this.removeSubTotal(product)
    this.totalOrder = this.calctotalOrder(
      this.products)
    return
  }
  addSubTotal(product: Product) {
    const result = product.quantity * product.price;
    Object.assign(product, { total: result });
   
  }

  removeSubTotal(product: Product) {
    if (product.total > product.price) {
      const result = product.total - product.price
      Object.assign(product, { total: result });
      //this.mainCartService.addToCart(product)
    } else {
      return
    }
  }


  calctotalOrder(products: Product) {
    console.log("products de GRAN TOTALLLLLLLLLL", products)
    let grandTotal = 0;
    this.products.map((e: any) => {
      grandTotal += e.total;
    })
    return grandTotal;
  }

}
