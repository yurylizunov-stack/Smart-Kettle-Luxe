import React, { useEffect, useMemo, useRef, useState } from 'react';

const PRODUCT_IMAGE_ROOT = '/assets/images/kettle_straight/web_p';
const SWATCH_ROOT = '/assets/images/swatches';
const HEADER_ASSET_ROOT = '/assets/images/review-highlights/header';
const BUYBOX_ASSET_ROOT = '/assets/images/review-highlights/buybox';
const BUY_CLEAN_ASSET_ROOT = '/assets/images/buy-clean';
const ACCORDION_ASSET_ROOT = `${BUY_CLEAN_ASSET_ROOT}/accordions`;
const CAROUSEL_ASSET_ROOT = `${BUY_CLEAN_ASSET_ROOT}/carousels`;
const FEATURE_HIGHLIGHT_ASSET_ROOT = `${BUY_CLEAN_ASSET_ROOT}/feature-highlights`;
const REVIEW_ASSET_ROOT = `${BUY_CLEAN_ASSET_ROOT}/reviews`;
const VIDEO_ASSET_ROOT = '/assets/videos';
const STANDARD_PRICE = 219.95;
const BRASS_PRICE = 249.95;
const MAX_QUANTITY = 3;

const layouts = {
  atfExact: {
    label: 'ATF exact',
    variables: {
      heroScale: 1.36,
      railInset: 24,
      railGap: 48,
      swatchGap: 8,
      railTextBump: false,
    },
  },
  option1: {
    label: 'Option 1',
    variables: {
      heroScale: 1.36,
      railInset: 24,
      railGap: 48,
      swatchGap: 8,
      isolatedSwatches: false,
      largeSwatches: false,
      hideFeatures: false,
      bottomThumbnails: false,
      railTextBump: false,
    },
  },
  option2: {
    label: 'Option 2',
    variables: {
      heroScale: 1.36,
      railInset: 24,
      railGap: 48,
      swatchGap: 8,
      isolatedSwatches: false,
      largeSwatches: false,
      hideFeatures: false,
      bottomThumbnails: false,
      railTextBump: false,
    },
  },
  option3: {
    label: 'Option 3',
    variables: {
      heroScale: 1.36,
      railInset: 24,
      railGap: 48,
      swatchGap: 8,
      isolatedSwatches: false,
      largeSwatches: false,
      hideFeatures: true,
      bottomThumbnails: false,
      railTextBump: false,
    },
  },
};

const globalVariables = {
  artboardWidth: 1440,
  navHeight: 80,
  pageMargin: 40,
  gutter: 20,
  columns: 12,
};

const layoutToggleDefaults = {
  option3: {
    accordionMoved: true,
    greySpacer: true,
  },
};

const reviewCountLabel = '190 Reviews';

