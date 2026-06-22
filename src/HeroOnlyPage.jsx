import React, { useEffect, useState } from 'react';

const HERO_HEADER_ASSET_ROOT = '/assets/images/review-highlights/header';

function HeaderIcon({ name }) {
  return (
    <img src={`${HERO_HEADER_ASSET_ROOT}/${name}.svg`} alt="" aria-hidden="true" />
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function HeroOnlyHeader() {
  return (
    <header className="hero-only-header">
      <nav className="hero-only-header__desktop" aria-label="Primary navigation">
        <a className="hero-only-header__logo-link" href="/" aria-label="Breville home">
          <span className="hero-only-header__logo" aria-hidden="true" />
        </a>

        <div className="hero-only-header__links" aria-label="Main navigation links">
          {['Shop', 'Recipes', 'Breville+ App', 'Support', 'Sales & Offers'].map((label) => (
            <a className="hero-only-header__link" href="/" key={label}>
              {label}
            </a>
          ))}
        </div>

        <div className="hero-only-header__actions" aria-label="Quick links">
          <button className="hero-only-header__icon-button" type="button" aria-label="Search">
            <HeaderIcon name="search" />
          </button>
          <button className="hero-only-header__icon-button" type="button" aria-label="Account">
            <HeaderIcon name="user" />
          </button>
          <button className="hero-only-header__icon-button" type="button" aria-label="Cart">
            <HeaderIcon name="cart" />
          </button>
        </div>
      </nav>

      <nav className="hero-only-header__mobile" aria-label="Mobile primary navigation">
        <a className="hero-only-header__logo-link" href="/" aria-label="Breville home">
          <span className="hero-only-header__logo" aria-hidden="true" />
        </a>

        <div className="hero-only-header__actions" aria-label="Quick links">
          <button className="hero-only-header__icon-button" type="button" aria-label="Search">
            <HeaderIcon name="search" />
          </button>
          <button className="hero-only-header__icon-button" type="button" aria-label="Cart">
            <HeaderIcon name="cart" />
          </button>
          <button className="hero-only-header__icon-button" type="button" aria-label="Menu">
            <IconMenu />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default function HeroOnlyPage() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'the Smart Kettle Luxe Hero';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateHeaderState = () => {
      animationFrame = 0;
      setIsHeaderHidden(window.scrollY > 24);
    };

    const requestHeaderUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestHeaderUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <main className={`hero-only-page${isHeaderHidden ? ' is-header-hidden' : ''}`} aria-label="Smart Kettle Luxe hero page">
      <HeroOnlyHeader />

      <section className="hero-only" aria-label="the Smart Kettle Luxe">
        <div className="hero-only__stage">
          <video
            className="hero-only__video hero-only__video--desktop"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Smart Kettle Luxe desktop hero video"
          >
            <source src="/assets/videos/desktop_hero.mp4" type="video/mp4" />
          </video>

          <video
            className="hero-only__video hero-only__video--mobile"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Smart Kettle Luxe mobile hero video"
          >
            <source src="/assets/videos/mobile_hero.mp4" type="video/mp4" />
          </video>

          <div className="hero-only__copy">
            <p className="hero-only__eyebrow">the Smart Kettle&trade; Luxe</p>
            <h1 className="hero-only__title">Brew Intelligently</h1>
            <a className="hero-only__cta" href="#shop">Shop now</a>
          </div>
        </div>
      </section>
    </main>
  );
}
