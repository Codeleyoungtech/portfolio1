import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Work | Eleazar Ogoyemi',
    description: '50+ projects across web development, branding, and digital products. See my portfolio of work.',
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
