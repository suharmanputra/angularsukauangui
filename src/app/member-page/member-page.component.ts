import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
@Component({
  selector: "app-member-page",
  templateUrl: "./member-page.component.html",
  styleUrls: ["./member-page.component.css"]
})
export class MemberPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
  }
}
