import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CompareTakeover } from './StickyNavBlankPage.jsx';
import { TestingFooter } from './testing/MotionSupport.jsx';

const ASSET_ROOT = '/assets/images/review-highlights';
const PRODUCT_IMAGE_ROOT = '/assets/images/kettle_straight/web_p';
const SWATCH_ROOT = '/assets/images/swatches';
const BUYBOX_ASSET_ROOT = `${ASSET_ROOT}/buybox`;
const HEADER_ASSET_ROOT = `${ASSET_ROOT}/header`;
const HERO_VIDEO = '/assets/videos/desktop_warm_1920.mp4';
const UPDATE_3_PATH = '/update-3';
const FEATURE_SEQUENCE_DURATION = 2600;
const FEATURE_SEQUENCE_CROSSFADE_DURATION = 450;
const FEATURE_SEQUENCES = {
  0: {
    root: '/assets/sequences/feature_1_webp',
    prefix: 'feature 1',
    frameCount: 188,
    loopStartFrame: 72,
  },
  1: {
    root: '/assets/sequences/feature_2_webp',
    prefix: 'feature_2',
    frameCount: 97,
  },
  2: {
    root: '/assets/sequences/feature_3_webp',
    prefix: 'feature_3',
    frameCount: 242,
    loopStartFrame: 169,
  },
  4: {
    root: '/assets/sequences/feature_4_webp',
    prefix: 'feature_4',
    frameCount: 170,
  },
};

const getFeatureSequenceFrame = (sequence, frame) => `${sequence.root}/${sequence.prefix}_${String(frame).padStart(5, '0')}.webp`;
const getFeatureSequenceForIndex = (index) => FEATURE_SEQUENCES[index] || FEATURE_SEQUENCES[0];
const getFeatureSequenceForHighlight = (highlight) => getFeatureSequenceForIndex(highlight?.sequenceKey ?? 0);
const ABOUT_COPY = 'This 7 cup capacity smart kettle knows the ideal temperature to bring out optimal taste and quality of your favorite tea or coffee. 5 temperature settings to brew Black, Green, White, Oolong Tea and French press coffee. Also features a soft opening lid to gently release hot steam and prevent hot water splash back.';

const galleryItems = [
  {
    label: 'Product shot',
    type: 'product',
  },
  {
    label: 'Product video',
    type: 'video',
    video: HERO_VIDEO,
  },
];

