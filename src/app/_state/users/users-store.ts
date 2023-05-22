import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
} from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  isLoading: boolean;
  users: User[];
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
  isLoading: false,
  users: [],
});

export const UsersActions = createActionGroup({
  source: UsersStoreKey,
  events: {
    Init: emptyProps(),
    "Load Users": emptyProps(),
    "Load Users Success": props<{ users: User[] }>(),
    "Load Users Failure": emptyProps(),
    "Save Initial Users": props<{ users: User[] }>(),
  },
});

export const UsersReducer = createFeature({
  name: UsersStoreKey,
  reducer: createReducer(
    initialState,
    on(UsersActions.loadUsers, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(UsersActions.loadUsersSuccess, (state, result) => ({
      ...state,
      users: result.users,
      isLoading: false,
    })),
    on(UsersActions.loadUsersFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});
