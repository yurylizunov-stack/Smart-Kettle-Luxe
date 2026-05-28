import React, { useEffect, useRef, useState } from 'react';
const testingAccordionSpecs = [
  ['Dimensions (WxDxH)', '7.1" x 9.6" x 9.9"'],
  ['Material', 'Brushed Stainless Steel'],
  ['Capacity', '57 oz. / 1.7 liter / 7 Cup Capacity'],
  ['Power', '1500 Watts'],
  ['Voltage', '110-120 Volts'],
];

const testingAccordionIncludedItems = [
  ['Kettle body', '7 cup stainless steel kettle'],
  ['Power base', 'Cordless 360 degree multi-directional base'],
  ['Care guide', 'Use and care documentation'],
  ['Warranty', 'Limited product warranty'],
];

const testingReviewCards = [
  {
    title: 'Looks beautiful on the counter',
    body: 'The finish feels premium, the presets are easy to use, and it heats quickly every morning.',
    author: 'Verified customer',
    date: '10/10/2025',
  },
  {
    title: 'Perfect for tea',
    body: 'I love having the different temperature settings. Green tea and French press both taste better.',
    author: 'Verified customer',
    date: '09/26/2025',
  },
  {
    title: 'Quiet, fast, and polished',
    body: 'The soft opening lid is a small detail that makes the kettle feel much nicer day to day.',
    author: 'Verified customer',
    date: '09/12/2025',
  },
  {
    title: 'Worth the upgrade',
    body: 'The keep warm button and clear controls make it feel thoughtful without being complicated.',
    author: 'Verified customer',
    date: '08/28/2025',
  },
];

const testingAccordionSections = [
  {
    id: 'included',
    title: 'Included in Box',
    variant: 'included',
    items: testingAccordionIncludedItems,
  },
  {
    id: 'reviews',
    title: 'Review Highlights',
    variant: 'reviews',
    rating: '4.5',
    reviewCount: '190 review',
    recommendation: '135 out 166 (81%) reviewers recommended this product',
    ratings: [
      ['5 stars', 135, 0.81],
      ['4 stars', 21, 0.22],
      ['3 stars', 10, 0.12],
      ['2 stars', '07', 0.18],
      ['1 star', 17, 0.16],
    ],
  },
  {
    id: 'support',
    title: 'Support & Documentation',
    variant: 'cards',
    items: [
      ['Instruction Manual', 'Setup, care, cleaning, and daily operation guidance.'],
      ['Product Registration', 'Register your kettle for support updates and warranty access.'],
      ['Return Policies', 'Review return windows, eligibility, and next steps.'],
      ['Warranty & Repairs', 'Find coverage details, service options, and repair support.'],
    ],
  },
  {
    id: 'compare',
    title: 'Compare Kettles',
    variant: 'compare',
    items: [
      {
        name: 'the Smart Kettle\u2122 Luxe',
        current: true,
        image: '/assets/images/story-compare-smart-kettle-luxe.png',
        features: ['5 Pre-sets, Keep Warm.', 'Soft Top Lid'],
        capacity: '7-Cup / 1.7L',
        width: '7.5"',
        depth: '7.5"',
        height: '7.5"',
        swatches: [
          '/assets/images/swatches/Brushed%20Stainless%20Steel.png',
          '/assets/images/swatches/Black%20Truffle.png',
          '/assets/images/swatches/Sea%20Salt.png',
          '/assets/images/swatches/Damson%20Blue.png',
          '/assets/images/swatches/Almond%20Nougat.png',
          '/assets/images/swatches/Olive%20Tapenade.png',
          '/assets/images/swatches/Noir.png',
          '/assets/images/swatches/Sea%20Salt%20Brass.png',
          '/assets/images/swatches/Damson%20Blue%20Brass.png',
          '/assets/images/swatches/Olive%20Tapenade%20Brass.png',
          '/assets/images/swatches/Brushed%20Stainless%20Steel%20Brass.png',
          '/assets/images/swatches/an%20Aboriginal%20Culinary%20Journey.png',
        ],
        summaryTitle: 'Pure Clarity, Thoughtfully Refined',
        summary: 'Elegant glass design, precise heating performance, and intuitive smart features',
      },
      {
        name: 'the Smart Crystal Luxe\u2122',
        image: '/assets/images/story-compare-crystal-luxe.png',
        features: ['5 Pre-sets, Keep Warm.', 'Glass body'],
        capacity: '7-Cup / 1.7L',
        width: '7.5"',
        depth: '7.5"',
        height: '7.5"',
        swatches: [
          '/assets/images/swatches/Brushed%20Stainless%20Steel.png',
          '/assets/images/swatches/Sea%20Salt.png',
        ],
        summaryTitle: 'Refined Visibility, Everyday Ease',
        summary: 'A clear glass body, fast heating, and smart presets for repeatable tea and coffee rituals',
      },
      {
        name: 'the IQ Kettle\u2122 Pure',
        image: '/assets/images/story-compare-iq-pure.png',
        features: ['5 Pre-sets, Keep Warm.'],
        capacity: '7-Cup / 1.7L',
        width: '7.5"',
        depth: '7.5"',
        height: '7.5"',
        swatches: ['/assets/images/swatches/Brushed%20Stainless%20Steel.png'],
        summaryTitle: 'Everyday Precision, Made Pure',
        summary: 'Clean minimalist design, fast and accurate temperature control, and dependable performance',
      },
    ],
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    variant: 'faq',
    items: [
      ['Can I hold a selected temperature?', 'Yes. The keep warm control holds water temperature for repeat pours.'],
      ['Does the lid open slowly?', 'Yes. The soft opening lid releases steam gradually and reduces splash-back.'],
      ['Can I choose tea-specific settings?', 'Yes. Preset controls support green, white, oolong, black tea, and French press.'],
    ],
  },
];

