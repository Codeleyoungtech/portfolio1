import { Users2, Monitor, Palette, Video, Target, Lightbulb, Coffee, Gamepad, MapPin, BookOpen } from 'lucide-react';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroGrid}>
                        <div>
                            <h1 className={styles.title}>
                                Building Digital Experiences & <span className="gradient-text">Teaching Tech</span>
                            </h1>
                            <p className={styles.subtitle}>
                                Full-stack developer and content creator helping businesses build products and developers level up their skills.
                            </p>
                        </div>
                        <div className={styles.profileImage}>
                            <div className={styles.imagePlaceholder}>
                                <Users2 size={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section className={styles.expertiseSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Core Expertise</h2>
                    <div className={styles.expertiseGrid}>
                        {[
                            {
                                title: 'Frontend Development',
                                icon: <Monitor size={32} />,
                                skills: ['React', 'Next.js', 'TypeScript', 'CSS']
                            },
                            {
                                title: 'Backend Development',
                                icon: <Target size={32} />,
                                skills: ['Node.js', 'Express', 'MongoDB', 'APIs']
                            },
                            {
                                title: 'Design & Branding',
                                icon: <Palette size={32} />,
                                skills: ['Figma', 'UI/UX', 'Brand Identity']
                            },
                            {
                                title: 'Content Creation',
                                icon: <Video size={32} />,
                                skills: ['YouTube', 'Tech Reviews', 'Teaching']
                            },
                        ].map((item, i) => (
                            <div key={i} className={styles.expertiseCard}>
                                <div className={styles.expertiseIcon}>{item.icon}</div>
                                <h3>{item.title}</h3>
                                <div className={styles.skillTags}>
                                    {item.skills.map((skill, j) => (
                                        <span key={j} className="badge badge-primary">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.visionSection}>
                <div className="container">
                    <div className={styles.visionGrid}>
                        <div className={styles.visionCard}>
                            <Target size={48} />
                            <h3>Mission</h3>
                            <p>
                                Help businesses build digital products users love, while teaching
                                the next generation through accessible content.
                            </p>
                        </div>
                        <div className={styles.visionCard}>
                            <Lightbulb size={48} />
                            <h3>Vision</h3>
                            <p>
                                Quality tech education accessible to everyone, where developers
                                build products that genuinely solve problems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fun Facts */}
            <section className={styles.factsSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Quick Facts</h2>
                    <div className={styles.factsGrid}>
                        {[
                            { icon: <Coffee size={24} />, text: 'Coffee enthusiast' },
                            { icon: <Gamepad size={24} />, text: 'Gamer in free time' },
                            { icon: <MapPin size={24} />, text: 'Based in Nigeria' },
                            { icon: <BookOpen size={24} />, text: 'Always learning' },
                        ].map((fact, i) => (
                            <div key={i} className={styles.fact}>
                                <div className={styles.factIcon}>{fact.icon}</div>
                                <span>{fact.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <h2 className={styles.ctaTitle}>Let's Work Together</h2>
                    <p className={styles.ctaText}>Have a project in mind?</p>
                    <div className={styles.ctaButtons}>
                        <a href="/contact" className="btn btn-primary btn-lg">Get In Touch</a>
                        <a href="/work" className="btn btn-secondary btn-lg">View My Work</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
