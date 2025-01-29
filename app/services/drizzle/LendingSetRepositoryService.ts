import { db } from "~/infra/db";
import { bookMasterTable, bookStockTable, customerTable, lendingSetTable, lendingSetToBookStockTable, lendingStatusTable } from "~/infra/db/schema";


import { and, eq, like, asc, desc, inArray } from "drizzle-orm";
import type { LendingSet, LendingSetList } from "~/views/types";
import type { LendingSetRepositoryService } from "../LendingSetRepositoryService";

export class LendingSetRepositoryForDrizzle implements LendingSetRepositoryService {
  findAllLendingSet = async (
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
  ): Promise<LendingSetList> => {
    // orderBy 文字列から、カラムのオブジェクトに変換
    const obi = lendingSetTable.id;
    const obc = customerTable.name;
    const obl = lendingSetTable.lendStartDate;
    const obd = lendingSetTable.lendDeadlineDate;
    const obr = lendingSetTable.returnDate;
    let ob: any = orderBy && orderBy === "customer" ? obc : obi;
    ob = orderBy && orderBy === "lendStartDate" ? obl : ob;
    ob = orderBy && orderBy === "lendDeadlineDate" ? obd : ob;
    ob = orderBy && orderBy === "returnDate" ? obr : ob;

    // テーブルから情報取得
    const selectResult = await db.select()
      .from(lendingSetTable)
      .leftJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
      .leftJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
      .leftJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
      .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
      .leftJoin(customerTable, eq(customerTable.id, lendingSetTable.customerId))
      .where(
        and(
          lendingStatusId ? eq(lendingSetTable.lendingStatusId, lendingStatusId) : undefined,
          customer ? like(customerTable.name, `%${customer}%`) : undefined,
          and(
            lendStartDateBegin ? eq(lendingSetTable.lendStartDate, lendStartDateBegin) : undefined,
            lendStartDateEnd ? eq(lendingSetTable.lendStartDate, lendStartDateEnd) : undefined,
          ),
          and(
            lendDeadlineDateBegin ? eq(lendingSetTable.lendDeadlineDate, lendDeadlineDateBegin) : undefined,
            lendDeadlineDateEnd ? eq(lendingSetTable.lendDeadlineDate, lendDeadlineDateEnd) : undefined,
          ),
          and(
            returnDateBegin ? eq(lendingSetTable.returnDate, returnDateBegin) : undefined,
            returnDateEnd ? eq(lendingSetTable.returnDate, returnDateEnd) : undefined,
          ),
          memo ? eq(lendingSetTable.memo, memo) : undefined,
        )
      )
      .orderBy(sortOrder === 'desc' ? desc(ob) : asc(ob))
      .limit(limit ? limit : 10)
      .offset(page ? (page - 1) * (limit ? limit : 10) : 0);

    // 同じ id ごとに別々の配列に分割する
    const groupedLendingSets = Object.groupBy(selectResult, (e: any) => e.lending_set.id);

    const lendingSets: LendingSetList = []
    for (const e in groupedLendingSets) {

      const tmp = groupedLendingSets[e];
      if (!tmp) {
        return [];
      }

      // id 毎に、ひとつの Object にまとめる
      const lendingSet = tmp.reduce((acumulator, currentValue) => {
        acumulator.id = Number(currentValue.lending_set.id);
        acumulator.customer = currentValue.customer.name;
        acumulator.lendingStatus = currentValue.lending_status;
        acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
        acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
        acumulator.returnDate = currentValue.lending_set.returnDate;
        acumulator.bookStocks.push(currentValue.book_stock.id + ": " + currentValue.bookMaster.name);
        acumulator.memo = currentValue.lending_set.memo;
        return acumulator;
      }, {
        id: 0,
        customer: "",
        lendingStatus: {},
        lendStartDate: "",
        lendDeadlineDate: "",
        returnDate: undefined,
        bookStocks: [],
        memo: "",
      });

      lendingSets.push(lendingSet);
    }

    // TODO: ソート

    return lendingSets;
  }

