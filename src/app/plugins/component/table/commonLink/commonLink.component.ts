import {Component, OnInit} from '@angular/core';


/**
 * 公共跳转组件
 * @class CommonLinkComponent
 */
@Component({
    selector: 'app-commonLink',
    templateUrl: './commonLink.component.html',
    styleUrls: ['./commonLink.component.scss']
})
export class CommonLinkComponent implements OnInit {
    public params: any;

    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
