import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class MenuBarService {
  private btnMenu = new BehaviorSubject("menu");
  globalBtnMenu = this.btnMenu;
  constructor(private router: Router) {}

  setMenuVisible(isonloginpage: boolean) {
    if (isonloginpage) {
      this.btnMenu.next("myMenu");
    } else {
      this.btnMenu.next("myMenuHide");
    }
  }
}
