import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface transaction {
  SheetNumber: string;
  PreAmount: string;
  InAmount: string;
  FinalAmount: string;
  Source: string;
  CreatedDateTime: Date;
}

@Component({
  selector: "app-transaksi-page",
  templateUrl: "./transaksi-page.component.html",
  styleUrls: ["./transaksi-page.component.css"]
})
export class TransaksiPageComponent implements OnInit {
  displayedColumns: string[] = [
    "SheetNumber",
    "PreAmount",
    "InAmount",
    "FinalAmount",
    "Source",
    "CreatedDateTime"
  ];

  dataSource: MatTableDataSource<transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private aknutman: AknutmanWsService,
    private menuBarService: MenuBarService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);
    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
        this.menuBarService.setLoadingAnimation(false);
      }
      this.tampildata();
    });

    if (atob(localStorage.getItem("username")) == "superadmin") {
      this.menuBarService.setAdminVisible(true);
    } else {
      this.menuBarService.setAdminVisible(false);
    }
  }

  tampildata() {
    this.menuBarService.setLoadingAnimation(true);

    this.aknutman
      .gettransactionhistory(atob(localStorage.getItem("userid")))
      .subscribe(resptransactionhistory => {
        this.dataSource = new MatTableDataSource(resptransactionhistory.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.menuBarService.setLoadingAnimation(false);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