const colors = [
  { name: 'Brushed Stainless Steel', model: 'BKE845BSS1BUS1', image: `${PRODUCT_IMAGE_ROOT}/1.webp`, swatch: `${SWATCH_ROOT}/Brushed Stainless Steel.png` },
  { name: 'Black Truffle', model: 'BKE845BTR1BUS1', image: `${PRODUCT_IMAGE_ROOT}/2.webp`, swatch: `${SWATCH_ROOT}/Black Truffle.png` },
  { name: 'Sea Salt', model: 'BKE845SST1BUS1', image: `${PRODUCT_IMAGE_ROOT}/3.webp`, swatch: `${SWATCH_ROOT}/Sea Salt.png` },
  { name: 'Damson Blue', model: 'BKE845DBL1BUS1', image: `${PRODUCT_IMAGE_ROOT}/4.webp`, swatch: `${SWATCH_ROOT}/Damson Blue.png` },
  { name: 'Almond Nougat', model: 'BKE845ANU1BUS1', image: `${PRODUCT_IMAGE_ROOT}/5.webp`, swatch: `${SWATCH_ROOT}/Almond Nougat.png` },
  { name: 'Olive Tapenade', model: 'BKE845OLT1BUS1', image: `${PRODUCT_IMAGE_ROOT}/6.webp`, swatch: `${SWATCH_ROOT}/Olive Tapenade.png` },
  { name: 'Noir', model: 'BKE845NIR1BUS1', image: `${PRODUCT_IMAGE_ROOT}/7.webp`, swatch: `${SWATCH_ROOT}/Noir.png` },
  { name: 'Damson Blue Brass', model: 'BKE845DBB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/9.webp`, swatch: `${SWATCH_ROOT}/Damson Blue Brass.png` },
  { name: 'Sea Salt Brass', model: 'BKE845SSB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/8.webp`, swatch: `${SWATCH_ROOT}/Sea Salt Brass.png` },
  { name: 'Olive Tapenade Brass', model: 'BKE845OTB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/10.webp`, swatch: `${SWATCH_ROOT}/Olive Tapenade Brass.png` },
  { name: 'Brushed Stainless Steel Brass', model: 'BKE845BSB1BUS1', image: `${PRODUCT_IMAGE_ROOT}/11.webp`, swatch: `${SWATCH_ROOT}/Brushed Stainless Steel Brass.png` },
  { name: 'an Aboriginal Culinary Journey', model: 'BKE845ACJ1BUS1', image: `${PRODUCT_IMAGE_ROOT}/12.webp`, swatch: `${SWATCH_ROOT}/an Aboriginal Culinary Journey.png` },
];

const gallery = [
  { id: 'hero-image', type: 'image', label: 'Product image' },
  { id: 'desktop-warm', type: 'video', aspect: 'wide', label: 'Product warm video', source: '/assets/videos/desktop_warm_1920.mp4' },
  { id: 'tiktok-review', type: 'video', aspect: 'tall', label: 'TikTok review video', source: '/assets/videos/tiktok review 1.mp4' },
];

const addOns = [
  {
    title: 'the Descaler (pack of 4)',
    price: '$14.95',
    priceValue: 14.95,
    image: `${BUY_CLEAN_ASSET_ROOT}/descaler-pack-4-white.png`,
  },
  {
    title: 'Filter Removable',
    price: '$6.95',
    priceValue: 6.95,
    image: `${BUY_CLEAN_ASSET_ROOT}/filter-removable.png`,
  },
];

const warrantyOptions = [
  {
    id: 'one-year',
    title: '1-year protection plan',
    detail: 'Included with purchase',
    priceValue: 0,
  },
  {
    id: 'two-year',
    title: 'Upgrade to 2-year',
    detail: '$25.95',
    priceValue: 25.95,
  },
];

const includedItems = [
  {
    title: "25% off fresh beans from America's best roasters",
    copy: "Enjoy 25% off fresh beans from America's best roasters.",
    image: `${BUY_CLEAN_ASSET_ROOT}/included-25-off.png`,
  },
  {
    title: '2 Free bags of coffee',
    copy: 'Get the best start with 2 free bags of specialty beans delivered to your door.',
    image: `${BUY_CLEAN_ASSET_ROOT}/included-coffee-bags.png`,
  },
];

const technicalSpecColumns = [
  [
    { title: 'Dimensions (WxDxH)', copy: '7.1" x 9.6" x 9.9"' },
    { title: 'Construction Materials', copy: 'Brushed Stainless Steel' },
    { title: 'Capacity', copy: '57 oz. / 1.7 liter / 7 Cup Capacity' },
  ],
  [
    { title: 'Settings', copy: ['5 Preprogrammed Temperature Settings', 'Keep Warm Button', 'Auto shut off and boil dry protection'] },
    { title: 'Power', copy: '1500 Watts' },
  ],
  [
    { title: 'Voltage', copy: '110-120 Volts' },
    { title: 'Warranty', copy: '1 Year Limited Warranty' },
    { title: 'Weight', copy: '3.86 lbs / 1.75 kg' },
  ],
];

const railTechnicalSpecColumns = [
  [
    { title: 'Dimensions (WxDxH)', copy: '7.1" x 9.6" x 9.9"' },
    { title: 'Construction Materials', copy: 'Brushed Stainless Steel' },
    { title: 'Capacity', copy: '57 oz. / 1.7 liter / 7 Cup' },
    { title: 'Settings', copy: ['5 Preprogrammed Temperature Settings', 'Keep Warm Button', 'Auto shut off and boil dry protection'] },
  ],
  [
    { title: 'Voltage', copy: '110-120 Volts' },
    { title: 'Warranty', copy: '1 Year Limited Warranty' },
    { title: 'Weight', copy: '3.86 lbs / 1.75 kg' },
    { title: 'Power', copy: '1500 Watts' },
  ],
];

const includedAccordionItems = [
  { title: 'Kettle Body', image: `${ACCORDION_ASSET_ROOT}/included-kettle-body.png` },
  { title: 'Kettle Base', image: `${ACCORDION_ASSET_ROOT}/included-kettle-base.png` },
  { title: 'Manual and Warranty Card', image: `${ACCORDION_ASSET_ROOT}/included-manual-card.png` },
];

const supportRailItems = ['Product Hub', 'Instruction Manual', 'Return Policies'];

const faqItems = [
  {
    question: 'Can I hold a selected temperature?',
    answer: 'Yes. The keep warm control holds water temperature for repeat pours.',
  },
  {
    question: 'Can I hold a selected temperature?',
    answer: 'Yes. The keep warm control holds water temperature for repeat pours.',
  },
  {
    question: 'Can I hold a selected temperature?',
    answer: 'Yes. The keep warm control holds water temperature for repeat pours.',
  },
];

const featureHighlightCards = [
  {
    title: '5 Varietal Settings',
    copy: 'Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee.',
    image: `${FEATURE_HIGHLIGHT_ASSET_ROOT}/varietal-settings.png`,
  },
  {
    title: 'Keep Warm Button',
    copy: 'One-touch functionality keeps your water warm for 20 minutes and can be activated before, during or on completion of the water heating cycle.',
    image: `${FEATURE_HIGHLIGHT_ASSET_ROOT}/varietal-settings.png`,
  },
  {
    title: 'Soft Opening™ Lid',
    copy: 'A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases steam and eliminates splashing.',
    image: `${FEATURE_HIGHLIGHT_ASSET_ROOT}/varietal-settings.png`,
  },
  {
    title: 'BPA Free Material',
    copy: "Dual sided, high visibility water windows make it easy to make sure you don't heat more water than you need. Made from BPA Free materials.",
    image: `${FEATURE_HIGHLIGHT_ASSET_ROOT}/varietal-settings.png`,
  },
];

const option3FeaturePanelItems = featureHighlightCards.map((item, index) => ({
  ...item,
  video: `${VIDEO_ASSET_ROOT}/Feature ${index + 1}.mp4`,
}));

const reviewRows = [
  { label: '5 stars', count: 135 },
  { label: '4 stars', count: 21 },
  { label: '3 stars', count: 10 },
  { label: '2 stars', count: 7 },
  { label: '1 star', count: 17 },
];

const reviewSummaryCopy =
  'Customers find the kettle\'s quality impressive and appreciate its sleek appearance, with one noting its finely finished brushed exterior. The temperature control receives positive feedback for its ability to maintain temperature for up to 20 minutes, and customers like its quick heating speed and multiple heat settings. The functionality and value for money receive mixed reviews - while some say it works well and is worth the price, others report it malfunctioning after 4 months and consider it pricey. The noise level also gets mixed reactions, with some finding it quiet while others describe it as sounding like a loud factory operation.';

const customerReviews = [
  {
    title: 'Great Product!!!',
    author: 'wbiggers11',
    date: '5 Years ago',
    location: 'Mobile, Alabama',
    votes: 40,
    reviewCount: 1,
    rating: 4.5,
    freeProduct: true,
    copy: `Words can not express how much I love my smart kettle. It has a beautiful sleek and modern design and it looks great in my kitchen. I love that the kettle has many warming functions for all my different kinds of tea so that the heat is right to bring out the best flavors in each tea. There's a boiling water option that I use to make my instant grits in the morning for breakfast. The water heats very quickly and I love the keep warm option. I can boil my water and keep it nice and warm for about 20 minutes and then, it shuts its self off for safety. I very highly recommend this smart kettle to everyone. I think everybody should have one in their home.`,
    images: [`${REVIEW_ASSET_ROOT}/review-01-01.png`],
    recommend: true,
    helpful: 31,
    notHelpful: 9,
  },
  {
    title: 'Beautiful, but paintwork not durable',
    author: 'SJV',
    date: '5 Years ago',
    location: '',
    votes: 16,
    reviewCount: 1,
    rating: 4.5,
    copy: `We bought this kettle in black truffle recently to match our new kitchen. We've been using it for less than 6 months. It works beautifully, however the paint around the rim, under the lid has started to peel/flake. Queried this with Breville, who said this is normal wear on the coloured variety due to moisture. They were happy to replace it, but this would be a recurring problem and I'm not sure how many times they would replace it as I'm sure the problem would recur. We have the option of having the stainless steel one, which won't peel, but it's not half as handsome as this one. Dilemma. Other than that, it's a a lovely kettle. I would've given it 5 stars if the paint wasn't an issue.`,
    images: [`${REVIEW_ASSET_ROOT}/review-02-01.png`],
    recommend: true,
    helpful: 16,
    notHelpful: 0,
  },
  {
    title: 'Good but with a repeat issue',
    author: 'Skarzan',
    date: '6 Months Ago',
    location: '',
    votes: 3,
    reviewCount: 1,
    rating: 3,
    copy: `I've owned 3 of the standard IQ Kettles (two locations) and they have worked brilliantly for years. Recently one of them stopped auto shutting off, and when I cleaned it will a full kettle it boiled over and ruined the base (and filled below counter drawers with water). Had to throw it out and buy a new one, so tiring of all stainless steel look I stepped up to the Luxe for the color and the brass. The first one did not auto-shut off straight out of the box. Yikes. They replaced it. The current one does auto shut off but it takes 1-2 minutes which is a long time. The IQ's shut-off in seconds, as it should be. So why this more pricey model doesn't duplicate what the previous ones did I have no idea. But now I don't trust walking away from it so that's not an improvement in my book. Also, while the brass handle and spout are great quality, the "brass" trim ring on the base and bottom of kettle are cheap plastic and you feel and hear plastic on plastic every time you pick it up and replace it on the plastic base. Not thrilled with that reduction in quality despite paying significantly more.`,
    images: [
      `${REVIEW_ASSET_ROOT}/review-03-01.png`,
      `${REVIEW_ASSET_ROOT}/review-03-02.png`,
      `${REVIEW_ASSET_ROOT}/review-03-03.png`,
    ],
    recommend: true,
    helpful: 3,
    notHelpful: 0,
  },
  {
    title: 'It is Smart',
    author: 'CookinDeb',
    date: '5 Years Ago',
    location: 'Wisconsin',
    votes: 28,
    reviewCount: 1,
    rating: 4.5,
    freeProduct: true,
    copy: 'I love this electric tea kettle. I’ve had them in the past and the only temperature was rapid boil. With this smart kettle there are buttons for different hot beverage temperatures. I drink tea and my husband drinks French press coffee. There’s a button for different types of tea and French press. There is also a beeper to alert me that the water is ready. This is my favorite kitchen appliance right now!',
    images: [
      `${REVIEW_ASSET_ROOT}/review-04-01.png`,
      `${REVIEW_ASSET_ROOT}/review-04-02.png`,
    ],
    recommend: true,
    helpful: 23,
    notHelpful: 5,
  },
  {
    title: 'Disappointed',
    author: 'Aimee',
    date: 'A year ago',
    location: '',
    votes: 16,
    reviewCount: 1,
    rating: 1,
    copy: 'I have this new kettle in red velvet cake color- not even 2 years and paint coming off already. What\'s concerning is that it is in the rim of the opening itself. Paint chips can mix in and in my boiled water.',
    images: [`${REVIEW_ASSET_ROOT}/review-05-01.png`],
    recommend: false,
    helpful: 15,
    notHelpful: 1,
  },
  {
    title: 'Looks nice.',
    author: 'Coba',
    date: '4 years ago',
    location: '',
    votes: 78,
    reviewCount: 1,
    rating: 2,
    copy: 'We bought this kettle about three years ago and it gets used once a day on average. The kettle still looks brand new, unfortunately it doesn’t function that way. The base turns on but it no longer boils. We considered purchasing a replacement base to avoid throwing the whole kettle into a landfill but it is sold out. After boiling water in a pot for a few days my husband purchased a different brand of kettle. We own a Breville Air Fryer toaster oven and coffee maker. All three of these appliances have been problematic and expensive. We will not be purchasing Breville appliances again. They are attractive, expensive and lack longevity.',
    images: [],
    recommend: false,
    helpful: 65,
    notHelpful: 13,
  },
  {
    title: 'Brakes fast',
    author: 'natalya',
    date: '4 years ago',
    location: '',
    votes: 66,
    reviewCount: 1,
    rating: 1,
    copy: 'Worked great for 6 mos then stop working, got replacement and in another 6 most the second stopped working. The heating element burned down, the base is still working though. Tried to contact customer service but they just not responded. Really liked the look and how it operated but for 6 months of work, $200 is just not worth it. Hope they start making it more reliable because can’t find something as good looking as this kettle',
    images: [`${REVIEW_ASSET_ROOT}/review-07-01.png`],
    recommend: false,
    helpful: 63,
    notHelpful: 3,
  },
  {
    title: 'No Useful Life - Great While it Lasted',
    author: 'Lauren',
    date: '4 years ago',
    location: '',
    votes: 45,
    reviewCount: 1,
    rating: 1,
    copy: `I've owned much lower cost, lesser brand electric kettles that have provided 3-5 years of use. I got this beautiful gold kettle as a Christmas gift last year . It was wonderful - while it lasted. Despite light use by one adult & excellent "by the book" care, it abruptly stopped heating up when turned on days just days after the one-year warranty expired! This was my first Breville product & my last. I've owned much lesser cost, less prestigious brand electric kettles in the past that have provided 3-5 years of useful life, so this is an eye-opener about Breville quality & reliability.`,
    images: [],
    recommend: false,
    helpful: 42,
    notHelpful: 3,
  },
];

const customerReviewMedia = [
  'media-01.png',
  'media-02.png',
  'media-03.png',
  'media-04.png',
  'media-05.png',
  'media-06.png',
  'media-07.png',
  'media-08.png',
  'media-09.png',
].map((image, index) => ({ image: `${REVIEW_ASSET_ROOT}/${image}`, author: `Customer ${index + 1}` }));

const carouselSections = [
  {
    title: 'Parts and Accessories',
    products: [
      {
        title: 'Filter Removable',
        price: '$6.95',
        image: `${CAROUSEL_ASSET_ROOT}/filter-removable.png`,
      },
      {
        title: 'Base Cord Assembly',
        subtitle: 'Brushed Stainless Steel',
        price: '$49.95',
        image: `${CAROUSEL_ASSET_ROOT}/base-cord-assembly.png`,
      },
      {
        title: 'the Machine Descaler\u2122',
        price: '$19.95',
        image: `${CAROUSEL_ASSET_ROOT}/machine-descaler.png`,
        options: [
          { label: 'x6', price: '$19.95' },
          { label: 'x12', price: '$34.95' },
        ],
      },
      {
        title: 'the Descaler\u2122',
        price: '$14.95',
        image: `${CAROUSEL_ASSET_ROOT}/descaler-single.png`,
      },
    ],
  },
  {
    title: 'You may also like',
    products: [
      {
        title: 'the IQ Kettle\u2122',
        subtitle: '5 temperature settings and soft open lid.',
        price: '$179.95',
        image: `${CAROUSEL_ASSET_ROOT}/iq-kettle.png`,
      },
      {
        title: 'the Temp Select\u2122',
        subtitle: '5 temperature settings for tea and coffee.',
        price: '$109.95',
        image: `${CAROUSEL_ASSET_ROOT}/temp-select.png`,
      },
      {
        title: 'the Soft Top\u2122 Pure',
        subtitle: 'BPA Free windows & metal filter',
        price: '$99.95',
        image: `${CAROUSEL_ASSET_ROOT}/soft-top-pure.png`,
      },
      {
        title: 'the Smart Crystal Luxe\u2122',
        subtitle: 'Brew tea intelligently with 5 varietal settings and large capacity.',
        price: '$219.95',
        image: `${CAROUSEL_ASSET_ROOT}/smart-crystal-luxe.png`,
      },
      {
        title: 'the IQ Kettle\u2122 Pure',
        subtitle: '5 temperature settings and soft open lid.',
        price: '$199.95',
        image: `${CAROUSEL_ASSET_ROOT}/iq-kettle-pure.png`,
      },
      {
        title: 'the Crystal Clear\u2122',
        subtitle: 'Elegant and efficient kettle with Dura Glass\u2122.',
        price: '$109.95',
        image: `${CAROUSEL_ASSET_ROOT}/crystal-clear.png`,
      },
    ],
  },
];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function StarRow() {
  return (
    <span className="buy-clean-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <img src={`${BUYBOX_ASSET_ROOT}/star-full.svg`} alt="" key={index} />
      ))}
    </span>
  );
}

