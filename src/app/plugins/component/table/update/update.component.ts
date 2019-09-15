import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * table效果组件 -- 更新
 * @class
 */
@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {
    private params: any;

    constructor(private router: Router) {}

    agInit(params: any): void {
        this.params = params;
    }

    ngOnInit() {

    }
}
