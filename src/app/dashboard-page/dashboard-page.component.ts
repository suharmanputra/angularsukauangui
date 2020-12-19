import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MenuBarService } from "../shared/menu-bar.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { ViewChild, TemplateRef } from "@angular/core";
import { duration } from "moment";
@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  @ViewChild("dialog") termconditiondialog: TemplateRef<any>;
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
  aktivasiButtonVisible: boolean;
  buktitrfButtonVisible: boolean;
  activationnote: string;
  fileToUpload: File = null;
  buktitrffile: string;
  constructor(
    private menuBarService: MenuBarService,
    private aknutman: AknutmanWsService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.g_username.subscribe(username => {
      if (username == "superadmin") {
        this.menuBarService.setAdminVisible(true);
      } else {
        this.menuBarService.setAdminVisible(false);
      }

      this.menuBarService.globalIsAuthenticated.subscribe(result => {
        if (result === false) {
          this.router.navigateByUrl("/");
        } else {
          this.getUserdetail();
        }
      });
    });
  }

  getUserdetail() {
    this.menuBarService.setLoadingAnimation(true);

    this.menuBarService.g_userid.subscribe(userid => {
      this.aknutman.getdetail(userid).subscribe(resp => {
        this.menuBarService.g_username.subscribe(username => {
          if (resp.status == "200") {
            this.username = username;
            this.referral =
              "https://sukauang.com/#/registration?reff=" +
              resp.data.ReferralCode +
              "";

            // if (username == "superadmin") {
            //   this.statusakun = "Aktif";
            //   this.masaaktif = "999";
            //   this.checkinButtonVisible = false;
            //   this.buktitrfButtonVisible = false;
            //   this.aktivasiButtonVisible = false;
            // } else {
            if (resp.data.IsActivated === false) {
              if (resp.data.PaymentProofStorage == "") {
                this.statusakun = "Belum Aktif";
                this.aktivasiButtonVisible = true;
                this.buktitrfButtonVisible = false;
              } else {
                this.statusakun = "Menunggu Konfirmasi Admin";
                this.aktivasiButtonVisible = false;
                this.buktitrfButtonVisible = true;
                this.buktitrffile =
                  `<a target="_blank"
									href="` +
                  resp.data.PaymentProofStorage +
                  `"><img style="display:inline-block;width:50px;height:50px;" src="` +
                  resp.data.PaymentProofStorage +
                  `"></a>`;
              }
              this.masaaktif = "0";
              this.checkinButtonVisible = false;
              this.getactivationnote(userid);
            } else {
              this.statusakun = "Aktif";
              this.masaaktif = resp.data.ActivatedDayCount;
              if (username == "superadmin") {
                this.checkinButtonVisible = false;
              } else {
                this.checkinButtonVisible = true;
              }

              this.buktitrfButtonVisible = false;
              this.aktivasiButtonVisible = false;
            }
            // }

            this.level = resp.data.Level;
            this.jmlmember = resp.data.MemberCount;
            this.bonus = this.aknutman.formatmoney(resp.data.PayableBonus);
            if (parseFloat(resp.data.PayableBonus) >= 20000) {
              this.witdhawButtonVisible = true;
            } else {
              this.witdhawButtonVisible = false;
            }
            this.total = this.aknutman.formatmoney(resp.data.InAmountTotal);
            // console.log(resp);
            this.menuBarService.setLoadingAnimation(false);
          } else {
            // this.router.navigateByUrl("/");
            // this.snackBar.open(resp.message, "Ok", { duration: 3000 });
            this.menuBarService.setLoadingAnimation(false);
          }
        });
      });
    });
  }

  checkin() {
    alert("Check In berhasil");
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  getactivationnote(userid: string) {
    this.aknutman.getactivationmessage(userid).subscribe(resp => {
      if (resp.status == "200") {
        this.activationnote = resp.data;
      }
    });
  }

  private setFile(event) {
    this.fileToUpload = event.target.files[0];
  }
  handleFileInput() {
    this.menuBarService.g_userid.subscribe(userid => {
      this.menuBarService.setLoadingAnimation(true);
      if (this.fileToUpload === null) {
        this.menuBarService.setLoadingAnimation(false);
        this.snackBar.open("No File to upload", "Ok", {
          duration: 3000
        });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
          this.aknutman
            .uploadpaymentproof(userid, String(reader.result))
            .subscribe(resp => {
              if (resp.status == "200") {
                this.snackBar.open("Uplaod bukti tansfer berhasil!", "Ok", {
                  duration: 3000
                });
                this.getUserdetail();
                this.menuBarService.setLoadingAnimation(false);
              } else {
                this.snackBar.open(resp.result, "Ok", {
                  duration: 3000
                });
                this.menuBarService.setLoadingAnimation(false);
              }
            });
        };
      }
    });
  }
  requesttarikdana(amount: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.menuBarService.g_userid.subscribe(userid => {
      this.aknutman.reqwitdraw(userid, amount).subscribe(resp => {
        // console.log(resp);
        if (resp.status == "200") {
          this.snackBar.open("Request penarikan dana berhasil", "Ok", {
            duration: 3000
          });
          this.getUserdetail();
          this.menuBarService.setLoadingAnimation(false);
        } else {
          this.snackBar.open(resp.message, "Ok", {
            duration: 3000
          });
          this.menuBarService.setLoadingAnimation(false);
        }
      });
    });
  }
}
