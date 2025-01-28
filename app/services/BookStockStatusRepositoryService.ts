import type { BookStockStatus } from "~/types";

export interface BookStockStatusRepositoryService {
  /**
   * Find all book stock status
   * @param name book stock status name
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllBookStockStatus(
    name?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<BookStockStatus[]>;
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

