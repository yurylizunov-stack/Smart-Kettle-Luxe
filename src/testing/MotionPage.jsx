import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { TestingFooter } from './MotionSupport.jsx';
import { FeaturesV2Layer } from './FeaturesV2Page.jsx';
import ProductStickyButton from './ProductStickyButton.jsx';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const motionLuxeImages = [
  '/assets/images/luxe temp/01.png',
  '/assets/images/luxe temp/02.png',
  '/assets/images/luxe temp/03.png',
  '/assets/images/luxe temp/04.png',
  '/assets/images/luxe temp/05.png',
];

const motionMobileLuxeImages = motionLuxeImages;

export const defaultFeatureMotionTiming = {
  introHold: 0.85,
  copyOutDuration: 0.42,
  bodyOutDuration: 0.52,
  copyInDuration: 0.48,
  bodyInDuration: 0.62,
  bodyStaggerOut: 0.07,
  bodyStaggerIn: 0.075,
  bodyOutOffset: 0.12,
  copyInOffset: 0.48,
  bodyInOffset: 0.62,
  copyOutYPercent: -110,
  copyInYPercent: 110,
  copyOutEase: 'power3.inOut',
  bodyOutEase: 'power3.inOut',
  copyInEase: 'power3.out',
  bodyInEase: 'power3.out',
  timelineScrub: 0.85,
  pageSequenceScrub: true,
  sequenceScrubStart: 'timeline',
  fiveVarietalHoldDuration: 0.75,
  copyHandoffSequenceDuration: 1.24,
  keepWarmHoldDuration: 0.65,
  kettleLiftDuration: 2.1,
  kettleLiftEase: 'power4.in',
  luxeHandoffOffset: 0.85,
  luxeCopyHandoffOffset: 0,
  mobileLuxeInDuration: 0.48,
  luxeTileInOffset: 1.1,
  luxeTileInDuration: 0.78,
  luxeTileInEase: 'power3.out',
  luxeTileOutDuration: 0.9,
  luxeTileOutEase: 'power3.inOut',
  luxeBoxesHoldOffset: 2.2,
  luxeBoxesHoldDuration: 0.55,
  softHandoffDelay: 0,
  softCopyHandoffOffset: 0,
  mobileLuxeOutDuration: 0.42,
  softHoldDuration: 0.65,
  softOpeningHoldDuration: 0,
  featureBSequenceStartOffset: 0.48,
  colorInfoInDuration: 0.48,
  colorInfoStagger: 0.08,
  swatchInDuration: 0.46,
  swatchStagger: 0.045,
  desktop: {
    featureASequenceEndFrame: 72,
    featureAKeepWarmFrame: 79,
    featureBInDuration: 2.35,
    featureBInitialY: 0,
    featureBInitialScale: 1,
    featureBSoftOpeningHoldFrame: 0,
    featureBPreBpaSequenceDuration: 0,
    featureBPreBpaEndFrame: 0,
    featureBPreBpaY: 0,
    featureBPreBpaScale: 1,
    featureBSequenceDuration: 5.2,
    featureBEndFrame: 225,
    featureBBpaY: 0,
    featureBBpaScale: 1,
    bpaHoldDuration: 1.4,
  },
  mobile: {
    featureASequenceEndFrame: 72,
    featureAKeepWarmFrame: 79,
    featureAMediaInitialScale: 1,
    featureAMediaActiveScale: 1,
    featureAMediaActiveY: 0,
    featureBInDuration: 1.1,
    featureBInitialY: 0,
    featureBInitialScale: 1,
    featureBSoftOpeningHoldFrame: 0,
    featureBPreBpaSequenceDuration: 0,
    featureBPreBpaEndFrame: 0,
    featureBPreBpaY: 0,
    featureBPreBpaScale: 1,
    featureBSequenceDuration: 1.8,
    featureBEndFrame: 225,
    featureBBpaY: 0,
    featureBBpaScale: 1,
    bpaHoldDuration: 0.65,
  },
};

const bottomGalleryImage = '/assets/images/product_tea.png';

const motionElevateImages = Array.from({ length: 7 }, (_, index) => {
  const imageNumber = String(index + 1).padStart(2, '0');

  return {
    desktop: `/assets/images/motion-elevate/elevate-${imageNumber}-desktop.jpg`,
    mobile: `/assets/images/motion-elevate/elevate-${imageNumber}-mobile.jpg`,
  };
});

