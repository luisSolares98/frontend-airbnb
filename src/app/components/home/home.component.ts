import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';
import { PublicationService } from 'src/app/services/publication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listProperties?: Property[];
  selectProperty?: Property;
  constructor(private storage: StorageService, private sPublication: PublicationService ) {
  }

  ngOnInit() {
    this.sPublication.getAll().subscribe(response => {
      if(!response) {
        alert('error')
      }
      this.listProperties = response;
    }, error => {
      
    });
    console.log(this.storage.getItem('user'));
  }

  onSelect(property: Property) {
    this.selectProperty = property;
  }

}
