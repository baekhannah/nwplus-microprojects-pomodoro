import { useState, useEffect, useCallback, useRef } from 'react';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export interface PomodoroSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

export interface PomodoroState {
  timeLeft: number; // in seconds
  isRunning: boolean;
  sessionType: SessionType;
  completedSessions: number;
  settings: PomodoroSettings;
  showReward: boolean;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
};

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get duration for current session type
  const getCurrentDuration = useCallback((type: SessionType) => {
    switch (type) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
    }
  }, [settings]);

  // Timer tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer completed
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (sessionType === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      // Show reward modal
      setShowReward(true);
      
      // Determine next break type
      if (newCompletedSessions % settings.sessionsUntilLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(getCurrentDuration('longBreak'));
      } else {
        setSessionType('shortBreak');
        setTimeLeft(getCurrentDuration('shortBreak'));
      }
    } else {
      // Break finished, back to work
      setSessionType('work');
      setTimeLeft(getCurrentDuration('work'));
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(getCurrentDuration(sessionType));
  };

  const skip = () => {
    setIsRunning(false);
    
    if (sessionType === 'work') {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % settings.sessionsUntilLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(getCurrentDuration('longBreak'));
      } else {
        setSessionType('shortBreak');
        setTimeLeft(getCurrentDuration('shortBreak'));
      }
    } else {
      setSessionType('work');
      setTimeLeft(getCurrentDuration('work'));
    }
  };

  const setCustomTime = (minutes: number) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const closeRewardModal = () => {
    setShowReward(false);
  };

  const updateSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    setSessionType('work');
    setTimeLeft(newSettings.workDuration * 60);
    setCompletedSessions(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (() => {
    const totalDuration = getCurrentDuration(sessionType);
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  })();

  return {
    timeLeft,
    isRunning,
    sessionType,
    completedSessions,
    settings,
    progress,
    showReward,
    formatTime,
    start,
    pause,
    reset,
    skip,
    setCustomTime,
    closeRewardModal,
    updateSettings,
  };
}