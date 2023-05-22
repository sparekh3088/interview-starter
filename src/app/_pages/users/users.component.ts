import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { UsersService } from "./users.service";
import {
  User,
  UsersReducer,
  UsersActions,
} from "@app/_state/users/users-store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  providers: [UsersService],
})
export class UsersComponent {
  users$!: Observable<User[]>;
  selectedUserId$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.users$ = this.store.select(UsersReducer.selectUsers);
    this.isLoading$ = this.store.select(UsersReducer.selectIsLoading);
    this.store.dispatch(UsersActions.loadUsers());
  }
}
