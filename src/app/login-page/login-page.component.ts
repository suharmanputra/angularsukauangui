import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenuBarService } from "../shared/menu-bar.service";
import { AknutmanWsService } from "../shared/aknutman-ws.service";

export interface wsResponseType {
  Status: string;
  IsAuthenticated: boolean;
}

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
    private menuBarService: MenuBarService,
    private aknutman: AknutmanWsService
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);

    this.menuBarService.setIsAuthenticated(false);
  }

  checkLogin(username: string, password: string) {
    if (username == "test" && password == "test") {
      this.router.navigateByUrl("/dashboard");
      this.menuBarService.setIsAuthenticated(true);
    } else {
      this.openSnackBar();
    }
    // this.aknutman.getLogin(username, password).subscribe(resp => {
    //   if (resp.IsAuthenticated === true) {
    //     this.router.navigateByUrl("/dashboard");
    //     this.menuBarService.setIsAuthenticated(true);
    //   } else {
    //     this.openSnackBar();
    //   }
    // });
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
