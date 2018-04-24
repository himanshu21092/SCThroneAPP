import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

    baseURL: String = 'https://scthroneapi.herokuapp.com/';

    constructor(private http: HttpClient) {
        console.log('Hello HttpProvider Provider');
    }

    addNewEmployee(data: any) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.post(this.baseURL + 'createNewEmployee/', data, httpOptions);
    }

    getCurrentState() {

        return this.http.get(this.baseURL + 'get-current-state/');
    }

    iamNext(empid) {
        return this.http.get(this.baseURL + 'iamnext/' + empid);
    }

    done(empid) {
        return this.http.get(this.baseURL + 'done/' + empid);
    }

}
