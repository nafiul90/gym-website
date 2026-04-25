import { sora, teko } from "@/utils/fonts";
import "./globals.css";

export const metadata = {
    title: "Gym Website",
    description: "Powered by Gym Assistant",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`scroll-smooth ${sora.variable} ${teko.variable}`}>
            <body className="font-sora bg-primary-dark-900 text-primary-bright-300">
                {children}
            </body>
        </html>
    );
}
