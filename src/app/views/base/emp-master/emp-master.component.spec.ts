import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AccordionModule, CardModule, GridModule, ButtonModule, FormModule, ListGroupModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { EmployeeComponent } from './emp-master.component';
import { FormsModule } from '@angular/forms';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let iconSetService: IconSetService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionModule, NoopAnimationsModule, CardModule, GridModule, RouterTestingModule, EmployeeComponent,
        FormModule, ButtonModule, ListGroupModule, FormsModule, GridModule, CardModule, RouterTestingModule],
      providers: [IconSetService]
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
