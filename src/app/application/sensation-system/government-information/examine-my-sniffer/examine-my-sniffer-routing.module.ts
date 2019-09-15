import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamineMySnifferComponent} from "./component/examine-my-sniffer.component";
import {GovTopicResolverService} from "../../service/gov-topic-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: ExamineMySnifferComponent,
        resolve: { networkList: GovTopicResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [GovTopicResolverService]
})
export class ExamineMySnifferRoutingModule {}
