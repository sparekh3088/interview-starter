import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  serviceBaseCall = "https://dummyjson.com/users";
  constructor(private http: HttpClient) {}

  loadUsers() {
    return this.http.get<Response>(this.serviceBaseCall);
  }

  editUser(userId: number, user: any) {
    return this.http.put(`${this.serviceBaseCall}/${userId}`, user);
  }
}
