import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MOCK_CITIES } from 'src/app/utilities/mock-cities';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss'],
})
export class CityPickerComponent implements OnInit {
  @Input() required: boolean = false;
  @Input() defaultSelectedCity: string;
  @Output() selectedCity = new EventEmitter<string>();

  cities: string[] = [];
  filteredCities: Observable<string[]>;

  cityForm: FormGroup = this.formBuilder.group({
    city: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._loadCities();

    if (this.required) {
      this.cityForm.controls.city.setValidators(
        Validators.compose([Validators.required])
      );
    }

    this.cityForm.controls.city.setValue(this.defaultSelectedCity || '');

    this.filteredCities = this.cityForm.controls.city.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.cityForm.controls.city.valueChanges.subscribe((city) => {
      this.selectedCity.emit(city);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _loadCities(): void {
    this.cities = MOCK_CITIES;
  }
}
