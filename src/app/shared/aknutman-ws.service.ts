import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";

// export interface wsResponseType {
//   Status: string;
//   IsAuthenticated: boolean;
// }

@Injectable()
export class AknutmanWsService {
  constructor(private http: HttpClient) {}

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
}
