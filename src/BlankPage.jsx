import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContextualMenu from './ContextualMenu.jsx';
import { HeroOnlyHeader } from './HeroOnlyPage.jsx';
import { CompareTakeover } from './StickyNavBlankPage.jsx';
import { MotionElevateStrip } from './testing/MotionPage.jsx';
import { TestingFooter } from './testing/MotionSupport.jsx';

gsap.registerPlugin(ScrollTrigger);

const scheduleIdleWork = (callback) => {
  if (typeof window === 'undefined') {
    return { cancel: () => {} };
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1600 });
    return { cancel: () => window.cancelIdleCallback(id) };
  }

  const id = window.setTimeout(callback, 80);
  return { cancel: () => window.clearTimeout(id) };
};

const warmImage = (src, fetchPriority = 'low') => {
  const image = new Image();

  image.decoding = 'async';
  image.fetchPriority = fetchPriority;
  image.src = src;

  if (image.decode) {
    image.decode().catch(() => {});
  }

  return image;
};

const warmSequenceFrames = (framePath, startFrame = 0, endFrame = 0, maxFrames = 72) => {
  const frameCount = Math.max(0, endFrame - startFrame + 1);

  if (!framePath || frameCount <= 0) {
    return () => {};
  }

  const step = Math.max(1, Math.ceil(frameCount / maxFrames));
  const frames = new Set([startFrame, endFrame]);

  for (let frame = startFrame; frame <= endFrame; frame += step) {
    frames.add(frame);
  }

  let isCancelled = false;
  let scheduledWork = null;
  const frameQueue = Array.from(frames).sort((a, b) => a - b);

  const loadNext = () => {
    scheduledWork = null;

    if (isCancelled || !frameQueue.length) {
      return;
    }

    warmImage(framePath(frameQueue.shift()));

    if (frameQueue.length) {
      scheduledWork = scheduleIdleWork(loadNext);
    }
  };

  scheduledWork = scheduleIdleWork(loadNext);

  return () => {
    isCancelled = true;
    scheduledWork?.cancel();
  };
};

const retrySequenceImage = (image) => {
  const retryCount = Number(image.dataset.retryCount || 0);

  if (retryCount >= 2) {
    return;
  }

  const source = image.getAttribute('src');

  if (!source) {
    return;
  }

  image.dataset.retryCount = String(retryCount + 1);

  window.setTimeout(() => {
    const separator = source.includes('?') ? '&' : '?';
    image.src = `${source}${separator}retry=${retryCount + 1}`;
  }, 220 * (retryCount + 1));
};

const playMutedVideo = (video) => {
  if (!video || document.visibilityState === 'hidden') {
    return;
  }

  video.muted = true;
  video.playsInline = true;

  const playPromise = video.play();

  if (playPromise) {
    playPromise.catch(() => {});
  }
};

const bindResilientAutoplayVideo = (video) => {
  if (!video) {
    return () => {};
  }

  let retryTimeout = 0;

  const schedulePlay = () => {
    window.clearTimeout(retryTimeout);
    retryTimeout = window.setTimeout(() => playMutedVideo(video), 180);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      schedulePlay();
    }
  };

  ['canplay', 'loadeddata', 'stalled', 'waiting', 'suspend', 'emptied'].forEach((eventName) => {
    video.addEventListener(eventName, schedulePlay);
  });

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pageshow', schedulePlay);
  schedulePlay();

  return () => {
    window.clearTimeout(retryTimeout);
    ['canplay', 'loadeddata', 'stalled', 'waiting', 'suspend', 'emptied'].forEach((eventName) => {
      video.removeEventListener(eventName, schedulePlay);
    });
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pageshow', schedulePlay);
  };
};

function BlankHeroOnlySection() {
  const stageRef = useRef(null);
  const heroOverlay = 0.1;
  const overlayStops = {
    top: heroOverlay,
    mid: heroOverlay * 0.45,
    bottom: heroOverlay * 1.75,
  };

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const videos = Array.from(stage.querySelectorAll('video'));
    const cleanupVideoBindings = videos.map(bindResilientAutoplayVideo);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            playMutedVideo(video);
            return;
          }

          video.pause();
        });
      },
      { threshold: 0.18 },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      cleanupVideoBindings.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <HeroOnlyHeader />

      <section
        className="blank-hero hero-only"
        aria-label="the Smart Kettle Luxe"
        style={{
          '--hero-overlay-top': overlayStops.top,
          '--hero-overlay-mid': overlayStops.mid,
          '--hero-overlay-bottom': overlayStops.bottom,
          '--hero-text-shadow-opacity': 0,
          '--hero-text-weight': 500,
          '--hero-headline-gap': '19px',
          '--hero-copy-gap': '19px',
        }}
      >
        <div className="hero-only__stage" ref={stageRef}>
          <video
            className="hero-only__video hero-only__video--desktop"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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
            preload="auto"
            aria-label="Smart Kettle Luxe mobile hero video"
          >
            <source src="/assets/videos/mobile_hero.mp4" type="video/mp4" />
          </video>

          <div className="hero-only__copy">
            <div className="hero-only__headline">
              <p className="hero-only__eyebrow">the Smart Kettle&trade; Luxe</p>
              <h1 className="hero-only__title">Brew Intelligently</h1>
            </div>
            <p className="hero-only__scroll">Scroll to Discover</p>
          </div>
        </div>
      </section>
    </>
  );
}

const galleryImages = [
  {
    desktop: '/assets/images/gallery/galery_d_1.png',
    mobile: '/assets/images/gallery/galery_m_1.png',
    alt: 'Smart Kettle Luxe detail in a warm kitchen setting',
  },
  {
    desktop: '/assets/images/gallery/galery_d_2.png',
    mobile: '/assets/images/gallery/galery_m_2.png',
    alt: 'Smart Kettle Luxe with premium finish on a countertop',
  },
  {
    desktop: '/assets/images/gallery/galery_d_3.png',
    mobile: '/assets/images/gallery/galery_m_3.png',
    alt: 'Smart Kettle Luxe sculptural design detail',
  },
];

const reviewHighlightRows = [
  ['5 stars', 135],
  ['4 stars', 21],
  ['3 stars', 10],
  ['2 stars', 7],
  ['1 star', 17],
];

const reviewHighlightMaxCount = Math.max(...reviewHighlightRows.map(([, count]) => count));

const reviewHighlightCards = [
  {
    id: 'review-highlight-counter',
    title: 'Looks beautiful on the counter',
    copy: 'The finish feels premium, the presets are easy to use, and it heats quickly every morning.',
    date: '10/10/2025',
  },
  {
    id: 'review-highlight-precise',
    title: 'Fast, quiet, and precise',
    copy: 'The water reaches temperature quickly, and the controls make my coffee and tea routine feel effortless.',
    date: '09/28/2025',
  },
  {
    id: 'review-highlight-tea',
    title: 'Tea tastes better now',
    copy: 'The varietal presets are genuinely useful. Green tea is smoother and French press tastes more balanced.',
    date: '09/14/2025',
  },
  {
    id: 'review-highlight-warm',
    title: 'Keep warm is perfect',
    copy: 'I can pour a second cup without reheating, and the soft lid makes the whole experience feel considered.',
    date: '08/31/2025',
  },
];

const includedHighlightCards = [
  {
    label: 'Kettle Body',
    image: '/assets/images/update-2-included-kettle-body.png',
    nodeId: '10582:40003',
    labelNodeId: '10582:40002',
  },
  {
    label: 'Kettle Base',
    image: '/assets/images/update-2-included-kettle-base.png',
    nodeId: '10583:40010',
    labelNodeId: '10583:40011',
  },
  {
    label: 'Manual and Warranty Card',
    image: '/assets/images/update-2-included-manual-warranty.png',
    nodeId: '10583:40012',
    labelNodeId: '10583:40013',
  },
];

const techSpecRows = [
  ['Dimensions (WxDxH)', '7.1" x 9.6" x 9.9"'],
  ['Material', 'Brushed Stainless Steel'],
  ['Capacity', '57 oz. / 1.7 liter / 7 Cup Capacity'],
  ['Power', '1500 Watts'],
  ['Voltage', '110-120 Volts'],
];

const faqRows = [
  {
    question: 'Which preset should I use for different tea and coffee styles?',
    answer: 'Use the dedicated Black, Green, White, Oolong, French Press, and Boil settings to heat water to the ideal temperature for each drink. The kettle handles the temperature target, so your brew starts from a more consistent place.',
  },
  {
    question: 'How long does the Keep Warm setting maintain temperature?',
    answer: 'The Keep Warm button maintains heated water for up to 20 minutes. It can be activated before, during, or after the heating cycle, which makes second pours easier without restarting the kettle.',
  },
  {
    question: 'What is the best way to care for the kettle?',
    answer: 'Let the kettle cool before cleaning, wipe the exterior with a soft damp cloth, and descale the interior regularly based on your water hardness. Keep the power base dry and never immerse it in water.',
  },
];

const mobileFaqRows = [
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

const colorSelectorOptions = [
  'Brushed Stainless Steel',
  'Black Truffle',
  'Sea Salt',
  'Damson Blue',
  'Almond Nougat',
  'Olive Tapenade',
  'Noir',
  'Damson Blue Brass',
  'Sea Salt Brass',
  'Olive Tapenade Brass',
  'Brushed Stainless Steel Brass',
  'an Aboriginal Culinary Journey',
].map((name, index) => ({
  name,
  roomImage: `/assets/images/room_wide/${name === 'Sea Salt' ? 4 : name === 'Damson Blue' ? 3 : index + 1}.jpg`,
  swatch: `/assets/images/swatches/${name}.png`,
}));

const softLidPauseFrame = 38;
const softLidEndFrame = 226;
const softLidFramePath = (frame) => (
  `/assets/sequences/features-b-straight/frame_${String(frame).padStart(4, '0')}.jpg`
);
const desktopSoftOpeningEndFrame = 300;
const desktopSoftOpeningFeatureStoryEndFrame = 94;
const desktopSoftOpeningScrubEndProgress = 0.72;
const desktopSoftOpeningCopyChangeFrame = 49;
const desktopSoftOpeningCopyChangeDuration = 28;
const desktopSoftOpeningFramePath = (frame) => (
  `/assets/sequences/soft_open_lid/lid_${String(frame).padStart(5, '0')}.jpg`
);
const desktopVarietalEndFrame = 71;
const desktopVarietalScrubEndProgress = 0.72;
const desktopVarietalFramePath = (frame) => (
  `/assets/sequences/plank_5/plank_${String(frame).padStart(5, '0')}.jpg`
);
const desktopKeepWarmEndFrame = 72;
const desktopKeepWarmScrubEndProgress = 0.72;
const desktopKeepWarmFramePath = (frame) => (
  `/assets/sequences/top_hand/top_hand_${String(frame).padStart(5, '0')}.jpg`
);
const mobileKeepWarmFramePath = (frame) => (
  `/assets/sequences/side_hand/side_hand_${String(frame).padStart(5, '0')}.jpg`
);

const desktopFeatureStoryItems = [
  {
    title: '5 Varietal Settings',
    copy: 'Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee.',
    framePath: desktopVarietalFramePath,
    endFrame: desktopVarietalEndFrame,
    scrubEndProgress: desktopVarietalScrubEndProgress,
    mediaClassName: 'blank-desktop-feature-story__media--varietal',
  },
  {
    title: 'Keep Warm Button',
    copy: 'One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on completion of the water heating cycle.',
    framePath: desktopKeepWarmFramePath,
    endFrame: desktopKeepWarmEndFrame,
    scrubEndProgress: desktopKeepWarmScrubEndProgress,
    mediaClassName: 'blank-desktop-feature-story__media--keep-warm',
  },
  {
    title: 'Soft Opening™ Lid',
    copy: 'A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases steam and eliminates splashing.',
    framePath: desktopSoftOpeningFramePath,
    endFrame: desktopSoftOpeningFeatureStoryEndFrame,
    scrubEndProgress: desktopSoftOpeningScrubEndProgress,
    mediaClassName: 'blank-desktop-feature-story__media--soft-opening',
  },
  {
    title: 'BPA Free Material',
    copy: "Dual sided, high visibility water windows make it easy to make sure you don't heat more water than you need. Made from BPA Free materials.",
    framePath: desktopSoftOpeningFramePath,
    startFrame: 95,
    endFrame: desktopSoftOpeningEndFrame,
    scrubEndProgress: desktopSoftOpeningScrubEndProgress,
    seamlessMediaFromPrevious: true,
    mediaClassName: 'blank-desktop-feature-story__media--bpa',
  },
];

const desktopFeatureWebpFramePath = (featureNumber) => {
  const filePrefix = featureNumber === 1 ? 'feature 1' : `feature_${featureNumber}`;

  return (frame) => (
    `/assets/sequences/feature_${featureNumber}_webp/${filePrefix}_${String(frame).padStart(5, '0')}.webp`
  );
};

const desktopFeatureStoryWebpItems = desktopFeatureStoryItems.map((item, index) => ({
  ...item,
  framePath: desktopFeatureWebpFramePath(index + 1),
  startFrame: 0,
  endFrame: [187, 96, 241, 169][index],
  seamlessMediaFromPrevious: false,
}));

const techSpecsExplodedEndFrame = 24;
const techSpecsExplodedStartFrame = 2;
const techSpecsExplodedFramePath = (frame) => (
  `/assets/sequences/exploded_view_1920/kettle_${String(frame).padStart(5, '0')}.jpg`
);
const mobileTechSpecsEndFrame = 71;
const mobileTechSpecsFramePath = (frame) => (
  `/assets/sequences/tech_specs/tech_specs_${String(frame).padStart(5, '0')}.jpg`
);
const desktopTechSpecsEndFrame = 71;
const desktopTechSpecsFramePath = mobileTechSpecsFramePath;
const varietalEndFrame = 79;
const varietalFramePath = (frame) => (
  `/assets/sequences/featuress a  update 1/1_${String(frame).padStart(5, '0')}.jpg`
);
const plankPauseFrame = 24;
const plankCopyChangeFrame = 25;
const plankCopyChangeDuration = 12;
const plankEndFrame = 59;
const plankFramePath = (frame) => (
  `/assets/sequences/plank%202/plank_2_${String(frame).padStart(5, '0')}.jpg`
);

function useBlankDragScroll() {
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
      }
    },
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
    onClickCapture: (event) => {
      if (drag.current.isDragging) {
        event.preventDefault();
        event.stopPropagation();
        drag.current.isDragging = false;
      }
    },
  };
}

const blankStickyHeaderTabs = [
  ['Overview', 'overview'],
  ['Features', 'features'],
  ['Specs', 'specs'],
  ['Reviews', 'reviews'],
  ['Support', 'support'],
  ['Faqs', 'faqs'],
];

