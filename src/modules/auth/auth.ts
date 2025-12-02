import { betterAuth } from 'better-auth';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schemas/auth-schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema
	}),
	emailAndPassword: {
		enabled: true
	},
	user: {
		additionalFields: {
			firstName: {
				type: "string",
				required: true,
			},
			lastName: {
				type: "string",
				required: true,
			},
		},
	},
	plugins: [tanstackStartCookies()]
});