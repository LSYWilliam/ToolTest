import {Injectable, ViewChild} from '@angular/core';
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {NetworkVisitorHead} from "../model/terminal-information-head.model";

@Injectable()
export class TerminalInformationService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData:any;

    constructor(private http: HttpClientService) {
        this.tableInput = new NetworkVisitorHead().tableInput;
        this.metaData = new NetworkVisitorHead().metaData;
        this.srcRequestArgs = new RequestArgs();
        // this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        // this.srcRequestArgs.url="http://192.168.1.143:8087/hzfacade/ewifi/online-list-management";
    }

}
