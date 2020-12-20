import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";

// export interface wsResponseType {
//   Status: string;
//   IsAuthenticated: boolean;
// }

@Injectable()
export class AknutmanWsService {
  constructor(private http: HttpClient) {}

  formatDate(date: string) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  formatmoney(money: number) {
    const formatter = new Intl.NumberFormat("in-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });
    return [formatter.format(money)];
  }

  getLogin(username: string, password: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/UserLogin";
    const body = {
      Username: username,
      Password: password
    };
    return this.http.post<string>(url, body);
  }

  regist(
    reff: string,
    userid: string,
    pass: string,
    nama: string,
    nomorhp: string,
    alamat: string,
    norek: string,
    namabank: string,
    namarek: string
  ) {
    if (reff === "") {
      reff = "SUKAUANG";
    }
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/Register";
    const body = {
      SponsorCode: reff,
      Username: userid,
      Password: pass,
      FullName: nama,
      WhatsAppNumber: nomorhp,
      PostAddress: alamat,
      BankAccountNumber: norek,
      BankName: namabank,
      BankAccountName: namarek
    };
    return this.http.post<string>(url, body);
  }

  getdetail(userid: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/UserDetail";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }

  getactivationmessage(userid: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/UserGetActivationMessage";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }

  uploadpaymentproof(userid: string, base64img: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/UserUploadPaymentProof";
    const body = {
      PersonId: userid,
      ImageExtension: base64img.split(";")[0].split("/")[1],
      ImageDataUrl: base64img.split(",")[1]
    };
    return this.http.post<string>(url, body);
  }

  getuserlist(from: string, to: string, userid: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/AdminGetUserList";
    const body = { PersonId: userid, FromDate: from, ToDate: to };
    return this.http.post<string>(url, body);
  }

  gettransactionhistory(userid: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/GetUserTransaction";
    const body = { PersonId: userid };
    return this.http.post<string>(url, body);
  }

  aktivasiuser(userid: string, isreactivated: boolean, activationdate: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/ActivateUser";
    const body = {
      PersonId: userid,
      IsReActivate: isreactivated,
      ActivationDateTime: activationdate
    };
    return this.http.post<string>(url, body);
  }

  reqwitdraw(userid: string, amount: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/RequestToWithdraw";
    const body = { PersonId: userid, WithdrawAmount: amount };
    return this.http.post<string>(url, body);
  }

  chekin(userid: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/UserCheckIn";
    const body = {
      PersonId: userid,
      CheckInDateTime: new Date().toLocaleString(),
      Latitude: 0,
      Longitude: 0,
      Accuracy: 0
    };
    return this.http.post<string>(url, body);
  }

  confirmwithdraw(Idtarikdana: string) {
    const url =
      "https://us-central1-sukauang-backend.cloudfunctions.net/ConfirmWithdrawTransfer";
    const body = {
      RequestId: Idtarikdana,
      RefferenceId: "",
      ImageExtension: "",
      ImageDataUrl: ""
    };
    return this.http.post<string>(url, body);
  }
}
