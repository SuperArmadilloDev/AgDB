import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatListModule],
})

export class CustomCardComponent {
  @Input() title: string;
  @Input() subtitle: string | undefined;
  @Input() abv: number | undefined;
  @Input() description: string | undefined;
  @Input() image: string | undefined;

  constructor() {
    this.title = "No beer title found";
    this.subtitle = "No beer subtitle found";
    this.description = "No beer description found";
    this.image = "../../../assets/images/placeholderBeer.webp";
  }
}