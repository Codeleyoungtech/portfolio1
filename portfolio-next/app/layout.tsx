import type { Metadata } from 'next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './globals.css';
import './styles/components.css';

export const metadata: Metadata = {
  title: 'Eleazar Ogoyemi | Full-Stack Developer & Content Creator',
  description: 'Portfolio of Eleazar Ogoyemi - Full-stack developer, content creator, and founder of Eleyoungtech. Building products that people actually use.',
  keywords: ['Eleazar Ogoyemi', 'Full-Stack Developer', 'Web Developer', 'Content Creator', 'Eleyoungtech', 'YouTube', 'Portfolio'],
  authors: [{ name: 'Eleazar Ogoyemi' }],
  openGraph: {
    type: 'website',
    url: 'https://eleazarogoyemi.com',
    title: 'Eleazar Ogoyemi | Full-Stack Developer & Content Creator',
    description: 'Portfolio of Eleazar Ogoyemi - Full-stack developer, content creator, and founder of Eleyoungtech',
    siteName: 'Eleazar Ogoyemi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eleazar Ogoyemi | Full-Stack Developer & Content Creator',
    description: 'Portfolio of Eleazar Ogoyemi - Full-stack developer, content creator, and founder of Eleyoungtech',
    creator: '@eleyoungtech',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Background Effects */}
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
