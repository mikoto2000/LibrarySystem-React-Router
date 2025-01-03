CREATE TABLE "author" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "author_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookMaster" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookMaster_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"isbn" varchar(16) NOT NULL,
	"name" varchar(255) NOT NULL,
	"publicationDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "book_master_to_author" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "book_master_to_author_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"book_master_id" integer NOT NULL,
	"author_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_book_master_id_bookMaster_id_fk" FOREIGN KEY ("book_master_id") REFERENCES "public"."bookMaster"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_master_to_author" ADD CONSTRAINT "book_master_to_author_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;