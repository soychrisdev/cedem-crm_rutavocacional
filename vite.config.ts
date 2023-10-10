import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
	if (command === "serve") {
		console.log("using vite.config. DEV option");

		return {
			plugins: [react()],
			css: {
				preprocessorOptions: {

				},
			},
			server: {
				proxy: {
					"/api": {
						target: "http://[::1]:54111/api",
						secure: false,
						changeOrigin: false,
						rewrite: (path) => path.replace(/^\/api/, ""),
					},
				},
			},
		};
	} else {
		console.log("using vite.config. build option");
		return {
			plugins: [react()],
			css: {
				preprocessorOptions: {

				},
			},
			server: {
				proxy: {
					"/api": {
						target: "http://localhost:54111/CRM_SF/SF_CASOS/api", // work in build
						// target: "http://[::1]:54111/api", // work in build but local
						secure: false,
						changeOrigin: true, // work in local
						// rewrite: (path) => path.replace(/^\/api/, ""),
					},
				},
			},
		};
	}
});
