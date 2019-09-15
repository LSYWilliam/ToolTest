import {Component, OnInit} from '@angular/core';


/**
 * table效果组件
 * @class TableComponent
 */
@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
    public params: any;

    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
