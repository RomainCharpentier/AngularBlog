import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { PROJECT_NAME } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  // registrationData: FormGroup;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);
  verify_password: FormControl = new FormControl('', [Validators.required]);
  last_name: FormControl = new FormControl('', [Validators.required]);
  first_name: FormControl = new FormControl('', [Validators.required]);
  // errorMsg: string;
  projectName: string = PROJECT_NAME;
  // subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to the error service to catch errors
    // this.subscriptions.add(this.errorService.errorEvent.subscribe((err: Error) => {
      // this.errorMsg = err.message;
    // }));
    this.buildFormGroup();
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

  /**
   * Build the formGroup and set default values
   */
  private buildFormGroup(): void {
    // this.registrationData = this.formBuilder.group({
    //   email: this.email,
    //   password: this.password,
    //   first_name: this.first_name,
    //   last_name: this.last_name,
    //   verify_password: this.verify_password
    // });
  }

  /**
   * Gets the validation message to show for each field
   */
  getFieldErrorMessage(field: string): string {
    if (field === 'email') {
      if (this.email.hasError('required')) {
        return 'You must provide an email address';
      } else if (this.email.hasError('email')) {
        return 'Please enter a valid email address (yourname@knowhere.com)';
      }
    } else {
      // if (this[field].hasError('required')) {
        // return `You must provide a ${field}`;
      // }
    }
    return '';
  }

  /**
   * Perform the registration
   */
  register(): void {
    // this.errorMsg = undefined;
    // this.subscriptions.add(this.authService.register(this.registrationData.getRawValue())
    //   .subscribe((resp: User) => {
    //     this.router.navigateByUrl('/login');
    //   }));
  }
}
