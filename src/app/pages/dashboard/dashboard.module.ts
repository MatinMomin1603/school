import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
// import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { AddMedicalWorldComponent } from './custom-pages/add-medical-world/add-medical-world.component';
import { DictionaryFilterPipe } from 'src/app/common/pipes/dictionary-filter.pipe';
import { StudentsInfoComponent } from './custom-pages/students-info/students-info.component';
import { MemberOfStaffComponent } from './custom-pages/member-of-staff/member-of-staff.component';
import { CreateResultComponent } from './custom-pages/create-result/create-result.component';
import { UpdateResultComponent } from './custom-pages/update-result/update-result.component';
import { ViewResultComponent } from './custom-pages/view-result/view-result.component';
import { SessionsComponent } from './custom-pages/sessions/sessions.component';
import { TermsComponent } from './custom-pages/terms/terms.component';
import { ClassesComponent } from './custom-pages/classes/classes.component';
import { SubjectsComponent } from './custom-pages/subjects/subjects.component';
import { StudentAttendanceComponent } from './custom-pages/student-attendance/student-attendance.component';
import { InviocesComponent } from './custom-pages/invioces/invioces.component';
import { StaffAttendanceComponent } from './custom-pages/staff-attendance/staff-attendance.component';
import { FeeStructureComponent } from './custom-pages/fee-structure/fee-structure.component';
import { PayOutComponent } from './custom-pages/pay-out/pay-out.component';
import { ProfileComponent } from './custom-pages/profile/profile.component';
import { ViewStudentAttendanceComponent } from './custom-pages/view-student-attendance/view-student-attendance.component';
import { ClassPerformanceComponent } from './custom-pages/class-performance/class-performance.component';




@NgModule({
  declarations: [
    AddMedicalWorldComponent,
    DictionaryFilterPipe,
    StudentsInfoComponent,
    MemberOfStaffComponent,
    CreateResultComponent,
    UpdateResultComponent,
    ViewResultComponent,
    SessionsComponent,
    TermsComponent,
    ClassesComponent,
    SubjectsComponent,
    StudentAttendanceComponent,
    InviocesComponent,
    StaffAttendanceComponent,
    FeeStructureComponent,
    PayOutComponent,
    ProfileComponent,
    ViewStudentAttendanceComponent,
    ClassPerformanceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdvancedTableModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  ]
})
export class DashboardModule { }
