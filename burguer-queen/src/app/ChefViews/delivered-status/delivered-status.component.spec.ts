import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveredStatusComponent } from './delivered-status.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeliveredStatusComponent', () => {
  let component: DeliveredStatusComponent;
  let fixture: ComponentFixture<DeliveredStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      RouterTestingModule],
      declarations: [ DeliveredStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveredStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
