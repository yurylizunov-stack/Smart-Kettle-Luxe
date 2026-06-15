import React, { useEffect, useRef, useState } from 'react';

const navItems = ['Overview', 'Features', 'Specs', 'Reviews', 'Faqs'];
const compareSections = ['features', 'capacity', 'dimensions', 'colors', 'summary'];
const maxCompareSectionIndex = compareSections.length - 2;
const compareStepWidth = {
  desktop: 398,
  mobile: 318,
};
const compareSwatches = [
  'Brushed Stainless Steel',
  'Black Truffle',
  'Sea Salt',
  'Damson Blue',
  'Almond Nougat',
  'Olive Tapenade',
  'Noir',
  'Sea Salt Brass',
  'Damson Blue Brass',
  'Olive Tapenade Brass',
  'Brushed Stainless Steel Brass',
  'an Aboriginal Culinary Journey',
];

const compareProducts = [
  {
    key: 'smart-kettle-luxe',
    eyebrow: 'Currently Viewing',
    name: 'the Smart Kettle™ Luxe',
    image: '/assets/images/story-compare-smart-kettle-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Soft Top Lid'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: compareSwatches.slice(0, 12),
    summaryTitle: 'Pure Clarity, Thoughtfully Refined',
    summary: 'Elegant design, precise heating performance, and intuitive smart features',
  },
  {
    key: 'smart-crystal-luxe',
    name: 'the Smart Crystal Luxe™',
    image: '/assets/images/story-compare-crystal-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Glass body'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: ['Brushed Stainless Steel', 'Sea Salt'],
    summaryTitle: 'Refined Visibility, Everyday Ease',
    summary: 'Clear glass body, fast heating, and smart presets for repeatable rituals',
  },
  {
    key: 'iq-kettle-pure',
    name: 'the IQ Kettle™ Pure',
    image: '/assets/images/story-compare-iq-pure.png',
    features: ['5 Pre-sets, Keep Warm.'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: ['Brushed Stainless Steel'],
    summaryTitle: 'Everyday Precision, Made Pure',
    summary: 'Clean minimalist design, fast and accurate temperature control, and dependable performance',
  },
];

function TrimmedText({ children, className = '', as: Component = 'span' }) {
  return (
    <Component className={`figma-sticky-nav__trimmed-text${className ? ` ${className}` : ''}`}>
      {children}
    </Component>
  );
}

export default function StickyNavBlankPage() {
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  return (
    <main className="figma-sticky-nav-page" aria-label="Blank sticky navigation page">
      <div className="figma-sticky-nav-page__shell">
        <nav className="figma-sticky-nav" aria-label="Product navigation" data-node-id="10765:32274">
          <div className="figma-sticky-nav__product" data-node-id="10765:32275">
            <TrimmedText className="figma-sticky-nav__title">
              the Smart Kettle&trade; Luxe
            </TrimmedText>
            <button
              className="figma-sticky-nav__compare"
              type="button"
              onClick={() => setIsCompareOpen(true)}
            >
              <TrimmedText>Compare Kettles</TrimmedText>
            </button>
          </div>

          <div className="figma-sticky-nav__tabs" aria-label="Page sections" data-node-id="10765:32278">
            {navItems.map((item, index) => (
              <a
                className={`figma-sticky-nav__tab${index === 0 ? ' is-active' : ''}`}
                href={`#${item.toLowerCase()}`}
                data-node-id={`10765:${32279 + (index * 2)}`}
                key={item}
              >
                <TrimmedText>{item}</TrimmedText>
              </a>
            ))}
          </div>

          <div className="figma-sticky-nav__commerce" data-node-id="10765:32289">
            <a className="figma-sticky-nav__shop" href="#shop" data-node-id="10765:32290">
              <TrimmedText>Shop now</TrimmedText>
            </a>

            <div className="figma-sticky-nav__price-lockup" data-node-id="10765:32292">
              <TrimmedText className="figma-sticky-nav__price">
                $219.95
              </TrimmedText>
              <img
                className="figma-sticky-nav__stars"
                src="/assets/images/figma-sticky-nav-stars.svg"
                alt="4.5 out of 5 stars"
                data-node-id="10765:32296"
              />
            </div>
          </div>
        </nav>
      </div>

      {isCompareOpen ? (
        <CompareTakeover onClose={() => setIsCompareOpen(false)} />
      ) : null}
    </main>
  );
}

function CompareTakeover({ onClose }) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMobileCompare, setIsMobileCompare] = useState(false);
  const dragRef = useRef({
    isPointerDown: false,
    pointerId: null,
    startX: 0,
    dragX: 0,
  });
  const [, forceRender] = useState(0);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 720px)');
    const updateMobileCompare = () => setIsMobileCompare(mobileQuery.matches);

    updateMobileCompare();
    mobileQuery.addEventListener('change', updateMobileCompare);

    return () => mobileQuery.removeEventListener('change', updateMobileCompare);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        setSectionIndex((index) => Math.max(0, index - 1));
      }

      if (event.key === 'ArrowRight') {
        setSectionIndex((index) => Math.min(maxCompareSectionIndex, index + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const setDragX = (dragX) => {
    dragRef.current.dragX = dragX;
    forceRender((tick) => tick + 1);
  };

  const goToSection = (nextIndex) => {
    setSectionIndex(Math.min(Math.max(nextIndex, 0), maxCompareSectionIndex));
    setDragX(0);
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    dragRef.current = {
      isPointerDown: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      dragX: 0,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag.isPointerDown || drag.pointerId !== event.pointerId) {
      return;
    }

    const minDrag = sectionIndex === maxCompareSectionIndex ? 0 : -160;
    const maxDrag = sectionIndex === 0 ? 0 : 160;
    const nextDragX = Math.min(Math.max(event.clientX - drag.startX, minDrag), maxDrag);

    setDragX(nextDragX);
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;

    if (drag.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    if (!drag.isPointerDown) {
      return;
    }

    const didAdvance = Math.abs(drag.dragX) > 56;
    const direction = drag.dragX < 0 ? 1 : -1;
    dragRef.current.isPointerDown = false;
    dragRef.current.pointerId = null;

    goToSection(didAdvance ? sectionIndex + direction : sectionIndex);
  };

  const railTranslateX = (sectionIndex * -(isMobileCompare ? compareStepWidth.mobile : compareStepWidth.desktop))
    + dragRef.current.dragX;

  return (
    <section className="figma-compare-takeover" aria-label="Compare kettles" aria-modal="true" role="dialog">
      <div className="figma-compare-takeover__scrim" aria-hidden="true" />
      <div className="figma-compare-modal" data-node-id="10692:30960">
        <header className="figma-compare-modal__header" data-node-id="10692:30961">
          <div className="figma-compare-modal__title-row" data-node-id="10692:30962">
            <TrimmedText as="h2">Compare Kettles</TrimmedText>
            <button className="figma-compare-modal__close" type="button" aria-label="Close compare" onClick={onClose}>
              <img src="/assets/images/figma-compare-close.svg" alt="" aria-hidden="true" />
            </button>
          </div>
          <div className="figma-compare-modal__divider" />
        </header>

        <div className="figma-compare-modal__body">
          <div className="figma-compare-modal__section-head">
            <div className="figma-compare-modal__current">
              <TrimmedText className="figma-compare-modal__eyebrow">Currently Viewing</TrimmedText>
              <TrimmedText as="h3">the Smart Kettle&trade; Luxe</TrimmedText>
            </div>
            <div className="figma-compare-modal__controls" aria-label="Compare sections">
              <button
                className="figma-compare-modal__arrow figma-compare-modal__arrow--previous"
                type="button"
                aria-label="Previous compare section"
                disabled={sectionIndex === 0}
                onClick={() => goToSection(sectionIndex - 1)}
              >
                <img src="/assets/images/figma-compare-arrow-left.svg" alt="" aria-hidden="true" />
              </button>
              <button
                className="figma-compare-modal__arrow figma-compare-modal__arrow--next"
                type="button"
                aria-label="Next compare section"
                disabled={sectionIndex === maxCompareSectionIndex}
                onClick={() => goToSection(sectionIndex + 1)}
              >
                <img src="/assets/images/figma-compare-arrow-right.svg" alt="" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={`figma-compare-modal__rows${dragRef.current.isPointerDown ? ' is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {compareProducts.map((product) => (
              <CompareProductRow product={product} translateX={railTranslateX} key={product.key} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareProductRow({ product, translateX }) {
  return (
    <section className="figma-compare-row">
      {product.eyebrow ? null : (
        <TrimmedText className="figma-compare-row__title" as="h3">
          {product.name}
        </TrimmedText>
      )}
      <div className="figma-compare-row__viewport">
        <div
          className="figma-compare-row__rail"
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        >
          <article className="figma-compare-card figma-compare-card--feature">
            <figure>
              <img src={product.image} alt="" />
            </figure>
            <div>
              <TrimmedText as="h4">Features</TrimmedText>
              <p>{product.features.map((line) => <span key={line}>{line}</span>)}</p>
            </div>
          </article>

          <article className="figma-compare-card figma-compare-card--center">
            <TrimmedText>Capacity</TrimmedText>
            <TrimmedText as="strong">{product.capacity}</TrimmedText>
          </article>

          <article className="figma-compare-card figma-compare-card--dimensions">
            {['Width', 'Depth', 'Height'].map((label, index) => (
              <div key={label}>
                <TrimmedText>{label}</TrimmedText>
                <TrimmedText as="strong">{product.dimensions[index]}</TrimmedText>
              </div>
            ))}
          </article>

          <article className="figma-compare-card figma-compare-card--swatches" aria-label={`${product.name} colors`}>
            <div>
              {product.swatches.map((swatch) => (
                <span className="figma-compare-swatch" key={swatch}>
                  <img src={`/assets/images/swatches/${swatch}.png`} alt="" />
                </span>
              ))}
            </div>
          </article>

          <article className="figma-compare-card figma-compare-card--summary">
            <TrimmedText as="h4">{product.summaryTitle}</TrimmedText>
            <p>{product.summary}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
