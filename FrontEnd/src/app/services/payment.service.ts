import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  baseURL: string = "http://127.0.0.1:3000/";

  makePayment(paymentData): Observable<any> {
    const headers = { "content-type": "application/json" };
    // return this.http.post(
    //   this.baseURL + "makePayment",
    //   JSON.stringify(paymentData),
    //   { headers }
    // );
    return of(
      new HttpResponse({
        status: 200,
        body: { status: "success" },
      })
    );
  }
}
