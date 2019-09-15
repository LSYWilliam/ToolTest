import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSnifferComponent } from "./component/edit-sniffer.component";



const routes: Routes = [
    {
        path: '',
        component: EditSnifferComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class EditSnifferRoutingModule{}
