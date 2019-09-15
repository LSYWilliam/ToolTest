import {Component} from '@angular/core';
import {HttpClientService} from "../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../shared/model/request-args";
import {Router} from "@angular/router";

/**
  * 顶部菜单布局组件
  * @class HeaderLayoutComponent
*/
@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})

export class HeaderLayoutComponent {
    /** 是否退出对话框状态 */
    public isVisible: any;
    public userName: string;
    public sysName: string;

    constructor(private http: HttpClientService, private router: Router) {

        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = "/api/v1/overview/business/info";

        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.sysName = res.result.businessName;
                    } else{
                        this.sysName = "";
                    }
                });

        this.isVisible = false;
        this.userName = sessionStorage.getItem('userName');
    }

    /** 退出按钮事件 */
    logOut = () => this.isVisible = true;
    /** 退出按钮中取消按钮事件 */
    handleCancel = () => this.isVisible = false;
    /** 退出按钮中确定按钮事件 */
    handleOk() {
        this.http.httpPost(
            new RequestArgs(
                {'systemName': 'system',
                    'url':'/ewifi/system/console/user_logout',
                    'header': {'ticket': sessionStorage.getItem('ticket')}
                }
            )
        )
            .subscribe(
                res => {
                        sessionStorage.removeItem('ticket');
                        this.router.navigateByUrl('login');
                }
            )
    }
}
