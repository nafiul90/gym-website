import { Sora, Teko } from "next/font/google";

export const sora = Sora({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sora",
});

export const teko = Teko({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-teko",
});
