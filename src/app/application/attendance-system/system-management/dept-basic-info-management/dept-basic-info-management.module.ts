import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeptBasicInfoManagementComponent} from "./component/dept-basic-info-management.component";
import {DeptDropTreeComponent} from "./component/dept-drop-tree/dept-drop-tree.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {DeptBasicInfoManagementRoutingModule} from "./dept-basic-info-management-routing.module";
import {SharedModule} from "../../../../shared/shared.module";
import { DeptBasicInfoModalComponent } from './component/dept-basic-info-modal/dept-basic-info-modal.component';
import { SearchDropTreeComponent } from './component/search-drop-tree/search-drop-tree.component';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        SharedModule,
        DeptBasicInfoManagementRoutingModule,
        ReactiveFormsModule
    ],
    exports:[
        DeptBasicInfoManagementComponent,
        DeptDropTreeComponent,
        DeptBasicInfoModalComponent,
        SearchDropTreeComponent
    ],
    declarations: [
        DeptBasicInfoManagementComponent,
        DeptDropTreeComponent,
        DeptBasicInfoModalComponent,
        SearchDropTreeComponent
    ],
    entryComponents: [
        DeptBasicInfoModalComponent
    ]
})
export class DeptBasicInfoManagementModule {
}
