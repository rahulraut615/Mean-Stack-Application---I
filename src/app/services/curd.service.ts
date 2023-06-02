import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, catchError, throwError, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CurdService {
  url: string = "http://localhost:8000/api";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application-json')
  constructor(private http: HttpClient) { }

  addBook(data: Book): Observable<any> {
    let Api_Url = `${this.url}/add-book`;
    return this.http.post(Api_Url, data).pipe(catchError(this.handleError))
  }

  getAllBook() {
    return this.http.get(`${this.url}`);
  }

  getBook(id: any): Observable<any> {
    console.log(id);
    let Api_Url = `${this.url}/read-book/${id}`
    return this.http.get<any>(Api_Url, { headers: this.httpHeaders }).pipe(map((res: any) => {
      console.log(res);
      return res;
    }),
      catchError(this.handleError)
    )
  }

  updateBook(id: any, data: any): Observable<any> {
    console.log(data+"  upd")
    let Api_url = `${this.url}/update-book/${id}`
    return this.http.put(Api_url, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  deleteBok(id: any): Observable<any> {
    let Api_url = `${this.url}/delete-book/${id}`
    console.log("delete" + id);

    return this.http.delete(Api_url, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  //Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Handle Client side error
      errorMessage = error.error.message;
    } else {
      // handle Server side error
      errorMessage = `Error code ${error.status}\n Message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
