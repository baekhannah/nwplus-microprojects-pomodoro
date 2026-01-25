import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { PomodoroSettings } from '../hooks/usePomodoro';
import { Button } from './ui/button';

interface SettingsDialogProps {
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
}

export function SettingsDialog({ settings, onSave }: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleOpen = () => {
    setTempSettings(settings);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(tempSettings);
    setOpen(false);
  };

  const updateSetting = (key: keyof PomodoroSettings, value: string) => {
    const numValue = parseInt(value) || 1;
    setTempSettings((prev) => ({
      ...prev,
      [key]: Math.max(1, numValue),
    }));
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={handleOpen}
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#BBFFD4] p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#277645]">
                  Timer Settings
                </h2>
                <p className="text-sm text-[#2d5f4c] mt-1">
                  Customize your Pomodoro timer durations.  
                  Changes will reset the current session.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-[#277645] hover:opacity-70"
                aria-label="Close settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="grid gap-5">
              <SettingField
                label="Focus Duration (minutes)"
                value={tempSettings.workDuration}
                min={1}
                max={120}
                onChange={(v) => updateSetting('workDuration', v)}
              />

              <SettingField
                label="Short Break (minutes)"
                value={tempSettings.shortBreakDuration}
                min={1}
                max={60}
                onChange={(v) => updateSetting('shortBreakDuration', v)}
              />

              <SettingField
                label="Long Break (minutes)"
                value={tempSettings.longBreakDuration}
                min={1}
                max={120}
                onChange={(v) => updateSetting('longBreakDuration', v)}
              />

              <SettingField
                label="Sessions Until Long Break"
                value={tempSettings.sessionsUntilLongBreak}
                min={1}
                max={10}
                onChange={(v) =>
                  updateSetting('sessionsUntilLongBreak', v)
                }
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface SettingFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: string) => void;
}

function SettingField({
  label,
  value,
  min,
  max,
  onChange,
}: SettingFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[#277645]">
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-full border-2 border-[#277645] bg-white px-4 text-[#2d5f4c] focus:outline-none focus:ring-2 focus:ring-[#277645]/40"
      />
    </div>
  );
}
