import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlertReceiverHeadModel} from "../../model/alert-receiver-head.model";
import {AlertReceiverListModel} from "../../model/alert-receiver-list.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Component({
  selector: 'app-alert-receiver-table',
  templateUrl: './alert-receiver-table.component.html',
  styleUrls: ['./alert-receiver-table.component.scss']
})
export class AlertReceiverTableComponent implements OnInit {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    @Input()
    public alertReceiverListModel: AlertReceiverListModel;
    @Output()
    public outputDataEvent: EventEmitter<any> = new EventEmitter();
    @ViewChild(TableComponent) child: TableComponent;

    public tableInput: TableInterface;
    public alertReceiverHeadModel: AlertReceiverHeadModel = new AlertReceiverHeadModel();

    constructor() {
        this.tableInput=this.alertReceiverHeadModel.tableInput;
    }

    selectAllItems(value) {
        let array = [];
        for( let item of value ) {
            array.push(item.data);
        }
        this.outputDataEvent.emit(array);
    }



    ngOnInit() {
        this.windowHeight = window.innerHeight-140;
    }

}
