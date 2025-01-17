// TODO: interface を切って drizzle 実装として実装しなおす
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";
import type { Customer } from "~/types";

export const findAllCustomer = async (): Promise<Customer[]> => {
  return (await db.select().from(customerTable));
}

export const findCustomerById = async (id: number): Promise<Customer> => {
  return (await db.select().from(customerTable).where(eq(customerTable.id, id)))[0]
}

export const createCustomer = async (customers: { name: string, emailAddress: string }[]): Promise<{ id: number, name: string, emailAddress: string }[]> => {
  return await db.insert(customerTable).values(customers).returning();
}

export const updateCustomer = async (id: number, customer: { name: string, emailAddress: string }) => {
  return await db.update(customerTable)
    .set(customer)
    .where(eq(customerTable.id, Number(id)))
    .returning();
}

export const deleteCustomer = async (id: number) => {
  await db.delete(customerTable)
    .where(eq(customerTable.id, id));
}

