CREATE TABLE "lending_set" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lending_set_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lending_status_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"lendStartDate" date NOT NULL,
	"lendDeadlineDate" date NOT NULL,
	"returnDate" date,
	"memo" text
);
--> statement-breakpoint
ALTER TABLE "lending_set" ADD CONSTRAINT "lending_set_lending_status_id_lending_status_id_fk" FOREIGN KEY ("lending_status_id") REFERENCES "public"."lending_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lending_set" ADD CONSTRAINT "lending_set_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;