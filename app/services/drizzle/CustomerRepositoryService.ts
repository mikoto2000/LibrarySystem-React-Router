import { and, eq, like, asc, desc } from "drizzle-orm";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";
import type { Customer } from "~/types";
import type { CustomerRepositoryService } from "../CustomerRepositoryService";

export class CustomerRepositoryForDrizzle implements CustomerRepositoryService {
  /**
   * Find all customers
   * @param name customer name
   * @param emailAddress customer email address
   * @param sortOrder sort order
   * @param orderBy order by
   * @param page page number
   * @param limit limit number
   */
  findAllCustomer = async (
    name?: string,
    emailAddress?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<Customer[]> => {

    // orderBy 文字列から、カラムのオブジェクトに変換
    const obi = customerTable.id;
    const obn = customerTable.name;
    const obe = customerTable.emailAddress;
    let ob: any = orderBy && orderBy === "name" ? obn : obi;
    ob = orderBy && orderBy === "emailAddress" ? obe : ob;

    return await db.select().from(customerTable)
      .where(
        and(
          name ? like(customerTable.name, `%${name}%`) : undefined,
          emailAddress ? like(customerTable.emailAddress, `%${emailAddress}%`) : undefined
        )
      )
      .orderBy(sortOrder === 'desc' ? desc(ob) : asc(ob))
      .limit(limit ? limit : 10)
      .offset(page ? (page - 1) * (limit ? limit : 10) : 0);
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
