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

  update(
    userid: string,
    pass: string,
    alamat: string,
    nomorhp: string,
    nama: string,
    norek: string,
    namabank: string,
    namabankrek: string
  ) {
    if (userid == "") {
      this.snackBar.open("Userid tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (pass == "") {
      this.snackBar.open("Password tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (nama == "") {
      this.snackBar.open("nama tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (nomorhp == "") {
      this.snackBar.open("Nomor HP tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (alamat == "") {
      this.snackBar.open("Alamat tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (norek == "") {
      this.snackBar.open("Nomor Rekening tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (namabank == "") {
      this.snackBar.open("Nama Bank/E-wallet tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else if (namabankrek == "") {
      this.snackBar.open("Nama Rekening/E-wallet tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else {
      this.menuBarService.setLoadingAnimation(true);
      this.aknutman
        .updateuserdata(
          userid,
          pass,
          alamat,
          nomorhp,
          nama,
          norek,
          namabank,
          namabankrek
        )
        .subscribe(respupdate => {
          this.snackBar.open(respupdate.message, "Ok", {
            duration: 3000
          });
          this.menuBarService.setLoadingAnimation(false);
        });
    }
  }
}
