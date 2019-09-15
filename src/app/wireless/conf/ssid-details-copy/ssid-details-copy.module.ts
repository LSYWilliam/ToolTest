import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SsidDetailsCopyComponent} from "./component/ssid-details-copy.component";
import { SsidDetailsCopyRoutingModule } from "./ssid-details-copy-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {SsidDetailsCopyService} from "./service/ssid-details-copy.service";
import {SsidElementComponent} from "./component/ssid-element/ssid-element.component";
import {FormsModule} from "@angular/forms";
import {LinkDirective} from "./component/ssid-element/directive/link.directive";
import {SsidDirective} from "./component/ssid-element/directive/ssid.directive";



@NgModule({
    imports: [
        CommonModule,
        SsidDetailsCopyRoutingModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [SsidDetailsCopyService],
    declarations: [ SsidDetailsCopyComponent, SsidElementComponent, LinkDirective, SsidDirective ],
    entryComponents: [SsidElementComponent],
    exports: [ LinkDirective, SsidDirective ]
})

export class SsidDetailsCopyModule { }
