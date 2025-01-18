import type { Customer } from "~/types";

export interface CustomerRepositoryService {
  findAllCustomer(): Promise<Customer[]>;
  findCustomerById(id: number): Promise<Customer>;

  createCustomer(bookStock: {
    name: string
  }[]): Promise<{ id: number, name: string }[]>;

  updateCustomer(id: number,
    bookStock: {
      name: string
    }): void;

  deleteCustomer(id: number): void;
}


