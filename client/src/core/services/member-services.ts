import { HttpClient } from "@angular/common/http";
import { User } from "../../types/user";
import { inject } from "@angular/core/primitives/di";
import { Injectable, signal } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class MemberServices {
  private baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  getMembers() {
    return this.http.get<User[]>(this.baseUrl + 'members');
  }
}