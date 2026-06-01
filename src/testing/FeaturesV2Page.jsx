import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionTimelinePanel } from './MotionPage.jsx';

const featureV2Frames = {
  intro: 0,
  settings: 73,
  keepWarm: 146,
  softOpening: 365,
  softOpeningCopyStart: 367,
  bpaFreeCopyStart: 606,
  bpaFree: 678,
};

const featureV2Copy = [
  {
    key: 'current',
    title: '5 Varietal Settings',
    body: 'Pre-programmed and customizable One-touch functionalities create ideal brewing conditions for Black, Green, White or Oolong teas and French Press Coffee.',
  },
  {
    key: 'next',
    title: 'Keep Warm Button',
    body: 'One-touch functionality keeps your water warm for 20 minutes and can be activated before during or on completion of the water heating cycle.',
  },
  {
    key: 'luxe',
    title: 'Luxe Design',
    body: 'Sculptural form Premium finishes. Made to be seen, and used every day.',
  },
  {
    key: 'soft',
    title: 'Soft Opening\u2122 Lid',
    body: 'A bubbling brew presents a few hazards on the way from kettle to cup. This specialized lid gently releases steam and eliminates splashing.',
  },
  {
    key: 'bpa',
    title: 'BPA Free Material',
    body: "Dual sided, high visibility water windows make is easy to make sure you don't heat more water than you need. Made from BPA Free materials.",
  },
];

const featureV2Durations = {
  settingsHold: 0.8,
  bpaSequence: 4.9,
};

function framePath(frame) {
  return `/assets/sequences/full_sequnece/full_sequnece_${String(frame).padStart(5, '0')}.jpg`;
}