function MotionMobileChrome() {
  return (
    <nav className="testing-mobile-nav" aria-label="Mobile primary navigation" data-node-id="9947:21016">
      <div className="testing-mobile-nav__bar" data-node-id="9947:21018">
        <div className="testing-mobile-nav__holder" data-node-id="9947:21019">
          <a className="testing-mobile-nav__logo-link" href="/" aria-label="Breville home">
            <img className="testing-mobile-nav__logo" src="/assets/images/breville-logo-nav.svg" alt="Breville" />
          </a>

          <div className="testing-mobile-nav__actions" aria-label="Quick links">
            <button className="testing-mobile-nav__icon-button" type="button" aria-label="Search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.75" cy="10.75" r="6.75" />
                <path d="m15.75 15.75 4.25 4.25" />
              </svg>
            </button>
            <button className="testing-mobile-nav__icon-button" type="button" aria-label="Cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.2 7.2h11.1l-1.2 7.1H8.9L7.2 4.7H4.8" />
                <circle cx="10" cy="19" r="0.8" />
                <circle cx="16.4" cy="19" r="0.8" />
              </svg>
            </button>
            <button className="testing-mobile-nav__icon-button" type="button" aria-label="Menu">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 7h14" />
                <path d="M5 12h14" />
                <path d="M5 17h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MotionDesktopNav() {
  return (
    <nav className="testing-nav" aria-label="Primary navigation">
      <div className="testing-nav__holder">
        <a className="testing-nav__logo-link" href="/" aria-label="Breville home">
          <img className="testing-nav__logo" src="/assets/images/breville-logo-nav.svg" alt="Breville" />
        </a>

        <div className="testing-nav__links" aria-label="Main navigation links">
          {['Shop', 'Recipes', 'Breville+ App', 'Support', 'Sales & Offers'].map((label) => (
            <a key={label} className="testing-nav__link" href="/">
              {label}
            </a>
          ))}
        </div>

        <div className="testing-nav__actions" aria-label="Quick links">
          <button className="testing-nav__icon-button" type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.7" cy="10.7" r="6.2" />
              <path d="M15.3 15.3 20 20" />
            </svg>
          </button>
          <button className="testing-nav__icon-button" type="button" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.4" />
              <path d="M5.5 20c.9-3.4 3.1-5.1 6.5-5.1s5.6 1.7 6.5 5.1" />
            </svg>
          </button>
          <button className="testing-nav__icon-button" type="button" aria-label="Cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 7.5h11l-1 12h-9z" />
              <path d="M9 7.5a3 3 0 0 1 6 0" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export function MotionHero({
  className = '',
  desktopHeroSrc = '/assets/images/hero-kettle.png',
  mobileHeroSrc,
} = {}) {
  const heroClassName = ['testing-scroll motion-hero', className].filter(Boolean).join(' ');

  return (
    <section className={heroClassName} aria-label="Motion hero">
      <MotionMobileChrome />
      <MotionDesktopNav />
      <div className="testing-scroll__stage">
        <div className="testing-scroll__background">
          <picture>
            {mobileHeroSrc ? <source media="(max-width: 767px)" srcSet={mobileHeroSrc} /> : null}
            <img
              className="testing-scroll__hero-media"
              src={desktopHeroSrc}
              alt="the Smart Kettle Luxe on a sculpted white pedestal"
            />
          </picture>
          <div className="testing-scroll__hero-copy">
            <div className="testing-scroll__hero-headline-group">
              <p className="testing-scroll__hero-eyebrow">the Smart Kettle&trade; Luxe</p>
              <h1 className="testing-scroll__hero-title">Brew Intelligently</h1>
            </div>
            <p className="testing-scroll__hero-scroll-cue">Scroll to Discover</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MotionOverview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cleanupHandoffProgress = () => {};

    const context = gsap.context(() => {
      const title = section.querySelector('.motion-overview__title');
      const titlePrecision = section.querySelector('.motion-overview__title-word--precision');
      const titleRest = section.querySelector('.motion-overview__title-word--rest');
      const handoffCopy = section.querySelector('.motion-overview__handoff-copy');
      const handoffLines = Array.from(section.querySelectorAll('.motion-overview__handoff-line-inner'));
      const leftImage = section.querySelector('.testing-scroll__image--left');
      const topImage = section.querySelector('.testing-scroll__image--top');
      const rightImage = section.querySelector('.testing-scroll__image--right');
      const extraOne = section.querySelector('.testing-scroll__image--extra-one');
      const extraTwo = section.querySelector('.testing-scroll__image--extra-two');
      const extraThree = section.querySelector('.testing-scroll__image--extra-three');
      const extraFour = section.querySelector('.testing-scroll__image--extra-four');
      const extraFive = section.querySelector('.testing-scroll__image--extra-five');
      const images = [leftImage, topImage, rightImage, extraOne, extraTwo, extraThree, extraFour, extraFive].filter(Boolean);
      const isHeroReveal = Boolean(section.closest('.motion-page--hero-reveal'));
      const isReferenceHandoff = Boolean(section.closest('.motion-page--hero-reference-handoff'));
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const scrollTiming = isMobile
        ? {
            redInAt: 0.65,
            redInDuration: 0.25,
            redExitAt: 0.9,
            redTopExitDuration: 1,
            redLeftExitDuration: 1.2,
            redRightExitDuration: 1.36,
          }
        : {
            redExitAt: 1,
            redTopExitDuration: 1.35,
            redLeftExitDuration: 2.15,
            redRightExitDuration: 2.65,
          };

      if (reduceMotion) {
        gsap.set([title, handoffCopy, ...images], { clearProps: 'all', autoAlpha: 1 });
        gsap.set(handoffLines, { clearProps: 'all' });
        return;
      }

      gsap.set(title, { autoAlpha: 1, y: 0 });
      gsap.set([titlePrecision, titleRest], { y: 0 });
      gsap.set(handoffCopy, { autoAlpha: 1 });
      gsap.set(handoffLines, { yPercent: 112 });
      gsap.set(images, { opacity: 1 });

      if (isMobile) {
        gsap.set(leftImage, { xPercent: -180, yPercent: 100 });
        gsap.set(topImage, { xPercent: 150, yPercent: -120 });
        gsap.set(rightImage, { xPercent: 170, yPercent: 120 });
        gsap.set(extraOne, { xPercent: -160, yPercent: -90 });
        gsap.set(extraTwo, { xPercent: 150, yPercent: -60 });
        gsap.set(extraThree, { xPercent: -120, yPercent: 130 });
        gsap.set(extraFour, { xPercent: 190, yPercent: 40 });
        gsap.set(extraFive, { xPercent: -150, yPercent: 50 });
      } else {
        gsap.set(images, {
          x: 0,
          y: 0,
          z: '100vh',
          scale: 1,
          rotation: 0,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          force3D: true,
        });
      }

      if (isHeroReveal && isReferenceHandoff) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        })
          .to(
            title,
            {
              y: () => -(window.innerHeight * 0.29),
              duration: 0.72,
              ease: 'none',
            },
            0.18,
          );

      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => (isHeroReveal ? `top+=${window.innerHeight} top` : 'top top'),
          end: () => (isHeroReveal ? `+=${window.innerHeight * 3.15}` : 'bottom top'),
          scrub: 0.85,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      timeline
        .to(
          images,
          isMobile
            ? {
                xPercent: 0,
                yPercent: 0,
                duration: scrollTiming.redInDuration,
                ease: 'none',
              }
            : {
                z: 0,
                duration: 0.8,
                ease: 'power1.inOut',
                stagger: {
                  amount: 0.2,
                  from: 'center',
                },
              },
          isMobile ? scrollTiming.redInAt : Math.max(0, scrollTiming.redExitAt - 1),
        )
        .to(
          topImage,
          {
            y: '-72vh',
            duration: scrollTiming.redTopExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          extraOne,
          {
            y: '-108vh',
            duration: scrollTiming.redTopExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          extraTwo,
          {
            y: '-150vh',
            duration: scrollTiming.redTopExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          leftImage,
          {
            y: '-128vh',
            duration: scrollTiming.redLeftExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          rightImage,
          {
            y: '-132vh',
            duration: scrollTiming.redRightExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          extraThree,
          {
            y: '-136vh',
            duration: scrollTiming.redRightExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          extraFour,
          {
            y: '-145vh',
            duration: scrollTiming.redRightExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        )
        .to(
          extraFive,
          {
            y: '-165vh',
            duration: scrollTiming.redLeftExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        );

      const handoffTimeline = gsap.timeline({ paused: true });

      handoffTimeline
        .to(title, {
          y: () => -(window.innerHeight * 0.34),
          duration: 0.55,
          ease: 'none',
        }, 0)
        .to(titlePrecision, {
          y: () => {
            const mask = titlePrecision?.closest('.motion-overview__title-mask');
            return -((mask?.getBoundingClientRect().height || titlePrecision?.getBoundingClientRect().height || 0) + 8);
          },
          duration: 0.32,
          ease: 'sine.inOut',
        }, 0.04)
        .to(titleRest, {
          y: () => {
            const mask = titleRest?.closest('.motion-overview__title-mask');
            return -((mask?.getBoundingClientRect().height || titleRest?.getBoundingClientRect().height || 0) + 8);
          },
          duration: 0.36,
          ease: 'sine.inOut',
        }, 0.14)
        .to(handoffLines, {
          yPercent: 0,
          duration: 0.46,
          ease: 'sine.inOut',
          stagger: 0.07,
        }, 0.28);

      const updateHandoffProgress = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pageProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const handoffProgress = gsap.utils.clamp(0, 1, (pageProgress - 0.16) / 0.03);
        handoffTimeline.progress(handoffProgress);
      };

      ScrollTrigger.create({
        id: 'motion-overview-copy-handoff',
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        invalidateOnRefresh: true,
        refreshPriority: 2,
        onUpdate: updateHandoffProgress,
        onRefresh: updateHandoffProgress,
      });

      window.addEventListener('scroll', updateHandoffProgress, { passive: true });
      window.addEventListener('resize', updateHandoffProgress);
      cleanupHandoffProgress = () => {
        window.removeEventListener('scroll', updateHandoffProgress);
        window.removeEventListener('resize', updateHandoffProgress);
      };
      updateHandoffProgress();

    }, section);

    ScrollTrigger.refresh();

    return () => {
      cleanupHandoffProgress();
      context.revert();
    };
  }, []);

  return (
    <section
      className="motion-overview"
      aria-label="Overview"
      data-node-id="10177:38497"
      data-name="Overview"
      ref={sectionRef}
    >
      <div className="motion-overview__stage">
        <div className="testing-scroll__gallery" aria-hidden="true">
          <figure className="testing-scroll__image testing-scroll__image--left" />
          <figure className="testing-scroll__image testing-scroll__image--top" />
          <figure className="testing-scroll__image testing-scroll__image--right" />
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-one" />
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-two" />
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-three" />
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-four" />
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-five" />
        </div>

        <h2 className="motion-overview__title" data-node-id="10177:38606">
          <span className="motion-overview__title-mask">
            <span className="motion-overview__title-strong motion-overview__title-word--precision">Precision </span>
          </span>
          <span className="motion-overview__title-mask">
            <span className="motion-overview__title-script motion-overview__title-word--rest">in Every Pour</span>
          </span>
        </h2>

        <div className="motion-overview__handoff-copy" data-node-id="10309:11916" data-name="Overview copy handoff">
          <p className="motion-overview__handoff-line" data-node-id="10309:11918">
            <span className="motion-overview__handoff-line-mask">
              <span className="motion-overview__handoff-line-inner">
                <span className="motion-overview__handoff-strong">7 cup capacity &mdash; </span>
                <span>The smart kettle knows the</span>
              </span>
            </span>
          </p>
          <p className="motion-overview__handoff-line" data-node-id="10309:11919">
            <span className="motion-overview__handoff-line-mask">
              <span className="motion-overview__handoff-line-inner">
                ideal temperature to bring out optimal taste
              </span>
            </span>
          </p>
          <p className="motion-overview__handoff-line" data-node-id="10309:11920">
            <span className="motion-overview__handoff-line-mask">
              <span className="motion-overview__handoff-line-inner">
                and quality of your favorite tea or coffee.
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function MotionFeaturesA({ timelineId = 'motion-features-timeline', timing = defaultFeatureMotionTiming } = {}) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const featureBRef = useRef(null);
  const canvasRef = useRef(null);
  const featureBCanvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = section?.closest('.motion-features-layer');
    const media = mediaRef.current;
    const featureB = featureBRef.current;
    const canvas = canvasRef.current;
    const featureBCanvas = featureBCanvasRef.current;

    if (!section || !layer || !media || !featureB || !canvas || !featureBCanvas) {
      return undefined;
    }

    let disposed = false;
    const context = canvas.getContext('2d');
    const featureBContext = featureBCanvas.getContext('2d');
    const frameCount = 80;
    const featureBFrameCount = 226;
    const sequenceState = { frame: 0 };
    const featureBState = { frame: 0 };
    const framePath = (frame) => (
      `/assets/sequences/featuress a  update 1/1_${String(frame).padStart(5, '0')}.jpg`
    );
    const featureBFramePath = (frame) => (
      `/assets/sequences/features-b-straight/frame_${String(frame + 1).padStart(4, '0')}.jpg`
    );
    const colorFramePath = (frame) => `/assets/images/kettle_straight/${frame + 1}.jpg`;
    const colorImages = Array.from({ length: 12 }, () => null);
    const images = Array.from({ length: frameCount }, (_, index) => {
      const image = new Image();
      image.src = framePath(index);
      return image;
    });
    const featureBImages = Array.from({ length: featureBFrameCount }, (_, index) => {
      const image = new Image();
      image.src = featureBFramePath(index);
      return image;
    });

    const drawResolvedImage = (targetCanvas, targetContext, image) => {
      if (disposed || !targetContext) {
        return;
      }

      if (!image?.complete || image.naturalWidth === 0) {
        return;
      }

      targetCanvas.width = image.naturalWidth;
      targetCanvas.height = image.naturalHeight;
      targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      targetContext.drawImage(image, 0, 0, targetCanvas.width, targetCanvas.height);
    };

    const drawImageFrame = (targetCanvas, targetContext, imageSet, frame, totalFrames) => {
      const frameIndex = gsap.utils.clamp(0, totalFrames - 1, Math.round(frame));
      targetCanvas.dataset.frame = String(frameIndex);
      drawResolvedImage(targetCanvas, targetContext, imageSet[frameIndex]);
    };

    const drawFrame = (frame) => drawImageFrame(canvas, context, images, frame, frameCount);
    const drawFeatureBFrame = (frame) => (
      drawImageFrame(featureBCanvas, featureBContext, featureBImages, frame, featureBFrameCount)
    );
    const drawFeatureBColor = (frame) => {
      const frameIndex = gsap.utils.clamp(0, colorImages.length - 1, Math.round(frame));
      let image = colorImages[frameIndex];

      if (!image) {
        image = new Image();
        image.src = colorFramePath(frameIndex);
        colorImages[frameIndex] = image;
      }

      if (image.complete && image.naturalWidth > 0) {
        drawResolvedImage(featureBCanvas, featureBContext, image);
        return;
      }

      image.addEventListener('load', () => drawResolvedImage(featureBCanvas, featureBContext, image), { once: true });
    };

    const handleFirstFrameLoad = () => drawFrame(0);
    const handleFeatureBFirstFrameLoad = () => drawFeatureBFrame(0);
    images[0].addEventListener('load', handleFirstFrameLoad, { once: true });
    featureBImages[0].addEventListener('load', handleFeatureBFirstFrameLoad, { once: true });
    drawFrame(0);
    drawFeatureBFrame(0);
    let removeColorSwatchHandlers = () => {};

    const updateLuxeBounds = () => {
      const copyContent = layer.querySelector('.motion-copy-block__content');

      if (!copyContent) {
        return;
      }

      const luxeOffset = copyContent.offsetTop + copyContent.offsetHeight + 40;
      section.style.setProperty('--motion-luxe-mobile-offset', `${luxeOffset}px`);
    };

    const updateMobileBpaBounds = () => {
      const bpaCopyTop = featureBCanvas.offsetTop + featureBCanvas.offsetHeight + 40;
      section.style.setProperty('--motion-mobile-bpa-copy-top', `${bpaCopyTop}px`);
    };

    const gsapContext = gsap.context(() => {
      const isDesktopFeatureLayout = window.matchMedia('(min-width: 768px)').matches;
      const responsiveTiming = isDesktopFeatureLayout ? timing.desktop : timing.mobile;
      const usePageSequenceScrub = timing.sequenceScrubStart === 'page';
      const sequenceEndFrame = responsiveTiming.featureASequenceEndFrame ?? 72;
      const keepWarmFrame = responsiveTiming.featureAKeepWarmFrame ?? frameCount - 1;
      const featureBPreBpaEndFrame = responsiveTiming.featureBPreBpaEndFrame ?? 0;
      const featureBEndFrame = responsiveTiming.featureBEndFrame ?? featureBFrameCount - 1;

      gsap.set(media, {
        y: 0,
        scale: responsiveTiming.featureAMediaInitialScale ?? 1,
      });
      gsap.set(featureB, { autoAlpha: 0, y: () => window.innerHeight });
      gsap.set(featureBCanvas, isDesktopFeatureLayout
        ? {
            xPercent: 0,
            y: 0,
            scale: 1,
            transformOrigin: '50% 50%',
          }
        : {
            xPercent: -50,
            y: responsiveTiming.featureBInitialY ?? 0,
            scale: responsiveTiming.featureBInitialScale ?? 1,
            transformOrigin: '50% 0%',
          });

      const currentCopyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--current .motion-copy-block__line-inner'),
      );
      const currentBodyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--current .motion-copy-block__body-line .motion-copy-block__line-inner'),
      );
      const nextCopyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--next .motion-copy-block__line-inner'),
      );
      const nextBodyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--next .motion-copy-block__body-line .motion-copy-block__line-inner'),
      );
      const luxeCopyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--luxe .motion-copy-block__line-inner'),
      );
      const luxeBodyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--luxe .motion-copy-block__body-line .motion-copy-block__line-inner'),
      );
      const softCopyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--soft .motion-copy-block__line-inner'),
      );
      const softBodyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--soft .motion-copy-block__body-line .motion-copy-block__line-inner'),
      );
      const bpaCopyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--bpa .motion-copy-block__line-inner'),
      );
      const bpaBodyLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__state--bpa .motion-copy-block__body-line .motion-copy-block__line-inner'),
      );
      const colorPanel = layer.querySelector('.motion-copy-block__color-panel');
      const colorPanelLines = Array.from(
        layer.querySelectorAll('.motion-copy-block__color-info .motion-copy-block__line-inner'),
      );
      const colorSwatches = Array.from(layer.querySelectorAll('.motion-copy-block__swatch'));
      const colorName = layer.querySelector('.motion-copy-block__color-name .motion-copy-block__line-inner');
      const copyBlock = layer.querySelector('.motion-copy-block');
      const copyContent = layer.querySelector('.motion-copy-block__content');
      const luxeTiles = Array.from(layer.querySelectorAll('.motion-luxe-strip__tile'));
      const mobileLuxe = layer.querySelector('.motion-luxe-mobile');
      const mobileLuxeViewport = layer.querySelector('.motion-luxe-mobile__viewport');
      const mobileLuxeCopy = layer.querySelector('.motion-luxe-mobile__copy');
      const mobileSoftCopy = layer.querySelector('.motion-luxe-mobile__soft-copy');
      const mobileBpaCopy = layer.querySelector('.motion-mobile-bpa-copy');
      const mobileLuxeFrames = Array.from(layer.querySelectorAll('.motion-luxe-mobile__frame'));
      const mobileLuxeFrameImages = mobileLuxeFrames.map((frame) => frame.querySelector('img')).filter(Boolean);
      const currentHeadline = layer.querySelector(
        '.motion-copy-block__state--current .motion-copy-block__title-line .motion-copy-block__line-inner',
      );
      const nextHeadline = layer.querySelector(
        '.motion-copy-block__state--next .motion-copy-block__title-line .motion-copy-block__line-inner',
      );
      const luxeHeadline = layer.querySelector(
        '.motion-copy-block__state--luxe .motion-copy-block__title-line .motion-copy-block__line-inner',
      );
      const softHeadline = layer.querySelector(
        '.motion-copy-block__state--soft .motion-copy-block__title-line .motion-copy-block__line-inner',
      );
      const bpaHeadline = layer.querySelector(
        '.motion-copy-block__state--bpa .motion-copy-block__title-line .motion-copy-block__line-inner',
      );

      const copyOutYPercent = timing.copyOutYPercent ?? -110;
      const copyInYPercent = timing.copyInYPercent ?? 110;

      gsap.set(currentCopyLines, { yPercent: 0, autoAlpha: 1 });
      gsap.set(nextCopyLines, { yPercent: copyInYPercent, autoAlpha: 0 });
      gsap.set(luxeCopyLines, { yPercent: copyInYPercent, autoAlpha: 0 });
      gsap.set(softCopyLines, { yPercent: copyInYPercent, autoAlpha: 0 });
      gsap.set(bpaCopyLines, { yPercent: copyInYPercent, autoAlpha: 0 });
      gsap.set(copyBlock, { y: 0 });
      gsap.set(copyContent, { y: 0 });
      gsap.set(colorPanel, { autoAlpha: 0 });
      gsap.set(colorPanelLines, { yPercent: copyInYPercent, autoAlpha: 0 });
      gsap.set(colorSwatches, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(luxeTiles, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(mobileLuxeFrames, { yPercent: 0, zIndex: (index) => index + 1 });
      gsap.set(mobileLuxeFrames.slice(1), { yPercent: 100 });
      gsap.set(mobileLuxeFrameImages, { scale: 1, transformOrigin: '50% 50%' });
      gsap.set(mobileLuxeFrameImages.slice(1), { scale: 1.08 });
      gsap.set(mobileLuxe, { autoAlpha: 0, y: 0 });
      gsap.set(mobileLuxeViewport, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(mobileLuxeCopy, { autoAlpha: 1, y: 0 });
      gsap.set(mobileSoftCopy, { autoAlpha: 0, y: 36, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(mobileBpaCopy, {
        autoAlpha: 0,
        y: responsiveTiming.featureBInitialY ?? 0,
        clipPath: 'inset(0% 0% 0% 0%)',
      });

      const handleColorSwatchClick = (event) => {
        const swatch = event.currentTarget;
        const colorIndex = Number(swatch.dataset.colorIndex || 0);
        const colorLabel = swatch.dataset.colorLabel || swatch.getAttribute('aria-label') || '';

        colorSwatches.forEach((button, index) => {
          button.setAttribute('aria-pressed', String(index === colorIndex));
        });

        if (colorName) {
          colorName.textContent = colorLabel;
        }

        drawFeatureBColor(colorIndex);
      };

      colorSwatches.forEach((button) => {
        button.addEventListener('click', handleColorSwatchClick);
      });
      removeColorSwatchHandlers = () => {
        colorSwatches.forEach((button) => {
          button.removeEventListener('click', handleColorSwatchClick);
        });
      };

      gsap.to(copyBlock, {
        y: () => -window.innerHeight,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: timelineId,
          trigger: layer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: timing.timelineScrub,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });
      const bodyOutOffset = timing.bodyOutOffset ?? 0.12;
      const copyInOffset = timing.copyInOffset ?? 0.48;
      const bodyInOffset = timing.bodyInOffset ?? 0.62;
      const incomingMobileLuxeFrames = mobileLuxeFrames.slice(1);
      const luxeBoxesHoldDuration = !isDesktopFeatureLayout
        ? (responsiveTiming.luxeBoxesHoldDuration ?? timing.mobileLuxeBoxesHoldDuration ?? timing.luxeBoxesHoldDuration)
        : timing.luxeBoxesHoldDuration;

      if (usePageSequenceScrub) {
        timeline.to({}, {
          duration: timing.introHold,
        });
      } else {
        timeline.to(sequenceState, {
          frame: sequenceEndFrame,
          duration: timing.introHold,
          ease: 'none',
          onUpdate: () => drawFrame(sequenceState.frame),
        });
      }

      if (!isDesktopFeatureLayout && !usePageSequenceScrub) {
        timeline.to(media, {
          y: responsiveTiming.featureAMediaActiveY ?? 0,
          scale: responsiveTiming.featureAMediaActiveScale ?? 1,
          duration: timing.introHold,
          ease: 'sine.inOut',
        }, 0);
      }

      timeline.addLabel('fiveVarietalSettings');

      timeline.to({}, {
        duration: timing.fiveVarietalHoldDuration,
      }, 'fiveVarietalSettings');

      timeline.addLabel('copyHandoff');

      timeline.to(currentHeadline, {
        autoAlpha: 0,
        yPercent: copyOutYPercent,
        duration: timing.copyOutDuration,
        ease: timing.copyOutEase,
      }, 'copyHandoff');

      timeline.to(currentBodyLines, {
        autoAlpha: 0,
        yPercent: copyOutYPercent,
        duration: timing.bodyOutDuration,
        stagger: timing.bodyStaggerOut,
        ease: timing.bodyOutEase,
      }, `copyHandoff+=${bodyOutOffset}`);

      timeline.to(nextHeadline, {
        autoAlpha: 1,
        yPercent: 0,
        duration: timing.copyInDuration,
        ease: timing.copyInEase,
      }, `copyHandoff+=${copyInOffset}`);

      timeline.to(nextBodyLines, {
        autoAlpha: 1,
        yPercent: 0,
        duration: timing.bodyInDuration,
        stagger: timing.bodyStaggerIn,
        ease: timing.bodyInEase,
      }, `copyHandoff+=${bodyInOffset}`);

      timeline.to(sequenceState, {
        frame: keepWarmFrame,
        duration: timing.copyHandoffSequenceDuration,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
      }, 'copyHandoff');

      timeline.addLabel('keepWarm');

      timeline.set(sequenceState, {
        frame: keepWarmFrame,
        onComplete: () => drawFrame(keepWarmFrame),
      }, 'keepWarm');

      timeline.to({}, {
        duration: timing.keepWarmHoldDuration,
      }, 'keepWarm');

      if (!isDesktopFeatureLayout) {
        timeline.set([copyContent, mobileLuxe], {
          y: 0,
        }, 'keepWarm');

        timeline.set(mobileLuxeViewport, {
          clipPath: 'inset(100% 0% 0% 0%)',
        }, 'keepWarm');

        timeline.to(mobileLuxe, {
          autoAlpha: 1,
          duration: 0.01,
          ease: 'none',
        }, 'keepWarm');
      }

      timeline.addLabel('kettleLift', `keepWarm+=${timing.keepWarmHoldDuration}`);

      timeline.to(media, {
        y: () => -(window.innerHeight * 0.5 + media.offsetHeight * 0.65),
        duration: timing.kettleLiftDuration,
        ease: timing.kettleLiftEase,
      }, 'kettleLift');

      if (!isDesktopFeatureLayout) {
        timeline.to(copyContent, {
          y: () => {
            const mediaLiftStart = responsiveTiming.featureAMediaActiveY ?? 0;
            const mediaLiftEnd = -(window.innerHeight * 0.5 + media.offsetHeight * 0.65);

            return mediaLiftEnd - mediaLiftStart;
          },
          duration: timing.kettleLiftDuration,
          ease: timing.kettleLiftEase,
        }, 'kettleLift');

        timeline.to(mobileLuxe, {
          y: () => {
            const viewportOffset = mobileLuxeViewport?.offsetTop ?? 662;

            return 40 - viewportOffset;
          },
          duration: timing.kettleLiftDuration,
          ease: timing.kettleLiftEase,
        }, 'kettleLift');

        timeline.to(mobileLuxeViewport, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: timing.kettleLiftDuration,
          ease: timing.kettleLiftEase,
        }, 'kettleLift');
      }

      timeline.addLabel('luxeHandoff', `kettleLift+=${timing.luxeHandoffOffset}`);
      timeline.addLabel('luxeCopyHandoff', `luxeHandoff+=${timing.luxeCopyHandoffOffset}`);

      timeline.to(nextHeadline, {
        autoAlpha: 0,
        yPercent: copyOutYPercent,
        duration: timing.copyOutDuration,
        ease: timing.copyOutEase,
      }, 'luxeCopyHandoff');

      timeline.to(nextBodyLines, {
        autoAlpha: 0,
        yPercent: copyOutYPercent,
        duration: timing.bodyOutDuration,
        stagger: timing.bodyStaggerOut,
        ease: timing.bodyOutEase,
      }, `luxeCopyHandoff+=${bodyOutOffset}`);

      timeline.to(luxeHeadline, {
        autoAlpha: 1,
        yPercent: 0,
        duration: timing.copyInDuration,
        ease: timing.copyInEase,
      }, `luxeCopyHandoff+=${copyInOffset}`);

      timeline.to(mobileLuxe, {
        autoAlpha: 1,
        duration: timing.mobileLuxeInDuration,
        ease: 'power2.out',
      }, 'luxeCopyHandoff+=0.48');

      timeline.to(luxeTiles, {
        scaleY: 1,
        duration: timing.luxeTileInDuration,
        stagger: timing.bodyStaggerIn,
        ease: timing.luxeTileInEase,
      }, `luxeHandoff+=${timing.luxeTileInOffset}`);

      timeline.to(luxeBodyLines, {
        autoAlpha: 1,
        yPercent: 0,
        duration: timing.bodyInDuration,
        stagger: timing.bodyStaggerIn,
        ease: timing.bodyInEase,
      }, `luxeCopyHandoff+=${bodyInOffset}`);

      timeline.addLabel('luxeBoxesHold', `luxeCopyHandoff+=${timing.luxeBoxesHoldOffset}`);

      timeline.to({}, {
        duration: luxeBoxesHoldDuration,
      }, 'luxeBoxesHold');

      if (!isDesktopFeatureLayout) {
        const mobileLuxeStep = luxeBoxesHoldDuration / Math.max(1, mobileLuxeFrames.length);

        incomingMobileLuxeFrames.forEach((frame, index) => {
          const frameImage = frame.querySelector('img');
          const segmentStart = `luxeBoxesHold+=${mobileLuxeStep * (index + 1)}`;

          timeline.to(frame, {
            yPercent: 0,
            duration: mobileLuxeStep,
            ease: 'none',
          }, segmentStart);

          if (frameImage) {
            timeline.to(frameImage, {
              scale: 1,
              duration: mobileLuxeStep,
              ease: 'none',
            }, segmentStart);
          }
        });
      }

      timeline.set(featureB, {
        y: () => window.innerHeight,
      });

      timeline.to(featureB, {
        autoAlpha: 1,
        duration: 0.01,
        ease: 'none',
      });

      timeline.addLabel('softHandoff', `+=${timing.softHandoffDelay}`);
      timeline.addLabel('softCopyHandoff', `softHandoff+=${timing.softCopyHandoffOffset}`);

      timeline.set(luxeTiles, {
        transformOrigin: '50% 0%',
      }, 'softHandoff');

      timeline.to(luxeTiles, {
        scaleY: 0,
        duration: timing.luxeTileOutDuration,
        stagger: timing.bodyStaggerIn,
        ease: timing.luxeTileOutEase,
      }, 'softHandoff');

      if (!isDesktopFeatureLayout) {
        timeline.set(mobileSoftCopy, {
          autoAlpha: 0,
          y: 36,
        }, 'softHandoff');

        timeline.to(mobileLuxeCopy, {
          autoAlpha: 0,
          y: -34,
          duration: responsiveTiming.featureBInDuration * 0.72,
          ease: responsiveTiming.featureBInEase || 'sine.inOut',
        }, 'softHandoff');

        timeline.to(mobileSoftCopy, {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: responsiveTiming.featureBInDuration,
          ease: responsiveTiming.featureBInEase || 'sine.inOut',
        }, 'softHandoff');

        timeline.to(mobileLuxe, {
          y: () => {
            const softCopyTop = mobileSoftCopy
              ? mobileSoftCopy.offsetTop
              : (
                  (mobileLuxeCopy ? mobileLuxeCopy.offsetTop + mobileLuxeCopy.offsetHeight + 40 : 0)
                  || ((mobileLuxeViewport?.offsetTop ?? 662) + (mobileLuxeViewport?.offsetHeight ?? 438) + 173)
                );

            return 40 - softCopyTop;
          },
          duration: responsiveTiming.featureBInDuration,
          ease: responsiveTiming.featureBInEase || 'sine.inOut',
        }, 'softHandoff');
      } else {
        timeline.to(mobileLuxe, {
          autoAlpha: 0,
          duration: timing.mobileLuxeOutDuration,
          ease: 'power2.inOut',
        }, 'softHandoff');
      }

      timeline.to(featureB, {
        y: 0,
        duration: responsiveTiming.featureBInDuration,
        ease: responsiveTiming.featureBInEase || (isDesktopFeatureLayout ? 'sine.inOut' : 'power2.inOut'),
      }, 'softHandoff');

      if (isDesktopFeatureLayout) {
        timeline.to(luxeHeadline, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: timing.copyOutDuration,
          ease: timing.copyOutEase,
        }, 'softCopyHandoff');

        timeline.to(luxeBodyLines, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: timing.bodyOutDuration,
          stagger: timing.bodyStaggerOut,
          ease: timing.bodyOutEase,
        }, `softCopyHandoff+=${bodyOutOffset}`);

        timeline.to(softHeadline, {
          autoAlpha: 1,
          yPercent: 0,
          duration: timing.copyInDuration,
          ease: timing.copyInEase,
        }, `softCopyHandoff+=${copyInOffset}`);

        timeline.to(softBodyLines, {
          autoAlpha: 1,
          yPercent: 0,
          duration: timing.bodyInDuration,
          stagger: timing.bodyStaggerIn,
          ease: timing.bodyInEase,
        }, `softCopyHandoff+=${bodyInOffset}`);
      }

      timeline.addLabel('softOpeningHold');

      timeline.to({}, {
        duration: timing.softOpeningHoldDuration,
      }, 'softOpeningHold');

      if (!isDesktopFeatureLayout && timing.softOpeningHoldDuration > 0) {
        timeline.to(featureBState, {
          frame: responsiveTiming.featureBSoftOpeningHoldFrame ?? 0,
          duration: timing.softOpeningHoldDuration,
          ease: 'none',
          onUpdate: () => drawFeatureBFrame(featureBState.frame),
        }, 'softOpeningHold');
      }

      timeline.addLabel('softOpeningMidpointMove');

      if (!isDesktopFeatureLayout && responsiveTiming.featureBPreBpaSequenceDuration > 0) {
        const featureBMidpointMoveDuration = (
          responsiveTiming.featureBMidpointMoveDuration
          ?? responsiveTiming.featureBPreBpaSequenceDuration
        );
        const featureBMidpointScrubDuration = (
          responsiveTiming.featureBMidpointScrubDuration
          ?? responsiveTiming.featureBPreBpaSequenceDuration
        );

        timeline.set(mobileBpaCopy, {
          autoAlpha: 1,
          y: responsiveTiming.featureBInitialY ?? 0,
        }, 'softOpeningMidpointMove');

        timeline.to(featureBCanvas, {
          y: responsiveTiming.featureBPreBpaY ?? 0,
          scale: responsiveTiming.featureBPreBpaScale ?? 1,
          duration: featureBMidpointMoveDuration,
          ease: 'sine.inOut',
        }, 'softOpeningMidpointMove');

        timeline.to(mobileBpaCopy, {
          y: responsiveTiming.featureBPreBpaY ?? 0,
          duration: featureBMidpointMoveDuration,
          ease: 'sine.inOut',
        }, 'softOpeningMidpointMove');

        timeline.to(mobileLuxe, {
          y: () => {
            if (!mobileSoftCopy) {
              return 0;
            }

            return -(mobileSoftCopy.offsetTop + mobileSoftCopy.offsetHeight + 56);
          },
          duration: featureBMidpointMoveDuration,
          ease: 'sine.inOut',
        }, 'softOpeningMidpointMove');

        timeline.to(mobileSoftCopy, {
          autoAlpha: 0,
          y: -42,
          duration: featureBMidpointMoveDuration,
          ease: 'sine.inOut',
        }, 'softOpeningMidpointMove');

        timeline.set(mobileLuxe, {
          autoAlpha: 0,
        }, `softOpeningMidpointMove+=${featureBMidpointMoveDuration}`);

        timeline.addLabel('softOpeningMidpoint');

        timeline.to(featureBState, {
          frame: featureBPreBpaEndFrame,
          duration: featureBMidpointScrubDuration,
          ease: 'none',
          onUpdate: () => drawFeatureBFrame(featureBState.frame),
        }, 'softOpeningMidpoint');
      }

      timeline.to({}, {
        duration: timing.softHoldDuration,
      });

      timeline.addLabel('bpaHandoff');

      if (!isDesktopFeatureLayout) {
        timeline.to(mobileLuxe, {
          y: () => {
            const softCopyBottom = mobileSoftCopy
              ? mobileSoftCopy.offsetTop + mobileSoftCopy.offsetHeight
              : ((mobileLuxeCopy?.offsetTop ?? 1140) + (mobileLuxeCopy?.offsetHeight ?? 133) + 213);

            return -(softCopyBottom + 80);
          },
          duration: timing.copyOutDuration,
          ease: timing.copyOutEase,
        }, 'bpaHandoff');

        timeline.set(mobileLuxe, {
          autoAlpha: 0,
        }, `bpaHandoff+=${timing.copyOutDuration}`);
      } else {
        const desktopBpaCopyFrame = responsiveTiming.featureBBpaCopyHandoffFrame ?? 39;
        const desktopBpaCopyHandoffOffset = featureBEndFrame > 0
          ? responsiveTiming.featureBSequenceDuration * gsap.utils.clamp(0, 1, desktopBpaCopyFrame / featureBEndFrame)
          : 0;
        const desktopCopyStart = timing.featureBSequenceStartOffset + desktopBpaCopyHandoffOffset;

        timeline.to(softHeadline, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: timing.copyOutDuration,
          ease: timing.copyOutEase,
        }, `bpaHandoff+=${desktopCopyStart}`);

        timeline.to(softBodyLines, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: timing.bodyOutDuration,
          stagger: timing.bodyStaggerOut,
          ease: timing.bodyOutEase,
        }, `bpaHandoff+=${desktopCopyStart + bodyOutOffset}`);

        timeline.to(bpaHeadline, {
          autoAlpha: 1,
          yPercent: 0,
          duration: timing.copyInDuration,
          ease: timing.copyInEase,
        }, `bpaHandoff+=${desktopCopyStart + copyInOffset}`);

        timeline.to(bpaBodyLines, {
          autoAlpha: 1,
          yPercent: 0,
          duration: timing.bodyInDuration,
          stagger: timing.bodyStaggerIn,
          ease: timing.bodyInEase,
        }, `bpaHandoff+=${desktopCopyStart + bodyInOffset}`);
      }

      timeline.to(featureBState, {
        frame: featureBEndFrame,
        duration: responsiveTiming.featureBSequenceDuration,
        ease: 'none',
        onUpdate: () => drawFeatureBFrame(featureBState.frame),
      }, `bpaHandoff+=${timing.featureBSequenceStartOffset}`);

      if (!isDesktopFeatureLayout) {
        timeline.to(mobileBpaCopy, {
          y: responsiveTiming.featureBBpaY ?? 0,
          duration: responsiveTiming.featureBSequenceDuration,
          ease: 'sine.inOut',
        }, `bpaHandoff+=${timing.featureBSequenceStartOffset}`);

        timeline.to(featureBCanvas, {
          y: responsiveTiming.featureBBpaY ?? 0,
          scale: responsiveTiming.featureBBpaScale ?? 1,
          duration: responsiveTiming.featureBSequenceDuration,
          ease: 'sine.inOut',
        }, `bpaHandoff+=${timing.featureBSequenceStartOffset}`);
      }

      if (!isDesktopFeatureLayout) {
        timeline.to({}, {
          duration: responsiveTiming.bpaHoldDuration,
        });

        timeline.addLabel('bpaExit');

        timeline.to({}, {
          duration: timing.copyOutDuration,
        }, 'bpaExit');
      }

      if (usePageSequenceScrub) {
        gsap.to(sequenceState, {
          frame: sequenceEndFrame,
          ease: 'none',
          onUpdate: () => drawFrame(sequenceState.frame),
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: () => {
              const featureTrigger = ScrollTrigger.getById(timelineId);
              const featureStart = featureTrigger?.start ?? 0;
              const featureEnd = featureTrigger?.end ?? featureStart + window.innerHeight;
              const sequenceCompleteTime = timeline.labels.fiveVarietalSettings ?? timing.introHold;
              const sequenceCompleteProgress = sequenceCompleteTime / timeline.duration();

              return featureStart + (featureEnd - featureStart) * sequenceCompleteProgress;
            },
            scrub: timing.pageSequenceScrub,
            invalidateOnRefresh: true,
            refreshPriority: 3,
            onLeave: () => {
              sequenceState.frame = sequenceEndFrame;
              drawFrame(sequenceEndFrame);
            },
            onLeaveBack: () => {
              sequenceState.frame = 0;
              drawFrame(0);
            },
            onRefresh: (self) => {
              if (self.progress <= 0.001 && window.scrollY <= 1) {
                sequenceState.frame = 0;
                drawFrame(0);
              }
            },
            onUpdate: (self) => {
              if (self.progress <= 0.001 && window.scrollY <= 1) {
                sequenceState.frame = 0;
                drawFrame(0);
              }
            },
          },
        });

        if (!isDesktopFeatureLayout) {
          gsap.to(media, {
            y: responsiveTiming.featureAMediaActiveY ?? 0,
            scale: responsiveTiming.featureAMediaActiveScale ?? 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 0,
              end: () => {
                const featureTrigger = ScrollTrigger.getById(timelineId);
                const featureStart = featureTrigger?.start ?? 0;
                const featureEnd = featureTrigger?.end ?? featureStart + window.innerHeight;
                const sequenceCompleteTime = timeline.labels.fiveVarietalSettings ?? timing.introHold;
                const sequenceCompleteProgress = sequenceCompleteTime / timeline.duration();

                return featureStart + (featureEnd - featureStart) * sequenceCompleteProgress;
              },
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 3,
              onLeaveBack: () => {
                gsap.set(media, {
                  y: 0,
                  scale: responsiveTiming.featureAMediaInitialScale ?? 1,
                });
              },
              onRefresh: (self) => {
                if (self.progress <= 0.001) {
                  gsap.set(media, {
                    y: 0,
                    scale: responsiveTiming.featureAMediaInitialScale ?? 1,
                  });
                }
              },
            },
          });
        }
      }
    }, section);

    updateLuxeBounds();
    updateMobileBpaBounds();
    window.addEventListener('resize', updateLuxeBounds);
    window.addEventListener('resize', updateMobileBpaBounds);
    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      images[0].removeEventListener('load', handleFirstFrameLoad);
      featureBImages[0].removeEventListener('load', handleFeatureBFirstFrameLoad);
      window.removeEventListener('resize', updateLuxeBounds);
      window.removeEventListener('resize', updateMobileBpaBounds);
      gsapContext.revert();
      removeColorSwatchHandlers();
    };
  }, [timelineId, timing]);

  return (
    <section
      className="motion-features-a"
      aria-label="Features A"
      data-node-id="10181:38647"
      data-name="Features A"
      ref={sectionRef}
    >
      <div
        ref={mediaRef}
        className="motion-features-a__media"
        data-node-id="10181:38648"
        data-name="frame_0001 1"
      >
        <canvas
          ref={canvasRef}
          className="motion-features-a__sequence"
          aria-label="Smart kettle varietal settings sequence"
        />
      </div>

      <section
        className="motion-luxe-strip"
        aria-label="Luxe Design"
        data-node-id="10186:38678"
      >
        <div className="motion-luxe-strip__track">
          {motionLuxeImages.map((src, index) => (
            <figure className="motion-luxe-strip__tile" key={src} data-node-id={`10186:${38679 + index}`}>
              <img src={src} alt="" />
            </figure>
          ))}
        </div>
      </section>

      <section
        className="motion-luxe-mobile"
        aria-label="Luxe Design"
        data-node-id="10200:9558"
      >
        <div className="motion-luxe-mobile__viewport" data-node-id="10200:9559">
          {motionMobileLuxeImages.map((src, index) => (
            <figure
              className={`motion-luxe-mobile__frame motion-luxe-mobile__frame--${index + 1}`}
              data-node-id={`10200:${9560 + index}`}
              key={src}
            >
              <img src={src} alt="" />
            </figure>
          ))}
        </div>

        <div className="motion-luxe-mobile__copy" data-node-id="10200:9563">
          <h2 data-node-id="10200:9564">Luxe Design</h2>
          <p data-node-id="10200:9565">
            Sculptural form. Premium finishes. Made to be seen, and used every day.
          </p>
        </div>

        <div className="motion-luxe-mobile__soft-copy">
          <h2>Soft Opening&trade; Lid</h2>
          <p>
            A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases steam and eliminates splashing.
          </p>
        </div>
      </section>

      <section className="motion-mobile-bpa-copy" aria-label="BPA Free Material">
        <h2>BPA Free Material</h2>
        <p>
          Dual sided, high visibility water windows make is easy to make sure you don&apos;t heat more water than you need. Made from BPA Free materials.
        </p>
      </section>

      <section ref={featureBRef} className="motion-features-b" aria-label="Keep warm feature sequence">
        <canvas
          ref={featureBCanvasRef}
          className="motion-features-b__sequence"
          aria-label="Keep warm feature scroll sequence"
        />
      </section>
    </section>
  );
}

