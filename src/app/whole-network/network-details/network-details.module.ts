import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { NetworkDetailsRoutingModule } from './network-details-routing.module';
import { NetworkDetailsComponent } from './component/network-details.component';
import { PluginsModule } from '../../plugins/plugins.module';
import { SharedModule } from '../../shared/shared.module';
import { NetworkDetailsService } from './service/network-details.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NetworkDetailsRoutingModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule,
        SharedModule
    ],
    providers: [NetworkDetailsService],
    declarations: [ NetworkDetailsComponent ]
})

export class NetworkDetailsModule { }
