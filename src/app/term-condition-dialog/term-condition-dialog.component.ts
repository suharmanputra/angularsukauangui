import { Component, OnInit } from "@angular/core";
import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
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
    private menuBarService: MenuBarService
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
      console.log(
        String(reader.result)
          .split(";")[0]
          .split("/")[1]
      );
      console.log(String(reader.result).split(",")[1]);
      this.menuBarService.setLoadingAnimation(false);
    };
  }
}
