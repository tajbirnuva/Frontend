import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';

export const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: 'create',
    component: PersonCreateComponent,
  },
  {
    path: 'update/:id',
    component: PersonCreateComponent,
  },
];
