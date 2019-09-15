import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMyThemeComponent } from "./component/manage-my-theme.component";



const routes: Routes = [
    {
        path: '',
        component: ManageMyThemeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ManageMyThemeRoutingModule {}
