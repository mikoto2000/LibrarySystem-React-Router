import type { BookStockStatus } from "~/types";

export interface BookStockStatusRepositoryService {
  findAllBookStockStatus(): Promise<BookStockStatus[]>;
  findBookStockStatusById(id: number): Promise<BookStockStatus>;

  createBookStockStatus(bookStock: {
    name: string
  }[]): Promise<{ id: number, name: string }[]>;

  updateBookStockStatus(id: number,
    bookStock: {
      name: string
    }): void;

  deleteBookStockStatus(id: number): void;
}

