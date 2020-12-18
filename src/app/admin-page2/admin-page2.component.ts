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
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log("Button in the row clicked.");
  }

  wholeRowClick(): void {
    console.log("Whole row clicked.");
  }

  nextButtonClickEvent(): void {
    //do next particular records like  101 - 200 rows.
    //we are calling to api

    console.log("next clicked");
  }
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }
}
