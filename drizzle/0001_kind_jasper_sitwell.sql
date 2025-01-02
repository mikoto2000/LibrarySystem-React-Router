CREATE TABLE "bookMaster" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookMaster_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"isbn" varchar(16) NOT NULL,
	"name" varchar(255) NOT NULL,
	"publicationDate" date NOT NULL,
	"author_id" integer
);
--> statement-breakpoint
ALTER TABLE "bookMaster" ADD CONSTRAINT "bookMaster_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;