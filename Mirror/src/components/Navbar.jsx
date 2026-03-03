import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 glass border-b border-border">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-accent/40 transition-shadow duration-300">
                        M
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">Mirror</span>
                </Link>

                {/* Nav links */}
                <nav className="flex items-center gap-1">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-accent/20 text-accentGlow'
                                : 'text-muted hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/patterns"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-accent/20 text-accentGlow'
                                : 'text-muted hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        All Patterns
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
