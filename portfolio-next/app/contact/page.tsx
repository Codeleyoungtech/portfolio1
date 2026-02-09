'use client';

import { useState } from 'react';
import { Mail, Linkedin, Twitter, Youtube, Calendar, Send, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'general',
        message: '',
        budget: '',
    });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: 'general', message: '', budget: '' });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.eyebrow}>GET IN TOUCH</span>
                        <h1 className={styles.title}>
                            Let's Build Something <span className="gradient-text">Amazing</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Have a project in mind? Let's discuss how we can work together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Priority: Book a Call */}
                        <div className={styles.priorityCard}>
                            <div className={styles.priorityBadge}>
                                <Clock size={16} />
                                Fastest Response
                            </div>
                            <Calendar size={48} />
                            <h3>Book a Free Consultation</h3>
                            <p>
                                Schedule a 30-minute call to discuss your project. Pick a time that works for you.
                            </p>
                            <a
                                href="https://calendly.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                Book a Call
                                <Calendar size={20} />
                            </a>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formCard}>
                            <Mail size={48} />
                            <h3>Send a Message</h3>
                            <p>Prefer email? I'll get back to you within 24 hours</p>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className="form-group">
                                    <label className="form-label">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="project">New Project</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="speaking">Speaking/Workshop</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Budget (Optional)</label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="e.g., $5K - $10K"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea"
                                        placeholder="Tell me about your project..."
                                        rows={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={status === 'sending'}
                                    style={{ width: '100%' }}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    <Send size={20} />
                                </button>

                                {status === 'success' && (
                                    <div className={styles.successMessage}>
                                        ✓ Message sent! I'll respond within 24 hours.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Contact Info */}
            <section className={styles.infoSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Other Ways to Reach Me</h2>
                    <div className={styles.infoGrid}>
                        <a href="mailto:hi@eleazarogoyemi.com" className={styles.contactItem}>
                            <Mail size={24} />
                            <div>
                                <div className={styles.contactLabel}>Email</div>
                                <div className={styles.contactValue}>hi@eleazarogoyemi.com</div>
                            </div>
                        </a>
                        <a href="https://linkedin.com/in/eleazarogoyemi" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                            <Linkedin size={24} />
                            <div>
                                <div className={styles.contactLabel}>LinkedIn</div>
                                <div className={styles.contactValue}>@eleazarogoyemi</div>
                            </div>
                        </a>
                        <a href="https://twitter.com/eleyoungtech" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                            <Twitter size={24} />
                            <div>
                                <div className={styles.contactLabel}>Twitter</div>
                                <div className={styles.contactValue}>@eleyoungtech</div>
                            </div>
                        </a>
                        <a href="https://youtube.com/@eleyoungtech" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                            <Youtube size={24} />
                            <div>
                                <div className={styles.contactLabel}>YouTube</div>
                                <div className={styles.contactValue}>@eleyoungtech</div>
                            </div>
                        </a>
                    </div>

                    {/* Response Guarantee */}
                    <div className={styles.guarantee}>
                        <Clock size={32} />
                        <div>
                            <h3>24-Hour Response Guarantee</h3>
                            <p>I typically respond to all inquiries within 24 hours (Monday - Friday)</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
