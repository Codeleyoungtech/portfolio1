import { Code2, Users2, Youtube, Rocket, TrendingUp, CheckCircle2, Hand } from 'lucide-react';
import ProjectCarousel from './components/ProjectCarousel';
import ImpactMetrics from './components/ImpactMetrics';
import TestimonialsMarquee from './components/TestimonialsMarquee';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.greeting}>
                <Hand size={20} className={styles.wave} /> Hey, I'm Eleazar
              </div>
              <h1 className={styles.title}>
                Building Products People <span className="gradient-text">Actually Use</span>
              </h1>
              <p className={styles.subtitle}>
                Full-stack developer, content creator, and founder of Eleyoungtech —
                reaching 15K+ developers worldwide through practical tech education
              </p>
              <div className={styles.ctas}>
                <a href="/work" className="btn btn-primary">
                  <Code2 size={20} />
                  View My Work
                </a>
                <a href="/contact" className="btn btn-secondary">
                  <Users2 size={20} />
                  Book a Call
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <ProjectCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Featured Projects */}
      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>SELECTED WORKS</span>
            <h2 className={styles.sectionTitle}>Projects That Made an Impact</h2>
            <p className={styles.sectionDescription}>
              From concept to launch, here's how I've helped brands and businesses grow
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {[
              {
                image: '/projects/younal-analytics.png',
                icon: <TrendingUp size={32} />,
                title: 'YouTube Analytics Pro',
                description: 'AI-powered analytics platform helping 500+ creators optimize content strategy',
                tags: ['React', 'Node.js', 'AI'],
                metrics: [
                  '500+ active users',
                  '45% avg. channel growth',
                  '4.8/5 rating'
                ]
              },
              {
                image: '/projects/eleyoungtechpreview.png',
                icon: <Youtube size={32} />,
                title: 'Eleyoungtech Brand',
                description: 'Built cohesive brand identity from scratch, unified presence across platforms',
                tags: ['Branding', 'YouTube', 'Design'],
                metrics: [
                  '15K+ subscribers',
                  '300% follower growth',
                  '2M+ impressions'
                ]
              },
              {
                image: '/projects/precious-fruit-preview.png',
                icon: <Rocket size={32} />,
                title: 'Precious Fruit School',
                description: 'Modern school website with integrated CMS and admin dashboard',
                tags: ['Next.js', 'CMS', 'SEO'],
                metrics: [
                  '180% more inquiries',
                  '95 PageSpeed score',
                  '60% bounce rate ↓'
                ]
              }
            ].map((project, i) => (
              <div key={i} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.projectIcon}>{project.icon}</div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, j) => (
                      <span key={j} className="badge badge-primary">{tag}</span>
                    ))}
                  </div>
                  <div className={styles.projectMetrics}>
                    {project.metrics.map((metric, j) => (
                      <div key={j} className={styles.metric}>
                        <CheckCircle2 size={16} />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewAllCta}>
            <a href="/work" className="btn btn-primary btn-lg">
              View All 50+ Projects
              <Code2 size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>CLIENT LOVE</span>
            <h2 className={styles.sectionTitle}>What People Are Saying</h2>
          </div>
        </div>
        <TestimonialsMarquee />
      </section>

      {/* About + YouTube Preview */}
      <section className={styles.previewSection}>
        <div className="container">
          <div className={styles.previewGrid}>
            {/* About */}
            <div className={styles.aboutCard}>
              <Users2 size={48} />
              <h3>About Me</h3>
              <p>
                Full-stack developer and content creator passionate about building
                products that solve real problems.
              </p>
              <a href="/about" className="btn btn-secondary">
                Learn More About Me →
              </a>
            </div>

            {/* YouTube */}
            <div className={styles.youtubeCard}>
              <Youtube size={48} />
              <h3>Eleyoungtech Channel</h3>
              <p>
                Teaching 15K+ developers through practical tutorials and tech reviews.
              </p>
              <div className={styles.youtubeStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>15K+</div>
                  <div className={styles.statLabel}>Subscribers</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>500+</div>
                  <div className={styles.statLabel}>Videos</div>
                </div>
              </div>
              <a href="https://youtube.com/@eleyoungtech" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Subscribe on YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <Rocket size={64} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Ready to Build Something Amazing?</h2>
          <p className={styles.ctaSubtitle}>
            Let's turn your idea into reality. Book a free 30-minute consultation.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className="btn btn-primary btn-lg">Book a Call</a>
            <a href="/contact" className="btn btn-secondary btn-lg">Send a Message</a>
          </div>
        </div>
      </section>
    </div>
  );
}
