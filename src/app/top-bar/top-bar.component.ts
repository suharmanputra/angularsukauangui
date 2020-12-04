import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  constructor(private actRouter: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
  redirect_home() {
    this.router.navigateByUrl("/dashboard");
  }
  redirect_profil() {
    this.router.navigateByUrl("/profil");
  }
  redirect_member() {
    this.router.navigateByUrl("/member");
  }
  logout() {
    this.router.navigateByUrl("/login");
  }
}
