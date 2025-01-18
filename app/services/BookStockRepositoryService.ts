import type { BookStockWithoutAuthor } from "~/views/types";

export interface BookStockRepositoryService {
  findAllBookStock(): Promise<BookStockWithoutAuthor[]>;
  findBookStockById(id: number): Promise<BookStockWithoutAuthor>;
}
