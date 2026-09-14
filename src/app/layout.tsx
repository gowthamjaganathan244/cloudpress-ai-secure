import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CloudPress AI Secure",
    template: "%s | CloudPress AI Secure",
  },
  description:
    "Secure, governed content operations and permission-aware enterprise AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t='system',s='expanded';try{t=localStorage.getItem('cloudpress-theme')||'system';s=localStorage.getItem('cloudpress-sidebar')||'expanded'}catch(e){}if(t!=='light'&&t!=='dark')t='system';var r=document.documentElement;r.dataset.themePreference=t;r.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;r.dataset.sidebar=s==='collapsed'?'collapsed':'expanded'})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
