import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  listdatauser: any[] = [];
  constructor(private aknutman: AknutmanWsService) {}

  ngOnInit() {
    this.aknutman
      .getuserlist(localStorage.getItem("username"))
      .subscribe(resp => {
        this.listdatauser = resp.persons;
        console.log(this.listdatauser);
      });
  }
}
