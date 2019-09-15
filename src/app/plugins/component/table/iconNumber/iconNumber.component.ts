import {Component, OnInit} from '@angular/core';


/**
 * table效果组件
 * @class TableComponent
 */
@Component({
    selector: 'app-icon-number',
    templateUrl: './iconNumber.component.html',
    styleUrls: ['./iconNumber.component.scss']
})
export class IconNumberComponent implements OnInit {
    public params: any;

    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
