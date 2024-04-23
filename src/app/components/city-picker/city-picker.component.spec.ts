import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPickerComponent } from './city-picker.component';

describe('CityPickerComponent', () => {
  let component: CityPickerComponent;
  let fixture: ComponentFixture<CityPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
