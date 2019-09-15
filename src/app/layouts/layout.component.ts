import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../shared/service/httpClient.service";
import {ActivatedRoute} from "@angular/router";
import {MenuModel} from "./model/menu.model";

/**
  * 布局组件
  * @class LayoutComponent
*/
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

    public menuList : MenuModel = new MenuModel();

    constructor(private http: HttpClientService, private activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{menu: any} ) => {
                if (data.menu['code'] === 0) {
                    data.menu['result'].forEach(
                        val => {
                            if(this.menuList[val] != undefined)
                            {
                                this.menuList[val][0] = true;
                            }
                        }
                    );
                }
            }
        );
    }

    ngOnInit() {}
}



