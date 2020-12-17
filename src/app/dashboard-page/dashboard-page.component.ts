import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MenuBarService } from "../shared/menu-bar.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { TermConditionDialogComponent } from "../term-condition-dialog/term-condition-dialog.component";
import { ViewChild, TemplateRef } from "@angular/core";
@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  @ViewChild("termconditiondialog") termconditiondialog: TemplateRef<any>;
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
  activationnote: string;
  fileToUpload: File = null;
  constructor(
    private menuBarService: MenuBarService,
    private aknutman: AknutmanWsService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      } else {
        this.menuBarService.setLoadingAnimation(true);
        this.getactivationnote();
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

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  getactivationnote() {
    this.aknutman
      .getactivationmessage(localStorage.getItem("userid"))
      .subscribe(resp => {
        if (resp.status == "200") {
          this.activationnote = resp.data;
        }
      });
  }

  handleFileInput(files: FileList) {
    this.menuBarService.setLoadingAnimation(true);
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.aknutman
        .uploadpaymentproof(
          localStorage.getItem("userid"),
          String(reader.result)
        )
        .subscribe(resp => {
          if (resp.status == "200") {
            this.snackBar.open("Uplaod bukti tansfer berhasil!", "Ok", {
              duration: 3000
            });
          } else {
            this.snackBar.open(resp.result, "Ok", {
              duration: 3000
            });
          }
        });
      this.menuBarService.setLoadingAnimation(false);
    };
  }
}
