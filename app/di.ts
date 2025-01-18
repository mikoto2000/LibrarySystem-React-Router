import { AuthorRepositoryForDrizzle } from "./services/drizzle/AuthorRepositoryService";
import { BookMasterRepositoryForDrizzle } from "./services/drizzle/BookMasterRepositoryService";

export const authorRepository = new AuthorRepositoryForDrizzle();
export const bookMasterRepository = new BookMasterRepositoryForDrizzle();

