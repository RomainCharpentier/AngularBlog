import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss, MatSnackBarRef } from '@angular/material/snack-bar';

enum NotificationPermissions {
  GRANTED = 'granted',
  DENIED = 'denied',
  DEFAULT = 'default'
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  snackbarRef: MatSnackBarRef<any> | undefined;
  snackbarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  /**
   * Show a snackbar/toast message
   */
  notifyUserShowSnackbar(msg: string, duration?: number, action?: string, actionFn?: (...args: any) => void): void {
    duration = duration ? duration : 3000;
    action = action || 'dismiss';
    this.snackbarRef = this.snackbar.open(msg, action, { ...this.snackbarConfig, duration });
    const dismissSub = this.snackbarRef.afterDismissed()
      .subscribe((matSnackbarDismissedEvt: MatSnackBarDismiss) => {
        dismissSub.unsubscribe();
      });
    const actionSub = this.snackbarRef.onAction()
      .subscribe(() => {
        if (actionFn) {
          actionFn();
        }
        actionSub.unsubscribe();
      });
  }

  /**
   * Get permission to show notifications
   */
  async checkOSNotificationPermissions(): Promise<any> {
    if (!('Notification' in window)) {
      throw new Error('Notifications are not supported');
    } else {
      return await Notification.requestPermission() as NotificationPermissions;
    }
  }

  /**
   * Show an OS Notification
   */
  async showOsNotification(title: string, body: string, icon?: string, actions?: NotificationAction[]): Promise<any> {
    let notificationPermission = NotificationPermissions.DEFAULT;
    try {
      notificationPermission = await this.checkOSNotificationPermissions();
    } catch (err) {
      console.error(err);
    }
    if (notificationPermission === NotificationPermissions.GRANTED && title && body) {
      const timestamp = new Date().getTime();
      const swReg = await navigator.serviceWorker.getRegistration();
      if (swReg) {
        await swReg.showNotification(title, { body, icon, actions });
      }
    }
  }
}
