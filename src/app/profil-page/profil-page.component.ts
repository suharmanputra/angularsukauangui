import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { Router } from "@angular/router";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-profil-page",
  templateUrl: "./profil-page.component.html",
  styleUrls: ["./profil-page.component.css"]
})
export class ProfilPageComponent implements OnInit {
  hide = true;
  constructor(
    private menuBarService: MenuBarService,
    private router: Router,
    private aknutman: AknutmanWsService,
    private snackBar: MatSnackBar
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
    this.getuserdata();
  }

  getuserdata() {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman;
    this.aknutman
      .getuserdata(atob(localStorage.getItem("userid")))
      .subscribe(respuserdata => {
        if (respuserdata.status === 200) {
          this.txtUserID = atob(localStorage.getItem("username"));
          this.txtPass = respuserdata.data.Password;
          this.txtNama = respuserdata.data.FullName;
          this.txtNoHP = respuserdata.data.WhatsAppNumber;
          this.txtAlamat = respuserdata.data.PostAddress;
          this.txtNorek = respuserdata.data.BankAccountNumber;
          this.txtNamaBank = respuserdata.data.BankName;
          this.txtNamaRek = respuserdata.data.BankAccountName;
        } else {
          this.snackBar.open(respuserdata.message, "Ok", {
            duration: 3000
          });
        }
      });
    this.menuBarService.setLoadingAnimation(false);
  }
}
