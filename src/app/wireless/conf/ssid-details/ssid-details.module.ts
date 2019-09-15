import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SsidDetailsComponent} from "./component/ssid-details.component";
import { SsidDetailsRoutingModule } from "./ssid-details-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {SsidDetailsService} from "./service/ssid-details.service";
import {SsidElementComponent} from "./component/ssid-element/ssid-element.component";
import {FormsModule} from "@angular/forms";



@NgModule({
    imports: [
        CommonModule,
        SsidDetailsRoutingModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [SsidDetailsService],
    declarations: [ SsidDetailsComponent, SsidElementComponent ],
    entryComponents: [SsidElementComponent]
})

export class SsidDetailsModule { }
