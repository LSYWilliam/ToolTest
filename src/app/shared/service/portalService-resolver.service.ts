import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {ReceiveModel} from "../model/receive.model";
import {HttpClientService} from "./httpClient.service";
import {RequestArgs} from "../model/request-args";

/**
 *  Resolve  预先获取组件数据
 *      1. ActivatedRouteSnapshot 包含了即将被激活的路由
 *      2. RouterStateSnapshot 包含了该应用即将到达的状态 应该通过守卫进行检查
 */

@Injectable()
export class PortalServiceListResolverService implements Resolve<ReceiveModel> {
    constructor(private http: HttpClientService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReceiveModel> {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.url = '/api/v1/portal';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        return this.http.httpGet(requestArgs);
    }
}
