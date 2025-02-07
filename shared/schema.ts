import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull()
});

export const insertWaitlistSchema = createInsertSchema(waitlist)
  .pick({
    email: true,
    name: true
  })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters")
  });

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;
