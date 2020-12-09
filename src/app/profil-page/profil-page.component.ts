import { Component, OnInit } from "@angular/core";
import { MenuBarService } from "../shared/menu-bar.service";
@Component({
  selector: "app-profil-page",
  templateUrl: "./profil-page.component.html",
  styleUrls: ["./profil-page.component.css"]
})
export class ProfilPageComponent implements OnInit {
  constructor(private menuBarService: MenuBarService) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
  }
}
