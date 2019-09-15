import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyRecycleBinComponent} from "./component/my-recycle-bin.component";
import {TopicResolverService} from "../../service/topic-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: MyRecycleBinComponent,
        resolve: { networkList: TopicResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [TopicResolverService]
})
export class MyRecycleBinRoutingModule {}
