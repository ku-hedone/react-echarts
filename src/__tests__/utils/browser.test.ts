import { describe, it, expect } from 'vitest';
import detect from '../../utils/browser';

describe('detect browser', () => {
  it('should detect Firefox', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(true);
    expect(browser.version).toBe('89.0');
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
  });

  it('should detect IE 11', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
    const browser = detect(ua);
    expect(browser.isIE).toBe(true);
    expect(browser.version).toBe('11.0');
    expect(browser.isFirefox).toBe(false);
    expect(browser.isEdge).toBe(false);
  });

  it('should detect IE 10', () => {
    const ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';
    const browser = detect(ua);
    expect(browser.isIE).toBe(true);
    expect(browser.version).toBe('10.0');
  });

  it('should detect Edge', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
    const browser = detect(ua);
    expect(browser.isEdge).toBe(true);
    expect(browser.version).toBe('91.0.864.59');
    expect(browser.isModernEdge).toBe(true);
  });

  it('should detect old Edge', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763';
    const browser = detect(ua);
    expect(browser.isEdge).toBe(true);
    expect(browser.isModernEdge).toBe(false);
  });

  it('should return default for unknown browser', () => {
    const ua = 'Unknown Browser/1.0';
    const browser = detect(ua);
    expect(browser.isFirefox).toBe(false);
    expect(browser.isIE).toBe(false);
    expect(browser.isEdge).toBe(false);
    expect(browser.version).toBeUndefined();
  });
});
