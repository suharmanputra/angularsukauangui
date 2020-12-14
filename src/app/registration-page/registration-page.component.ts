import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { FormsModule } from "@angular/forms";
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
  constructor(
    private menuBarService: MenuBarService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private aknutman: AknutmanWsService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);
    this.route.queryParams.subscribe(params => {
      if (params["reff"] != null) {
        console.log(params["reff"]);
        this.txtReff = params["reff"];
      } else {
        this.txtReff = "SUKAUANG";
      }
    });
  }
  regist(
    reff: string,
    userid: string,
    nama: string,
    pass: string,
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
      this.aknutman
        .regist(
          reff,
          userid,
          nama,
          pass,
          nomorhp,
          alamat,
          norek,
          namabank,
          namarek
        )
        .subscribe(resp => {
          if (resp.status == "201") {
            this.snackBar.open(
              "Registrasi berhasil, silahkan login dan aktivasi akun anda.",
              "Ok",
              {
                duration: 3000
              }
            );
            //   this.router.navigateByUrl("/dashboard");
            //   this.menuBarService.setIsAuthenticated(true);
            // } else {
            //   this.openSnackBar();
          }
          console.log(resp);
        });
    }
  }
}
