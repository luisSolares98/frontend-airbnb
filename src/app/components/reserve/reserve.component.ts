import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property';
import { User } from 'src/app/models/user';
import { PublicationService } from 'src/app/services/publication.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { StorageService } from 'src/app/services/storage.service';
import { UnsplashService } from 'src/app/services/unsplash.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  listProperties?: Property[];
  selectProperty?: Property;
  user?: User;
  houseImageUrl: any = '';

  constructor(private storage: StorageService, 
              private sPublication: PublicationService,
              private sReserve: ReserveService,
              private unsplashService: UnsplashService) {
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
      this.generateRandomImage(response.length);
      this.listProperties = response;
      console.log(response)
    });
  }
  generateRandomImage(cantidadImg: number) {
    this.unsplashService.getRandomHouseImage(cantidadImg).subscribe(
      (data: any) => {
        this.houseImageUrl = data;
      },
      error => {
        console.error(`Error: ${error.message}`);
      }
    );
  }
  onSelect(property: Property) {
    this.sPublication.getById(property.id).subscribe(response => {
      this.selectProperty = response;
    });
  }

}