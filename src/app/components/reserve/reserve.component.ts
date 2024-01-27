import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';
import { User } from 'src/app/models/user';
import { PublicationService } from 'src/app/services/publication.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  listProperties?: Property[];
  selectProperty?: Property;
  user?: User;

  constructor(private storage: StorageService, 
              private sPublication: PublicationService,
              private sReserve: ReserveService) {
    this.user = this.storage.getItem('user');
  }

  ngOnInit() {
    this.changeListPubli();
  }

  changeListPubli() {
    this.sReserve.getByUserId(this.user?.id).subscribe(response => {
      if(!response) {
        alert('error')
      }
      this.listProperties = response;
      console.log(response)
    });
  }

  onSelect(property: Property) {
    this.sPublication.getById(property.id).subscribe(response => {
      this.selectProperty = response;
    });
  }

  onSala(property: Property) {

    
  }
}