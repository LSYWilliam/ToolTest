import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-emp-mgmt-search',
    templateUrl: './emp-mgmt-search.component.html',
    styleUrls: ['./emp-mgmt-search.component.scss']
})
export class EmpMgmtSearchComponent implements OnInit {

    @Input() dropDownList;
    @Input() deptName;
    @Input() empName;
    @Input() jobNumber;
    @Output() output: EventEmitter<object> = new EventEmitter<object>();

    deptId;

    target: object= {
        deptName:this.deptName,
        empName:this.empName,
        jobNumber:this.jobNumber
    };

    constructor() {
        this.deptName="全部";
        this.deptId="";
    }

    empNameChange(value) {
        this.target["empName"]=value;
        this.output.emit(this.target);
    }

    jobNumberChange(value) {
        this.target["jobNumber"]=value;
        this.output.emit(this.target);
    }

    ngModelChange(value) {
        this.deptId = value;
        this.dropDownList.forEach(res=> {
           if(res.id===value) {
               if(value==="") {
                   this.target["deptName"]="";
               } else {
                   this.target["deptName"]=res.name;
               }
               this.deptName=res.name;
           }
        });
        this.output.emit(this.target);
    }

    clear() {
        this.deptName="全部";
        this.dropDownList.forEach(res=> {
            if(res.name===this.deptName) {
                this.deptId=res.id;
            }
        });
        // this.deptName="";
        this.empName="";
        this.jobNumber="";
        this.target = {
            deptName:"",
            empName:this.empName,
            jobNumber:this.jobNumber
        };
        this.output.emit(this.target);
    }

    ngOnInit() {
    }

}
