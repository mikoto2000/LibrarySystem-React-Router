export type BookStockStatus = {
  id: number,
  name: string,
};

export type LendingStatus = {
  id: number,
  name: string,
};

export type Author = {
  id: number,
  name: string,
};

export type BookMaster = {
  id: number,
  isbn: string,
  name: string,
  authors: Author[],
};

export type BookStock = {
  id: number,
  bookStockStatus: number,
  bookMaster: BookMaster,
  memo: string,
}

export type Customer = {
  id: number,
  name: string,
  emailAddress: string,
};

export type LendingSet = {
  id: number,
  lendStartDate: string,
  lendDeadlineDate: string,
  returnDate: string,
  bookStocks: BookStock[],
  memo?: string,
};
