import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OpenBidComponent} from "./component/open-bid.component";
import {TopicResolverService} from "../../service/topic-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: OpenBidComponent,
        resolve: { networkList: TopicResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [TopicResolverService]
})
export class OpenBidRoutingModule {}
