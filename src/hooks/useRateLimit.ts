import { useState, useCallback, useEffect } from 'react';

interface RateLimitState {
    attempts: number;
    lastAttemptTime: number;
    isBlocked: boolean;
}

/**
 * Hook for client-side rate limiting
 * @param key Unique key for the rate limit (e.g., 'login', 'forgot-password')
 * @param maxAttempts Maximum allowed attempts before blocking
 * @param cooldownMs Time to wait after being blocked (in milliseconds)
 */
export function useRateLimit(key: string, maxAttempts: number = 5, cooldownMs: number = 60000) {
    const storageKey = `rate-limit-${key}`;

    const [state, setState] = useState<RateLimitState>(() => {
        if (typeof window === 'undefined') return { attempts: 0, lastAttemptTime: 0, isBlocked: false };

        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const parsed = JSON.parse(stored) as RateLimitState;
            const now = Date.now();

            // Check if cooldown has passed
            if (parsed.isBlocked && now - parsed.lastAttemptTime > cooldownMs) {
                return { attempts: 0, lastAttemptTime: 0, isBlocked: false };
            }
            return parsed;
        }
        return { attempts: 0, lastAttemptTime: 0, isBlocked: false };
    });

    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Update time left for cooldown
    useEffect(() => {
        if (!state.isBlocked) {
            setTimeLeft(0);
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const elapsed = now - state.lastAttemptTime;
            const remaining = Math.max(0, cooldownMs - elapsed);

            setTimeLeft(Math.ceil(remaining / 1000));

            if (remaining <= 0) {
                resetRateLimit();
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [state.isBlocked, state.lastAttemptTime, cooldownMs]);

    const incrementAttempts = useCallback(() => {
        const now = Date.now();
        setState(prev => {
            const newAttempts = prev.attempts + 1;
            const shouldBlock = newAttempts >= maxAttempts;

            const newState = {
                attempts: newAttempts,
                lastAttemptTime: now,
                isBlocked: shouldBlock
            };

            localStorage.setItem(storageKey, JSON.stringify(newState));
            return newState;
        });
    }, [maxAttempts, storageKey]);

    const resetRateLimit = useCallback(() => {
        const newState = { attempts: 0, lastAttemptTime: 0, isBlocked: false };
        localStorage.setItem(storageKey, JSON.stringify(newState));
        setState(newState);
        setTimeLeft(0);
    }, [storageKey]);

    return {
        isBlocked: state.isBlocked,
        attempts: state.attempts,
        timeLeft,
        incrementAttempts,
        resetRateLimit
    };
}
