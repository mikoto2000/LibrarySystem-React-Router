import type { BookMaster } from "~/types";
import type { BookMasterList } from "~/views/types"

export interface BookMasterRepositoryService {
  /**
   * Find all book masters
   * @param isbn book isbn
   * @param name book name
   * @param publicationDateBegin publication date begin
   * @param publicationDateEnd publication date end
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllBookMaster(
    isbn?: string,
    name?: string,
    publicationDateBegin?: string,
    publicationDateEnd?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<BookMasterList>;
  findBookMasterById(id: number): Promise<BookMaster>;

  createBookMaster(bookMasters: {
    isbn: string,
    name: string,
    publicationDate: string,
    authorIds: number[],
  }[]): Promise<{ id: number, isbn: string, name: string, publicationDate: string }[]>;

  updateBookMaster(id: number, values: {
    isbn: string,
    name: string,
    publicationDate: string,
    authorIds: number[],
  }): void;

  deleteBookMaster(id: number): void;
}
