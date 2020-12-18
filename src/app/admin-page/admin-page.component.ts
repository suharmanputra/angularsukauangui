import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
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
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
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
    //     });
    //   }
    // });
  }
  tampildata(datefrom: string, dateto: string) {
    if (datefrom == "") {
      this.snackBar.open("Pilih tanggal awal terlebih dahulu!", "Ok", {
        duration: 3000
      });
    } else if (dateto == "") {
      this.snackBar.open("Pilih tanggal akhir terlebih dahulu!", "Ok", {
        duration: 3000
      });
    } else {
      this.menuBarService.setLoadingAnimation(true);
      this.aknutman
        .getuserlist(this.formatDate(datefrom), this.formatDate(dateto))
        .subscribe(resp => {
          this.listdatauser = resp.persons;
          this.menuBarService.setLoadingAnimation(false);
        });
    }

    // console.log(this.formatDate(datefrom), this.formatDate(dateto));
  }

  formatDate(date: string) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}
