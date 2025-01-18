import type { Author } from "~/types";

export interface AuthorRepositoryService {
  findAllAuthor(): Promise<Author[]>;
  findAuthorById(id: number): Promise<Author>;
  createAuthor(authors: { name: string }[]): Promise<{ id: number, name: string }[]>;
  updateAuthor(id: number, author: { name: string }): void;
  deleteAuthor(id: number): void;
}
