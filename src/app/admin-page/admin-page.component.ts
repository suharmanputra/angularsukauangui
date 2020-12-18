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
    this.menuBarService.setLoadingAnimation(true);
    this.menuBarService.setMenuVisible(true);

    // this.menuBarService.globalIsAuthenticated.subscribe(result => {
    //   if (result === false) {
    //     this.router.navigateByUrl("/");
    //     this.menuBarService.setLoadingAnimation(false);
    //   } else {
    //     this.menuBarService.g_username.subscribe(username => {
    //       if (username !== "superadmin") {
    //         this.router.navigateByUrl("/");
    //       }
    //       this.aknutman.getuserlist(now(), now()).subscribe(resp => {
    this.aknutman.getuserlist("2020-12-01", Date.now()).subscribe(resp => {
      this.listdatauser = resp.persons;
      this.menuBarService.setLoadingAnimation(false);
    });
    //       });
    //     }
    //   });
  }
}
