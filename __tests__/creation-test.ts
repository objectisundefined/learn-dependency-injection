import { Container, injectable } from 'inversify';
import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';

// @lazyInject for the injection of a property without metadata
// @lazyInjectNamed for the injection of a property without named metadata.
// @lazyInjectTagged for the injection of a property without tagged metadata.
// @lazyMultiInject for multi-injections.

@injectable()
class PrintService {
  print(book: Book) {
    return `Book { author = "${book.getAuthor()}", summary = "${book.getSummary()}" }`;
  }
}

let container = new Container();
container.bind<PrintService>('PrintService').to(PrintService);
let { lazyInject } = getDecorators(container);

class Book {
  private _author: string;
  private _summary: string;

  @lazyInject('PrintService')
  private _printService!: PrintService;

  public constructor(author: string, summary: string) {
    this._author = author;
    this._summary = summary;
  }

  getAuthor() {
    return this._author;
  }

  getSummary() {
    return this._summary;
  }

  public print() {
    return this._printService.print(this);
  }
}

describe('custom creation', () => {
  it('works', () => {
    // Book instance is NOT created by InversifyJS
    const book = new Book('Ben James', 'Summary');
    expect(book.print()).toEqual(
      'Book { author = "Ben James", summary = "Summary" }'
    );
  });
});
