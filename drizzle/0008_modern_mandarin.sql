ALTER TABLE "book_master_to_author" RENAME COLUMN "book_master_id" TO "lending_set_id";--> statement-breakpoint
ALTER TABLE "book_master_to_author" RENAME COLUMN "author_id" TO "book_stock_id";--> statement-breakpoint
ALTER TABLE "book_master_to_author" DROP CONSTRAINT "book_master_to_author_book_master_id_bookMaster_id_fk";
--> statement-breakpoint
ALTER TABLE "book_master_to_author" DROP CONSTRAINT "book_master_to_author_author_id_author_id_fk";
--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_lending_set_id_bookMaster_id_fk" FOREIGN KEY ("lending_set_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_book_stock_id_author_id_fk" FOREIGN KEY ("book_stock_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;