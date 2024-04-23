import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, of, startWith } from 'rxjs';
import { MOCK_CITIES } from '../../utilities/mock-cities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-picker',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './city-picker.component.html',
  styleUrl: './city-picker.component.scss',
})
export class CityPickerComponent implements OnInit {
  @Input() required: boolean = false;
  @Input() defaultSelectedCity: string | undefined = '';
  @Output() selectedCity = new EventEmitter<string>();

  cities: string[] = [];
  filteredCities$: Observable<string[]> = of([]);

  cityForm: FormGroup = this.formBuilder.group({
    city: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._loadCities();

    if (this.required) {
      this.cityForm.controls['city'].setValidators(
        Validators.compose([Validators.required])
      );
    }

    this.cityForm.controls['city'].setValue(this.defaultSelectedCity || '');

    this.filteredCities$ = this.cityForm.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.cityForm.controls['city'].valueChanges.subscribe((city) => {
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
