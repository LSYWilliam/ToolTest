import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    VisitorCertificationRecordRoutingModule
} from "./visitor-certification-record-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    VisitorCertificationRecordModalComponent
} from './component/visitor-certification-record-modal/visitor-certification-record-modal.component';
import {PluginsModule} from "../../../../plugins/plugins.module";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {
    VisitorCertificationRecordSearchComponent
} from './component/visitor-certification-record-search/visitor-certification-record-search.component';
import {VisitorCertificationRecordService} from "./service/visitor-certification-record.service";
import {VisitorCertificationRecordComponent} from "./component/visitor-certification-record.component";

@NgModule({
    imports: [
        CommonModule,
        VisitorCertificationRecordRoutingModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PluginsModule
    ],
    providers: [
        VisitorCertificationRecordService,
        CommonUtilService
    ],
    declarations: [
        VisitorCertificationRecordComponent,
        VisitorCertificationRecordModalComponent,
        VisitorCertificationRecordSearchComponent
    ],
    entryComponents: [
        VisitorCertificationRecordModalComponent
    ]
})
export class VisitorCertificationRecordModule {
}
