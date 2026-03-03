import { useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import AllPatterns from './pages/AllPatterns'
import DeepDive from './pages/DeepDive'

const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
}

function AnimatedPage({ children }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}

export default function App() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                <Route path="/patterns" element={<AnimatedPage><AllPatterns /></AnimatedPage>} />
                <Route path="/deep-dive/:id" element={<AnimatedPage><DeepDive /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    )
}
