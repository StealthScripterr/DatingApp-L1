import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberServices } from '../../core/services/member-services';
import { DogDetails } from '../../types/dog-details';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected members = signal<DogDetails[]>([]);
  protected memberServices = inject(MemberServices);

  ngOnInit() {
    this.memberServices.getMembers().subscribe({
      next: (response: DogDetails[]) => {
        this.members.set(response);
      }
    });
  }
}
