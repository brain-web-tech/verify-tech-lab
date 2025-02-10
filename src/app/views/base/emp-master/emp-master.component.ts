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
import { Router } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private service: EmployeeService,
    private toast: ToastrService,
    private formbulider: FormBuilder,
    private router: Router
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
    this.loadEmployee();
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
    this.service.getEmployeeById(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.emp_Id;
      this.employeeForm.controls['Employee_Name'].setValue(employee.employee_Name);
      this.employeeForm.controls['Code'].setValue(employee.code);
      this.employeeForm.controls['Company_Name'].setValue(employee.company_Name);
      this.employeeForm.controls['Branch_Name'].setValue(employee.branch_Name);
      this.employeeForm.controls['Department'].setValue(employee.department);
      this.employeeForm.controls['Designation'].setValue(employee.designation);
      this.employeeForm.controls['UserName'].setValue(employee.UserName);
      this.employeeForm.controls['Password'].setValue(employee.Password);
      this.employeeForm.controls['Email'].setValue(employee.Email);
      this.employeeForm.controls['Phone'].setValue(employee.Phone);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      //this.imageSrc = employee.FilePath;
    });
  }

  deleteEmployee(employeeId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.service.deleteEmployeeById(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadEmployee();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
        setTimeout(() => { this.massage = ''; }, 1000);
      });
    }
  }

  AddEmployee(){
    const EmployeeMaster = document.getElementById('EmployeeMaster') as HTMLInputElement;
    if (EmployeeMaster) {
      EmployeeMaster.classList.remove('d-none');
    }

    const EmployeeList = document.getElementById('EmployeeList') as HTMLInputElement;
    if (EmployeeList) {
      EmployeeList.classList.add('d-none');
    }

    const AddUpdateEmployee = document.getElementById('AddUpdateEmployee') as HTMLInputElement;
    if (AddUpdateEmployee) {
      AddUpdateEmployee.innerText = "Create Employee";
    }
  }

  CreateEmployee(data:any){
    this.customStylesValidated = true;
    if(data.Branch_Name === '' || data.Company_Name === '' || data.Department === '' || data.Designation === '' || data.Email === '' || data.Employee_Name === '' || data.Gender === '' || data.Password === '' || data.Phone === '' || data.UserName === ''){
      return
    }
    else{
      this.toast.success('success!', 'success!');
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
  
}
