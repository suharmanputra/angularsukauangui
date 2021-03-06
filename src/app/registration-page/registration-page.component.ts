import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface wsResponseType {
  status: string;
  message: string;
  referall: string;
}

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.css"]
})
export class RegistrationPageComponent implements OnInit {
  hide = true;
  constructor(
    private menuBarService: MenuBarService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private aknutman: AknutmanWsService
  ) {}

  ngOnInit() {
    localStorage.setItem("userid", "");
    localStorage.setItem("username", "");
    this.menuBarService.setMenuVisible(false);
    this.route.queryParams.subscribe(params => {
      if (params["reff"] != null) {
        this.txtReff = params["reff"];
      } else {
        this.txtReff = "SUKAUANG";
      }
    });
  }
  regist(
    reff: string,
    userid: string,
    pass: string,
    nama: string,
    nomorhp: string,
    alamat: string,
    norek: string,
    namabank: string,
    namarek: string
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
    } else if (namarek == "") {
      this.snackBar.open("Nama Rekening/E-wallet tidak boleh kosong!", "Ok", {
        duration: 3000
      });
    } else {
      this.menuBarService.setLoadingAnimation(true);
      this.aknutman
        .regist(
          reff,
          userid,
          btoa(pass),
          nama,
          nomorhp,
          alamat,
          norek,
          namabank,
          namarek
        )
        .subscribe(respregistuser => {
          if (respregistuser.status == "201") {
            this.snackBar.open(
              "Registrasi berhasil, silahkan login dan aktivasi akun anda.",
              "Ok",
              {
                duration: 3000
              }
            );

            this.router.navigateByUrl("/login");
            // console.log(resp);
            this.menuBarService.setLoadingAnimation(false);
          } else {
            this.snackBar.open(respregistuser.message, "Ok", {
              duration: 3000
            });
            this.menuBarService.setLoadingAnimation(false);
          }
        });
    }
  }
}
