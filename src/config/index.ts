import { z } from "zod";

const envVariables = z.object({
	NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000/v1"),
	GITHUB_URL: z.string().url().default("https://github.com"),
});

// envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
