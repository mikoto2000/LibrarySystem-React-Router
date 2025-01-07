CREATE TABLE "book_master_to_book_stock" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "book_master_to_book_stock_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lending_set_id" integer NOT NULL,
	"book_stock_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book_master_to_author" RENAME COLUMN "book_stock_id" TO "book_master_id";--> statement-breakpoint
ALTER TABLE "book_master_to_author" RENAME COLUMN "lending_set_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "book_master_to_author" DROP CONSTRAINT "book_master_to_author_lending_set_id_bookMaster_id_fk";
--> statement-breakpoint
ALTER TABLE "book_master_to_author" DROP CONSTRAINT "book_master_to_author_book_stock_id_author_id_fk";
--> statement-breakpoint
ALTER TABLE "book_master_to_book_stock" ADD CONSTRAINT "book_master_to_book_stock_lending_set_id_bookMaster_id_fk" FOREIGN KEY ("lending_set_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_master_to_book_stock" ADD CONSTRAINT "book_master_to_book_stock_book_stock_id_author_id_fk" FOREIGN KEY ("book_stock_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_book_master_id_bookMaster_id_fk" FOREIGN KEY ("book_master_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;