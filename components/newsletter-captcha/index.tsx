'use client';

import { useEffect, useRef, useState } from 'react';
import './styles.css';

type CaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark';
      size?: 'normal' | 'compact';
    }
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    hcaptcha: CaptchaApi;
    onNewsletterCaptchaLoad?: () => void;
  }
}

let apiPromise: Promise<CaptchaApi> | undefined;

function loadCaptcha() {
  if (!apiPromise) {
    apiPromise = new Promise<CaptchaApi>((resolve, reject) => {
      const script = document.createElement('script');
      window.onNewsletterCaptchaLoad = () => {
        delete window.onNewsletterCaptchaLoad;
        resolve(window.hcaptcha);
      };
      script.src =
        'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onNewsletterCaptchaLoad';
      script.async = true;
      script.onerror = () => {
        delete window.onNewsletterCaptchaLoad;
        script.remove();
        apiPromise = undefined;
        reject(new Error('Unable to load hCaptcha'));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export default function NewsletterCaptcha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let api: CaptchaApi | undefined;
    let widgetId: string | undefined;

    loadCaptcha()
      .then((loadedApi) => {
        if (cancelled || !containerRef.current) return;
        api = loadedApi;
        widgetId = api.render(containerRef.current, {
          sitekey: '74b60758-ab8c-4b52-ac70-187a64108ed4',
          theme: 'dark',
          // size: 'compact',
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetId !== undefined) api?.remove(widgetId);
    };
  }, []);

  return (
    <>
      <div className="h-captcha" ref={containerRef} />
      {failed && (
        <p role="alert">Captcha could not load. Please reload to retry.</p>
      )}
    </>
  );
}
