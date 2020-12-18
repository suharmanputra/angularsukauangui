import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
@Component({
  selector: "app-profil-page",
  templateUrl: "./profil-page.component.html",
  styleUrls: ["./profil-page.component.css"]
})
export class ProfilPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService, private router: Router) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      }
    });

    this.menuBarService.g_username.subscribe(username => {
      if (username == "superadmin") {
        this.menuBarService.setAdminVisible(true);
      } else {
        this.menuBarService.setAdminVisible(false);
      }
    });
  }
}
