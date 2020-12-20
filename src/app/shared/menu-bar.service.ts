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
  // private user_id = new BehaviorSubject("");
  // g_userid = this.user_id;
  // private user_name = new BehaviorSubject("");
  // g_username = this.user_name;

  constructor(private router: Router) {}

  setMenuVisible(isonloginpage: boolean) {
    if (isonloginpage) {
      this.btnMenu.next("myMenu");
    } else {
      this.btnMenu.next("myMenuHide");
    }
  }

  setAdminVisible(admin: boolean) {
    this.isAdmin.next(admin);
  }

  setIsAuthenticated(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }
  setLoadingAnimation(isDisplay: boolean) {
    this.loadingAnimation.next(isDisplay);
  }

  // setUserIdName(userid: string, username: string) {
  //   this.user_id.next(userid);
  //   this.user_name.next(username);
  // }
}
