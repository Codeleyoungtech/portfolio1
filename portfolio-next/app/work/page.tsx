'use client';

import { useState } from 'react';
import { Filter, TrendingUp, Palette, Smartphone, Video, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';

const categories = [
    { id: 'all', label: 'All Projects', icon: <Filter size={16} /> },
    { id: 'web', label: 'Web Development', icon: <TrendingUp size={16} /> },
    { id: 'branding', label: 'Branding & Design', icon: <Palette size={16} /> },
    { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone size={16} /> },
    { id: 'content', label: 'Content Creation', icon: <Video size={16} /> },
];

const projects = [
    {
        id: 1,
        title: 'YouTube Analytics Pro',
        category: 'web',
        description: 'AI-powered analytics platform helping creators grow',
        metrics: '500+ users • 45% avg. growth',
        tags: ['React', 'Node.js', 'AI'],
        image: '/projects/younal-analytics.png',
        featured: true,
    },
    {
        id: 2,
        title: 'Eleyoungtech Brand',
        category: 'branding',
        description: 'Personal brand from 0 to 15K+ subscribers',
        metrics: '300% growth • 2M+ impressions',
        tags: ['Logo Design', 'Brand Identity'],
        image: '/projects/eleyoungtechpreview.png',
        featured: true,
    },
    {
        id: 3,
        title: 'Precious Fruit School',
        category: 'web',
        description: 'Modern school website with CMS',
        metrics: '180% more inquiries',
        tags: ['Next.js', 'CMS'],
        image: '/projects/precious-fruit-preview.png',
        featured: true,
    },
    {
        id: 4,
        title: 'E-commerce Dashboard',
        category: 'web',
        description: 'Admin dashboard for online store management',
        metrics: '10K+ products managed',
        tags: ['React', 'TypeScript'],
        image: '/projects/preview.png',
        featured: false,
    },
    {
        id: 5,
        title: 'Fitness App UI',
        category: 'mobile',
        description: 'Modern fitness tracking app design',
        metrics: '5K+ downloads',
        tags: ['React Native', 'UI/UX'],
        image: '/projects/my-image.png',
        featured: false,
    },
    {
        id: 6,
        title: 'Tech Review Series',
        category: 'content',
        description: 'Weekly tech product reviews on YouTube',
        metrics: '100K+ views',
        tags: ['YouTube', 'Video'],
        image: '/projects/eleazarpreview.png',
        featured: false,
    },
];

export default function WorkPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className={styles.eyebrow}>PORTFOLIO</span>
                    <h1 className={styles.title}>
                        50+ Projects <span className="gradient-text">Delivered</span>
                    </h1>
                    <p className={styles.subtitle}>
                        From startups to enterprises, here's a showcase of web apps, brands, and digital products I've built
                    </p>
                </div>
            </section>

            {/* Horizontal Scrollable Filters */}
            <section className={styles.filterSection}>
                <div className="container">
                    <div className={styles.filtersWrapper}>
                        <div className={styles.filters}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`${styles.filterBtn} ${activeCategory === category.id ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.icon}
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={styles.projectsSection}>
                <div className="container">
                    <div className={styles.projectsGrid}>
                        {filteredProjects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={styles.projectImage}
                                    />
                                    {project.featured && (
                                        <span className={styles.featuredBadge}>
                                            <Star size={14} fill="currentColor" /> Featured
                                        </span>
                                    )}
                                </div>
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                    <div className={styles.tags}>
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="badge badge-primary">{tag}</span>
                                        ))}
                                    </div>
                                    <div className={styles.metrics}>
                                        <span><CheckCircle2 size={14} /> {project.metrics}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <h2 className={styles.ctaTitle}>Like What You See?</h2>
                    <p className={styles.ctaText}>Let's build something amazing together</p>
                    <a href="/contact" className="btn btn-primary btn-lg">
                        Get In Touch
                        <ArrowRight size={20} />
                    </a>
                </div>
            </section>
        </div>
    );
}
