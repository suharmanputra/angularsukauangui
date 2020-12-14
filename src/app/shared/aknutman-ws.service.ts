import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";

export interface wsResponseType {
  Status: string;
  IsAuthenticated: boolean;
}

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
    nama: string,
    pass: string,
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
      FullName: userid,
      Username: nama,
      Password: pass,
      WhatsAppNumber: nomorhp,
      PostAddress: alamat,
      BankAccountNumber: norek,
      BankName: namabank
    };
    return this.http.post<string>(url, body);
  }
}
