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
  bookStockStatusId: number,
  bookMasterId: number,
  memo: string,
}

export type Customer = {
  id: number,
  name: string,
  emailAddress: string,
};

