import { Component, OnInit } from "@angular/core";

declare let $: any;
@Component({
  selector: "app-admin-page2",
  templateUrl: "./admin-page2.component.html",
  styleUrls: ["./admin-page2.component.css"]
})
export class AdminPage2Component implements OnInit {
  constructor() {}

  ngOnInit() {
    let table = $("#example").DataTable({
      drawCallback: () => {
        $(".paginate_button.next").on("click", () => {
          this.nextButtonClickEvent();
        });
      }
    });
    // console.log("test");
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log("Button in the row clicked.");
  }

  wholeRowClick(): void {
    console.log("Whole row clicked.");
  }

  nextButtonClickEvent(): void {
    console.log("next clicked");
  }
  previousButtonClickEvent(): void {}
}
