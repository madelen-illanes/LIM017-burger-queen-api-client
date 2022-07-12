import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/waiter/modal/modal.component';
import { Order } from '../app.module';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  menu: any[] = [];
  form!: FormGroup;
  
 
  constructor(
    public dialog: MatDialog,
    public menuService: MenuService,

  ) { }

  ngOnInit(): void {
    this.menuService.getOrder().subscribe(
      (res) => (this.menu = res, console.log(res)));
    
  }

  
  editOrder(product: any) {
    this.dialog.open(ModalComponent, {
      width: '100%',
      data: product
    });
  }
  // updateStatus(){
  //   this.menuService.updateOrder()
  // }

}
