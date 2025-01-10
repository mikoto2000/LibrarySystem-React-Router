ALTER TABLE "book_master_to_book_stock" RENAME TO "lending_set_to_book_stock";--> statement-breakpoint
ALTER TABLE "lending_set_to_book_stock" DROP CONSTRAINT "book_master_to_book_stock_lending_set_id_bookMaster_id_fk";
--> statement-breakpoint
ALTER TABLE "lending_set_to_book_stock" DROP CONSTRAINT "book_master_to_book_stock_book_stock_id_author_id_fk";
--> statement-breakpoint
ALTER TABLE "lending_set_to_book_stock" ADD CONSTRAINT "lending_set_to_book_stock_lending_set_id_lending_set_id_fk" FOREIGN KEY ("lending_set_id") REFERENCES "public"."lending_set"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lending_set_to_book_stock" ADD CONSTRAINT "lending_set_to_book_stock_book_stock_id_book_stock_id_fk" FOREIGN KEY ("book_stock_id") REFERENCES "public"."book_stock"("id") ON DELETE no action ON UPDATE no action;