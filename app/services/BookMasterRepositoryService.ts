import type { BookMaster } from "~/types";
import type { BookMasterList } from "~/views/types"

export interface BookMasterRepositoryService {
  findAllBookMaster(): Promise<BookMasterList>;
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
