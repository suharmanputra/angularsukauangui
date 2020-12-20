import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenuBarService } from "../shared/menu-bar.service";
import { AknutmanWsService } from "../shared/aknutman-ws.service";

export interface resplogin {
  Status: string;
  personId: string;
  isAuthenticated: boolean;
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
    // this.menuBarService.setUserIdName("", "");
    localStorage.setItem("userid", "");
    localStorage.setItem("username", "");
  }

  checkLogin(username: string, password: string) {
    // console.log(username, password);
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman.getLogin(username, password).subscribe(resplogin => {
      // console.log(resp);
      if (resplogin.isAuthenticated === true) {
        this.menuBarService.setIsAuthenticated(true);
        this.router.navigateByUrl("/dashboard");
        // this.menuBarService.setUserIdName(
        //   resplogin.personId,
        //   username.toLowerCase()
        // );
        localStorage.setItem("userid", resplogin.personId);
        localStorage.setItem("username", username.toLowerCase());
      } else {
        this.snackBar.open("Username/Password Salah!", "Ok", {
          duration: 3000
        });
        this.menuBarService.setLoadingAnimation(false);
      }
    });
  }
  redirect_register() {
    this.router.navigateByUrl("/registration");
  }
}