function BlankStickyTrimmedText({ children }) {
  return (
    <span className="blank-product-sticky-header__trimmed-text">
      {children}
    </span>
  );
}

function BlankProductStickyHeader({ onCompareOpen }) {
  const [activeSectionId, setActiveSectionId] = useState(blankStickyHeaderTabs[0][1]);

  useEffect(() => {
    let rafId = null;

    const updateActiveSection = () => {
      rafId = null;

      const anchorY = window.scrollY + Math.min(window.innerHeight * 0.35, 420);
      const nextActiveTab = blankStickyHeaderTabs.reduce((activeTab, tab) => {
        const [, targetId] = tab;
        const target = document.getElementById(targetId);

        if (!target) {
          return activeTab;
        }

        const targetTop = target.getBoundingClientRect().top + window.scrollY;

        return targetTop <= anchorY ? tab : activeTab;
      }, blankStickyHeaderTabs[0]);

      setActiveSectionId((currentSectionId) => (
        currentSectionId === nextActiveTab[1] ? currentSectionId : nextActiveTab[1]
      ));
    };

    const requestActiveSectionUpdate = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', requestActiveSectionUpdate);
    window.addEventListener('blank:smooth-scroll', requestActiveSectionUpdate);
    window.addEventListener('hashchange', requestActiveSectionUpdate);

    return () => {
      window.removeEventListener('scroll', requestActiveSectionUpdate);
      window.removeEventListener('resize', requestActiveSectionUpdate);
      window.removeEventListener('blank:smooth-scroll', requestActiveSectionUpdate);
      window.removeEventListener('hashchange', requestActiveSectionUpdate);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleSectionLinkClick = (event, targetId) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    setActiveSectionId(targetId);

    const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 96);

    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(targetTop);
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }

    window.history.pushState(null, '', `#${targetId}`);
  };

  return (
    <div className="blank-product-sticky-header">
      <nav className="blank-product-sticky-header__nav" aria-label="Product navigation">
        <div className="blank-product-sticky-header__product">
          <p className="blank-product-sticky-header__title">the Smart Kettle&trade; Luxe</p>
          <button className="blank-product-sticky-header__compare" type="button" onClick={onCompareOpen}>
            Compare Kettles
          </button>
        </div>

        <div className="blank-product-sticky-header__tabs" aria-label="Page sections">
          {blankStickyHeaderTabs.map(([tab, targetId]) => (
            <a
              className={`blank-product-sticky-header__tab${targetId === activeSectionId ? ' is-active' : ''}`}
              href={`#${targetId}`}
              onClick={(event) => handleSectionLinkClick(event, targetId)}
              aria-current={targetId === activeSectionId ? 'page' : undefined}
              key={tab}
            >
              <BlankStickyTrimmedText>{tab}</BlankStickyTrimmedText>
            </a>
          ))}
        </div>

        <div className="blank-product-sticky-header__commerce">
          <a className="blank-product-sticky-header__shop" href="#shop">
            <BlankStickyTrimmedText>Shop now</BlankStickyTrimmedText>
          </a>
          <div className="blank-product-sticky-header__price-lockup">
            <span className="blank-product-sticky-header__price">$219.95</span>
            <img
              className="blank-product-sticky-header__stars"
              src="/assets/images/figma-sticky-nav-stars.svg"
              alt="4.5 out of 5 stars"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function BlankSurfaceBuyPill({ isVisible = false, onCompareOpen, onExpandedChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef(0);

  useEffect(() => {
    if (!isVisible) {
      window.clearTimeout(closeTimeoutRef.current);
      setIsClosing(false);
      setIsExpanded(false);
    }
  }, [isVisible]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimeoutRef.current);
  }, []);

  useEffect(() => {
    onExpandedChange?.(isExpanded && isVisible);
  }, [isExpanded, isVisible, onExpandedChange]);

  const handleExploreClick = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setIsClosing(false);
    setIsExpanded(true);
  };

  const handleExpandedLinkClick = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setIsClosing(false);
    setIsExpanded(false);
  };

  const handleCloseClick = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setIsClosing(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 260);
  };

  return (
    <aside
      className={`blank-surface-buy-pill${isVisible ? ' is-visible' : ''}${isExpanded ? ' is-expanded' : ''}${isClosing ? ' is-closing' : ''}`}
      aria-label="Purchase the Smart Kettle Luxe"
    >
      <div className="blank-surface-buy-pill__compact" aria-hidden={isExpanded || isClosing}>
        <div className="blank-surface-buy-pill__copy">
          <span>the Smart Kettle&trade; Luxe</span>
          <strong>$219.95</strong>
        </div>
        <button
          className="blank-surface-buy-pill__explore"
          type="button"
          aria-expanded={isExpanded}
          onClick={handleExploreClick}
        >
          <span>Explore</span>
        </button>
        <a className="blank-surface-buy-pill__button" href="?page=buy">
          <span>Buy</span>
        </a>
      </div>

      <div className="blank-surface-buy-pill__expanded" aria-hidden={!isExpanded}>
        <button
          className="blank-surface-buy-pill__close"
          type="button"
          aria-label="Close explore menu"
          onClick={handleCloseClick}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h2>the Smart Kettle&trade; Luxe</h2>

        <div className="blank-surface-buy-pill__menu">
          <nav className="blank-surface-buy-pill__jump" aria-label="Jump to main sections">
            <span>Jump to</span>
            {[
              ['Overview', 'overview'],
              ['Features', 'features'],
              ['Specs', 'specs'],
            ].map(([label, targetId]) => (
              <a href={`#${targetId}`} onClick={handleExpandedLinkClick} key={targetId}>
                {label}
              </a>
            ))}
          </nav>

          <nav className="blank-surface-buy-pill__jump blank-surface-buy-pill__jump--secondary" aria-label="Jump to more sections">
            <span aria-hidden="true">Jump to</span>
            {[
              ['Reviews', 'reviews'],
              ['FAQs', 'faqs'],
            ].map(([label, targetId]) => (
              <a href={`#${targetId}`} onClick={handleExpandedLinkClick} key={targetId}>
                {label}
              </a>
            ))}
          </nav>

          <div className="blank-surface-buy-pill__more">
            <span>Keep exploring</span>
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                onCompareOpen?.();
              }}
            >
              Compare kettles
            </button>
          </div>
        </div>

        <div className="blank-surface-buy-pill__product-area">
          <img
            className="blank-surface-buy-pill__product-image"
            src="/assets/images/contextual-menu-kettle.png"
            alt=""
            aria-hidden="true"
          />

          <div className="blank-surface-buy-pill__purchase-row">
            <div className="blank-surface-buy-pill__expanded-price">
              <span>$219.95</span>
              <span className="blank-surface-buy-pill__expanded-stars" aria-label="4.5 out of 5 stars">
                &#9733;&#9733;&#9733;&#9733;&#9734;
              </span>
            </div>

            <a className="blank-surface-buy-pill__expanded-buy" href="?page=buy">
              <span>Buy</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BlankPrecisionSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopPrecisionLayout = window.matchMedia('(min-width: 768px)').matches;

    const context = gsap.context(() => {
      const stage = section.querySelector('.blank-precision__stage');
      const copy = section.querySelector('.blank-precision__copy');
      const titleWords = Array.from(section.querySelectorAll('.blank-precision__title-word'));
      const copyLines = Array.from(section.querySelectorAll('.blank-precision__copy-line-inner'));
      const stickyHeader = document.querySelector('.blank-product-sticky-header');

      if (reduceMotion) {
        gsap.set([stage, copy, ...titleWords, ...copyLines], { clearProps: 'all' });
        if (stickyHeader) {
          gsap.set(stickyHeader, { autoAlpha: 1, yPercent: 0 });
        }
        return;
      }

      if (isDesktopPrecisionLayout) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: () => `+=${window.innerHeight + 40}`,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const entryDistance = window.innerHeight;
            const liftDistance = Math.min(500, entryDistance * 0.6);
            const liftAmount = 300;
            const traveled = self.progress * entryDistance;
            const releaseDistance = Math.max(1, entryDistance - liftDistance);
            const y = traveled <= liftDistance
              ? -liftAmount * (traveled / liftDistance)
              : -liftAmount * (1 - ((traveled - liftDistance) / releaseDistance));

            gsap.set(stage, { y });
          },
        });
      }

      const videoGallery = document.querySelector('.blank-gallery--placeholder');

      if (videoGallery) {
        const videoStage = videoGallery.querySelector('.blank-gallery__stage');
        const setCopyHeld = (isHeld) => {
          copy.classList.toggle('is-copy-held', isHeld);
          stage.classList.toggle('is-copy-held-stage', isHeld);
        };

        setCopyHeld(false);

        gsap.set(videoStage, {
          scale: isDesktopPrecisionLayout ? 0.5 : 1,
          transformOrigin: '50% 100%',
        });

        ScrollTrigger.create(isDesktopPrecisionLayout
          ? {
              trigger: videoGallery,
              start: 'top bottom+=340',
              end: 'top top',
              invalidateOnRefresh: true,
              onEnter: () => setCopyHeld(true),
              onEnterBack: () => setCopyHeld(true),
              onLeave: () => setCopyHeld(false),
              onLeaveBack: () => setCopyHeld(false),
              onRefresh: (self) => setCopyHeld(self.isActive),
            }
          : {
              trigger: section,
              start: 'top top',
              endTrigger: videoGallery,
              end: 'top top',
              invalidateOnRefresh: true,
              onEnter: () => setCopyHeld(true),
              onEnterBack: () => setCopyHeld(true),
              onLeave: () => setCopyHeld(false),
              onLeaveBack: () => setCopyHeld(false),
              onRefresh: (self) => setCopyHeld(self.isActive),
            });

        const updateCopyVideoFade = () => {
          const videoRect = videoGallery.getBoundingClientRect();
          const fadeStart = window.innerHeight;
          const copyHeight = copy.offsetHeight || copy.getBoundingClientRect().height;
          const stableCopyBottom = (window.innerHeight / 2) + (copyHeight / 2);
          const fadeEnd = stableCopyBottom + 28;
          const progress = gsap.utils.clamp(0, 1, (fadeStart - videoRect.top) / Math.max(1, fadeStart - fadeEnd));
          const opacity = 1 - progress;
          const videoScale = isDesktopPrecisionLayout ? gsap.utils.interpolate(0.5, 1, progress) : 1;
          const centeringProgress = isDesktopPrecisionLayout
            ? gsap.parseEase('sine.inOut')(gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.62, 1, 0, 1, progress)))
            : 0;
          const centeredY = isDesktopPrecisionLayout
            ? Math.max(0, (window.innerHeight - videoStage.offsetHeight) / 2)
            : 0;

          gsap.set(copy, { autoAlpha: opacity, overwrite: 'auto' });
          gsap.set(videoStage, {
            scale: videoScale,
            y: centeredY * centeringProgress,
            overwrite: 'auto',
          });
        };

        ScrollTrigger.create({
          trigger: videoGallery,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: updateCopyVideoFade,
          onEnter: updateCopyVideoFade,
          onLeave: updateCopyVideoFade,
          onEnterBack: updateCopyVideoFade,
          onLeaveBack: updateCopyVideoFade,
          onRefresh: updateCopyVideoFade,
        });
      }

      gsap.set(titleWords, { y: 0 });
      gsap.set(copyLines, isDesktopPrecisionLayout
        ? { autoAlpha: 0, yPercent: 112 }
        : { autoAlpha: 0, y: 18, yPercent: 0 });
      if (stickyHeader) {
        gsap.set(stickyHeader, { autoAlpha: 0, yPercent: -120 });
      }

      const revealTiming = isDesktopPrecisionLayout
        ? {
            titleStart: 0.12,
            titleDuration: 0.44,
            copyStart: 0.68,
            copyDuration: 0.3,
            copyStagger: 0.2,
            holdEnd: 1.8,
          }
        : {
            titleStart: 0.2,
            titleDuration: 0.42,
            copyStart: 0.46,
            copyDuration: 0.48,
            copyStagger: 0.07,
            holdEnd: 1.12,
          };

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isDesktopPrecisionLayout ? 0.65 : 0.85,
          invalidateOnRefresh: true,
        },
      });

      revealTimeline
        .to(titleWords, {
          y: (_index, element) => {
            const mask = element.closest('.blank-precision__title-mask');

            return -((mask?.getBoundingClientRect().height || element.getBoundingClientRect().height) + 8);
          },
          duration: revealTiming.titleDuration,
          ease: 'sine.inOut',
          stagger: 0.06,
        }, revealTiming.titleStart);

      if (isDesktopPrecisionLayout) {
        if (stickyHeader) {
          revealTimeline.to(stickyHeader, {
            autoAlpha: 1,
            yPercent: 0,
            duration: revealTiming.copyDuration,
            ease: 'sine.inOut',
          }, revealTiming.copyStart);
        }

        copyLines.forEach((line, index) => {
          revealTimeline.to(line, {
            autoAlpha: 1,
            yPercent: 0,
            duration: revealTiming.copyDuration,
            ease: 'sine.inOut',
          }, revealTiming.copyStart + (index * revealTiming.copyStagger));
        });
        revealTimeline.to({ progress: 0 }, {
          progress: 1,
          duration: Math.max(0, revealTiming.holdEnd - revealTimeline.duration()),
        }, revealTimeline.duration());
      } else {
        revealTimeline.to(copyLines, {
          autoAlpha: 1,
          y: 0,
          duration: revealTiming.copyDuration,
          ease: 'sine.inOut',
          stagger: revealTiming.copyStagger,
        }, revealTiming.copyStart);
      }
    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, []);

  return (
    <section id="overview" className="blank-precision" aria-label="Precision in every pour" ref={sectionRef}>
      <div className="blank-precision__stage">
        <h2 className="blank-precision__title" data-node-id="10177:38606">
          <span className="blank-precision__title-mask">
            <span className="blank-precision__title-word blank-precision__title-word--strong">Precision</span>
          </span>
          <span className="blank-precision__title-mask">
            <span className="blank-precision__title-word blank-precision__title-word--script">in Every Pour</span>
          </span>
        </h2>

        <div className="blank-precision__copy" data-node-id="10309:11916" data-name="Overview copy handoff">
          <p className="blank-precision__copy-line" data-node-id="10309:11918">
            <span className="blank-precision__copy-line-mask">
              <span className="blank-precision__copy-line-inner">
                <span className="blank-precision__copy-strong">7 cup capacity &mdash; </span>
                <span>The smart kettle knows the</span>
              </span>
            </span>
          </p>
          <p className="blank-precision__copy-line" data-node-id="10309:11919">
            <span className="blank-precision__copy-line-mask">
              <span className="blank-precision__copy-line-inner">
                ideal temperature to bring out optimal taste
              </span>
            </span>
          </p>
          <p className="blank-precision__copy-line" data-node-id="10309:11920">
            <span className="blank-precision__copy-line-mask">
              <span className="blank-precision__copy-line-inner">
                and quality of your favorite tea or coffee.
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankGallerySection({
  currentImage,
  showPreviousImage,
  showNextImage,
  dataName = 'Gallery',
  isPlaceholder = false,
  placeholderVideo,
} = {}) {
  const placeholderVideoRef = useRef(null);

  useEffect(() => {
    const video = placeholderVideoRef.current;

    if (!isPlaceholder || !placeholderVideo || !video) {
      return undefined;
    }

    const cleanupVideoBinding = bindResilientAutoplayVideo(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playMutedVideo(video);
          return;
        }

        video.pause();
      },
      { threshold: 0.18 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      cleanupVideoBinding();
    };
  }, [isPlaceholder, placeholderVideo]);

  return (
    <section
      className={`blank-gallery${isPlaceholder ? ' blank-gallery--placeholder' : ''}`}
      data-node-id="10382:52950"
      data-mobile-node-id="10382:52968"
      data-name={dataName}
      aria-label="Luxe design gallery"
    >
      <figure className="blank-gallery__stage">
        {isPlaceholder && placeholderVideo ? (
          <video
            className="blank-gallery__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label={placeholderVideo.label}
            ref={placeholderVideoRef}
          >
            <source media="(max-width: 767px)" src={placeholderVideo.mobile} type="video/mp4" />
            <source src={placeholderVideo.desktop} type="video/mp4" />
          </video>
        ) : null}

        {!isPlaceholder ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={currentImage.mobile} />
            <img src={currentImage.desktop} alt={currentImage.alt} />
          </picture>
        ) : null}

        {isPlaceholder ? null : (
          <div className="blank-gallery__arrows" aria-label="Gallery controls">
            <button
              className="blank-gallery__arrow blank-gallery__arrow--previous"
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous gallery image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              className="blank-gallery__arrow blank-gallery__arrow--next"
              type="button"
              onClick={showNextImage}
              aria-label="Next gallery image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </figure>
    </section>
  );
}

function BlankSoftOpeningDesktopSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileLayoutQuery = window.matchMedia('(max-width: 767px)');
    const currentCopy = section.querySelector('.blank-soft-opening-desktop__copy--current');
    const nextCopy = section.querySelector('.blank-soft-opening-desktop__copy--next');
    let currentFrame = reduceMotion ? plankEndFrame : 0;
    const images = Array.from({ length: plankEndFrame + 1 }, (_, frame) => {
      const sequenceImage = new Image();
      sequenceImage.src = plankFramePath(frame);
      return sequenceImage;
    });
    let lastReadySource = plankFramePath(0);

    images.forEach((sequenceImage) => {
      if (sequenceImage.decode) {
        sequenceImage.decode().catch(() => {});
      }
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, plankEndFrame, Math.round(frame));
      const source = plankFramePath(frameIndex);
      const bufferedImage = images[frameIndex];

      if (bufferedImage?.complete && bufferedImage.naturalWidth > 0) {
        lastReadySource = source;
      }

      if (image.getAttribute('src') !== lastReadySource) {
        image.dataset.pendingFrame = String(frameIndex);
        image.src = lastReadySource;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const updateCopy = (frame) => {
      if (!currentCopy || !nextCopy) {
        return;
      }

      const nextOpacity = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(
          plankCopyChangeFrame,
          plankCopyChangeFrame + plankCopyChangeDuration,
          0,
          1,
          frame,
        ),
      );
      const currentOpacity = 1 - nextOpacity;

      gsap.set(currentCopy, {
        opacity: currentOpacity,
      });
      gsap.set(nextCopy, {
        opacity: nextOpacity,
      });
    };

    const updateMobileLayout = () => {
      if (!mobileLayoutQuery.matches) {
        section.style.removeProperty('--blank-feature-one-copy-bottom');
        section.style.removeProperty('--blank-feature-one-image-height');
        return;
      }

      const navBar = document.querySelector('.contextual-menu__bar');
      const navHeight = navBar?.getBoundingClientRect().height || 56;
      const currentCopyHeight = currentCopy?.getBoundingClientRect().height || 0;
      const nextCopyHeight = nextCopy?.getBoundingClientRect().height || 0;
      const copyHeight = Math.max(currentCopyHeight, nextCopyHeight);
      const copyBottom = Math.round(navHeight + 40);
      const imageHeight = Math.max(180, window.innerHeight - copyBottom - copyHeight);

      section.style.setProperty('--blank-feature-one-copy-bottom', `${copyBottom}px`);
      section.style.setProperty('--blank-feature-one-image-height', `${Math.round(imageHeight)}px`);
    };

    const firstFrame = images[0];
    const handleFirstFrameLoad = () => {
      drawFrame(currentFrame);
      updateCopy(currentFrame);
      updateMobileLayout();
    };

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
      updateCopy(currentFrame);
      updateMobileLayout();
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
      updateCopy(currentFrame);
      updateMobileLayout();
    }

    window.addEventListener('resize', updateMobileLayout);

    if (reduceMotion) {
      updateCopy(currentFrame);

      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
        window.removeEventListener('resize', updateMobileLayout);
      };
    }

    const context = gsap.context(() => {
      const setProgressFrame = (progress) => {
        const clampedProgress = gsap.utils.clamp(0, 1, progress);
        const topLockProgress = gsap.utils.clamp(
          0.2,
          0.8,
          window.innerHeight / Math.max(section.offsetHeight, window.innerHeight),
        );
        const frame = clampedProgress < topLockProgress
          ? gsap.utils.mapRange(0, topLockProgress, 0, plankPauseFrame, clampedProgress)
          : gsap.utils.mapRange(topLockProgress, 1, plankPauseFrame, plankEndFrame, clampedProgress);

        drawFrame(frame);
        updateCopy(frame);
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgressFrame(self.progress),
        onRefresh: (self) => setProgressFrame(self.progress),
        onLeave: () => {
          drawFrame(plankEndFrame);
          updateCopy(plankEndFrame);
        },
        onLeaveBack: () => {
          drawFrame(0);
          updateCopy(0);
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      window.removeEventListener('resize', updateMobileLayout);
      context.revert();
    };
  }, []);

  return (
    <section
      className="blank-soft-opening-desktop"
      data-node-id="10470:21650"
      data-name="5 Varietal Settings desktop sequence"
      aria-label="5 Varietal Settings"
      ref={sectionRef}
    >
      <div className="blank-soft-opening-desktop__stage">
        <img
          className="blank-soft-opening-desktop__image"
          src={plankFramePath(0)}
          alt=""
          aria-hidden="true"
          data-frame="0"
          ref={imageRef}
        />
        <div
          className="blank-soft-opening-desktop__copy blank-soft-opening-desktop__copy--current"
          data-node-id="10470:21652"
        >
          <h2 data-node-id="10470:21653">5 Varietal Settings</h2>
          <p data-node-id="10470:21654">
            Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green,
            White or Oolong teas and French Press Coffee.
          </p>
        </div>
        <div className="blank-soft-opening-desktop__copy blank-soft-opening-desktop__copy--next">
          <h2>Keep Warm Button</h2>
          <p>
            One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on
            completion of the water heating cycle.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankVarietalSettingsSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isDesktopLayout = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktopLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const currentCopy = section.querySelector('.blank-varietal__copy--current');
    const nextCopy = section.querySelector('.blank-varietal__copy--next');
    const frameState = { frame: 0 };
    const images = Array.from({ length: varietalEndFrame + 1 }, (_, index) => {
      const sequenceImage = new Image();
      sequenceImage.src = varietalFramePath(index);
      return sequenceImage;
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, varietalEndFrame, Math.round(frame));
      const source = varietalFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.src = source;
      }

      image.dataset.frame = String(frameIndex);
    };

    const firstFrame = images[0];
    const handleFirstFrameLoad = () => drawFrame(frameState.frame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(frameState.frame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(frameState.frame);
    }

    if (!isDesktopLayout || reduceMotion) {
      if (reduceMotion) {
        drawFrame(varietalEndFrame);
        gsap.set(currentCopy, { autoAlpha: 0, y: -22 });
        gsap.set(nextCopy, { autoAlpha: 1, y: 0 });
      }

      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    const context = gsap.context(() => {
      gsap.set(currentCopy, { autoAlpha: 1, y: 0 });
      gsap.set(nextCopy, { autoAlpha: 0, y: 22 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      })
        .to(frameState, {
          frame: varietalEndFrame,
          duration: 1,
          ease: 'none',
          onUpdate: () => drawFrame(frameState.frame),
          onComplete: () => drawFrame(varietalEndFrame),
          onReverseComplete: () => drawFrame(0),
        }, 0)
        .to(image, {
          top: '-74.375%',
          duration: 1,
          ease: 'none',
        }, 0)
        .to(currentCopy, {
          autoAlpha: 0,
          y: -22,
          duration: 0.18,
          ease: 'sine.inOut',
        }, 0.46)
        .to(nextCopy, {
          autoAlpha: 1,
          y: 0,
          duration: 0.18,
          ease: 'sine.inOut',
        }, '<');
    }, section);

    ScrollTrigger.refresh();

    return () => {
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section className="blank-varietal" data-node-id="10388:53165" data-name="Features A1" ref={sectionRef}>
      <div className="blank-varietal__stage">
        <img
          className="blank-varietal__image"
          src={varietalFramePath(0)}
          alt=""
          aria-hidden="true"
          data-frame="0"
          ref={imageRef}
        />
        <div className="blank-varietal__copy blank-varietal__copy--current" data-node-id="10424:53355">
          <h2 data-node-id="10424:53356">5 Varietal Settings</h2>
          <p data-node-id="10424:53357">
            Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green,
            White or Oolong teas and French Press Coffee.
          </p>
        </div>
        <div className="blank-varietal__copy blank-varietal__copy--next" data-node-id="10424:53359">
          <h2 data-node-id="10424:53360">Keep Warm Button</h2>
          <p data-node-id="10424:53361">
            One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on
            completion of the water heating cycle.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankGalleryHeaderSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      section.classList.add('is-visible');
      return undefined;
    }

    let animationFrame = 0;
    let observer = null;

    const updateReveal = () => {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const shouldReveal = rect.top <= window.innerHeight * 0.9 && rect.bottom >= window.innerHeight * 0.1;
      const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

      section.classList.toggle('is-visible', shouldReveal);

      if (!isMobileLayout) {
        section.style.removeProperty('--blank-luxe-copy-entry-y');
      }
    };

    const requestRevealUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('is-visible', entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01,
      },
    );
    observer.observe(section);
    const intervalId = window.setInterval(updateReveal, 120);
    window.addEventListener('scroll', requestRevealUpdate, { passive: true });
    window.addEventListener('blank:smooth-scroll', requestRevealUpdate);
    window.addEventListener('resize', requestRevealUpdate);

    return () => {
      observer?.disconnect();
      window.clearInterval(intervalId);
      window.removeEventListener('scroll', requestRevealUpdate);
      window.removeEventListener('blank:smooth-scroll', requestRevealUpdate);
      window.removeEventListener('resize', requestRevealUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      className="blank-gallery-header blank-gallery-header--animated"
      data-node-id="10382:52949"
      data-mobile-node-id="10382:52945"
      data-name="Gallery Header"
      ref={sectionRef}
    >
      <div className="blank-gallery-header__copy">
        <p className="blank-gallery-header__title">
          <span className="blank-gallery-header__line-mask">
            <span className="blank-gallery-header__line-inner">Luxe Design</span>
          </span>
        </p>
        <p className="blank-gallery-header__script">
          <span className="blank-gallery-header__line-mask">
            <span className="blank-gallery-header__line-inner">Sculptural form. Premium finishes.</span>
          </span>
          <span className="blank-gallery-header__line-mask">
            <span className="blank-gallery-header__line-inner">Made to be seen, and used every day.</span>
          </span>
        </p>
      </div>
    </section>
  );
}

function BlankDesktopFeatureStory({
  items = desktopFeatureStoryItems,
  sectionId = 'features',
  className = '',
  isEnabled = true,
  shouldTransitionPage = true,
  shouldAnimateVarietalPosition = true,
} = {}) {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !isEnabled) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panels = Array.from(section.querySelectorAll('.blank-desktop-feature-story__panel'));
    const navItems = Array.from(section.querySelectorAll('.blank-desktop-feature-story__nav-item'));
    const chapterCount = items.length;
    const segmentSize = 1 / chapterCount;

    const cancelSequenceWarmups = items.map((item) => {
      if (!item.framePath) {
        warmImage(item.image);
        return () => {};
      }

      const startFrame = item.startFrame || 0;
      return warmSequenceFrames(item.framePath, startFrame, item.endFrame);
    });

    const drawFrame = (item, image, localProgress) => {
      if (!item.framePath || !image) {
        return;
      }

      const startFrame = item.startFrame || 0;
      const scrubProgress = gsap.utils.clamp(0, 1, localProgress / item.scrubEndProgress);
      const frameIndex = gsap.utils.clamp(
        startFrame,
        item.endFrame,
        Math.round(gsap.utils.interpolate(startFrame, item.endFrame, scrubProgress)),
      );
      const source = item.framePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.retryCount = '0';
        image.fetchPriority = 'high';
        image.src = source;
      }

      image.dataset.frame = String(frameIndex);
    };

    const setStoryProgress = (progress) => {
      const clampedProgress = gsap.utils.clamp(0, 1, progress);
      const activeIndex = gsap.utils.clamp(
        0,
        chapterCount - 1,
        Math.floor(clampedProgress >= 1 ? chapterCount - 1 : clampedProgress / segmentSize),
      );

      items.forEach((item, index) => {
        const panel = panels[index];
        const navItem = navItems[index];
        const start = index * segmentSize;
        const hasSeamlessMediaFromPrevious = item.seamlessMediaFromPrevious;
        const hasSeamlessMediaToNext = items[index + 1]?.seamlessMediaFromPrevious;
        const localProgress = gsap.utils.clamp(0, 1, (clampedProgress - start) / segmentSize);
        const fadeIn = index === 0 ? 1 : gsap.utils.clamp(0, 1, localProgress / 0.14);
        const fadeOut = index === chapterCount - 1 ? 1 : gsap.utils.clamp(0, 1, (1 - localProgress) / 0.14);
        const opacity = Math.min(fadeIn, fadeOut);
        const copyOpacity = opacity;
        let mediaOpacity = opacity;
        const navProgress = index < activeIndex ? 1 : index > activeIndex ? 0 : localProgress;

        if (hasSeamlessMediaToNext) {
          mediaOpacity = clampedProgress >= start && clampedProgress < start + segmentSize ? 1 : 0;
        } else if (hasSeamlessMediaFromPrevious) {
          mediaOpacity = clampedProgress >= start ? 1 : 0;
        }

        drawFrame(item, imageRefs.current[index], localProgress);

        if (panel) {
          const media = panel.querySelector('.blank-desktop-feature-story__media');
          const copy = panel.querySelector('.blank-desktop-feature-story__copy');

          panel.classList.toggle('is-active', index === activeIndex);

          gsap.set(panel, {
            autoAlpha: Math.max(copyOpacity, mediaOpacity),
            overwrite: 'auto',
          });

          gsap.set(media, {
            autoAlpha: mediaOpacity,
            overwrite: 'auto',
          });

          gsap.set(copy, {
            autoAlpha: copyOpacity,
            overwrite: 'auto',
          });
        }

        if (navItem) {
          navItem.classList.toggle('is-active', index === activeIndex);
          navItem.style.setProperty('--blank-feature-story-progress', String(navProgress));
        }
      });
    };

    setStoryProgress(reduceMotion ? 1 : 0);

    if (reduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const page = section.closest('.blank-page');
      const varietalImage = section.querySelector('.blank-desktop-feature-story__media--varietal img');

      if (shouldTransitionPage && page) {
        gsap.fromTo(
          page,
          { backgroundColor: '#ffffff' },
          {
            backgroundColor: '#efefef',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (shouldAnimateVarietalPosition && varietalImage) {
        gsap.fromTo(
          varietalImage,
          { '--blank-varietal-object-y': '0%' },
          {
            '--blank-varietal-object-y': '50%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * chapterCount * 1.35)}`,
        pin: true,
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => setStoryProgress(self.progress),
        onRefresh: (self) => setStoryProgress(self.progress),
        onLeave: () => setStoryProgress(1),
        onLeaveBack: () => setStoryProgress(0),
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      cancelSequenceWarmups.forEach((cancelWarmup) => cancelWarmup());
      context.revert();
    };
  }, [isEnabled, items, shouldAnimateVarietalPosition, shouldTransitionPage]);

  const scrollToChapter = (index) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const chapterCount = items.length;
    const scrollDistance = window.innerHeight * chapterCount * 1.35;
    const targetProgress = index / chapterCount;
    const targetTop = section.getBoundingClientRect().top + window.scrollY + (scrollDistance * targetProgress) + 4;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id={sectionId}
      className={`blank-desktop-feature-story${className ? ` ${className}` : ''}${isEnabled ? '' : ' blank-desktop-feature-story--inactive'}`}
      aria-label="Smart Kettle Luxe feature story"
      ref={sectionRef}
    >
      <div className="blank-desktop-feature-story__stage">
        {items.map((item, index) => (
          <article
            className={`blank-desktop-feature-story__panel${index === 0 ? ' is-active' : ''}`}
            aria-label={item.title}
            key={item.title}
          >
            <div className={`blank-desktop-feature-story__media ${item.mediaClassName}`}>
              <img
                src={item.framePath ? item.framePath(item.startFrame || 0) : item.image}
                alt=""
                aria-hidden="true"
                data-frame={item.framePath ? String(item.startFrame || 0) : undefined}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                onError={(event) => retrySequenceImage(event.currentTarget)}
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
              />
            </div>
            <div className="blank-desktop-feature-story__copy">
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}

        <nav className="blank-desktop-feature-story__nav" aria-label="Feature story chapters">
          {items.map((item, index) => (
            <button
              className={`blank-desktop-feature-story__nav-item${index === 0 ? ' is-active' : ''}`}
              type="button"
              onClick={() => scrollToChapter(index)}
              key={item.title}
            >
              <span className="blank-desktop-feature-story__nav-line" aria-hidden="true" />
              <span className="blank-desktop-feature-story__nav-label">
                {String(index + 1).padStart(2, '0')}. {item.title.replace('™', '')}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

function BlankDesktopKeepWarmIntro() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentFrame = reduceMotion ? desktopKeepWarmEndFrame : 0;
    const images = Array.from({ length: desktopKeepWarmEndFrame + 1 }, (_, frame) => {
      const sequenceImage = new Image();
      sequenceImage.src = desktopKeepWarmFramePath(frame);
      return sequenceImage;
    });

    images.forEach((sequenceImage) => {
      if (sequenceImage.decode) {
        sequenceImage.decode().catch(() => {});
      }
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, desktopKeepWarmEndFrame, Math.round(frame));
      const source = desktopKeepWarmFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.pendingFrame = String(frameIndex);
        image.src = source;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const firstFrame = images[currentFrame];
    const handleFirstFrameLoad = () => drawFrame(currentFrame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
    }

    if (reduceMotion) {
      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    const context = gsap.context(() => {
      const media = section.querySelector('.blank-soft-opening-intro__media');
      const setProgressFrame = (progress) => {
        const scrubProgress = gsap.utils.clamp(0, 1, progress / desktopKeepWarmScrubEndProgress);
        drawFrame(scrubProgress * desktopKeepWarmEndFrame);
      };

      if (media) {
        const setEntryPosition = (progress) => {
          const entryProgress = gsap.utils.clamp(0, 1, progress);
          const y = gsap.utils.interpolate(-(window.innerHeight * 0.5), 0, entryProgress);

          gsap.set(media, { y, overwrite: 'auto' });
        };
        const getEntryProgress = () => (
          1 - section.getBoundingClientRect().top / window.innerHeight
        );

        setEntryPosition(getEntryProgress());
        gsap.delayedCall(0, () => setEntryPosition(getEntryProgress()));

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => setEntryPosition(self.progress),
          onRefresh: () => setEntryPosition(getEntryProgress()),
          onLeave: () => setEntryPosition(1),
          onLeaveBack: () => setEntryPosition(0),
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgressFrame(self.progress),
        onRefresh: (self) => setProgressFrame(self.progress),
        onLeave: () => drawFrame(desktopKeepWarmEndFrame),
        onLeaveBack: () => drawFrame(0),
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      className="blank-soft-opening-intro"
      data-node-id="10636:41501"
      data-name="Keep Warm Button"
      aria-label="Keep Warm Button"
      ref={sectionRef}
    >
      <div className="blank-soft-opening-intro__stage">
        <div className="blank-soft-opening-intro__media" data-node-id="10641:41510" data-name="top_hand sequence">
          <img
            src={desktopKeepWarmFramePath(0)}
            alt=""
            aria-hidden="true"
            data-frame="0"
            ref={imageRef}
          />
        </div>
        <div className="blank-soft-opening-intro__copy" data-node-id="10641:41506">
          <h2 data-node-id="10641:41507">Keep Warm Button</h2>
          <p data-node-id="10641:41508">
            One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on
            completion of the water heating cycle.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankDesktopSoftOpeningIntro() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const currentCopy = section.querySelector('.blank-soft-opening-intro__copy--current');
    const nextCopy = section.querySelector('.blank-soft-opening-intro__copy--next');
    let currentFrame = reduceMotion ? desktopSoftOpeningEndFrame : 0;
    const images = Array.from({ length: desktopSoftOpeningEndFrame + 1 }, (_, frame) => {
      const sequenceImage = new Image();
      sequenceImage.src = desktopSoftOpeningFramePath(frame);
      return sequenceImage;
    });

    images.forEach((sequenceImage) => {
      if (sequenceImage.decode) {
        sequenceImage.decode().catch(() => {});
      }
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, desktopSoftOpeningEndFrame, Math.round(frame));
      const source = desktopSoftOpeningFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.pendingFrame = String(frameIndex);
        image.src = source;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const updateCopy = (frame) => {
      if (!currentCopy || !nextCopy) {
        return;
      }

      const nextOpacity = gsap.utils.clamp(
        0,
        1,
        gsap.utils.mapRange(
          desktopSoftOpeningCopyChangeFrame,
          desktopSoftOpeningCopyChangeFrame + desktopSoftOpeningCopyChangeDuration,
          0,
          1,
          frame,
        ),
      );

      gsap.set(currentCopy, { opacity: 1 - nextOpacity });
      gsap.set(nextCopy, { opacity: nextOpacity });
    };

    const firstFrame = images[currentFrame];
    const handleFirstFrameLoad = () => {
      drawFrame(currentFrame);
      updateCopy(currentFrame);
    };

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
      updateCopy(currentFrame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
      updateCopy(currentFrame);
    }

    if (reduceMotion) {
      updateCopy(currentFrame);

      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    const context = gsap.context(() => {
      const setProgressFrame = (progress) => {
        const scrubProgress = gsap.utils.clamp(0, 1, progress / desktopSoftOpeningScrubEndProgress);
        const frame = scrubProgress * desktopSoftOpeningEndFrame;
        drawFrame(frame);
        updateCopy(frame);
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgressFrame(self.progress),
        onRefresh: (self) => setProgressFrame(self.progress),
        onLeave: () => {
          drawFrame(desktopSoftOpeningEndFrame);
          updateCopy(desktopSoftOpeningEndFrame);
        },
        onLeaveBack: () => {
          drawFrame(0);
          updateCopy(0);
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      className="blank-soft-opening-intro"
      data-node-id="10636:41501"
      data-name="Soft Opening Lid"
      aria-label="Soft Opening Lid"
      ref={sectionRef}
    >
      <div className="blank-soft-opening-intro__stage">
        <div className="blank-soft-opening-intro__media" data-node-id="10641:41510" data-name="soft_open_lid sequence">
          <img
            src={desktopSoftOpeningFramePath(0)}
            alt=""
            aria-hidden="true"
            data-frame="0"
            ref={imageRef}
          />
        </div>
        <div className="blank-soft-opening-intro__copy blank-soft-opening-intro__copy--current" data-node-id="10641:41506">
          <h2 data-node-id="10641:41507">Soft Opening&trade; Lid</h2>
          <p data-node-id="10641:41508">
            A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases
            steam and eliminates splashing.
          </p>
        </div>
        <div className="blank-soft-opening-intro__copy blank-soft-opening-intro__copy--next">
          <h2>BPA Free Material</h2>
          <p>
            Dual sided, high visibility water windows make is easy to make sure you don&apos;t heat more water than you
            need. Made from BPA Free materials.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankDesktopVarietalIntro() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentFrame = reduceMotion ? desktopVarietalEndFrame : 0;
    const images = Array.from({ length: desktopVarietalEndFrame + 1 }, (_, frame) => {
      const sequenceImage = new Image();
      sequenceImage.src = desktopVarietalFramePath(frame);
      return sequenceImage;
    });

    images.forEach((sequenceImage) => {
      if (sequenceImage.decode) {
        sequenceImage.decode().catch(() => {});
      }
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, desktopVarietalEndFrame, Math.round(frame));
      const source = desktopVarietalFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.pendingFrame = String(frameIndex);
        image.src = source;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const firstFrame = images[currentFrame];
    const handleFirstFrameLoad = () => drawFrame(currentFrame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
    }

    if (reduceMotion) {
      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    const context = gsap.context(() => {
      const media = section.querySelector('.blank-varietal-intro__media');
      const setProgressFrame = (progress) => {
        const scrubProgress = gsap.utils.clamp(0, 1, progress / desktopVarietalScrubEndProgress);
        drawFrame(scrubProgress * desktopVarietalEndFrame);
      };

      if (media) {
        const setEntryPosition = (progress) => {
          const entryProgress = gsap.utils.clamp(0, 1, progress);
          const y = gsap.utils.interpolate(window.innerHeight * 0.55, 0, entryProgress);

          gsap.set(media, { y, overwrite: 'auto' });
        };
        const getEntryProgress = () => (
          1 - section.getBoundingClientRect().top / window.innerHeight
        );

        setEntryPosition(getEntryProgress());
        gsap.delayedCall(0, () => setEntryPosition(getEntryProgress()));

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setEntryPosition(self.progress),
          onRefresh: () => setEntryPosition(getEntryProgress()),
          onLeave: () => setEntryPosition(1),
          onLeaveBack: () => setEntryPosition(0),
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
        pin: true,
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgressFrame(self.progress),
        onRefresh: (self) => setProgressFrame(self.progress),
        onLeave: () => drawFrame(desktopVarietalEndFrame),
        onLeaveBack: () => drawFrame(0),
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      className="blank-varietal-intro"
      data-node-id="10645:1139"
      data-name="5 varital settings"
      aria-label="5 Varietal Settings"
      ref={sectionRef}
    >
      <div className="blank-varietal-intro__stage">
        <div className="blank-varietal-intro__media" data-node-id="10645:1144" data-name="plank_4 sequence">
          <img
            src={desktopVarietalFramePath(0)}
            alt=""
            aria-hidden="true"
            data-frame="0"
            ref={imageRef}
          />
        </div>
        <div className="blank-varietal-intro__copy" data-node-id="10645:1141">
          <h2 data-node-id="10645:1142">5 Varietal Settings</h2>
          <p data-node-id="10645:1143">
            Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green,
            White or Oolong teas and French Press Coffee.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankMobileFeatureStory({
  items = desktopFeatureStoryWebpItems,
  sectionId = 'features-mobile-story',
  className = '',
  isEnabled = true,
} = {}) {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !isEnabled) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (!isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panels = Array.from(section.querySelectorAll('.blank-mobile-feature-story__panel'));
    const navItems = Array.from(section.querySelectorAll('.blank-mobile-feature-story__nav-item'));
    const chapterCount = items.length;
    const segmentSize = 1 / chapterCount;

    const cancelSequenceWarmups = items.map((item) => {
      if (!item.framePath) {
        warmImage(item.image);
        return () => {};
      }

      const startFrame = item.startFrame || 0;
      return warmSequenceFrames(item.framePath, startFrame, item.endFrame, 48);
    });

    const drawFrame = (item, image, localProgress) => {
      if (!item.framePath || !image) {
        return;
      }

      const startFrame = item.startFrame || 0;
      const scrubProgress = gsap.utils.clamp(0, 1, localProgress / item.scrubEndProgress);
      const frameIndex = gsap.utils.clamp(
        startFrame,
        item.endFrame,
        Math.round(gsap.utils.interpolate(startFrame, item.endFrame, scrubProgress)),
      );
      const source = item.framePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.retryCount = '0';
        image.fetchPriority = 'high';
        image.src = source;
      }

      image.dataset.frame = String(frameIndex);
    };

    const setStoryProgress = (progress) => {
      const clampedProgress = gsap.utils.clamp(0, 1, progress);
      const activeIndex = gsap.utils.clamp(
        0,
        chapterCount - 1,
        Math.floor(clampedProgress >= 1 ? chapterCount - 1 : clampedProgress / segmentSize),
      );

      items.forEach((item, index) => {
        const panel = panels[index];
        const navItem = navItems[index];
        const start = index * segmentSize;
        const localProgress = gsap.utils.clamp(0, 1, (clampedProgress - start) / segmentSize);
        const fadeIn = index === 0 ? 1 : gsap.utils.clamp(0, 1, localProgress / 0.16);
        const fadeOut = index === chapterCount - 1 ? 1 : gsap.utils.clamp(0, 1, (1 - localProgress) / 0.16);
        const opacity = Math.min(fadeIn, fadeOut);
        const navProgress = index < activeIndex ? 1 : index > activeIndex ? 0 : localProgress;

        drawFrame(item, imageRefs.current[index], localProgress);

        if (panel) {
          panel.classList.toggle('is-active', index === activeIndex);
          gsap.set(panel, {
            autoAlpha: opacity,
            overwrite: 'auto',
          });
        }

        if (navItem) {
          navItem.classList.toggle('is-active', index === activeIndex);
          navItem.style.setProperty('--blank-mobile-feature-story-progress', String(navProgress));
        }
      });
    };

    setStoryProgress(reduceMotion ? 1 : 0);

    if (reduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * chapterCount * 1.45)}`,
        pin: true,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => setStoryProgress(self.progress),
        onRefresh: (self) => setStoryProgress(self.progress),
        onLeave: () => setStoryProgress(1),
        onLeaveBack: () => setStoryProgress(0),
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      cancelSequenceWarmups.forEach((cancelWarmup) => cancelWarmup());
      context.revert();
    };
  }, [isEnabled, items]);

  const scrollToChapter = (index) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const chapterCount = items.length;
    const scrollDistance = window.innerHeight * chapterCount * 1.45;
    const targetProgress = index / chapterCount;
    const targetTop = section.getBoundingClientRect().top + window.scrollY + (scrollDistance * targetProgress) + 4;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id={sectionId}
      className={`blank-mobile-feature-story${className ? ` ${className}` : ''}${isEnabled ? '' : ' blank-mobile-feature-story--inactive'}`}
      aria-label="Mobile Smart Kettle Luxe feature story"
      ref={sectionRef}
    >
      <div className="blank-mobile-feature-story__stage">
        {items.map((item, index) => (
          <article
            className={`blank-mobile-feature-story__panel${index === 0 ? ' is-active' : ''}`}
            aria-label={item.title}
            key={item.title}
          >
            <div className={`blank-mobile-feature-story__media ${item.mediaClassName || ''}`}>
              <img
                src={item.framePath ? item.framePath(item.startFrame || 0) : item.image}
                alt=""
                aria-hidden="true"
                data-frame={item.framePath ? String(item.startFrame || 0) : undefined}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                onError={(event) => retrySequenceImage(event.currentTarget)}
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
              />
            </div>
            <div className="blank-mobile-feature-story__copy">
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}

        <nav className="blank-mobile-feature-story__nav" aria-label="Mobile feature story chapters">
          {items.map((item, index) => (
            <button
              className={`blank-mobile-feature-story__nav-item${index === 0 ? ' is-active' : ''}`}
              type="button"
              onClick={() => scrollToChapter(index)}
              key={item.title}
              aria-label={`Jump to ${item.title}`}
            >
              <span className="blank-mobile-feature-story__nav-line" aria-hidden="true" />
              <span className="blank-mobile-feature-story__nav-label">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

function BlankMobileSequenceFeature({
  title,
  copy,
  framePath,
  endFrame,
  scrubEndProgress = 0.78,
  sequenceName,
  className = '',
  parallaxIntroOffset = 0,
  fadeCopyNearEnd = false,
  entryOffsetAmount = 0,
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (!isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentFrame = reduceMotion ? endFrame : 0;
    const cancelSequenceWarmup = warmSequenceFrames(framePath, 0, endFrame, 48);

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, endFrame, Math.round(frame));
      const source = framePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.pendingFrame = String(frameIndex);
        image.dataset.retryCount = '0';
        image.fetchPriority = 'high';
        image.src = source;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const firstFrame = warmImage(framePath(currentFrame), 'high');
    const handleFirstFrameLoad = () => drawFrame(currentFrame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
    }

    if (reduceMotion) {
      return () => {
        cancelSequenceWarmup();
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    let removeCopyExit = null;
    let removeEntryOffset = null;

    const context = gsap.context(() => {
      const media = section.querySelector('.blank-mobile-sequence-feature__media');
      const copyBlock = section.querySelector('.blank-mobile-sequence-feature__copy');
      let setParallaxIntroProgress = null;
      const setProgressFrame = (progress) => {
        const scrubProgress = gsap.utils.clamp(0, 1, progress / scrubEndProgress);
        drawFrame(scrubProgress * endFrame);
      };
      const setCopyExitProgress = (progress) => {
        if (!fadeCopyNearEnd || !copyBlock) {
          return;
        }

        const exitProgress = gsap.parseEase('sine.inOut')(gsap.utils.clamp(0, 1, progress));

        gsap.set(copyBlock, {
          autoAlpha: 1 - exitProgress,
          y: gsap.utils.interpolate(0, -14, exitProgress),
          overwrite: 'auto',
        });
      };

      setCopyExitProgress(0);

      if (entryOffsetAmount && media && copyBlock) {
        let entryOffsetFrame = 0;
        const updateEntryOffset = () => {
          entryOffsetFrame = 0;
          const sectionTop = section.getBoundingClientRect().top;
          const entryProgress = gsap.utils.clamp(0, 1, 1 - (sectionTop / window.innerHeight));
          const y = gsap.utils.interpolate(entryOffsetAmount, 0, entryProgress);

          section.style.setProperty('--blank-mobile-sequence-entry-y', `${Math.round(y)}px`);
        };
        const requestEntryOffsetUpdate = () => {
          if (entryOffsetFrame) {
            return;
          }

          entryOffsetFrame = window.requestAnimationFrame(updateEntryOffset);
        };

        window.addEventListener('scroll', requestEntryOffsetUpdate, { passive: true });
        window.addEventListener('resize', requestEntryOffsetUpdate);
        ScrollTrigger.addEventListener('refresh', requestEntryOffsetUpdate);
        requestEntryOffsetUpdate();
        removeEntryOffset = () => {
          window.removeEventListener('scroll', requestEntryOffsetUpdate);
          window.removeEventListener('resize', requestEntryOffsetUpdate);
          ScrollTrigger.removeEventListener('refresh', requestEntryOffsetUpdate);

          if (entryOffsetFrame) {
            window.cancelAnimationFrame(entryOffsetFrame);
          }

          section.style.removeProperty('--blank-mobile-sequence-entry-y');
        };
      }

      if (fadeCopyNearEnd && copyBlock) {
        let copyExitFrame = 0;
        const updateCopyExitFromContainer = () => {
          copyExitFrame = 0;
          const sectionRect = section.getBoundingClientRect();
          const isExiting = sectionRect.top <= 0 && sectionRect.bottom < window.innerHeight;
          const exitDistance = window.innerHeight * 0.7;
          const progress = isExiting
            ? gsap.utils.clamp(0, 1, (window.innerHeight - sectionRect.bottom) / exitDistance)
            : 0;

          setCopyExitProgress(progress);
        };
        const requestCopyExitUpdate = () => {
          if (copyExitFrame) {
            return;
          }

          copyExitFrame = window.requestAnimationFrame(updateCopyExitFromContainer);
        };

        window.addEventListener('scroll', requestCopyExitUpdate, { passive: true });
        window.addEventListener('resize', requestCopyExitUpdate);
        ScrollTrigger.addEventListener('refresh', requestCopyExitUpdate);
        requestCopyExitUpdate();
        removeCopyExit = () => {
          window.removeEventListener('scroll', requestCopyExitUpdate);
          window.removeEventListener('resize', requestCopyExitUpdate);
          ScrollTrigger.removeEventListener('refresh', requestCopyExitUpdate);

          if (copyExitFrame) {
            window.cancelAnimationFrame(copyExitFrame);
          }
        };
      }

      if (media && parallaxIntroOffset) {
        setParallaxIntroProgress = (progress) => {
          const y = gsap.utils.interpolate(window.innerHeight * parallaxIntroOffset, 0, progress);

          gsap.set(media, { y, overwrite: 'auto' });
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          invalidateOnRefresh: true,
          onUpdate: (self) => setParallaxIntroProgress(self.progress),
          onRefresh: (self) => setParallaxIntroProgress(self.progress),
          onLeave: () => setParallaxIntroProgress(1),
          onEnterBack: (self) => setParallaxIntroProgress(self.progress),
          onLeaveBack: () => setParallaxIntroProgress(0),
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
        pin: true,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onEnter: () => setParallaxIntroProgress?.(1),
        onUpdate: (self) => {
          setParallaxIntroProgress?.(1);
          setProgressFrame(self.progress);
        },
        onRefresh: (self) => {
          if (self.isActive) {
            setParallaxIntroProgress?.(1);
          }

          setProgressFrame(self.progress);
        },
        onLeave: () => {
          setParallaxIntroProgress?.(1);
          drawFrame(endFrame);
        },
        onLeaveBack: () => {
          setCopyExitProgress(0);
          drawFrame(0);
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      cancelSequenceWarmup();
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      removeEntryOffset?.();
      removeCopyExit?.();
      context.revert();
    };
  }, [endFrame, entryOffsetAmount, fadeCopyNearEnd, framePath, parallaxIntroOffset, scrubEndProgress]);

  return (
    <section
      className={`blank-mobile-sequence-feature${className ? ` ${className}` : ''}`}
      data-name={sequenceName}
      aria-label={title}
      ref={sectionRef}
    >
      <div className="blank-mobile-sequence-feature__stage">
        <div className="blank-mobile-sequence-feature__media" data-name={`${sequenceName} sequence`}>
          <img
            src={framePath(0)}
            alt=""
            aria-hidden="true"
            data-frame="0"
            decoding="async"
            fetchPriority="high"
            onError={(event) => retrySequenceImage(event.currentTarget)}
            ref={imageRef}
          />
        </div>
        <div className="blank-mobile-sequence-feature__copy">
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
      </div>
    </section>
  );
}

function BlankSoftLidSection({
  className = '',
  desktopOnly = false,
  fillImageHeight = false,
  mobileOnly = false,
} = {}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileFeatureLayout = window.matchMedia('(max-width: 767px)').matches;

    if (desktopOnly && isMobileFeatureLayout) {
      return undefined;
    }

    if (mobileOnly && !isMobileFeatureLayout) {
      return undefined;
    }

    const currentCopy = section.querySelector('.blank-soft-lid__copy--current');
    const nextCopy = section.querySelector('.blank-soft-lid__copy--next');
    const frameState = { frame: isMobileFeatureLayout ? 0 : 1 };
    const images = Array.from({ length: softLidEndFrame }, (_, index) => {
      const frame = index + 1;
      const sequenceImage = new Image();
      sequenceImage.src = softLidFramePath(frame);
      return sequenceImage;
    });

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, softLidEndFrame, Math.round(frame));
      const source = softLidFramePath(Math.max(1, frameIndex));

      if (image.getAttribute('src') !== source) {
        image.src = source;
      }

      image.dataset.frame = String(frameIndex);
    };

    const updateMobileBpaCopyTop = () => {
      if (!isMobileFeatureLayout || !nextCopy) {
        return;
      }

      const navBar = document.querySelector('.contextual-menu__bar');
      const navTop = navBar?.getBoundingClientRect().top ?? (window.innerHeight - 20);
      const copyHeight = nextCopy.getBoundingClientRect().height;
      const finalFrameTop = (window.innerHeight / 2) - 295.5 - 431;
      const visualShadowBottom = finalFrameTop + (862 * 0.81);
      const availableSpace = navTop - visualShadowBottom;
      const centeredTop = visualShadowBottom + ((availableSpace - copyHeight) / 2);
      const top = Math.min(
        navTop - copyHeight,
        Math.max(visualShadowBottom + 250, centeredTop + 180),
      );

      section.style.setProperty('--blank-soft-bpa-copy-top', `${Math.round(top)}px`);
    };

    const firstFrame = images[0];
    const handleFirstFrameLoad = () => drawFrame(frameState.frame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(frameState.frame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(frameState.frame);
    }

    if (reduceMotion) {
      drawFrame(softLidEndFrame);
      gsap.set(currentCopy, { autoAlpha: 0, y: -22 });
      gsap.set(nextCopy, { autoAlpha: 1, y: 0 });

      return () => {
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    let removeMobileEntrySync = null;

    const context = gsap.context(() => {
      updateMobileBpaCopyTop();
      gsap.set(currentCopy, { autoAlpha: 1, y: 0 });
      gsap.set(nextCopy, { autoAlpha: 0, y: 22 });
      gsap.set(image, { transformOrigin: '50% 0%', scale: 1 });

      if (isMobileFeatureLayout) {
        const getMobileEntryOffset = () => {
          const sectionTop = section.getBoundingClientRect().top;
          const entryProgress = gsap.utils.clamp(0, 1, 1 - (sectionTop / window.innerHeight));

          return gsap.utils.interpolate(Math.min(280, window.innerHeight * 0.32), 0, entryProgress);
        };
        const updateMobileSoftLid = (progress, entryOffset = getMobileEntryOffset()) => {
          const introFrameProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.16, 0, 1, progress));
          const imageLiftProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.16, 0.32, 0, 1, progress));
          const currentCopyExitProgress = gsap.parseEase('sine.inOut')(imageLiftProgress);
          const firstScrubProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.32, 0.54, 0, 1, progress));
          const copyProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.56, 0.64, 0, 1, progress));
          const finalScrubProgress = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.64, 0.82, 0, 1, progress));
          const frame = progress < 0.16
            ? gsap.utils.interpolate(0, 39, introFrameProgress)
            : progress < 0.32
              ? 39
            : progress < 0.64
              ? gsap.utils.interpolate(39, 128, firstScrubProgress)
            : gsap.utils.interpolate(128, softLidEndFrame, finalScrubProgress);

          drawFrame(frame);
          gsap.set(image, {
            top: gsap.utils.interpolate(208, 0, imageLiftProgress) + entryOffset,
            left: '50%',
            width: gsap.utils.interpolate(862, 746, imageLiftProgress),
            height: gsap.utils.interpolate(862, 745, imageLiftProgress),
            xPercent: -50,
            yPercent: 0,
            overwrite: 'auto',
          });
          gsap.set(currentCopy, {
            autoAlpha: (1 - currentCopyExitProgress) * (1 - copyProgress),
            y: gsap.utils.interpolate(0, -140, currentCopyExitProgress)
              + gsap.utils.interpolate(0, -22, copyProgress)
              + entryOffset,
            overwrite: 'auto',
          });
          gsap.set(nextCopy, {
            autoAlpha: copyProgress,
            y: gsap.utils.interpolate(22, 0, copyProgress),
            overwrite: 'auto',
          });
        };

        updateMobileSoftLid(0);

        let entrySyncFrame = 0;
        const syncMobileEntryState = () => {
          entrySyncFrame = 0;
          const sectionRect = section.getBoundingClientRect();
          const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
          const progress = sectionRect.top >= 0
            ? 0
            : gsap.utils.clamp(0, 1, -sectionRect.top / scrollDistance);

          updateMobileSoftLid(progress);
        };
        const requestMobileEntrySync = () => {
          if (entrySyncFrame) {
            return;
          }

          entrySyncFrame = window.requestAnimationFrame(syncMobileEntryState);
        };

        window.addEventListener('scroll', requestMobileEntrySync, { passive: true });
        window.addEventListener('resize', requestMobileEntrySync);
        syncMobileEntryState();
        removeMobileEntrySync = () => {
          window.removeEventListener('scroll', requestMobileEntrySync);
          window.removeEventListener('resize', requestMobileEntrySync);

          if (entrySyncFrame) {
            window.cancelAnimationFrame(entrySyncFrame);
          }
        };

        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      const desktopFrameStart = 38;
      const desktopFrameEnd = softLidEndFrame;
      const desktopFrameTweenStart = 0.6;
      const desktopFrameTweenDuration = 0.4;
      const desktopScaleStartFrame = 72;
      const desktopScaleStart = desktopFrameTweenStart
        + (desktopFrameTweenDuration * ((desktopScaleStartFrame - desktopFrameStart) / (desktopFrameEnd - desktopFrameStart)));

      timeline
        .to(frameState, {
          frame: softLidPauseFrame,
          duration: 0.34,
          ease: 'none',
          onUpdate: () => drawFrame(frameState.frame),
        })
        .to({}, { duration: 0.16 })
        .to(currentCopy, {
          autoAlpha: 0,
          y: -22,
          duration: 0.1,
          ease: 'sine.inOut',
        })
        .to(nextCopy, {
          autoAlpha: 1,
          y: 0,
          duration: 0.1,
          ease: 'sine.inOut',
        }, '<')
        .to(frameState, {
          frame: softLidEndFrame,
          duration: 0.4,
          ease: 'none',
          onUpdate: () => drawFrame(frameState.frame),
        });

      if (!fillImageHeight) {
        timeline.to(image, {
          scale: () => {
            const stageHeight = section.querySelector('.blank-soft-lid__stage')?.clientHeight || window.innerHeight;
            const imageHeight = image.offsetHeight || image.getBoundingClientRect().height || stageHeight;

            return Math.min(1, stageHeight / imageHeight);
          },
          duration: Math.max(0, 1 - desktopScaleStart),
          ease: 'none',
        }, desktopScaleStart);
      }
    }, section);

    ScrollTrigger.refresh();
    window.addEventListener('resize', updateMobileBpaCopyTop);
    ScrollTrigger.addEventListener('refresh', updateMobileBpaCopyTop);

    return () => {
      window.removeEventListener('resize', updateMobileBpaCopyTop);
      ScrollTrigger.removeEventListener('refresh', updateMobileBpaCopyTop);
      removeMobileEntrySync?.();
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      className={`blank-soft-lid${desktopOnly ? ' blank-soft-lid--desktop-only' : ''}${mobileOnly ? ' blank-soft-lid--mobile-only' : ''}${fillImageHeight ? ' blank-soft-lid--fill-height' : ''}${className ? ` ${className}` : ''}`}
      data-node-id="10353:32557"
      data-name="Features A 16"
      ref={sectionRef}
    >
      <div className="blank-soft-lid__stage">
        <img
          className="blank-soft-lid__image"
          src={softLidFramePath(1)}
          alt=""
          aria-hidden="true"
          data-frame="0"
          ref={imageRef}
        />
        <div className="blank-soft-lid__copy blank-soft-lid__copy--current" data-node-id="10385:53163">
          <h2 data-node-id="10385:53157">Soft Opening&trade; Lid</h2>
          <p data-node-id="10385:53158">
            A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases
            steam and eliminates splashing.
          </p>
        </div>
        <div className="blank-soft-lid__copy blank-soft-lid__copy--next">
          <h2>BPA Free Material</h2>
          <p>
            Dual sided, high visibility water windows make it easy to make sure you don't heat more water than you need.
            Made from BPA Free materials.
          </p>
        </div>
      </div>
    </section>
  );
}

function BlankDebugPanel() {
  const progressRef = useRef(null);
  const scrollRef = useRef(null);
  const frameRef = useRef(null);
  const featureOneFrameRef = useRef(null);
  const videoRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const page = document.querySelector('.blank-page');

    if (!page) {
      return undefined;
    }

    const updatePanel = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / maxScroll;
      const softLidFrame = document.querySelector('.blank-soft-lid__image')?.dataset.frame || '1';
      const featureOneFrame = document.querySelector('.blank-soft-opening-desktop__image')?.dataset.frame || '0';
      const warmVideo = document.querySelector('.blank-gallery--placeholder .blank-gallery__video');

      if (progressRef.current) {
        progressRef.current.textContent = `${(progress * 100).toFixed(1)}%`;
      }

      if (scrollRef.current) {
        scrollRef.current.textContent = `${Math.round(window.scrollY)}px`;
      }

      if (frameRef.current) {
        frameRef.current.textContent = `B ${softLidFrame}`;
      }

      if (featureOneFrameRef.current) {
        featureOneFrameRef.current.textContent = `F1 ${featureOneFrame}`;
      }

      if (videoRef.current) {
        videoRef.current.textContent = warmVideo
          ? `${warmVideo.paused ? 'paused' : 'playing'} ${warmVideo.currentTime.toFixed(1)}s`
          : 'missing';
      }

      if (viewportRef.current) {
        viewportRef.current.textContent = `${window.innerWidth} x ${window.innerHeight}`;
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: page,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updatePanel,
    });

    gsap.ticker.add(updatePanel);
    updatePanel();

    return () => {
      gsap.ticker.remove(updatePanel);
      trigger.kill();
    };
  }, []);

  return (
    <aside className="testing-debug motion-timeline-panel blank-debug-panel" aria-label="Blank page debug panel">
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Blank</span>
        <output ref={progressRef} className="testing-debug__value">
          0.0%
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Frame</span>
        <output ref={frameRef} className="testing-debug__value">
          B 1
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Feature 1</span>
        <output ref={featureOneFrameRef} className="testing-debug__value">
          F1 0
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Video</span>
        <output ref={videoRef} className="testing-debug__value">
          pending
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Scroll</span>
        <output ref={scrollRef} className="testing-debug__value">
          0px
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Viewport</span>
        <output ref={viewportRef} className="testing-debug__value">
          0 x 0
        </output>
      </div>
    </aside>
  );
}

function BlankExperimentPanel({
  isOpen,
  featureDesignMode,
  isContentWidthCapped,
  onFeatureDesignModeChange,
  onContentWidthCappedChange,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const featureOptions = [
    ['original', 'Original'],
    ['webp', 'New webp'],
    ['both', 'Both'],
  ];

  return (
    <aside className="blank-experiment-panel" aria-label="Update 3 debug panel">
      <div className="blank-experiment-panel__header">
        <p>Debug</p>
        <button type="button" onClick={onClose} aria-label="Close debug panel">
          Close
        </button>
      </div>

      <div className="blank-experiment-panel__group">
        <span className="blank-experiment-panel__label">Features</span>
        <div className="blank-experiment-panel__segmented" role="group" aria-label="Feature design">
          {featureOptions.map(([value, label]) => (
            <button
              className={featureDesignMode === value ? 'is-active' : ''}
              type="button"
              onClick={() => onFeatureDesignModeChange(value)}
              key={value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <label className="blank-experiment-panel__toggle">
        <input
          type="checkbox"
          checked={isContentWidthCapped}
          onChange={(event) => onContentWidthCappedChange(event.target.checked)}
        />
        <span>Cap lower sections to room image width</span>
      </label>
    </aside>
  );
}

function BlankDesktopReviewHighlights() {
  return (
    <section
      id="reviews"
      className="blank-review-highlights"
      data-node-id="10622:40572"
      data-name="Review Highlights"
      aria-label="Review Highlights"
    >
      <header className="blank-review-highlights__header" data-node-id="10622:40573">
        <h2 data-node-id="10622:40574">Review Highlights</h2>
      </header>

      <div className="blank-review-highlights__divider" data-node-id="10622:40580" />

      <div className="blank-review-highlights__summary" data-node-id="10622:40581">
        <div className="blank-review-highlights__score" data-node-id="10622:40582">
          <strong data-node-id="10622:40583">4.5</strong>
          <div className="blank-review-highlights__score-copy" data-node-id="10622:40584">
            <p data-node-id="10622:40585">
              <img className="blank-review-highlights__stars" src="/assets/images/review-stars.svg" alt="" aria-hidden="true" />
              <span data-node-id="10622:40592">190 review</span>
            </p>
            <p data-node-id="10622:40593">135 out 166 (81%) reviewers recommended this product</p>
          </div>
        </div>

        <div className="blank-review-highlights__rating-list" data-node-id="10622:40594">
          {reviewHighlightRows.map(([label, count], index) => (
            <div className="blank-review-highlights__rating-row" key={label}>
              <span data-node-id={`10622:${40596 + index}`}>{label}</span>
              <div className="blank-review-highlights__meter-holder" data-node-id={`10622:${40602 + (index * 4)}`}>
                <div className="blank-review-highlights__meter" data-node-id={`10622:${40603 + (index * 4)}`}>
                  <span
                    style={{ width: `${(Number(count) / reviewHighlightMaxCount) * 100}%` }}
                    data-node-id={`10622:${40604 + (index * 4)}`}
                  />
                </div>
              </div>
              <span data-node-id={`10622:${40623 + index}`}>{String(count).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="blank-review-highlights__divider" data-node-id="10622:40628" />

      <header className="blank-review-highlights__header blank-review-highlights__header--customers" data-node-id="10622:40629">
        <h2 data-node-id="10622:40630">From our Customers</h2>
        <button className="blank-review-highlights__button" type="button" data-node-id="10622:40631">
          See all reviews
        </button>
      </header>

      <div className="blank-review-highlights__cards" data-node-id="10622:40633">
        {reviewHighlightCards.map((review, index) => (
          <article className="blank-review-highlights__card" key={review.id} data-node-id={`10622:${40634 + (index * 14)}`}>
            <div className="blank-review-highlights__card-top">
              <img className="blank-review-highlights__stars" src="/assets/images/review-stars.svg" alt="" aria-hidden="true" />
              <h3>{review.title}</h3>
            </div>
            <div className="blank-review-highlights__card-bottom">
              <p>{review.copy}</p>
              <footer>
                <strong>Verified customer</strong>
                <span>{review.date}</span>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlankDesktopWhatsIncluded() {
  return (
    <section
      className="blank-included-highlights"
      data-node-id="10581:39986"
      data-name="Tabs [Specs]"
      aria-label="What's Included"
    >
      <header className="blank-included-highlights__header" data-node-id="10581:39987">
        <h2 data-node-id="10581:39988">What&rsquo;s Included</h2>
      </header>
      <div className="blank-included-highlights__divider" aria-hidden="true" />

      <div className="blank-included-highlights__cards" data-node-id="10581:40000">
        {includedHighlightCards.map((item) => (
          <article className="blank-included-highlights__card" data-node-id={item.nodeId} key={item.label}>
            <img src={item.image} alt="" aria-hidden="true" />
            <p data-node-id={item.labelNodeId}>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlankDesktopTechSpecs() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) {
      return undefined;
    }

    const isMobileLayout = window.matchMedia('(max-width: 767px)').matches;

    if (isMobileLayout) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentFrame = desktopTechSpecsEndFrame;
    const cancelSequenceWarmup = warmSequenceFrames(desktopTechSpecsFramePath, 0, desktopTechSpecsEndFrame, 64);

    const drawFrame = (frame) => {
      const frameIndex = gsap.utils.clamp(0, desktopTechSpecsEndFrame, Math.round(frame));
      const source = desktopTechSpecsFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.pendingFrame = String(frameIndex);
        image.dataset.retryCount = '0';
        image.fetchPriority = 'high';
        image.src = source;
      }

      currentFrame = frameIndex;
      image.dataset.frame = String(frameIndex);
    };

    const firstFrame = warmImage(desktopTechSpecsFramePath(currentFrame), 'high');
    const handleFirstFrameLoad = () => drawFrame(currentFrame);

    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      drawFrame(currentFrame);
    } else {
      firstFrame.addEventListener('load', handleFirstFrameLoad, { once: true });
      drawFrame(currentFrame);
    }

    if (reduceMotion) {
      return () => {
        cancelSequenceWarmup();
        firstFrame.removeEventListener('load', handleFirstFrameLoad);
      };
    }

    const context = gsap.context(() => {
      const page = section.closest('.blank-page');
      const specsOffset = document.querySelector('.blank-tech-specs-offset');
      const transitionTargets = [page].filter(Boolean);

      if (transitionTargets.length > 0) {
        gsap.fromTo(
          transitionTargets,
          { backgroundColor: '#ffffff' },
          {
            backgroundColor: '#efefef',
            ease: 'none',
            scrollTrigger: {
              trigger: specsOffset || section,
              start: 'top bottom',
              end: specsOffset ? 'bottom bottom' : 'top bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const setPinnedProgress = (progress) => {
        const scrubProgress = gsap.utils.clamp(0, 1, progress);

        drawFrame(desktopTechSpecsEndFrame - (scrubProgress * desktopTechSpecsEndFrame));
      };
      const getPinnedScrubDistance = () => Math.max(
        window.innerHeight,
        Math.round(window.innerHeight * 1.15),
      );

      setPinnedProgress(0);

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getPinnedScrubDistance()}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => setPinnedProgress(self.progress),
        onRefresh: (self) => setPinnedProgress(self.progress),
        onLeave: () => setPinnedProgress(1),
        onLeaveBack: () => setPinnedProgress(0),
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      cancelSequenceWarmup();
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      id="specs"
      className="blank-tech-specs"
      data-node-id="10634:41302"
      data-name="Tabs [Specs]"
      aria-label="Technical Specifications"
      ref={sectionRef}
    >
      <header className="blank-tech-specs__header" data-node-id="10634:41304">
        <h2 data-node-id="10634:41305">Technical Specifications</h2>
      </header>

      <div className="blank-tech-specs__divider" data-node-id="10634:41310" />

      <div className="blank-tech-specs__layout" data-node-id="10634:41311">
        <figure className="blank-tech-specs__image-holder" data-node-id="10634:41321" aria-hidden="true">
          <img
            src={desktopTechSpecsFramePath(desktopTechSpecsEndFrame)}
            alt=""
            data-frame="0"
            decoding="async"
            fetchPriority="high"
            onError={(event) => retrySequenceImage(event.currentTarget)}
            ref={imageRef}
          />
        </figure>
        <dl className="blank-tech-specs__list" data-node-id="10634:41315">
          {techSpecRows.map(([label, value], index) => (
            <div className="blank-tech-specs__row" data-node-id={`10634:${41316 + index}`} key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function BlankDesktopColorSelector() {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const activeColor = colorSelectorOptions[activeColorIndex] || colorSelectorOptions[0];

  return (
    <section
      className="blank-color-selector"
      data-node-id="10660:1191"
      data-name="Colors"
      aria-label="Color selector"
    >
      <div className="blank-color-selector__inner" data-node-id="10660:1193">
        <figure className="blank-color-selector__hero" data-node-id="10660:1195">
          <img src={activeColor.roomImage} alt="" />
        </figure>

        <div className="blank-color-selector__swatches" data-node-id="10660:1196" aria-label="Color options">
          {colorSelectorOptions.map((color, index) => (
            <button
              className={`blank-color-selector__swatch${index === activeColorIndex ? ' is-selected' : ''}`}
              type="button"
              aria-label={color.name}
              aria-pressed={index === activeColorIndex}
              onClick={() => setActiveColorIndex(index)}
              data-node-id={`10660:${index === 0 ? 1197 : 1200 + ((index - 1) * 3)}`}
              key={color.name}
            >
              <img src={color.swatch} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>

        <p className="blank-color-selector__name" data-node-id="10660:1234">{activeColor.name}</p>
      </div>
    </section>
  );
}

function BlankMobileColorStory() {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const activeColor = colorSelectorOptions[activeColorIndex] || colorSelectorOptions[0];

  return (
    <section className="blank-mobile-color-story" aria-label="Designed to Elevate your Space">
      <h2 className="blank-mobile-color-story__title">
        <span>Designed to</span>
        <em>Elevate your Space</em>
      </h2>

      <div className="blank-mobile-color-story__display">
        <figure className="blank-mobile-color-story__image">
          <img src={activeColor.roomImage} alt="" />
        </figure>

        <div className="blank-mobile-color-story__controls">
          <div className="blank-mobile-color-story__swatches" aria-label="Color options">
            {colorSelectorOptions.map((color, index) => (
              <button
                className={`blank-mobile-color-story__swatch${index === activeColorIndex ? ' is-selected' : ''}`}
                type="button"
                aria-label={color.name}
                aria-pressed={index === activeColorIndex}
                onClick={() => setActiveColorIndex(index)}
                key={color.name}
              >
                <img src={color.swatch} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>

          <p className="blank-mobile-color-story__name">{activeColor.name}</p>
        </div>
      </div>
    </section>
  );
}

function BlankMobileTechSpecs() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image || !window.matchMedia('(max-width: 767px)').matches) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cancelSequenceWarmup = warmSequenceFrames(mobileTechSpecsFramePath, 0, mobileTechSpecsEndFrame, 40);

    const drawFrame = (nextFrame) => {
      const frameIndex = gsap.utils.wrap(0, mobileTechSpecsEndFrame + 1, Math.round(nextFrame));
      const source = mobileTechSpecsFramePath(frameIndex);

      if (image.getAttribute('src') !== source) {
        image.dataset.retryCount = '0';
        image.fetchPriority = 'high';
        image.src = source;
      }

      image.dataset.frame = String(frameIndex);
    };

    drawFrame(0);

    if (reduceMotion) {
      return () => cancelSequenceWarmup();
    }

    let animationFrame = 0;
    const updateFromScroll = () => {
      animationFrame = 0;

      const rect = section.getBoundingClientRect();
      const progress = gsap.utils.clamp(0, 1, (window.innerHeight - rect.top) / (window.innerHeight + 40));
      drawFrame(progress * mobileTechSpecsEndFrame);
    };
    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelSequenceWarmup();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className="blank-mobile-tech-specs" aria-label="Technical Specifications" ref={sectionRef}>
      <header className="blank-mobile-info-header">
        <h2>Technical Specifications</h2>
      </header>

      <div className="blank-mobile-info-divider" />

      <figure className="blank-mobile-tech-specs__image" aria-hidden="true">
        <img
          src={mobileTechSpecsFramePath(0)}
          alt=""
          data-frame="0"
          decoding="async"
          fetchPriority="high"
          onError={(event) => retrySequenceImage(event.currentTarget)}
          ref={imageRef}
        />
      </figure>

      <dl className="blank-mobile-tech-specs__list">
        {techSpecRows.map(([label, value]) => (
          <div className="blank-mobile-tech-specs__row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BlankMobileWhatsIncluded() {
  const includedDrag = useBlankDragScroll();

  return (
    <section className="blank-mobile-included" aria-label="What's Included">
      <header className="blank-mobile-info-header">
        <h2>What&rsquo;s Included</h2>
      </header>

      <div className="blank-mobile-info-divider" />

      <div className="blank-mobile-included__cards" {...includedDrag}>
        {includedHighlightCards.map((item) => (
          <article className="blank-mobile-included__card" key={item.label}>
            <figure>
              <img src={item.image} alt="" aria-hidden="true" />
            </figure>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlankMobileReviewHighlights() {
  return (
    <section className="blank-mobile-review-highlights" aria-label="Review Highlights">
      <header className="blank-mobile-info-header">
        <h2>Review Highlights</h2>
      </header>

      <div className="blank-mobile-info-divider" />

      <div className="blank-mobile-review-highlights__summary">
        <div className="blank-mobile-review-highlights__score">
          <div>
            <p>
              <img src="/assets/images/review-stars.svg" alt="" aria-hidden="true" />
              <span>190 review</span>
            </p>
            <p>135 out 166 (81%) reviewers recommended this product</p>
          </div>
          <strong>4.5</strong>
        </div>

        <div className="blank-mobile-review-highlights__rating-list">
          {reviewHighlightRows.map(([label, count]) => (
            <div className="blank-mobile-review-highlights__rating-row" key={label}>
              <span>{label}</span>
              <div className="blank-mobile-review-highlights__meter">
                <span style={{ width: `${(Number(count) / reviewHighlightMaxCount) * 100}%` }} />
              </div>
              <span>{String(count).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="blank-mobile-info-divider" />

      <header className="blank-mobile-review-highlights__customers">
        <h2>Customer reviews</h2>
      </header>

      <div className="blank-mobile-review-highlights__cards">
        {reviewHighlightCards.map((review) => (
          <article className="blank-mobile-review-highlights__card" key={review.id}>
            <div className="blank-mobile-review-highlights__card-top">
              <p className="blank-mobile-review-highlights__card-stars" aria-label="5 out of 5 stars">★★★★★</p>
              <h3>{review.title}</h3>
            </div>
            <div className="blank-mobile-review-highlights__card-bottom">
              <p>{review.copy}</p>
              <footer>
                <strong>Verified customer</strong>
                <span>{review.date}</span>
              </footer>
            </div>
          </article>
        ))}
      </div>

      <div className="blank-mobile-review-highlights__button-wrap">
        <button type="button">See all reviews</button>
      </div>
    </section>
  );
}

function BlankMobileSupportDocumentation() {
  const supportCardsDrag = useBlankDragScroll();

  return (
    <section className="blank-mobile-support-docs" data-node-id="10800:33993" aria-label="Support and Documentation">
      <header className="blank-mobile-info-header blank-mobile-support-docs__header" data-node-id="10800:33994">
        <h2 data-node-id="10800:33996">Support &amp; Documentation</h2>
        <div className="blank-mobile-info-divider" />
      </header>

      <div className="blank-mobile-support-docs__hub-wrap" data-node-id="10800:33998">
        <article className="blank-mobile-support-docs__hub" data-node-id="10800:33999">
          <figure className="blank-mobile-support-docs__hub-image" data-node-id="10800:34000">
            <img src="/assets/images/support-mobile-product-hub.png" alt="" />
          </figure>
          <div className="blank-mobile-support-docs__hub-copy" data-node-id="10800:34001">
            <h3 data-node-id="10800:34002">Product Hub</h3>
            <div className="blank-mobile-support-docs__hub-row" data-node-id="10800:34003">
              <p data-node-id="10800:34004">Download setup, cleaning, and safety guidance.</p>
              <img className="blank-mobile-support-docs__arrow" src="/assets/images/support-arrow-right.svg" alt="" aria-hidden="true" data-node-id="10800:34005" />
            </div>
          </div>
        </article>
      </div>

      <div className="blank-mobile-support-docs__cards" data-node-id="10800:34008" {...supportCardsDrag}>
        <article className="blank-mobile-support-docs__card" data-node-id="10801:34100">
          <figure className="blank-mobile-support-docs__card-image" data-node-id="10801:34101">
            <img src="/assets/images/support-mobile-user-manual.png" alt="" />
          </figure>
          <div className="blank-mobile-support-docs__card-footer" data-node-id="10801:34107">
            <h3 data-node-id="10801:34102">User Manual</h3>
            <img className="blank-mobile-support-docs__arrow" src="/assets/images/support-arrow-right.svg" alt="" aria-hidden="true" data-node-id="10801:34103" />
          </div>
        </article>
        <article className="blank-mobile-support-docs__card" data-node-id="10801:34108">
          <figure className="blank-mobile-support-docs__card-image" data-node-id="10801:34109">
            <img src="/assets/images/support-mobile-return-policies.png" alt="" />
          </figure>
          <div className="blank-mobile-support-docs__card-footer" data-node-id="10801:34110">
            <h3 data-node-id="10801:34111">Return Policies</h3>
            <img className="blank-mobile-support-docs__arrow" src="/assets/images/support-arrow-right.svg" alt="" aria-hidden="true" data-node-id="10801:34112" />
          </div>
        </article>
      </div>
    </section>
  );
}

function BlankMobileFAQ() {
  return (
    <section className="blank-mobile-faq" data-node-id="10800:34029" aria-label="FAQs">
      <header className="blank-mobile-info-header blank-mobile-faq__header" data-node-id="10800:34030">
        <h2 data-node-id="10800:34032">FAQS</h2>
        <div className="blank-mobile-info-divider" />
      </header>

      <div className="blank-mobile-faq__list" data-node-id="10800:34034">
        {mobileFaqRows.map((item, index) => (
          <article className="blank-mobile-faq__item" data-node-id={`10800:${34035 + (index * 5)}`} key={item.question}>
            <div className="blank-mobile-faq__copy">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
            {index < mobileFaqRows.length - 1 ? <div className="blank-mobile-info-divider" /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function BlankDesktopSupportDocumentation() {
  return (
    <section
      id="support"
      className="blank-support-docs"
      data-node-id="10622:40690"
      data-name="Tabs [Specs]"
      aria-label="Support and Documentation"
    >
      <header className="blank-support-docs__header" data-node-id="10622:40691">
        <h2 data-node-id="10622:40692">Support &amp; Documentation</h2>
        <span className="blank-support-docs__toggle" data-node-id="10622:40693" aria-hidden="true">
          <img src="/assets/images/support-toggle-icon.svg" alt="" />
        </span>
      </header>

      <div className="blank-support-docs__divider" data-node-id="10622:40697" />

      <div className="review-highlights-support blank-support-docs__buy-page-layout" data-node-id="10622:40698">
        <div className="review-highlights-support__cards">
          {[
            {
              title: 'Instruction Manual',
              titleLines: ['Instruction', 'Manual'],
              image: '/assets/images/review-highlights/support/instruction-manual.png',
            },
            {
              title: 'Return Policies',
              titleLines: ['Return', 'Policies'],
              image: '/assets/images/review-highlights/support/return-policies.png',
            },
          ].map((item) => (
            <button type="button" key={item.title}>
              <span>
                <span className="review-highlights-support__desktop-title">
                  {item.titleLines.map((line, index) => (
                    <React.Fragment key={line}>
                      {line}
                      {index < item.titleLines.length - 1 ? <br aria-hidden="true" /> : null}
                    </React.Fragment>
                  ))}
                </span>
              </span>
              <img className="review-highlights-support__arrow" src="/assets/images/review-highlights/support/arrow-right.svg" alt="" />
              <img className="review-highlights-support__card-image" src={item.image} alt="" />
            </button>
          ))}
        </div>

        <article className="review-highlights-support__hub">
          <img className="review-highlights-support__hub-image" src="/assets/images/review-highlights/support/product-hub.png" alt="" />
          <div>
            <span>
              <strong>Product Hub</strong>
              <p>Download setup, cleaning, and safety guidance.</p>
            </span>
            <img src="/assets/images/review-highlights/support/arrow-right.svg" alt="" />
          </div>
        </article>
      </div>
    </section>
  );
}

function BlankDesktopFAQ() {
  return (
    <section
      id="faqs"
      className="blank-faq"
      data-node-id="10622:40717"
      data-name="Tabs [Specs]"
      aria-label="Frequently Asked Questions"
    >
      <header className="blank-faq__header" data-node-id="10622:40718">
        <h2 data-node-id="10622:40719">Frequently Asked Questions</h2>
        <span className="blank-faq__toggle" data-node-id="10622:40720" aria-hidden="true">
          <span className="blank-faq__plus" data-node-id="10622:40721" />
        </span>
      </header>

      <div className="blank-faq__divider" data-node-id="10622:40724" />

      <div className="blank-faq__list">
        {faqRows.map((item, index) => (
          <React.Fragment key={item.question}>
            <article className="blank-faq__row" data-node-id={`10622:${40725 + (index * 6)}`}>
              <div className="blank-faq__question" data-node-id={`10622:${40726 + (index * 6)}`}>
                <h3 data-node-id={`10622:${40727 + (index * 6)}`}>{item.question}</h3>
              </div>
              <div className="blank-faq__answer" data-node-id={`10622:${40728 + (index * 6)}`}>
                <p data-node-id={`10622:${40729 + (index * 6)}`}>{item.answer}</p>
              </div>
            </article>
            {index < faqRows.length - 1 ? (
              <div className="blank-faq__divider" data-node-id={`10622:${40730 + (index * 6)}`} />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function BlankSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return undefined;
    }

    const root = document.documentElement;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId = 0;
    let lastStepTime = 0;
    let isProgrammaticScroll = false;
    let isStopped = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchY = 0;
    let isHorizontalTouch = false;

    const clampScroll = (value) => (
      gsap.utils.clamp(0, Math.max(0, document.documentElement.scrollHeight - window.innerHeight), value)
    );

    const getWheelPixels = (event) => {
      if (event.deltaMode === 1) {
        return event.deltaY * 16;
      }

      if (event.deltaMode === 2) {
        return event.deltaY * window.innerHeight;
      }

      return event.deltaY;
    };

    const shouldPreventSmoothScroll = (eventTarget) => {
      if (!(eventTarget instanceof Element)) {
        return false;
      }

      return Boolean(eventTarget.closest('[data-lenis-prevent], input, textarea, select, [contenteditable="true"]'));
    };

    const step = (timestamp = performance.now()) => {
      const elapsed = lastStepTime ? Math.min(48, timestamp - lastStepTime) : 16.67;
      const baseEase = 0.105;
      const ease = 1 - Math.pow(1 - baseEase, elapsed / 16.67);
      const snapThreshold = 0.35;
      const delta = targetScroll - currentScroll;

      lastStepTime = timestamp;

      if (Math.abs(delta) < snapThreshold) {
        currentScroll = targetScroll;
      } else {
        currentScroll += delta * ease;
      }

      isProgrammaticScroll = true;
      window.scrollTo(0, currentScroll);
      isProgrammaticScroll = false;
      ScrollTrigger.update();
      window.dispatchEvent(new CustomEvent('blank:smooth-scroll'));

      if (currentScroll !== targetScroll) {
        rafId = window.requestAnimationFrame(step);
        return;
      }

      rafId = 0;
      lastStepTime = 0;
    };

    const requestStep = () => {
      if (!rafId) {
        lastStepTime = 0;
        rafId = window.requestAnimationFrame(step);
      }
    };

    const scrollToTarget = (target, options = {}) => {
      let nextScroll = target;

      if (target instanceof Element) {
        nextScroll = window.scrollY + target.getBoundingClientRect().top;
      }

      if (typeof target === 'string') {
        const element = document.querySelector(target);
        nextScroll = element ? window.scrollY + element.getBoundingClientRect().top : targetScroll;
      }

      nextScroll = clampScroll(Number(nextScroll) + (options.offset || 0));
      targetScroll = nextScroll;

      if (options.immediate) {
        currentScroll = nextScroll;
        isProgrammaticScroll = true;
        window.scrollTo(0, currentScroll);
        isProgrammaticScroll = false;
        ScrollTrigger.update();
        window.dispatchEvent(new CustomEvent('blank:smooth-scroll'));
        return;
      }

      requestStep();
    };

    const handleWheel = (event) => {
      if (isStopped || event.ctrlKey || shouldPreventSmoothScroll(event.target)) {
        return;
      }

      event.preventDefault();
      const rawDelta = getWheelPixels(event);
      const wheelDelta = gsap.utils.clamp(-240, 240, rawDelta) * 0.86;

      targetScroll = clampScroll(targetScroll + wheelDelta);
      requestStep();
    };

    const handleTouchStart = (event) => {
      if (isStopped || shouldPreventSmoothScroll(event.target) || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      lastTouchY = touch.clientY;
      isHorizontalTouch = false;
      targetScroll = window.scrollY;
      currentScroll = window.scrollY;
    };

    const handleTouchMove = (event) => {
      if (isStopped || shouldPreventSmoothScroll(event.target) || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      const totalX = touch.clientX - touchStartX;
      const totalY = touch.clientY - touchStartY;

      if (!isHorizontalTouch && Math.abs(totalX) > 8 && Math.abs(totalX) > Math.abs(totalY)) {
        isHorizontalTouch = true;
      }

      if (isHorizontalTouch) {
        return;
      }

      event.preventDefault();
      targetScroll = clampScroll(targetScroll + (lastTouchY - touch.clientY));
      lastTouchY = touch.clientY;
      requestStep();
    };

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
      lastTouchY = 0;
      isHorizontalTouch = false;
    };

    const handleKeyDown = (event) => {
      if (isStopped || event.defaultPrevented || shouldPreventSmoothScroll(event.target)) {
        return;
      }

      const pageStep = window.innerHeight * 0.86;
      const keySteps = {
        ArrowDown: 120,
        ArrowUp: -120,
        PageDown: pageStep,
        PageUp: -pageStep,
        Home: -Infinity,
        End: Infinity,
      };

      let movement = keySteps[event.key];

      if (event.key === ' ') {
        movement = event.shiftKey ? -pageStep : pageStep;
      }

      if (movement === undefined) {
        return;
      }

      event.preventDefault();

      if (movement === Infinity) {
        targetScroll = clampScroll(document.documentElement.scrollHeight);
      } else if (movement === -Infinity) {
        targetScroll = 0;
      } else {
        targetScroll = clampScroll(targetScroll + movement);
      }

      requestStep();
    };

    const handleNativeScroll = () => {
      if (isProgrammaticScroll || rafId) {
        return;
      }

      targetScroll = window.scrollY;
      currentScroll = window.scrollY;
      ScrollTrigger.update();
      window.dispatchEvent(new CustomEvent('blank:smooth-scroll'));
    };

    const handleResize = () => {
      targetScroll = clampScroll(targetScroll);
      currentScroll = clampScroll(currentScroll);
      ScrollTrigger.refresh();
    };

    root.classList.add('lenis', 'lenis-smooth');
    window.__lenis = {
      scrollTo: scrollToTarget,
      stop: () => {
        isStopped = true;
        root.classList.add('lenis-stopped');
      },
      start: () => {
        isStopped = false;
        root.classList.remove('lenis-stopped');
      },
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleResize);
      root.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');

      if (window.__lenis?.scrollTo === scrollToTarget) {
        delete window.__lenis;
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}

export default function BlankPage({
  hideDesktopContextualMenu = false,
  showDesktopFeatureStory = false,
  showDesktopVarietalIntro = false,
  showDesktopKeepWarmIntro = false,
  showDesktopSoftOpeningIntro = false,
  hideDesktopSoftLidSection = false,
  showDesktopColorSelector = false,
  showDesktopTechSpecs = false,
  showDesktopWhatsIncluded = false,
  showDesktopReviewHighlights = false,
  showDesktopSupportDocumentation = false,
  showDesktopFAQ = false,
} = {}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isBuyPillVisible, setIsBuyPillVisible] = useState(false);
  const [isBuyPillExpanded, setIsBuyPillExpanded] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isExperimentPanelOpen, setIsExperimentPanelOpen] = useState(false);
  const [featureDesignMode, setFeatureDesignMode] = useState('webp');
  const [isContentWidthCapped, setIsContentWidthCapped] = useState(true);
  const currentImage = galleryImages[activeImage];
  const shouldShowOriginalFeatureStory = featureDesignMode === 'original' || featureDesignMode === 'both';
  const shouldShowWebpFeatureStory = featureDesignMode === 'webp' || featureDesignMode === 'both';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'the Smart Kettle™ Luxe';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!isBuyPillExpanded) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [isBuyPillExpanded]);

  useEffect(() => {
    let animationFrame = 0;

    const updateHeaderState = () => {
      animationFrame = 0;
      setIsHeaderHidden(window.scrollY > 24);

      const hero = document.querySelector('.blank-hero.hero-only');
      const heroBottom = hero?.getBoundingClientRect().bottom ?? window.innerHeight;
      setIsBuyPillVisible(heroBottom <= 0);
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

  useEffect(() => {
    const handleDebugPanelKeyDown = (event) => {
      const target = event.target;
      const isEditableTarget = target?.isContentEditable
        || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName);

      if (isEditableTarget || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      if (event.key.toLowerCase() !== 'p') {
        return;
      }

      event.preventDefault();
      setIsExperimentPanelOpen((isOpen) => !isOpen);
    };

    window.addEventListener('keydown', handleDebugPanelKeyDown);

    return () => window.removeEventListener('keydown', handleDebugPanelKeyDown);
  }, []);

  useEffect(() => {
    let refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      refreshFrame = 0;
    });

    return () => {
      if (refreshFrame) {
        window.cancelAnimationFrame(refreshFrame);
      }
    };
  }, [featureDesignMode, isContentWidthCapped]);

  const showPreviousImage = () => {
    setActiveImage((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
  };

  const showNextImage = () => {
    setActiveImage((index) => (index + 1) % galleryImages.length);
  };

  return (
    <main
      className={`blank-page${isHeaderHidden ? ' is-header-hidden' : ''}${isContentWidthCapped ? ' is-debug-content-width-capped' : ''}`}
      aria-label="Blank component workspace"
    >
      <BlankExperimentPanel
        isOpen={isExperimentPanelOpen}
        featureDesignMode={featureDesignMode}
        isContentWidthCapped={isContentWidthCapped}
        onFeatureDesignModeChange={setFeatureDesignMode}
        onContentWidthCappedChange={setIsContentWidthCapped}
        onClose={() => setIsExperimentPanelOpen(false)}
      />

      <BlankHeroOnlySection />

      <BlankProductStickyHeader onCompareOpen={() => setIsCompareOpen(true)} />
      <div className={`blank-surface-buy-pill-backdrop${isBuyPillExpanded ? ' is-visible' : ''}`} aria-hidden="true" />
      <BlankSurfaceBuyPill
        isVisible={isBuyPillVisible}
        onCompareOpen={() => setIsCompareOpen(true)}
        onExpandedChange={setIsBuyPillExpanded}
      />

      <BlankPrecisionSection />

      <BlankGallerySection
        currentImage={currentImage}
        showPreviousImage={showPreviousImage}
        showNextImage={showNextImage}
        dataName="Gallery Before Header"
        isPlaceholder
        placeholderVideo={{
          desktop: '/assets/videos/desktop_warm_1920.mp4',
          mobile: '/assets/videos/mobile_warm.mp4',
          label: 'Smart Kettle Luxe warm lifestyle video',
        }}
      />

      {showDesktopFeatureStory ? <div className="blank-desktop-feature-story-handoff" aria-hidden="true" /> : null}

      {showDesktopFeatureStory ? (
        <BlankDesktopFeatureStory
          key="feature-story-original"
          sectionId={shouldShowOriginalFeatureStory ? 'features' : null}
          isEnabled={shouldShowOriginalFeatureStory}
        />
      ) : null}

      {showDesktopFeatureStory ? (
        <BlankDesktopFeatureStory
          key="feature-story-webp"
          items={desktopFeatureStoryWebpItems}
          sectionId={shouldShowWebpFeatureStory && !shouldShowOriginalFeatureStory ? 'features' : null}
          className="blank-desktop-feature-story--webp"
          isEnabled={shouldShowWebpFeatureStory}
          shouldTransitionPage={false}
          shouldAnimateVarietalPosition={false}
        />
      ) : null}

      {showDesktopFeatureStory ? (
        <BlankMobileFeatureStory
          items={shouldShowOriginalFeatureStory && !shouldShowWebpFeatureStory ? desktopFeatureStoryItems : desktopFeatureStoryWebpItems}
          className="blank-mobile-feature-story--webp"
          isEnabled={showDesktopFeatureStory}
        />
      ) : null}

      {showDesktopVarietalIntro && !showDesktopFeatureStory ? <BlankDesktopVarietalIntro /> : null}

      {showDesktopKeepWarmIntro && !showDesktopFeatureStory ? <BlankDesktopKeepWarmIntro /> : null}

      {showDesktopVarietalIntro && !showDesktopFeatureStory ? (
        <BlankMobileSequenceFeature
          title="5 Varietal Settings"
          copy="Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee."
          framePath={desktopVarietalFramePath}
          endFrame={desktopVarietalEndFrame}
          scrubEndProgress={desktopVarietalScrubEndProgress}
          sequenceName="Mobile 5 Varietal Settings"
          className="blank-mobile-sequence-feature--varietal"
          entryOffsetAmount={180}
        />
      ) : null}

      {showDesktopKeepWarmIntro && !showDesktopFeatureStory ? (
        <BlankMobileSequenceFeature
          title="Keep Warm Button"
          copy="One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on completion of the water heating cycle."
          framePath={mobileKeepWarmFramePath}
          endFrame={desktopKeepWarmEndFrame}
          scrubEndProgress={desktopKeepWarmScrubEndProgress}
          sequenceName="Mobile Keep Warm Button"
          className="blank-mobile-sequence-feature--keep-warm"
          parallaxIntroOffset={-0.5}
          fadeCopyNearEnd
        />
      ) : null}

      {hideDesktopSoftLidSection && !showDesktopFeatureStory ? <BlankSoftLidSection mobileOnly /> : null}

      {showDesktopSoftOpeningIntro && !showDesktopFeatureStory ? <BlankDesktopSoftOpeningIntro /> : null}

      {!hideDesktopSoftLidSection && !showDesktopFeatureStory ? <BlankSoftLidSection /> : null}

      <div className="blank-luxe-design-stack">
        <BlankGalleryHeaderSection />

        <MotionElevateStrip showHeading={false} />
      </div>

      <MotionElevateStrip
        afterHeading={showDesktopColorSelector ? <BlankDesktopColorSelector /> : null}
        showRail={false}
      />
      {showDesktopColorSelector ? <BlankMobileColorStory /> : null}
      {showDesktopTechSpecs ? <BlankMobileTechSpecs /> : null}
      {showDesktopWhatsIncluded ? <BlankMobileWhatsIncluded /> : null}
      {showDesktopReviewHighlights ? <BlankMobileReviewHighlights /> : null}
      {showDesktopSupportDocumentation ? <BlankMobileSupportDocumentation /> : null}
      {showDesktopFAQ ? <BlankMobileFAQ /> : null}

      {showDesktopTechSpecs ? <div className="blank-tech-specs-offset" aria-hidden="true" /> : null}

      {showDesktopTechSpecs ? <BlankDesktopTechSpecs /> : null}

      {showDesktopWhatsIncluded ? <BlankDesktopWhatsIncluded /> : null}

      {showDesktopReviewHighlights ? <BlankDesktopReviewHighlights /> : null}

      {showDesktopSupportDocumentation ? <BlankDesktopSupportDocumentation /> : null}

      {showDesktopFAQ ? <BlankDesktopFAQ /> : null}

      <section className="motion-footer-section" aria-label="Footer">
        <TestingFooter variant="reversed" />
      </section>

      {hideDesktopContextualMenu ? null : <ContextualMenu />}
      {isCompareOpen ? <CompareTakeover onClose={() => setIsCompareOpen(false)} /> : null}
      <BlankSmoothScroll />
    </main>
  );
}
