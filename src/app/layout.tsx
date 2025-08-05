import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(217.2 91.2% 59.8%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10.625l5-3.125 5 3.125-5 3.125-5-3.125z"></path><path d="M7 14.375l5-3.125 5 3.125-5 3.125-5-3.125z"></path><path d="M7 18.125l5-3.125 5 3.125-5 3.125-5-3.125z"></path></svg>`;
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export const metadata: Metadata = {
  title: 'Romel Jhon Salvaleon | Web Developer Portfolio',
  description: 'A personal portfolio for a web developer, showcasing projects, resume, and blog.',
  icons: {
    icon: logoDataUri,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
