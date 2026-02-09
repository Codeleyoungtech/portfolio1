import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { href: '/', label: 'Home' },
            { href: '/work', label: 'Work' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
        ],
        social: [
            { href: 'https://youtube.com/@eleyoungtech', label: 'YouTube', icon: '📺' },
            { href: 'https://instagram.com/eleyoungtech', label: 'Instagram', icon: '📷' },
            { href: 'https://twitter.com/eleyoungtech', label: 'Twitter', icon: '🐦' },
            { href: 'https://linkedin.com/in/eleazarogoyemi', label: 'LinkedIn', icon: '💼' },
            { href: 'https://github.com/codeleyoungtech', label: 'GitHub', icon: '💻' },
        ],
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Navigation Links */}
                    <div className={styles.column}>
                        <h3 className={styles.title}>Navigate</h3>
                        <ul className={styles.linkList}>
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className={styles.column}>
                        <h3 className={styles.title}>Connect</h3>
                        <ul className={styles.linkList}>
                            {footerLinks.social.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        <span className={styles.icon}>{link.icon}</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA/Newsletter */}
                    <div className={styles.column}>
                        <h3 className={styles.title}>Stay Updated</h3>
                        <p className={styles.description}>
                            Subscribe for tech tips, project updates, and exclusive content
                        </p>
                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={styles.input}
                            />
                            <button className={styles.button}>Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>
                        © {currentYear} Eleazar Ogoyemi. Built with passion and pixels. 🚀
                    </p>
                </div>
            </div>
        </footer>
    );
}
