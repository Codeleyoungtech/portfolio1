'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './ProjectCarousel.module.css';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}

const projects: Project[] = [
    {
        id: 'youtube-analytics',
        title: 'YouTube Analytics Pro',
        description: 'AI-powered analytics platform',
        image: '/projects/younal-analytics.png',
        category: 'Web Application',
    },
    {
        id: 'eleyoungtech',
        title: 'Eleyoungtech Brand',
        description: 'Building 15K+ YouTube community',
        image: '/projects/eleyoungtechpreview.png',
        category: 'Branding',
    },
    {
        id: 'precious-fruit',
        title: 'Precious Fruit School',
        description: 'Modern school website & CMS',
        image: '/projects/precious-fruit-preview.png',
        category: 'Web Development',
    },
];

export default function ProjectCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(nextSlide, 4500);
            return () => clearInterval(interval);
        }
    }, [isHovered, nextSlide]);

    return (
        <div
            className={styles.carousel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.slideContainer}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className={styles.image}
                                priority={index === 0}
                            />
                            <div className={styles.overlay}>
                                <span className={styles.category}>{project.category}</span>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className={styles.navigation}>
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide Indicator */}
            <div className={styles.indicator}>
                {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
        </div>
    );
}
