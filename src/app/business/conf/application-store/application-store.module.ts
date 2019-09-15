import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ApplicationStoreRoutingModule} from "./application-store-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {ApplicationStoreService} from "./service/application-store.service";
import {ApplicationStoreComponent} from "./component/application-store.component";
import { ApplicationElementComponent } from './component/application-element/application-element.component';

@NgModule({
    imports: [
        CommonModule,
        ApplicationStoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PluginsModule,
        SharedModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [ApplicationStoreService],
    declarations: [
        ApplicationStoreComponent,
        ApplicationElementComponent
    ],
    entryComponents: [
    ]
})
export class ApplicationStoreModule {
}
