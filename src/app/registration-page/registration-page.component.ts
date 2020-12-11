import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.css"]
})
export class RegistrationPageComponent implements OnInit {
  constructor(
    private menuBarService: MenuBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);

    //debug mode
    // this.menuBarService.setIsAuthenticated(false);

    // const urlParams = new URLSearchParams(window.location.search);
    // const referalCode = urlParams.get("reff");
    this.route.queryParams.subscribe(params => {
      if (params["reff"] != null) {
        // this.txtReferal = referalCode;
        console.log(params["reff"]);
      } else {
        // this.txtReferal = "SUKAUANG";
        console.log("SUKAUANG");
      }
    });

    // console.log(referalCode);
  }
}
