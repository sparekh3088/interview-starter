import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, Input, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  User,
  UsersActions,
  UsersReducer,
} from "@app/_state/users/users-store";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
})
export class UpdateUserComponent implements OnDestroy {
  _user!: User;
  updateUserForm = new FormGroup({
    firstName: new FormControl<string>("", [Validators.required]),
    maidenName: new FormControl<string>("", [Validators.required]),
    lastName: new FormControl<string>("", [Validators.required]),
    email: new FormControl<string>("", [Validators.required]),
  });
  isSaving: boolean = false;
  isSaving$!: Subscription;

  @Input() set user(user: User) {
    this._user = user;
    this.updateUserForm.setValue({
      firstName: this._user.firstName,
      lastName: this._user.lastName,
      maidenName: this._user.maidenName,
      email: this._user.email,
    });
  }

  get user() {
    return this._user;
  }

  constructor(private readonly store: Store) {
    this.isSaving$ = this.store
      .select(UsersReducer.selectIsSaving)
      .subscribe((isSaving: boolean) => {
        if (this.isSaving !== isSaving) {
          this.isSaving = isSaving;
          if (!this.isSaving) {
            // this.store.dispatch(UsersActions.loadUsers());
            this.store.dispatch(
              UsersActions.selectUser({ selectedUserId: null })
            );
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.isSaving$ && this.isSaving$.unsubscribe();
  }

  saveUser() {
    this.updateUserForm.markAllAsTouched();
    if (this.updateUserForm.valid) {
      this.store.dispatch(
        UsersActions.editUser({
          user: {
            ...this.user,
            ...this.updateUserForm.value,
          },
        })
      );
    }
  }
}
