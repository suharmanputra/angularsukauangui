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
    const url = "https://us-central1-sb-sukauang.cloudfunctions.net/UserLogin";

    const body = `{"Username":"${username}", "Password":"${password}"}`;

    return this.http.post<wsResponseType>(url, body);
  }
}
