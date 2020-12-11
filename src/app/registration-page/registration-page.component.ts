import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.css"]
})
export class RegistrationPageComponent implements OnInit {
  constructor(
    private menuBarService: MenuBarService,
    private router: Router,
    private route: ActivatedRoute // private refftext: string
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
  regis() {}
}
