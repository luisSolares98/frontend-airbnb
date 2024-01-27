import { Component, Input } from '@angular/core';
import { Property } from 'src/app/models/property';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  property?: Property ;

  constructor(private sPublication: PublicationService) {
    
  }

}
