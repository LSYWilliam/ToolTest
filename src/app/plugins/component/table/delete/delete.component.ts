import {Component, OnInit} from '@angular/core';


/**
 * table效果组件
 * @class TableComponent
 */
@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    public params: any;

    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
