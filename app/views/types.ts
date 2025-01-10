import type { BookStockStatus, LendingStatus } from "~/types";

export type BookMasterWithoutAuthors = {
  id: number,
  isbn: string,
  name: string,
  publicationDate: string,
};

export type BookMasterListItem = BookMasterWithoutAuthors;

export type BookMasterList = BookMasterListItem[];

export type BookStockWithoutAuthorAndStatus = {
  id: number,
  bookMaster: BookMasterWithoutAuthors,
  memo: string,
};

export type LendingSetWithoutAuthor = {
  id: number,
  lendStartDate: string,
  lendDeadlineDate: string,
  returnDate: string,
  bookStocks: BookStockWithoutAuthorAndStatus[],
  memo?: string,
};

export type LendingSetListItem = LendingSetWithoutAuthor;

export type LendingSetList = LendingSetListItem[];

export type LendingSet = {
  id: number,
  lendingStatus: LendingStatus,
  lendStartDate: string,
  lendDeadlineDate: string,
  returnDate?: string,
  bookStocks: BookStockWithoutAuthorAndStatus[],
  memo?: string,
};
