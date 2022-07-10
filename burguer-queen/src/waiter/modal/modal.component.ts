import { Component, OnInit } from '@angular/core';
import { FormControl,  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  disableSelect = new FormControl(false);
  card: any = [];
  form!: FormGroup;
  actionBtn: string = 'Ordenar'
  selection!: string;
  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      client: ["", Validators.required],
      userId: ["", Validators.required],
      qty: ["", Validators.required],
      
    });
  }
  onClick(res: any): void {
  
    console.log('id', res);
    this.selection = res;
  }
}
