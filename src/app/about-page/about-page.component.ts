import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { Router } from "@angular/router";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
@Component({
  selector: "app-about-page",
  templateUrl: "./about-page.component.html",
  styleUrls: ["./about-page.component.css"]
})
export class AboutPageComponent implements OnInit {
  aboutContent: string;

  constructor(
    private menuBarService: MenuBarService,
    private router: Router,
    private aknutman: AknutmanWsService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      }
    });

    if (atob(localStorage.getItem("username")) == "superadmin") {
      this.menuBarService.setAdminVisible(true);
    } else {
      this.menuBarService.setAdminVisible(false);
    }

    this.getAboutContent();
  }

  getAboutContent() {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman
      .getAbout(atob(localStorage.getItem("userid")))
      .subscribe(respAbout => {
        this.aboutContent = respAbout.data.Content;
        this.menuBarService.setLoadingAnimation(false);
      });
  }
}