function ReviewStars() {
  return (
    <span className="buy-clean-review-stars" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <img src={`${BUYBOX_ASSET_ROOT}/star-full.svg`} alt="" key={`review-star-${index}`} />
      ))}
      <img src={`${BUYBOX_ASSET_ROOT}/star-half.svg`} alt="" />
    </span>
  );
}

function ReviewCardStars({ rating }) {
  return (
    <span className="buy-clean-customer-review__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          className={index >= Math.ceil(rating) ? 'is-empty' : ''}
          src={`${BUYBOX_ASSET_ROOT}/${rating - index === 0.5 ? 'star-half' : 'star-full'}.svg`}
          alt=""
          aria-hidden="true"
          key={`customer-review-star-${index}`}
        />
      ))}
    </span>
  );
}

function ReviewListItem({ review }) {
  return (
    <article className="buy-clean-customer-review" key={`${review.author}-${review.title}`}>
      <div className="buy-clean-customer-review__detail">
        <aside className="buy-clean-customer-review__author">
          <strong>{review.author}</strong>
          <span>{review.date}</span>
          {review.location ? <em>{review.location}</em> : null}
          <dl>
            <div>
              <dt>Votes</dt>
              <dd>{review.votes}</dd>
            </div>
            <div>
              <dt>Review</dt>
              <dd>{review.reviewCount}</dd>
            </div>
          </dl>
        </aside>

        <div className="buy-clean-customer-review__body">
          <div className="buy-clean-customer-review__meta">
            <ReviewCardStars rating={review.rating} />
            {review.freeProduct ? <span>Received Free Product</span> : null}
          </div>
          <h3>{review.title}</h3>
          <p>{review.copy}</p>
          {review.images.length ? (
            <div className="buy-clean-customer-review__images">
              {review.images.map((image, index) => (
                <figure key={`${review.author}-image-${index}`}>
                  <img src={image} alt={`Customer review photo ${index + 1} from ${review.author}`} />
                </figure>
              ))}
            </div>
          ) : null}
          <footer className={review.recommend ? 'is-recommended' : 'is-not-recommended'}>
            <span aria-hidden="true" />
            <p>{review.recommend ? 'Yes, I recommend this product.' : 'No, I do not recommend this product.'}</p>
          </footer>
          <div className="buy-clean-customer-review__votes" aria-label="Review feedback">
            <span>
              <img src={`${REVIEW_ASSET_ROOT}/review-thumb-up.svg`} alt="" aria-hidden="true" />
              {review.helpful}
            </span>
            <span>
              <img src={`${REVIEW_ASSET_ROOT}/review-thumb-down.svg`} alt="" aria-hidden="true" />
              {review.notHelpful}
            </span>
          </div>
        </div>

        <div className="buy-clean-customer-review__actions">
          <button type="button">Helpful</button>
          <button type="button">Report</button>
        </div>
      </div>
    </article>
  );
}

function GridOverlay({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="buy-clean-grid-overlay" aria-hidden="true">
      {Array.from({ length: globalVariables.columns }).map((_, index) => (
        <span key={`column-${index}`} />
      ))}
    </div>
  );
}

function AccordionHeader({ title, isOpen, onToggle }) {
  return (
    <button className="buy-clean-accordion__header" type="button" aria-expanded={isOpen} onClick={onToggle}>
      <h2>{title}</h2>
      {isOpen ? (
        <img src={`${ACCORDION_ASSET_ROOT}/accordion-minus.svg`} alt="" aria-hidden="true" />
      ) : (
        <span className="buy-clean-accordion__plus" aria-hidden="true" />
      )}
    </button>
  );
}

