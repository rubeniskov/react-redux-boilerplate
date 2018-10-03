import { combineEpics, ofType } from 'redux-observable';
import { switchMap, delay, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

export const getUsers = action$ => action$.pipe(
  ofType('USER_LOAD'),
  switchMap(q => of({
    type: 'USER_LOAD_SUCCESS',
    payload: {
      name: 'Tarek',
      surname: 'AKG47'
    }
  }).pipe(delay(1500), startWith({type: 'USER_LOADING'})))
);

export const rootEpic = combineEpics(
  getUsers
);
