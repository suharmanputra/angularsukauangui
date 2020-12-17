import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class MenuBarService {
  private btnMenu = new BehaviorSubject("menu");
  globalBtnMenu = this.btnMenu;
  private isAdmin = new BehaviorSubject(false);
  adminMenuVisible = this.isAdmin;
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

  setAdminVisible(username: string) {
    console.log(username);
    if (username.toLowerCase() == "superadmin") {
      this.isAdmin.next(true);
    } else {
      this.isAdmin.next(false);
    }
  }

  setIsAuthenticated(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }
  setLoadingAnimation(isDisplay: boolean) {
    this.loadingAnimation.next(isDisplay);
  }
}