const testingFooterColumns = [
  {
    title: 'Support',
    links: ['FAQ', 'Warranty', 'Returns policy', 'Terms & conditions', 'Privacy policy', 'Cookie notice', 'Site map'],
  },
  {
    title: 'Our brands',
    links: ['Baratza', 'Beanz', 'ChefSteps', 'LELIT'],
  },
  {
    title: 'About us',
    links: [
      'About Breville',
      'Patents',
      'Breville affiliates program',
      'Breville innovation program',
      'Diversity & inclusion',
      'Social responsibility',
      'Careers',
    ],
  },
];

const testingStoryFooterQuickLinks = [
  ['Find a retailer', 'https://www.breville.com/us/en/store-locator.html'],
  ['Blog', 'https://www.breville.com/us/en/blog.html'],
  ['Remanufactured Products', 'https://remanufactured.brevilleusa.com/'],
  ['Register a Product', 'https://www.breville.com/en-us/product-registration'],
  ['Sign Up', 'https://www.breville.com/en-us/my-account/dashboard'],
];

const testingStoryFooterColumns = [
  {
    title: 'Support',
    links: [
      ['Register a Product', 'https://www.breville.com/en-us/product-registration'],
      ['Support Center', 'https://support.breville.com/'],
      ['Breville Innovation Program', 'https://www.breville.com/en-us/innovation-program'],
      ['FAQ', 'https://support.breville.com/'],
      ['Warranty', 'https://www.breville.com/en-us/warranty'],
      ['Return Policy', 'https://www.breville.com/en-us/returns'],
      ['Retailer Terms & Conditions', 'https://www.breville.com/en-us/legal/retailer-terms'],
      ['Promotional Terms & Conditions', 'https://www.breville.com/en-us/legal/promotional-terms'],
      ['Job Candidate Policy', 'https://www.breville.com/en-us/legal/job-candidate-policy'],
      ['Careers', 'https://brevillesage.csod.com/'],
      ['Open Source Acknowledgments', 'https://www.breville.com/en-us/legal/open-source'],
      ['Breville Cookware Chemicals Disclosure', 'https://www.breville.com/en-us/legal/cookware-chemicals-disclosure'],
      ['Fast-Track Program Terms', 'https://www.breville.com/en-us/legal/fast-track-program-terms'],
      ['Nespresso VL & OL Promo T&Cs', 'https://www.breville.com/en-us/legal/nespresso-promo-terms'],
      ['Nespresso POP+ Promo T&Cs', 'https://www.breville.com/en-us/legal/nespresso-pop-promo-terms'],
    ],
  },
  {
    title: 'About Breville',
    links: [
      ['About Us', 'https://www.breville.com/en-us/about-us'],
      ['Patents', 'https://www.breville.com/en-us/patents'],
      ['Breville Affiliates Program', 'https://www.breville.com/en-us/affiliates'],
      ['Diversity & Inclusion', 'https://www.breville.com/en-us/diversity-and-inclusion'],
      ['Social Responsibility', 'https://www.breville.com/en-us/social-responsibility'],
      ['Modern Slavery Act', 'https://www.breville.com/en-us/modern-slavery-act'],
      ['Terms Of Use', 'https://www.breville.com/en-us/legal/terms-of-use'],
      ['EULA', 'https://www.breville.com/en-us/legal/eula'],
      ['Privacy Notice', 'https://www.breville.com/en-us/legal/privacy-notice'],
      ['Cookie Notice', 'https://www.breville.com/en-us/legal/cookie-notice'],
      ['Site Map', 'https://www.breville.com/en-us/site-map'],
    ],
  },
];

