import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";

@Component({
  selector: "app-term-condition-dialog",
  templateUrl: "./term-condition-dialog.component.html",
  styleUrls: ["./term-condition-dialog.component.css"]
})
export class TermConditionDialogComponent implements OnInit {
  activationnote: string;

  constructor(private aknutman: AknutmanWsService) {}

  ngOnInit() {
    this.getactivationnote();
    console.log("loaded");
  }
  getactivationnote() {
    this.aknutman
      .getactivationmessage(localStorage.getItem("userid"))
      .subscribe(resp => {
        if (resp.status == "200") {
          this.activationnote = resp.data;
        }
      });
  }
}