const colorOptions = [
  { name: 'Brushed Stainless Steel', model: 'BKE845BSS1BUS1', image: `${PRODUCT_IMAGE_ROOT}/1.webp`, swatch: `${SWATCH_ROOT}/Brushed Stainless Steel.png` },
  { name: 'Black Truffle', model: 'BKE845BTR1BUS1', image: `${PRODUCT_IMAGE_ROOT}/2.webp`, swatch: `${SWATCH_ROOT}/Black Truffle.png` },
  { name: 'Sea Salt', model: 'BKE845SST1BUS1', image: `${PRODUCT_IMAGE_ROOT}/3.webp`, swatch: `${SWATCH_ROOT}/Sea Salt.png` },
  { name: 'Damson Blue', model: 'BKE845DBL1BUS1', image: `${PRODUCT_IMAGE_ROOT}/4.webp`, swatch: `${SWATCH_ROOT}/Damson Blue.png` },
  { name: 'Almond Nougat', model: 'BKE845ANU1BUS1', image: `${PRODUCT_IMAGE_ROOT}/5.webp`, swatch: `${SWATCH_ROOT}/Almond Nougat.png` },
  { name: 'Olive Tapenade', model: 'BKE845OLT1BUS1', image: `${PRODUCT_IMAGE_ROOT}/6.webp`, swatch: `${SWATCH_ROOT}/Olive Tapenade.png` },
  { name: 'Noir', model: 'BKE845NIR1BUS1', image: `${PRODUCT_IMAGE_ROOT}/7.webp`, swatch: `${SWATCH_ROOT}/Noir.png` },
  { name: 'Damson Blue Brass', model: 'BKE845DBB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/8.webp`, swatch: `${SWATCH_ROOT}/Damson Blue Brass.png` },
  { name: 'Sea Salt Brass', model: 'BKE845SSB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/9.webp`, swatch: `${SWATCH_ROOT}/Sea Salt Brass.png` },
  { name: 'Olive Tapenade Brass', model: 'BKE845OTB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/10.webp`, swatch: `${SWATCH_ROOT}/Olive Tapenade Brass.png` },
  { name: 'Brushed Stainless Steel Brass', model: 'BKE845BSB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/11.webp`, swatch: `${SWATCH_ROOT}/Brushed Stainless Steel Brass.png` },
  { name: 'an Aboriginal Culinary Journey', model: 'BKE845ACJ1BUS1', image: `${PRODUCT_IMAGE_ROOT}/12.webp`, swatch: `${SWATCH_ROOT}/an Aboriginal Culinary Journey.png` },
];

const highlights = [
  {
    title: '5 Varietal Settings',
    copy: 'Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee.',
    color: '#4c1b1b',
    sequenceKey: 0,
  },
  {
    title: 'Keep Warm Button',
    copy: 'Maintain your selected temperature for another pour, so your next cup is ready without restarting the full boil cycle.',
    color: '#273b34',
    sequenceKey: 1,
  },
  {
    title: 'Soft Opening™ Lid',
    copy: 'A soft opening lid releases steam gently and helps prevent hot water splash back while you refill or serve.',
    color: '#2f3f52',
    sequenceKey: 2,
  },
  {
    title: 'BPA Free Materials',
    copy: 'Food-contact materials are BPA free, with durable stainless steel construction designed for everyday brewing.',
    color: '#3c3c3a',
    sequenceKey: 4,
    fillHeight: true,
  },
];

const specsColumns = [
  [
    { label: 'Dimensions (WxDxH)', value: ['7.1" x 9.6" x 9.9"'] },
    { label: 'Construction Materials', value: ['Brushed Stainless Steel'] },
    { label: 'Capacity', value: ['57 oz. / 1.7 liter / 7 Cup Capacity'] },
  ],
  [
    {
      label: 'Settings',
      value: ['5 Preprogrammed Temperature Settings', 'Keep Warm Button', 'Auto shut off and boil dry protection'],
    },
    { label: 'Power', value: ['1500 Watts'] },
  ],
  [
    { label: 'Voltage', value: ['110–120 Volts'] },
    { label: 'Warranty', value: ['1 Year Limited Warranty'] },
    { label: 'Weight', value: ['3.86 lbs / 1.75 kg'] },
  ],
];

const specs = specsColumns.flat();

const included = [
  { title: 'Kettle Base', image: `${ASSET_ROOT}/included/kettle-body.png` },
  { title: 'Kettle Base', image: `${ASSET_ROOT}/included/kettle-base.png`, blend: true },
  { title: 'Manual and Warranty Card', image: `${ASSET_ROOT}/included/manual-warranty.png` },
];

const supportCards = [
  { title: 'Instruction Manual', titleLines: ['Instruction', 'Manual'], mobileTitle: 'User Manual', image: `${ASSET_ROOT}/support/instruction-manual.png` },
  { title: 'Return Policies', titleLines: ['Return', 'Policies'], image: `${ASSET_ROOT}/support/return-policies.png` },
];

const faqs = [
  [
    'Can I hold a selected temperature?',
    'Yes. The keep warm control holds water temperature for repeat pours.',
  ],
  [
    'Does the lid open slowly?',
    'Yes. The soft opening lid releases steam gradually and reduces splash-back.',
  ],
  [
    'Can I choose tea-specific settings?',
    'Yes. Preset controls support green, white, oolong, black tea, and French press.',
  ],
];

const videos = [
  { title: 'TikTok review 1', source: '/assets/videos/tiktok review 1.mp4' },
  { title: 'TikTok review 2', source: '/assets/videos/tiktok review 2.mp4' },
];

const reviewMeters = [
  { label: '5 stars', count: '135', fill: 89.2, mobileFill: 73.2 },
  { label: '4 stars', count: '21', fill: 63.6, mobileFill: 36.0 },
  { label: '3 stars', count: '10', fill: 59.9, mobileFill: 26.6 },
  { label: '2 stars', count: '07', fill: 61.9, mobileFill: 25.2 },
  { label: '1 star', count: '17', fill: 61.0, mobileFill: 32.0 },
];

const accessories = [
  {
    title: 'Filter',
    price: '$6.95',
    image: `${ASSET_ROOT}/parts/parts-accessories-01.png`,
  },
  {
    title: 'Base Cord Assembly',
    price: '$49.95',
    detail: 'Brushed Stainless Steel',
    image: `${ASSET_ROOT}/parts/parts-accessories-02.png`,
  },
  {
    title: 'the Machine Descaler™',
    price: '$19.95',
    image: `${ASSET_ROOT}/parts/parts-accessories-03.png`,
  },
  {
    title: 'the Descaler',
    price: '$14.95',
    image: `${ASSET_ROOT}/parts/parts-accessories-04.png`,
  },
];

const relatedProducts = [
  {
    title: 'the IQ Kettle™',
    price: '$179.95',
    detail: '5 temperature settings and soft open lid.',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-01.png`,
  },
  {
    title: 'the Temp Select™',
    price: '$109.95',
    detail: '5 temperature settings for tea and coffee.',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-02.png`,
  },
  {
    title: 'the Soft Top™ Pure',
    price: '$99.95',
    detail: 'BPA Free windows & metal filter',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-03.png`,
  },
  {
    title: 'the Crystal Clear™',
    price: '$109.95',
    detail: 'Elegant and efficient kettle with Dura Glass™.',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-04.png`,
  },
  {
    title: 'the Smart Crystal Luxe™',
    price: '$219.95',
    detail: 'Brew tea intelligently with 5 varietal settings and large capacity.',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-05.png`,
  },
  {
    title: 'the IQ Kettle™ Pure',
    price: '$199.95',
    detail: '5 temperature settings and soft open lid.',
    image: `${ASSET_ROOT}/carousel/you-may-also-like-06.png`,
  },
];

function StarRow({ small = false }) {
  const stars = small ? ['star-full', 'star-full', 'star-full', 'star-full', 'star-full'] : ['star-full', 'star-full', 'star-full', 'star-full', 'star-half'];

  return (
    <span className={`review-highlights-stars${small ? ' review-highlights-stars--small' : ''}`} aria-hidden="true">
      {stars.map((star, index) => (
        <img src={`${BUYBOX_ASSET_ROOT}/${star}.svg`} alt="" key={`${star}-${index}`} />
      ))}
    </span>
  );
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg className={direction === 'left' ? 'is-left' : ''} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ReviewHeader() {
  return (
    <header className="review-highlights-header">
      <nav className="review-highlights-header__nav" aria-label="Primary navigation">
        <a className="review-highlights-header__logo-link" href={UPDATE_3_PATH} aria-label="Breville home">
          <img src={`${HEADER_ASSET_ROOT}/logo.svg`} alt="Breville" />
        </a>

        <div className="review-highlights-header__links" aria-label="Main navigation links">
          {['Shop', 'Recipes', 'Breville+ App', 'Support', 'Sales & Offers'].map((label) => (
            <a href={UPDATE_3_PATH} key={label}>
              {label}
            </a>
          ))}
        </div>

        <div className="review-highlights-header__actions" aria-label="Quick links">
          <button type="button" aria-label="Search">
            <img src={`${HEADER_ASSET_ROOT}/search.svg`} alt="" />
          </button>
          <button type="button" aria-label="Account">
            <img src={`${HEADER_ASSET_ROOT}/user.svg`} alt="" />
          </button>
          <button type="button" aria-label="Cart">
            <img src={`${HEADER_ASSET_ROOT}/cart.svg`} alt="" />
          </button>
          <button className="review-highlights-header__menu" type="button" aria-label="Menu">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

function useRailScroll() {
  const ref = useRef(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const updateState = () => {
      setCanScrollBack(node.scrollLeft > 1);
      setCanScrollForward(node.scrollLeft + node.clientWidth < node.scrollWidth - 1);
    };

    updateState();
    node.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);

    return () => {
      node.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  const scrollBy = (direction) => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.scrollBy({
      left: direction * 620,
      behavior: 'smooth',
    });
  };

  return { ref, scrollBy, canScrollBack, canScrollForward };
}

function ProductRail({ title, items, actionLabel, onAction }) {
  const rail = useRailScroll();

  return (
    <section className="review-highlights-rail" aria-label={title}>
      <div className="review-highlights-section-title">
        <h2>{title}</h2>
        <div className="review-highlights-rail__buttons">
          <button type="button" aria-label={`Previous ${title}`} disabled={!rail.canScrollBack} onClick={() => rail.scrollBy(-1)}>
            <ArrowIcon direction="left" />
          </button>
          <button type="button" aria-label={`Next ${title}`} disabled={!rail.canScrollForward} onClick={() => rail.scrollBy(1)}>
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div className="review-highlights-rail__track" ref={rail.ref}>
        {items.map((item) => (
          <article
            className="review-highlights-product-card"
            style={{ '--rh-rail-item-count': items.length }}
            key={item.title}
          >
            <figure>
              <img src={item.image} alt="" />
            </figure>
            <div className="review-highlights-product-card__copy">
              <div className="review-highlights-product-card__meta">
                <strong>{item.title}</strong>
                <span>{item.price}</span>
              </div>
              {item.detail ? <p>{item.detail}</p> : null}
            </div>
          </article>
        ))}
      </div>

      {actionLabel ? (
        <div className="review-highlights-rail__action">
          <button type="button" onClick={onAction}>{actionLabel}</button>
        </div>
      ) : null}
    </section>
  );
}

function AccordionSection({ title, children, defaultOpen = false, className = '', mobileTitle }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reactId = useId();
  const contentId = useMemo(() => `review-${reactId.replace(/:/g, '')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, [reactId, title]);

  return (
    <section className={`review-highlights-accordion${className ? ` ${className}` : ''}${isOpen ? ' is-open' : ''}`}>
      <button
        className="review-highlights-accordion__header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>
          <span className="review-highlights-accordion__title-desktop">{title}</span>
          {mobileTitle ? <span className="review-highlights-accordion__title-mobile">{mobileTitle}</span> : null}
        </span>
        <span className="review-highlights-accordion__icon" aria-hidden="true" />
      </button>
      <div className="review-highlights-accordion__content" id={contentId}>
        {children}
      </div>
    </section>
  );
}

function AccordionOnlyTechnicalSpecs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`review-highlights-accordion-only__item${isOpen ? ' is-open' : ''}`} aria-label="Technical Specifications">
      <button
        className="review-highlights-accordion-only__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>Technical Specifications</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__content review-highlights-accordion-only__content--specs">
          {specsColumns.map((column, columnIndex) => (
            <div className="review-highlights-accordion-only__column" key={`accordion-only-specs-${columnIndex}`}>
              {column.map((item) => (
                <article className="review-highlights-accordion-only__spec" key={`accordion-only-${item.label}`}>
                  <strong>{item.label}</strong>
                  <p>
                    {item.value.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function AccordionOnlySupportDocumentation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`review-highlights-accordion-only__item review-highlights-accordion-only__item--support${isOpen ? ' is-open' : ''}`} aria-label="Support & Documentation">
      <button
        className="review-highlights-accordion-only__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>Support &amp; Documentation</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__support">
          <article className="review-highlights-accordion-only__support-hub">
            <figure>
              <img src={`${ASSET_ROOT}/support/product-hub.png`} alt="" />
            </figure>
            <div className="review-highlights-accordion-only__support-hub-copy">
              <div>
                <strong>Product Hub</strong>
                <p>Download setup, cleaning, and safety guidance.</p>
              </div>
              <img src={`${ASSET_ROOT}/support/arrow-right.svg`} alt="" />
            </div>
          </article>

          <div className="review-highlights-accordion-only__support-cards">
            {supportCards.map((item) => (
              <article className="review-highlights-accordion-only__support-card" key={`accordion-only-support-${item.title}`}>
                <div>
                  <strong>
                    {item.titleLines.map((line, index) => (
                      <React.Fragment key={line}>
                        {line}
                        {index < item.titleLines.length - 1 ? <br aria-hidden="true" /> : null}
                      </React.Fragment>
                    ))}
                  </strong>
                  <img src={`${ASSET_ROOT}/support/arrow-right.svg`} alt="" />
                </div>
                <figure>
                  <img src={item.image} alt="" />
                </figure>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AccordionOnlyCustomerReviews() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`review-highlights-accordion-only__item review-highlights-accordion-only__item--reviews${isOpen ? ' is-open' : ''}`} aria-label="Customer Reviews">
      <button
        className="review-highlights-accordion-only__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>Customer Reviews</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__reviews">
          <div className="review-highlights-accordion-only__reviews-summary">
            <strong>4.5</strong>
            <div>
              <p>
                <img src={`${ASSET_ROOT}/reviews/stars-4-5.svg`} alt="" />
                <span>190 reviews</span>
              </p>
              <small>135 out 166 (81%) reviewers recommended this product</small>
            </div>
          </div>

          <div className="review-highlights-accordion-only__reviews-chart">
            <div className="review-highlights-accordion-only__reviews-labels" aria-hidden="true">
              {reviewMeters.map((meter) => (
                <span key={`accordion-only-review-label-${meter.label}`}>{meter.label}</span>
              ))}
            </div>
            <div className="review-highlights-accordion-only__reviews-bars">
              {reviewMeters.map((meter) => (
                <div className="review-highlights-accordion-only__reviews-meter" key={`accordion-only-review-meter-${meter.label}`}>
                  <i />
                </div>
              ))}
            </div>
            <div className="review-highlights-accordion-only__reviews-counts" aria-hidden="true">
              {reviewMeters.map((meter) => (
                <span key={`accordion-only-review-count-${meter.label}`}>{meter.count}</span>
              ))}
            </div>
            <span className="review-highlights-reviews__sr-only">
              {reviewMeters.map((meter) => `${meter.label}: ${meter.count}`).join(', ')}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AccordionOnlyWhatsIncluded() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`review-highlights-accordion-only__item review-highlights-accordion-only__item--included${isOpen ? ' is-open' : ''}`} aria-label="What's Included">
      <button
        className="review-highlights-accordion-only__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>What&rsquo;s Included</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__content review-highlights-accordion-only__content--included">
          {included.map((item) => (
            <article className="review-highlights-accordion-only__included-card" key={`accordion-only-included-${item.title}-${item.image}`}>
              <figure>
                <img className={item.blend ? 'is-multiply' : ''} src={item.image} alt="" />
              </figure>
              <p>{item.title}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function AccordionOnlyFaqs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`review-highlights-accordion-only__item review-highlights-accordion-only__item--faqs${isOpen ? ' is-open' : ''}`} aria-label="FAQS">
      <button
        className="review-highlights-accordion-only__faqs-toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>FAQS</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__faqs-list">
          {faqs.map(([question, answer], index) => (
            <article className="review-highlights-accordion-only__faq" key={`accordion-only-faq-${question}-${index}`}>
              <strong>{question}</strong>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function AccordionOnlyVideos() {
  const [isOpen, setIsOpen] = useState(false);

  const resetAccordionOnlyVideos = (activeMedia) => {
    document.querySelectorAll('.review-highlights-videos video, .review-highlights-accordion-only__videos video').forEach((media) => {
      if (media === activeMedia) {
        return;
      }

      media.pause();
      try {
        media.currentTime = 0;
      } catch {
        // Seeking can fail before metadata is ready.
      }
    });
  };

  return (
    <section className={`review-highlights-accordion-only__item review-highlights-accordion-only__item--videos${isOpen ? ' is-open' : ''}`} aria-label="Videos">
      <button
        className="review-highlights-accordion-only__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span>Videos</span>
        <i aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="review-highlights-accordion-only__content review-highlights-accordion-only__videos">
          {videos.map((video, index) => (
            <button
              type="button"
              key={`accordion-only-video-${video.title}`}
              aria-label={`Play ${video.title}`}
              onClick={(event) => {
                const media = event.currentTarget.querySelector('video');
                if (!media) return;
                if (media.paused) {
                  resetAccordionOnlyVideos(media);
                  media.play().catch(() => {});
                } else {
                  media.pause();
                }
              }}
            >
              <video
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                onPlay={(event) => resetAccordionOnlyVideos(event.currentTarget)}
              >
                <source src={video.source} type="video/mp4" />
              </video>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function ReviewHighlightsPage() {
  const [selectedGallery, setSelectedGallery] = useState('product');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedHighlight, setSelectedHighlight] = useState(0);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isFeatureCarouselDragging, setIsFeatureCarouselDragging] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 760px)').matches : false
  ));
  const [layoutOptions, setLayoutOptions] = useState({
    debugView: 'fullscreen',
    aboutCopyInBuybox: true,
    highlightsCarousel: false,
    productRailTenColumn: true,
    heroFullBleed: true,
    heroFullBleedAbout: false,
    heroFullBleedCollection: false,
    heroThumbsLeftAligned: true,
    heroSplitFullBleed: false,
    btfTenColumn: false,
    accordionOnly: true,
    fullScreenBiggerText: true,
    columnGuides: false,
  });
  const [featureFrame, setFeatureFrame] = useState(0);
  const [featurePlaybackKey, setFeaturePlaybackKey] = useState(0);
  const [featureTransitionImage, setFeatureTransitionImage] = useState(null);
  const [isFeatureIntroVisible, setIsFeatureIntroVisible] = useState(false);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const heroTrackRef = useRef(null);
  const videoTrackRef = useRef(null);
  const featureSectionRef = useRef(null);
  const featureCarouselRef = useRef(null);
  const pageRef = useRef(null);
  const featureCarouselDragRef = useRef({
    isPointerDown: false,
    didDrag: false,
    pointerId: null,
    startX: 0,
    startLeft: 0,
  });
  const featureAnimationRef = useRef(null);
  const featureAnimationDelayRef = useRef(null);
  const featureFrameRef = useRef(0);
  const featureAnimationStateRef = useRef({ selectedHighlight: 0, playbackKey: 0 });
  const featureTransitionRef = useRef(null);
  const activeColor = colorOptions[selectedColor];
  const activeHighlight = highlights[selectedHighlight] || highlights[0];
  const activeFeatureSequence = getFeatureSequenceForHighlight(activeHighlight);
  const activeFeatureFrame = Math.min(featureFrame, activeFeatureSequence.frameCount - 1);
  const activeFeatureSrc = getFeatureSequenceFrame(activeFeatureSequence, activeFeatureFrame);
  const nextHighlightIndex = ((selectedHighlight ?? 0) + 1) % highlights.length;
  const nextHighlight = highlights[nextHighlightIndex];
  const nextFeatureSequence = getFeatureSequenceForHighlight(nextHighlight);
  const nextFeatureSrc = getFeatureSequenceFrame(nextFeatureSequence, 0);
  const isVideoSelected = selectedGallery === 'video';

  const selectGallery = (type) => {
    setSelectedGallery(type);

    const track = heroTrackRef.current;
    if (!track || !window.matchMedia('(max-width: 760px)').matches) {
      return;
    }

    const slide = track.querySelector(`[data-gallery-slide="${type}"]`);
    if (!slide) {
      return;
    }

    const paddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: slide.offsetLeft - paddingLeft,
      behavior: 'smooth',
    });
  };

  const handleHeroScroll = (event) => {
    if (!window.matchMedia('(max-width: 760px)').matches) {
      return;
    }

    const track = event.currentTarget;
    const slide = track.querySelector('.review-highlights-product__hero-slide');
    if (!slide) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    const index = Math.max(0, Math.min(galleryItems.length - 1, Math.round(track.scrollLeft / step)));
    const nextGallery = galleryItems[index]?.type;

    if (nextGallery && nextGallery !== selectedGallery) {
      setSelectedGallery(nextGallery);
    }
  };

  const selectVideoIndex = (index) => {
    setSelectedVideoIndex(index);

    const track = videoTrackRef.current;
    if (!track || !window.matchMedia('(max-width: 760px)').matches) {
      return;
    }

    const slide = track.querySelector(`[data-video-index="${index}"]`);
    if (!slide) {
      return;
    }

    const paddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: slide.offsetLeft - paddingLeft,
      behavior: 'smooth',
    });
  };

  const handleVideoScroll = (event) => {
    if (!window.matchMedia('(max-width: 760px)').matches) {
      return;
    }

    const track = event.currentTarget;
    const slide = track.querySelector('.review-highlights-videos button');
    if (!slide) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    const nextIndex = Math.max(0, Math.min(videos.length - 1, Math.round(track.scrollLeft / step)));

    if (nextIndex !== selectedVideoIndex) {
      setSelectedVideoIndex(nextIndex);
    }
  };

  const resetSiblingSectionVideos = (activeMedia) => {
    const root = document.querySelector('.review-highlights-page');
    if (!root) {
      return;
    }

    root.querySelectorAll('.review-highlights-videos video').forEach((media) => {
      if (media === activeMedia) {
        return;
      }

      media.pause();
      try {
        media.currentTime = 0;
      } catch {
        // Some browsers can reject seeking before metadata is ready.
      }
    });
  };

  const handleHighlightSelect = (index) => {
    if (featureTransitionRef.current) {
      clearTimeout(featureTransitionRef.current);
    }

    if (layoutOptions.highlightsCarousel || isMobileViewport) {
      setFeatureTransitionImage(null);
    } else {
    setFeatureTransitionImage({
      src: activeFeatureSrc,
      fillHeight: Boolean(activeHighlight?.fillHeight),
    });

    featureTransitionRef.current = setTimeout(() => {
      setFeatureTransitionImage(null);
    }, FEATURE_SEQUENCE_CROSSFADE_DURATION);
    }

    setFeatureFrame(0);
    setSelectedHighlight(index);
    setFeaturePlaybackKey((value) => value + 1);
  };

  const toggleLayoutOption = (option) => {
    setLayoutOptions((currentOptions) => ({
      ...currentOptions,
      [option]: !currentOptions[option],
    }));
  };

  const centerHighlightTile = (index) => {
    const carousel = featureCarouselRef.current;
    const tile = carousel?.querySelector(`[data-highlight-index="${index}"]`);

    if (!carousel || !tile) {
      handleHighlightSelect(index);
      return;
    }

    const targetLeft = tile.offsetLeft - ((carousel.clientWidth - tile.clientWidth) / 2);
    carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
    handleHighlightSelect(index);
  };

  const moveHighlightCarousel = (direction) => {
    const fallbackIndex = selectedHighlight === null ? 0 : selectedHighlight;
    const nextIndex = (fallbackIndex + direction + highlights.length) % highlights.length;
    centerHighlightTile(nextIndex);
  };

  const handleHighlightCarouselScroll = () => {
    const carousel = featureCarouselRef.current;

    if (!carousel) {
      return;
    }

    const carouselCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
    const tiles = Array.from(carousel.querySelectorAll('[data-highlight-index]'));
    const closestTile = tiles.reduce((closest, tile) => {
      const tileCenter = tile.offsetLeft + (tile.clientWidth / 2);
      const distance = Math.abs(tileCenter - carouselCenter);

      if (!closest || distance < closest.distance) {
        return { tile, distance };
      }

      return closest;
    }, null);
    const closestIndex = Number(closestTile?.tile?.dataset.highlightIndex);
    const centerTolerance = 24;

    if (
      Number.isInteger(closestIndex)
      && closestTile.distance <= centerTolerance
      && closestIndex !== selectedHighlight
    ) {
      handleHighlightSelect(closestIndex);
    }
  };

  const handleHighlightCarouselPointerDown = (event) => {
    if (isMobileViewport) {
      return;
    }

    const carousel = featureCarouselRef.current;

    if (!carousel || event.button !== 0) {
      return;
    }

    featureCarouselDragRef.current = {
      isPointerDown: true,
      didDrag: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: carousel.scrollLeft,
    };
    setIsFeatureCarouselDragging(true);
    carousel.setPointerCapture?.(event.pointerId);
  };

  const handleHighlightCarouselPointerMove = (event) => {
    if (isMobileViewport) {
      return;
    }

    const carousel = featureCarouselRef.current;
    const drag = featureCarouselDragRef.current;

    if (!carousel || !drag.isPointerDown || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;

    if (Math.abs(deltaX) > 4) {
      drag.didDrag = true;
    }

    carousel.scrollLeft = drag.startLeft - deltaX;
  };

  const handleHighlightCarouselPointerUp = (event) => {
    if (isMobileViewport) {
      return;
    }

    const carousel = featureCarouselRef.current;
    const drag = featureCarouselDragRef.current;

    if (!carousel || drag.pointerId !== event.pointerId) {
      return;
    }

    carousel.releasePointerCapture?.(event.pointerId);
    drag.isPointerDown = false;
    drag.pointerId = null;
    setIsFeatureCarouselDragging(false);
    window.requestAnimationFrame(() => {
      const carouselCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
      const tiles = Array.from(carousel.querySelectorAll('[data-highlight-index]'));
      const closestTile = tiles.reduce((closest, tile) => {
        const tileCenter = tile.offsetLeft + (tile.clientWidth / 2);
        const distance = Math.abs(tileCenter - carouselCenter);

        if (!closest || distance < closest.distance) {
          return { tile, distance };
        }

        return closest;
      }, null);
      const closestIndex = Number(closestTile?.tile?.dataset.highlightIndex);

      if (Number.isInteger(closestIndex)) {
        centerHighlightTile(closestIndex);
      }
    });
  };

  const handleHighlightCarouselScrollEnd = () => {
    if ((!layoutOptions.highlightsCarousel && !isMobileViewport) || isFeatureCarouselDragging) {
      return;
    }

    handleHighlightCarouselScroll();
  };

  const handleHighlightCarouselClickCapture = (event) => {
    if (isMobileViewport) {
      return;
    }

    if (!featureCarouselDragRef.current.didDrag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    featureCarouselDragRef.current.didDrag = false;
  };

  useEffect(() => {
    featureFrameRef.current = featureFrame;
  }, [featureFrame]);

  useEffect(() => {
    if (featureAnimationRef.current) {
      cancelAnimationFrame(featureAnimationRef.current);
    }

    if (featureAnimationDelayRef.current) {
      clearTimeout(featureAnimationDelayRef.current);
    }

    const selectedSequence = getFeatureSequenceForHighlight(highlights[selectedHighlight]);
    const previousAnimationState = featureAnimationStateRef.current;
    const shouldRestartSequence = previousAnimationState.selectedHighlight !== selectedHighlight
      || previousAnimationState.playbackKey !== featurePlaybackKey;

    featureAnimationStateRef.current = {
      selectedHighlight,
      playbackKey: featurePlaybackKey,
    };

    if (!selectedSequence) {
      featureFrameRef.current = 0;
      setFeatureFrame(0);
      return undefined;
    }

    if (!isFeatureVisible) {
      if (shouldRestartSequence) {
        featureFrameRef.current = 0;
        setFeatureFrame(0);
      }
      return undefined;
    }

    const lastFrame = selectedSequence.frameCount - 1;
    const startFrame = shouldRestartSequence ? 0 : Math.min(featureFrameRef.current, lastFrame);
    const startProgress = lastFrame > 0 ? startFrame / lastFrame : 0;
    const loopStartFrame = selectedSequence.loopStartFrame;
    const loopFrameSpan = loopStartFrame ? lastFrame - loopStartFrame : 0;
    const loopDuration = loopStartFrame
      ? Math.max(900, FEATURE_SEQUENCE_DURATION * (loopFrameSpan / lastFrame))
      : 0;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp - (startProgress * FEATURE_SEQUENCE_DURATION);
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / FEATURE_SEQUENCE_DURATION, 1);

      if (progress < 1) {
        const nextFrame = Math.round(progress * lastFrame);
        featureFrameRef.current = nextFrame;
        setFeatureFrame(nextFrame);
        featureAnimationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (loopStartFrame) {
        const loopProgress = ((elapsed - FEATURE_SEQUENCE_DURATION) % loopDuration) / loopDuration;
        const nextFrame = Math.round(loopStartFrame + (loopProgress * loopFrameSpan));
        featureFrameRef.current = nextFrame;
        setFeatureFrame(nextFrame);
        featureAnimationRef.current = requestAnimationFrame(animate);
        return;
      }

      featureFrameRef.current = lastFrame;
      setFeatureFrame(lastFrame);
    };

    if (shouldRestartSequence) {
      featureFrameRef.current = 0;
      setFeatureFrame(0);
    }

    featureAnimationDelayRef.current = setTimeout(() => {
      featureAnimationRef.current = requestAnimationFrame(animate);
    }, (shouldRestartSequence && !layoutOptions.highlightsCarousel && !isMobileViewport) ? FEATURE_SEQUENCE_CROSSFADE_DURATION : 0);

    return () => {
      if (featureAnimationRef.current) {
        cancelAnimationFrame(featureAnimationRef.current);
      }
      if (featureAnimationDelayRef.current) {
        clearTimeout(featureAnimationDelayRef.current);
      }
    };
  }, [selectedHighlight, featurePlaybackKey, layoutOptions.highlightsCarousel, isFeatureVisible, isMobileViewport]);

  useEffect(() => () => {
    if (featureTransitionRef.current) {
      clearTimeout(featureTransitionRef.current);
    }
  }, []);

  useEffect(() => {
    Object.values(FEATURE_SEQUENCES).forEach((sequence) => {
      const framesToPreload = [0, 1, 2, 3, 4, sequence.loopStartFrame, sequence.frameCount - 1].filter((frame) => typeof frame === 'number');
      framesToPreload.forEach((frame) => {
        const image = new Image();
        image.src = getFeatureSequenceFrame(sequence, frame);
      });
    });
  }, []);

  useEffect(() => {
    const node = featureSectionRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeatureIntroVisible(entry.intersectionRatio >= 0.15);
        setIsFeatureVisible(entry.intersectionRatio >= 0.98);
      },
      { threshold: [0, 0.15, 0.98, 1] },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isTyping = target?.matches?.('input, textarea, select') || target?.isContentEditable;

      if (isTyping || event.key.toLowerCase() !== 'p') {
        return;
      }

      setIsControlPanelOpen((isOpen) => !isOpen);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateMobileViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateMobileViewport();
    mediaQuery.addEventListener('change', updateMobileViewport);

    return () => mediaQuery.removeEventListener('change', updateMobileViewport);
  }, []);

  useEffect(() => {
    if (layoutOptions.highlightsCarousel && selectedHighlight === null) {
      handleHighlightSelect(0);
    }
  }, [layoutOptions.highlightsCarousel, selectedHighlight]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Review Highlights - the Smart Kettle Luxe';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const effectiveDebugView = isMobileViewport ? 'capped' : layoutOptions.debugView;
  const isFullScreenDebugView = effectiveDebugView === 'fullscreen';
  const isAboutCopyInBuyboxActive = !isMobileViewport && (isFullScreenDebugView || layoutOptions.aboutCopyInBuybox);
  const isHeroSplitFullBleedActive = !isMobileViewport && (isFullScreenDebugView || layoutOptions.heroSplitFullBleed);
  const isHeroFullBleedActive = !isMobileViewport && (isFullScreenDebugView || layoutOptions.heroFullBleed || layoutOptions.heroSplitFullBleed);
  const isHeroFullBleedAboutActive = !isMobileViewport && !isFullScreenDebugView && layoutOptions.heroFullBleedAbout;
  const isHeroFullBleedCollectionActive = !isMobileViewport && !isFullScreenDebugView && layoutOptions.heroFullBleedCollection;
  const isHeroThumbsLeftAlignedActive = !isMobileViewport && !isFullScreenDebugView && layoutOptions.heroThumbsLeftAligned;
  const isHighlightsCarouselActive = (!isMobileViewport && !isFullScreenDebugView && layoutOptions.highlightsCarousel)
    || (isMobileViewport && !isFullScreenDebugView);
  const isProductRailTenColumnActive = !isMobileViewport && !isFullScreenDebugView && layoutOptions.productRailTenColumn;
  const isBtfTenColumnActive = !isMobileViewport && isFullScreenDebugView && layoutOptions.btfTenColumn;
  const isAccordionOnlyActive = !isMobileViewport && isFullScreenDebugView && layoutOptions.accordionOnly;
  const isFullScreenBiggerTextActive = !isMobileViewport && isFullScreenDebugView && layoutOptions.fullScreenBiggerText;
  const shouldRenderBelowHero = !isFullScreenDebugView;

  useEffect(() => {
    const pageNode = pageRef.current;

    if (!pageNode) {
      return undefined;
    }

    let frameId;

    const updateSplitHeroOffset = () => {
      if (!isHeroSplitFullBleedActive || !window.matchMedia('(min-width: 761px)').matches) {
        pageNode.style.removeProperty('--rh-split-hero-top-offset');
        return;
      }

      const headerHeight = document.querySelector('.review-highlights-header')?.getBoundingClientRect().height || 0;
      const visibleHeaderOffset = Math.max(0, Math.ceil(headerHeight - window.scrollY));
      pageNode.style.setProperty('--rh-split-hero-top-offset', `${visibleHeaderOffset}px`);
    };

    const scheduleUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(updateSplitHeroOffset);
    };

    updateSplitHeroOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      pageNode.style.removeProperty('--rh-split-hero-top-offset');
    };
  }, [isHeroSplitFullBleedActive]);

  return (
    <>
    <main
      ref={pageRef}
      className={`review-highlights-page${!isFullScreenDebugView ? ' is-debug-capped' : ''}${isAboutCopyInBuyboxActive ? ' is-about-copy-in-buybox' : ''}${isHighlightsCarouselActive ? ' is-highlights-carousel' : ''}${isProductRailTenColumnActive ? ' is-product-rail-ten-column' : ''}${isBtfTenColumnActive ? ' is-btf-10-column' : ''}${isAccordionOnlyActive ? ' is-accordion-only' : ''}${isFullScreenBiggerTextActive ? ' is-fullscreen-bigger-text' : ''}${isHeroFullBleedActive ? ' is-hero-full-bleed' : ''}${isHeroFullBleedAboutActive ? ' is-hero-full-bleed-about' : ''}${isHeroFullBleedCollectionActive ? ' is-hero-full-bleed-collection' : ''}${isHeroThumbsLeftAlignedActive ? ' is-hero-thumbs-left-aligned' : ''}${isHeroSplitFullBleedActive ? ' is-hero-split-full-bleed' : ''}${!isMobileViewport && layoutOptions.columnGuides ? ' is-column-guides-visible' : ''}`}
      aria-label="Review Highlights product page"
    >
      <ReviewHeader />

      <aside className={`review-highlights-control-panel${isControlPanelOpen ? ' is-open' : ''}`} aria-label="Layout control panel">
        <div className="review-highlights-control-panel__header">
          <strong>Layout Panel</strong>
          <button type="button" onClick={() => setIsControlPanelOpen(false)} aria-label="Close layout panel">
            Close
          </button>
        </div>
        <label className="review-highlights-control-panel__select">
          <span>Debug view</span>
          <select
            value={effectiveDebugView}
            disabled={isMobileViewport}
            onChange={(event) => setLayoutOptions((currentOptions) => ({ ...currentOptions, debugView: event.target.value }))}
          >
            <option value="fullscreen">Full screen</option>
            <option value="capped">Capped</option>
          </select>
        </label>
        {!isMobileViewport && layoutOptions.debugView === 'fullscreen' ? (
          <>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.btfTenColumn}
                onChange={() => toggleLayoutOption('btfTenColumn')}
              />
              <span>10 column BTF</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.accordionOnly}
                onChange={() => toggleLayoutOption('accordionOnly')}
              />
              <span>Accordion only</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.fullScreenBiggerText}
                onChange={() => toggleLayoutOption('fullScreenBiggerText')}
              />
              <span>Bigger text</span>
            </label>
          </>
        ) : null}
        {!isMobileViewport && layoutOptions.debugView === 'capped' ? (
          <>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.aboutCopyInBuybox}
                onChange={() => toggleLayoutOption('aboutCopyInBuybox')}
              />
              <span>Move about copy into buy box</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.highlightsCarousel}
                onChange={() => toggleLayoutOption('highlightsCarousel')}
              />
              <span>Highlights carousel</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.productRailTenColumn}
                onChange={() => toggleLayoutOption('productRailTenColumn')}
              />
              <span>10-column product rails</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.heroFullBleed}
                onChange={() => toggleLayoutOption('heroFullBleed')}
              />
              <span>Full-bleed hero background</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.heroFullBleedAbout}
                onChange={() => toggleLayoutOption('heroFullBleedAbout')}
              />
              <span>Full-bleed hero about text</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.heroFullBleedCollection}
                onChange={() => toggleLayoutOption('heroFullBleedCollection')}
              />
              <span>Full-bleed hero collection cards</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.heroThumbsLeftAligned}
                onChange={() => toggleLayoutOption('heroThumbsLeftAligned')}
              />
              <span>Left-align hero thumbnails</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={layoutOptions.heroSplitFullBleed}
                onChange={() => toggleLayoutOption('heroSplitFullBleed')}
              />
              <span>Split full-bleed hero background</span>
            </label>
          </>
        ) : null}
        {!isMobileViewport ? (
          <label>
            <input
              type="checkbox"
              checked={layoutOptions.columnGuides}
              onChange={() => toggleLayoutOption('columnGuides')}
            />
            <span>Show column guides</span>
          </label>
        ) : null}
      </aside>

      <div className="review-highlights-grid-overlay" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="review-highlights-grid review-highlights-product">
        <section className="review-highlights-product__media" aria-label="Product gallery">
          <div className="review-highlights-product__hero-container">
            <figure className={`review-highlights-product__hero${isVideoSelected ? ' is-video-selected' : ''}`}>
              <div className="review-highlights-product__hero-track" ref={heroTrackRef} onScroll={handleHeroScroll}>
                <div
                  className={`review-highlights-product__hero-slide${selectedGallery === 'product' ? ' is-active' : ''}`}
                  data-gallery-slide="product"
                >
                  <img className="review-highlights-product__hero-image" src={activeColor.image} alt={activeColor.name} />
                </div>
                <div
                  className={`review-highlights-product__hero-slide${isVideoSelected ? ' is-active' : ''}`}
                  data-gallery-slide="video"
                >
                  <video
                    className="review-highlights-product__hero-video"
                    autoPlay={isVideoSelected}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label="Smart Kettle Luxe warming video"
                  >
                    <source src={HERO_VIDEO} type="video/mp4" />
                  </video>
                </div>
              </div>
            </figure>
          </div>

          <div className="review-highlights-product__thumbs" role="tablist" aria-label="Product images">
            {galleryItems.filter((item) => item.type !== 'video').map((item) => {
              const isSelected = selectedGallery === item.type;
              return (
              <button
                className={`review-highlights-product__thumb review-highlights-product__thumb--${item.type}${isSelected ? ' is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={item.label}
                onClick={() => selectGallery(item.type)}
                key={item.label}
              >
                <span className="review-highlights-product__thumb-inner">
                  {item.type === 'video' ? (
                    <video muted playsInline preload="metadata" aria-hidden="true">
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={activeColor.image} alt="" />
                  )}
                </span>
              </button>
              );
            })}
          </div>

          <section className="review-highlights-about">
            <h2>Brew Intelligently</h2>
            <p>{ABOUT_COPY}</p>
          </section>

          {isHeroFullBleedActive && isHeroFullBleedCollectionActive ? (
            <section className="review-highlights-hero-commerce" aria-label="Product add-ons">
              <article className="review-highlights-hero-commerce__card review-highlights-hero-commerce__card--collection">
                <p>Shop the collection</p>
                <div>
                  <img src="/assets/images/review-highlights/collection/kettle-toaster-collection.png" alt="" />
                  <span>
                    <strong>the Smart Kettle&trade; Luxe Collection</strong>
                    <small>Brushed Stainless Steel</small>
                  </span>
                </div>
                <button type="button">
                  Add to cart
                  <span aria-hidden="true">+</span>
                </button>
              </article>
              <article className="review-highlights-hero-commerce__card">
                <p>Usually purchased with</p>
                <div>
                  <img src={accessories[3].image} alt="" />
                  <span>
                    <strong>{accessories[3].title}</strong>
                    <small>{accessories[3].price}</small>
                  </span>
                </div>
                <button type="button">
                  Add to cart
                  <span aria-hidden="true">+</span>
                </button>
              </article>
            </section>
          ) : null}
        </section>

        <aside className="review-highlights-buybox" aria-label="Product purchase options">
          <a className="review-highlights-buybox__category" href={UPDATE_3_PATH}>
            Kettles
          </a>
          <h1>the Smart Kettle&trade; Luxe</h1>
          <div className="review-highlights-buybox__rating">
            <StarRow />
            <span>
              <strong>4.3</strong> (192)
            </span>
          </div>
          <p className="review-highlights-buybox__price">$219.95</p>
          <p className="review-highlights-buybox__about-copy review-highlights-buybox__about-copy--desktop">{ABOUT_COPY}</p>
          <fieldset className="review-highlights-colors">
            <legend>Color</legend>
            <div className="review-highlights-colors__grid">
              {colorOptions.map((option, index) => (
                <button
                  className={index === selectedColor ? 'is-selected' : ''}
                  type="button"
                  aria-label={option.name}
                  aria-pressed={index === selectedColor}
                  onClick={() => {
                    setSelectedColor(index);
                    setSelectedGallery('product');
                  }}
                  key={option.name}
                >
                  <span>
                    <img src={option.swatch} alt="" />
                  </span>
                </button>
              ))}
            </div>
            <strong>{activeColor.name}</strong>
            <small>Model: {activeColor.model}</small>
          </fieldset>

          <div className="review-highlights-cart-row">
            <div className="review-highlights-quantity" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                <img src={`${BUYBOX_ASSET_ROOT}/minus.svg`} alt="" />
              </button>
              <span>{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>
                <img src={`${BUYBOX_ASSET_ROOT}/plus.svg`} alt="" />
              </button>
            </div>
            <button className="review-highlights-add" type="button">
              Add to cart
            </button>
          </div>
          <p className="review-highlights-buybox__about-copy review-highlights-buybox__about-copy--mobile">{ABOUT_COPY}</p>

          {isFullScreenDebugView && !isAccordionOnlyActive ? (
          <div className="review-highlights-buybox__accordions">
            <AccordionSection title="Technical Specifications" className="review-highlights-accordion--tech-specs">
              <div className="review-highlights-spec-list">
                {specs.map((item) => (
                  <div className="review-highlights-spec" key={`buybox-${item.label}`}>
                    <strong>{item.label}</strong>
                    <p>
                      {item.value.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="What's Included" className="review-highlights-accordion--included">
              <div className="review-highlights-spec-list">
                {included.map((item) => (
                  <div className="review-highlights-spec" key={`buybox-${item.title}-${item.image}`}>
                    <strong>{item.title}</strong>
                    <p>Included in box.</p>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Support & Documentation" className="review-highlights-accordion--support">
              <div className="review-highlights-spec-list">
                {supportCards.map((item) => (
                  <div className="review-highlights-spec" key={`buybox-${item.title}`}>
                    <strong>{item.mobileTitle || item.title}</strong>
                    <p>Open product documentation and support details.</p>
                  </div>
                ))}
                <div className="review-highlights-spec">
                  <strong>Product Hub</strong>
                  <p>Download setup, cleaning, and safety guidance.</p>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="Videos" className="review-highlights-accordion--videos">
              <div className="review-highlights-videos">
                {videos.map((video, index) => (
                  <button
                    type="button"
                    key={`buybox-${video.title}`}
                    aria-label={`Play ${video.title}`}
                    data-video-index={index}
                    onClick={(event) => {
                      const media = event.currentTarget.querySelector('video');
                      if (!media) return;
                      if (media.paused) {
                        resetSiblingSectionVideos(media);
                        media.play().catch(() => {});
                      } else {
                        media.pause();
                      }
                    }}
                  >
                    <video
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      onPlay={(event) => resetSiblingSectionVideos(event.currentTarget)}
                    >
                      <source src={video.source} type="video/mp4" />
                    </video>
                  </button>
                ))}
              </div>
            </AccordionSection>
          </div>
          ) : null}
        </aside>
      </div>

      {isFullScreenDebugView ? (
        <section className="review-highlights-fullscreen-dark" aria-label="Product story">
          <section className={`review-highlights-feature review-highlights-feature--fullscreen review-highlights-feature--dark-panel${isFeatureIntroVisible ? ' is-feature-intro-visible' : ''}${isFeatureVisible ? ' is-feature-playable' : ''}`} aria-label="Get the Highlights" ref={featureSectionRef}>
            <div className="review-highlights-feature__gallery">
              <div className="review-highlights-feature__gallery-copy">
                <h2>Highlights</h2>
                <div>
                  <strong>{activeHighlight.title}</strong>
                  <p>{activeHighlight.copy}</p>
                </div>
              </div>
              <div className="review-highlights-feature__content" aria-live="polite">
                {featureTransitionImage ? (
                  <img
                    className={`review-highlights-feature__sequence review-highlights-feature__sequence--transition${featureTransitionImage.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
                    src={featureTransitionImage.src}
                    alt=""
                    aria-hidden="true"
                  />
                ) : null}
                <img
                  className={`review-highlights-feature__sequence${featureTransitionImage ? ' review-highlights-feature__sequence--entering' : ''}${activeHighlight?.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
                  src={activeFeatureSrc}
                  alt=""
                  aria-hidden="true"
                />
                <div className="review-highlights-feature__gallery-arrows" aria-label="Highlight carousel controls">
                  <button
                    type="button"
                    aria-label="Previous highlight"
                    onClick={() => moveHighlightCarousel(-1)}
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next highlight"
                    onClick={() => moveHighlightCarousel(1)}
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
              <button
                className="review-highlights-feature__gallery-peek"
                type="button"
                aria-label={`View ${nextHighlight.title}`}
                onClick={() => handleHighlightSelect(nextHighlightIndex)}
              >
                <img
                  className={`review-highlights-feature__sequence${nextHighlight.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
                  src={nextFeatureSrc}
                  alt=""
                  aria-hidden="true"
                />
              </button>
              </div>
          </section>
        </section>
      ) : null}

      {isFullScreenDebugView && !isAccordionOnlyActive ? (
        <section className="review-highlights-fullscreen-details" aria-label="Product support details">
          <AccordionSection title="FAQS" className="review-highlights-accordion--faq">
            <div className="review-highlights-faq">
              {faqs.map(([question, answer]) => (
                <article key={`fullscreen-${question}`}>
                  <strong>{question}</strong>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="Customer Reviews" mobileTitle="Review Highlights" className="review-highlights-accordion--reviews">
            <div className="review-highlights-reviews">
              <div className="review-highlights-reviews__summary">
                <strong>4.5</strong>
                <div className="review-highlights-reviews__rating-line">
                  <img src={`${ASSET_ROOT}/reviews/stars-4-5.svg`} alt="" />
                  <span>190 review</span>
                </div>
                <p>135 out 166 (81%) reviewers recommended this product</p>
              </div>
              <div className="review-highlights-reviews__meters">
                <div className="review-highlights-reviews__meter-labels" aria-hidden="true">
                  {reviewMeters.map((meter) => (
                    <span key={`fullscreen-${meter.label}`}>{meter.label}</span>
                  ))}
                </div>
                <div className="review-highlights-reviews__meter-bars">
                  {reviewMeters.map((meter) => (
                    <div className="review-highlights-meter" key={`fullscreen-${meter.label}`}>
                      <i style={{ width: `${meter.fill}%`, '--review-mobile-fill': `${meter.mobileFill}%` }} />
                    </div>
                  ))}
                </div>
                <div className="review-highlights-reviews__meter-counts" aria-hidden="true">
                  {reviewMeters.map((meter) => (
                    <span key={`fullscreen-${meter.label}`}>{meter.count}</span>
                  ))}
                </div>
                <span className="review-highlights-reviews__sr-only">
                  {reviewMeters.map((meter) => `${meter.label}: ${meter.count}`).join(', ')}
                </span>
              </div>
            </div>
          </AccordionSection>
        </section>
      ) : null}

      {isAccordionOnlyActive ? (
        <section className="review-highlights-accordion-only" aria-label="Product details">
          <AccordionOnlyTechnicalSpecs />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
          <AccordionOnlyWhatsIncluded />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
          <AccordionOnlySupportDocumentation />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
          <AccordionOnlyFaqs />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
          <AccordionOnlyVideos />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
          <AccordionOnlyCustomerReviews />
          <div className="review-highlights-accordion-only__divider" aria-hidden="true" />
        </section>
      ) : null}

      {isFullScreenDebugView ? (
        <div className="review-highlights-fullscreen-rail">
          <ProductRail title="Parts and Accessories" items={accessories} />
          <ProductRail
            title="You may also like"
            items={relatedProducts}
            actionLabel="Compare Kettles"
            onAction={() => setIsCompareOpen(true)}
          />
        </div>
      ) : null}

      {shouldRenderBelowHero ? (
      <>
      <section className="review-highlights-grid review-highlights-feature" aria-label="Get the Highlights" ref={featureSectionRef}>
        <div className="review-highlights-feature__header">
          <h2>Get the Highlights</h2>
          {isHighlightsCarouselActive ? (
            <div className="review-highlights-feature__arrows" aria-label="Highlight carousel controls">
              <button
                type="button"
                aria-label="Previous highlight"
                onClick={() => moveHighlightCarousel(-1)}
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next highlight"
                onClick={() => moveHighlightCarousel(1)}
              >
                <ArrowIcon />
              </button>
            </div>
          ) : null}
        </div>
        {isHighlightsCarouselActive ? (
          <div
            className={`review-highlights-feature__carousel${isFeatureCarouselDragging ? ' is-dragging' : ''}`}
            ref={featureCarouselRef}
            onScroll={handleHighlightCarouselScroll}
            onScrollEnd={handleHighlightCarouselScrollEnd}
            onPointerDown={handleHighlightCarouselPointerDown}
            onPointerMove={handleHighlightCarouselPointerMove}
            onPointerUp={handleHighlightCarouselPointerUp}
            onPointerCancel={handleHighlightCarouselPointerUp}
            onClickCapture={handleHighlightCarouselClickCapture}
            aria-label="Highlight carousel"
          >
            {highlights.map((item, index) => {
              const sequence = getFeatureSequenceForHighlight(item);
              const isActive = selectedHighlight === index;
              const firstFrame = 0;
              const tileFrame = isActive && !isFeatureCarouselDragging ? featureFrame : firstFrame;
              const isLooping = Boolean(sequence.loopStartFrame);
              const isReplayVisible = isActive && !isFeatureCarouselDragging && !isLooping && featureFrame >= sequence.frameCount - 1;
              const frameSrc = getFeatureSequenceFrame(sequence, Math.min(tileFrame, sequence.frameCount - 1));

              return (
                <article
                  className={`review-highlights-feature-card${isActive ? ' is-active' : ''}`}
                  data-highlight-index={index}
                  tabIndex={0}
                  role="button"
                  aria-label={item.title}
                  onClick={() => centerHighlightTile(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      centerHighlightTile(index);
                    }
                  }}
                  key={item.title}
                >
                  {isReplayVisible ? (
                    <button
                      className="review-highlights-feature-card__replay"
                      type="button"
                      aria-label={`Replay ${item.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleHighlightSelect(index);
                      }}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ) : null}
                  <div className="review-highlights-feature-card__copy">
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </div>
                  <div className={`review-highlights-feature-card__media${item.fillHeight ? ' review-highlights-feature-card__media--fill-height' : ''}`}>
                    <img
                      className={`review-highlights-feature__sequence${item.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
                      src={frameSrc}
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
        <div className="review-highlights-feature__panel">
          <div className="review-highlights-feature__rail" role="tablist" aria-label="Highlight selector">
            {highlights.map((item, index) => (
              <button
                className={selectedHighlight === index ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={selectedHighlight === index}
                onClick={() => handleHighlightSelect(index)}
                key={item.title}
              >
                <strong>{item.title}</strong>
                {selectedHighlight === index ? <span>{item.copy}</span> : null}
              </button>
            ))}
          </div>
          <div className="review-highlights-feature__content">
            {featureTransitionImage ? (
              <img
                className={`review-highlights-feature__sequence review-highlights-feature__sequence--transition${featureTransitionImage.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
                src={featureTransitionImage.src}
                alt=""
                aria-hidden="true"
              />
            ) : null}
            <img
              className={`review-highlights-feature__sequence${featureTransitionImage ? ' review-highlights-feature__sequence--entering' : ''}${activeHighlight?.fillHeight ? ' review-highlights-feature__sequence--fill-height' : ''}`}
              src={activeFeatureSrc}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
        )}
      </section>

      <div className="review-highlights-details">
        <AccordionSection title="Technical Specifications" className="review-highlights-accordion--tech-specs">
          <div className="review-highlights-spec-grid">
            {specsColumns.map((column, columnIndex) => (
              <div className="review-highlights-spec-column" key={`spec-column-${columnIndex}`}>
                {column.map((item) => (
                  <div className="review-highlights-spec" key={item.label}>
                    <strong>{item.label}</strong>
                    <p>
                      {item.value.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="review-highlights-spec-list">
            {specs.map((item) => (
              <div className="review-highlights-spec" key={`mobile-${item.label}`}>
                <strong>{item.label}</strong>
                <p>
                  {item.value.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="What's Included" className="review-highlights-accordion--included">
          <div className="review-highlights-included">
            {included.map((item) => (
              <article key={`${item.title}-${item.image}`}>
                <figure>
                  <img className={item.blend ? 'is-multiply' : ''} src={item.image} alt="" />
                </figure>
                <p>{item.title}</p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Support & Documentation" className="review-highlights-accordion--support">
          <div className="review-highlights-support">
            <div className="review-highlights-support__cards">
              {supportCards.map((item) => (
                <button type="button" key={item.title}>
                  <span>
                    {item.mobileTitle ? <span className="review-highlights-support__mobile-title">{item.mobileTitle}</span> : null}
                    <span className="review-highlights-support__desktop-title">
                    {item.titleLines.map((line, index) => (
                      <React.Fragment key={line}>
                        {line}
                        {index < item.titleLines.length - 1 ? <br aria-hidden="true" /> : null}
                      </React.Fragment>
                    ))}
                    </span>
                  </span>
                  <img className="review-highlights-support__arrow" src={`${ASSET_ROOT}/support/arrow-right.svg`} alt="" />
                  <img className="review-highlights-support__card-image" src={item.image} alt="" />
                </button>
              ))}
            </div>
            <article className="review-highlights-support__hub">
              <img className="review-highlights-support__hub-image" src={`${ASSET_ROOT}/support/product-hub.png`} alt="" />
              <div>
                <span>
                  <strong>Product Hub</strong>
                  <p>Download setup, cleaning, and safety guidance.</p>
                </span>
                <img src={`${ASSET_ROOT}/support/arrow-right.svg`} alt="" />
              </div>
            </article>
          </div>
        </AccordionSection>

        <AccordionSection title="FAQS" className="review-highlights-accordion--faq">
          <div className="review-highlights-faq">
            {faqs.map(([question, answer]) => (
              <article key={question}>
                <strong>{question}</strong>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Videos" className="review-highlights-accordion--videos">
          <div className="review-highlights-videos" ref={videoTrackRef} onScroll={handleVideoScroll}>
            {videos.map((video, index) => (
              <button
                type="button"
                key={video.title}
                aria-label={`Play ${video.title}`}
                data-video-index={index}
                onClick={(event) => {
                  const media = event.currentTarget.querySelector('video');
                  if (!media) return;
                  if (media.paused) {
                    resetSiblingSectionVideos(media);
                    media.play().catch(() => {});
                  } else {
                    media.pause();
                  }
                }}
              >
                <video
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  onPlay={(event) => resetSiblingSectionVideos(event.currentTarget)}
                >
                  <source src={video.source} type="video/mp4" />
                </video>
              </button>
            ))}
          </div>
          <div className="review-highlights-videos__dots" aria-label="Video carousel pagination">
            {videos.map((video, index) => (
              <button
                className={selectedVideoIndex === index ? 'is-active' : ''}
                type="button"
                aria-label={`Show ${video.title}`}
                onClick={() => selectVideoIndex(index)}
                key={`${video.title}-dot`}
              />
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Customer Reviews" mobileTitle="Review Highlights" className="review-highlights-accordion--reviews">
          <div className="review-highlights-reviews">
            <div className="review-highlights-reviews__summary">
              <strong>4.5</strong>
              <div className="review-highlights-reviews__rating-line">
                <img src={`${ASSET_ROOT}/reviews/stars-4-5.svg`} alt="" />
                <span>190 review</span>
              </div>
              <p>135 out 166 (81%) reviewers recommended this product</p>
            </div>
            <div className="review-highlights-reviews__meters">
              <div className="review-highlights-reviews__meter-labels" aria-hidden="true">
                {reviewMeters.map((meter) => (
                  <span key={meter.label}>{meter.label}</span>
                ))}
              </div>
              <div className="review-highlights-reviews__meter-bars">
                {reviewMeters.map((meter) => (
                  <div className="review-highlights-meter" key={meter.label}>
                    <i style={{ width: `${meter.fill}%`, '--review-mobile-fill': `${meter.mobileFill}%` }} />
                  </div>
                ))}
              </div>
              <div className="review-highlights-reviews__meter-counts" aria-hidden="true">
                {reviewMeters.map((meter) => (
                  <span key={meter.label}>{meter.count}</span>
                ))}
              </div>
              <span className="review-highlights-reviews__sr-only">
                {reviewMeters.map((meter) => `${meter.label}: ${meter.count}`).join(', ')}
              </span>
            </div>
          </div>
        </AccordionSection>
      </div>

      <ProductRail title="Parts and Accessories" items={accessories} />
      <ProductRail
        title="You may also like"
        items={relatedProducts}
        actionLabel="Compare Kettles"
        onAction={() => setIsCompareOpen(true)}
      />
      </>
      ) : null}
      <section className="motion-footer-section" aria-label="Footer">
        <TestingFooter variant="reversed" linkHref={UPDATE_3_PATH} />
      </section>
    </main>
    {isCompareOpen ? <CompareTakeover onClose={() => setIsCompareOpen(false)} /> : null}
    </>
  );
}
