import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClientService} from "./httpClient.service";
import {RequestArgs} from "../model/request-args";
/**
 *  Resolve  预先获取组件数据
 *      1. ActivatedRouteSnapshot 包含了即将被激活的路由
 *      2. RouterStateSnapshot 包含了该应用即将到达的状态 应该通过守卫进行检查
 */
@Injectable()
export class LogResolverService implements Resolve<any> {

  public role;
  constructor(private http: HttpClientService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let requestArgs: RequestArgs = new RequestArgs();
    requestArgs.systemName = 'system';
    requestArgs.url="/ewifi/system/console/role/role_list";
    requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
    return this.http.httpPost(requestArgs);
  }
}
