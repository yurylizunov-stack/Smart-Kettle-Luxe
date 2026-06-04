import React, { useEffect, useRef, useState } from 'react';

const menuItems = [
  { label: 'Compare', state: 'compare' },
  { label: 'Tech Specs', state: 'specs' },
  { label: "What's Included", state: 'included' },
  { label: 'Review Highlights', state: 'reviews' },
  { label: 'Support & Documentation', state: 'support' },
  { label: 'FAQS', state: 'faqs' },
];

const swatches = [
  { name: 'Brushed Stainless Steel', image: '/assets/images/swatches/Brushed Stainless Steel.png', kettleImage: '/assets/images/swatch_images/1.png' },
  { name: 'Black Truffle', image: '/assets/images/swatches/Black Truffle.png', kettleImage: '/assets/images/swatch_images/2.png' },
  { name: 'Sea Salt', image: '/assets/images/swatches/Sea Salt.png', kettleImage: '/assets/images/swatch_images/3.png' },
  { name: 'Damson Blue', image: '/assets/images/swatches/Damson Blue.png', kettleImage: '/assets/images/swatch_images/4.png' },
  { name: 'Almond Nougat', image: '/assets/images/swatches/Almond Nougat.png', kettleImage: '/assets/images/swatch_images/5.png' },
  { name: 'Olive Tapenade', image: '/assets/images/swatches/Olive Tapenade.png', kettleImage: '/assets/images/swatch_images/6.png' },
  { name: 'Noir', image: '/assets/images/swatches/Noir.png', kettleImage: '/assets/images/swatch_images/7.png' },
  { name: 'Sea Salt Brass', image: '/assets/images/swatches/Sea Salt Brass.png', kettleImage: '/assets/images/swatch_images/8.png' },
  { name: 'Damson Blue Brass', image: '/assets/images/swatches/Damson Blue Brass.png', kettleImage: '/assets/images/swatch_images/9.png' },
  { name: 'Olive Tapenade Brass', image: '/assets/images/swatches/Olive Tapenade Brass.png', kettleImage: '/assets/images/swatch_images/10.png' },
  { name: 'Brushed Stainless Steel Brass', image: '/assets/images/swatches/Brushed Stainless Steel Brass.png', kettleImage: '/assets/images/swatch_images/11.png' },
  { name: 'an Aboriginal Culinary Journey', image: '/assets/images/swatches/an Aboriginal Culinary Journey.png', kettleImage: '/assets/images/swatch_images/12.png' },
];

const supportCards = [
  {
    title: 'User Manual',
    copy: 'Download setup, cleaning, and safety guidance.',
  },
  {
    title: 'Care Guide',
    copy: 'Keep your kettle finish and controls looking sharp.',
  },
  {
    title: 'Return\nPolicies',
    copy: 'Review return windows, eligibility, and next steps.',
  },
  {
    title: 'Warranty &\nRepairs',
    copy: 'Find coverage details, service options, and repair support.',
  },
];

const faqItems = [
  {
    question: 'Can I hold a selected temperature?',
    answer: 'Yes. The keep warm control holds water temperature for repeat pours.',
  },
  {
    question: 'Does the lid open slowly?',
    answer: 'Yes. The soft opening lid releases steam gradually and reduces splash-back.',
  },
  {
    question: 'Can I choose tea-specific settings?',
    answer: 'Yes. Preset controls support green, white, oolong, black tea, and French press.',
  },
];

const specItems = [
  ['Dimensions (WxDxH)', '7.1" x 9.6" x 9.9"'],
  ['Material', 'Brushed Stainless Steel'],
  ['Capacity', '57 oz. / 1.7 liter / 7 Cup Capacity'],
  ['Power', '1500 Watts'],
  ['Voltage', '110\u2013120 Volts'],
];

const includedItems = ['Power base', 'Kettle body', 'Care guide', 'Warranty card'];

const ratingRows = [
  ['5 stars', 135, 0.68],
  ['4 stars', 21, 0.25],
  ['3 stars', 10, 0.13],
  ['2 stars', '07', 0.11],
  ['1 star', 17, 0.2],
];

