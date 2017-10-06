import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { AutenticacionService } from '../services/autenticacion.service';


@Injectable()

export class GuardService implements CanActivate {


  constructor(private autenticacionService: AutenticacionService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.autenticacionService.isAuthenticated();
  }


}