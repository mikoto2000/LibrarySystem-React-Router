import { AuthorRepositoryForDrizzle } from "./services/drizzle/AuthorRepositoryService";
import { BookMasterRepositoryForDrizzle } from "./services/drizzle/BookMasterRepositoryService";
import { BookStockRepositoryForDrizzle } from "./services/drizzle/BookStockRepositoryService";
import { BookStockStatusRepositoryForDrizzle } from "./services/drizzle/BookStockStatusRepositoryService";
import { CustomerRepositoryForDrizzle } from "./services/drizzle/CustomerRepositoryService";
import { LendingSetRepositoryForDrizzle } from "./services/drizzle/LendingSetRepositoryService";
import { LendingStatusRepositoryForDrizzle } from "./services/drizzle/LendingStatusRepositoryService";

export const authorRepository = new AuthorRepositoryForDrizzle();
export const bookMasterRepository = new BookMasterRepositoryForDrizzle();
export const bookStockRepository = new BookStockRepositoryForDrizzle();
export const bookStockStatusRepository = new BookStockStatusRepositoryForDrizzle();
export const customerRepository = new CustomerRepositoryForDrizzle();
export const lendingSetRepository = new LendingSetRepositoryForDrizzle();
export const lendingStatusRepository = new LendingStatusRepositoryForDrizzle();
