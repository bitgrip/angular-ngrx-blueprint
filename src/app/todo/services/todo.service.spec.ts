import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockTodoService, TodoService } from './todo.service';
import { environment } from '../../../environments/environment';


describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<ITodo[]>', () => {
    service.getTodos().subscribe(data => {
      expect(data).toEqual(MockTodoService.TODOS_MOCKDATA.todos);
    });

    /* tslint:disable-next-line */
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === environment.apiTodoData);

    req.flush(MockTodoService.TODOS_MOCKDATA);

    httpMock.verify();
  });
});