const testingStoryFooterSocialLinks = [
  ['facebook', 'https://assets-dam.foodthinkers.com/ZKCA55LU/at/x323c6hrgfp6kvbxm5pbkc/facebook-icon.svg?auto=webp&format=svg', 'https://www.facebook.com/brevilleusa/'],
  ['instagram', 'https://assets-dam.foodthinkers.com/ZKCA55LU/at/jp8ffg843gk9859r4qppvhhc/instagram_new.svg?auto=webp&format=svg', 'https://www.instagram.com/breville/?hl=en'],
  ['youtube', 'https://assets-dam.foodthinkers.com/ZKCA55LU/at/7wjq4rh8r8httqwmh3tm57n/youtube.svg?auto=webp&format=svg', 'https://www.youtube.com/user/breville'],
  ['pinterest', 'https://assets-dam.foodthinkers.com/ZKCA55LU/at/4328th5p8n4n65r34w6ngx57/pinterest-icon.svg?auto=webp&format=svg', 'https://www.pinterest.com/breville/'],
];

function TestingFooterIcon({ name }) {
  if (name === 'globe') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17" />
        <path d="M12 3.5c2.1 2.3 3.2 5.1 3.2 8.5s-1.1 6.2-3.2 8.5" />
        <path d="M12 3.5C9.9 5.8 8.8 8.6 8.8 12s1.1 6.2 3.2 8.5" />
      </svg>
    );
  }

  if (name === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22c4.78-.76 8.45-4.92 8.45-9.94Z" />
      </svg>
    );
  }

  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.7" />
        <circle cx="16.9" cy="7.2" r="1" />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.3 8.1a3 3 0 0 0-2.1-2.12C17.35 5.5 12 5.5 12 5.5s-5.35 0-7.2.48A3 3 0 0 0 2.7 8.1 31 31 0 0 0 2.2 12a31 31 0 0 0 .5 3.9 3 3 0 0 0 2.1 2.12c1.85.48 7.2.48 7.2.48s5.35 0 7.2-.48a3 3 0 0 0 2.1-2.12 31 31 0 0 0 .5-3.9 31 31 0 0 0-.5-3.9Z" />
        <path d="m10.1 15.2 5-3.2-5-3.2v6.4Z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.2 3c.35 2.66 1.84 4.27 4.36 4.43v3.02c-1.47.15-2.76-.34-4.26-1.24v5.66c0 7.19-7.84 9.44-10.99 4.29-2.02-3.31-.78-9.12 5.7-9.35v3.18c-.48.08-.99.2-1.45.36-1.39.47-2.18 1.36-1.96 2.94.42 3.02 5.96 3.91 5.5-1.99V3h3.1Z" />
    </svg>
  );
}

