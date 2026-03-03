import patterns from '../data/mockPatterns.json'
import PatternCard from '../components/PatternCard'

export default function Home() {
    return (
        <div
            style={{ minHeight: '100vh', background: '#0F0F14', fontFamily: 'Inter, sans-serif' }}
            className="page-wrap"
        >
            <div style={{ maxWidth: 800, margin: '0 auto' }}>

                {/* Nav */}
                <nav
                    aria-label="Site navigation"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 56,
                    }}
                >
                    <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 20 }}>Mirror</span>
                    <span style={{ color: '#ADADC4', fontSize: 14 }}>understand your patterns</span>
                </nav>

                {/* Hero */}
                <section aria-labelledby="hero-heading" style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h1
                        id="hero-heading"
                        style={{
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: 'clamp(22px, 5vw, 32px)',
                            lineHeight: 1.3,
                            margin: '0 0 12px',
                        }}
                    >
                        Here's what your phone reveals about your week.
                    </h1>
                    <p style={{ color: '#ADADC4', fontSize: 15, margin: 0 }}>
                        5 behavioral patterns detected
                    </p>
                </section>

                {/* Horizontal scroll row */}
                <section aria-label="Pattern cards">
                    <div
                        className="hide-scrollbar"
                        style={{
                            display: 'flex',
                            gap: 14,
                            overflowX: 'auto',
                            paddingBottom: 4,
                        }}
                    >
                        {patterns.map(pattern => (
                            <PatternCard key={pattern.id} pattern={pattern} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}
