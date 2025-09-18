import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user // Import the 'user' signal helper
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // Use the `user` signal from @angular/fire/auth.
  // This signal is zone-aware and automatically updates when the auth state changes,
  // resolving the warning and simplifying your code.
  public readonly currentUser = user(this.auth);

  // The constructor is no longer needed to listen for auth state changes.
  constructor() {}

  register(email: string, password: string) {
    // This implementation is fine.
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string) {
    // This implementation is fine.
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    // This implementation is fine.
    return from(signOut(this.auth));
  }
}


// import { Injectable, inject, signal } from '@angular/core';
// import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
// import { from } from 'rxjs';
// import { toSignal } from '@angular/core/rxjs-interop';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private auth: Auth = inject(Auth);
//   private authState$ = authState(this.auth);

//   public currentUser = toSignal(this.authState$, { initialValue: undefined });

//   register(email: string, password: string) {
//     return from(createUserWithEmailAndPassword(this.auth, email, password));
//   }

//   login(email: string, password: string) {
//     return from(signInWithEmailAndPassword(this.auth, email, password));
//   }

//   logout() {
//     return from(signOut(this.auth));
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public currentUser;

//   constructor(private auth: Auth) {
//     const authState$ = authState(this.auth);
//     this.currentUser = toSignal(authState$, { initialValue: undefined });
//   }

//   register(email: string, password: string) {
//     return from(createUserWithEmailAndPassword(this.auth, email, password));
//   }

//   login(email: string, password: string) {
//     return from(signInWithEmailAndPassword(this.auth, email, password));
//   }

//   logout() {
//     return from(signOut(this.auth));
//   }
// }

