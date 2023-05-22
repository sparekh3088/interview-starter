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
  firstName: string | null;
  lastName: string | null;
  maidenName: string | null;
  age: number;
  gender: string;
  email: string | null;
  phone: string;
  birthDate: string;
}

export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  users: User[];
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
  isLoading: false,
  isSaving: false,
  users: [],
});

export const UsersActions = createActionGroup({
  source: UsersStoreKey,
  events: {
    Init: emptyProps(),
    "Load Users": emptyProps(),
    "Load Users Success": props<{ users: User[] }>(),
    "Load Users Failure": emptyProps(),
    "Edit User": props<{ user: User }>(),
    "Edit User Success": props<{ user: User }>(),
    "Edit User Failure": props<{ user: User }>(),
    "Select User": props<{ selectedUserId: string | null }>(),
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
    })),
    on(UsersActions.editUser, (state, { user }) => ({
      ...state,
      user,
      isSaving: true,
    })),
    on(UsersActions.editUserSuccess, (state, result) => {
      const users = [...state.users];
      for (let i = 0; i < users.length; i++) {
        const element: User = users[i];
        if (element.id === state.selectedUserId) {
          users[i] = result.user;
        }
      }
      return {
        ...state,
        isSaving: false,
        users,
      };
    }),
    on(UsersActions.editUserFailure, (state, result) => {
      return {
        ...state,
        isSaving: false,
      };
    }),
    on(UsersActions.selectUser, (state, { selectedUserId }) => {
      return {
        ...state,
        selectedUserId,
      };
    })
  ),
});