const reviewCards = [
  {
    title: 'Looks beautiful on the counter',
    copy: 'The finish feels premium, the presets are easy to use, and it heats quickly every morning.',
    date: '10/10/2025',
  },
  {
    title: 'Perfect for tea',
    copy: 'The temperature presets make green tea and French press simple to get right.',
    date: '09/26/2025',
  },
  {
    title: 'Quiet, fast, and polished',
    copy: 'The soft opening lid and simple controls make it feel considered every day.',
    date: '09/12/2025',
  },
];

const compareProducts = [
  {
    key: 'smart-kettle-luxe',
    eyebrow: 'Currently Viewing',
    name: <>the Smart Kettle&trade; Luxe</>,
    image: '/assets/images/story-compare-smart-kettle-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Soft Top Lid'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: swatches.slice(0, 5),
    summaryTitle: 'Pure Clarity, Thoughtfully Refined',
    summary: 'Elegant design, precise heating performance, and intuitive smart features.',
  },
  {
    key: 'smart-crystal-luxe',
    name: <>the Smart Crystal Luxe&trade;</>,
    image: '/assets/images/story-compare-crystal-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Glass body'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: [swatches[0], swatches[2]],
    summaryTitle: 'Refined Visibility, Everyday Ease',
    summary: 'A clear glass body, fast heating, and smart presets for repeatable rituals.',
  },
  {
    key: 'iq-kettle-pure',
    name: <>the IQ Kettle&trade; Pure</>,
    image: '/assets/images/story-compare-iq-pure.png',
    features: ['5 Pre-sets, Keep Warm.'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: [swatches[0]],
    summaryTitle: 'Everyday Precision, Made Pure',
    summary: 'Clean minimalist design, accurate temperature control, and dependable performance.',
  },
];

export default function ContextualMenu() {
  const [state, setState] = useState('closed');
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const menuRef = useRef(null);
  const selectedSwatch = swatches[selectedSwatchIndex];
  const isMenuOpen = state === 'menu';
  const isProductOpen = state === 'product';
  const isSupportOpen = state === 'support';
  const isFaqsOpen = state === 'faqs';
  const isSpecsOpen = state === 'specs';
  const isIncludedOpen = state === 'included';
  const isReviewsOpen = state === 'reviews';
  const isCompareOpen = state === 'compare';
  const isOpen = isMenuOpen || isProductOpen || isSupportOpen || isFaqsOpen || isSpecsOpen || isIncludedOpen || isReviewsOpen || isCompareOpen;
  const hasBottomDock = isProductOpen || isSupportOpen || isFaqsOpen || isSpecsOpen || isIncludedOpen || isReviewsOpen || isCompareOpen;

  useEffect(() => {
    const menu = menuRef.current;
    const desktopReleaseElement = document.querySelector('.motion-elevate-strip');
    const mobileReleaseElement = document.querySelector('.motion-footer-section');
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    let frame = 0;

    if (!menu || (!desktopReleaseElement && !mobileReleaseElement)) {
      return undefined;
    }

    const getPageTop = (element) => element.getBoundingClientRect().top + window.scrollY;

    const updateRelease = () => {
      if (desktopQuery.matches) {
        if (!desktopReleaseElement) {
          menu.style.removeProperty('--contextual-menu-release-y');
          return;
        }

        const releaseBottom = getPageTop(desktopReleaseElement) + desktopReleaseElement.offsetHeight;
        const releaseScroll = releaseBottom - window.innerHeight;
        const releaseOffset = Math.max(0, window.scrollY - releaseScroll);

        menu.style.setProperty('--contextual-menu-release-y', `${-releaseOffset}px`);
        return;
      }

      if (!mobileReleaseElement) {
        menu.style.removeProperty('--contextual-menu-release-y');
        return;
      }

      const menuBottomInset = parseFloat(window.getComputedStyle(menu).bottom) || 20;
      const releaseTop = getPageTop(mobileReleaseElement);
      const anchoredMenuBottom = window.innerHeight - menuBottomInset;
      const releaseScroll = releaseTop - 20 - anchoredMenuBottom;
      const releaseOffset = Math.max(0, window.scrollY - releaseScroll);

      menu.style.setProperty('--contextual-menu-release-y', `${-releaseOffset}px`);
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          updateRelease();
        });
      }
    };

    const syncRelease = () => {
      updateRelease();
    };

    syncRelease();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('blank:smooth-scroll', requestUpdate);
    window.addEventListener('resize', syncRelease);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('blank:smooth-scroll', requestUpdate);
      window.removeEventListener('resize', syncRelease);
      menu.style.removeProperty('--contextual-menu-release-y');
    };
  }, []);

  return (
    <section
      className={`contextual-menu${isOpen ? ' is-open' : ''}${hasBottomDock ? ' is-dock-open' : ''}${isProductOpen ? ' is-product-open' : ''}${isSupportOpen ? ' is-support-open' : ''}${isFaqsOpen ? ' is-faqs-open' : ''}${isSpecsOpen ? ' is-specs-open' : ''}${isIncludedOpen ? ' is-included-open' : ''}${isReviewsOpen ? ' is-reviews-open' : ''}${isCompareOpen ? ' is-compare-open' : ''}`}
      aria-label="Contextual menu"
      ref={menuRef}
    >
      {isMenuOpen ? (
        <MenuPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isProductOpen ? (
        <ProductPanel
          setState={setState}
          isOpen={isOpen}
          selectedSwatch={selectedSwatch}
          selectedSwatchIndex={selectedSwatchIndex}
          setSelectedSwatchIndex={setSelectedSwatchIndex}
        />
      ) : isSupportOpen ? (
        <SupportPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isFaqsOpen ? (
        <FaqsPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isSpecsOpen ? (
        <SpecsPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isIncludedOpen ? (
        <IncludedPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isReviewsOpen ? (
        <ReviewsPanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : isCompareOpen ? (
        <ComparePanel setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
      ) : (
        <MenuBar
          isOpen={isOpen}
          onMenuToggle={() => setState('menu')}
          onShopClick={() => setState('product')}
          selectedSwatch={selectedSwatch}
        />
      )}
    </section>
  );
}

function MenuPanel({ setState, isOpen, selectedSwatch }) {
  return (
    <div className="contextual-menu__panel contextual-menu__panel--menu">
      <div className="contextual-menu__content">
        <p className="contextual-menu__eyebrow">Menu</p>
        <nav className="contextual-menu__nav" aria-label="Product sections">
          {menuItems.map((item, index) => (
            <button
              className="contextual-menu__link"
              type="button"
              key={`${item.label}-${index}`}
              onClick={() => item.state && setState(item.state)}
            >
              {item.label === 'Support & Documentation' ? (
                <>
                  Support &amp;
                  <br />
                  Documentation
                </>
              ) : (
                item.label
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="contextual-menu__dock">
        <MenuBar
          isOpen={isOpen}
          onMenuToggle={() => setState('closed')}
          onShopClick={() => setState('product')}
          selectedSwatch={selectedSwatch}
        />
      </div>
    </div>
  );
}

function ProductPanel({ setState, isOpen, selectedSwatch, selectedSwatchIndex, setSelectedSwatchIndex }) {
  return (
    <div className="contextual-menu__panel contextual-menu__panel--product">
      <div className="contextual-menu__scroll-region">
        <div className="contextual-menu__product-header">
          <h2>the Smart Kettle&trade; Luxe</h2>
          <button type="button" onClick={() => setState('menu')}>Menu</button>
        </div>
        <div className="contextual-menu__divider" />
        <div className="contextual-menu__product-image">
          <img src={selectedSwatch.kettleImage} alt="" />
        </div>
        <div className="contextual-menu__product-options">
          <p>
            <span>Color: </span>
            <strong>{selectedSwatch.name}</strong>
          </p>
          <div className="contextual-menu__swatches" aria-label="Color options">
            {swatches.map((swatch, index) => (
              <button
                className={`contextual-menu__option${index === selectedSwatchIndex ? ' is-selected' : ''}`}
                type="button"
                aria-label={swatch.name}
                aria-pressed={index === selectedSwatchIndex}
                key={swatch.name}
                onClick={() => setSelectedSwatchIndex(index)}
              >
                <img src={swatch.image} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function SupportPanel({ setState, isOpen, selectedSwatch }) {
  const cardRailDrag = useDragScroll();

  return (
    <div className="contextual-menu__panel contextual-menu__panel--support">
      <div className="contextual-menu__scroll-region">
        <div className="contextual-menu__support-header">
          <h2>Support &amp; Documentation</h2>
          <button type="button" onClick={() => setState('menu')}>Menu</button>
        </div>
        <div className="contextual-menu__divider" />
        <div className="contextual-menu__support-content">
          <div className="contextual-menu__support-hero">
            <img src="/assets/images/contextual-menu-support.png" alt="" />
          </div>
          <button className="contextual-menu__support-feature" type="button">
            <span>
              <strong>Product Hub</strong>
              <small>Download setup, cleaning, and safety guidance.</small>
            </span>
            <span className="contextual-menu__arrow" aria-hidden="true" />
          </button>
          <div
            className="contextual-menu__support-cards"
            aria-label="Support documents"
            ref={cardRailDrag.ref}
            onPointerDown={cardRailDrag.onPointerDown}
            onPointerMove={cardRailDrag.onPointerMove}
            onPointerUp={cardRailDrag.onPointerUp}
            onPointerCancel={cardRailDrag.onPointerUp}
            onClickCapture={cardRailDrag.onClickCapture}
          >
            {supportCards.map((item) => (
              <button className="contextual-menu__support-card" type="button" key={item.title}>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
                <span className="contextual-menu__arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function FaqsPanel({ setState, isOpen, selectedSwatch }) {
  return (
    <div className="contextual-menu__panel contextual-menu__panel--faqs">
      <div className="contextual-menu__scroll-region">
        <PanelHeader title="FAQS" setState={setState} />
        <div className="contextual-menu__stack contextual-menu__stack--faqs">
          {faqItems.map((item, index) => (
            <div className="contextual-menu__faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              {index < faqItems.length - 1 ? <div className="contextual-menu__inline-divider" /> : null}
            </div>
          ))}
        </div>
        <div className="contextual-menu__desktop-faqs">
          {faqItems.map((item, index) => (
            <div className="contextual-menu__desktop-faq-item" key={`${item.question}-${index}`}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              {index < faqItems.length - 1 ? <div className="contextual-menu__desktop-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function SpecsPanel({ setState, isOpen, selectedSwatch }) {
  return (
    <div className="contextual-menu__panel contextual-menu__panel--specs">
      <div className="contextual-menu__scroll-region">
        <PanelHeader title="Tech Specs" setState={setState} />
        <div className="contextual-menu__spec-image">
          <img src="/assets/images/contextual-menu-specs.png" alt="" />
        </div>
        <div className="contextual-menu__spec-list">
          {specItems.map(([label, value], index) => (
            <div className="contextual-menu__spec-row" key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
              {index < specItems.length - 1 ? <div className="contextual-menu__inline-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function IncludedPanel({ setState, isOpen, selectedSwatch }) {
  return (
    <div className="contextual-menu__panel contextual-menu__panel--included">
      <div className="contextual-menu__scroll-region">
        <PanelHeader title="What's Included" setState={setState} />
        <div className="contextual-menu__included-grid">
          {includedItems.map((item) => (
            <div className="contextual-menu__included-item" key={item}>
              <div className="contextual-menu__included-tile" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function ReviewsPanel({ setState, isOpen, selectedSwatch }) {
  const reviewRailDrag = useDragScroll();

  return (
    <div className="contextual-menu__panel contextual-menu__panel--reviews">
      <div className="contextual-menu__scroll-region">
        <PanelHeader title="Review Highlights" setState={setState} />
        <div className="contextual-menu__reviews-summary">
          <div className="contextual-menu__reviews-score-row">
            <div className="contextual-menu__reviews-copy">
              <div className="contextual-menu__reviews-stars" aria-label="4.5 out of 5 stars">★★★★☆</div>
              <p>190 review</p>
              <p>135 out 166 (81%) reviewers recommended this product</p>
            </div>
            <strong>4.5</strong>
          </div>
          <div className="contextual-menu__rating-list">
            {ratingRows.map(([label, count, value]) => (
              <div className="contextual-menu__rating-row" key={label}>
                <span>{label}</span>
                <div className="contextual-menu__rating-meter" aria-hidden="true">
                  <span style={{ width: `${Number(value) * 100}%` }} />
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="contextual-menu__reviews-divider" />
        <h3 className="contextual-menu__reviews-heading">Customer reviews</h3>
        <div
          className="contextual-menu__review-cards"
          aria-label="Customer reviews"
          ref={reviewRailDrag.ref}
          onPointerDown={reviewRailDrag.onPointerDown}
          onPointerMove={reviewRailDrag.onPointerMove}
          onPointerUp={reviewRailDrag.onPointerUp}
          onPointerCancel={reviewRailDrag.onPointerUp}
          onClickCapture={reviewRailDrag.onClickCapture}
        >
          {reviewCards.map((review) => (
            <article className="contextual-menu__review-card" key={review.title}>
              <div>
                <p className="contextual-menu__review-stars">★★★★★</p>
                <h4>{review.title}</h4>
                <p>{review.copy}</p>
              </div>
              <footer>
                <strong>Verified customer</strong>
                <span>{review.date}</span>
              </footer>
            </article>
          ))}
        </div>
        <div className="contextual-menu__review-action-wrap">
          <button className="contextual-menu__review-action" type="button">See all reviews</button>
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function ComparePanel({ setState, isOpen, selectedSwatch }) {
  const [compareStep, setCompareStep] = useState(0);
  const [compareOffset, setCompareOffset] = useState(0);
  const compareScrollRef = useRef(null);
  const compareDragRef = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    startStep: 0,
    startLeft: 0,
  });
  const compareStepCount = 5;

  const getCompareStepLeft = (step) => {
    const scroller = compareScrollRef.current;

    if (!scroller) {
      return 0;
    }

    const track = scroller.querySelector('.contextual-menu__compare-track');
    const firstCard = track?.querySelector('.contextual-menu__compare-card');

    if (!track || !firstCard) {
      return 0;
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const stepSize = firstCard.getBoundingClientRect().width + gap;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    return Math.min(Math.max(step * stepSize + (step > 0 ? scroller.getBoundingClientRect().left : 0), 0), maxScrollLeft);
  };

  useEffect(() => {
    setCompareOffset(getCompareStepLeft(compareStep));
  }, [compareStep]);

  const handleCompareStep = (direction) => {
    setCompareStep((step) => Math.min(Math.max(step + direction, 0), compareStepCount - 1));
  };

  const setCompareScroller = (node) => {
    compareScrollRef.current = node;
  };

  const handleComparePointerDown = (event) => {
    const scroller = compareScrollRef.current;

    if (event.button !== 0 || !scroller) {
      return;
    }

    compareDragRef.current = {
      isPointerDown: true,
      isDragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startStep: compareStep,
      startLeft: getCompareStepLeft(compareStep),
    };

    scroller.setPointerCapture?.(event.pointerId);
    scroller.classList.add('is-dragging');
  };

  const handleComparePointerMove = (event) => {
    const scroller = compareScrollRef.current;
    const drag = compareDragRef.current;

    if (!scroller || !drag.isPointerDown || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - drag.startX;

    if (Math.abs(distance) > 3) {
      drag.isDragging = true;
    }

    if (!drag.isDragging) {
      return;
    }

    event.preventDefault();

    const previousLeft = getCompareStepLeft(Math.max(0, drag.startStep - 1));
    const nextLeft = getCompareStepLeft(Math.min(compareStepCount - 1, drag.startStep + 1));
    const previewLeft = Math.min(Math.max(drag.startLeft - distance, previousLeft), nextLeft);

    setCompareOffset(previewLeft);
  };

  const handleComparePointerUp = (event) => {
    const scroller = compareScrollRef.current;
    const drag = compareDragRef.current;

    if (!scroller || drag.pointerId !== event.pointerId) {
      return;
    }

    scroller.releasePointerCapture?.(event.pointerId);
    scroller.classList.remove('is-dragging');

    const distance = event.clientX - drag.startX;
    const didAdvance = drag.isDragging && Math.abs(distance) > 48;
    const direction = distance < 0 ? 1 : -1;
    const nextStep = didAdvance
      ? Math.min(Math.max(drag.startStep + direction, 0), compareStepCount - 1)
      : drag.startStep;

    compareDragRef.current.isPointerDown = false;
    compareDragRef.current.isDragging = false;
    compareDragRef.current.pointerId = null;
    const targetOffset = getCompareStepLeft(nextStep);

    setCompareOffset(targetOffset);
    window.requestAnimationFrame(() => {
      setCompareOffset(targetOffset);
    });
    window.setTimeout(() => {
      setCompareOffset(targetOffset);
    }, 80);
    setCompareStep(nextStep);
  };

  const handleCompareClickCapture = (event) => {
    if (compareDragRef.current.isDragging) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="contextual-menu__panel contextual-menu__panel--compare">
      <div className="contextual-menu__scroll-region">
        <PanelHeader title="Compare Kettles" setState={setState} />
        <div className="contextual-menu__compare-content">
          <div
            className="contextual-menu__compare-scroller"
            ref={setCompareScroller}
            style={{ '--compare-offset': `${-compareOffset}px` }}
            onPointerDown={handleComparePointerDown}
            onPointerMove={handleComparePointerMove}
            onPointerUp={handleComparePointerUp}
            onPointerCancel={handleComparePointerUp}
            onClickCapture={handleCompareClickCapture}
          >
            {compareProducts.map((product) => (
              <CompareProductRow product={product} key={product.key} />
            ))}
          </div>
          <div className="contextual-menu__compare-controls" aria-label="Compare kettle columns">
            <button
              className={compareStep === 0 ? 'is-muted' : ''}
              type="button"
              aria-label="Show previous compare section"
              disabled={compareStep === 0}
              onClick={() => handleCompareStep(-1)}
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
            <button
              className={compareStep === compareStepCount - 1 ? 'is-muted' : ''}
              type="button"
              aria-label="Show next compare section"
              disabled={compareStep === compareStepCount - 1}
              onClick={() => handleCompareStep(1)}
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </div>
        </div>
      </div>
      <BottomDock setState={setState} isOpen={isOpen} selectedSwatch={selectedSwatch} />
    </div>
  );
}

function CompareProductRow({ product }) {
  return (
    <section className="contextual-menu__compare-product">
      <div className="contextual-menu__compare-heading">
        <div>
          {product.eyebrow ? <p>{product.eyebrow}</p> : null}
          <h3>{product.name}</h3>
        </div>
      </div>
      <div
        className="contextual-menu__compare-track"
        aria-label={`${product.key} comparison details`}
      >
        <article className="contextual-menu__compare-card contextual-menu__compare-card--feature">
          <figure>
            <img src={product.image} alt="" />
          </figure>
          <div>
            <h4>Features</h4>
            <p>{product.features.join(' ')}</p>
          </div>
        </article>
        <article className="contextual-menu__compare-card contextual-menu__compare-card--stat">
          <span>Capacity</span>
          <strong>{product.capacity}</strong>
        </article>
        <article className="contextual-menu__compare-card contextual-menu__compare-card--dimensions">
          {['Width', 'Depth', 'Height'].map((label, dimensionIndex) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{product.dimensions[dimensionIndex]}</strong>
            </div>
          ))}
        </article>
        <article className="contextual-menu__compare-card contextual-menu__compare-card--swatches" aria-label={`${product.key} finishes`}>
          {product.swatches.map((swatch) => (
            <span key={swatch.name}>
              <img src={swatch.image} alt="" />
            </span>
          ))}
        </article>
        <article className="contextual-menu__compare-card contextual-menu__compare-card--summary">
          <h4>{product.summaryTitle}</h4>
          <p>{product.summary}</p>
        </article>
      </div>
    </section>
  );
}

function PanelHeader({ title, setState }) {
  return (
    <>
      <div className="contextual-menu__state-header">
        <h2>{title}</h2>
        <button type="button" onClick={() => setState('menu')}>Menu</button>
      </div>
      <div className="contextual-menu__divider" />
    </>
  );
}

function useDragScroll({ onScroll } = {}) {
  const ref = useRef(null);
  const drag = useRef({
    isPointerDown: false,
    isDragging: false,
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
  });

  const stopDragging = (event) => {
    const rail = ref.current;

    if (rail && drag.current.pointerId === event.pointerId) {
      rail.releasePointerCapture?.(event.pointerId);
      rail.classList.remove('is-dragging');
    }

    drag.current.isPointerDown = false;
    drag.current.pointerId = null;
  };

  return {
    ref,
    onPointerDown: (event) => {
      if (event.button !== 0 || !ref.current) {
        return;
      }

      drag.current = {
        isPointerDown: true,
        isDragging: false,
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: ref.current.scrollLeft,
      };
      ref.current.setPointerCapture?.(event.pointerId);
      ref.current.classList.add('is-dragging');
    },
    onPointerMove: (event) => {
      const rail = ref.current;

      if (!rail || !drag.current.isPointerDown || drag.current.pointerId !== event.pointerId) {
        return;
      }

      const distance = event.clientX - drag.current.startX;

      if (Math.abs(distance) > 3) {
        drag.current.isDragging = true;
      }

      if (drag.current.isDragging) {
        event.preventDefault();
        rail.scrollLeft = drag.current.scrollLeft - distance;
        onScroll?.(rail);
      }
    },
    onPointerUp: stopDragging,
    onClickCapture: (event) => {
      if (drag.current.isDragging) {
        event.preventDefault();
        event.stopPropagation();
        drag.current.isDragging = false;
      }
    },
  };
}

function BottomDock({ setState, isOpen, selectedSwatch }) {
  return (
    <div className="contextual-menu__dock contextual-menu__dock--product">
      <button className="contextual-menu__add-to-cart" type="button">Add to cart</button>
      <button className="contextual-menu__cart-button" type="button" aria-label="Add to cart">
        <img className="contextual-menu__cart-icon" src="/assets/images/contextual-menu-cart.svg" alt="" aria-hidden="true" />
      </button>
      <MenuBar
        isOpen={isOpen}
        onMenuToggle={() => setState('closed')}
        onShopClick={() => setState('product')}
        selectedSwatch={selectedSwatch}
      />
      <span className="contextual-menu__dock-spacer" aria-hidden="true" />
    </div>
  );
}

function MenuBar({ isOpen, onMenuToggle, onShopClick, selectedSwatch = swatches[0] }) {
  return (
    <div className="contextual-menu__bar" data-node-id={isOpen ? '10351:32455' : '10352:32518'}>
      <button className="contextual-menu__shop" type="button" aria-label="Open product options" onClick={onShopClick}>
        <span className="contextual-menu__swatch" aria-hidden="true">
          <img src={selectedSwatch.image} alt="" />
        </span>
        <span className="contextual-menu__price-lockup">
          <span className="contextual-menu__price">$219.95</span>
          <span className="contextual-menu__review">
            <svg className="contextual-menu__star" aria-hidden="true" viewBox="0 0 12 12" focusable="false">
              <path d="M5.70634 0L7.05342 4.1459H11.4127L7.88597 6.7082L9.23305 10.8541L5.70634 8.2918L2.17963 10.8541L3.52671 6.7082L0 4.1459H4.35925L5.70634 0Z" transform="translate(0.29365 0)" />
            </svg>
            <span>4.5</span>
          </span>
        </span>
      </button>
      <button
        className="contextual-menu__button"
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={onMenuToggle}
      >
        <span className="contextual-menu__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  );
}
