import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {BusinessListComponent} from "./component/business-list.component";
import { BusinessListRoutingModule } from "./business-list-routing.module";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BusinessListService} from "../business-list/service/business-list.service";
import {SharedModule} from "../../../../shared/shared.module";
import {BusinessModalComponent} from "./component/business-modal/business-modal.component";
import {ThreeLinkComponent} from "./component/three-link/three-link.component";
import {AdapterGroupListResolverService} from "../../../../shared/service/adapter-group-list-resolver.service";

@NgModule({
    imports: [
        CommonModule,
        BusinessListRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [BusinessListService,AdapterGroupListResolverService],
    declarations: [
        BusinessListComponent,
        BusinessModalComponent,
        ThreeLinkComponent
    ],
    entryComponents: [
        BusinessModalComponent,
        ThreeLinkComponent
    ]
})

export class BusinessListModule { }
