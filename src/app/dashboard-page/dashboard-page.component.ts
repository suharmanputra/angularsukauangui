import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { TermConditionDialogComponent } from "../term-condition-dialog/term-condition-dialog.component";
@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private menuBarService: MenuBarService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
      } else {
        
      }
      // console.log(localStorage.getItem("userID"));
    });
  }
  checkin() {
    alert("Check In berhasil");
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermConditionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
