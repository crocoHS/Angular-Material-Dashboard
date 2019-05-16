import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private url = 'http://52.77.226.131:6969/api/auth';

    constructor( private http: HttpClient ) {
    }

    // Untuk demo saja
    // public userPayload$ = new BehaviorSubject({
    //     token: 'blablablabla anjeng',
    //     id: 12312,
    //     role_id: 2,
    //     email: 'pradhigda17@gmail.com'
    // });
    //////////////////////////////

    login( payload: any ) {
        const body = {
            email: payload.email,
            password: payload.password
        };
        return this.http.post( this.url, body );
        // UNTUK DEMO SAJA
        // return this.userPayload$;
    }
}
