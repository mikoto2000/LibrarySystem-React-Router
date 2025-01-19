import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";
import type { LendingStatus } from "~/types";
import type { LendingStatusRepositoryService } from "../LendingStatusRepositoryService";

export class LendingStatusRepositoryForDrizzle implements LendingStatusRepositoryService {
  findAllLendingStatus = async (): Promise<LendingStatus[]> => {
    return (await db.select().from(lendingStatusTable));
  }

  findLendingStatusById = async (id: number): Promise<LendingStatus> => {
    return (await db.select().from(lendingStatusTable).where(eq(lendingStatusTable.id, id)))[0]
  }

  createLendingStatus = async (lendingStatuses: { name: string }[]): Promise<{ id: number, name: string }[]> => {
    return await db.insert(lendingStatusTable).values(lendingStatuses).returning();
  }

  updateLendingStatus = async (id: number, lendingStatus: { name: string }) => {
    return await db.update(lendingStatusTable)
      .set(lendingStatus)
      .where(eq(lendingStatusTable.id, Number(id)))
      .returning();
  }

  deleteLendingStatus = async (id: number) => {
    await db.delete(lendingStatusTable)
      .where(eq(lendingStatusTable.id, id));
  }
}
