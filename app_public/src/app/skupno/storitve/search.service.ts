// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
//
// import { Subject, Observable, of } from 'rxjs';
// import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';
//
//
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
//
// @Injectable()
// export class SearchService {
//   baseUrl: string = 'http://localhost:8080/api';
//   queryUrl: string = '?search=';
//
//   constructor(private http: HttpClient) { }
//
//   search(terms: Observable<string>) {
//     return terms.debounceTime(400)
//       .distinctUntilChanged()
//       .switchMap(term => this.searchEntries(term));
//   }
//
//   searchEntries(term) {
//     return this.http
//       .get(this.baseUrl + this.queryUrl + term)
//       .map(res => res.json());
//   }
// }
