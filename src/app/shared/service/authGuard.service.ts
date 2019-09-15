import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {HttpClientService} from "./httpClient.service";
import {RequestArgs} from "../model/request-args";

/**
 * 权限认证守卫
 * @class AuthGuardService
 * @implements CanActivate 路由守卫
 */
@Injectable()
export class AuthGuardService implements CanActivate {
    /**
     * 构造函数
     * @param router Router
     * @param httpService HttpService
     */
    constructor(private router: Router, private httpService: HttpClientService) {}

    /**
     * 路由守卫，判断用户是否有权限访问该组件。
     * @param route ActivatedRouteSnapshot
     * @param state RouterStateSnapshot
     * @return boolean
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const ticket = sessionStorage.getItem('ticket');
        const path = '/' + route.url[0].path;
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'system';
        requestArgs.url = '/ewifi/system/console/permission/check_user_permission';
        requestArgs.header = {'ticket': ticket };
        requestArgs.body = {'permissionSystem': 'wlanscope','route': path};
        return this.authUrl(requestArgs);
    }

    /**
     * 请求相关URL是否能够放行。
     * @param requestArgs RequestArgs
     * @return boolean
     */
    private authUrl(requestArgs: RequestArgs) {
        if (sessionStorage.getItem('ticket')) {
            return this.httpService.httpPost(requestArgs)
                .toPromise()
                .then(
                    res => {
                        if (res && res.result === true) {
                            return true;
                        } else {
                            this.router.navigateByUrl('/login');
                            return false;
                        }
                    }
                );
        } else {
            this.router.navigateByUrl('/noLogin');
        }
    }
}


