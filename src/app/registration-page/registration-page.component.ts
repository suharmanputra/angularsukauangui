import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.css"]
})
export class RegistrationPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(false);
  }
}
