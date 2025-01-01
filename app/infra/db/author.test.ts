import { afterEach, expect, test } from 'vitest'
import { authorTable } from './schema'
import { db } from '.';
import { eq } from 'drizzle-orm';

afterEach(async () => {
  await db.delete(authorTable);
});

test('author insert, select, update, delete', async () => {

  const author: typeof authorTable.$inferInsert = {
    name: "mikoto2000",
  };

  await db.insert(authorTable).values(author);

  const users = await db.select().from(authorTable);
  expect(users.length).toBe(1);
  expect(users[0].name).toBe("mikoto2000");

  const user = users[0];
  await db.update(authorTable)
    .set({
      name: "mikoto2024"
    })
    .where(eq(authorTable.id, user.id));

  const updatedUsers = await db.select().from(authorTable);
  expect(updatedUsers.length).toBe(1);
  expect(updatedUsers[0].name).toBe("mikoto2024");
});
