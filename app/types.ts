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
  // TODO: view 用に、画面ごとのの type を別途作成する
  authors?: Author[],
};

export type BookStock = {
  id: number,
  bookStockStatus: BookStockStatus,
  bookMaster: BookMaster,
  memo?: string | null,
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
};
