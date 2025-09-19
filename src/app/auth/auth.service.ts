import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
// Import only the Auth service from @angular/fire for DI
import { Auth, user } from '@angular/fire/auth';
// Import auth functions directly from native Firebase SDK to avoid injection context warnings
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly router: Router = inject(Router);

  // Signal-based user state for better reactivity and zoneless compatibility
  private readonly userSignal = signal<User | null>(null);

  // Angular Fire's user observable for reactive patterns
  public readonly currentUser$ = user(this.auth);

  // Signal-based computed properties
  public readonly currentUser = this.userSignal.asReadonly();
  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly userEmail = computed(() => this.currentUser()?.email || null);

  constructor() {
    // Subscribe to auth state changes and update signal
    this.currentUser$.subscribe(user => {
      this.userSignal.set(user);
    });
  }

  /**
   * Register a new user using native Firebase auth functions
   * @param email - User email
   * @param password - User password
   * @returns Observable<UserCredential>
   */
  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((credential) => {
        // Update signal immediately after successful registration
        this.userSignal.set(credential.user);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  /**
   * Login user using native Firebase auth functions
   * @param email - User email
   * @param password - User password
   * @returns Observable<UserCredential>
   */
  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((credential) => {
        // Update signal immediately after successful login
        this.userSignal.set(credential.user);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  /**
   * Logout user using native Firebase auth functions
   * @returns Promise<void>
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      // Update signal immediately after logout
      this.userSignal.set(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Check if user is currently authenticated (synchronous)
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Get current user email (synchronous)
   * @returns string | null
   */
  getCurrentUserEmail(): string | null {
    return this.userEmail();
  }
}
