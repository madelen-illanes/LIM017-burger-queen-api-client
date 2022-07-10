import { Component, Inject, OnInit } from '@angular/core';
import { ItemsEdited, Order } from 'src/app/app.module';
import { MenuService } from 'src/app/services/menu.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { Direction } from '@angular/cdk/bidi';
import { Product, ProductCart, WaiterService } from '../waiter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  menu: Order[] = [];
  selection!: string;
  inputs!: ItemsEdited;
  arrayMenu: any = [];
  arrayBreakfast: any = [];
  directionOrder: Direction = "ltr";
  qty: number = 0;
  public productList = new BehaviorSubject<any>([]);
  

  constructor(public menuService: MenuService,
    public dialog: MatDialog,
    public waiterService: WaiterService
  ) { }

  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  // Service message commands
  openSideBareService(event: boolean) {
    this.emitChangeSource.next(event);
    console.log(event, "observador service recibio esto de hijo")
  }

  ngOnInit(): void {
    this.getArrayOfProducts();
 
  }

  getArrayOfProducts( ) {
    this.menuService.getProduct()
      .subscribe({
        next: (menu: Product[]) => {
          this.arrayMenu = menu, console.log('todos los productos', menu)
          this.arrayMenu.forEach((product: any) => {
            Object.assign(product,{quantity:0, total: product.price })
          });
                  },
        error: error => console.warn(error)
      })
  }

   
  addOrder(res: any) {
    this.inputs = {
      name: res.name,
      type: res.type,
      price: res.price,
      qty: res.qty,
      userId: res.userId,
      client: res.client
    }
    this.menuService.addProducts('http://localhost:8080/orders', this.inputs)
      .subscribe({
        next: res => console.log('respuesta con id', res),
        error: error => console.log(error)
      })
  }

  valueToPay(products:ProductCart[]){
    console.log("total de ordenes",products)
    let grandTotal = 0;
    products.map((e:any) => {
      grandTotal += e.total;
    })
    return grandTotal;
  }
  
  upQuantity(product: any): void{
  
  Object.assign(product,{quantity:product.quantity + 1})
  this.addSubTotal(product)
  // console.log("incrementa en mi array tambien",this.arrayMenu)
  this.qty = this.valueToPay(this.arrayMenu)
  console.log('sumar cantidad en contador',product)

  }
  addSubTotal(product:ProductCart){
    const result = product.quantity * product.price;
    Object.assign(product,{total:result});
    this.waiterService.addtoCart(product)
  }
  downQuantity(product: any): void{
    if(product.quantity > 1){
      Object.assign(product,{quantity:product.quantity - 1})
      this.waiterService.addtoCart(product)
      this.removeSubTotal(product)
    this.qty = this.valueToPay(this.arrayMenu)
    } else {
      alert('No puedes disminuir más allá de uno')
    }
   
    console.info('disminuir cantidad en contador', product )
  }
  removeSubTotal(product:ProductCart){
    return(product.total > product.price)
       ? Object.assign(product, {total: product.total -product.price})
       : alert('Ha ocurrido un error!')
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%'

    });
  }
 
  openSideBareEvent(event: boolean): void {
    console.log("pasando un true del hijo al servicio")
    this.waiterService.openSideBareService(event)
  }
  addToCart(product: object) {
    this.openSideBareEvent(true);
    console.log("añadiendo al carrito")
    //console.log("soy el productooooooooo",product)
    this.waiterService.addtoCart(product);
  }


}


