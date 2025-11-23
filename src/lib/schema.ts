import { pgEnum, pgTable, serial, varchar, integer, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const orderStatus = pgEnum("order_status", [
	"pending",
	"paid",
	"processing",
	"shipped",
	"cancelled",
]);

export const categories = pgTable(
	"categories",
	{
		id: serial("id").primaryKey(),
		slug: varchar("slug", { length: 100 }).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		slugIdx: uniqueIndex("categories_slug_idx").on(table.slug),
	}),
);

export const categoryTranslations = pgTable(
	"category_translations",
	{
		id: serial("id").primaryKey(),
		categoryId: integer("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "cascade" }),
		locale: varchar("locale", { length: 5 }).notNull(),
		name: varchar("name", { length: 255 }).notNull(),
	},
	(table) => ({
		categoryLocaleIdx: uniqueIndex("category_translations_category_locale_idx").on(
			table.categoryId,
			table.locale,
		),
	}),
);

export const products = pgTable(
	"products",
	{
		id: serial("id").primaryKey(),
		sku: varchar("sku", { length: 64 }),
		price: integer("price").notNull(), // store in smallest currency unit (e.g. cents)
		stock: integer("stock").notNull().default(0),
		image: text("image"),
		categoryId: integer("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "restrict" }),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		skuIdx: uniqueIndex("products_sku_idx").on(table.sku),
	}),
);

export const productTranslations = pgTable(
	"product_translations",
	{
		id: serial("id").primaryKey(),
		productId: integer("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),
		locale: varchar("locale", { length: 5 }).notNull(),
		name: varchar("name", { length: 255 }).notNull(),
		description: text("description"),
	},
	(table) => ({
		productLocaleIdx: uniqueIndex("product_translations_product_locale_idx").on(
			table.productId,
			table.locale,
		),
	}),
);

export const users = pgTable(
	"users",
	{
		id: serial("id").primaryKey(),
		email: varchar("email", { length: 255 }).notNull(),
	},
	(table) => ({
		emailIdx: uniqueIndex("users_email_idx").on(table.email),
	}),
);

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull().references(() => users.id),
	status: orderStatus("status").notNull().default("pending"),
	totalAmount: integer("total_amount").notNull(),
	paymentIntentId: varchar("payment_intent_id", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
	id: serial("id").primaryKey(),
	orderId: integer("order_id")
		.notNull()
		.references(() => orders.id, { onDelete: "cascade" }),
	productId: integer("product_id")
		.notNull()
		.references(() => products.id),
	quantity: integer("quantity").notNull(),
	price: integer("price").notNull(), // unit price captured at order time
	productName: varchar("product_name", { length: 255 }),
});
