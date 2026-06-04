import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContextualMenu from './ContextualMenu.jsx';
import { MotionElevateStrip, MotionHero } from './testing/MotionPage.jsx';
import { TestingFooter } from './testing/MotionSupport.jsx';

gsap.registerPlugin(ScrollTrigger);

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

const softLidPauseFrame = 38;
const softLidEndFrame = 226;
const softLidFramePath = (frame) => (
  `/assets/sequences/features-b-straight/frame_${String(frame).padStart(4, '0')}.jpg`
);
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

      if (reduceMotion) {
        gsap.set([stage, copy, ...titleWords, ...copyLines], { clearProps: 'all' });
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
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

      const videoGallery = document.querySelector('.blank-gallery--placeholder');

      if (videoGallery) {
        const videoStage = videoGallery.querySelector('.blank-gallery__stage');
        const setCopyHeld = (isHeld) => {
          copy.classList.toggle('is-copy-held', isHeld);
          stage.classList.toggle('is-copy-held-stage', isHeld);
        };

        gsap.set(videoStage, {
          scale: isDesktopPrecisionLayout ? 0.5 : 1,
          transformOrigin: '50% 100%',
        });

        ScrollTrigger.create({
          trigger: videoGallery,
          start: isDesktopPrecisionLayout ? 'top bottom+=340' : 'top bottom',
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

          gsap.set(copy, { autoAlpha: opacity, overwrite: 'auto' });
          gsap.set(videoStage, { scale: videoScale, overwrite: 'auto' });
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
      gsap.set(copyLines, { autoAlpha: 0, yPercent: 112 });

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
          yPercent: 0,
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
    <section className="blank-precision" aria-label="Precision in every pour" ref={sectionRef}>
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

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
          return;
        }

        video.pause();
      },
      { threshold: 0.18 },
    );

    observer.observe(video);

    return () => observer.disconnect();
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
            preload="metadata"
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

      section.classList.toggle('is-visible', shouldReveal);
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

function BlankSoftLidSection({
  className = '',
  desktopOnly = false,
  fillImageHeight = false,
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
      const navTop = navBar?.getBoundingClientRect().top ?? (window.innerHeight - 76);
      const copyHeight = nextCopy.getBoundingClientRect().height;
      const finalFrameTop = (window.innerHeight / 2) - 295.5 - 431;
      const visualShadowBottom = finalFrameTop + (862 * 0.81);
      const availableSpace = navTop - visualShadowBottom;
      const centeredTop = visualShadowBottom + ((availableSpace - copyHeight) / 2);
      const top = Math.max(visualShadowBottom + 16, centeredTop);

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

    const context = gsap.context(() => {
      updateMobileBpaCopyTop();
      gsap.set(currentCopy, { autoAlpha: 1, y: 0 });
      gsap.set(nextCopy, { autoAlpha: 0, y: 22 });
      gsap.set(image, { transformOrigin: '50% 0%', scale: 1 });

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

      if (isMobileFeatureLayout) {
        timeline
          .to(frameState, {
            frame: softLidPauseFrame,
            duration: 0.38,
            ease: 'none',
            onUpdate: () => drawFrame(frameState.frame),
          }, 0)
          .to(image, {
            top: 0,
            width: 746,
            height: 745,
            duration: 0.38,
            ease: 'none',
          }, 0)
          .to(currentCopy, {
            autoAlpha: 0,
            y: -220,
            duration: 0.38,
            ease: 'none',
          }, 0)
          .to({}, { duration: 0.34 })
          .set(currentCopy, { autoAlpha: 0, y: -220 })
          .set(nextCopy, { autoAlpha: 0, y: 22 })
          .to(frameState, {
            frame: 128,
            duration: 0.28,
            ease: 'none',
            onUpdate: () => drawFrame(frameState.frame),
          })
          .to(frameState, {
            frame: softLidEndFrame,
            duration: 0.24,
            ease: 'none',
            onUpdate: () => drawFrame(frameState.frame),
          })
          .to(image, {
            top: 'calc(50% - 295.5px)',
            left: 'calc(54.17% + 3.75px)',
            width: 862,
            height: 862,
            xPercent: -50,
            yPercent: -50,
            duration: 0.24,
            ease: 'none',
          }, '<')
          .to(nextCopy, {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
            ease: 'sine.inOut',
          })
          .to({}, { duration: 0.3 });

        return;
      }

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
      firstFrame.removeEventListener('load', handleFirstFrameLoad);
      context.revert();
    };
  }, []);

  return (
    <section
      className={`blank-soft-lid${desktopOnly ? ' blank-soft-lid--desktop-only' : ''}${fillImageHeight ? ' blank-soft-lid--fill-height' : ''}${className ? ` ${className}` : ''}`}
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

export default function BlankPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const currentImage = galleryImages[activeImage];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Luxe Design Experiment';

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

  const showPreviousImage = () => {
    setActiveImage((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
  };

  const showNextImage = () => {
    setActiveImage((index) => (index + 1) % galleryImages.length);
  };

  return (
    <main
      className={`blank-page${isHeaderHidden ? ' is-header-hidden' : ''}`}
      aria-label="Blank component workspace"
    >
      <MotionHero
        className="blank-hero"
        desktopHeroSrc="/assets/images/hero%20images/destktop_hero.png"
        mobileHeroSrc="/assets/images/hero%20images/mobile_hero.png"
      />

      <BlankPrecisionSection />

      <BlankGallerySection
        currentImage={currentImage}
        showPreviousImage={showPreviousImage}
        showNextImage={showNextImage}
        dataName="Gallery Before Header"
        isPlaceholder
        placeholderVideo={{
          desktop: '/assets/videos/desktop_warm.mp4',
          mobile: '/assets/videos/mobile_warm.mp4',
          label: 'Smart Kettle Luxe warm lifestyle video',
        }}
      />

      <BlankSoftOpeningDesktopSection />

      <BlankGalleryHeaderSection />

      <BlankGallerySection
        currentImage={currentImage}
        showPreviousImage={showPreviousImage}
        showNextImage={showNextImage}
      />

      <BlankSoftLidSection />

      <MotionElevateStrip />

      <section className="motion-footer-section" aria-label="Footer">
        <TestingFooter variant="reversed" />
      </section>

      <ContextualMenu />
      <BlankSmoothScroll />
    </main>
  );
}
