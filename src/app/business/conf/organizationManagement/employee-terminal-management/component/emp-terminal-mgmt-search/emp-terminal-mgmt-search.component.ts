import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-emp-terminal-mgmt-search',
  templateUrl: './emp-terminal-mgmt-search.component.html',
  styleUrls: ['./emp-terminal-mgmt-search.component.scss']
})
export class EmpTerminalMgmtSearchComponent implements OnInit {

    @Input() empName;
    @Input() mac;
    @Input() number;
    @Output() output: EventEmitter<object> = new EventEmitter<object>();

    target: object= {
        empName:this.empName,
        mac:this.mac,
        number:this.number
    };

    constructor() {
        this.empName="";
    }

    empNameChange(value) {
        this.target["empName"]=value;
        this.output.emit(this.target);
    }

    macChange(value) {
        this.target["mac"]=value;
        this.output.emit(this.target);
    }

    numberChange(value) {
        this.target["number"]=value;
        this.output.emit(this.target);
    }

    clear() {
        this.empName="";
        this.mac="";
        this.number="";
        this.target = {
            empName:this.empName,
            mac:this.mac,
            number:this.number
        };
        this.output.emit(this.target);
    }

    ngOnInit() {
    }

}
