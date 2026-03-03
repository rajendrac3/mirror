import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
    BarChart, Bar, Cell, XAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import patterns from '../data/mockPatterns.json'

/* ─── Trigger colour map ─────────────────────────────────────── */
const TRIGGER_COLOR = {
    habitual: '#4F8EF7',
    emotional: '#F5A623',
    fatigue: '#3ECFCF',
    intentional: '#5DBF7A',
}
const TRIGGER_LABEL = {
    habitual: 'Habitual',
    emotional: 'Emotional',
    fatigue: 'Fatigue',
    intentional: 'Intentional',
}

const HOUR_LABELS = [
    '6a', '7a', '8a', '9a', '10a', '11a', '12p',
    '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p',
    '9p', '10p', '11p', '12a', '1a', '2a',
]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/* ─── Scroll progress hook ───────────────────────────────────── */
function useScrollProgress() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            const scrolled = el.scrollTop
            const total = el.scrollHeight - el.clientHeight
            setProgress(total > 0 ? scrolled / total : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return progress
}

/* ─── Skeleton block ─────────────────────────────────────────── */
function Skeleton({ w = '100%', h = 16, style = {} }) {
    return (
        <div
            className="skeleton"
            aria-hidden="true"
            style={{ width: w, height: h, borderRadius: 8, ...style }}
        />
    )
}

/* ─── Skeleton screen for DeepDive ──────────────────────────── */
function DeepDiveSkeleton() {
    return (
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <Skeleton w={60} h={60} style={{ borderRadius: '50%' }} />
                <Skeleton w={240} h={32} />
                <Skeleton w={120} h={16} />
                <Skeleton w={80} h={26} style={{ borderRadius: 999 }} />
            </div>
            {/* Cards */}
            {[200, 180, 160, 140, 120].map((h, i) => (
                <div key={i} style={{ background: '#1A1A24', borderRadius: 16, padding: 24 }}>
                    <Skeleton w={140} h={12} style={{ marginBottom: 20 }} />
                    <Skeleton w="100%" h={h} />
                </div>
            ))}
        </div>
    )
}

/* ─── Custom Recharts tooltip ────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    return (
        <div style={{
            background: '#1A1A24', border: '1px solid #2A2A3A',
            borderRadius: 8, padding: '6px 12px', fontSize: 12,
        }}>
            <p style={{ color: '#ADADC4', margin: 0 }}>{label}</p>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{payload[0].value}</p>
        </div>
    )
}

/* ─── Shared card ────────────────────────────────────────────── */
function Card({ children, accentColor, style = {} }) {
    return (
        <div style={{
            background: '#1A1A24',
            borderRadius: 16,
            padding: 24,
            borderLeft: accentColor ? `3px solid ${accentColor}` : undefined,
            border: accentColor ? undefined : '1px solid #ffffff08',
            ...style,
        }}>
            {children}
        </div>
    )
}

/* ─── Section label ──────────────────────────────────────────── */
function SectionLabel({ children, color, id }) {
    return (
        <p
            id={id}
            style={{
                color,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 16px',
            }}
        >
            {children}
        </p>
    )
}

