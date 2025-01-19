import type { LendingStatus } from "~/types";

export interface LendingStatusRepositoryService {
  findAllLendingStatus(): Promise<LendingStatus[]>;
  findLendingStatusById(id: number): Promise<LendingStatus>;

  createLendingStatus(bookStock: {
    name: string
  }[]): Promise<{ id: number, name: string }[]>;

  updateLendingStatus(id: number,
    bookStock: {
      name: string
    }): void;

  deleteLendingStatus(id: number): void;
}
