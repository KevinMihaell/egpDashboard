import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  tokenKey: any;
  isLogged: boolean = false;
  nameLogged: string;

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }
  loginProces() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        if (result.token) {
          this.tokenKey = result.token;
          this.isLogged = true;
          console.log(this.tokenKey);
          this.nameLogged = result.customer['nombres'];
          //alert("Logged Success");
        } else {
          alert(result.message);
        }
      })
    }
  }

}
