import { describe, it, expect } from 'vitest';
import detect from '../../utils/browser';

describe('detect browser - extended tests', () => {
  it('should detect Chrome', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
    expect(browser.version).toBeUndefined();
  });

  it('should detect Safari', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
  });

  it('should detect IE 9', () => {
    const ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';
    const browser = detect(ua);
    expect(browser.isIE).toBe(true);
    expect(browser.version).toBe('9.0');
  });

  it('should detect Firefox 90', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(true);
    expect(browser.version).toBe('90.0');
  });

  it('should detect Edge Chromium (modern)', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44';
    const browser = detect(ua);
    expect(browser.isEdge).toBe(true);
    expect(browser.isModernEdge).toBe(true);
  });

  it('should detect old Edge (non-modern)', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393';
    const browser = detect(ua);
    expect(browser.isEdge).toBe(true);
    expect(browser.isModernEdge).toBe(false);
  });

  it('should handle empty user agent', () => {
    const browser = detect('');
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
    expect(browser.version).toBeUndefined();
  });

  it('should handle mobile user agents', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
  });

  it('should handle Android user agents', () => {
    const ua =
      'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
  });
});
