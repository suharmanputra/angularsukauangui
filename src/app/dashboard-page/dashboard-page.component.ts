import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
  }
  checkin() {
    alert("Check In berhasil");
  }
}
