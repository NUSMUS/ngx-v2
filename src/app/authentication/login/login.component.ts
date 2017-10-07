import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AutenticacionService } from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  mensaje = false;
  erroresForm = {
    'email': '',
    'password': ''
  };

  mensajesValidacion = {
    'email': {
      'required': '',
      'email': 'Introduzca una direccion email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra, un numero',
      'minlength': ' y más de 6 caracteres'
    }
  };


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private autService: AutenticacionService,
              private activatedRouter: ActivatedRoute) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group ( {
      'email': [null , Validators.compose ( [ Validators.required, Validators.email ] )] ,
      // tslint:disable-next-line:max-line-length
      'password': [null , Validators.compose ( [ Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6) ] )]
    });
    this.loginForm.valueChanges.subscribe(data =>
      this.onValueChanged(data));
      this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    // tslint:disable-next-line:forin
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + '';
        }
      }
    }
  }

  onSubmit() {
    // Dentro del servicio auth
    this.userdata = this.saveUserdata();
    this.autService.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() === false) {
        this.mensaje = false;
      }
      this.mensaje = true;
    }, 1000);
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

  isAuth() {
    return this.autService.isAuthenticated();
  }
}
