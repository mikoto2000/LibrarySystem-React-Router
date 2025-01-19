import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";
import type { Customer } from "~/types";
import type { CustomerRepositoryService } from "../CustomerRepositoryService";

export class CustomerRepositoryForDrizzle implements CustomerRepositoryService {
  findAllCustomer = async (): Promise<Customer[]> => {
    return (await db.select().from(customerTable));
  }

  findCustomerById = async (id: number): Promise<Customer> => {
    return (await db.select().from(customerTable).where(eq(customerTable.id, id)))[0]
  }

  createCustomer = async (customers: { name: string, emailAddress: string }[]): Promise<{ id: number, name: string, emailAddress: string }[]> => {
    return await db.insert(customerTable).values(customers).returning();
  }

  updateCustomer = async (id: number, customer: { name: string, emailAddress: string }) => {
    return await db.update(customerTable)
      .set(customer)
      .where(eq(customerTable.id, Number(id)))
      .returning();
  }

  deleteCustomer = async (id: number) => {
    await db.delete(customerTable)
      .where(eq(customerTable.id, id));
  }
}
