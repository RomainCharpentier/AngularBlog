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

@NgModule({
  declarations: [
      AppComponent,
      AppHeaderComponent,
      AppFooterComponent,
      PageNotFoundComponent,
      PostItemComponent,
      PostListComponent,
      ShareDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
