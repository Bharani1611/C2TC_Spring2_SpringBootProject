import { Routes } from '@angular/router';
import { CollegeListComponent } from './components/college-list/college-list';
import { CollegeFormComponent } from './components/college-form/college-form';
import { CollegeDetailComponent } from './components/college-detail/college-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/colleges', pathMatch: 'full' },
  { path: 'colleges', component: CollegeListComponent },
  { path: 'colleges/new', component: CollegeFormComponent },
  { path: 'colleges/edit/:id', component: CollegeFormComponent },
  { path: 'colleges/:id', component: CollegeDetailComponent },
];
