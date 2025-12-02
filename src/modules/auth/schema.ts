import { z } from "zod"

export const signupSchema = z
	.object({
		firstName: z.string().min(2, "Ton prénom doit faire 2 caractères minimum."),
		lastName: z.string().min(2, "Ton nom doit faire 2 caractères minimum."),
		email: z.email("Email invalide."),
		password: z.string().min(8, "8 caractères minimum."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Les mots de passe ne correspondent pas.",
	})

export type SignupInput = z.infer<typeof signupSchema>

export const signInSchema = z
	.object({
		email: z.email("Email invalide."),
		password: z.string().min(8, "8 caractères minimum."),
	})

export type SignInInput = z.infer<typeof signInSchema>