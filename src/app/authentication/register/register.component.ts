import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AutenticacionService } from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  userdata: any;
  mensaje = false;
  erroresForm = {
    'email': '',
    'password': '',
    'confirm': '',
    'checked': ''
  };

  mensajesValidacion = {
    'email': {
      'required': '',
      'email': 'Introduzca una direccion email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria, ',
      'pattern': 'La contraseña debe tener al menos una letra, un numero',
      'minlength': ' y más de 6 caracteres',
      'equalTo': ' debe coincidir las contraseñas'
    },
    'confirm': {
      'confirmPassw': 'Confirma contraseña'
    },
    'checked': {
      'term': 'Favor de confirmar los terminos de uso'
    }
  };

  constructor(private formBuilder: FormBuilder,
              private autServie: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {

              }

  ngOnInit() {
    this.registroForm = this.formBuilder.group( {
      'email': [null , Validators.compose ( [ Validators.required, Validators.email ] )],
      // tslint:disable-next-line:max-line-length
      'password': [null , Validators.compose ( [ Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6) ] )],
      'confirm': [null , Validators.compose ( [ Validators.required ] )],
      // 'checked': [null , Validators.compose ( [ Validators.required ] )],
    });
    this.registroForm.valueChanges.subscribe(data =>
      this.onValueChanged(data));
      this.onValueChanged();
  }

  confirmPass() {
    const val = this.registroForm.value;
    return val && val.password && val.password === val.confirm;
  }

  /**setDefaultValues() {
    this.registroForm.patchValue({checked: true});
  } */

  onValueChanged(data?: any) {
    if (!this.registroForm) {
      return;
    }
    const form = this.registroForm;
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
    this.userdata = this.saveUserdata();
    this.autServie.registroUsuario(this.userdata);
    this.router.navigate(['/login']);
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      /**checked: this.registroForm.get('checked').value, */
    };
    return saveUserdata;
  }
}
