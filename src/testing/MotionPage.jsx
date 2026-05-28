import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestingFooter, TestingInfoAccordion } from './MotionSupport.jsx';

gsap.registerPlugin(ScrollTrigger);

const motionLuxeImages = [
  '/assets/images/luxe temp/01.png',
  '/assets/images/luxe temp/02.png',
  '/assets/images/luxe temp/03.png',
  '/assets/images/luxe temp/04.png',
  '/assets/images/luxe temp/05.png',
];

function MotionMobileChrome() {
  return (
    <>
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

      <nav className="testing-mobile-bottom-nav" aria-label="Mobile quick purchase" data-node-id="9968:21871">
        <p className="testing-mobile-bottom-nav__price" data-node-id="9968:21874">$219.95</p>
        <button className="testing-mobile-bottom-nav__button" type="button" data-node-id="9968:21875">
          Buy
        </button>
      </nav>
    </>
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

function MotionHero() {
  return (
    <section className="testing-scroll motion-hero" aria-label="Motion hero">
      <MotionDesktopNav />
      <div className="testing-scroll__stage">
        <div className="testing-scroll__background">
          <img
            className="testing-scroll__hero-media"
            src="/assets/images/hero-kettle.png"
            alt="the Smart Kettle Luxe on a sculpted white pedestal"
          />
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

    const context = gsap.context(() => {
      const title = section.querySelector('.motion-overview__title');
      const leftImage = section.querySelector('.testing-scroll__image--left');
      const topImage = section.querySelector('.testing-scroll__image--top');
      const rightImage = section.querySelector('.testing-scroll__image--right');
      const extraOne = section.querySelector('.testing-scroll__image--extra-one');
      const extraTwo = section.querySelector('.testing-scroll__image--extra-three');
      const images = [leftImage, topImage, rightImage, extraOne, extraTwo].filter(Boolean);
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
        gsap.set([title, ...images], { clearProps: 'all', autoAlpha: 1 });
        return;
      }

      gsap.set(title, { autoAlpha: 1, y: 0 });
      gsap.set(images, { opacity: 1 });

      if (isMobile) {
        gsap.set(leftImage, { xPercent: -180, yPercent: 100 });
        gsap.set(topImage, { xPercent: 150, yPercent: -120 });
        gsap.set(rightImage, { xPercent: 170, yPercent: 120 });
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
        }).to(
          title,
          {
            y: () => -(window.innerHeight * 0.29),
            duration: 0.72,
            ease: 'none',
          },
          0.18,
        );

        gsap.to(title, {
          y: () => -(window.innerHeight * 0.36),
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section.closest('.motion-page') || section,
            start: () => (document.documentElement.scrollHeight - window.innerHeight) * 0.27,
            end: () => (document.documentElement.scrollHeight - window.innerHeight) * 0.3,
            scrub: 0.45,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
        });
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
          extraTwo,
          {
            y: '-136vh',
            duration: scrollTiming.redRightExitDuration,
            ease: 'none',
          },
          isMobile ? scrollTiming.redExitAt : scrollTiming.redExitAt + 0.1,
        );

    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
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
          <figure className="testing-scroll__image testing-scroll__image--extra testing-scroll__image--extra-three" />
        </div>

        <h2 className="motion-overview__title" data-node-id="10177:38606">
          <span className="motion-overview__title-strong">Precision </span>
          <span className="motion-overview__title-script">in Every Pour</span>
        </h2>
      </div>
    </section>
  );
}

function MotionFeaturesA() {
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
    const sequenceEndFrame = 72;
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

      const sectionTop = section.getBoundingClientRect().top;
      const copyTop = copyContent.getBoundingClientRect().top;
      section.style.setProperty('--motion-luxe-bottom', `${Math.max(40, copyTop - sectionTop)}px`);
    };

    const gsapContext = gsap.context(() => {
      gsap.set(media, { y: 0 });
      gsap.set(featureB, { autoAlpha: 0, y: () => window.innerHeight });

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
      const luxeTiles = Array.from(layer.querySelectorAll('.motion-luxe-strip__tile'));
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

      gsap.set(currentCopyLines, { yPercent: 0 });
      gsap.set(nextCopyLines, { yPercent: 110 });
      gsap.set(luxeCopyLines, { yPercent: 110 });
      gsap.set(softCopyLines, { yPercent: 110 });
      gsap.set(bpaCopyLines, { yPercent: 110 });
      gsap.set(copyBlock, { y: 0 });
      gsap.set(colorPanel, { autoAlpha: 0 });
      gsap.set(colorPanelLines, { yPercent: 110 });
      gsap.set(colorSwatches, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(luxeTiles, { scaleY: 0, transformOrigin: '50% 0%' });

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

      const getSequenceStart = () => ScrollTrigger.maxScroll(window) * 0.32;
      const getSequenceEnd = () => {
        const layerTop = layer.getBoundingClientRect().top + window.scrollY;
        return Math.max(layerTop, getSequenceStart() + window.innerHeight * 0.25);
      };

      gsap.to(sequenceState, {
        frame: sequenceEndFrame,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
        scrollTrigger: {
          trigger: document.documentElement,
          start: getSequenceStart,
          end: getSequenceEnd,
          scrub: 0.85,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

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
          trigger: layer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      timeline.to({}, {
        duration: 0.85,
      });

      timeline.addLabel('copyHandoff');

      timeline.to(currentHeadline, {
        yPercent: -110,
        duration: 0.42,
        ease: 'power3.inOut',
      }, 'copyHandoff');

      timeline.to(currentBodyLines, {
        yPercent: -110,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.inOut',
      }, 'copyHandoff+=0.12');

      timeline.to(nextHeadline, {
        yPercent: 0,
        duration: 0.48,
        ease: 'power3.out',
      }, 'copyHandoff+=0.48');

      timeline.to(nextBodyLines, {
        yPercent: 0,
        duration: 0.62,
        stagger: 0.075,
        ease: 'power3.out',
      }, 'copyHandoff+=0.62');

      timeline.to(sequenceState, {
        frame: frameCount - 1,
        duration: 0.78,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
      }, 'copyHandoff+=0.62');

      timeline.addLabel('kettleLift');

      timeline.to(media, {
        y: () => -(window.innerHeight * 0.5 + media.offsetHeight * 0.65),
        duration: 2.1,
        ease: 'power4.in',
      }, 'kettleLift');

      timeline.addLabel('luxeHandoff', 'kettleLift+=0.85');

      timeline.to(nextHeadline, {
        yPercent: -110,
        duration: 0.42,
        ease: 'power3.inOut',
      }, 'luxeHandoff');

      timeline.to(nextBodyLines, {
        yPercent: -110,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.inOut',
      }, 'luxeHandoff+=0.12');

      timeline.to(luxeHeadline, {
        yPercent: 0,
        duration: 0.48,
        ease: 'power3.out',
      }, 'luxeHandoff+=0.48');

      timeline.to(luxeTiles, {
        scaleY: 1,
        duration: 0.78,
        stagger: 0.075,
        ease: 'power3.out',
      }, 'luxeHandoff+=1.1');

      timeline.to(luxeBodyLines, {
        yPercent: 0,
        duration: 0.62,
        stagger: 0.075,
        ease: 'power3.out',
      }, 'luxeHandoff+=0.62');

      timeline.addLabel('luxeBoxesHold', 'luxeHandoff+=2.2');

      timeline.to({}, {
        duration: 0.55,
      }, 'luxeBoxesHold');

      timeline.set(featureB, {
        y: () => window.innerHeight,
      });

      timeline.to(featureB, {
        autoAlpha: 1,
        duration: 0.01,
        ease: 'none',
      });

      timeline.addLabel('softHandoff');

      timeline.to(luxeTiles, {
        scaleY: 0,
        duration: 0.9,
        stagger: 0.075,
        ease: 'power3.inOut',
      }, 'softHandoff');

      timeline.to(featureB, {
        y: 0,
        duration: 1.1,
        ease: 'power2.inOut',
      }, 'softHandoff');

      timeline.to(luxeHeadline, {
        yPercent: -110,
        duration: 0.42,
        ease: 'power3.inOut',
      }, 'softHandoff');

      timeline.to(luxeBodyLines, {
        yPercent: -110,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.inOut',
      }, 'softHandoff+=0.12');

      timeline.to(softHeadline, {
        yPercent: 0,
        duration: 0.48,
        ease: 'power3.out',
      }, 'softHandoff+=0.48');

      timeline.to(softBodyLines, {
        yPercent: 0,
        duration: 0.62,
        stagger: 0.075,
        ease: 'power3.out',
      }, 'softHandoff+=0.62');

      timeline.to({}, {
        duration: 0.65,
      });

      timeline.addLabel('bpaHandoff');

      timeline.to(softHeadline, {
        yPercent: -110,
        duration: 0.42,
        ease: 'power3.inOut',
      }, 'bpaHandoff');

      timeline.to(softBodyLines, {
        yPercent: -110,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.inOut',
      }, 'bpaHandoff+=0.12');

      timeline.to(bpaHeadline, {
        yPercent: 0,
        duration: 0.48,
        ease: 'power3.out',
      }, 'bpaHandoff+=0.48');

      timeline.to(bpaBodyLines, {
        yPercent: 0,
        duration: 0.62,
        stagger: 0.075,
        ease: 'power3.out',
      }, 'bpaHandoff+=0.62');

      timeline.to(featureBState, {
        frame: featureBFrameCount - 1,
        duration: 1.8,
        ease: 'none',
        onUpdate: () => drawFeatureBFrame(featureBState.frame),
      }, 'bpaHandoff+=0.48');

      timeline.addLabel('bpaExit');

      timeline.to(bpaHeadline, {
        yPercent: -110,
        duration: 0.42,
        ease: 'power3.inOut',
      }, 'bpaExit');

      timeline.to(bpaBodyLines, {
        yPercent: -110,
        duration: 0.52,
        stagger: 0.07,
        ease: 'power3.inOut',
      }, 'bpaExit+=0.12');

      timeline.to(colorPanel, {
        autoAlpha: 1,
        duration: 0.01,
        ease: 'none',
      });

      timeline.to(colorPanelLines, {
        yPercent: 0,
        duration: 0.48,
        stagger: 0.08,
        ease: 'power3.out',
      });

      timeline.to(colorSwatches, {
        scale: 1,
        duration: 0.46,
        stagger: 0.045,
        ease: 'back.out(1.4)',
      }, '<0.1');
    }, section);

    updateLuxeBounds();
    window.addEventListener('resize', updateLuxeBounds);
    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      images[0].removeEventListener('load', handleFirstFrameLoad);
      featureBImages[0].removeEventListener('load', handleFeatureBFirstFrameLoad);
      window.removeEventListener('resize', updateLuxeBounds);
      gsapContext.revert();
      removeColorSwatchHandlers();
    };
  }, []);

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
    { slug: 'brushed', label: 'Brushed Stainless Steel' },
    { slug: 'black', label: 'Black Stainless Steel' },
    { slug: 'white', label: 'Sea Salt' },
    { slug: 'navy', label: 'Damson Blue' },
    { slug: 'stone', label: 'Oyster Shell' },
    { slug: 'olive', label: 'Olive Tapenade' },
    { slug: 'black-steel', label: 'Black Truffle' },
    { slug: 'champagne', label: 'Champagne' },
    { slug: 'navy-champagne', label: 'Damson Blue and Champagne' },
    { slug: 'olive-champagne', label: 'Olive Tapenade and Champagne' },
    { slug: 'steel-champagne', label: 'Stainless Steel and Champagne' },
    { slug: 'citrus', label: 'Citrus' },
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
                <span className="motion-copy-block__swatch-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MotionFeaturesLayer() {
  return (
    <div className="motion-features-layer">
      <MotionCopyBlock />
      <MotionFeaturesA />
    </div>
  );
}

function MotionTimelinePanel() {
  const progressRef = useRef(null);

  useEffect(() => {
    const output = progressRef.current;
    const page = document.querySelector('.motion-page');

    if (!output || !page) {
      return undefined;
    }

    const trigger = ScrollTrigger.create({
      trigger: page,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        output.textContent = `${(self.progress * 100).toFixed(1)}%`;
      },
    });

    output.textContent = `${(trigger.progress * 100).toFixed(1)}%`;

    return () => trigger.kill();
  }, []);

  return (
    <aside className="testing-debug motion-timeline-panel" aria-label="Motion timeline debug panel">
      <span className="testing-debug__label">Progress</span>
      <output ref={progressRef} className="testing-debug__value">
        0.0%
      </output>
    </aside>
  );
}

function MotionAccordionSection() {
  return (
    <section className="motion-accordion-section" aria-label="Product information">
      <TestingInfoAccordion />
    </section>
  );
}

function MotionFooterSection() {
  return (
    <section className="motion-footer-section" aria-label="Footer">
      <TestingFooter />
    </section>
  );
}

export default function MotionPage() {
  return (
    <main
      data-experience="motion"
      className="testing-page testing-page--two motion-page motion-page--hero-reveal motion-page--hero-reference-handoff"
    >
      <MotionMobileChrome />
      <MotionHero />
      <MotionOverview />
      <MotionFeaturesLayer />
      <MotionAccordionSection />
      <MotionFooterSection />
      <MotionTimelinePanel />
    </main>
  );
}
