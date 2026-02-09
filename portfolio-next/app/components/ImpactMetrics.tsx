'use client';

import { useState, useEffect, useRef } from 'react';
import { Code2, Users2, Youtube, Rocket } from 'lucide-react';
import styles from './ImpactMetrics.module.css';

interface Metric {
    number: string;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    target: number;
}

const metrics: Metric[] = [
    { number: '50+', label: 'Projects Completed', sublabel: 'Across web, mobile, and brand design', icon: <Code2 size={28} />, target: 50 },
    { number: '25+', label: 'Happy Clients', sublabel: 'Startups to enterprise companies', icon: <Users2 size={28} />, target: 25 },
    { number: '15K+', label: 'YouTube Subscribers', sublabel: 'Teaching tech to the world', icon: <Youtube size={28} />, target: 15000 },
    { number: '2M+', label: 'Impressions Generated', sublabel: 'Across all platforms and projects', icon: <Rocket size={28} />, target: 2000000 },
];

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
}

function easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
}

export default function ImpactMetrics() {
    const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easedProgress = easeOutQuart(progress);

            setCounts(metrics.map(m => Math.floor(m.target * easedProgress)));

            if (currentStep >= steps) {
                clearInterval(interval);
                setCounts(metrics.map(m => m.target));
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={styles.icon}>{metric.icon}</div>
                            <div className={styles.number}>
                                {isVisible ? formatNumber(counts[index]) : metric.number}
                            </div>
                            <div className={styles.label}>{metric.label}</div>
                            <div className={styles.sublabel}>{metric.sublabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