export function TestingFooter({ variant = 'default' }) {
  const className =
    variant === 'reversed' ? 'testing-footer testing-footer--reversed' : 'testing-footer testing-footer--default';

  return (
    <footer className={className} aria-label="Footer">
      <nav className="testing-footer__quick-links" aria-label="Footer quick links">
        <a href="/">Shop</a>
        <a href="/">Register a product</a>
        <a href="/">Find a retailer</a>
        <button className="testing-footer__country" type="button">
          <TestingFooterIcon name="globe" />
          United States
        </button>
      </nav>

      <div className="testing-footer__holder">
        <div className="testing-footer__signup">
          <div className="testing-footer__signup-form">
            <p className="testing-footer__signup-title">Be the first to know about our product releases!</p>
            <label className="testing-footer__email-field">
              <span className="sr-only">Email address</span>
              <input type="email" placeholder="Enter your email" />
            </label>
            <p className="testing-footer__consent">
              You agree to receive promotions, surveys and more from us and our affiliated brands, and have read our
              Privacy Policy. You can opt out at any time.
            </p>
            <button className="testing-footer__signup-button" type="button">
              Sign up
            </button>
          </div>

          <div className="testing-footer__socials" aria-label="Social links">
            {['facebook', 'instagram', 'youtube', 'tiktok'].map((name) => (
              <a href="/" key={name} aria-label={name}>
                <TestingFooterIcon name={name} />
              </a>
            ))}
          </div>

          <p className="testing-footer__copyright">© 2024 Breville. All rights reserved.</p>
        </div>

        <div className="testing-footer__link-columns">
          {testingFooterColumns.map((column) => (
            <nav className="testing-footer__column" aria-label={column.title} key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <a href="/" key={link}>
                  {link}
                </a>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}

function TestingStoryFooter() {
  const [openFooterColumns, setOpenFooterColumns] = useState({});

  return (
    <footer className="story-focused__footer testing-story-footer" aria-label="Breville footer">
      <div className="story-focused__footer-inner">
        <nav className="story-focused__footer-action" aria-label="Breville footer quick links">
          <ul>
            {testingStoryFooterQuickLinks.map(([label, href]) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li className="story-focused__footer-region">
              <svg aria-hidden="true" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M256 417.3c5.3 0 20.2-5.3 35.3-36c6.7-13.5 12.7-29.3 16.5-48H203.5c4.5 18.7 9.8 34.5 16.5 48c15.8 30.7 30 36 36 36zm-58.5-120h116.3c1.5-11.3 2.2-23.3 2.2-36c0-12-.7-24-2.2-36H197.5c-1.5 12-1.5 24-1.5 36c0 12.7 0 24.7 1.5 36zm6-108h104.3c-3.8-18-9.8-33.8-16.5-47.3c-15-30.7-30-36.7-35.3-36.7c-6 0-20.2 6-36 36.7c-6.7 13.5-12 29.3-16.5 47.3zm146.3 36c1.5 12 1.5 24 1.5 36c0 12.7 0 24.7-1.5 36h57.7c3-11.3 4.5-23.3 4.5-36c0-12-1.5-24-4.5-36h-57.7zm44.2-36c-15.8-30.7-42-55.5-73.5-69.8c10.5 19.5 18.7 43.5 24 69.8H394zm-227.3 0c5.3-26.2 13.5-50.2 24-69.8c-31.5 14.3-57.7 39-73.5 69.8h49.5zm-63 36c-2.3 12-3.7 24-3.7 36c0 12.7.7 24.7 3.7 36h57.7c-1.5-11.3-1.5-23.3-1.5-36c0-12 0-24 1.5-36h-57.7zm216.8 178.5c31.5-14.3 57.7-39 73.5-70.5h-49.5c-5.3 27-13.5 51-24 70.5zm-129.8 0c-10.5-19.5-18.7-43.5-24-70.5h-49.4c15.8 31.5 42 56.2 73.5 70.5zM256 453.3c-69 0-132-36-166.5-96c-34.5-59.3-34.5-132 0-192c34.5-59.3 97.5-96 166.5-96c68.2 0 131.3 36.7 165.8 96c34.5 60 34.5 132.7 0 192c-34.5 60-97.5 96-165.8 96z"
                />
              </svg>
              <span>United States</span>
            </li>
          </ul>
        </nav>

        <div className="story-focused__footer-body">
          <div className="story-focused__footer-social">
            <form className="story-focused__footer-newsletter">
              <h2>Be the first to know about our product releases!</h2>
              <input type="email" name="message" placeholder="Enter Your Email" aria-label="Enter Your Email" />
              <p>
                You agree to receive promotions, surveys and more from us and our affiliated brands and you have read
                our&nbsp;<a href="https://www.breville.com/us/en/legal/privacy-policy.html">Privacy Policy.</a>&nbsp;You
                can unsubscribe at any time.
              </p>
              <button type="submit">Sign Up</button>
            </form>

            <ul className="story-focused__footer-socials" aria-label="Breville social links">
              {testingStoryFooterSocialLinks.map(([label, icon, href]) => (
                <li key={label}>
                  <a href={href} aria-label={label}>
                    <img src={icon} alt={label} />
                  </a>
                </li>
              ))}
            </ul>

            <p className="story-focused__footer-legal story-focused__footer-legal--inline">
              &copy; 2026 Breville Pty Limited. All rights reserved.
            </p>
          </div>

          <div className="story-focused__footer-columns" id="testing-story-footer-links">
            {testingStoryFooterColumns.map((column) => {
              const isOpen = Boolean(openFooterColumns[column.title]);

              return (
                <section className="story-focused__footer-column" key={column.title}>
                  <button
                    type="button"
                    aria-controls={`testing-story-footer-${column.title}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFooterColumns((open) => ({ ...open, [column.title]: !isOpen }))}
                  >
                    <span>{column.title}</span>
                  </button>
                  <ul id={`testing-story-footer-${column.title}`} className={isOpen ? 'is-open' : ''}>
                    {column.links.map(([label, href]) => (
                      <li key={label}>
                        <a href={href}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>

        <p className="story-focused__footer-legal">&copy; 2026 Breville Pty Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}

function TestingScrubbableKettleVideo() {
  const videoRef = useRef(null);
  const dragRef = useRef({
    active: false,
    duration: 0,
    startTime: 0,
    startX: 0,
    width: 1,
  });

  const wrapTime = (value, duration) => {
    if (!duration) {
      return 0;
    }

    return ((value % duration) + duration) % duration;
  };

  const updateVideoTime = (clientX) => {
    const video = videoRef.current;
    const drag = dragRef.current;

    if (!video || !drag.duration) {
      return;
    }

    const deltaX = clientX - drag.startX;
    const deltaTime = (deltaX / drag.width) * drag.duration;
    video.currentTime = wrapTime(drag.startTime + deltaTime, drag.duration);
  };

  const handlePointerDown = (event) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : dragRef.current.duration;

    dragRef.current = {
      active: true,
      duration,
      startTime: video.currentTime || 0,
      startX: event.clientX,
      width: Math.max(bounds.width, 1),
    };

    video.pause();

    if (event.pointerId !== undefined && event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active && event.buttons === 1) {
      handlePointerDown(event);
      return;
    }

    if (!dragRef.current.active) {
      return;
    }

    updateVideoTime(event.clientX);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.active) {
      return;
    }

    updateVideoTime(event.clientX);
    dragRef.current.active = false;

    if (
      event.pointerId !== undefined
      && event.currentTarget.hasPointerCapture
      && event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="story-focused__scrub-video"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      aria-label="Drag to rotate kettle view"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src="/assets/videos/360_white_bg_smooth.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          dragRef.current.duration = event.currentTarget.duration || 0;
          event.currentTarget.pause();
          event.currentTarget.currentTime = 0;
        }}
      />
    </div>
  );
}

function TestingReviewCarousel() {
  const rowRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event) => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
    };
    row.classList.add('is-dragging');
    row.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const row = rowRef.current;

    if (!row || !dragRef.current.active) {
      return;
    }

    row.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  };

  const handlePointerUp = (event) => {
    const row = rowRef.current;

    if (!row || !dragRef.current.active) {
      return;
    }

    dragRef.current.active = false;
    row.classList.remove('is-dragging');
    row.releasePointerCapture?.(event.pointerId);
  };

  return (
    <div className="story-focused__review-carousel">
      <div className="story-focused__review-carousel-header">
        <h3>Customer reviews</h3>
      </div>

      <div className="story-focused__review-card-viewport">
        <div
          className="story-focused__review-card-row"
          ref={rowRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Positive customer reviews"
        >
          {testingReviewCards.slice(0, 4).map((review) => (
            <article className="story-focused__review-card" key={review.title}>
              <div className="story-focused__review-card-top">
                <div className="story-focused__review-card-stars" aria-hidden="true">
                  {'\u2605\u2605\u2605\u2605\u2606'}
                </div>
                <h3>{review.title}</h3>
              </div>

              <div className="story-focused__review-card-bottom">
                <p>{review.body}</p>
                <div className="story-focused__review-card-meta">
                  <span>{review.author}</span>
                  <time dateTime={review.date}>{review.date}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button className="story-focused__review-button" type="button">
        See all reviews
      </button>
    </div>
  );
}

export function TestingInfoAccordion() {
  const [activeSection, setActiveSection] = useState('');
  const [comparePage, setComparePage] = useState(0);
  const [compareMaxOffset, setCompareMaxOffset] = useState(936);
  const cardRefs = useRef({});
  const compareViewportRef = useRef(null);
  const compareRowRef = useRef(null);
  const compareOffsets = [0, 398, compareMaxOffset];

  const updateCompareMaxOffset = () => {
    const viewport = compareViewportRef.current;
    const row = compareRowRef.current;

    if (!viewport || !row) {
      return;
    }

    const viewportWidth = viewport.clientWidth || viewport.getBoundingClientRect().width;
    const rowWidth = row.scrollWidth || row.getBoundingClientRect().width;

    if (!viewportWidth || !rowWidth) {
      return;
    }

    setCompareMaxOffset(Math.max(0, Math.ceil(rowWidth - viewportWidth)));
  };

  useEffect(() => {
    updateCompareMaxOffset();
    const frame = window.requestAnimationFrame(updateCompareMaxOffset);

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateCompareMaxOffset);
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', updateCompareMaxOffset);
      };
    }

    const observer = new ResizeObserver(updateCompareMaxOffset);

    if (compareViewportRef.current) {
      observer.observe(compareViewportRef.current);
    }

    if (compareRowRef.current) {
      observer.observe(compareRowRef.current);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeSection, comparePage]);

  const handleSectionToggle = (section) => {
    const nextSection = activeSection === section ? '' : section;
    setActiveSection(nextSection);

    if (!nextSection) {
      return;
    }

    window.setTimeout(() => {
      const card = cardRefs.current[nextSection];

      if (!card) {
        return;
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(card, {
          offset: -window.innerHeight * 0.12,
          duration: 0.82,
          easing: (t) => 1 - (1 - t) ** 3,
        });
      } else {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
  };

  const renderSpecsSection = () => (
    <div className="story-focused__info-spec-grid">
      <div className="story-focused__info-details">
        <dl className="story-focused__info-rows">
          {testingAccordionSpecs.map(([label, value]) => (
            <div className="story-focused__info-row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="story-focused__info-media" data-node-id="9669:15835">
        <TestingScrubbableKettleVideo />
      </div>
    </div>
  );

  const renderInfoSection = (section) => {
    if (section.variant === 'included') {
      return (
        <div className="story-focused__info-spec-grid story-focused__info-spec-grid--included">
          <div className="story-focused__info-details">
            <dl className="story-focused__info-rows">
              {section.items.map(([label, value]) => (
                <div className="story-focused__info-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="story-focused__info-media" data-node-id="testing2:included-media">
            <div className="story-focused__scrub-video story-focused__included-image-holder">
              <img src="/assets/images/included.png" alt="Smart Kettle Luxe box contents" />
            </div>
          </div>
        </div>
      );
    }

    if (section.variant === 'cards') {
      return (
        <div className="story-focused__info-doc-grid">
          {section.items.map(([title, body]) => (
            <article className="story-focused__info-doc-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="story-focused__info-doc-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M2 12h19.5M14.5 5.5l7 6.5-7 6.5" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      );
    }

    if (section.variant === 'reviews') {
      return (
        <>
          <div className="story-focused__info-review-panel">
            <div className="story-focused__review-score">
              <strong>{section.rating}</strong>
              <div className="story-focused__review-stars" aria-label={`${section.rating} out of 5 stars`}>
                <span aria-hidden="true">{'\u2605\u2605\u2605\u2605\u2605'}</span>
                <small>{section.reviewCount}</small>
              </div>
              <p>{section.recommendation}</p>
            </div>

            <div className="story-focused__rating-bars" aria-label="Rating distribution">
              {section.ratings.map(([label, count, value]) => (
                <div className="story-focused__rating-row" key={label}>
                  <span>{label}</span>
                  <div className="story-focused__rating-meter" aria-hidden="true">
                    <span style={{ transform: `scaleX(${value})` }} />
                  </div>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </div>
          <TestingReviewCarousel />
        </>
      );
    }

    if (section.variant === 'compare') {
      const compareOffset = compareOffsets[comparePage] || 0;
      const comparePanelClasses = [
        'story-focused__compare-panel',
        comparePage > 0 ? 'is-past-start' : '',
        comparePage === compareOffsets.length - 1 ? 'is-at-end' : '',
      ].filter(Boolean).join(' ');

      return (
        <div className={comparePanelClasses}>
          <div className="story-focused__compare-track">
            {section.items.map((item, itemIndex) => (
              <article className="story-focused__compare-product" key={item.name}>
                <h3>
                  {item.name}
                  {item.current ? <span>Currently Viewing</span> : null}
                </h3>

                <div
                  className="story-focused__compare-row-viewport"
                  ref={itemIndex === 0 ? compareViewportRef : null}
                >
                  <div
                    className="story-focused__compare-row"
                    ref={itemIndex === 0 ? compareRowRef : null}
                    style={{ transform: `translate3d(-${compareOffset}px, 0, 0)` }}
                  >
                    <div className="story-focused__compare-card story-focused__compare-card--product">
                      <figure>
                        <img src={item.image} alt="" />
                      </figure>
                      <div>
                        <h4>Features</h4>
                        {item.features.map((feature) => (
                          <p key={feature}>{feature}</p>
                        ))}
                      </div>
                    </div>

                    <div className="story-focused__compare-card story-focused__compare-card--capacity">
                      <span>Capacity</span>
                      <strong>{item.capacity}</strong>
                    </div>

                    <div className="story-focused__compare-card story-focused__compare-card--dimensions">
                      {['width', 'depth', 'height'].map((dimension) => (
                        <div key={dimension}>
                          <span>{dimension}</span>
                          <strong>{item[dimension]}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="story-focused__compare-card story-focused__compare-card--swatches">
                      {item.swatches.map((swatch) => (
                        <span key={swatch} style={{ backgroundImage: `url("${swatch}")` }} />
                      ))}
                    </div>

                    <div className="story-focused__compare-card story-focused__compare-card--summary">
                      <h4>{item.summaryTitle}</h4>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="story-focused__compare-controls" aria-label="Compare kettle columns">
            <button
              className={comparePage === 0 ? 'is-muted' : ''}
              type="button"
              aria-label="Show previous comparison columns"
              disabled={comparePage === 0}
              onClick={() => {
                updateCompareMaxOffset();
                setComparePage((page) => Math.max(0, page - 1));
              }}
            >
              <span aria-hidden="true">{'\u2039'}</span>
            </button>
            <button
              className={comparePage === compareOffsets.length - 1 ? 'is-muted' : ''}
              type="button"
              aria-label="Show next comparison columns"
              disabled={comparePage === compareOffsets.length - 1}
              onClick={() => {
                updateCompareMaxOffset();
                setComparePage((page) => Math.min(compareOffsets.length - 1, page + 1));
              }}
            >
              <span aria-hidden="true">{'\u203A'}</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="story-focused__info-faq-list">
        {section.items.map(([question, answer]) => (
          <div className="story-focused__info-faq" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="story-focused__product-info story-focused__product-info--accordion" aria-label="Product information" data-node-id="9669:15816">
      <article
        className={`story-focused__info-card${activeSection === 'specs' ? ' is-open' : ''}`}
        ref={(node) => {
          cardRefs.current.specs = node;
        }}
        data-node-id="9669:15817"
      >
        <button
          className="story-focused__info-header"
          type="button"
          aria-expanded={activeSection === 'specs'}
          aria-controls="testing-story-info-specs-panel"
          onClick={() => handleSectionToggle('specs')}
        >
          <span>Technical Specifications</span>
          <span className="story-focused__info-icon" aria-hidden="true" />
        </button>

        <div className="story-focused__info-panel" id="testing-story-info-specs-panel">
          <div className="story-focused__info-divider" />
          {renderSpecsSection()}
        </div>
      </article>

      {testingAccordionSections.map((section) => {
        const isOpen = activeSection === section.id;
        const panelId = `testing-story-info-${section.id}-panel`;

        return (
          <article
            className={`story-focused__info-card${isOpen ? ' is-open' : ''}`}
            key={section.id}
            ref={(node) => {
              cardRefs.current[section.id] = node;
            }}
          >
            <button
              className="story-focused__info-header"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleSectionToggle(section.id)}
            >
              <span>{section.title}</span>
              <span className="story-focused__info-icon" aria-hidden="true" />
            </button>

            <div className="story-focused__info-panel" id={panelId}>
              <div className="story-focused__info-divider" />
              {renderInfoSection(section)}
            </div>
          </article>
        );
      })}
    </section>
  );
}
