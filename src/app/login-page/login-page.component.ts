import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenuBarService } from "../shared/menu-bar.service";

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
    private snackBar: MatSnackBar,
    private menuBarService: MenuBarService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);
    
  }

  checkLogin(username: string, password: string) {
    if (username == "test" && password == "test") {
      this.router.navigateByUrl("/dashboard");
    } else {
      this.openSnackBar();
    }
    // alert(username);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(LoginWarningSnackbarComponent, {
      duration: this.durationInSeconds * 1000
    });
  }
  redirect_register() {
    this.router.navigateByUrl("/registration");
  }
}

@Component({
  selector: "app-login-warning",
  templateUrl: "login-warning-snackbar.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginWarningSnackbarComponent {}
