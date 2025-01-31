import type { LendingStatus } from "~/types";

export interface LendingStatusRepositoryService {
  /**
   * Find all lending status
   * @param name lending status name
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllLendingStatus(
    name?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<LendingStatus[]>;
  findLendingStatusById(id: number): Promise<LendingStatus>;

  createLendingStatus(lendingStatus: {
    name: string
  }[]): Promise<{ id: number, name: string }[]>;

  updateLendingStatus(id: number,
    bookStock: {
      name: string
    }): void;

  deleteLendingStatus(id: number): void;
}