function TechnicalSpecifications({ isOpen, onToggle, isRail = false }) {
  const specColumns = isRail ? railTechnicalSpecColumns : technicalSpecColumns;

  return (
    <section className={`buy-clean-accordion${isOpen ? ' is-open' : ''}`} aria-label="Technical Specifications">
      <AccordionHeader title="Technical Specifications" isOpen={isOpen} onToggle={onToggle} />
      {isOpen ? (
        <div className="buy-clean-accordion__specs">
          {specColumns.map((column, columnIndex) => (
            <div className="buy-clean-accordion__spec-column" key={`spec-column-${columnIndex}`}>
              {column.map((item) => (
                <div className="buy-clean-accordion__text-block" key={item.title}>
                  <h3>{item.title}</h3>
                  {Array.isArray(item.copy) ? (
                    <div>
                      {item.copy.map((line) => <p key={line}>{line}</p>)}
                    </div>
                  ) : (
                    <p>{item.copy}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function IncludedAccordion({ isOpen, onToggle }) {
  return (
    <section className={`buy-clean-accordion${isOpen ? ' is-open' : ''}`} aria-label="What's Included">
      <AccordionHeader title="What's Included" isOpen={isOpen} onToggle={onToggle} />
      {isOpen ? (
        <div className="buy-clean-accordion__included-grid">
          {includedAccordionItems.map((item, index) => (
            <article className="buy-clean-accordion__included-item" key={`${item.title}-${index}`}>
              <img src={item.image} alt="" />
              <p>{item.title}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SupportAccordion({ isOpen, onToggle, isRail = false }) {
  return (
    <section className={`buy-clean-accordion${isOpen ? ' is-open' : ''}`} aria-label="Support & Documentation">
      <AccordionHeader title="Support & Documentation" isOpen={isOpen} onToggle={onToggle} />
      {isOpen ? (
        isRail ? (
          <div className="buy-clean-accordion__support buy-clean-accordion__support--rail">
            {supportRailItems.map((item) => (
              <button type="button" key={item}>
                <span>{item}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <div className="buy-clean-accordion__support">
            <article className="buy-clean-support-card buy-clean-support-card--large" aria-label="Product Hub">
              <img src={`${ACCORDION_ASSET_ROOT}/support-product-hub.png`} alt="" />
              <span>
                <strong>Product Hub</strong>
                <em>Download setup, cleaning, and safety guidance.</em>
              </span>
              <img className="buy-clean-support-card__arrow" src={`${ACCORDION_ASSET_ROOT}/support-arrow-right.svg`} alt="" aria-hidden="true" />
            </article>
            <div className="buy-clean-accordion__support-stack">
              <article className="buy-clean-support-card buy-clean-support-card--small" aria-label="Instruction Manual">
                <span>
                  <strong>Instruction<br />Manual</strong>
                </span>
                <img className="buy-clean-support-card__arrow" src={`${ACCORDION_ASSET_ROOT}/support-arrow-right.svg`} alt="" aria-hidden="true" />
                <img src={`${ACCORDION_ASSET_ROOT}/support-instruction-manual.png`} alt="" />
              </article>
              <article className="buy-clean-support-card buy-clean-support-card--small" aria-label="Return Policies">
                <span>
                  <strong>Return<br />Policies</strong>
                </span>
                <img className="buy-clean-support-card__arrow" src={`${ACCORDION_ASSET_ROOT}/support-arrow-right.svg`} alt="" aria-hidden="true" />
                <img src={`${ACCORDION_ASSET_ROOT}/support-return-policies.png`} alt="" />
              </article>
            </div>
          </div>
        )
      ) : null}
    </section>
  );
}

function Option3RailAccordionHeader({ title, isOpen, onToggle }) {
  return (
    <button className="buy-clean-option3-rail-accordion__header" type="button" aria-expanded={isOpen} onClick={onToggle}>
      <span>{title}</span>
      <i className={isOpen ? 'is-open' : ''} aria-hidden="true" />
    </button>
  );
}

function Option3RailAccordions({ openAccordions, onToggleAccordion }) {
  return (
    <section className="buy-clean-option3-rail-accordions" aria-label="Product details">
      <article className="buy-clean-option3-rail-accordion">
        <Option3RailAccordionHeader title="Technical Specifications" isOpen={openAccordions.has('technical')} onToggle={() => onToggleAccordion('technical')} />
        {openAccordions.has('technical') ? (
          <div className="buy-clean-option3-rail-accordion__specs">
            {railTechnicalSpecColumns.map((column, columnIndex) => (
              <div key={`option3-spec-column-${columnIndex}`}>
                {column.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    {Array.isArray(item.copy) ? (
                      <div>
                        {item.copy.map((line) => <p key={line}>{line}</p>)}
                      </div>
                    ) : (
                      <p>{item.copy}</p>
                    )}
                  </section>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </article>

      <article className="buy-clean-option3-rail-accordion">
        <Option3RailAccordionHeader title="What's Included" isOpen={openAccordions.has('included')} onToggle={() => onToggleAccordion('included')} />
        {openAccordions.has('included') ? (
          <div className="buy-clean-option3-rail-accordion__included">
            {includedAccordionItems.map((item) => (
              <section key={item.title}>
                <img src={item.image} alt="" />
                <p>{item.title}</p>
              </section>
            ))}
          </div>
        ) : null}
      </article>

      <article className="buy-clean-option3-rail-accordion">
        <Option3RailAccordionHeader title="Support & Documentation" isOpen={openAccordions.has('support')} onToggle={() => onToggleAccordion('support')} />
        {openAccordions.has('support') ? (
          <div className="buy-clean-option3-rail-accordion__support">
            {supportRailItems.map((item) => (
              <button type="button" key={item}>
                <span>{item}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
      </article>
    </section>
  );
}

function CustomerReviewsPanel() {
  const totalReviews = reviewRows.reduce((total, row) => total + row.count, 0);
  const mediaItems = customerReviewMedia.length
    ? customerReviewMedia
    : customerReviews.flatMap((review) => review.images.map((image) => ({ image, author: review.author })));

  return (
    <div className="buy-clean-reviews-panel">
      <div className="buy-clean-accordion__reviews">
        <div className="buy-clean-reviews-summary">
          <strong>4.5</strong>
          <div>
            <p>
              <ReviewStars />
              <span>190 reviews</span>
            </p>
            <small>135 out 166 (81%) reviewers recommended this product</small>
          </div>
        </div>
        <div className="buy-clean-reviews-meter-list">
          {reviewRows.map((row) => (
            <div className="buy-clean-reviews-meter" key={row.label}>
              <span>{row.label}</span>
              <i aria-hidden="true">
                <b style={{ '--review-meter-width': `${totalReviews ? (row.count / totalReviews) * 100 : 0}%` }} />
              </i>
              <em>{String(row.count).padStart(2, '0')}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="buy-clean-reviews-overview">
        <section>
          <h3>Review this Product</h3>
          <p>Adding a review will require a valid email for verification</p>
          <button type="button">Review</button>
        </section>
        <section>
          <h3>Reviews Summary</h3>
          <p>{reviewSummaryCopy}</p>
        </section>
      </div>

      <div className="buy-clean-reviews-media">
        <header>
          <h3>Customer Images and Videos</h3>
          <button type="button">See all</button>
        </header>
        <div>
          {mediaItems.map((item, index) => (
            <figure key={`review-media-${item.author}-${index}`}>
              <img src={item.image} alt={`Customer media ${index + 1} from ${item.author}`} />
            </figure>
          ))}
        </div>
      </div>

      <div className="buy-clean-customer-reviews" aria-label="Customer review highlights">
        {customerReviews.map((review) => (
          <ReviewListItem review={review} key={`${review.author}-${review.title}`} />
        ))}
      </div>

      <footer className="buy-clean-reviews-pagination">
        <span>1 - 8 of 193 Reviews</span>
        <div>
          <button type="button" aria-label="Previous reviews" disabled>
            <i aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next reviews">
            <i aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function CustomerReviewsAccordion({ isOpen, onToggle, reviewsRef }) {
  return (
    <section
      className={`buy-clean-accordion${isOpen ? ' is-open' : ''}`}
      id="customer-reviews"
      ref={reviewsRef}
      aria-label="Customer Reviews"
    >
      <AccordionHeader title="Customer Reviews" isOpen={isOpen} onToggle={onToggle} />
      {isOpen ? <CustomerReviewsPanel /> : null}
    </section>
  );
}

function FaqAccordion() {
  return (
    <section className="buy-clean-accordion buy-clean-accordion--faq" aria-label="FAQS">
      <div className="buy-clean-accordion__faq-title">
        <h2>FAQS</h2>
      </div>
      <div className="buy-clean-accordion__faq-list">
        {faqItems.map((item, index) => (
          <article className="buy-clean-accordion__faq-item" key={`${item.question}-${index}`}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExpandedAccordions({ openAccordions, onToggleAccordion, reviewsRef, hideReviews = false, isRail = false }) {
  return (
    <section className="buy-clean-afterfold" aria-label="Product details">
      <TechnicalSpecifications isOpen={openAccordions.has('technical')} onToggle={() => onToggleAccordion('technical')} isRail={isRail} />
      <IncludedAccordion isOpen={openAccordions.has('included')} onToggle={() => onToggleAccordion('included')} />
      <SupportAccordion isOpen={openAccordions.has('support')} onToggle={() => onToggleAccordion('support')} isRail={isRail} />
      {!hideReviews ? (
        <CustomerReviewsAccordion isOpen={openAccordions.has('reviews')} onToggle={() => onToggleAccordion('reviews')} reviewsRef={reviewsRef} />
      ) : null}
      <FaqAccordion />
    </section>
  );
}

function CarouselControls({ align = 'end', canPrevious = false, canNext = true, onPrevious = () => {}, onNext = () => {} }) {
  return (
    <div className={`buy-clean-carousel__controls buy-clean-carousel__controls--${align}`} aria-label="Carousel controls">
      <button
        className={!canPrevious ? 'is-disabled' : ''}
        type="button"
        aria-label="Previous"
        disabled={!canPrevious}
        onClick={onPrevious}
      >
        <span aria-hidden="true" />
      </button>
      <button
        className={!canNext ? 'is-disabled' : ''}
        type="button"
        aria-label="Next"
        disabled={!canNext}
        onClick={onNext}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  );
}

function FeatureHighlights({ useVideos = false }) {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const cards = useVideos ? option3FeaturePanelItems : featureHighlightCards;
  const activeFeature = cards[selectedFeature] || cards[0];
  const canCycleFeatures = useVideos && cards.length > 1;
  const moveFeature = (direction) => {
    setSelectedFeature((currentIndex) => (
      (currentIndex + direction + cards.length) % cards.length
    ));
  };

  return (
    <section className={`buy-clean-feature-highlights${useVideos ? ' is-video' : ''}`} aria-label="Feature Highlights">
      <div className="buy-clean-feature-highlights__content">
        <div className="buy-clean-feature-highlights__copy">
          <h2>Feature Highlights</h2>
          <div className="buy-clean-feature-highlights__text">
            <h3>{activeFeature.title}</h3>
            <p>{activeFeature.copy}</p>
          </div>
          <CarouselControls align="start" canPrevious={canCycleFeatures} canNext={canCycleFeatures} onPrevious={() => moveFeature(-1)} onNext={() => moveFeature(1)} />
        </div>
        <figure className="buy-clean-feature-highlights__image">
          {useVideos ? (
            <video muted loop autoPlay playsInline preload="metadata" key={activeFeature.video}>
              <source src={activeFeature.video} type="video/mp4" />
            </video>
          ) : (
            <img src={`${FEATURE_HIGHLIGHT_ASSET_ROOT}/varietal-settings.png`} alt="" />
          )}
        </figure>
      </div>
      <div className="buy-clean-feature-highlights__mobile">
        <h2>Get the Highlights</h2>
        <div className="buy-clean-feature-highlights__viewport">
          <div className="buy-clean-feature-highlights__track">
            {cards.map((card) => (
              <article className="buy-clean-feature-card" key={card.title}>
                <figure>
                  {useVideos ? (
                    <video muted loop autoPlay playsInline preload="metadata">
                      <source src={card.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={card.image} alt="" />
                  )}
                </figure>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCarouselCard({ product }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const activeOption = product.options?.[selectedOption];
  const price = activeOption?.price || product.price;

  return (
    <article className="buy-clean-product-card">
      <figure>
        <img src={product.image} alt="" />
        {product.options ? (
          <div className="buy-clean-product-card__options" aria-label="Size options">
            {product.options.map((option, index) => (
              <button
                className={index === selectedOption ? 'is-selected' : ''}
                type="button"
                aria-pressed={index === selectedOption}
                onClick={() => setSelectedOption(index)}
                key={option.label}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </figure>
      <div className="buy-clean-product-card__bottom">
        <div>
          <strong>{product.title}</strong>
          {product.subtitle ? <em>{product.subtitle}</em> : null}
          <span>{price}</span>
        </div>
        <button type="button" aria-label={`Add ${product.title} to cart`}>
          <img src={`${HEADER_ASSET_ROOT}/cart.svg`} alt="" />
        </button>
      </div>
    </article>
  );
}

function ProductCarouselSection({ section }) {
  const viewportRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canPrevious: false, canNext: false });

  const updateScrollState = () => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setScrollState({
      canPrevious: viewport.scrollLeft > 1,
      canNext: viewport.scrollLeft < maxScrollLeft - 1,
    });
  };

  useEffect(() => {
    updateScrollState();

    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const handleUpdate = () => updateScrollState();
    const resizeObserver = new ResizeObserver(handleUpdate);

    viewport.addEventListener('scroll', handleUpdate, { passive: true });
    resizeObserver.observe(viewport);

    Array.from(viewport.children).forEach((child) => resizeObserver.observe(child));

    return () => {
      viewport.removeEventListener('scroll', handleUpdate);
      resizeObserver.disconnect();
    };
  }, [section.products.length]);

  const scrollCarousel = (direction) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const firstCard = viewport.querySelector('.buy-clean-product-card');
    const track = viewport.querySelector('.buy-clean-carousel__track');
    const gap = track ? parseFloat(window.getComputedStyle(track).columnGap) || 0 : 0;
    const cardWidth = firstCard?.getBoundingClientRect().width || viewport.clientWidth;

    viewport.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });

    window.setTimeout(updateScrollState, 360);
  };

  return (
    <section className="buy-clean-carousel" aria-label={section.title}>
      <header>
        <h2>{section.title}</h2>
        <CarouselControls
          canPrevious={scrollState.canPrevious}
          canNext={scrollState.canNext}
          onPrevious={() => scrollCarousel(-1)}
          onNext={() => scrollCarousel(1)}
        />
      </header>
      <div className="buy-clean-carousel__viewport" ref={viewportRef}>
        <div className="buy-clean-carousel__track">
          {section.products.map((product) => (
            <ProductCarouselCard product={product} key={product.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCarousels() {
  return (
    <section className="buy-clean-carousels" aria-label="Related products">
      {carouselSections.map((section) => (
        <ProductCarouselSection section={section} key={section.title} />
      ))}
      <div className="buy-clean-carousels__compare">
        <button type="button">Compare Kettles</button>
      </div>
    </section>
  );
}

function PaletteCleanse() {
  return (
    <section className="buy-clean-palette-cleanse" aria-label="Palette cleanse">
      <img src={`${BUY_CLEAN_ASSET_ROOT}/full_bleed.png`} alt="" />
      <div className="buy-clean-palette-cleanse__copy">
        <h2>Brew Intelligently</h2>
        <p>
          This 7 cup capacity smart kettle knows the ideal temperature to bring out optimal taste and quality of your favorite tea or coffee.
          5 temperature settings to brew Black, Green, White, Oolong Tea and French press coffee. Also features a soft opening lid to gently
          release hot steam and prevent hot water splash back.
        </p>
      </div>
    </section>
  );
}

function PurchaseDockMarkup({ cartTotal, quantity, onDecreaseQuantity, onIncreaseQuantity }) {
  return (
    <>
      <div className="buy-clean-purchase-dock__top">
        <div>
          <strong>Free Shipping</strong>
          <span>Get it by Thursday</span>
        </div>
        <em>{cartTotal}</em>
      </div>
      <div className="buy-clean-purchase-dock__bottom">
        <div className="buy-clean-quantity">
          <button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={onDecreaseQuantity}>âˆ’</button>
          <span>{quantity}</span>
          <button type="button" aria-label="Increase quantity" disabled={quantity === MAX_QUANTITY} onClick={onIncreaseQuantity}>+</button>
        </div>
        <button className="buy-clean-add" type="button">
          <span>Add to cart</span>
          <span>{cartTotal}</span>
        </button>
      </div>
    </>
  );
}

function PurchaseDock({ cartTotal, quantity, onDecreaseQuantity, onIncreaseQuantity }) {
  return (
    <section className="buy-clean-purchase-dock" aria-label="Purchase summary">
      <PurchaseDockMarkup
        cartTotal={cartTotal}
        quantity={quantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
      />
    </section>
  );
}

function WarrantyOptions({ selectedWarranty, onSelectWarranty }) {
  return (
    <section className="buy-clean-warranty" aria-label="Warranty">
      <h2>Warranty</h2>
      <div className="buy-clean-warranty__options">
        {warrantyOptions.map((item) => {
          const isSelected = selectedWarranty === item.id;

          return (
            <button
              className={isSelected ? 'is-selected' : ''}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectWarranty(item.id)}
              key={item.id}
            >
              <span>
                <strong>{item.title}</strong>
                <em>{item.detail}</em>
              </span>
              <i aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SwatchButtons({ selectedColor, onSelectColor }) {
  return (
    <div className="buy-clean-swatches">
      {colors.map((option, index) => (
        <button
          className={index === selectedColor ? 'is-selected' : ''}
          type="button"
          aria-label={option.name}
          aria-pressed={index === selectedColor}
          onClick={() => onSelectColor(index)}
          key={option.name}
        >
          <img src={option.swatch} alt="" />
        </button>
      ))}
    </div>
  );
}

function GalleryThumbs({ activeColor, selectedGallery, onSelectGallery, className = 'buy-clean-thumbs' }) {
  return (
    <div className={className} role="tablist" aria-label="Product media">
      {gallery.map((item) => {
        const isSelected = selectedGallery === item.id;

        return (
          <button
            className={`buy-clean-thumb buy-clean-thumb--${item.type}${isSelected ? ' is-selected' : ''}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-label={item.label}
            onClick={() => onSelectGallery(item.id)}
            key={item.id}
          >
            {item.type === 'video' ? (
              <video muted playsInline preload="metadata" aria-hidden="true">
                <source src={item.source} type="video/mp4" />
              </video>
            ) : (
              <img src={activeColor.image} alt="" />
            )}
            {item.type === 'video' ? <span className="buy-clean-thumb__play" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function MobileGalleryDots({ selectedGallery, onSelectGallery }) {
  return (
    <div className="buy-clean-mobile-dots" aria-label="Product media pagination">
      {gallery.map((item) => (
        <button
          className={selectedGallery === item.id ? 'is-selected' : ''}
          type="button"
          aria-label={item.label}
          aria-current={selectedGallery === item.id ? 'true' : undefined}
          onClick={() => onSelectGallery(item.id)}
          key={`mobile-dot-${item.id}`}
        />
      ))}
    </div>
  );
}

function DebugPanel({
  activeLayout,
  onLayoutChange,
  variables,
  onVariableChange,
  isResponsive,
  onResponsiveChange,
  isPaletteCleanseVisible,
  onPaletteCleanseChange,
  isSmoothScroll,
  onSmoothScrollChange,
  isAccordionMoved,
  onAccordionMovedChange,
  isGreySpacerVisible,
  onGreySpacerChange,
  isOpen,
}) {
  if (!isOpen) {
    return null;
  }

  const variableLabels = {
    isolatedSwatches: 'Isolated swatches',
    largeSwatches: 'Large swatch',
    hideFeatures: 'Hide features',
    bottomThumbnails: 'Bottom thumbnails',
    railTextBump: 'Rail text bump',
  };

  return (
    <aside className="buy-clean-debug" aria-label="Buy page debug panel">
      <div className="buy-clean-debug__header">
        <strong>Buy page</strong>
        <span>P panel / G grid</span>
      </div>

      <label>
        <span>Layout</span>
        <select value={activeLayout} onChange={(event) => onLayoutChange(event.target.value)}>
          {Object.entries(layouts).map(([key, layout]) => (
            <option value={key} key={key}>{layout.label}</option>
          ))}
        </select>
      </label>

      <div className="buy-clean-debug__group">
        <strong>Layout variables</strong>
        <label className="buy-clean-debug__toggle">
          <span>Responsive</span>
          <input
            type="checkbox"
            checked={isResponsive}
            onChange={(event) => onResponsiveChange(event.target.checked)}
          />
        </label>
        <label className="buy-clean-debug__toggle">
          <span>Palette cleanse</span>
          <input
            type="checkbox"
            checked={isPaletteCleanseVisible}
            onChange={(event) => onPaletteCleanseChange(event.target.checked)}
          />
        </label>
        <label className="buy-clean-debug__toggle">
          <span>Smooth</span>
          <input
            type="checkbox"
            checked={isSmoothScroll}
            onChange={(event) => onSmoothScrollChange(event.target.checked)}
          />
        </label>
        <label className="buy-clean-debug__toggle">
          <span>Move accordion</span>
          <input
            type="checkbox"
            checked={isAccordionMoved}
            onChange={(event) => onAccordionMovedChange(event.target.checked)}
          />
        </label>
        <label className="buy-clean-debug__toggle">
          <span>Grey spacer</span>
          <input
            type="checkbox"
            checked={isGreySpacerVisible}
            onChange={(event) => onGreySpacerChange(event.target.checked)}
          />
        </label>
        {Object.entries(variables).map(([key, value]) => (
          typeof value === 'boolean' ? (
            <label className="buy-clean-debug__toggle" key={key}>
              <span>{variableLabels[key] || key}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={(event) => onVariableChange(key, event.target.checked)}
              />
            </label>
          ) : (
            <label key={key}>
              <span>{key}</span>
              <input
                type="number"
                step={key === 'heroScale' ? '0.01' : '1'}
                value={value}
                onChange={(event) => onVariableChange(key, Number(event.target.value))}
              />
            </label>
          )
        ))}
      </div>

      <div className="buy-clean-debug__group">
        <strong>Global grid</strong>
        <dl>
          <div><dt>Width</dt><dd>{globalVariables.artboardWidth}px</dd></div>
          <div><dt>Margin</dt><dd>{globalVariables.pageMargin}px</dd></div>
          <div><dt>Gutter</dt><dd>{globalVariables.gutter}px</dd></div>
          <div><dt>Columns</dt><dd>{globalVariables.columns}</dd></div>
        </dl>
      </div>
    </aside>
  );
}

export default function BuyCleanPage() {
  const reviewsRef = useRef(null);
  const heroSwipeRef = useRef(null);
  const heroVideoRef = useRef(null);
  const option3FeatureVideoRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState(gallery[0].id);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState(() => new Set());
  const [selectedWarranty, setSelectedWarranty] = useState('one-year');
  const [openAccordions, setOpenAccordions] = useState(() => new Set());
  const [activeLayout, setActiveLayout] = useState('option2');
  const [layoutVariables, setLayoutVariables] = useState(layouts.option2.variables);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isResponsive, setIsResponsive] = useState(() => {
    const storedResponsive = window.localStorage.getItem('buyCleanResponsive');
    return window.matchMedia('(max-width: 767px)').matches || storedResponsive === 'true';
  });
  const [isPaletteCleanseVisible, setIsPaletteCleanseVisible] = useState(() => window.localStorage.getItem('buyCleanPaletteCleanse') !== 'false');
  const [isSmoothScroll, setIsSmoothScroll] = useState(true);
  const [isAccordionMoved, setIsAccordionMoved] = useState(false);
  const [isGreySpacerVisible, setIsGreySpacerVisible] = useState(false);
  const [isOption2RailReleased, setIsOption2RailReleased] = useState(false);
  const [isOption3FeaturesOpen, setIsOption3FeaturesOpen] = useState(false);
  const [option3PanelMode, setOption3PanelMode] = useState('features');
  const [selectedOption3Feature, setSelectedOption3Feature] = useState(0);
  const [galleryDirection, setGalleryDirection] = useState(0);

  const activeColor = colors[selectedColor];
  const activeGallery = gallery.find((item) => item.id === selectedGallery) || gallery[0];
  const activePrice = activeColor.name.includes('Brass') ? BRASS_PRICE : STANDARD_PRICE;
  const isOption1Layout = activeLayout === 'option1';
  const isOption2Layout = activeLayout === 'option2';
  const isOption3Layout = activeLayout === 'option3';
  const isDockedRailLayout = isOption2Layout || isOption3Layout;
  const hasOptionVariables = isOption1Layout || isDockedRailLayout;
  const hasLargeSwatches = hasOptionVariables && layoutVariables.largeSwatches;
  const hasIsolatedSwatches = hasOptionVariables && layoutVariables.isolatedSwatches && !hasLargeSwatches;
  const hasBottomThumbnails = hasOptionVariables && layoutVariables.bottomThumbnails;
  const hasRailTextBump = Boolean(layoutVariables.railTextBump);
  const shouldHideFeatures = Boolean(layoutVariables.hideFeatures);
  const activeOption3Feature = option3FeaturePanelItems[selectedOption3Feature];
  const selectedAddOnTotal = addOns.reduce((total, item) => (
    selectedAddOns.has(item.title) ? total + item.priceValue : total
  ), 0);
  const selectedWarrantyPrice = warrantyOptions.find((item) => item.id === selectedWarranty)?.priceValue || 0;
  const cartTotal = formatPrice((quantity * activePrice) + selectedAddOnTotal + selectedWarrantyPrice);
  const cssVariables = useMemo(() => ({
    '--buy-clean-hero-scale': layoutVariables.heroScale,
    '--buy-clean-rail-inset': `${layoutVariables.railInset}px`,
    '--buy-clean-rail-gap': `${layoutVariables.railGap}px`,
    '--buy-clean-swatch-gap': `${layoutVariables.swatchGap}px`,
  }), [layoutVariables]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) {
        return;
      }

      if (event.key.toLowerCase() === 'p') {
        setIsDebugOpen((value) => !value);
      }

      if (event.key.toLowerCase() === 'g') {
        setIsGridVisible((value) => !value);
      }

      if (event.key === 'Escape') {
        setIsOption3FeaturesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('buyCleanResponsive', String(isResponsive));
  }, [isResponsive]);

  useEffect(() => {
    window.localStorage.setItem('buyCleanPaletteCleanse', String(isPaletteCleanseVisible));
  }, [isPaletteCleanseVisible]);

  useEffect(() => {
    window.localStorage.setItem('buyCleanSmooth', String(isSmoothScroll));
  }, [isSmoothScroll]);

  useEffect(() => {
    window.localStorage.setItem('buyCleanMoveAccordion', String(isAccordionMoved));
  }, [isAccordionMoved]);

  useEffect(() => {
    window.localStorage.setItem('buyCleanGreySpacer', String(isGreySpacerVisible));
  }, [isGreySpacerVisible]);

  useEffect(() => {
    if (!isOption3Layout) {
      setIsOption3FeaturesOpen(false);
    }
  }, [isOption3Layout]);

  useEffect(() => {
    if (!isOption3FeaturesOpen) {
      return undefined;
    }

    const lockedScrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, lockedScrollY);
    };
  }, [isOption3FeaturesOpen]);

  useEffect(() => {
    const video = option3FeatureVideoRef.current;

    if (!video) {
      return undefined;
    }

    if (!isOption3FeaturesOpen || option3PanelMode !== 'features') {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Video metadata may not be ready yet.
      }
      return undefined;
    }

    video.load();
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // Video metadata may not be ready yet.
    }

    const playTimer = window.setTimeout(() => {
      video.play().catch(() => {});
    }, 340);

    return () => {
      window.clearTimeout(playTimer);
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Video metadata may not be ready yet.
      }
    };
  }, [isOption3FeaturesOpen, option3PanelMode, selectedOption3Feature]);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video || activeGallery.type !== 'video') {
      return;
    }

    if (isOption3FeaturesOpen) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }, [isOption3FeaturesOpen, activeGallery]);

  useEffect(() => {
    if (!isDockedRailLayout) {
      setIsOption2RailReleased(false);
    }
  }, [isDockedRailLayout]);

  useEffect(() => {
    const shouldSmoothPageScroll = isSmoothScroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!shouldSmoothPageScroll && !isDockedRailLayout) {
      return undefined;
    }

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let animationFrame = 0;
    let railTargetScroll = 0;
    let railAnimationFrame = 0;
    let activeRailCard = null;

    const clampScroll = (value) => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(Math.max(value, 0), maxScroll);
    };

    const animateScroll = () => {
      currentScroll += (targetScroll - currentScroll) * 0.11;

      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
        window.scrollTo(0, currentScroll);
        animationFrame = 0;
        return;
      }

      window.scrollTo(0, currentScroll);
      animationFrame = window.requestAnimationFrame(animateScroll);
    };

    const startAnimation = () => {
      if (!animationFrame) {
        currentScroll = window.scrollY;
        animationFrame = window.requestAnimationFrame(animateScroll);
      }
    };

    const updateOption2RailRelease = (railCard, effectiveRailScrollTop = null) => {
      if (!isDockedRailLayout) {
        return;
      }

      const maxRailScroll = railCard ? railCard.scrollHeight - railCard.clientHeight : 0;
      const railScrollTop = effectiveRailScrollTop ?? railCard?.scrollTop ?? 0;
      const isRailAtEnd = railCard && maxRailScroll > 1 && railScrollTop >= maxRailScroll - 1;

      setIsOption2RailReleased(Boolean(isRailAtEnd));
    };

    const syncOption2RailRelease = () => {
      const railCard = document.querySelector('.buy-clean-page.is-docked-rail .buy-clean-right-rail__card');
      updateOption2RailRelease(railCard);
    };

    const animateRailScroll = () => {
      if (!activeRailCard) {
        railAnimationFrame = 0;
        return;
      }

      const maxRailScroll = activeRailCard.scrollHeight - activeRailCard.clientHeight;
      railTargetScroll = Math.min(Math.max(railTargetScroll, 0), maxRailScroll);
      const nextRailScrollTop = activeRailCard.scrollTop + ((railTargetScroll - activeRailCard.scrollTop) * 0.14);

      if (Math.abs(railTargetScroll - nextRailScrollTop) < 0.5) {
        activeRailCard.scrollTop = railTargetScroll;
        updateOption2RailRelease(activeRailCard, railTargetScroll);
        railAnimationFrame = 0;
        return;
      }

      activeRailCard.scrollTop = nextRailScrollTop;
      updateOption2RailRelease(activeRailCard, railTargetScroll);
      railAnimationFrame = window.requestAnimationFrame(animateRailScroll);
    };

    const startRailAnimation = () => {
      if (!railAnimationFrame) {
        railAnimationFrame = window.requestAnimationFrame(animateRailScroll);
      }
    };

    const handleWheel = (event) => {
      if (isOption3FeaturesOpen) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.defaultPrevented) {
        return;
      }

      if (isDockedRailLayout) {
        const railCard = document.querySelector('.buy-clean-page.is-docked-rail .buy-clean-right-rail__card');
        const canScrollRail = railCard && railCard.scrollHeight > railCard.clientHeight + 1;

        if (canScrollRail) {
          const maxRailScroll = railCard.scrollHeight - railCard.clientHeight;
          const railScrollTop = railCard.scrollTop;
          const effectiveRailScrollTop = railAnimationFrame ? railTargetScroll : railScrollTop;
          const isPageAtTop = window.scrollY <= 1;
          const shouldScrollRail = (
            (event.deltaY > 0 && effectiveRailScrollTop < maxRailScroll - 1)
            || (event.deltaY < 0 && isPageAtTop && effectiveRailScrollTop > 1)
          );

          if (shouldScrollRail) {
            event.preventDefault();

            if (animationFrame) {
              window.cancelAnimationFrame(animationFrame);
              animationFrame = 0;
            }

            activeRailCard = railCard;
            railTargetScroll = Math.min(Math.max(effectiveRailScrollTop + event.deltaY, 0), maxRailScroll);
            updateOption2RailRelease(railCard, railTargetScroll);
            startRailAnimation();
            targetScroll = window.scrollY;
            currentScroll = window.scrollY;
            return;
          }

          syncOption2RailRelease();
        }
      }

      if (!shouldSmoothPageScroll) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
        return;
      }

      event.preventDefault();
      targetScroll = clampScroll(targetScroll + event.deltaY);
      startAnimation();
    };

    const handleScroll = () => {
      if (isOption3FeaturesOpen) {
        return;
      }

      if (!animationFrame) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }

      syncOption2RailRelease();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (railAnimationFrame) {
        window.cancelAnimationFrame(railAnimationFrame);
      }
    };
  }, [isSmoothScroll, isDockedRailLayout, isOption3FeaturesOpen]);

  const handleLayoutChange = (layoutKey) => {
    const toggleDefaults = layoutToggleDefaults[layoutKey] || {};

    setActiveLayout(layoutKey);
    setLayoutVariables(layouts[layoutKey].variables);
    setIsAccordionMoved(Boolean(toggleDefaults.accordionMoved));
    setIsGreySpacerVisible(Boolean(toggleDefaults.greySpacer));
  };

  const moveGallery = (direction) => {
    setGalleryDirection(direction);
    setSelectedGallery((currentType) => {
      const currentIndex = gallery.findIndex((item) => item.id === currentType);
      const nextIndex = (currentIndex + direction + gallery.length) % gallery.length;

      return gallery[nextIndex].id;
    });
  };

  const moveOption3Feature = (direction) => {
    setSelectedOption3Feature((currentIndex) => (
      (currentIndex + direction + option3FeaturePanelItems.length) % option3FeaturePanelItems.length
    ));
  };

  const selectGallery = (id) => {
    setGalleryDirection(0);
    setSelectedGallery(id);
  };

  const selectColor = (index) => {
    setSelectedColor(index);
    setGalleryDirection(0);
    setSelectedGallery(gallery[0].id);
  };

  const handleHeroPointerDown = (event) => {
    if (!event.isPrimary || !window.matchMedia('(max-width: 767px)').matches) {
      return;
    }

    heroSwipeRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleHeroPointerUp = (event) => {
    const swipeStart = heroSwipeRef.current;

    if (!swipeStart || swipeStart.pointerId !== event.pointerId) {
      return;
    }

    heroSwipeRef.current = null;

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
      return;
    }

    moveGallery(deltaX < 0 ? 1 : -1);
  };

  const handleHeroPointerCancel = () => {
    heroSwipeRef.current = null;
  };

  const updateLayoutVariable = (key, value) => {
    setLayoutVariables((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleAddOn = (title) => {
    setSelectedAddOns((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  const toggleAccordion = (key) => {
    setOpenAccordions((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const jumpToReviews = (event) => {
    event.preventDefault();

    if (isOption3Layout) {
      setOption3PanelMode('reviews');
      setIsOption3FeaturesOpen(true);
      return;
    }

    setOpenAccordions((current) => {
      const next = new Set(current);
      next.add('reviews');
      return next;
    });

    window.setTimeout(() => {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <main className={`buy-clean-page${isResponsive ? ' is-responsive' : ''}${isSmoothScroll ? ' is-smooth' : ''}${isOption1Layout ? ' is-option1' : ''}${isOption2Layout ? ' is-option2' : ''}${isOption3Layout ? ' is-option3' : ''}${isDockedRailLayout ? ' is-docked-rail' : ''}${isOption3FeaturesOpen ? ' is-feature-panel-open' : ''}${isOption2RailReleased ? ' is-rail-released' : ''}${hasIsolatedSwatches ? ' is-isolated-swatches' : ''}${hasLargeSwatches ? ' is-large-swatches' : ''}${hasBottomThumbnails ? ' is-bottom-thumbnails' : ''}${hasRailTextBump ? ' is-rail-text-bump' : ''}${galleryDirection > 0 ? ' is-gallery-next' : ''}${galleryDirection < 0 ? ' is-gallery-prev' : ''}`} style={cssVariables}>
      <GridOverlay visible={isGridVisible} />
      <section className={`buy-clean-atf-stage${isPaletteCleanseVisible ? ' has-palette-cleanse' : ''}`} aria-label="Smart Kettle Luxe buy page">
        {isPaletteCleanseVisible ? <PaletteCleanse /> : null}
        <section className="buy-clean-artboard" aria-label="Smart Kettle Luxe buy page">
        <header className="buy-clean-nav">
          <a className="buy-clean-nav__logo" href="/" aria-label="Breville home">
            <img src={`${HEADER_ASSET_ROOT}/logo.svg`} alt="Breville" />
          </a>
          <nav className="buy-clean-nav__links" aria-label="Primary navigation">
            {['Shop', 'Recipes', 'Breville+ App', 'Support', 'Sales & Offers'].map((item) => (
              <a href="/" key={item}>{item}</a>
            ))}
          </nav>
          <div className="buy-clean-nav__actions" aria-label="Quick links">
            <button type="button" aria-label="Search"><img src={`${HEADER_ASSET_ROOT}/search.svg`} alt="" /></button>
            <button type="button" aria-label="Account"><img src={`${HEADER_ASSET_ROOT}/user.svg`} alt="" /></button>
            <button type="button" aria-label="Cart"><img src={`${HEADER_ASSET_ROOT}/cart.svg`} alt="" /></button>
            <button className="buy-clean-nav__menu" type="button" aria-label="Menu"><span aria-hidden="true" /></button>
          </div>
        </header>

        <div className="buy-clean-fold">
          <section className="buy-clean-left-rail" aria-label="Product media">
            <div className="buy-clean-arrows" aria-label="Gallery controls">
              {hasBottomThumbnails ? (
                <GalleryThumbs
                  activeColor={activeColor}
                  selectedGallery={selectedGallery}
                  onSelectGallery={selectGallery}
                  className="buy-clean-bottom-thumbs"
                />
              ) : (
                <>
                  <button type="button" aria-label="Previous media" onClick={() => moveGallery(-1)}>
                    <span aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Next media" onClick={() => moveGallery(1)}>
                    <span aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {hasIsolatedSwatches ? (
              <section className="buy-clean-isolated-swatches" aria-label="Color">
                <h2>{activeColor.name}</h2>
                <SwatchButtons selectedColor={selectedColor} onSelectColor={selectColor} />
              </section>
            ) : null}
            <div className="buy-clean-media">
              <GalleryThumbs activeColor={activeColor} selectedGallery={selectedGallery} onSelectGallery={selectGallery} />

              <figure
                className={`buy-clean-hero${activeGallery.type === 'video' ? ` buy-clean-hero--video buy-clean-hero--${activeGallery.aspect}` : ''}`}
                style={activeGallery.type === 'image' ? { '--buy-clean-active-hero-image': `url("${activeColor.image}")` } : undefined}
                onPointerDown={handleHeroPointerDown}
                onPointerUp={handleHeroPointerUp}
                onPointerCancel={handleHeroPointerCancel}
              >
                {activeGallery.type === 'video' ? (
                  <video ref={heroVideoRef} className={`buy-clean-hero__video buy-clean-hero__video--${activeGallery.aspect}`} autoPlay muted loop playsInline key={activeGallery.id}>
                    <source src={activeGallery.source} type="video/mp4" />
                  </video>
                ) : (
                  <img className="buy-clean-hero__image" src={activeColor.image} alt={activeColor.name} />
                )}
              </figure>
            </div>
            <MobileGalleryDots selectedGallery={selectedGallery} onSelectGallery={selectGallery} />
          </section>

          <aside className="buy-clean-right-rail" aria-label="Product purchase options">
            <div className="buy-clean-right-rail__card">
              <div className="buy-clean-product-head">
                <a href="/" className="buy-clean-category">Kettles</a>
                <h1>the Smart Kettle<sup>TM</sup> Luxe</h1>
                {hasIsolatedSwatches ? <p className="buy-clean-product-model">Model: {activeColor.model}</p> : null}
                <div className="buy-clean-rating">
                  <span>4.5</span>
                  <StarRow />
                  <a href="#customer-reviews" onClick={jumpToReviews}>{reviewCountLabel}</a>
                </div>
                <div className="buy-clean-mobile-price-row">
                  <strong>{formatPrice(activePrice)}</strong>
                  <span>Free Shipping</span>
                </div>
                {!isDockedRailLayout ? (
                  <div className="buy-clean-price-row">
                    <strong>{formatPrice(activePrice)}</strong>
                    <span>Free Shipping</span>
                  </div>
                ) : null}
              </div>

              {isOption3Layout ? (
                <section className={`buy-clean-color-picker${hasIsolatedSwatches ? ' is-isolated' : ''}`} aria-label="Color">
                  {!hasIsolatedSwatches ? (
                    <>
                      <h2>{activeColor.name}</h2>
                      <p>Model: {activeColor.model}</p>
                    </>
                  ) : null}
                  {!hasIsolatedSwatches ? (
                    <SwatchButtons selectedColor={selectedColor} onSelectColor={selectColor} />
                  ) : null}
                  {hasIsolatedSwatches ? (
                    <div className="buy-clean-color-picker__mobile-swatches">
                      <h2>{activeColor.name}</h2>
                      <SwatchButtons selectedColor={selectedColor} onSelectColor={selectColor} />
                    </div>
                  ) : null}
                </section>
              ) : null}

              <section className="buy-clean-option3-copy" aria-label="Product description">
                <p>
                  This 7 cup capacity smart kettle knows the ideal temperature to bring out optimal taste and quality of your favorite tea or coffee.
                  5 temperature settings to brew Black, Green, White, Oolong Tea and French press coffee. Also features a soft opening lid to gently
                  release hot steam and prevent hot water splash back.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOption3PanelMode('features');
                    setIsOption3FeaturesOpen(true);
                  }}
                >
                  Explore features
                  <span aria-hidden="true" />
                </button>
              </section>

              {!isOption3Layout ? (
                <section className={`buy-clean-color-picker${hasIsolatedSwatches ? ' is-isolated' : ''}`} aria-label="Color">
                {!hasIsolatedSwatches ? (
                  <>
                    <h2>{activeColor.name}</h2>
                    <p>Model: {activeColor.model}</p>
                  </>
                ) : null}
                {!hasIsolatedSwatches ? (
                  <SwatchButtons selectedColor={selectedColor} onSelectColor={selectColor} />
                ) : null}
                {hasIsolatedSwatches ? (
                  <div className="buy-clean-color-picker__mobile-swatches">
                    <h2>{activeColor.name}</h2>
                    <SwatchButtons selectedColor={selectedColor} onSelectColor={selectColor} />
                  </div>
                ) : null}
                </section>
              ) : null}

              <section className="buy-clean-cart-row" aria-label="Add to cart">
                <div className="buy-clean-quantity">
                  <button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
                  <span>{quantity}</span>
                  <button type="button" aria-label="Increase quantity" disabled={quantity === MAX_QUANTITY} onClick={() => setQuantity((value) => Math.min(MAX_QUANTITY, value + 1))}>+</button>
                </div>
                <button className="buy-clean-add" type="button">
                  <span>Add to cart</span>
                  <span>{cartTotal}</span>
                </button>
              </section>

              <section className="buy-clean-included" aria-label="Included with Purchase">
                <h2>Included with Purchase</h2>
                {includedItems.map((item) => (
                  <article key={item.title}>
                    <img src={item.image} alt="" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </section>

              <WarrantyOptions selectedWarranty={selectedWarranty} onSelectWarranty={setSelectedWarranty} />

              <section className="buy-clean-addon" aria-label="Usually Purchased With">
                <h2>Usually Purchased With</h2>
                {addOns.map((item) => {
                  const isSelected = selectedAddOns.has(item.title);

                  return (
                    <button
                      className={isSelected ? 'is-selected' : ''}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleAddOn(item.title)}
                      key={item.title}
                    >
                      <span className="buy-clean-addon__image">
                        <img src={item.image} alt="" />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <em>{item.price}</em>
                      </span>
                      <i aria-hidden="true" />
                    </button>
                  );
                })}
              </section>
              {isAccordionMoved && isOption3Layout ? (
                <Option3RailAccordions openAccordions={openAccordions} onToggleAccordion={toggleAccordion} />
              ) : null}
              {isAccordionMoved && !isOption3Layout ? (
                <div className="buy-clean-rail-accordions">
                  <ExpandedAccordions openAccordions={openAccordions} onToggleAccordion={toggleAccordion} reviewsRef={reviewsRef} hideReviews={isOption3Layout} isRail />
                </div>
              ) : null}
              <div className="buy-clean-rail-spacer" aria-hidden="true" />
            </div>
            {isDockedRailLayout ? (
              <PurchaseDock
                cartTotal={cartTotal}
                quantity={quantity}
                onDecreaseQuantity={() => setQuantity((value) => Math.max(1, value - 1))}
                onIncreaseQuantity={() => setQuantity((value) => Math.min(MAX_QUANTITY, value + 1))}
              />
            ) : null}
          </aside>
        </div>
        </section>
      </section>

      {isGreySpacerVisible ? <div className="buy-clean-grey-spacer" aria-hidden="true" /> : null}
      {!shouldHideFeatures ? <FeatureHighlights useVideos={isOption2Layout} /> : null}
      {!isAccordionMoved ? (
        <ExpandedAccordions openAccordions={openAccordions} onToggleAccordion={toggleAccordion} reviewsRef={reviewsRef} hideReviews={isOption3Layout} />
      ) : null}
      <ProductCarousels />

      <div className="buy-clean-feature-panel" aria-hidden={!isOption3FeaturesOpen}>
        <button className="buy-clean-feature-panel__scrim" type="button" aria-label="Close feature panel" onClick={() => setIsOption3FeaturesOpen(false)} />
        <aside className={`buy-clean-feature-panel__drawer buy-clean-feature-panel__drawer--${option3PanelMode}`} aria-label={option3PanelMode === 'reviews' ? 'Customer reviews' : 'Product features'}>
          <header>
            <h2>{option3PanelMode === 'reviews' ? 'Customer Reviews' : 'Feature Highlights'}</h2>
            <button className="buy-clean-feature-panel__close" type="button" aria-label="Close feature panel" onClick={() => setIsOption3FeaturesOpen(false)}>
              <span aria-hidden="true" />
            </button>
          </header>
          {option3PanelMode === 'reviews' ? (
            <CustomerReviewsPanel />
          ) : (
            <>
              <figure>
                <video ref={option3FeatureVideoRef} muted playsInline preload="metadata" key={activeOption3Feature.video}>
                  <source src={activeOption3Feature.video} type="video/mp4" />
                </video>
              </figure>
              <article>
                <h3>{activeOption3Feature.title}</h3>
                <p>{activeOption3Feature.copy}</p>
              </article>
              <div className="buy-clean-feature-panel__arrows" aria-label="Feature controls">
                <button type="button" aria-label="Previous feature" onClick={() => moveOption3Feature(-1)}>
                  <span aria-hidden="true" />
                </button>
                <button type="button" aria-label="Next feature" onClick={() => moveOption3Feature(1)}>
                  <span aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      <DebugPanel
        activeLayout={activeLayout}
        onLayoutChange={handleLayoutChange}
        variables={layoutVariables}
        onVariableChange={updateLayoutVariable}
        isResponsive={isResponsive}
        onResponsiveChange={setIsResponsive}
        isPaletteCleanseVisible={isPaletteCleanseVisible}
        onPaletteCleanseChange={setIsPaletteCleanseVisible}
        isSmoothScroll={isSmoothScroll}
        onSmoothScrollChange={setIsSmoothScroll}
        isAccordionMoved={isAccordionMoved}
        onAccordionMovedChange={setIsAccordionMoved}
        isGreySpacerVisible={isGreySpacerVisible}
        onGreySpacerChange={setIsGreySpacerVisible}
        isOpen={isDebugOpen}
      />
    </main>
  );
}

