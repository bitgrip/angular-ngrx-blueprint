import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITodo } from '../models/todo';
import { environment } from '../../../environments/environment';



export interface IGetTodoDto {
  lang: string;
  todos: ITodo[];
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = environment.apiTodoData;

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<ITodo[]> {
    const params = new HttpParams().set('lang', 'en');

    return this.http.get<IGetTodoDto>(this.url, {params}).pipe(map(data => data.todos));
  }
}
