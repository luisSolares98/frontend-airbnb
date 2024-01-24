import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(  private sUser: UserService,
                private router: Router,
                private storage: StorageService ) {

  }

  ngOnit() {

  }

  onSubmit() {
    this.sUser.login(this.email, this.password).subscribe(result => {
      if(result == undefined) alert('User not exist!!')
      this.storage.setItem("user", result);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }

}
