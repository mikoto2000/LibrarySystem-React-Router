// TODO: interface を切って drizzle 実装として実装しなおす
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";
import type { LendingStatus } from "~/types";

export const findAllLendingStatus = async (): Promise<LendingStatus[]> => {
  return (await db.select().from(lendingStatusTable));
}

export const findLendingStatusById = async (id: number): Promise<LendingStatus> => {
  return (await db.select().from(lendingStatusTable).where(eq(lendingStatusTable.id, id)))[0]
}

export const createLendingStatus = async (lendingStatuses: { name: string }[]): Promise<{ id: number, name: string }[]> => {
  return await db.insert(lendingStatusTable).values(lendingStatuses).returning();
}

export const updateLendingStatus = async (id: number, lendingStatus: { name: string }) => {
  return await db.update(lendingStatusTable)
    .set(lendingStatus)
    .where(eq(lendingStatusTable.id, Number(id)))
    .returning();
}

export const deleteLendingStatus = async (id: number) => {
  await db.delete(lendingStatusTable)
    .where(eq(lendingStatusTable.id, id));
}

