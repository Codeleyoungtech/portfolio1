import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Eleazar Ogoyemi',
    description: 'Learn about my journey, expertise, and vision as a full-stack developer and content creator.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
