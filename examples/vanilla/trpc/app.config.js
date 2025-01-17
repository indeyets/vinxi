import { fileURLToPath } from "url";
import { createApp } from "vinxi";
import { input } from "vinxi/plugins/config";

/** @returns {import('vinxi').RouterSchemaInput} */
function trpcRouter({ plugins = () => [] } = {}) {
	return {
		name: "server",
		base: "/trpc",
		mode: "handler",
		handler: fileURLToPath(new URL("./handler.js", import.meta.url)),
		target: "server",
		plugins: () => [
			input(
				"#vinxi/trpc/router",
				fileURLToPath(new URL("./app/server.ts", import.meta.url)),
			),
		],
	};
}

export default createApp({
	routers: [
		{
			name: "public",
			mode: "static",
			dir: "./public",
		},
		trpcRouter(),
		{
			name: "client",
			mode: "spa",
			handler: "./index.html",
			target: "browser",
		},
	],
});
