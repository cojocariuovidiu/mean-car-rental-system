import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleAddComponent } from './vehicleAdd/vehicleAdd.component';
import { VehicleEditComponent } from './vehicleEdit/vehicleEdit.component';
import { VehicleDetailComponent } from './vehicleDetail/vehicleDetail.component';
import { VehicleListComponent } from './vehicleList/vehicleList.component';
import { EntryComponent } from '../entry.component';

const vehicleRoutes: Routes = [

    {
        path: 'uygulama',
        component: EntryComponent,
        children: [

            {
                path: 'araclar',
                component: VehicleListComponent,
            },

            {
                path: 'arac-ekle',
                component: VehicleAddComponent
            },
            {
                path: 'arac-duzenle/:number',
                component: VehicleEditComponent
            },
            {
                path: 'arac-detay/:number',
                component: VehicleDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(vehicleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class VehicleRoutingModule { }