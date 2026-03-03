import { useState } from 'react'
import patterns from '../data/mockPatterns.json'
import PatternCard from '../components/PatternCard'

const TRIGGER_COLOR = {
    habitual: '#4F8EF7',
    emotional: '#F5A623',
    fatigue: '#3ECFCF',
    intentional: '#5DBF7A',
}

const TABS = [
    { key: 'all', label: 'All' },
    { key: 'habitual', label: 'Habitual' },
    { key: 'emotional', label: 'Emotional' },
    { key: 'fatigue', label: 'Fatigue' },
    { key: 'intentional', label: 'Intentional' },
]

export default function AllPatterns() {
    const [active, setActive] = useState('all')
    const [visible, setVisible] = useState(true)

    function handleTab(key) {
        if (key === active) return
        setVisible(false)
        setTimeout(() => { setActive(key); setVisible(true) }, 200)
    }

    const filtered = active === 'all'
        ? patterns
        : patterns.filter(p => p.triggerType === active)

    const activeColor = active === 'all' ? '#ffffff' : TRIGGER_COLOR[active]

    return (
        <div
            style={{ minHeight: '100vh', background: '#0F0F14', fontFamily: 'Inter, sans-serif' }}
            className="page-wrap"
        >
            <div style={{ maxWidth: 800, margin: '0 auto' }}>

                {/* Nav */}
                <nav aria-label="Site navigation" style={{ marginBottom: 32 }}>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: 20, margin: 0 }}>Mirror</p>
                </nav>

                {/* Title + subtitle */}
                <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 24, margin: '0 0 6px' }}>
                    Your Patterns This Week
                </h1>
                <p style={{ color: '#ADADC4', fontSize: 14, margin: '0 0 28px' }}>
                    5 behavioral patterns detected
                </p>

                {/* Filter tabs */}
                <div
                    role="tablist"
                    aria-label="Filter patterns by type"
                    style={{
                        display: 'flex',
                        gap: 0,
                        borderBottom: '1px solid #2A2A3A',
                        marginBottom: 28,
                        overflowX: 'auto',
                    }}
                    className="hide-scrollbar"
                >
                    {TABS.map(tab => {
                        const isActive = tab.key === active
                        const underlineColor = tab.key === 'all' ? '#ffffff' : TRIGGER_COLOR[tab.key]
                        return (
                            <button
                                key={tab.key}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls="pattern-grid"
                                onClick={() => handleTab(tab.key)}
                                style={{
                                    '--focus-color': underlineColor,
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: isActive
                                        ? `2px solid ${underlineColor}`
                                        : '2px solid transparent',
                                    marginBottom: -1,
                                    padding: '10px 16px',
                                    color: isActive ? '#fff' : '#ADADC4',
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.15s ease, border-color 0.15s ease',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff' }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#ADADC4' }}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Grid */}
                <div
                    id="pattern-grid"
                    role="tabpanel"
                    aria-live="polite"
                    aria-label={`${active === 'all' ? 'All' : active} patterns`}
                    className="pattern-grid"
                    style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
                >
                    {filtered.map(pattern => (
                        <PatternCard key={pattern.id} pattern={pattern} />
                    ))}
                </div>

            </div>
        </div>
    )
}
