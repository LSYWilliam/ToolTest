import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppConfig {

    private env: Object = null;

    constructor(private http: HttpClient) {}

    public getEnv(key: any) {
        return this.env[key];
    }

    public getAll() {
        return this.env;
    }

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/env.json').catch((error : any): any => {
                resolve(true);
                return Observable.throw(error || 'Server error');
            }).subscribe( (response) => {
                this.env = response;
                resolve(true);
            })
        });
    }

    // public load() {
    //     return new Promise((resolve, reject) => {
    //         this.http.get('assets/env_Test.json').catch((error : any): any => {
    //             resolve(true);
    //             return Observable.throw(error || 'Server error');
    //         }).subscribe( (response) => {
    //             this.env = response;
    //             resolve(true);
    //         })
    //     });
    // }
}
