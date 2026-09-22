import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);
  protected readonly title = "Tinder for Developers";
  protected members = signal<any>([]);


  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/Members').subscribe({
      next: (members) => {
        console.log(members);
        this.members.set(members);
      }, 
      error: (error) => {
        console.error('Error fetching members:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }  
}
