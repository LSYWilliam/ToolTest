import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {RequestArgs} from "../../../shared/model/request-args";
import {ReceiveModel} from "../../../shared/model/receive.model";
import {HttpClientService} from "../../../shared/service/httpClient.service";

@Injectable()
export class TopicResolverService {
    constructor(private http: HttpClientService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReceiveModel> {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'sensation';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        // requestArgs.header = {'ticket': '5b5cd68e0cec422ab05c24ff75c8549e'};
        requestArgs.url = "/crawler/crawler-theme-info/find-theme-info-list";
        requestArgs.body = {};
        return this.http.httpPost(requestArgs);
    }

}
