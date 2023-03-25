import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {EBase} from "../../common/common";
import { map } from 'rxjs/operators';
const httpOptions:any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  user: any | null = null;

  constructor(private http: HttpClient) { }

  login(request: any): any {
  console.log('request :', request);
    let url = request.type == 'admin' ? '/admin/login' : request.type == 'staff' ? '/staff/login' : '/student/login'
   return this.http.post<any>(EBase.Url+url,JSON.stringify(request)).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.status) {
        this.user = user;
          // store user details and jwt in session
          sessionStorage.setItem('currentUser', JSON.stringify(user));
      
      return user;
      } else {
        return null;
      }
      // if (user && user.token) {
          
      // }
      
  }));
  }


  deleteMedical_word(data:any){
    return this.http.delete(EBase.Url+"/quiz/deleteMedicalworld?id="+data).pipe(map(results => results));
  }

  getMedicalWord(data:any,page:any){
    return this.http.get(EBase.Url+"/quiz/getAllMedicalWord?date="+data+'&page='+page).pipe(map(results => results));
  }

  addMedicalWord(data:any){
    return this.http.post(EBase.Url+"/quiz/add",JSON.stringify(data)).pipe(map(results => results));
  }

  getClasses(){
    return this.http.get(EBase.Url+'/class').pipe(map(results => results));
  }

  addClass(data:any){
    return this.http.post(EBase.Url+'/class',JSON.stringify(data)).pipe(map(results => results));
  }

  deleteClass(data:any){
    return this.http.post(EBase.Url+'/class/delete/'+data,'').pipe(map(results => results));
  }
 
  updateClass(id:any,data:any){
    return this.http.post(EBase.Url+'/class/update/'+id,JSON.stringify(data)).pipe(map(results => results));
  }
 
  getTerms(){
    return this.http.get(EBase.Url+'/admin/exam').pipe(map(results => results));
  }
  updateTerms(data:any,_id:any){
    return this.http.post(EBase.Url+'/admin/exam/update/'+_id,JSON.stringify(data)).pipe(map(results => results));
  }

  deleteTerm(data:any){
    return this.http.post(EBase.Url+'/admin/exam/delete/'+data,'').pipe(map(results => results));
  }

  addTerm(data:any){
    return this.http.post(EBase.Url+'/admin/exam/',JSON.stringify(data)).pipe(map(results => results));
  }

  getFeeStructure(){
    return this.http.get(EBase.Url+'/admin/fees/paid').pipe(map(results => results));
  }

  addFeeStructure(data:any){
    // return this.http.post(EBase.Url+'/admin/fees',JSON.stringify(data)).pipe(map(results => results));
    return this.http.post(EBase.Url+'/student/fees',JSON.stringify(data)).pipe(map(results => results));
  }

  updateFeeStructure(data:any){
    return this.http.post(EBase.Url+'/admin/update/fees'+data._id,JSON.stringify(data)).pipe(map(results => results));
  }

  getSubjects(){
    return this.http.get(EBase.Url+'/subject').pipe(map(results => results));
  }

  addSubject(data:any){
    return this.http.post(EBase.Url+'/subject',JSON.stringify(data)).pipe(map(results => results));
  }

  updateSubject(data:any,_id:any){
    return this.http.post(EBase.Url+'/subject/update/'+_id,JSON.stringify(data)).pipe(map(results => results));
  }

  deleteSubject(data:any){
    return this.http.post(EBase.Url+'/subject/delete/'+data,'').pipe(map(results => results));
  }

  submitStdAttendance(data:any){
    return this.http.post(EBase.Url+'/student/attendance',JSON.stringify(data)).pipe(map(results => results));
  }

  getStdAttendance(date:any,class_id:any){
    return this.http.get(EBase.Url+'/student/attendance/'+date+'/'+class_id).pipe(map(results => results));
  }
  getIndiStudentAtten(_id:any){
    return this.http.get(EBase.Url+'/student/attendance/'+_id).pipe(map(results => results));
  }

  addStudent(data:any){
    return this.http.post(EBase.Url+'/student',JSON.stringify(data)).pipe(map(results => results));
  }
 
  updateStudent(data:any,_id:any){
    return this.http.post(EBase.Url+'/student/update/'+_id,JSON.stringify(data)).pipe(map(results => results));
  }

  getStudents(){
    return this.http.get(EBase.Url+'/student').pipe(map(results => results));
  }

  deleteStudents(data:any){
    return this.http.post(EBase.Url+'/student/delete/'+data,'').pipe(map(results => results));
  }

  submitStaffAttendance(data:any){
    return this.http.post(EBase.Url+'/staff/attendance',JSON.stringify(data)).pipe(map(results => results));
  }

  getStaffAttendance(){
    return this.http.get(EBase.Url+'/attendance').pipe(map(results => results));
  }

  getStaff(){
    return this.http.get(EBase.Url+'/staff').pipe(map(results => results));
  }

  addStaff(data:any){
    return this.http.post(EBase.Url+'/staff',JSON.stringify(data)).pipe(map(results => results));
  }

  deleteStaff(data:any){
    return this.http.post(EBase.Url+'/staff/delete/'+data,'').pipe(map(results => results));
  }

  updateStaff(data:any,_id:any){
    return this.http.post(EBase.Url+'/staff/update/'+_id,JSON.stringify(data)).pipe(map(results => results));
  }

  submitMarks(data:any){
    return this.http.post(EBase.Url+'/student/marks',JSON.stringify(data)).pipe(map(results => results));
  }

  getStudentMarks(_id:any=''){
  console.log('_id :', _id);
    return this.http.get(EBase.Url+'/student/marks?student_id='+_id).pipe(map(results => results));
  }

  getStudentByclass(data:any){
    return this.http.get(EBase.Url+'/student/class/'+data).pipe(map(results => results));
  }

  addPayOut(data:any){
    return this.http.post(EBase.Url+'/admin/expenses',JSON.stringify(data)).pipe(map(results => results));
  }

  getPayOut(){
    return this.http.get(EBase.Url+'/admin/expenses').pipe(map(results => results));
  }

  getStudentFees(class_id:any,student_id:any){
    return this.http.get(EBase.Url+'/student/fees/'+class_id+'/'+student_id).pipe(map(results => results));
  }

  getBalance(){
    return this.http.get(EBase.Url+'/admin/balance').pipe(map(results => results));
  }






}
