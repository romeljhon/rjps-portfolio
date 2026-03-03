import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Space_Grotesk, Inter } from 'next/font/google';
import Particles from '@/components/ui/Particles';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(263.4 70% 50.4%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10.625l5-3.125 5 3.125-5 3.125-5-3.125z"></path><path d="M7 14.375l5-3.125 5 3.125-5 3.125-5-3.125z"></path><path d="M7 18.125l5-3.125 5 3.125-5 3.125-5-3.125z"></path></svg>`;
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export const metadata: Metadata = {
  title: 'Romel Jhon Salvaleon | Creative Developer',
  description: 'Portfolio of Romel Jhon Salvaleon, a creative developer specializing in high-end digital experiences.',
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased text-foreground selection:bg-primary/20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
            <Particles
              particleColors={["#ffffff"]}
              particleCount={300}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={2}
            />
          </div>
          <div className="noise" />
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
