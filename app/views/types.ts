import type { BookStockStatus } from "~/types";

export type BookMasterWithoutAuthors = {
  id: number,
  isbn: string,
  name: string,
};

export type BookMasterListItem = BookMasterWithoutAuthors;

export type BookMasterList = BookMasterListItem[];

export type BookStockWithoutAuthor = {
  id: number,
  bookStockStatus: number,
  bookMaster: BookMasterList,
  memo: string,
};

export type LendingSetWithoutAuthor = {
  id: number,
  lendStartDate: string,
  lendDeadlineDate: string,
  returnDate: string,
  bookStocks: BookStockWithoutAuthor[],
  memo?: string,
};

export type LendingSetListItem = LendingSetWithoutAuthor;

export type LendingSetList = LendingSetListItem[];

