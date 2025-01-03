export type BookStockStatus = {
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


