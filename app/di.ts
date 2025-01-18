import { AuthorRepositoryForDrizzle } from "./services/drizzle/AuthorRepositoryService";
import { BookMasterRepositoryForDrizzle } from "./services/drizzle/BookMasterRepositoryService";
import { BookStockRepositoryForDrizzle } from "./services/drizzle/BookStockRepositoryService";

export const authorRepository = new AuthorRepositoryForDrizzle();
export const bookMasterRepository = new BookMasterRepositoryForDrizzle();
export const bookStockRepository = new BookStockRepositoryForDrizzle();

