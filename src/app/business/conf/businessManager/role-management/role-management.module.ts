import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RoleManagementComponent} from "./component/role-management.component";
import { RoleManagementRoutingModule } from "./role-management-routing.module";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {RoleManagementService } from './service/role-management.service';
import {AuthModalComponent} from './component/auth-modal/auth-modal.component';
import {SharedModule} from "../../../../shared/shared.module";
import { AddRoleModalComponent } from './component/add-role-modal/add-role-modal.component';
import {DropTreeComponent} from "./component/drop-tree/drop-tree.component";

@NgModule({
    imports: [
        CommonModule,
        RoleManagementRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [RoleManagementService],
    declarations: [
        RoleManagementComponent,
        AuthModalComponent,
        AddRoleModalComponent,
        DropTreeComponent
    ],
    entryComponents: [
        AuthModalComponent,
        AddRoleModalComponent,
        DropTreeComponent
    ]
})

export class RoleManagementModule { }
