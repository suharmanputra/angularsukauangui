import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { Router } from "@angular/router";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MatTableDataSource } from "@angular/material/table";

export interface listDownline {
  PersonID: string;
  FullName: string;
  ChildIndex: string;
}

@Component({
  selector: "app-member-page",
  templateUrl: "./member-page.component.html",
  styleUrls: ["./member-page.component.css"]
})
export class MemberPageComponent implements OnInit {
  member1: string = "";
  member2: string = "";
  member3: string = "";
  member4: string = "";
  member5: string = "";
  member6: string = "";
  member7: string = "";
  member8: string = "";
  member9: string = "";
  member10: string = "";
  member11: string = "";
  member12: string = "";
  member13: string = "";
  member14: string = "";
  member15: string = "";
  member16: string = "";
  member17: string = "";
  member18: string = "";
  member19: string = "";
  member20: string = "";
  member21: string = "";
  member22: string = "";
  member23: string = "";
  member24: string = "";
  member25: string = "";
  member26: string = "";
  member27: string = "";
  member28: string = "";
  member29: string = "";
  member30: string = "";
  member31: string = "";
  downlinedataSource: MatTableDataSource<listDownline>;

  constructor(
    private router: Router,
    private menuBarService: MenuBarService,
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

    this.getdownlinelist();
  }

  getdownlinelist() {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman
      .getuserdownline(atob(localStorage.getItem("userid")))
      .subscribe(respdownline => {
        if (respdownline.status == "200") {
          this.downlinedataSource = respdownline.data;
          this.member1 = atob(localStorage.getItem("username")).toUpperCase();
          var i;
          for (i = 0; i < respdownline.data.length; i++) {
            if (respdownline.data[i].ChildIndex == 1) {
              this.member2 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 2) {
              this.member3 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 3) {
              this.member4 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 4) {
              this.member5 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 5) {
              this.member6 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 6) {
              this.member7 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 7) {
              this.member8 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 8) {
              this.member9 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 9) {
              this.member10 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 10) {
              this.member11 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 11) {
              this.member12 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 12) {
              this.member13 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 13) {
              this.member14 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 14) {
              this.member15 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 15) {
              this.member16 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 16) {
              this.member17 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 17) {
              this.member18 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 18) {
              this.member19 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 19) {
              this.member20 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 20) {
              this.member21 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 21) {
              this.member22 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 22) {
              this.member23 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 23) {
              this.member24 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 24) {
              this.member25 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 25) {
              this.member26 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 26) {
              this.member27 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 27) {
              this.member28 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 28) {
              this.member29 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 29) {
              this.member30 = respdownline.data[i].FullName.toUpperCase();
            }
            if (respdownline.data[i].ChildIndex == 30) {
              this.member31 = respdownline.data[i].FullName.toUpperCase();
            }
          }
        }
        this.menuBarService.setLoadingAnimation(false);
      });
  }
}
