import { useNavigate } from 'react-router-dom'

const TRIGGER_CONFIG = {
    habitual: { color: '#4F8EF7', label: 'Habitual' },
    emotional: { color: '#F5A623', label: 'Emotional' },
    fatigue: { color: '#3ECFCF', label: 'Fatigue' },
    intentional: { color: '#5DBF7A', label: 'Intentional' },
}

export default function PatternCard({ pattern }) {
    const navigate = useNavigate()
    const { color, label } = TRIGGER_CONFIG[pattern.triggerType] ?? TRIGGER_CONFIG.habitual

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`View deep dive for ${pattern.name}, a ${label} pattern on ${pattern.topApp}`}
            onClick={() => navigate(`/deep-dive/${pattern.id}`)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/deep-dive/${pattern.id}`)}
            className="card-focusable"
            style={{
                '--card-color': color,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                cursor: 'pointer',
                userSelect: 'none',
                background: '#1A1A24',
                borderRadius: 16,
                padding: 20,
                minWidth: 160,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid #ffffff08',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.boxShadow = `0 0 28px ${color}44`
                e.currentTarget.style.borderColor = `${color}33`
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#ffffff08'
            }}
        >
            {/* Emoji */}
            <span style={{ fontSize: 32, lineHeight: 1 }} aria-hidden="true">
                {pattern.moodEmoji}
            </span>

            {/* Name */}
            <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, margin: 0, lineHeight: 1.3 }}>
                {pattern.name}
            </p>

            {/* Time window */}
            <p style={{ color: '#ADADC4', fontSize: 12, margin: 0 }}>
                {pattern.timeWindow}
            </p>

            {/* Trigger badge */}
            <span style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                color,
                background: `${color}33`,
            }}>
                {label}
            </span>

            {/* Top app */}
            <p style={{ color: '#ADADC4', fontSize: 12, margin: 0, marginTop: 'auto' }}>
                {pattern.topApp}
            </p>
        </div>
    )
}
