import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTopicComponent } from "./component/edit-topic.component";



const routes: Routes = [
    {
        path: '',
        component: EditTopicComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class EditTopicRoutingModule {}
