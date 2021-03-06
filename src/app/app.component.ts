import { Component, isDevMode, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from './shared/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Blog';
  loading = false;

  constructor(
    private loadingService: LoadingService
  ){
    console.log('isDevMode ? ', isDevMode());
  }

  ngOnInit(): void{
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((value) => {
        this.loading = value;
      });
  }

}
