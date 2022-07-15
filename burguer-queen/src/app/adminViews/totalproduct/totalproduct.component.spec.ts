import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalproductComponent } from './totalproduct.component';

describe('TotalproductComponent', () => {
  let component: TotalproductComponent;
  let fixture: ComponentFixture<TotalproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
