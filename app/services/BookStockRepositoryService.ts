import type { BookStockWithoutAuthor } from "~/views/types";

export interface BookStockRepositoryService {
  /**
   * Find all book stocks
   * @param name author name
   * @param bookStockStatusId book stock status id
   * @param memo memo
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllBookStock(
    name?: string,
    bookStockStatusId?: number,
    memo?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<BookStockWithoutAuthor[]>;
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