function FeaturesV2CopyBlock() {
  return (
    <div className="motion-copy-block" data-name="features v2 copy block">
      <div className="motion-copy-block__content">
        {featureV2Copy.map((item, index) => (
          <div
            className={`motion-copy-block__state motion-copy-block__state--${item.key}`}
            aria-hidden={index === 0 ? undefined : true}
            data-v2-copy-state={item.key}
            key={item.key}
          >
            <h2 className="motion-copy-block__title">
              <span className="motion-copy-block__line-mask motion-copy-block__title-line">
                <span className="motion-copy-block__line-inner">{item.title}</span>
              </span>
            </h2>
            <p className="motion-copy-block__body">
              <span className="motion-copy-block__line-mask motion-copy-block__body-line">
                <span className="motion-copy-block__line-inner">{item.body}</span>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesV2Sequence({ timelineId = 'features-v2-timeline' } = {}) {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = section?.closest('.motion-features-layer');
    const media = mediaRef.current;
    const canvas = canvasRef.current;

    if (!section || !layer || !media || !canvas) {
      return undefined;
    }

    let disposed = false;
    const context = canvas.getContext('2d');
    const frameCount = featureV2Frames.bpaFree + 1;
    const sequenceState = { frame: featureV2Frames.intro };
    let requestedFrame = featureV2Frames.intro;
    let lastDrawnFrame = featureV2Frames.intro;
    const images = Array.from({ length: frameCount }, (_, index) => {
      const image = new Image();
      image.decoding = 'async';
      image.loading = 'eager';
      if ('fetchPriority' in image && index <= featureV2Frames.keepWarm) {
        image.fetchPriority = 'high';
      }
      image.src = framePath(index);
      image.addEventListener('load', () => {
        if (Math.round(requestedFrame) === index) {
          drawFrame(index);
        }
      }, { once: true });
      return image;
    });

    const drawFrame = (frame) => {
      if (disposed || !context) {
        return;
      }

      const frameIndex = gsap.utils.clamp(0, frameCount - 1, Math.round(frame));
      const image = images[frameIndex];
      requestedFrame = frameIndex;

      if (!image?.complete || image.naturalWidth === 0) {
        canvas.dataset.requestedFrame = String(frameIndex);
        canvas.dataset.frame = String(lastDrawnFrame);
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      lastDrawnFrame = frameIndex;
      canvas.dataset.frame = String(frameIndex);
      canvas.dataset.requestedFrame = String(frameIndex);
    };

    const handleFirstFrameLoad = () => {
      if (requestedFrame === featureV2Frames.intro) {
        drawFrame(featureV2Frames.intro);
      }
    };
    images[featureV2Frames.intro].addEventListener('load', handleFirstFrameLoad, { once: true });
    drawFrame(featureV2Frames.intro);

    const preloadInitialFrames = () => {
      images.slice(featureV2Frames.intro, featureV2Frames.keepWarm + 1).forEach((image) => {
        image.decode?.().catch(() => {});
      });
    };
    preloadInitialFrames();

    const gsapContext = gsap.context(() => {
      const copyStates = featureV2Copy.reduce((states, item) => {
        states[item.key] = {
          headline: layer.querySelector(
            `[data-v2-copy-state="${item.key}"] .motion-copy-block__title-line .motion-copy-block__line-inner`,
          ),
          bodyLines: Array.from(
            layer.querySelectorAll(
              `[data-v2-copy-state="${item.key}"] .motion-copy-block__body-line .motion-copy-block__line-inner`,
            ),
          ),
        };
        return states;
      }, {});
      const copyBlock = layer.querySelector('.motion-copy-block');
      const copyInYPercent = 58;
      const copyOutYPercent = -58;
      const copyOutDuration = 0.9;
      const copyInDuration = 1.02;
      const bodyOutDuration = 1.08;
      const bodyInDuration = 1.18;
      const bodyOutOffset = 0.06;
      const copyInOffset = 0.24;
      const bodyInOffset = 0.36;

      const setCopy = (key, visible) => {
        const state = copyStates[key];

        gsap.set([state.headline, ...state.bodyLines], {
          yPercent: visible ? 0 : copyInYPercent,
          autoAlpha: visible ? 1 : 0,
        });
      };

      const handoffCopy = (timeline, fromKey, toKey, at) => {
        const from = copyStates[fromKey];
        const to = copyStates[toKey];

        timeline.to(from.headline, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: copyOutDuration,
          ease: 'sine.inOut',
        }, at);

        timeline.to(from.bodyLines, {
          autoAlpha: 0,
          yPercent: copyOutYPercent,
          duration: bodyOutDuration,
          ease: 'sine.inOut',
        }, `${at}+=${bodyOutOffset}`);

        timeline.to(to.headline, {
          autoAlpha: 1,
          yPercent: 0,
          duration: copyInDuration,
          ease: 'sine.inOut',
        }, `${at}+=${copyInOffset}`);

        timeline.to(to.bodyLines, {
          autoAlpha: 1,
          yPercent: 0,
          duration: bodyInDuration,
          ease: 'sine.inOut',
        }, `${at}+=${bodyInOffset}`);
      };

      featureV2Copy.forEach((item, index) => setCopy(item.key, index === 0));
      gsap.set(media, { y: 0, scale: 1 });

      gsap.to(sequenceState, {
        frame: featureV2Frames.settings,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
        scrollTrigger: {
          id: `${timelineId}-intro`,
          trigger: layer,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onEnter: () => drawFrame(sequenceState.frame),
          onLeave: () => {
            sequenceState.frame = featureV2Frames.settings;
            drawFrame(featureV2Frames.settings);
          },
          onLeaveBack: () => {
            sequenceState.frame = featureV2Frames.intro;
            drawFrame(featureV2Frames.intro);
          },
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
          refreshPriority: 2,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: timelineId,
          trigger: layer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 3,
          onEnter: () => {
            sequenceState.frame = featureV2Frames.settings;
            drawFrame(featureV2Frames.settings);
          },
          onUpdate: (self) => {
            if (self.isActive && self.progress <= 0.001 && sequenceState.frame < featureV2Frames.settings) {
              sequenceState.frame = featureV2Frames.settings;
              drawFrame(featureV2Frames.settings);
            }
          },
        },
      });

      timeline.addLabel('settings', 0);
      timeline.to({}, { duration: featureV2Durations.settingsHold }, 'settings');

      timeline.addLabel('keepWarmHandoff');
      handoffCopy(timeline, 'current', 'next', 'keepWarmHandoff');
      timeline.fromTo(
        sequenceState,
        { frame: featureV2Frames.settings },
        {
          frame: featureV2Frames.keepWarm,
          duration: 1.45,
          ease: 'none',
          immediateRender: false,
          onStart: () => {
            sequenceState.frame = featureV2Frames.settings;
            drawFrame(featureV2Frames.settings);
          },
          onUpdate: () => drawFrame(sequenceState.frame),
        },
        'keepWarmHandoff',
      );

      timeline.addLabel('keepWarm');
      timeline.to({}, { duration: 0.9 }, 'keepWarm');

      timeline.addLabel('luxeDesign');
      handoffCopy(timeline, 'next', 'luxe', 'luxeDesign');
      timeline.to(sequenceState, {
        frame: featureV2Frames.softOpening,
        duration: 4.8,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
      }, 'luxeDesign');

      timeline.to(sequenceState, {
        frame: featureV2Frames.softOpeningCopyStart,
        duration: 0.08,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
      });

      timeline.addLabel('softOpening');
      handoffCopy(timeline, 'luxe', 'soft', 'softOpening');
      timeline.to({}, { duration: 1.35 }, 'softOpening');

      const bpaCopyStartOffset = featureV2Durations.bpaSequence * (
        (featureV2Frames.bpaFreeCopyStart - featureV2Frames.softOpeningCopyStart)
        / (featureV2Frames.bpaFree - featureV2Frames.softOpeningCopyStart)
      );

      timeline.addLabel('bpaSequence');
      timeline.to(sequenceState, {
        frame: featureV2Frames.bpaFree,
        duration: featureV2Durations.bpaSequence,
        ease: 'none',
        onUpdate: () => drawFrame(sequenceState.frame),
      }, 'bpaSequence');

      timeline.addLabel('bpaFree', `bpaSequence+=${bpaCopyStartOffset}`);
      handoffCopy(timeline, 'soft', 'bpa', 'bpaFree');

      timeline.addLabel('complete');
      timeline.to({}, { duration: 1.15 }, 'complete');
    }, section);

    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      images[featureV2Frames.intro].removeEventListener('load', handleFirstFrameLoad);
      gsapContext.revert();
    };
  }, [timelineId]);

  return (
    <section
      className="motion-features-a features-v2-sequence"
      aria-label="Features v2 single image sequence"
      ref={sectionRef}
    >
      <div ref={mediaRef} className="motion-features-a__media">
        <canvas
          ref={canvasRef}
          className="motion-features-a__sequence"
          aria-label="Smart Kettle Luxe feature sequence"
        />
      </div>
    </section>
  );
}

export function FeaturesV2Layer() {
  return (
    <div className="motion-features-layer motion-features-layer--v2">
      <FeaturesV2CopyBlock />
      <FeaturesV2Sequence timelineId="features-v2-timeline" />
    </div>
  );
}

export default function FeaturesV2Page() {
  return (
    <main
      data-experience="features-v2"
      className="testing-page testing-page--two features-v2-page"
    >
      <div className="features-page__intro-spacer" aria-hidden="true" />
      <FeaturesV2Layer />
      <MotionTimelinePanel
        pageSelector=".features-v2-page"
        featureTimelineId="features-v2-timeline"
        title="V2"
      />
    </main>
  );
}
