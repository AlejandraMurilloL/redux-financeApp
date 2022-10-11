import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe(fsUser => {
            const user = User.fromFirestore(fsUser);
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
      }
    });
  }

  createUser(name: string, email: string, password: string) {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, name, email);
        return this.firestore.doc(`${ user?.uid }/user`)
          .set({...newUser});
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fUser => fUser != null)
    );
  }
}
