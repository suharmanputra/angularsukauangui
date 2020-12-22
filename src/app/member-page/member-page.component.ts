import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-member-page",
  templateUrl: "./member-page.component.html",
  styleUrls: ["./member-page.component.css"]
})
export class MemberPageComponent implements OnInit {
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  member6: string;
  member7: string;
  member8: string;
  member9: string;
  member10: string;
  member11: string;
  member12: string;
  member13: string;
  member14: string;
  member15: string;
  member16: string;
  member17: string;
  member18: string;
  member19: string;
  member20: string;
  member21: string;
  member22: string;
  member23: string;
  member24: string;
  member25: string;
  member26: string;
  member27: string;
  member28: string;
  member29: string;
  member30: string;
  member31: string;

  constructor(private menuBarService: MenuBarService, private router: Router) {}

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
  }
}
