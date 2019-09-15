import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyAttentionComponent} from "./component/my-attention.component";



const routes: Routes = [
    {
        path: '',
        component: MyAttentionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class MyAttentionRoutingModule {}
