import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {UserManagementComponent} from "./component/user-management.component";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {UserManagementService} from './service/user-management.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {PasswordResetModalComponent} from "./component/password-reset-modal/password-reset-modal.component";
import { EditUserModalComponent } from './component/edit-user-modal/edit-user-modal.component';

@NgModule({
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    providers: [UserManagementService],
    declarations: [ UserManagementComponent,
        PasswordResetModalComponent,
        EditUserModalComponent ],
    entryComponents: [
        PasswordResetModalComponent,
        EditUserModalComponent
    ]
})

export class UserManagementModule { }
