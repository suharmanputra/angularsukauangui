import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AknutmanWsService } from "../shared/aknutman-ws.service";

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
    namarek: string,
    namabank: string
  ) {
    this.aknutman
      .regist(
        reff,
        userid,
        nama,
        pass,
        nomorhp,
        alamat,
        norek,
        namarek,
        namabank
      )
      .subscribe(resp => {
        // if (resp.isAuthenticated === true) {
        //   this.router.navigateByUrl("/dashboard");
        //   this.menuBarService.setIsAuthenticated(true);
        // } else {
        //   this.openSnackBar();
        // }
        console.log(resp);
      });
  }
}
