import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';
import { User } from 'src/app/models/user';
import { PublicationService } from 'src/app/services/publication.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
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
    this.sPublication.getAll().subscribe(response => {
      if(!response) {
        alert('error')
      }
      this.listProperties = response;
    }, error => {
      
    });
  }

  onSelect(property: Property) {
    this.sPublication.getById(property.id).subscribe(response => {
      this.selectProperty = response;
      console.log(response)
    });
  }

  onReserve(property: Property) {

    const obj = {
      dateIn: "2022-05-21",
      state: "Realizada",
      dateOut: "2022-06-28",
      publishID: property.id,
      userID: this.user?.id,
      amount: property.amount
    }

    this.sReserve.insert(obj).subscribe(resp => {
      if(resp.reserveID) {
        this.changeListPubli();
      }
    })
  }
}
