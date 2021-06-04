import { action, computed, observable } from 'mobx';
import BaseStore from '~app/common/stores/BaseStore';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import NotificationsStore from '~app/common/stores/Notifications.store';

/**
 * Base store provides singe source of true
 * for keeping all stores instances in one place
 */
class ApplicationStore extends BaseStore {
  @observable isShowingLoading: boolean = false;
  // @ts-ignore
  @observable theme: Theme;
  @observable darkMode: boolean = false;

  constructor() {
    super();
    const darkModeSaved = localStorage.getItem('isDarkMode');
    if (darkModeSaved) {
      this.darkMode = darkModeSaved === '1';
      this.switchDarkMode(this.darkMode);
    } else {
      this.switchDarkMode(false);
    }
  }

  @action.bound
  setIsLoading(status: boolean) {
    this.isShowingLoading = status;
  }

  @computed
  get isLoading() {
    return this.isShowingLoading;
  }

  @action.bound
  switchDarkMode(isDarkMode?: boolean) {
    this.darkMode = isDarkMode ?? !this.darkMode;
    localStorage.setItem('isDarkMode', this.darkMode ? '1' : '0');
    this.theme = createMuiTheme({
      palette: {
        type: this.darkMode ? 'dark' : 'light',
      },
    });
  }

  @computed
  get isDarkMode() {
    return this.darkMode;
  }

  get muiTheme(): Theme {
    return this.theme;
  }

  /**
   * Handle error appeared in any of the stores
   * @param error
   * @param args
   */
  displayUserError(error: any, ...args: any) {
    if (error?.message) {
      const notificationsStore: NotificationsStore = this.getStore('Notifications');
      notificationsStore.showMessage(error?.message, 'error');
      console.debug('Error Occurred:', { error, ...args });
      this.setIsLoading(false);
    }
  }
}

export default ApplicationStore;
