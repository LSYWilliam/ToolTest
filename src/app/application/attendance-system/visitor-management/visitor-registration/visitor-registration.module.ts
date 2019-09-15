import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisitorRegistrationComponent} from "./component/visitor-registration.component";
import {VisitorRegistrationRoutingModule} from "./visitor-registration-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import { VisitorEditModalComponent } from './component/visitor-edit-modal/visitor-edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        VisitorRegistrationRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        VisitorRegistrationComponent,
        VisitorEditModalComponent
    ],
    entryComponents: [
        VisitorEditModalComponent
    ]
})
export class VisitorRegistrationModule {
}
