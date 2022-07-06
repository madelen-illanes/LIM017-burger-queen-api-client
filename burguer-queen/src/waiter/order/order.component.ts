import { Component, OnInit, Input, Output } from '@angular/core';
import { MenuService } from '../../app/services/menu.service';
import { Order } from '../../app/app.module';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  menu: Order[] = [];


 title = 'Ecuaburguer';
  selection!: string;
  desayunos = [' café americano $1', 'café con leche $2', 'sandwich de jamón y queso $3', 'jugos naturales $2', 'bolón $3'];
  almuerzos = [{
    principal: ['Encebollado', 'Seco de pollo', 'Yapingacho', 'Guatita', 'Hornado'],
    acompanamiento: ['chifle', 'pan', 'arroz'],
    bebidas: ['gaseosas', 'agua', 'cerveza', 'té helado']
  }]
  // sandwich = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEGt-2FHR3M-9rZaXHp9Vu6OucYM6bjW-eg&usqp=CAU;'
  // coffee = 'data:image/jpeg;base64,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';
  // capuccinno = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8iQ-_GicLjrSvySczXUGSxa1IPp5515RHQ&usqp=CAU';
  // juice = 'data:image/jpeg;base64,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';
  // bolon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWcNVgB_teThKtSOagu97JucD9WDF7RjRDw&usqp=CAU';

  constructor(private menuService: MenuService) { }
  
  ngOnInit(): void {
    this.menuService.getOrder().subscribe(
      (menu) => (this.menu = menu, console.log(menu)));
  }
  
  onClick(breakfast: string): void {
    console.log(breakfast);
    this.selection = breakfast;
  }
  onClear(): void {
    this.selection = '';
  }

  addNewOrder(breakfast: string): void {
    this.desayunos.push(breakfast);
  }
}