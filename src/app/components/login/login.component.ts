import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { UiService } from 'src/app/shared/services/ui/ui.service';
import { PROJECT_NAME } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // loginData: FormGroup;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);
  // errorMsg: string;
  projectName: string = PROJECT_NAME;
  // subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private authService: AuthService,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    // Subscribe to the error service to catch errors
    // this.subscriptions.add(this.errorService.errorEvent.subscribe((err: Error) => {
      // this.errorMsg = err.message;
    // }));
    // if (this.authService.isAuthenticated()) {
      // this.router.navigateByUrl('/');
    // }
    this.buildFormGroup();
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

  /**
   * Build the formGroup
   */
  private buildFormGroup(): void {
    // this.loginData = this.formBuilder.group({
    //   email: this.email,
    //   password: this.password
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
    } else if (field === 'password') {
      if (this.password.hasError('required')) {
        return 'You must provide a password';
      }
    }
    return '';
  }

  /**
   * Perform the authentication
   */
  loginClick(): void {
    // this.subscriptions.add(this.authService.login(this.loginData.getRawValue())
    //   .subscribe((user: User) => {
    //     this.uiService.notifyUserShowSnackbar(`Welcome to ${PROJECT_NAME}!`);
    //     this.router.navigateByUrl('/');
    //   }));
    this.authService.login(this.email.value).subscribe(() => {
      console.log("okddd");
      this.router.navigate(['/']);
    }, error => console.log(error));
  }

  /**
   * On keypress if the key is the enter key, perform the login
   */
  onKeypress(evt: KeyboardEvent): void {
    // if (evt.key === 'Enter' && !this.loginData.invalid) {
    //   this.loginClick();
    // }
  }
}
