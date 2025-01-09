import type { BookStockStatus } from "~/types";

export type BookMasterWithoutAuthors = {
  id: number,
  isbn: string,
  name: string,
};

export type BookMasterListItem = BookMasterWithoutAuthors;

export type BookMasterList = BookMasterListItem[];

