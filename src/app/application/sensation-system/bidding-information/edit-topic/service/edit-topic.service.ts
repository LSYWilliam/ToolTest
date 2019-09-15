import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {TopicModel} from "../model/topic-model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class EditTopicService {
    /**判断是 新建 or 编辑 */
    public flag: string;
    /**点击回退按钮, 退到的页面*/
    public url: string;
    /**具体某个主题ID*/
    public topicID: string;
    /**主题名称校验是否成功*/
    public isSuccess: any;
    public matchWordBool: any;
    public removeWordBool: any;
    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService, private activatedRoute: ActivatedRoute,
                public router: Router,
                public message: NzMessageService) {
        this.activatedRoute.paramMap.subscribe(
            res => {
                this.flag = res.get('status');
                this.url = res.get('url');
                this.topicID = res.get('id');
            }
        );
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    /** 根据主题ID查询单个主题的接口没有。 */
    public getTopicData(topicID: string) {
        this.requestArgs.url = "/crawler/crawler-theme-info/find-crawler-theme-info";
        this.requestArgs.body = {"teId": topicID};
        return this.http.httpPost(this.requestArgs);
    }

    public getIndustry() {
        this.requestArgs.url = "/crawler/crawler-common-info/find-industry";
        this.requestArgs.body = {
            "parentCode": ""
        };
        return  this.http.httpPost(this.requestArgs);

    }

    public createTopic(topicData: TopicModel) {
        this.requestArgs.url = "/crawler/crawler-theme-info/do-create";
        this.requestArgs.body = topicData.getCreateJson();
        return  this.http.httpPost(this.requestArgs);
    }

    public editTopic(data: any) {
        this.requestArgs.url = "/crawler/crawler-theme-info/do-edit";
        this.requestArgs.body = data;
        return  this.http.httpPost(this.requestArgs);
    }
}
