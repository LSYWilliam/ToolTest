import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/service/httpClient.service';
import { RequestArgs } from '../../../../shared/model/request-args';
import { AuthenticationModel } from '../model/authentication.model';

@Injectable()

export class AuthenticationService {

    constructor(private http: HttpClientService) {}

}
