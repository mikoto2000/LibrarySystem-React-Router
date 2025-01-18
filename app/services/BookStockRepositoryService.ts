import type { BookStockWithoutAuthor } from "~/views/types";

export interface BookStockRepositoryService {
  findAllBookStock(): Promise<BookStockWithoutAuthor[]>;
  findBookStockById(id: number): Promise<BookStockWithoutAuthor>;

  createBookStock(bookStock: {
    bookMasterId: number,
    bookStockStatusId: number,
    memo?: string | null
  }[]): Promise<{ id: number }[]>;

  updateBookStock(id: number,
    bookStock: {
      bookMasterId: number,
      bookStockStatusId: number,
      memo?: string | null
    }): void;

  deleteBookStock(id: number): void;
}
