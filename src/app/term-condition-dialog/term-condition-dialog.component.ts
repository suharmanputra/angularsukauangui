import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-term-condition-dialog",
  templateUrl: "./term-condition-dialog.component.html",
  styleUrls: ["./term-condition-dialog.component.css"]
})
export class TermConditionDialogComponent implements OnInit {
  activationnote: string;
  fileToUpload: File = null;
  constructor(
    private aknutman: AknutmanWsService,
    private menuBarService: MenuBarService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.menuBarService.setLoadingAnimation(true);
    this.getactivationnote();
    this.menuBarService.setLoadingAnimation(false);
  }
}
