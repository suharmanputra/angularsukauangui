import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MenuBarService } from "../shared/menu-bar.service";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { TermConditionDialogComponent } from "../term-condition-dialog/term-condition-dialog.component";
@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  username: string;
  referral: string;
  statusakun: string;
  masaaktif: string;
  level: string;
  jmlmember: string;
  bonus: string;
  total: string;
  checkinButtonVisible: boolean;
  witdhawButtonVisible: boolean;
  constructor(
    private menuBarService: MenuBarService,
    private aknutman: AknutmanWsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      } else {
        this.menuBarService.setLoadingAnimation(true);
        this.aknutman
          .getdetail(localStorage.getItem("userid"))
          .subscribe(resp => {
            // console.log(localStorage.getItem("userID"));
            // console.log(resp);

            if (resp.status == "200") {
              const formatter = new Intl.NumberFormat("in-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 2
              });

              this.username = localStorage.getItem("username");
              this.referral =
                "https://sukauang.com/#/registration?reff=" +
                resp.data.ReferralCode +
                "";
              if ((resp.data.IsActivated = "false")) {
                this.statusakun = "Belum Aktif";
                this.masaaktif = "0";
                this.checkinButtonVisible = false;
              } else {
                this.statusakun = "Aktif";
                this.masaaktif = resp.data.ActivatedDayCount;
                this.checkinButtonVisible = true;
              }
              this.level = resp.data.Level;
              this.jmlmember = resp.data.MemberCount;

              this.bonus = formatter.format(resp.data.PayableBonus);
              if (parseFloat(resp.data.PayableBonus) >= 20000) {
                this.witdhawButtonVisible = true;
              } else {
                this.witdhawButtonVisible = false;
              }
              this.total = formatter.format(resp.data.TotalBonus);
              this.menuBarService.setLoadingAnimation(false);
            }
          });
      }
    });
  }
  checkin() {
    alert("Check In berhasil");
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermConditionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
