import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';

class Todo {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean
  ) {}
}

@injectable()
class TodoRepository {
  findAll(): Todo[] {
    return [
      new Todo(1, 'learn inversifyjs', true),
      new Todo(2, 'learn di', false),
    ];
  }
  findOne(id: number): Todo | undefined {
    return this.findAll().find(x => x.id === id);
  }
}

@injectable()
class TodoService {
  @inject('TodoRepository')
  private todoRepository!: TodoRepository;

  findOne(id: number) {
    return this.todoRepository.findOne(id);
  }
}

type Result<T> = { status: 0 | 1; data?: T };

@injectable()
class TodoController {
  @inject('TodoService')
  private todoService!: TodoService;

  fetchTodo(id: number) {
    const todo = this.todoService.findOne(id);

    return JSON.stringify({ status: todo ? 0 : 1, data: todo });
  }
}

const container = new Container();

container.bind<TodoRepository>('TodoRepository').to(TodoRepository);
container.bind<TodoService>('TodoService').to(TodoService);
container.bind<TodoController>('TodoController').to(TodoController);

describe('property injection', () => {
  it('works', () => {
    const controller = container.get<TodoController>('TodoController');
    const t1: Result<Todo> = JSON.parse(controller.fetchTodo(1));
    const t2: Result<Todo> = JSON.parse(controller.fetchTodo(10));

    expect([t1.status, t1.data?.title]).toEqual([0, 'learn inversifyjs']);
    expect([t2.status, t2.data]).toEqual([1, undefined]);
  });
});
