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
  getactivationnote() {
    this.aknutman
      .getactivationmessage(localStorage.getItem("userid"))
      .subscribe(resp => {
        if (resp.status == "200") {
          this.activationnote = resp.data;
        }
      });
  }
  handleFileInput(files: FileList) {
    this.menuBarService.setLoadingAnimation(true);
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      this.aknutman
        .uploadpaymentproof(
          localStorage.getItem("userid"),
          String(reader.result)
        )
        .subscribe(resp => {
          if (resp.status == "200") {
            this.snackBar.open("Uplaod bukti tansfer berhasil!", "Ok", {
              duration: 3000
            });
          } else {
            this.snackBar.open(resp.result, "Ok", {
              duration: 3000
            });
          }
        });
      this.menuBarService.setLoadingAnimation(false);
    };
  }
}
