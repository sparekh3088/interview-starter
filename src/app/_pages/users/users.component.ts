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
import { UpdateUserComponent } from "./update-user/update-user.component";

@Component({
  selector: "app-users",
  standalone: true,
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  providers: [UsersService],
  imports: [CommonModule, HttpClientModule, UpdateUserComponent],
})
export class UsersComponent {
  users$!: Observable<User[]>;
  selectedUserId$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.users$ = this.store.select(UsersReducer.selectUsers);
    this.isLoading$ = this.store.select(UsersReducer.selectIsLoading);
    this.selectedUserId$ = this.store.select(UsersReducer.selectSelectedUserId);
    this.store.dispatch(UsersActions.loadUsers());
  }

  selectUserForEdit(selectedUserId: string | null) {
    this.store.dispatch(UsersActions.selectUser({ selectedUserId }));
  }
}
