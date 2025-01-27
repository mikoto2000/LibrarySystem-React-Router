import type { Author } from "~/types";

export interface AuthorRepositoryService {
  /**
   * Find all authors
   * @param name author name
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllAuthor(
    name?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<Author[]>;
  findAuthorById(id: number): Promise<Author>;
  createAuthor(authors: { name: string }[]): Promise<{ id: number, name: string }[]>;
  updateAuthor(id: number, author: { name: string }): void;
  deleteAuthor(id: number): void;
}