function MotionCopyBlock() {
  const currentBody = 'Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee.';
  const nextBody = 'One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on completion of the water heating cycle.';
  const luxeBody = 'Sculptural form Premium finishes. Made to be seen, and used every day.';
  const softBody = 'A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases steam and eliminates splashing.';
  const bpaBody = 'Dual sided, high visibility water windows make is easy to make sure you don\'t heat more water than you need. Made from BPA Free materials.';
  const swatches = [
    { slug: 'brushed', label: 'Brushed Stainless Steel', image: '/assets/images/swatches/Brushed Stainless Steel.png' },
    { slug: 'black', label: 'Black Truffle', image: '/assets/images/swatches/Black Truffle.png' },
    { slug: 'white', label: 'Sea Salt', image: '/assets/images/swatches/Sea Salt.png' },
    { slug: 'navy', label: 'Damson Blue', image: '/assets/images/swatches/Damson Blue.png' },
    { slug: 'stone', label: 'Almond Nougat', image: '/assets/images/swatches/Almond Nougat.png' },
    { slug: 'olive', label: 'Olive Tapenade', image: '/assets/images/swatches/Olive Tapenade.png' },
    { slug: 'black-steel', label: 'Noir', image: '/assets/images/swatches/Noir.png' },
    { slug: 'champagne', label: 'Sea Salt Brass', image: '/assets/images/swatches/Sea Salt Brass.png' },
    { slug: 'navy-champagne', label: 'Damson Blue Brass', image: '/assets/images/swatches/Damson Blue Brass.png' },
    { slug: 'olive-champagne', label: 'Olive Tapenade Brass', image: '/assets/images/swatches/Olive Tapenade Brass.png' },
    { slug: 'steel-champagne', label: 'Brushed Stainless Steel Brass', image: '/assets/images/swatches/Brushed Stainless Steel Brass.png' },
    { slug: 'citrus', label: 'an Aboriginal Culinary Journey', image: '/assets/images/swatches/an Aboriginal Culinary Journey.png' },
  ];
  const renderBody = (copy, nodeId) => (
    <p className="motion-copy-block__body" data-node-id={nodeId}>
      <span className="motion-copy-block__line-mask motion-copy-block__body-line">
        <span className="motion-copy-block__line-inner">{copy}</span>
      </span>
    </p>
  );

  return (
    <div className="motion-copy-block" data-node-id="10182:38655" data-name="copy block">
      <div className="motion-copy-block__content" data-node-id="10182:38657">
        <div className="motion-copy-block__state motion-copy-block__state--current">
          <h2 className="motion-copy-block__title" data-node-id="10182:38658">
            <span className="motion-copy-block__line-mask motion-copy-block__title-line">
              <span className="motion-copy-block__line-inner">5 Varietal Settings</span>
            </span>
          </h2>
          {renderBody(currentBody, '10182:38659')}
        </div>

        <div className="motion-copy-block__state motion-copy-block__state--next" aria-hidden="true">
          <h2 className="motion-copy-block__title">
            <span className="motion-copy-block__line-mask motion-copy-block__title-line">
              <span className="motion-copy-block__line-inner">Keep Warm Button</span>
            </span>
          </h2>
          {renderBody(nextBody)}
        </div>

        <div className="motion-copy-block__state motion-copy-block__state--luxe" aria-hidden="true">
          <h2 className="motion-copy-block__title">
            <span className="motion-copy-block__line-mask motion-copy-block__title-line">
              <span className="motion-copy-block__line-inner">Luxe Design</span>
            </span>
          </h2>
          {renderBody(luxeBody)}
        </div>

        <div className="motion-copy-block__state motion-copy-block__state--soft" aria-hidden="true">
          <h2 className="motion-copy-block__title">
            <span className="motion-copy-block__line-mask motion-copy-block__title-line">
              <span className="motion-copy-block__line-inner">Soft Opening&trade; Lid</span>
            </span>
          </h2>
          {renderBody(softBody)}
        </div>

        <div className="motion-copy-block__state motion-copy-block__state--bpa" aria-hidden="true">
          <h2 className="motion-copy-block__title">
            <span className="motion-copy-block__line-mask motion-copy-block__title-line">
              <span className="motion-copy-block__line-inner">BPA Free Material</span>
            </span>
          </h2>
          {renderBody(bpaBody)}
        </div>

        <div className="motion-copy-block__color-panel" data-node-id="10197:38709" aria-hidden="true">
          <div className="motion-copy-block__color-info" data-node-id="10197:38710">
            <p className="motion-copy-block__color-label" data-node-id="10197:38711">
              <span className="motion-copy-block__line-mask">
                <span className="motion-copy-block__line-inner">Color</span>
              </span>
            </p>
            <p className="motion-copy-block__color-name" data-node-id="10197:38712">
              <span className="motion-copy-block__line-mask">
                <span className="motion-copy-block__line-inner">Brushed Stainless Steel</span>
              </span>
            </p>
          </div>

          <div className="motion-copy-block__swatches" data-node-id="10197:38713" aria-label="Color options">
            {swatches.map((swatch, index) => (
              <button
                className={`motion-copy-block__swatch motion-copy-block__swatch--${swatch.slug}`}
                data-node-id={`10197:${38714 + index}`}
                data-color-index={index}
                data-color-label={swatch.label}
                type="button"
                aria-label={swatch.label}
                aria-pressed={index === 0}
                key={swatch.slug}
              >
                <span className="motion-copy-block__swatch-fill">
                  <img src={swatch.image} alt="" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MotionFeaturesLayer({ timelineId, timing } = {}) {
  return (
    <div className="motion-features-layer">
      <MotionCopyBlock />
      <MotionFeaturesA timelineId={timelineId} timing={timing} />
    </div>
  );
}

export function MotionTimelinePanel({
  pageSelector = '.motion-page',
  featureTimelineId = 'motion-features-timeline',
  title = 'Progress',
} = {}) {
  const progressRef = useRef(null);
  const scrollRef = useRef(null);
  const beatRef = useRef(null);
  const featureRef = useRef(null);
  const frameRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const output = progressRef.current;
    const scrollOutput = scrollRef.current;
    const beatOutput = beatRef.current;
    const featureOutput = featureRef.current;
    const frameOutput = frameRef.current;
    const viewportOutput = viewportRef.current;
    const page = document.querySelector(pageSelector);

    if (!output || !page) {
      return undefined;
    }

    const getActiveBeat = (timeline) => {
      if (!timeline) {
        return 'waiting';
      }

      const labels = Object.entries(timeline.labels).sort((a, b) => a[1] - b[1]);
      const currentTime = timeline.time();
      const active = labels.reduce((current, label) => (label[1] <= currentTime ? label[0] : current), 'intro');
      return active;
    };

    const updatePanel = (self) => {
      output.textContent = `${(self.progress * 100).toFixed(1)}%`;

      if (scrollOutput) {
        scrollOutput.textContent = `${Math.round(window.scrollY)}px`;
      }

      if (viewportOutput) {
        viewportOutput.textContent = `${window.innerWidth} x ${window.innerHeight}`;
      }

      const featureTrigger = ScrollTrigger.getById(featureTimelineId);

      if (featureOutput) {
        featureOutput.textContent = featureTrigger ? `${(featureTrigger.progress * 100).toFixed(1)}%` : 'pending';
      }

      if (beatOutput) {
        beatOutput.textContent = getActiveBeat(featureTrigger?.animation);
      }

      if (frameOutput) {
        const featureFrame = document.querySelector('.motion-features-a__sequence')?.dataset.frame;
        const featureBFrame = document.querySelector('.motion-features-b__sequence')?.dataset.frame;
        frameOutput.textContent = featureBFrame && featureBFrame !== '0'
          ? `B ${featureBFrame}`
          : `A ${featureFrame || '0'}`;
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: page,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updatePanel,
    });

    const ticker = () => updatePanel(trigger);
    gsap.ticker.add(ticker);
    ticker();

    return () => {
      gsap.ticker.remove(ticker);
      trigger.kill();
    };
  }, [featureTimelineId, pageSelector]);

  return (
    <aside className="testing-debug motion-timeline-panel" aria-label="Motion timeline debug panel">
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">{title}</span>
        <output ref={progressRef} className="testing-debug__value">
          0.0%
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Feature</span>
        <output ref={featureRef} className="testing-debug__value">
          pending
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Beat</span>
        <output ref={beatRef} className="testing-debug__value">
          intro
        </output>
      </div>
      <div className="motion-timeline-panel__row">
        <span className="testing-debug__label">Frame</span>
        <output ref={frameRef} className="testing-debug__value">
          A 0
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

function MotionBottomGallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const stage = section.querySelector('.bottom-mosaic-row__stage');
      const shell = section.querySelector('.bottom-mosaic-row__shell');
      const overlay = section.querySelector('.bottom-mosaic-row__overlay');
      const portraits = gsap.utils.toArray('.bottom-mosaic-row__portrait');
      const isMobileGallery = () => window.matchMedia('(max-width: 767px)').matches;
      const mobileLeftInset = 20;
      const mobilePeek = 20;
      const portraitHeight = () => {
        const idealHeight = window.innerHeight * 0.62;
        const maxMobileWidth = window.innerWidth - mobileLeftInset - portraitGap() - mobilePeek;
        const mobileHeight = Math.max(260, maxMobileWidth * 1.5);

        return isMobileGallery() ? Math.min(idealHeight, mobileHeight) : idealHeight;
      };
      const portraitWidth = () => portraitHeight() * (2 / 3);
      const portraitGap = () => (isMobileGallery() ? 16 : window.innerWidth * 0.06);
      const innerOffset = () => (
        isMobileGallery() ? portraitWidth() + portraitGap() : window.innerWidth * 0.28
      );
      const outerOffset = () => (
        isMobileGallery() ? (portraitWidth() + portraitGap()) * 2 : window.innerWidth * 0.56
      );
      const mobileMainResolvedX = () => (
        mobileLeftInset + (portraitWidth() / 2) - (window.innerWidth / 2) + 8
      );
      const mobileRightImageOffset = (index) => (
        mobileLeftInset
        + (portraitWidth() / 2)
        + (index * (portraitWidth() + portraitGap()))
        - (window.innerWidth / 2)
      );
      const mobileSideStartOffset = () => (
        (window.innerWidth / 2) + (portraitWidth() / 2) + 32
      );
      const mobileRightStartOffset = (index) => (
        mobileSideStartOffset() + ((index - 1) * (portraitWidth() + portraitGap()))
      );

      gsap.set(shell, {
        '--bottom-gallery-crop': 0,
        width: () => window.innerWidth,
        height: () => window.innerHeight,
        scale: () => (isMobileGallery() ? 1.12 : 1.04),
        y: '0vh',
        xPercent: -50,
        yPercent: -50,
        transformOrigin: '50% 50%',
        force3D: true,
      });
      gsap.set(portraits, {
        autoAlpha: 1,
        y: '0vh',
        yPercent: -50,
        transformOrigin: '50% 50%',
        force3D: true,
      });
      gsap.set('.bottom-mosaic-row__portrait--outer-left', {
        xPercent: -50,
        x: () => (isMobileGallery() ? mobileRightStartOffset(3) : -(window.innerWidth * 1.14)),
      });
      gsap.set('.bottom-mosaic-row__portrait--left', {
        xPercent: -50,
        x: () => (isMobileGallery() ? mobileRightStartOffset(1) : -(window.innerWidth * 0.72)),
      });
      gsap.set('.bottom-mosaic-row__portrait--right', {
        xPercent: -50,
        x: () => (isMobileGallery() ? mobileRightStartOffset(2) : window.innerWidth * 0.72),
      });
      gsap.set('.bottom-mosaic-row__portrait--outer-right', {
        xPercent: -50,
        x: () => (isMobileGallery() ? mobileRightStartOffset(4) : window.innerWidth * 1.14),
      });
      gsap.set(overlay, {
        autoAlpha: 1,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: stage,
          pinSpacing: false,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        shell,
        {
          '--bottom-gallery-crop': () => (isMobileGallery() ? 0 : 28),
          width: () => (isMobileGallery() ? portraitWidth() : window.innerWidth),
          height: () => (isMobileGallery() ? portraitHeight() : window.innerHeight),
          scale: () => (isMobileGallery() ? 1 : 0.62),
          x: () => (isMobileGallery() ? mobileMainResolvedX() : 0),
          y: '-2vh',
          duration: 0.9,
          ease: 'power2.inOut',
        },
          0,
        )
        .to(
          portraits,
          {
            y: '-2vh',
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          '.bottom-mosaic-row__portrait--outer-left',
          {
            x: () => (isMobileGallery() ? mobileRightImageOffset(3) : -outerOffset()),
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          '.bottom-mosaic-row__portrait--left',
          {
            x: () => (isMobileGallery() ? mobileRightImageOffset(1) : -innerOffset()),
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          '.bottom-mosaic-row__portrait--right',
          {
            x: () => (isMobileGallery() ? mobileRightImageOffset(2) : innerOffset()),
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          '.bottom-mosaic-row__portrait--outer-right',
          {
            x: () => (isMobileGallery() ? mobileRightImageOffset(4) : outerOffset()),
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          shell,
          {
            y: '-9vh',
            duration: 0.38,
            ease: 'none',
          },
          0.82,
        )
        .to(
          portraits,
          {
            y: '-9vh',
            duration: 0.38,
            ease: 'none',
          },
          0.82,
        );
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="bottom-gallery" className="bottom-gallery" ref={sectionRef} aria-label="Product gallery mosaic">
      <div className="bottom-mosaic-row__stage">
        <div className="bottom-mosaic-row__shell">
          <figure className="bottom-mosaic-row__slide">
            <img src={bottomGalleryImage} alt="" />
          </figure>
        </div>

        <figure className="bottom-mosaic-row__portrait bottom-mosaic-row__portrait--outer-left" aria-hidden="true">
          <img src={bottomGalleryImage} alt="" />
        </figure>
        <figure className="bottom-mosaic-row__portrait bottom-mosaic-row__portrait--left" aria-hidden="true">
          <img src={bottomGalleryImage} alt="" />
        </figure>
        <figure className="bottom-mosaic-row__portrait bottom-mosaic-row__portrait--right" aria-hidden="true">
          <img src={bottomGalleryImage} alt="" />
        </figure>
        <figure className="bottom-mosaic-row__portrait bottom-mosaic-row__portrait--outer-right" aria-hidden="true">
          <img src={bottomGalleryImage} alt="" />
        </figure>

        <div className="bottom-mosaic-row__overlay">
          <h2>
            <span className="bottom-mosaic-row__headline-medium">Designed to</span>{' '}
            <span className="bottom-mosaic-row__headline-italic">Elevate your Space</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export function MotionElevateStrip({ afterHeading = null, showHeading = true, showRail = true } = {}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const railRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const rail = railRef.current;

    if (!section) {
      return undefined;
    }

    let draggable;
    let revealFrame = 0;
    let revealObserver;
    let revealInterval = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasColorHandoff = showHeading && !showRail && Boolean(afterHeading);

    const getBounds = () => {
      if (!viewport || !rail) {
        return {
          minX: 0,
          maxX: 0,
        };
      }

      const sectionWidth = viewport.clientWidth;
      const railWidth = rail.scrollWidth;
      const minX = Math.min(0, sectionWidth - railWidth);

      return {
        minX,
        maxX: 0,
      };
    };

    const applyBounds = () => {
      if (!viewport || !rail) {
        return;
      }

      const bounds = getBounds();

      gsap.set(rail, {
        x: gsap.utils.clamp(bounds.minX, bounds.maxX, gsap.getProperty(rail, 'x')),
      });

      draggable?.applyBounds(bounds);
    };

    const updateReveal = () => {
      if (revealFrame) {
        window.cancelAnimationFrame(revealFrame);
      }

      revealFrame = window.requestAnimationFrame(() => {
        revealFrame = 0;

        if (reduceMotion) {
          section.classList.add('is-visible');
          return;
        }

        const rect = section.getBoundingClientRect();
        const shouldReveal = rect.top <= window.innerHeight * 0.78 && rect.bottom >= window.innerHeight * 0.18;
        section.classList.toggle('is-visible', shouldReveal);
      });
    };

    const context = gsap.context(() => {
      if (viewport && rail) {
        gsap.set(rail, { x: 0, force3D: true });

        [draggable] = Draggable.create(rail, {
          type: 'x',
          bounds: getBounds(),
          inertia: true,
          edgeResistance: 0.86,
          cursor: 'grab',
          activeCursor: 'grabbing',
          allowNativeTouchScrolling: true,
          zIndexBoost: false,
        });

        applyBounds();
      }

      if (hasColorHandoff) {
        const heading = section.querySelector('.motion-elevate-strip__heading');
        const headingText = section.querySelector('.motion-elevate-strip__heading h2');
        const colorSelector = section.querySelector('.blank-color-selector');
        const colorInner = section.querySelector('.blank-color-selector__inner');
        const colorHero = section.querySelector('.blank-color-selector__hero');
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        if (!heading || !headingText || !colorSelector || !colorInner || !colorHero || !isDesktop) {
          return;
        }

        if (reduceMotion) {
          gsap.set([heading, headingText, colorInner, colorHero], { clearProps: 'all' });
          return;
        }

        gsap.set(heading, { autoAlpha: 1 });
        gsap.set(headingText, { clearProps: 'transform' });
        gsap.set(colorInner, {
          scale: 0.72,
          transformOrigin: '50% 50%',
          force3D: true,
        });
        gsap.set(colorHero, { clearProps: 'transform' });

        gsap.timeline({
          scrollTrigger: {
            trigger: colorSelector,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
          .to(colorInner, {
            scale: 1,
            y: () => Math.max(0, (window.innerHeight - colorInner.offsetHeight) / 2),
            duration: 1,
            ease: 'sine.inOut',
          }, 0)
          .to(heading, {
            autoAlpha: 0,
            duration: 0.72,
            ease: 'sine.inOut',
          }, 0);
      }
    }, section);

    section.classList.add('motion-elevate-strip--animated');
    updateReveal();

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        section.classList.toggle('is-visible', reduceMotion || entry.isIntersecting);
      }, {
        rootMargin: '-18% 0px -18% 0px',
        threshold: [0, 0.1],
      });
      revealObserver.observe(section);
    }

    revealInterval = window.setInterval(() => {
      updateReveal();
    }, 160);
    window.addEventListener('resize', applyBounds);
    window.addEventListener('resize', updateReveal);
    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('blank:smooth-scroll', updateReveal);

    return () => {
      window.removeEventListener('resize', applyBounds);
      window.removeEventListener('resize', updateReveal);
      window.removeEventListener('scroll', updateReveal);
      window.removeEventListener('blank:smooth-scroll', updateReveal);
      window.clearInterval(revealInterval);
      revealObserver?.disconnect();
      if (revealFrame) {
        window.cancelAnimationFrame(revealFrame);
      }
      draggable?.kill();
      context.revert();
    };
  }, []);

  return (
    <section
      className={`motion-elevate-strip${afterHeading ? ' motion-elevate-strip--with-after-heading' : ''}${!showHeading ? ' motion-elevate-strip--rail-only' : ''}${!showRail ? ' motion-elevate-strip--without-rail' : ''}`}
      data-node-id="10314:11990"
      aria-label="Designed to Elevate your Space"
      ref={sectionRef}
    >
      {showHeading ? (
        <div className="motion-elevate-strip__heading" data-node-id="10314:11992">
          <h2>
            <span className="motion-elevate-strip__line-mask">
              <span className="motion-elevate-strip__line-inner motion-elevate-strip__headline-medium">
                Designed to
              </span>
            </span>
            <span className="motion-elevate-strip__line-mask">
              <span className="motion-elevate-strip__line-inner motion-elevate-strip__headline-italic">
                Elevate your Space.
              </span>
            </span>
          </h2>
        </div>
      ) : null}

      {afterHeading}

      {showRail ? (
        <div className="motion-elevate-strip__viewport" ref={viewportRef}>
          <div className="motion-elevate-strip__rail" data-node-id="10314:12076" aria-hidden="true" ref={railRef}>
            {motionElevateImages.map((image, index) => (
              <figure className="motion-elevate-strip__card" key={image.desktop}>
                <picture>
                  <source media="(max-width: 767px)" srcSet={image.mobile} />
                  <img src={image.desktop} alt="" loading={index < 3 ? 'eager' : 'lazy'} />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MotionFooterSection() {
  return (
    <section className="motion-footer-section" aria-label="Footer">
      <TestingFooter variant="reversed" />
    </section>
  );
}

export default function MotionPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'the Smart Kettle\u2122 Luxe';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main
      data-experience="motion"
      className="testing-page testing-page--two motion-page motion-page--hero-reveal motion-page--hero-reference-handoff"
    >
      <MotionHero />
      <MotionOverview />
      <FeaturesV2Layer />
      <MotionElevateStrip />
      <MotionFooterSection />
      <ProductStickyButton className="motion-expanding-sticky" releaseSelector=".motion-elevate-strip" />
    </main>
  );
}

