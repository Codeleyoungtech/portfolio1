'use client';

import Image from 'next/image';
import styles from './TestimonialsMarquee.module.css';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        content: 'Eleazar transformed our vision into a stunning product. The attention to detail and technical expertise is unmatched!',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Founder, GrowthHub',
        content: 'Working with Eleazar was seamless. Delivered ahead of schedule and exceeded all expectations.',
        rating: 5,
    },
    {
        name: 'Amara Okafor',
        role: 'Marketing Director',
        content: 'The brand identity Eleazar created helped us stand out in a crowded market. Incredible work!',
        rating: 5,
    },
    {
        name: 'David Rodriguez',
        role: 'Product Manager',
        content: `Best developer I've worked with.Clean code, great communication, and genuine passion for the work.`,
        rating: 5,
    },
];

export default function TestimonialsMarquee() {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marquee}>
                <div className={styles.track}>
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.stars}>
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>
                            <p className={styles.content}>"{testimonial.content}"</p>
                            <div className={styles.author}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.name}>{testimonial.name}</div>
                                    <div className={styles.role}>{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
