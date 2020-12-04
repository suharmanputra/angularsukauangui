import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  hide = true;
  durationInSeconds = 5;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  openSnackBar() {
    this.snackBar.openFromComponent(loginWarningSnackbarComponent, {
      duration: this.durationInSeconds * 1000
    });
  }
  redirect_register() {
    this.router.navigateByUrl("/registration");
  }
}
export class loginWarningSnackbarComponent {}
