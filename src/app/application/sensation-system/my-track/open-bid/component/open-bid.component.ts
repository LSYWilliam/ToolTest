import {Component, OnInit} from '@angular/core';
import {OpenBidService} from "../service/open-bid.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {ReceiveModel} from "../../../../../shared/model/receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StaticDataModel} from "../model/static-data.model";


@Component({
    selector: 'app-my-attention',
    templateUrl: './open-bid.component.html',
    styleUrls: ['./open-bid.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}

})
export class OpenBidComponent extends OpenBidService implements OnInit {
    public staticDataModel: StaticDataModel = new StaticDataModel();
    ngOnInit() {
        this.setTableData(this.topicID);
    }

    getTopicID(data: string) {
        this.setTableData(Number(data));
    }

    /** 这个接口有问题，数据定义的与呈现的数据不符 */
    private setTableData(topicID: number) {
        this.getTableList(topicID)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.topicData = res.result;
                    } else {
                        this.topicData = [];
                    }
                }
            );
    }

}
