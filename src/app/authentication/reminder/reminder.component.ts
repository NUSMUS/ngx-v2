import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AutenticacionService } from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  reminderForm: FormGroup;
  userdata: any;
  closeResult: string;
  erroresForm = {
    'email': ''
  }

  mensajesValidacion = {
    'email': {
      'required': '',
      'email': 'Introduzca una direccion email correcta'
    }
  }
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private autService: AutenticacionService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.reminderForm = this.formBuilder.group ( {
      'email': [null , Validators.compose ( [ Validators.required, Validators.email ] )]
    });
    this.reminderForm.valueChanges.subscribe(data => 
      this.onValueChanged(data));
      this.onValueChanged();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onValueChanged(data?: any) {
    if (!this.reminderForm) {
      return;
    }
    const form = this.reminderForm;
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + '';
        }
      }
    }
  }

  resetPassword(email: string) {
    this.autService.resetPassword(email);
  }

  onSubmit() {
    this.userdata = this.saveUserData();
    this.resetPassword(this.userdata);
    this.router.navigate(['/login']);
  }

  saveUserData() {
    const saveUserData = {
      email: this.reminderForm.get('email').value,
    };
    return saveUserData;
  }

}