/* ─── Trigger badge ──────────────────────────────────────────── */
function TriggerBadge({ type, color }) {
    return (
        <span
            aria-label={`Trigger type: ${TRIGGER_LABEL[type]}`}
            style={{
                display: 'inline-block',
                padding: '3px 12px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                color,
                background: `${color}33`,
            }}
        >
            {TRIGGER_LABEL[type]}
        </span>
    )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function DeepDive() {
    const { id } = useParams()
    const pattern = patterns.find(p => p.id === id)

    /* 400ms skeleton delay */
    const [ready, setReady] = useState(false)
    useEffect(() => {
        setReady(false)
        const t = setTimeout(() => setReady(true), 400)
        return () => clearTimeout(t)
    }, [id])

    const progress = useScrollProgress()
    const color = pattern ? TRIGGER_COLOR[pattern.triggerType] : '#4F8EF7'

    if (!pattern) return <Navigate to="/patterns" replace />

    /* Chart data */
    const chartData = HOUR_LABELS.map((hour, i) => ({
        hour,
        value: pattern.hourlyData[i] ?? 0,
        highlighted: i >= pattern.patternHighlight.startHour && i <= pattern.patternHighlight.endHour,
    }))
    const xTicks = HOUR_LABELS.filter((_, i) => i % 3 === 0)

    return (
        <div
            style={{ minHeight: '100vh', background: '#0F0F14', fontFamily: 'Inter, sans-serif' }}
            className="page-wrap"
        >
            {/* ── Scroll progress bar ──────────────────────────────── */}
            <div
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Page scroll progress"
                className="scroll-progress"
                style={{
                    width: '100%',
                    background: `${color}22`,
                }}
            >
                <div
                    style={{
                        height: 3,
                        width: `${progress * 100}%`,
                        background: color,
                        transition: 'width 0.05s linear',
                    }}
                />
            </div>

            {/* ── Skeleton → content fade ───────────────────────────── */}
            <div
                style={{
                    opacity: ready ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: ready ? 'auto' : 'none',
                    position: 'relative',
                }}
                aria-busy={!ready}
                aria-live="polite"
            >
                {!ready && (
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <DeepDiveSkeleton />
                    </div>
                )}

                <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>

                    {/* ── S1: Header ─────────────────────────────────────── */}
                    <div>
                        <Link
                            to="/patterns"
                            aria-label="Back to All Patterns"
                            style={{
                                display: 'inline-block',
                                color: '#ADADC4',
                                fontSize: 14,
                                textDecoration: 'none',
                                marginBottom: 32,
                                '--focus-color': color,
                            }}
                            onMouseEnter={e => e.target.style.color = '#fff'}
                            onMouseLeave={e => e.target.style.color = '#ADADC4'}
                        >
                            ← All Patterns
                        </Link>

                        <header style={{ textAlign: 'center' }}>
                            <div
                                aria-hidden="true"
                                style={{ fontSize: 48, lineHeight: 1, marginBottom: 16 }}
                            >
                                {pattern.moodEmoji}
                            </div>
                            <h1
                                style={{
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: 'clamp(24px, 5vw, 32px)',
                                    margin: '0 0 8px',
                                    lineHeight: 1.2,
                                }}
                            >
                                {pattern.name}
                            </h1>
                            <p style={{ color: '#ADADC4', fontSize: 15, margin: '0 0 14px' }}>
                                {pattern.timeWindow}
                            </p>
                            <TriggerBadge type={pattern.triggerType} color={color} />
                        </header>
                    </div>

                    {/* ── S2: Story Card ─────────────────────────────────── */}
                    <Card accentColor={color}>
                        <SectionLabel color={color} id="story-label">Your Pattern Story</SectionLabel>
                        <p
                            aria-labelledby="story-label"
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontStyle: 'italic',
                                lineHeight: 1.75,
                                margin: 0,
                            }}
                        >
                            {pattern.storyText}
                        </p>
                    </Card>

                    {/* ── S3: Chart ─────────────────────────────────────── */}
                    <Card>
                        <SectionLabel color={color} id="chart-label">Trigger Analysis</SectionLabel>
                        <div
                            role="img"
                            aria-labelledby="chart-label"
                            aria-label={`Hourly activity bar chart for ${pattern.name}. Peak window from ${HOUR_LABELS[pattern.patternHighlight.startHour]} to ${HOUR_LABELS[pattern.patternHighlight.endHour]}.`}
                        >
                            <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={chartData} barCategoryGap="20%">
                                    <XAxis
                                        dataKey="hour"
                                        ticks={xTicks}
                                        tick={{ fill: '#ADADC4', fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                                    />
                                    <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                                        {chartData.map((entry, i) => (
                                            <Cell
                                                key={i}
                                                fill={entry.highlighted ? color : `${color}40`}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
                            <TriggerBadge type={pattern.triggerType} color={color} />
                            <span style={{ color: '#ADADC4', fontSize: 13 }}>
                                {pattern.confidence}% confidence this pattern is real
                            </span>
                        </div>
                    </Card>

                    {/* ── S4: App Breakdown ─────────────────────────────── */}
                    <Card>
                        <SectionLabel color={color} id="apps-label">During This Pattern</SectionLabel>
                        <ul
                            aria-labelledby="apps-label"
                            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}
                        >
                            {pattern.topApps.map(app => (
                                <li key={app.name} aria-label={`${app.name}: ${app.minutes} minutes, behavior: ${app.behaviorTag}`}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{app.name}</span>
                                        <span style={{
                                            color: '#ADADC4', fontSize: 11,
                                            background: '#ffffff0d', padding: '2px 8px', borderRadius: 999,
                                        }}>
                                            {app.behaviorTag}
                                        </span>
                                        <span style={{ color, fontSize: 13, fontWeight: 600, marginLeft: 'auto' }}>
                                            {app.minutes}m
                                        </span>
                                    </div>
                                    <div
                                        role="progressbar"
                                        aria-valuenow={Math.round(app.proportion * 100)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${app.name} usage: ${Math.round(app.proportion * 100)}%`}
                                        style={{ height: 6, background: '#ffffff0d', borderRadius: 999, overflow: 'hidden' }}
                                    >
                                        <div style={{
                                            height: '100%',
                                            width: `${app.proportion * 100}%`,
                                            background: `${color}99`,
                                            borderRadius: 999,
                                            transition: 'width 0.6s ease',
                                        }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* ── S5: Reflection ────────────────────────────────── */}
                    <Card>
                        <SectionLabel color={color} id="reflect-label">Reflect</SectionLabel>
                        <p
                            aria-labelledby="reflect-label"
                            style={{
                                color: '#fff',
                                fontSize: 20,
                                fontStyle: 'italic',
                                lineHeight: 1.6,
                                margin: '0 0 20px',
                            }}
                        >
                            {pattern.reflectionPrompt}
                        </p>
                        <textarea
                            rows={4}
                            placeholder="Write your thoughts (private, not saved)..."
                            aria-label="Reflection journal — private, not saved"
                            style={{
                                '--focus-color': color,
                                width: '100%',
                                background: '#0F0F14',
                                border: '1px solid #2A2A3A',
                                borderRadius: 10,
                                padding: '12px 14px',
                                color: '#fff',
                                fontSize: 15,
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: 1.6,
                                resize: 'vertical',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s ease',
                            }}
                            onFocus={e => e.target.style.borderColor = `${color}99`}
                            onBlur={e => e.target.style.borderColor = '#2A2A3A'}
                        />
                    </Card>

                    {/* ── S6: Pattern History ───────────────────────────── */}
                    <Card>
                        <SectionLabel color={color} id="history-label">Pattern History</SectionLabel>
                        <div
                            role="list"
                            aria-labelledby="history-label"
                            style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}
                        >
                            {DAYS.map((day, i) => {
                                const active = pattern.weeklyHistory[i] === 1
                                return (
                                    <div
                                        key={day}
                                        role="listitem"
                                        aria-label={`${day}: ${active ? 'pattern active' : 'no activity'}`}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
                                    >
                                        <div style={{
                                            width: 40, height: 40, borderRadius: '50%',
                                            background: active ? color : 'transparent',
                                            border: `2px solid ${active ? color : '#2A2A3A'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.2s ease',
                                            boxShadow: active ? `0 0 14px ${color}55` : 'none',
                                        }}>
                                            {active && (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                                    aria-hidden="true">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span style={{ color: '#ADADC4', fontSize: 11 }}>{day}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <p style={{ color: '#ADADC4', fontSize: 14, fontStyle: 'italic', margin: 0 }}>
                            It's consistent — which means it's understandable.
                        </p>
                    </Card>

                </div>
            </div>

            {/* Show skeleton while loading */}
            {!ready && (
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <DeepDiveSkeleton />
                </div>
            )}
        </div>
    )
}
