import {Component, Inject, Input, OnInit} from '@angular/core';
import {RequestArgs} from "../../../../../shared/model/request-args";
import {ApplicationItem} from "../../model/application-store.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-application-element',
    templateUrl: './application-element.component.html',
    styleUrls: ['./application-element.component.scss']
})
export class ApplicationElementComponent implements OnInit {
    /**判断点击的是 新增 or 编辑*/
    @Input() item: ApplicationItem;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    constructor(private http: HttpClientService,@Inject(DOCUMENT) private document: any) {
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        this.requestArgs.systemName = "item";
        // this.requestArgs.url = "assets/data/mock-data/area.json";
        this.requestArgs.url = "/assets/data/api/v1/ApplicationStore/list.json";
    }

    ngOnInit() {
    }

    // get方式下载文件
    getFile() {
        // this.requestArgs.url=this.item.url;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                let blob = new Blob([JSON.stringify(res.result)], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = this.document.createElement('a');
                this.document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                let filename = this.item.name+ new Date().getTime() +".txt";
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            });
    }

}
