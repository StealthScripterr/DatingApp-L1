import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberServices } from '../../core/services/member-services';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected members = signal<User[]>([]);
  protected memberServices = inject(MemberServices);

  ngOnInit() {
    this.memberServices.getMembers().subscribe({
      next: (response : User[]) => {
        this.members.set(response);
      }
    });
  }
}
