import type { LendingSet, LendingSetList } from "~/views/types";

export interface LendingSetRepositoryService {
  findAllLendingSet(): Promise<LendingSetList>;
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
