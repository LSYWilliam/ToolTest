import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {DropDownComponent} from "./component/dropdown/dropdown.component";
import {RadioFrequencyComponent} from "./component/radioFrequency/radio-frequency.component";
import {ProbeConfComponent} from "./component/probe-conf/probe-conf.component";
import {NetWebComponent} from './component/net-web/net-web.component';
import {PluginsModule} from "../plugins/plugins.module";
import {SearchListComponent} from "./component/search-list/search-list.component";
import {FoldComponent} from "./component/fold/fold.component";
import {TransferComponent} from "./component/transfer/transfer.component";
import {RightTableComponent} from "./component/transfer/right-table/right-table.component";
import {LeftTableComponent} from "./component/transfer/left-table/left-table.component";
import {ConfirmModalComponent} from "./component/confirm-modal/confirm-modal.component";
import {DeviceComponent} from "./component/device/device.component";
import {PlantAssetModalComponent} from "./component/device/plant-asset-modal/plant-asset-modal.component";
import {SsidDirective} from "../wireless/conf/ssid-details/component/ssid-element/directive/ssid.directive";
import {LinkDirective} from "../wireless/conf/ssid-details/component/ssid-element/directive/link.directive";
import {UploadModalComponent} from "./component/upload-modal/upload-modal.component";
import {SsidItemComponent} from "./component/ssid-item/ssid-item.component";
import {ZorroTableComponent} from "./component/zorro-table/zorro-table.component";
import {TagComponent} from "./component/tag/tag.component";
import {SensationDelModalComponent} from "./component/sensation-del-modal/sensation-del-modal.component";

/**登录表单 组件*/

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PluginsModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations:
    [
        DropDownComponent,
        RadioFrequencyComponent,
        ProbeConfComponent,
        NetWebComponent,
        SearchListComponent,
        FoldComponent,
        LeftTableComponent,
        RightTableComponent,
        TransferComponent,
        ConfirmModalComponent,
        TransferComponent,
        DeviceComponent,
        PlantAssetModalComponent,
        SsidItemComponent,
        SsidDirective,
        LinkDirective,
        UploadModalComponent,
        ZorroTableComponent,
        TagComponent,
        SensationDelModalComponent
    ],
    exports:
    [
        DropDownComponent,
        RadioFrequencyComponent,
        ProbeConfComponent,
        NetWebComponent,
        SearchListComponent,
        FoldComponent,
        LeftTableComponent,
        RightTableComponent,
        TransferComponent,
        ConfirmModalComponent,
        TransferComponent,
        DeviceComponent,
        SsidItemComponent,
        SsidDirective,
        LinkDirective,
        UploadModalComponent,
        ZorroTableComponent,
        TagComponent
    ],
    providers: [],
    entryComponents: [
        ConfirmModalComponent,
        PlantAssetModalComponent,
        UploadModalComponent,
        SensationDelModalComponent
    ],
})

/** 共享模块 */
export class SharedModule { }
