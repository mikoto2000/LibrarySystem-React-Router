CREATE TABLE "book_stock" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "book_stock_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"book_stock_status_id" integer
);
--> statement-breakpoint
CREATE TABLE "book_stock_to_book_master" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "book_stock_to_book_master_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"book_stock_id" integer NOT NULL,
	"book_master_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book_stock" ADD CONSTRAINT "book_stock_book_stock_status_id_book_stock_status_id_fk" FOREIGN KEY ("book_stock_status_id") REFERENCES "public"."book_stock_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_stock_to_book_master" ADD CONSTRAINT "book_stock_to_book_master_book_stock_id_book_stock_id_fk" FOREIGN KEY ("book_stock_id") REFERENCES "public"."book_stock"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_stock_to_book_master" ADD CONSTRAINT "book_stock_to_book_master_book_master_id_bookMaster_id_fk" FOREIGN KEY ("book_master_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;