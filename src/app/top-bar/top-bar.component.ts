import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MenuBarService } from "../shared/menu-bar.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  btnmenu: string;
  showProgressBar: boolean;
  menuAdminPanel: boolean;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private menuBarService: MenuBarService
  ) {}

  ngOnInit() {
    this.menuBarService.globalBtnMenu.subscribe(result => {
      this.btnmenu = result;
    });

    this.menuBarService.adminMenuVisible.subscribe(result => {
      this.menuAdminPanel = result;
      console.log(result);
    });
  }
  redirect_home() {
    this.router.navigateByUrl("/dashboard");
  }
  redirect_profil() {
    this.router.navigateByUrl("/profil");
  }
  redirect_member() {
    this.router.navigateByUrl("/member");
  }
  redirect_about() {
    this.router.navigateByUrl("/about");
  }
  logout() {
    this.router.navigateByUrl("/login");
  }
}
