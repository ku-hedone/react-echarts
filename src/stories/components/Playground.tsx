import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

interface SelectOption {
  label: string;
  value: string | number;
}

interface ControlBase {
  label: string;
  key: string;
}

interface TextControl extends ControlBase {
  type: 'text';
  value: string;
  onChange: (value: string) => void;
}

interface NumberControl extends ControlBase {
  type: 'number';
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

interface BooleanControl extends ControlBase {
  type: 'boolean';
  value: boolean;
  onChange: (value: boolean) => void;
}

interface SelectControl extends ControlBase {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

interface ColorControl extends ControlBase {
  type: 'color';
  value: string;
  onChange: (value: string) => void;
}

interface RangeControl extends ControlBase {
  type: 'range';
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

type Control =
  | TextControl
  | NumberControl
  | BooleanControl
  | SelectControl
  | ColorControl
  | RangeControl;

interface ControlGroup {
  title: string;
  controls: Control[];
  defaultCollapsed?: boolean;
}

interface PlaygroundProps {
  title: string;
  description?: string;
  children: ReactNode;
  controlGroups: ControlGroup[];
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

// ============================================================================
// Control Renderer
// ============================================================================

function ControlRenderer({ control }: { control: Control }) {
  const wrapper = (children: ReactNode) => (
    <div className="playground-control" key={control.key}>
      {children}
    </div>
  );

  switch (control.type) {
    case 'text':
      return wrapper(
        <>
          <label className="playground-control-label">{control.label}</label>
          <input
            type="text"
            className="playground-control-input"
            value={control.value}
            onChange={e => control.onChange(e.target.value)}
          />
        </>,
      );
    case 'number':
      return wrapper(
        <>
          <label className="playground-control-label">{control.label}</label>
          <input
            type="number"
            className="playground-control-input"
            value={control.value}
            min={control.min}
            max={control.max}
            step={control.step}
            onChange={e => control.onChange(Number(e.target.value))}
          />
        </>,
      );
    case 'boolean':
      return wrapper(
        <label className="playground-control-label playground-control-label--checkbox">
          <input
            type="checkbox"
            checked={control.value}
            onChange={e => control.onChange(e.target.checked)}
          />
          <span>{control.label}</span>
        </label>,
      );
    case 'select':
      return wrapper(
        <>
          <label className="playground-control-label">{control.label}</label>
          <select
            className="playground-control-select"
            value={control.value}
            onChange={e => control.onChange(e.target.value)}
          >
            {control.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>,
      );
    case 'color':
      return wrapper(
        <>
          <label className="playground-control-label">{control.label}</label>
          <div className="playground-control-color">
            <input
              type="color"
              value={control.value}
              onChange={e => control.onChange(e.target.value)}
            />
            <span className="playground-control-color-value">{control.value}</span>
          </div>
        </>,
      );
    case 'range':
      return wrapper(
        <>
          <label className="playground-control-label">
            {control.label}
            <span className="playground-control-value">{control.value}</span>
          </label>
          <input
            type="range"
            className="playground-control-range"
            value={control.value}
            min={control.min}
            max={control.max}
            step={control.step || 1}
            onChange={e => control.onChange(Number(e.target.value))}
          />
        </>,
      );
    default:
      return null;
  }
}

// ============================================================================
// Collapsible Group Component
// ============================================================================

function CollapsibleGroup({
  title,
  children,
  defaultCollapsed = false,
}: {
  title: string;
  children: ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="playground-group">
      <button
        className="playground-group-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <span className={`playground-group-arrow ${isCollapsed ? 'collapsed' : ''}`}>
          ▼
        </span>
        <span>{title}</span>
      </button>
      {!isCollapsed && <div className="playground-group-content">{children}</div>}
    </div>
  );
}

// ============================================================================
// Main Playground Component
// ============================================================================

const GRADIENT_DARK =
  'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)';
const GRADIENT_LIGHT =
  'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.04) 0%, transparent 50%)';
const GRADIENT_BTN_DARK =
  'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)';
const GRADIENT_BTN_LIGHT =
  'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)';

export function Playground({
  title,
  description,
  children,
  controlGroups,
  theme = 'light',
  onThemeChange,
}: PlaygroundProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className="playground"
      style={{
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
        borderColor: isDark ? '#334155' : '#e2e8f0',
      }}
    >
      {/* Header */}
      <div className="playground-header">
        <div>
          <h2 className="playground-title">{title}</h2>
          {description && <p className="playground-description">{description}</p>}
        </div>
        <div className="playground-header-actions">
          {onThemeChange && (
            <button
              className="playground-theme-toggle"
              onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
              type="button"
              style={{
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#f8fafc' : '#0f172a',
                background: isDark ? GRADIENT_BTN_DARK : GRADIENT_BTN_LIGHT,
              }}
            >
              {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'}
            </button>
          )}
        </div>
      </div>

      {/* Chart Preview */}
      <div
        className="playground-preview"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#f8fafc',
          backgroundImage: isDark ? GRADIENT_DARK : GRADIENT_LIGHT,
        }}
      >
        {children}
      </div>

      {/* Controls Panel */}
      <div className="playground-controls">
        {controlGroups.map(group => (
          <CollapsibleGroup
            key={group.title}
            title={group.title}
            defaultCollapsed={group.defaultCollapsed}
          >
            <div className="playground-controls-grid">
              {group.controls.map(control => (
                <ControlRenderer key={control.key} control={control} />
              ))}
            </div>
          </CollapsibleGroup>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// usePlaygroundState Hook
// ============================================================================

export function usePlaygroundState<T extends Record<string, any>>(
  initialState: T,
): [T, <K extends keyof T>(key: K, value: T[K]) => void] {
  const [state, setState] = useState<T>(initialState);

  const updateState = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  return [state, updateState];
}

// ============================================================================
// Control Factory Helpers
// ============================================================================

type Updater<T> = <K extends keyof T>(key: K, value: T[K]) => void;

/** Create a boolean control */
export function bool<T>(
  state: T,
  update: Updater<T>,
  key: keyof T & string,
  label: string,
): BooleanControl {
  return {
    type: 'boolean',
    key,
    label,
    value: state[key] as boolean,
    onChange: v => update(key, v as T[keyof T]),
  };
}

/** Create a text control */
export function text<T>(
  state: T,
  update: Updater<T>,
  key: keyof T & string,
  label: string,
): TextControl {
  return {
    type: 'text',
    key,
    label,
    value: state[key] as string,
    onChange: v => update(key, v as T[keyof T]),
  };
}

/** Create a range control */
export function range<T>(
  state: T,
  update: Updater<T>,
  key: keyof T & string,
  label: string,
  min: number,
  max: number,
  step = 1,
): RangeControl {
  return {
    type: 'range',
    key,
    label,
    value: state[key] as number,
    min,
    max,
    step,
    onChange: v => update(key, v as T[keyof T]),
  };
}

/** Create a color control */
export function color<T>(
  state: T,
  update: Updater<T>,
  key: keyof T & string,
  label: string,
): ColorControl {
  return {
    type: 'color',
    key,
    label,
    value: state[key] as string,
    onChange: v => update(key, v as T[keyof T]),
  };
}

/** Create a select control */
export function select<T>(
  state: T,
  update: Updater<T>,
  key: keyof T & string,
  label: string,
  options: SelectOption[],
): SelectControl {
  return {
    type: 'select',
    key,
    label,
    value: state[key] as string,
    options,
    onChange: v => update(key, v as T[keyof T]),
  };
}

/** Create the common "基础配置" control group shared by all chart playgrounds */
export function makeBaseControls<T extends Record<string, any>>(
  state: T,
  update: Updater<T>,
): ControlGroup {
  return {
    title: '基础配置',
    controls: [
      bool(state, update, 'showTitle' as keyof T & string, '显示标题'),
      text(state, update, 'titleText' as keyof T & string, '标题文本'),
      bool(state, update, 'showTooltip' as keyof T & string, '显示提示框'),
      bool(state, update, 'showLegend' as keyof T & string, '显示图例'),
    ],
  };
}

// ============================================================================
// Styles (inject into document head)
// ============================================================================

const styles = `
  /* Playground 组件样式 - 现代化设计 */

  .playground {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .playground:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  /* Header */
  .playground-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px;
    border-bottom: 1px solid;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%);
  }

  .playground-title {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .playground-description {
    margin: 6px 0 0;
    font-size: 14px;
    opacity: 0.7;
    font-weight: 500;
  }

  .playground-header-actions {
    display: flex;
    gap: 10px;
  }

  .playground-theme-toggle {
    padding: 10px 20px;
    border: 1.5px solid;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .playground-theme-toggle:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .playground-theme-toggle:active {
    transform: translateY(0);
  }

  /* Preview Area */
  .playground-preview {
    padding: 32px;
    min-height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .playground-preview::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  /* Controls Panel */
  .playground-controls {
    border-top: 1px solid;
    padding: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.01) 100%);
  }

  .playground-group {
    border-bottom: 1px solid;
    transition: background-color 0.2s ease;
  }

  .playground-group:last-child {
    border-bottom: none;
  }

  .playground-group-header {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 18px 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    transition: all 0.2s ease;
    letter-spacing: -0.01em;
  }

  .playground-group-header:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  .playground-group-arrow {
    font-size: 10px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.6;
  }

  .playground-group-arrow.collapsed {
    transform: rotate(-90deg);
  }

  .playground-group-content {
    padding: 0 28px 24px;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .playground-controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  /* Control Items */
  .playground-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.01);
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
  }

  .playground-control:hover {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  .playground-control-label {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .playground-control-label--checkbox {
    flex-direction: row;
    gap: 10px;
    cursor: pointer;
    text-transform: none;
    letter-spacing: normal;
  }

  .playground-control-value {
    font-weight: 700;
    opacity: 1;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 11px;
    background: rgba(99, 102, 241, 0.1);
    padding: 2px 8px;
    border-radius: 6px;
    color: #6366f1;
  }

  /* Input Controls */
  .playground-control-input,
  .playground-control-select {
    padding: 10px 14px;
    border: 1.5px solid;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .playground-control-input:focus,
  .playground-control-select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    transform: translateY(-1px);
  }

  .playground-control-input::placeholder {
    opacity: 0.4;
  }

  /* Checkbox */
  .playground-control input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 2px solid;
    cursor: pointer;
    transition: all 0.2s ease;
    accent-color: #6366f1;
  }

  .playground-control input[type="checkbox"]:checked {
    background: #6366f1;
    border-color: #6366f1;
  }

  /* Color Control */
  .playground-control-color {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .playground-control-color input[type="color"] {
    width: 48px;
    height: 36px;
    padding: 3px;
    border: 2px solid;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .playground-control-color input[type="color"]:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .playground-control-color-value {
    font-size: 13px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-weight: 600;
    opacity: 0.8;
  }

  /* Range Control */
  .playground-control-range {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
    border-radius: 4px;
    outline: none;
    transition: all 0.2s ease;
  }

  .playground-control-range:hover {
    background: linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%);
  }

  .playground-control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 4px 0 rgba(99, 102, 241, 0.3);
    transition: all 0.2s ease;
  }

  .playground-control-range::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 8px 0 rgba(99, 102, 241, 0.4);
  }

  .playground-control-range::-webkit-slider-thumb:active {
    transform: scale(1.1);
  }

  /* Range Track for Firefox */
  .playground-control-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 4px 0 rgba(99, 102, 241, 0.3);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .playground-header {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
      padding: 20px;
    }

    .playground-preview {
      padding: 20px;
      min-height: 300px;
    }

    .playground-controls-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .playground-group-header {
      padding: 14px 20px;
    }

    .playground-group-content {
      padding: 0 20px 20px;
    }

    .playground-control {
      padding: 12px;
    }
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .playground {
    animation: fadeInUp 0.4s ease-out;
  }

  /* Dark mode specific */
  @media (prefers-color-scheme: dark) {
    .playground-control {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(255, 255, 255, 0.05);
    }

    .playground-control:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleId = 'playground-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}
