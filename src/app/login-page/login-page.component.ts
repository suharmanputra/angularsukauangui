import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  hide = true;

  constructor(private actRouter: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
  redirect_register() {
    this.router.navigateByUrl("/registration");
  }
}
