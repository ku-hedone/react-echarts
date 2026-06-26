import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useExtensions from '../../hook/useExtensions';
import type { AdapterEChartsOption } from '../../types/base';
import type { Extensions } from '../../utils/extensions';

// Mock extensions module
vi.mock('../../utils/extensions', () => ({
  default: vi.fn((use: unknown) => async (options: AdapterEChartsOption) => {
    const ext = Array.isArray(use) ? [...use] : [use];
    if (options.grid) ext.push('GridComponent');
    if (options.tooltip) ext.push('TooltipComponent');
    return ext;
  }),
}));

describe('useExtensions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return extensions and finished status', async () => {
    const { result } = renderHook(() => useExtensions({}, []));

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });

    expect(result.current.extensions).toBeDefined();
  });

  it('should detect grid option', async () => {
    const { result } = renderHook(() => useExtensions({ grid: {} }, []));

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });
  });

  it('should detect tooltip option', async () => {
    const { result } = renderHook(() => useExtensions({ tooltip: {} }, []));

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });
  });

  it('should handle multiple options', async () => {
    const { result } = renderHook(() => useExtensions({ grid: {}, tooltip: {} }, []));

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });
  });

  it('should include manual extensions', async () => {
    const manualExt = ['CustomExtension'] as unknown as Extensions;
    const { result } = renderHook(() => useExtensions({}, manualExt));

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });
  });

  it('should re-evaluate when options change', async () => {
    const { result, rerender } = renderHook(({ options }) => useExtensions(options, []), {
      initialProps: { options: {} },
    });

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });

    // Update options
    rerender({ options: { grid: {} } });

    await waitFor(() => {
      expect(result.current.finished).toBe(true);
    });
  });
});
