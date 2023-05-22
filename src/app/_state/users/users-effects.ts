import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { UsersActions } from "./users-store";
import { UsersService } from "@app/_pages/users/users.service";

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);
  usersService = inject(UsersService);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap((action) =>
        this.usersService.loadUsers().pipe(
          map((response: any) => {
            return UsersActions.loadUsersSuccess(response);
          })
        )
      )
    );
  });
}
