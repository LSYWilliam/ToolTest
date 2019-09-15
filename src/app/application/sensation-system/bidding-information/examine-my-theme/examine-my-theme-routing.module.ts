import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamineMyThemeComponent} from "./component/examine-my-theme.component";
import {TopicResolverService} from "../../service/topic-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: ExamineMyThemeComponent,
        resolve: { networkList: TopicResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [TopicResolverService]
})
export class ExamineMyThemeRoutingModule {}
