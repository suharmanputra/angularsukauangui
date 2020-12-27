import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";

@Injectable()
export class AknutmanWsService {
  constructor(private http: HttpClient) {}

  // serviceURL = "https://asia-southeast2-sukauang-9b36c.cloudfunctions.net";
  serviceURL = "https://asia-southeast2-sukauang-backend.cloudfunctions.net";

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
    const url = this.serviceURL + "/UserLogin";
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
    const url = this.serviceURL + "/Register";
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
    const url = this.serviceURL + "/UserDetail";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }

  getactivationmessage(userid: string, isnext: boolean) {
    const url = this.serviceURL + "/UserGetActivationMessage";
    const body = {
      PersonId: userid,
      IsNext: isnext
    };
    return this.http.post<string>(url, body);
  }

  uploadpaymentproof(userid: string, base64img: string) {
    const url = this.serviceURL + "/UserUploadPaymentProof";
    const body = {
      PersonId: userid,
      ImageExtension: base64img.split(";")[0].split("/")[1],
      ImageDataUrl: base64img.split(",")[1]
    };
    return this.http.post<string>(url, body);
  }

  getuserlist(from: string, to: string, userid: string) {
    const url = this.serviceURL + "/AdminGetUserList";
    const body = { PersonId: userid, FromDate: from, ToDate: to };
    return this.http.post<string>(url, body);
  }

  gettransactionhistory(userid: string) {
    const url = this.serviceURL + "/GetUserTransaction";
    const body = { PersonId: userid };
    return this.http.post<string>(url, body);
  }

  aktivasiuser(userid: string, isreactivated: boolean, activationdate: string) {
    const url = this.serviceURL + "/ActivateUser";
    const body = {
      PersonId: userid,
      IsReActivate: isreactivated,
      ActivationDateTime: activationdate
    };
    return this.http.post<string>(url, body);
  }

  reqwitdraw(userid: string, amount: string) {
    const url = this.serviceURL + "/RequestToWithdraw";
    const body = { PersonId: userid, WithdrawAmount: amount };
    return this.http.post<string>(url, body);
  }

  chekin(userid: string) {
    const d = new Date();
    const ye = new Intl.DateTimeFormat("id", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("id", { month: "2-digit" }).format(d);
    const da = new Intl.DateTimeFormat("id", { day: "2-digit" }).format(d);
    const myDt = `${ye}-${mo}-${da} ${d.toTimeString().substring(0, 8)}`;

    const url = this.serviceURL + "/UserCheckIn";
    const body = {
      PersonId: userid,
      CheckInDateTime: myDt,
      Latitude: 0,
      Longitude: 0,
      Accuracy: 0
    };
    return this.http.post<string>(url, body);
  }

  confirmwithdraw(Idtarikdana: string) {
    const url = this.serviceURL + "/ConfirmWithdrawTransfer";
    const body = {
      RequestId: Idtarikdana,
      RefferenceId: "",
      ImageExtension: "",
      ImageDataUrl: ""
    };
    return this.http.post<string>(url, body);
  }

  getuserdownline(userid: string) {
    const url = this.serviceURL + "/UserGetDownline";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }

  getuserdata(userid: string) {
    const url = this.serviceURL + "/UserGetBasicInfo";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }

  updateuserdata(
    userid: string,
    pass: string,
    alamat: string,
    nomorhp: string,
    nama: string,
    norek: string,
    namabank: string,
    namabankrek: string
  ) {
    const url = this.serviceURL + "/UserUpdateProfile";
    const body = {
      PersonId: userid,
      Password: pass,
      PostAddress: alamat,
      WhatsAppNumber: nomorhp,
      FullName: nama,
      BankAccountNumber: norek,
      BankName: namabank,
      BankAccountName: namabankrek
    };

    return this.http.post<string>(url, body);
  }

  getAbout(userid: string) {
    const url = this.serviceURL + "/UserGetAbout";
    const body = {
      PersonId: userid
    };
    return this.http.post<string>(url, body);
  }
}
