import type { Metadata } from "next";
import { Plus_Jakarta_Sans as SansFont } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const sansFont = SansFont({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "SysCare",
	description: "A healtcare management system",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-dark-300 font-sans antialiased",
					sansFont.variable
				)}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
