import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMedicalWorldComponent } from './custom-pages/add-medical-world/add-medical-world.component';
import { StudentsInfoComponent } from './custom-pages/students-info/students-info.component';
import { MemberOfStaffComponent } from './custom-pages/member-of-staff/member-of-staff.component';
import { CreateResultComponent } from './custom-pages/create-result/create-result.component';
import { UpdateResultComponent } from './custom-pages/update-result/update-result.component';
import { ViewResultComponent } from './custom-pages/view-result/view-result.component';
import { SessionsComponent } from './custom-pages/sessions/sessions.component';
import { TermsComponent } from './custom-pages/terms/terms.component';
import { ClassesComponent } from './custom-pages/classes/classes.component';
import { SubjectsComponent } from './custom-pages/subjects/subjects.component';
import { InviocesComponent } from './custom-pages/invioces/invioces.component';
import { StudentAttendanceComponent } from './custom-pages/student-attendance/student-attendance.component';
import { StaffAttendanceComponent } from './custom-pages/staff-attendance/staff-attendance.component';
import { FeeStructureComponent } from './custom-pages/fee-structure/fee-structure.component';
import { PayOutComponent } from './custom-pages/pay-out/pay-out.component';
import { ProfileComponent } from './custom-pages/profile/profile.component';
import { ViewStudentAttendanceComponent } from './custom-pages/view-student-attendance/view-student-attendance.component';
import { ClassPerformanceComponent } from './custom-pages/class-performance/class-performance.component';
import { PredictionComponent } from './custom-pages/prediction/prediction.component';


const routes: Routes = [{
  path: 'ecommerce',
  loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
},
{ path: 'students-info', component: StudentsInfoComponent },
{ path: 'staffs-info',  component: MemberOfStaffComponent },
{ path: 'create-result',  component: CreateResultComponent },
{ path: 'update-result',  component: UpdateResultComponent },
{ path: 'view-result',  component: ViewResultComponent },
{ path: 'sessions',  component: SessionsComponent },
{ path: 'terms',  component: TermsComponent },
{ path: 'classes',  component: ClassesComponent },
{ path: 'subjects',  component: SubjectsComponent },
{ path: 'invioces',  component: InviocesComponent },
{ path: 'mark-student-attendance',  component: StudentAttendanceComponent },
{ path: 'view-student-attendance',  component: ViewStudentAttendanceComponent },
{ path: 'staff-attendance',  component: StaffAttendanceComponent },
{ path: 'fee-structure',  component: FeeStructureComponent },
{ path: 'pay-out',  component: PayOutComponent },
{ path: 'profile',  component: ProfileComponent },
{ path: 'class-performance',  component: ClassPerformanceComponent },
{ path: 'prediction',  component: PredictionComponent },
{
  path: 'analytics',
  loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
},
{path: 'add-medical-word', component: AddMedicalWorldComponent},
{
  path: '',
  redirectTo: 'students-info',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
