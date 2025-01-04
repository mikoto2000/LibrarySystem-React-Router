ALTER TABLE "book_stock_to_book_master" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "book_stock_to_book_master" CASCADE;--> statement-breakpoint
ALTER TABLE "book_stock" ADD COLUMN "book_master_id" integer;--> statement-breakpoint
ALTER TABLE "book_stock" ADD CONSTRAINT "book_stock_book_master_id_bookMaster_id_fk" FOREIGN KEY ("book_master_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;