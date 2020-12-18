import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  listdatauser: any[] = [];
  constructor(
    private aknutman: AknutmanWsService,
    private menuBarService: MenuBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
      } else {
        this.menuBarService.g_username.subscribe(username => {
          if (username !== "superadmin") {
            this.router.navigateByUrl("/");
          }
          this.aknutman.getuserlist(username).subscribe(resp => {
            this.listdatauser = resp.persons;
            console.log(this.listdatauser);
          });
        });
      }
    });
  }
}