  findLendingSetById = async (id: number) => {
    const selectResult = await db.select()
      .from(lendingSetTable)
      .innerJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
      .innerJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
      .innerJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
      .innerJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
      .where(eq(lendingSetTable.id, id));

    //const lendingSet = selectResult;
    const lendingSet = selectResult.reduce((acumulator, currentValue) => {
      acumulator.id = currentValue.lending_set.id;
      acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
      acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
      acumulator.returnDate = currentValue.lending_set.returnDate ? currentValue.lending_set.returnDate : "";
      acumulator.memo = currentValue.lending_set.memo ? currentValue.lending_set.memo : "";
      acumulator.bookStocks.push({
        id: currentValue.book_stock.id,
        bookMaster: currentValue.bookMaster,
        memo: currentValue.book_stock.memo ? currentValue.book_stock.memo : "",

      })
      return acumulator;
    },
      {
        id: 0,
        lendingStatus: { id: 1, name: "貸出中" },
        lendStartDate: "",
        lendDeadlineDate: "",
        returnDate: "",
        bookStocks: [],
        memo: "",
      } as LendingSet);

    return lendingSet;
  }

  createLendingSet = async (
    lendingSet: {
      lendingStatusId: number,
      customerId: number,
      lendStartDate: string,
      lendDeadlineDate: string,
      bookStockIds: number[],
      memo?: string | null
    }): Promise<{ id: number }[]> => {
    const insertResult = await db.insert(lendingSetTable).values(lendingSet).returning();

    // LendingSet to BookStock の中間テーブルを更新
    const lendingSetToBookStocks = lendingSet.bookStockIds.map((e) => {
      return {
        lendingSetId: insertResult[0].id,
        bookStockId: Number(e.toString()),
      }
    });
    await db.insert(lendingSetToBookStockTable).values(lendingSetToBookStocks).returning();

    // BookStock を「貸出不可」に更新
    await db.update(bookStockTable).set({
      bookStockStatusId: 2,
    })
      .where(inArray(bookStockTable.id, lendingSet.bookStockIds.map((e) => Number(e))));

    // 返却用オブジェクトを作成
    return insertResult.map((e) => { return { id: e.id } });
  }

  updateLendingSet = async (
    id: number,
    lendingSet: {
      lendingStatusId: number,
      customerId: number,
      lendStartDate: string,
      lendDeadlineDate: string,
      returnDate?: string | null,
      bookStockIds: number[],
      memo?: string | null
    }) => {
    const insertResult = await db.update(lendingSetTable)
      .set({
        lendingStatusId: lendingSet.lendingStatusId,
        customerId: lendingSet.customerId,
        lendStartDate: lendingSet.lendStartDate,
        lendDeadlineDate: lendingSet.lendDeadlineDate,
        returnDate: lendingSet.returnDate !== "" ? lendingSet.returnDate : null,
        memo: lendingSet.memo,
      })
      .where(eq(lendingSetTable.id, Number(id)))
      .returning();

    // 中間テーブルの既存エントリー削除
    await db.delete(lendingSetToBookStockTable)
      .where(eq(lendingSetToBookStockTable.lendingSetId, id));

    // 中間テーブルにエントリー登録
    const lendingSetToBookStocks = lendingSet.bookStockIds.map((e) => {
      return {
        lendingSetId: insertResult[0].id,
        bookStockId: Number(e.toString()),
      }
    });
    await db.insert(lendingSetToBookStockTable).values(lendingSetToBookStocks).returning();
  }

  deleteLendingSet = async (id: number) => {
    await db.delete(lendingSetToBookStockTable)
      .where(eq(lendingSetToBookStockTable.lendingSetId, Number(id)));
    await db.delete(lendingSetTable)
      .where(eq(lendingSetTable.id, Number(id)));
  }
}
