import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class MenuBarService {
  private btnMenu = new BehaviorSubject("menu");
  globalBtnMenu = this.btnMenu;
  private adminMenu = new BehaviorSubject(false);
  adminmenuvisible = this.adminMenu;
  private isAuthenticated = new BehaviorSubject(false);
  globalIsAuthenticated = this.isAuthenticated;
  private loadingAnimation = new BehaviorSubject(false);
  sharedLoadingAnimation = this.loadingAnimation;

  constructor(private router: Router) {}

  setMenuVisible(isonloginpage: boolean) {
    if (isonloginpage) {
      this.btnMenu.next("myMenu");
    } else {
      this.btnMenu.next("myMenuHide");
    }
  }

  setAdminVisible(isAdmin: boolean) {
    if (isAdmin) {
      this.adminMenu.next(true);
    } else {
      this.adminMenu.next(false);
    }
  }

  setIsAuthenticated(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }
  setLoadingAnimation(isDisplay: boolean) {
    this.loadingAnimation.next(isDisplay);
  }
}
