import type { Route } from "./+types/lendingSetDetail";
import { LendingSetDetailPage } from "../../views/pages/lendingSet/LendingSetDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, lendingStatusTable, lendingSetTable, lendingSetToBookStockTable, bookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { LendingSet } from "~/views/types";

export async function loader({ params }: Route.LoaderArgs) {
	const id = params.id;

	const selectResult = await db.select()
		.from(lendingSetTable)
		.innerJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
		.innerJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
		.innerJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
		.innerJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
		.where(eq(lendingSetTable.id, Number(id)));

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

	return { lendingSet };
}

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function LendingSetDetail({ loaderData }: Route.ComponentProps) {
	return <LendingSetDetailPage
		lendingSet={loaderData.lendingSet}
	/>;
}

