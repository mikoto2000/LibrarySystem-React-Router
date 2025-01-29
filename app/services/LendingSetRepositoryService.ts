import type { LendingSet, LendingSetList } from "~/views/types";

export interface LendingSetRepositoryService {
  /**
   * Find all lending sets
   * @param lendingStatusId lending status id
   * @param customer customer
   * @param lendStartDateBegin lend start date begin
   * @param lendStartDateEnd lend start date end
   * @param lendDeadlineDateBegin lend deadline date begin
   * @param lendDeadlineDateEnd lend deadline date end
   * @param returnDateBegin return date begin
   * @param returnDateEnd return date end
   * @param memo memo
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllLendingSet(
    lendingStatusId?: number,
    customer?: string,
    lendStartDateBegin?: string,
    lendStartDateEnd?: string,
    lendDeadlineDateBegin?: string,
    lendDeadlineDateEnd?: string,
    returnDateBegin?: string,
    returnDateEnd?: string,
    memo?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<LendingSetList>;
  findLendingSetById(id: number): Promise<LendingSet>;

  createLendingSet(
    lendingSet: {
      lendingStatusId: number,
      customerId: number,
      lendStartDate: string,
      lendDeadlineDate: string,
      bookStockIds: number[],
      memo?: string | null
    }): Promise<{ id: number }[]>;

  updateLendingSet(
    id: number,
    lendingSet: {
      lendingStatusId: number,
      customerId: number,
      lendStartDate: string,
      lendDeadlineDate: string,
      returnDate?: string | null,
      bookStockIds: number[],
      memo?: string | null
    }): void;

  deleteLendingSet(id: number): void;
}
