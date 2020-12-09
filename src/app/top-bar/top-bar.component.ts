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

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private menuBarService: MenuBarService
  ) {}

  ngOnInit() {
    this.menuBarService.globalBtnMenu.subscribe(result => {
      this.btnmenu = result;
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
  logout() {
    this.router.navigateByUrl("/login");
  }
}
