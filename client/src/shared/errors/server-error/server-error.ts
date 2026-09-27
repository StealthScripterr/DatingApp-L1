import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ApiError } from '../../../types/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected location = inject(Location);
  private router = inject(Router);
  protected error: ApiError;
  protected showDetails = false;
  constructor() {
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras?.state as { error: any };
    this.error = state?.error;
    console.log(this.error);
  } 

  detailsToggle() {
    this.showDetails = !this.showDetails;
  }

  
  goBack() {
    this.location.back();
  }
}