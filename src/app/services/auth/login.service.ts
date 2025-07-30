import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export { renderModule } from '@angular/platform-server';
import { environment } from '../../environment/environment.developemnt';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/auth`;

  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  signIn(credentials: { email: string; password: string }): Observable<{ token: string; user: IUser }> {
    return this.http.post<{ token: string; user: IUser }>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        this.tokenSubject.next(res.token);
        this.userSubject.next(res.user);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
      complete: () => {
        this.tokenSubject.next(null);
        this.userSubject.next(null);
      },
    });
  }



  checkCookie(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.document.cookie;
    }
    return false;
  }
}
