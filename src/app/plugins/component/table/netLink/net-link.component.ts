import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


/**
 * table效果组件 -- 网络详情页
 * @class NetLinkComponent
 */
@Component({
    selector: 'app-net-link',
    templateUrl: './net-link.component.html',
    styleUrls: ['./net-link.component.scss']
})
export class NetLinkComponent implements OnInit {
    public params: any;

    constructor(private router: Router) {}

    agInit(params: any): void {
        console.log(params);
        console.log(params.colDef.field);
        this.params = params;
    }

    // getNetDetails(event) {
    //     sessionStorage.setItem('networkDetailsId', this.params.data['netId']);
    //     this.router.navigate(["/network-details/" , this.params.data['netId'], this.params.data['netName']],
    //         {skipLocationChange: true });
    // }

    ngOnInit() {

    }
}
