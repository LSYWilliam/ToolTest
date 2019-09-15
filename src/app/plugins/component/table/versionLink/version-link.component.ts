import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


/**
 * table效果组件 -- 固件版本
 * @class VersionLinkComponent
 */
@Component({
    selector: 'app-net-link',
    templateUrl: './version-link.component.html',
    styleUrls: ['./version-link.component.scss']
})
export class VersionLinkComponent implements OnInit {
    public params: any;

    constructor(private router: Router) {}

    agInit(params: any): void {
        this.params = params;
    }

    // getVersion(event) {
    //     this.router.navigate(['/version-explain', this.params.data['id'] ]);
    // }

    ngOnInit() {

    }
}
