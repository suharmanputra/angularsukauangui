import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
@Component({
  selector: "app-about-page",
  templateUrl: "./about-page.component.html",
  styleUrls: ["./about-page.component.css"]
})
export class AboutPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
  }
}
