import { AknutmanWsService } from "../shared/aknutman-ws.service";
import { MenuBarService } from "../shared/menu-bar.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, ViewChild, TemplateRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

export interface UserData {
  FullName: string;
  IsActive: string;
  WaitForActivation: string;
  WithdrawalRequestId: string;
  PersonId: string;
}

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  @ViewChild("dialog") termconditiondialog: TemplateRef<any>;
  SelectedUserId: string;
  FullName: string;
  BankName: string;
  BankAccountNumber: string;
  BankAccountName: string;
  WithdrawRequestAmount: string;

  displayedColumns: string[] = [
    "FullName",
    "IsActive",
    "WaitForActivation",
    "WithdrawalRequestId",
    "PersonId"
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private aknutman: AknutmanWsService,
    private menuBarService: MenuBarService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuBarService.setMenuVisible(true);

    this.menuBarService.globalIsAuthenticated.subscribe(result => {
      if (result === false) {
        this.router.navigateByUrl("/");
        this.menuBarService.setLoadingAnimation(false);
      } else {
        if (atob(localStorage.getItem("username")) !== "superadmin") {
          this.router.navigateByUrl("/");
        }
      }
    });

    if (atob(localStorage.getItem("username")) == "superadmin") {
      this.menuBarService.setAdminVisible(true);
    } else {
      this.menuBarService.setAdminVisible(false);
    }
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
        .getuserlist(
          this.aknutman.formatDate(datefrom),
          this.aknutman.formatDate(dateto),
          ""
        )
        .subscribe(respuserlist => {
          this.dataSource = new MatTableDataSource(respuserlist.persons);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.menuBarService.setLoadingAnimation(false);
        });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aktivasiuser(datefrom: string, dateto: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman
      .aktivasiuser(
        this.SelectedUserId,
        false,
        this.aknutman.formatDate(new Date().toString())
      )
      .subscribe(respaktivasiuser => {
        if (respaktivasiuser.status == 200) {
          this.snackBar.open("Aktivasi Berhasil!", "Ok", {
            duration: 3000
          });
          this.tampildata(datefrom, dateto);
          this.menuBarService.setLoadingAnimation(false);
        } else {
          this.snackBar.open(respaktivasiuser.message, "Ok", {
            duration: 3000
          });
          this.menuBarService.setLoadingAnimation(false);
        }
      });
  }

  confirtarikdana(datefrom: string, dateto: string) {
    this.menuBarService.setLoadingAnimation(true);
    this.aknutman
      .getuserlist(datefrom, dateto, this.SelectedUserId)
      .subscribe(dataperson => {
        this.aknutman
          .confirmwithdraw(dataperson.persons[0].WithdrawalRequestId)
          .subscribe(respconfirtarikdana => {
            if (respconfirtarikdana.status == 200) {
              this.snackBar.open("Tarik Dana dikonfirmasi!", "Ok", {
                duration: 3000
              });
              this.tampildata(datefrom, dateto);
              this.menuBarService.setLoadingAnimation(false);
            } else {
              this.snackBar.open(respconfirtarikdana.message, "Ok", {
                duration: 3000
              });
              this.menuBarService.setLoadingAnimation(false);
            }
          });
      });
  }

  openDialogWithRef(ref: TemplateRef<any>, userid: string) {
    this.SelectedUserId = userid;

    this.aknutman
      .getuserlist("", "", this.SelectedUserId)
      .subscribe(datapersondetail => {
        // datapersondetail.persons[0].WithdrawalRequestId
        this.FullName = datapersondetail.persons[0].FullName.toUpperCase();
        this.BankAccountNumber = datapersondetail.persons[0].BankAccountNumber;
        this.BankName = datapersondetail.persons[0].BankName.toUpperCase();
        this.BankAccountName = datapersondetail.persons[0].BankAccountName.toUpperCase();
        this.WithdrawRequestAmount = this.aknutman.formatmoney(
          datapersondetail.persons[0].WithdrawRequestAmount.toString()
        );
      });

    this.dialog.open(ref);
  }
}
