import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface UserData {
  FullName: string;
  IsActive: string;
  WaitForActivation: string;
  WithdrawalRequest: string;
}

@Component({
  selector: "app-transaksi-page",
  templateUrl: "./transaksi-page.component.html",
  styleUrls: ["./transaksi-page.component.css"]
})
export class TransaksiPageComponent implements OnInit {
  displayedColumns: string[] = [
    "FullName",
    "IsActive",
    "WaitForActivation",
    "WithdrawalRequest"
  ];

  dataSource: MatTableDataSource<UserData>;

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
      } else {
        this.menuBarService.g_username.subscribe(username => {
          if (username !== "superadmin") {
            this.router.navigateByUrl("/");
          }
        });
      }
    });
  }

  tampildata(datefrom: string, dateto: string) {
    if (datefrom == "") {
      this.snackBar.open("Pilih tanggal awal terlebih dahulu!", "Ok", {
        duration: 3000
      });
    } else if (dateto == "") {
      this.snackBar.open("Pilih tanggal akhir terlebih dahulu!", "Ok", {
        duration: 3000
      });
    } else {
      this.menuBarService.setLoadingAnimation(true);
      this.aknutman
        .getuserlist(this.formatDate(datefrom), this.formatDate(dateto))
        .subscribe(resp => {
          this.dataSource = new MatTableDataSource(resp.persons);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.menuBarService.setLoadingAnimation(false);
        });
    }
  }

  formatDate(date: string) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
