import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Eleazar Ogoyemi',
    description: 'Get in touch - book a free consultation or send me a message. I typically respond within 24 hours.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
