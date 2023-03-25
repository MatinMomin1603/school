import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { AlertServiceService } from 'src/app/common/services/alert-service.service';
import { ApiServiceService } from '../../common/services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  logintype: any = 'admin';
  returnUrl: string = '/dashboard/students-info';
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';
  email:any;
  password:any;
  class_id:any = '';
  allClass:any = [];
  currentUserName:any = {};
  

  showPassword: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private titleService: Title,
    private alertPopup: AlertServiceService,
    public api: ApiServiceService
  ) {
    titleService.setTitle("School Management")
  }

  ngOnInit(): void {
    sessionStorage.setItem("Layout_Type", "vertical");
        sessionStorage.setItem("Leftsidebar_Theme", "dark");
    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, Validators.required],
      logintype:[, Validators.required],
    });

    // reset login status
    this.authenticationService.logout();
  this.api.getClasses().subscribe((res:any)=>{
        if(res.status){
          this.allClass = res.data
        }else{
          this.allClass = []
        }
  })

    // get return url from route parameters or default to '/'

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/students-info';

    this.currentUserName = sessionStorage.getItem('currentUserName');
    this.currentUserName = JSON.parse(this.currentUserName);

    this.returnUrl = this.currentUserName.type == 'student' ? '/dashboard/create-result' : '/dashboard/students-info'
  }

  /**
  * convenience getter for easy access to form fields
  */
  get formValues() { return this.loginForm.controls; }


  /**
   * On submit form
   */
  // onSubmit(): void {
  //   this.formSubmitted = true;
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  //     this.authenticationService.login(this.formValues.email?.value, this.formValues.password?.value,this.formValues.logintype?.value)
  //       .pipe(first())
  //       .subscribe(
  //         (data: any) => {
  //           console.log("data",data);
  //           if (data) {
  //           this.router.navigate([this.returnUrl]);
  //           } else {
  //             this.alertPopup.showErrorAlert("", "Wrong email or password!")
  //             this.loading = false;
  //           }          
  //         },
  //         (error: any) => {
  //           this.error = error;
  //           this.loading = false;
  //         });
  //   }
  // }

  onSubmit(){
    this.authenticationService.login(this.email, this.password,this.logintype,this.class_id)
    .pipe(first())
    .subscribe(
      (data: any) => {
        console.log("data",data);
        if (data) {
        this.router.navigate([this.returnUrl]);
        } else {
          this.alertPopup.showErrorAlert("", "Wrong email or password!")
          this.loading = false;
        }          
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      });
  }

  checkValues(data:any){
    // this.formValues.logintype?.value = data;
    console.log('this.logintype :', this.formValues.logintype.value);
  }


}
