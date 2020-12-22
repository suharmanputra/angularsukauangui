import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MenuBarService } from "../shared/menu-bar.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { Router } from "@angular/router";
import { ViewChild, TemplateRef } from "@angular/core";

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
  statusdialog: string;
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
    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      } else {
        this.getUserdetail();
      }
    });

    if (atob(localStorage.getItem("username")) == "superadmin") {
      this.menuBarService.setAdminVisible(true);
    } else {
      this.menuBarService.setAdminVisible(false);
    }
  }

  getUserdetail() {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman
      .getdetail(atob(localStorage.getItem("userid")))
      .subscribe(respdetailuser => {
        if (respdetailuser.status == "200") {
          this.username = atob(localStorage.getItem("username"));

          this.referral =
            "https://sukauang.com/#/registration?reff=" +
            respdetailuser.data.ReferralCode +
            "";
          if (respdetailuser.data.IsActivated === false) {
            this.referral = "";
            if (respdetailuser.data.PaymentProofStorage == "") {
              this.statusakun = "Belum Aktif";
              this.aktivasiButtonVisible = true;
              this.buktitrfButtonVisible = false;
              // this.statusdialog = "termconditiondialog";
            } else {
              this.statusakun = "Menunggu Konfirmasi";
              this.aktivasiButtonVisible = false;
              this.buktitrfButtonVisible = true;
              // this.statusdialog = "buktitransferdialog";
              this.buktitrffile = respdetailuser.data.PaymentProofStorage;
            }

            this.masaaktif = "0";
            this.checkinButtonVisible = false;
            this.getactivationnote(atob(localStorage.getItem("userid")));
          } else {
            this.referral =
              "https://sukauang.com/#/registration?reff=" +
              respdetailuser.data.ReferralCode +
              "";
            this.statusakun = "Aktif";
            this.masaaktif = respdetailuser.data.ActivatedDayCount;
            if (atob(localStorage.getItem("username")) == "superadmin") {
              this.checkinButtonVisible = false;
            } else {
              this.checkinButtonVisible = true;
            }
            this.aktivasiButtonVisible = false;
            this.buktitrfButtonVisible = false;
            // this.statusdialog = "";
          }
          // console.log(respdetailuser);
          this.level = respdetailuser.data.Level;
          this.jmlmember = respdetailuser.data.MemberCount;
          this.bonus = this.aknutman.formatmoney(
            respdetailuser.data.PayableBonus
          );
          if (parseFloat(respdetailuser.data.PayableBonus) >= 20000) {
            this.witdhawButtonVisible = true;
          } else {
            this.witdhawButtonVisible = false;
          }
          this.total = this.aknutman.formatmoney(
            respdetailuser.data.InAmountTotal
          );
          this.menuBarService.setLoadingAnimation(false);
        } else {
          this.menuBarService.setLoadingAnimation(false);
        }
      });
  }

  checkin() {
    this.menuBarService.setLoadingAnimation(true);

    this.aknutman
      .chekin(atob(localStorage.getItem("userid")))
      .subscribe(respcheckin => {
        if (respcheckin.status == 200) {
          this.snackBar.open("Check In Berhasil!", "Ok", {
            duration: 3000
          });
          this.getUserdetail();
          this.menuBarService.setLoadingAnimation(false);
        } else {
          this.snackBar.open(respcheckin.message, "Ok", {
            duration: 3000
          });
          this.menuBarService.setLoadingAnimation(false);
        }
      });
  }

  openDialogWithRef(ref: TemplateRef<any>) {
    // if (ref == "") {
    //   this.dialog.open(this.statusdialog);
    // } else {
    this.dialog.open(ref);
    // }
  }

  getactivationnote(userid: string) {
    this.aknutman.getactivationmessage(userid).subscribe(respactivationnote => {
      if (respactivationnote.status == "200") {
        this.activationnote = respactivationnote.data;
      }
    });
  }

  private setFile(event) {
    this.fileToUpload = event.target.files[0];
  }

  handleFileInput() {
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
          .uploadpaymentproof(
            atob(localStorage.getItem("userid")),
            String(reader.result)
          )
          .subscribe(respuploadpayment => {
            if (respuploadpayment.status == "200") {
              this.snackBar.open("Uplaod bukti tansfer berhasil!", "Ok", {
                duration: 3000
              });
              this.getUserdetail();
              this.menuBarService.setLoadingAnimation(false);
            } else {
              this.snackBar.open(respuploadpayment.result, "Ok", {
                duration: 3000
              });
              this.menuBarService.setLoadingAnimation(false);
            }
          });
      };
    }
  }
  requesttarikdana(amount: string) {
    this.menuBarService.setLoadingAnimation(true);

    this.aknutman
      .reqwitdraw(atob(localStorage.getItem("userid")), amount)
      .subscribe(respreqwitdraw => {
        // console.log(resp);
        if (respreqwitdraw.status == "200") {
          this.snackBar.open("Request penarikan dana berhasil", "Ok", {
            duration: 3000
          });
          this.getUserdetail();
          this.menuBarService.setLoadingAnimation(false);
        } else {
          this.snackBar.open(respreqwitdraw.message, "Ok", {
            duration: 3000
          });
          this.menuBarService.setLoadingAnimation(false);
        }
      });
  }

  redirect_transaksi() {
    this.router.navigateByUrl("/transaksi");
  }

  redirect_member() {
    this.router.navigateByUrl("/member");
  }
}
