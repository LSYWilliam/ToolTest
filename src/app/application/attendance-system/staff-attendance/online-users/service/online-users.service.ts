import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {OnlineUsersHead} from "../model/online-users-head.model";

@Injectable()
export class OnlineUsersService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData:any;

    constructor(private http: HttpClientService) {
        this.tableInput = new OnlineUsersHead().tableInput;
        this.metaData = new OnlineUsersHead().metaData;
        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/hzfacade/ewifi/online-list-management";
        this.srcRequestArgs.systemName = "attendance";
    }
}
