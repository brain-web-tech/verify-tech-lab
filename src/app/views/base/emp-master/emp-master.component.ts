import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { 
  RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,TableDirective,
  FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective
} from '@coreui/angular';
import { EmployeeService } from '../../../services/employee/employee.service';
import { EmployeeModel } from '../../../services/employee/employee';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationComponent } from '../../../views/forms/validation/validation.component';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-emp-master',
    templateUrl: './emp-master.component.html',
    styleUrls: ['./emp-master.component.scss'],
    imports: [
                ReactiveFormsModule, FormsModule, RowComponent, ColComponent, TextColorDirective, 
                CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective,
                RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, 
                CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, 
                FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, 
                FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective
              ]
})
export class EmployeeComponent implements OnInit {
  employeeList: EmployeeModel[] = [];
  SearchText = '';
  SortBy = 'Employee_Name';
  isDescending = false;
  PageNumber = 0;
  PageSize = 10;
  totalRecords = 0;
  dataSaved = false;
  massage: any;
  employeeIdUpdate = null;
  employeeForm: any;
  data : any;
  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;
  toastMessage : any;

  constructor(
    private service: EmployeeService,
    private toast: ToastrService,
    private formbulider: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      Employee_Name: ['', [Validators.required]],
      Phone: ['', [Validators.required], Validators.pattern(/^[6-9]\d{9}$/)],
      Email: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      Branch_Name: ['', [Validators.required]],
      Company_Name: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    
    const userName = sessionStorage.getItem("isRedirectParam");
    if(userName !== undefined && userName !== null && userName !== ''){
      this.UserProfile(userName);
    }
    else{
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
      let employee = {
        PageNumber: this.PageNumber.toString(),
        PageSize: this.PageSize.toString(),
        SortBy: this.SortBy.toString(),
        SearchText: this.SearchText.toString()
      };
      this.service.getEmployees(employee).subscribe({
        next: (response) => {
          this.employeeList = response.data;
          this.totalRecords = response.totalRecords;
        },
        error: (err) => {
          this.toast.error('Something went wrong! Please try again.', 'Error!', {
            timeOut: 5000,
            progressBar: true
          });
        }
      });
  }

  onSearch(): void {
    const SearchText = document.getElementById('SearchText') as HTMLInputElement;
    this.SearchText = SearchText.value;
    this.loadEmployee();
  }

  onSort(sortBy: string): void {
    this.SortBy = sortBy;
    this.isDescending = !this.isDescending;
    this.loadEmployee();
  }

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > Math.ceil(this.totalRecords / this.PageSize)) {
      return; // Stop execution if the newPage is out of valid range
    }
    this.PageNumber = newPage;
    this.loadEmployee();
  }

  loadEmployeeToEdit(employeeId: string) {
    this.service.getEmployeeById(employeeId).subscribe({
      next: (result) => {
        this.data = result;
        if (result.status == 'success') {
          const AddUpdateEmployee = document.getElementById('AddUpdateEmployee') as HTMLInputElement;
          AddUpdateEmployee.innerText = "Edit Employee";
          const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
          EmployeeMaster.classList.remove('d-none');
          const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
          EmployeeList.classList.add('d-none');

          this.massage = null;
          this.dataSaved = false;
          this.employeeIdUpdate = result.data.emp_Id;
          this.employeeForm.controls['Employee_Name'].setValue(result.data.employee_Name);
          this.employeeForm.controls['Phone'].setValue(result.data.phone);
          this.employeeForm.controls['Email'].setValue(result.data.email);
          this.employeeForm.controls['Gender'].setValue(result.data.gender);
          this.employeeForm.controls['Designation'].setValue(result.data.designation);
          this.employeeForm.controls['Department'].setValue(result.data.department);
          this.employeeForm.controls['Branch_Name'].setValue(result.data.branch_Name);
          this.employeeForm.controls['Company_Name'].setValue(result.data.company_Name);

          const colUserName = document.getElementById('colUserName') as HTMLInputElement;
          colUserName.classList.add('d-none');
          const colPassword = document.getElementById('colPassword') as HTMLInputElement;
          colPassword.classList.add('d-none');

          this.customStylesValidated = true;

          const AddEditIcon = document.getElementById('AddEditIcon') as HTMLInputElement;
          AddEditIcon.classList.add('fa-pencil');
          AddEditIcon.classList.remove('fa-plus-circle');
          AddEditIcon.classList.remove('fa-user');
        }
        else{
          this.toast.error('Something went wrong! Please try again.', 'Error!', {
            timeOut: 5000,
            progressBar: true
          });
        }
      },
      error: (err) => {
        this.toast.error('Something went wrong! Please try again.', 'Error!', {
          timeOut: 5000,
          progressBar: true
        });
      }
    });
  }

  deleteEmployee(employeeId: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteEmployeeById(employeeId).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Record Deleted Successfully',
            showConfirmButton: false,
            timer: 1500
          });        
          this.loadEmployee();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }

  AddEmployee(){
    const reset = document.getElementById('reset') as HTMLButtonElement;
    if (reset) {
      reset.click();
    }
    const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
    EmployeeMaster.classList.remove('d-none');
    const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
    EmployeeList.classList.add('d-none');
    const AddUpdateEmployee = document.getElementById('AddUpdateEmployee') as HTMLInputElement;
    AddUpdateEmployee.innerText = "Create Employee";
    const colUserName = document.getElementById('colUserName') as HTMLInputElement;
    colUserName.classList.remove('d-none');
    const colPassword = document.getElementById('colPassword') as HTMLInputElement;
    colPassword.classList.remove('d-none');


    const AddEditIcon = document.getElementById('AddEditIcon') as HTMLInputElement;
    AddEditIcon.classList.add('fa-plus-circle');
    AddEditIcon.classList.remove('fa-pencil');
    this.employeeIdUpdate = null;
  }

  CreateEmployee(data:any){
    if(this.employeeIdUpdate != '' && this.employeeIdUpdate != null){
      data.Password = '0';
      data.UserName = '0'
      data.emp_Id = this.employeeIdUpdate;
      this.toastMessage = "Successfully updated";
    }
    else{
      this.toastMessage = "Successfully created";
    }
    this.customStylesValidated = true;
    if(data.Branch_Name === null || data.Branch_Name === '' || data.Company_Name === '' || data.Department === '' || data.Designation === '' || data.Email === '' || data.Employee_Name === '' || data.Gender === '' || data.Phone === '' || data.Password === '' || data.UserName === ''){
      this.toast.warning('Please fill required field!', 'Required!', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true        
      });
    }
    else{
      this.service.createEmployee(data).subscribe({
        next: (result) => {
          this.data = result.data;
          if (parseInt(this.data) > 0) {
            this.loadEmployee();
            const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
            if (EmployeeMaster) {
              EmployeeMaster.classList.add('d-none');
            }
            const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
            if (EmployeeList) {
              EmployeeList.classList.remove('d-none');
            }
            this.toast.success(this.toastMessage, 'Success!', {
              timeOut: 5000, closeButton: true, progressBar: true
            });
          }
          else{
            this.toast.error('Something went wrong! Please try again.', 'Error!', {
              timeOut: 5000,
              progressBar: true
            });
          }
        },
        error: (err) => {
          this.toast.error('Something went wrong! Please try again.', 'Error!', {
            timeOut: 5000,
            progressBar: true
          });
        }
      });
    }
  }

  onReset() {
    this.customStylesValidated = false;
  }

  onMobile() {
    const MobileNumber = document.getElementById('MobileNumber') as HTMLInputElement;
    if (MobileNumber) {
      let mob = MobileNumber.value.trim();      
      let mobilePattern = /^[6-9]\d{9}$/;
      if (!mobilePattern.test(mob)) {
        MobileNumber.value = "";
        MobileNumber.focus();
        this.toast.warning('Please enter valid mobile number!', 'Required!');
        return;
      }
      else{this.customStylesValidated = true;}
    }
  }

  onName(){
    const EmployeeName = document.getElementById('EmployeeName') as HTMLInputElement;
    if (EmployeeName.value != '') {
      this.customStylesValidated = true;
    }
  }

  OnEmail() {
    const EmailId = document.getElementById('EmailId') as HTMLInputElement;
    if (EmailId) {
      let email = EmailId.value.trim();
      let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        EmailId.value = "";
        EmailId.focus();
        this.toast.warning('Please enter valid email', 'Required!');
        return;
      }else{this.customStylesValidated = true;}
    }
  }
  
  BackToList(){
    const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
    EmployeeMaster.classList.add('d-none');
    const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
    EmployeeList.classList.remove('d-none');
    this.loadEmployee();
  }

  UserProfile(userName:any){
    sessionStorage.setItem("isRedirectParam","");
    this.service.getUserProfileByUserName(userName).subscribe({
      next: (result) => {
        this.data = result;
        if (result.status == 'success') {
          const AddUpdateEmployee = document.getElementById('AddUpdateEmployee') as HTMLInputElement;
          AddUpdateEmployee.innerText = "Employee Profile";
          const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
          EmployeeMaster.classList.remove('d-none');
          const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
          EmployeeList.classList.add('d-none');

          this.massage = null;
          this.dataSaved = false;
          this.employeeIdUpdate = result.data.emp_Id;
          this.employeeForm.controls['Employee_Name'].setValue(result.data.employee_Name);
          this.employeeForm.controls['Phone'].setValue(result.data.phone);
          this.employeeForm.controls['Email'].setValue(result.data.email);
          this.employeeForm.controls['Gender'].setValue(result.data.gender);
          this.employeeForm.controls['Designation'].setValue(result.data.designation);
          this.employeeForm.controls['Department'].setValue(result.data.department);
          this.employeeForm.controls['Branch_Name'].setValue(result.data.branch_Name);
          this.employeeForm.controls['Company_Name'].setValue(result.data.company_Name);

          const colUserName = document.getElementById('colUserName') as HTMLInputElement;
          colUserName.classList.add('d-none');
          const colPassword = document.getElementById('colPassword') as HTMLInputElement;
          colPassword.classList.add('d-none');

          this.customStylesValidated = true;

          const AddEditIcon = document.getElementById('AddEditIcon') as HTMLInputElement;
          AddEditIcon.classList.add('fa-user');
          AddEditIcon.classList.remove('fa-plus-circle');

          const role = sessionStorage.getItem("UserRole");
          const btnBackToList = document.getElementById('btnBackToList') as HTMLInputElement;
          const btnSubmit = document.getElementById('btnSubmit') as HTMLInputElement;
          const reset = document.getElementById('reset') as HTMLInputElement; 
          const chkCondition = document.getElementById('chkCondition') as HTMLInputElement;
          if(role === 'User'){
            btnBackToList.classList.add('d-none');
            btnSubmit.classList.add('d-none');
            reset.classList.add('d-none');
            chkCondition.classList.add('d-none');
          }
          else{
            btnBackToList.classList.remove('d-none');
            btnSubmit.classList.remove('d-none');
            reset.classList.remove('d-none');
            chkCondition.classList.remove('d-none');
          }
        }
        else{
          this.toast.error('Something went wrong! Please try again.', 'Error!', {
            timeOut: 5000,
            progressBar: true
          });
        }
      },
      error: (err) => {
        this.toast.error('Something went wrong! Please try again.', 'Error!', {
          timeOut: 5000,
          progressBar: true
        });
      }
    });
  }
}
