import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { loggedInUser } from '../helpers/utils';
import { ApiServiceService } from 'src/app/common/services/api-service.service';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: User | null = null;

    constructor (private http: HttpClient, private apiService: ApiServiceService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User | null {
        if (!this.user) {
            this.user = loggedInUser();
        }
        return this.user;
    }

    /**
     * Performs the login auth
     * @param email email of user
     * @param password password of user
     */
    login(userName: any, password: string,type:any,class_id:any): any {
       let request;
        if(type == 'admin'){
             request = {
                email: userName,
                password: password,
                type: type,
                class_id: class_id 
        }
    }else if(type == 'staff'){
        request = {
            email: userName ,
            password: password,
            type: type,
        }
    }
    else{
        request = {
            roll_no:  userName*1,
            class_id: class_id,
            password:password,
            type: type,
          }
        }  
    
        sessionStorage.setItem('currentUserName', JSON.stringify(request));

        this.user = this.apiService.login(request);

        return this.user;
        // return this.http.post<any>(`/api/login`, { email, password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             this.user = user;
        //             // store user details and jwt in session
        //             sessionStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //         console.log(user);
                
        //         return user;
        //     }));
    }

    /**
     * Performs the signup auth
     * @param name name of user
     * @param email email of user
     * @param password password of user
     */
    signup(name: string, email: string, password: string): any {
        return this.http.post<any>(`/api/signup`, { name, email, password })
            .pipe(map(user => user));

    }



    /**
     * Logout the user
     */
    logout(): void {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.user = null;
    }
}

