import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  public selectedRegion?: Region;

  constructor(private countryService: CountryService) {}

  searchByRegion(term: Region): void {
    this.selectedRegion = term;

    this.countryService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
