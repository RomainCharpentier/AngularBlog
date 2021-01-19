import { RegisterComponent } from './components/register/register.component';
import { WriteDialogComponent } from './components/write-dialog/write-dialog.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { PostItemComponent } from './components/post/post-item/post-item.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpRequestInterceptor } from './interceptors/http-request-interceptor';
import { MaterialModule } from './shared/material.module';
import { AuthService } from './shared/services/auth.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FakeBackendInterceptor } from './interceptors/fake-backend-interceptor';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
      AppComponent,
      AppHeaderComponent,
      AppFooterComponent,
      PageNotFoundComponent,
      PostItemComponent,
      PostListComponent,
      ShareDialogComponent,
      SideBarComponent,
      WriteDialogComponent,
      LoginComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
