import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const technicalSpecs = [
  ['Dimensions (WxDxH)', '7.1" x 9.6" x 9.9"'],
  ['Material', 'Brushed Stainless Steel'],
  ['Capacity', '57 oz. / 1.7 liter / 7 Cup Capacity'],
  ['Power', '1500 Watts'],
  ['Voltage', '110-120 Volts'],
];

const includedItems = [
  ['Kettle body', '7 cup stainless steel kettle'],
  ['Power base', 'Cordless 360 degree multi-directional base'],
  ['Care guide', 'Use and care documentation'],
  ['Warranty', 'Limited product warranty'],
];

const faqItems = [
  ['Can I hold a selected temperature?', 'Yes. The keep warm control holds water temperature for repeat pours.'],
  ['Does the lid open slowly?', 'Yes. The soft opening lid releases steam gradually and reduces splash-back.'],
  ['Can I choose tea-specific settings?', 'Yes. Preset controls support green, white, oolong, black tea, and French press.'],
];

const productInfoSections = [
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    items: faqItems,
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
    id: 'reviews',
    title: 'Review Highlights',
    variant: 'reviews',
    pros: [
      ['Satisfaction', '47 reviews', "I've owned Breville Kettle for many years and I'm sure I'll love this one for years to come!"],
      ['Appearance', '15 reviews', "And it's beautiful too!"],
      ['Color', '10 reviews', 'Love it/Color'],
    ],
    cons: [
      ['Price', '3 reviews', 'Very disappointed with such an expensive kettle.'],
    ],
  },
  {
    id: 'compare',
    title: 'Compare Kettles',
    variant: 'compare',
    items: [
      {
        name: 'The Soft Top Pure',
        eyebrow: 'Currently Viewing',
        image: '/assets/images/specs-kettle-2.png',
        summary: 'Precision presets with soft-opening comfort.',
        stats: ['7 cup capacity', '1500 Watts', '5 presets'],
      },
      {
        name: 'Luxe Collection',
        image: '/assets/images/carousel-blue-kettle.png',
        summary: 'A richer finish for a more expressive counter presence.',
        stats: ['Color finish', 'Keep warm', 'One-touch controls'],
      },
      {
        name: 'Daily Precision',
        image: '/assets/images/features-b-lid-poster.png',
        summary: 'Compact control for repeatable tea and coffee rituals.',
        stats: ['Soft lid', 'Water window', 'Cordless base'],
      },
    ],
  },
];

function ProductSpecsAccordion() {
  const [activeSection, setActiveSection] = useState('specs');
  const [activeTab, setActiveTab] = useState('specs');
  const cardRefs = useRef({});
  const rows = activeTab === 'specs' ? technicalSpecs : includedItems;

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

  const renderInfoSection = (section) => {
    if (section.variant === 'cards') {
      return (
        <div className="product-specs__doc-grid">
          {section.items.map(([title, body]) => (
            <article className="product-specs__doc-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      );
    }

    if (section.variant === 'reviews') {
      return (
        <div className="product-specs__review-panel">
          <div className="product-specs__review-column">
            <h3>Pros</h3>
            {section.pros.map(([label, count, quote]) => (
              <article className="product-specs__review-item" key={label}>
                <h4>
                  {label} <span>{count}</span>
                </h4>
                <p>{quote}</p>
              </article>
            ))}
          </div>
          <div className="product-specs__review-column">
            <h3>Cons</h3>
            {section.cons.map(([label, count, quote]) => (
              <article className="product-specs__review-item" key={label}>
                <h4>
                  {label} <span>{count}</span>
                </h4>
                <p>{quote}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (section.variant === 'compare') {
      return (
        <div className="product-specs__compare-list">
          {section.items.map((item) => (
            <article className="product-specs__compare-item" key={item.name}>
              <h3>
                {item.name}
                {item.eyebrow ? <span>{item.eyebrow}</span> : null}
              </h3>
              <div className="product-specs__compare-row">
                <div className="product-specs__compare-main">
                  <div className="product-specs__compare-media">
                    <img src={item.image} alt="" />
                  </div>
                  <p>{item.summary}</p>
                </div>
                <div className="product-specs__compare-stats">
                  {item.stats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="product-specs__faq-list">
        {section.items.map(([question, answer]) => (
          <div className="product-specs__faq" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="product-specs" aria-label="Product specifications">
      <article
        className={`product-specs__card${activeSection === 'specs' ? ' is-open' : ''}`}
        ref={(node) => {
          cardRefs.current.specs = node;
        }}
      >
        <button
          className="product-specs__header"
          type="button"
          aria-expanded={activeSection === 'specs'}
          aria-controls="product-specs-panel"
          onClick={() => handleSectionToggle('specs')}
        >
          <span>Technical Specifications</span>
          <span className="product-specs__icon" aria-hidden="true" />
        </button>

        <div className="product-specs__panel" id="product-specs-panel">
          <div className="product-specs__divider" />
          <div className="product-specs__panel-grid">
            <div className="product-specs__details">
              <div className="product-specs__tabs" aria-label="Specification views">
                <button
                  className={`product-specs__tab${activeTab === 'specs' ? ' is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('specs')}
                >
                  Specs
                </button>
                <button
                  className={`product-specs__tab${activeTab === 'box' ? ' is-active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab('box')}
                >
                  Included in the box
                </button>
              </div>

              <dl className="product-specs__rows">
                {rows.map(([label, value]) => (
                  <div className="product-specs__row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="product-specs__media">
              <img src="/assets/images/specs-kettle-2.png" alt="" />
            </div>
          </div>
        </div>
      </article>

      {productInfoSections.map((section) => (
        <article
          className={`product-specs__card${activeSection === section.id ? ' is-open' : ''}`}
          key={section.id}
          ref={(node) => {
            cardRefs.current[section.id] = node;
          }}
        >
          <button
            className="product-specs__header"
            type="button"
            aria-expanded={activeSection === section.id}
            aria-controls={`product-${section.id}-panel`}
            onClick={() => handleSectionToggle(section.id)}
          >
            <span>{section.title}</span>
            <span className="product-specs__icon" aria-hidden="true" />
          </button>

          <div className="product-specs__panel product-specs__panel--faq" id={`product-${section.id}-panel`}>
            <div className="product-specs__divider" />
            {renderInfoSection(section)}
          </div>
        </article>
      ))}
    </section>
  );
}

const draggableGridImages = Array.from({ length: 12 }, (_, index) => {
  const frame = 1321317479 + index;

  return {
    title: `Kettle Detail ${String(index + 1).padStart(2, '0')}`,
    src: `/assets/images/grid/Frame%20${frame}.png`,
  };
});

const draggableGridColumns = [0, 1, 2, 3].map((columnIndex) =>
  draggableGridImages.filter((_, imageIndex) => imageIndex % 4 === columnIndex),
);

function DraggableProductGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const viewport = section?.querySelector('.palmer-grid__viewport');

    if (!section || !grid || !viewport) {
      return undefined;
    }

    let disposed = false;
    let dragging = false;
    let dragMoved = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocityX = 0;
    let velocityY = 0;
    let position = { x: 0, y: 0 };
    let bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const setPosition = (x, y, animate = true, duration = 0.45) => {
      position = {
        x: clamp(x, bounds.minX, bounds.maxX),
        y: clamp(y, bounds.minY, bounds.maxY),
      };

      gsap.to(grid, {
        x: position.x,
        y: position.y,
        duration: animate ? duration : 0,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const refreshBounds = () => {
      const sectionRect = viewport.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const padX = Math.min(240, sectionRect.width * 0.18);
      const padY = Math.min(180, sectionRect.height * 0.16);
      const centeredX = (sectionRect.width - grid.offsetWidth) / 2;
      const centeredY = (sectionRect.height - grid.offsetHeight) / 2;

      bounds = {
        minX: Math.min(centeredX, sectionRect.width - grid.offsetWidth - padX),
        maxX: Math.max(centeredX, padX),
        minY: Math.min(centeredY, sectionRect.height - grid.offsetHeight - padY),
        maxY: Math.max(centeredY, padY),
      };

      setPosition(centeredX, centeredY, false);
    };

    const startDrag = (clientX, clientY) => {
      dragging = true;
      dragMoved = false;
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastY = clientY;
      lastTime = performance.now();
      section.classList.add('is-dragging');
      gsap.killTweensOf(grid);
    };

    const moveDrag = (clientX, clientY) => {
      if (!dragging) {
        return;
      }

      const now = performance.now();
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dt = Math.max(16, now - lastTime);
      const totalMove = Math.hypot(clientX - startX, clientY - startY);

      if (totalMove > 6) {
        dragMoved = true;
      }

      velocityX = (dx / dt) * 16;
      velocityY = (dy / dt) * 16;
      setPosition(position.x + dx, position.y + dy, false);
      lastX = clientX;
      lastY = clientY;
      lastTime = now;
    };

    const endDrag = () => {
      if (!dragging) {
        return;
      }

      dragging = false;
      section.classList.remove('is-dragging');
      setPosition(position.x + velocityX * 18, position.y + velocityY * 18, true, 0.86);

      window.setTimeout(() => {
        dragMoved = false;
      }, 0);
    };

    const handleMouseDown = (event) => {
      startDrag(event.clientX, event.clientY);
    };

    const handleMouseMove = (event) => {
      moveDrag(event.clientX, event.clientY);
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      startDrag(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      event.preventDefault();
      moveDrag(touch.clientX, touch.clientY);
    };

    const handleWheel = (event) => {
      const nextX = position.x - event.deltaX * 1.2;
      const nextY = position.y - event.deltaY * 1.2;
      const verticalIntent = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const leavingDown = verticalIntent && event.deltaY > 0 && position.y <= bounds.minY + 2;
      const leavingUp = verticalIntent && event.deltaY < 0 && position.y >= bounds.maxY - 2;

      if (leavingDown || leavingUp) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setPosition(nextX, nextY, true, 0.42);
    };

    const handleClick = (event) => {
      if (dragMoved) {
        return;
      }

      const tile = event.target.closest('.palmer-grid__tile');

      if (!tile) {
        return;
      }

      setSelectedImage({
        src: tile.dataset.src,
        title: tile.dataset.title,
      });
    };

    const ctx = gsap.context(() => {
      refreshBounds();
      gsap.set('.palmer-grid__tile', { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 50%' });
      gsap.set(grid, { scale: 1.18, transformOrigin: '50% 50%' });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 32%',
            scrub: 1.05,
            invalidateOnRefresh: true,
          },
        })
        .to('.palmer-grid__tile', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.78,
          ease: 'none',
          stagger: {
            amount: 0.5,
            from: 'random',
          },
        })
        .to(
          grid,
          {
            scale: 1,
            duration: 1,
            ease: 'none',
          },
          0,
        );
    }, section);

    const handleResize = () => {
      if (disposed) {
        return;
      }

      refreshBounds();
      ScrollTrigger.refresh();
    };

    section.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', endDrag);
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    section.addEventListener('touchend', endDrag);
    section.addEventListener('touchcancel', endDrag);
    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      ctx.revert();
      section.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endDrag);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      section.removeEventListener('touchend', endDrag);
      section.removeEventListener('touchcancel', endDrag);
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="palmer-grid" ref={sectionRef} aria-label="Draggable product image grid">
      <div className="palmer-grid__copy">
        <p>Product Gallery</p>
        <h2>Drag through every detail.</h2>
      </div>

      <div className="palmer-grid__viewport">
        <div className="palmer-grid__grid" ref={gridRef}>
          {draggableGridColumns.map((column, columnIndex) => (
            <div className="palmer-grid__column" key={columnIndex}>
              {column.map((image) => (
                <button
                  className="palmer-grid__tile"
                  data-src={image.src}
                  data-title={image.title}
                  key={image.src}
                  type="button"
                >
                  <img src={image.src} alt="" draggable="false" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`palmer-grid__details${selectedImage ? ' is-open' : ''}`} aria-hidden={!selectedImage}>
        {selectedImage ? (
          <>
            <button
              aria-label="Close selected product detail"
              className="palmer-grid__close"
              type="button"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <div className="palmer-grid__details-media">
              <img src={selectedImage.src} alt="" />
            </div>
            <div className="palmer-grid__details-copy">
              <p>Selected Detail</p>
              <h3>{selectedImage.title}</h3>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function DetailAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const handleToggle = (index) => {
    const nextIndex = activeIndex === index ? -1 : index;
    setActiveIndex(nextIndex);

    if (nextIndex < 0) {
      return;
    }

    window.setTimeout(() => {
      const item = itemRefs.current[nextIndex];

      if (!item) {
        return;
      }

      if (window.__lenis) {
        window.__lenis.scrollTo(item, {
          offset: -window.innerHeight * 0.14,
          duration: 0.9,
          easing: (t) => 1 - (1 - t) ** 3,
        });
      } else {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 220);
  };

  return (
    <section id="details" className="details-accordion" aria-labelledby="details-title">
      <div className="details-accordion__intro">
        <p className="details-accordion__eyebrow">Details</p>
        <h2 id="details-title" className="details-accordion__title">
          Designed for the ritual, tuned for the everyday.
        </h2>
      </div>

      <div className="details-accordion__list">
        {detailAccordionItems.map((item, index) => {
          const isOpen = activeIndex === index;
          const contentId = `details-panel-${index}`;

          return (
            <article
              className={`details-accordion__item${isOpen ? ' is-open' : ''}`}
              key={item.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
            >
              <button
                className="details-accordion__trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => handleToggle(index)}
              >
                <span className="details-accordion__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="details-accordion__label">{item.title}</span>
                <span className="details-accordion__icon" aria-hidden="true" />
              </button>

              <div className="details-accordion__panel" id={contentId}>
                <div className="details-accordion__panel-inner">
                  <div className="details-accordion__media">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="details-accordion__content">
                    <p className="details-accordion__panel-eyebrow">{item.eyebrow}</p>
                    <p className="details-accordion__body">{item.body}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const gradientCarouselCards = [
  {
    image: '/assets/images/carousel-blue-kettle.png',
    colorA: '#b7cde1',
    colorB: '#e9eff3',
  },
  {
    image: '/assets/images/carousel-green-kettle.png',
    colorA: '#b8bba2',
    colorB: '#eee7d8',
  },
  {
    image: '/assets/images/hero-kettle.png',
    colorA: '#d8dee0',
    colorB: '#f4f1ec',
  },
  {
    image: '/assets/images/precision-pour.png',
    colorA: '#c8d0d2',
    colorB: '#efe7db',
  },
  {
    image: '/assets/images/luxe-handle.png',
    colorA: '#b7bcc0',
    colorB: '#f5f3ef',
  },
  {
    image: '/assets/images/features-b-lid-poster.png',
    colorA: '#e7e7e4',
    colorB: '#bbc4c8',
  },
  {
    image: '/assets/images/luxe-water-window.png',
    colorA: '#d4d9dc',
    colorB: '#f1f1ee',
  },
  {
    image: '/assets/sequences/features-a/frame_0065.jpg',
    colorA: '#d0d2cf',
    colorB: '#eef0f1',
  },
];

function GradientCarousel() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const cardsRoot = cardsRef.current;
    const bg = bgRef.current;

    if (!section || !canvas || !cardsRoot || !bg) {
      return undefined;
    }

    let disposed = false;
    let rafId;
    let scrollX = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;
    let activeIndex = -1;
    let cardWidth = 320;
    let step = 360;
    let track = gradientCarouselCards.length * step;
    const cardEls = [];
    const currentGradient = {
      a: new THREE.Color(gradientCarouselCards[0].colorA),
      b: new THREE.Color(gradientCarouselCards[0].colorB),
    };
    const targetGradient = {
      a: currentGradient.a.clone(),
      b: currentGradient.b.clone(),
    };
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0xeeeeee, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const gradientUniforms = {
      uColorA: { value: currentGradient.a.clone() },
      uColorB: { value: currentGradient.b.clone() },
      uTime: { value: 0 },
    };
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: gradientUniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv;
          vec2 a = vec2(0.5 + cos(uTime * 0.24) * 0.18, 0.48 + sin(uTime * 0.19) * 0.12);
          vec2 b = vec2(0.5 + cos(uTime * -0.20 + 1.2) * 0.22, 0.52 + sin(uTime * -0.17) * 0.14);
          float g1 = 1.0 - smoothstep(0.0, 0.64, distance(p, a));
          float g2 = 1.0 - smoothstep(0.0, 0.58, distance(p, b));
          vec3 base = vec3(0.93);
          vec3 color = mix(base, uColorA, g1 * 0.72);
          color = mix(color, uColorB, g2 * 0.62);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });
    const gradientMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), gradientMaterial);
    scene.add(gradientMesh);

    const mod = (n, m) => ((n % m) + m) % m;
    const clamp = gsap.utils.clamp(-1, 1);

    gradientCarouselCards.forEach((card) => {
      const el = document.createElement('article');
      el.className = 'gradient-carousel__card';
      const img = document.createElement('img');
      img.src = card.image;
      img.alt = '';
      img.draggable = false;
      el.appendChild(img);
      cardsRoot.appendChild(el);
      cardEls.push(el);
    });

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      cardWidth = Math.min(360, Math.max(230, width * 0.26));
      step = cardWidth + 42;
      track = gradientCarouselCards.length * step;
    };

    const setActiveGradient = (index) => {
      if (index === activeIndex) {
        return;
      }

      activeIndex = index;
      targetGradient.a.set(gradientCarouselCards[index].colorA);
      targetGradient.b.set(gradientCarouselCards[index].colorB);
    };

    const updateBackground = (time) => {
      currentGradient.a.lerp(targetGradient.a, 0.08);
      currentGradient.b.lerp(targetGradient.b, 0.08);
      gradientUniforms.uColorA.value.copy(currentGradient.a);
      gradientUniforms.uColorB.value.copy(currentGradient.b);
      gradientUniforms.uTime.value = time * 0.001;
      const a = `#${currentGradient.a.getHexString()}`;
      const b = `#${currentGradient.b.getHexString()}`;
      const x1 = 50 + Math.cos(time * 0.00024) * 18;
      const y1 = 46 + Math.sin(time * 0.00019) * 12;
      const x2 = 50 + Math.cos(time * -0.0002 + 1.2) * 22;
      const y2 = 52 + Math.sin(time * -0.00017) * 14;

      bg.style.background = `
        radial-gradient(circle at ${x1}% ${y1}%, ${a} 0%, rgba(255,255,255,0) 48%),
        radial-gradient(circle at ${x2}% ${y2}%, ${b} 0%, rgba(255,255,255,0) 52%),
        #eeeeee
      `;
    };

    const updateCards = () => {
      const half = track / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardEls.forEach((el, index) => {
        let pos = index * step - scrollX;
        if (pos < -half) pos += track;
        if (pos > half) pos -= track;

        const norm = clamp(pos / (window.innerWidth * 0.5));
        const inv = 1 - Math.abs(norm);
        const rotationY = -norm * 0.52;
        const z = inv * 150;
        const scale = 0.92 + inv * 0.11;

        el.style.transform = `translate3d(${pos}px, -50%, ${z}px) rotateY(${rotationY}rad) scale(${scale})`;
        el.style.zIndex = String(1000 + Math.round(z));
        el.style.filter = `blur(${Math.max(0, Math.abs(norm) - 0.42) * 4}px)`;
        el.style.opacity = String(0.35 + inv * 0.65);

        const distance = Math.abs(pos);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveGradient(closestIndex);
    };

    const tick = (time) => {
      if (disposed) {
        return;
      }

      scrollX = mod(scrollX + velocity, track);
      velocity *= 0.92;
      if (Math.abs(velocity) < 0.002) velocity = 0;

      updateCards();
      updateBackground(time);
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(tick);
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      velocity += delta * 0.028;
    };

    const handlePointerDown = (event) => {
      dragging = true;
      lastX = event.clientX;
      lastTime = performance.now();
      section.setPointerCapture?.(event.pointerId);
      section.classList.add('is-dragging');
    };

    const handlePointerMove = (event) => {
      if (!dragging) {
        return;
      }

      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max(16, now - lastTime);
      scrollX = mod(scrollX - dx, track);
      dragVelocity = -(dx / dt) * 16;
      lastX = event.clientX;
      lastTime = now;
    };

    const handlePointerUp = (event) => {
      if (!dragging) {
        return;
      }

      dragging = false;
      velocity = dragVelocity;
      section.releasePointerCapture?.(event.pointerId);
      section.classList.remove('is-dragging');
    };

    const handleResize = () => {
      resize();
      updateCards();
    };

    resize();
    updateCards();
    rafId = window.requestAnimationFrame(tick);

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('pointerdown', handlePointerDown);
    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerup', handlePointerUp);
    section.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('pointerdown', handlePointerDown);
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerup', handlePointerUp);
      section.removeEventListener('pointercancel', handlePointerUp);
      gradientMesh.geometry.dispose();
      gradientMaterial.dispose();
      renderer.dispose();
      cardsRoot.innerHTML = '';
    };
  }, []);

  return (
    <section className="gradient-carousel" ref={sectionRef} aria-label="Product image carousel">
      <div className="gradient-carousel__background" ref={bgRef} />
      <canvas className="gradient-carousel__canvas" ref={canvasRef} />
      <div className="gradient-carousel__cards" ref={cardsRef} aria-hidden="true" />
    </section>
  );
}

const stickyMenuLinks = [
  'Compare',
  'Tech Specs',
  "What's Included",
  'Review Highlights',
  "What's Included",
  'Support & Documentation',
  'FAQS',
];

const stickyPanelByLabel = {
  Compare: 'compare',
  'Tech Specs': 'tech-specs',
  "What's Included": 'included',
  'Review Highlights': 'reviews',
  'Support & Documentation': 'support',
  FAQS: 'faq',
};

const stickyPanelTitles = {
  compare: 'Compare Kettles',
  'tech-specs': 'Tech Specs',
  included: "What's Included",
  reviews: 'Review Highlights',
  support: 'Support & Documentation',
  faq: 'FAQS',
  shop: 'Choose Color',
};

const stickyProductVariants = [
  {
    name: 'Brushed Stainless Steel',
    price: '$219.95',
    swatch: '/assets/images/swatches/Brushed Stainless Steel.png',
    image: '/assets/images/kettle_straight/1.jpg',
  },
  {
    name: 'Black Truffle',
    price: '$219.95',
    swatch: '/assets/images/swatches/Black Truffle.png',
    image: '/assets/images/kettle_straight/2.jpg',
  },
  {
    name: 'Sea Salt',
    price: '$219.95',
    swatch: '/assets/images/swatches/Sea Salt.png',
    image: '/assets/images/kettle_straight/3.jpg',
  },
  {
    name: 'Damson Blue',
    price: '$219.95',
    swatch: '/assets/images/swatches/Damson Blue.png',
    image: '/assets/images/kettle_straight/4.jpg',
  },
  {
    name: 'Almond Nougat',
    price: '$219.95',
    swatch: '/assets/images/swatches/Almond Nougat.png',
    image: '/assets/images/kettle_straight/5.jpg',
  },
  {
    name: 'Olive Tapenade',
    price: '$219.95',
    swatch: '/assets/images/swatches/Olive Tapenade.png',
    image: '/assets/images/kettle_straight/6.jpg',
  },
  {
    name: 'Noir',
    price: '$219.95',
    swatch: '/assets/images/swatches/Noir.png',
    image: '/assets/images/kettle_straight/7.jpg',
  },
  {
    name: 'Sea Salt Brass',
    price: '$219.95',
    swatch: '/assets/images/swatches/Sea Salt Brass.png',
    image: '/assets/images/kettle_straight/8.jpg',
  },
  {
    name: 'Damson Blue Brass',
    price: '$219.95',
    swatch: '/assets/images/swatches/Damson Blue Brass.png',
    image: '/assets/images/kettle_straight/9.jpg',
  },
  {
    name: 'Olive Tapenade Brass',
    price: '$219.95',
    swatch: '/assets/images/swatches/Olive Tapenade Brass.png',
    image: '/assets/images/kettle_straight/10.jpg',
  },
  {
    name: 'Brushed Stainless Steel Brass',
    price: '$219.95',
    swatch: '/assets/images/swatches/Brushed Stainless Steel Brass.png',
    image: '/assets/images/kettle_straight/11.jpg',
  },
  {
    name: 'an Aboriginal Culinary Journey',
    price: '$219.95',
    swatch: '/assets/images/swatches/an Aboriginal Culinary Journey.png',
    image: '/assets/images/kettle_straight/12.jpg',
  },
];

const stickyCompareProducts = [
  {
    eyebrow: 'Currently Viewing',
    name: 'the Smart Kettle\u2122 Luxe',
    image: '/assets/images/story-compare-smart-kettle-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Soft Top Lid'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: stickyProductVariants.slice(0, 5),
  },
  {
    name: 'the Smart Crystal Luxe\u2122',
    image: '/assets/images/story-compare-crystal-luxe.png',
    features: ['5 Pre-sets, Keep Warm.', 'Glass body'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: stickyProductVariants.slice(5, 9),
  },
  {
    name: 'the IQ Kettle\u2122 Pure',
    image: '/assets/images/story-compare-iq-pure.png',
    features: ['5 Pre-sets, Keep Warm.'],
    capacity: '7-Cup / 1.7L',
    dimensions: ['7.5"', '7.5"', '7.5"'],
    swatches: stickyProductVariants.slice(9, 12),
  },
];

const stickyReviewSummary = {
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
};

const stickyReviewCards = [
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

export default function ProductStickyButton({ className = '', releaseSelector = '' } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('menu');
  const [selectedVariant, setSelectedVariant] = useState(stickyProductVariants[0]);
  const [compareStep, setCompareStep] = useState(0);
  const reviewRowRef = useRef(null);
  const compareTrackRefs = useRef([]);
  const reviewDragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    nextScrollLeft: 0,
    frame: 0,
  });
  const isDetailPanelOpen = isMenuOpen && activePanel !== 'menu';
  const stickyRef = useRef(null);

  useEffect(() => {
    const sticky = stickyRef.current;
    const releaseElement = releaseSelector ? document.querySelector(releaseSelector) : null;

    if (!sticky || !releaseElement) {
      return undefined;
    }

    const updateRelease = () => {
      const releaseBottom = releaseElement.offsetTop + releaseElement.offsetHeight;
      const releaseStart = releaseBottom - window.innerHeight;
      const releaseOffset = Math.max(0, window.scrollY - releaseStart);

      gsap.set(sticky, {
        y: -releaseOffset,
      });
    };

    updateRelease();
    gsap.ticker.add(updateRelease);
    window.addEventListener('scroll', updateRelease, { passive: true });
    window.addEventListener('resize', updateRelease);

    return () => {
      gsap.ticker.remove(updateRelease);
      window.removeEventListener('scroll', updateRelease);
      window.removeEventListener('resize', updateRelease);
      gsap.set(sticky, { clearProps: 'transform' });
    };
  }, [releaseSelector]);
  const supportSection = productInfoSections.find((section) => section.id === 'support');
  const compareStepCount = 4;

  useEffect(() => {
    if (activePanel === 'compare') {
      setCompareStep(0);
    }
  }, [activePanel]);

  useEffect(() => {
    if (activePanel !== 'compare') {
      return undefined;
    }

    let frameId = 0;
    let timeoutId = 0;

    const syncCompareTracks = () => {
      compareTrackRefs.current.forEach((track) => {
        if (!track) {
          return;
        }

        const cards = track.querySelectorAll('.desktop-sticky-button__compare-card');
        const targetCard = cards[Math.min(compareStep, cards.length - 1)];
        const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
        const left = compareStep === 0 || !targetCard ? 0 : Math.max(0, targetCard.offsetLeft - paddingLeft);

        track.scrollLeft = left;
      });
    };

    syncCompareTracks();
    frameId = window.requestAnimationFrame(syncCompareTracks);
    timeoutId = window.setTimeout(syncCompareTracks, 80);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [activePanel, compareStep]);

  const handleMenuToggle = () => {
    setIsMenuOpen((open) => {
      if (open) {
        setActivePanel('menu');
      }

      return !open;
    });
  };

  const handleReviewPointerDown = (event) => {
    const row = reviewRowRef.current;

    if (!row) {
      return;
    }

    reviewDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
      nextScrollLeft: row.scrollLeft,
      frame: 0,
    };
    row.classList.add('is-dragging');
    row.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const handleReviewPointerMove = (event) => {
    const row = reviewRowRef.current;

    if (!row || !reviewDragRef.current.active) {
      return;
    }

    reviewDragRef.current.nextScrollLeft = reviewDragRef.current.scrollLeft - (event.clientX - reviewDragRef.current.startX);

    if (!reviewDragRef.current.frame) {
      reviewDragRef.current.frame = window.requestAnimationFrame(() => {
        row.scrollLeft = reviewDragRef.current.nextScrollLeft;
        reviewDragRef.current.frame = 0;
      });
    }
  };

  const handleReviewPointerUp = (event) => {
    const row = reviewRowRef.current;

    if (!row || !reviewDragRef.current.active) {
      return;
    }

    reviewDragRef.current.active = false;
    if (reviewDragRef.current.frame) {
      window.cancelAnimationFrame(reviewDragRef.current.frame);
      row.scrollLeft = reviewDragRef.current.nextScrollLeft;
    }
    reviewDragRef.current.frame = 0;
    row.classList.remove('is-dragging');
    row.releasePointerCapture?.(event.pointerId);
  };

  const handleCompareStep = (direction) => {
    setCompareStep((step) => Math.min(Math.max(step + direction, 0), compareStepCount - 1));
  };

  const renderDetailPanel = () => {
    if (activePanel === 'shop') {
      return (
        <div className="desktop-sticky-button__product-panel">
          <div className="desktop-sticky-button__product-intro">
            <div className="desktop-sticky-button__product-copy">
              <h3>the Smart Kettle&trade; Luxe</h3>
            </div>
            <button
              className="desktop-sticky-button__product-menu-link"
              type="button"
              onClick={() => setActivePanel('menu')}
            >
              Menu
            </button>
          </div>

          <figure className="desktop-sticky-button__product-image">
            <img src={selectedVariant.image} alt={`${selectedVariant.name} Smart Kettle Luxe`} />
          </figure>

          <div className="desktop-sticky-button__variant-section">
            <p>
              Color:
              {' '}
              <span>{selectedVariant.name}</span>
            </p>
            <div className="desktop-sticky-button__variant-grid" aria-label="Choose color">
              {stickyProductVariants.map((variant) => (
                <button
                  className={`desktop-sticky-button__variant${variant.name === selectedVariant.name ? ' is-selected' : ''}`}
                  type="button"
                  aria-label={variant.name}
                  aria-pressed={variant.name === selectedVariant.name}
                  onClick={() => setSelectedVariant(variant)}
                  key={variant.name}
                >
                  <span>
                    <img src={variant.swatch} alt="" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activePanel === 'tech-specs' || activePanel === 'included') {
      const rows = activePanel === 'tech-specs' ? technicalSpecs : includedItems;

      return (
        <div className="desktop-sticky-button__spec-layout">
          <dl className="desktop-sticky-button__detail-list">
            {rows.map(([label, value]) => (
              <div className="desktop-sticky-button__detail-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <figure className="desktop-sticky-button__media">
            <img src="/assets/images/specs-kettle-2.png" alt="" />
          </figure>
        </div>
      );
    }

    if (activePanel === 'faq') {
      return (
        <div className="desktop-sticky-button__stacked-list desktop-sticky-button__stacked-list--faq">
          {faqItems.map(([question, answer]) => (
            <article className="desktop-sticky-button__text-card" key={question}>
              <h4>{question}</h4>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      );
    }

    if (activePanel === 'support') {
      return (
        <div className="desktop-sticky-button__card-grid">
          {supportSection.items
            .filter(([title]) => title !== 'Return Policies' && title !== 'Warranty & Repairs')
            .map(([title, body]) => (
              <article className="desktop-sticky-button__text-card" key={title}>
                <h4>{title}</h4>
                <p>{body}</p>
              </article>
            ))}
          <article className="desktop-sticky-button__text-card desktop-sticky-button__product-hub-card">
            <div>
              <h4>Product Hub</h4>
              <p>Get more out of the Smart Kettle&trade; Luxe. Benefits, Access and More.</p>
            </div>
            <figure>
              <img src="/assets/images/support.png" alt="" />
            </figure>
          </article>
        </div>
      );
    }

    if (activePanel === 'reviews') {
      return (
        <div className="desktop-sticky-button__reviews-panel">
          <div className="desktop-sticky-button__review-summary">
            <div className="desktop-sticky-button__review-score">
              <strong>{stickyReviewSummary.rating}</strong>
              <div className="desktop-sticky-button__review-stars" aria-label={`${stickyReviewSummary.rating} out of 5 stars`}>
                <span aria-hidden="true">{'\u2605\u2605\u2605\u2605\u2605'}</span>
                <small>{stickyReviewSummary.reviewCount}</small>
              </div>
              <p>{stickyReviewSummary.recommendation}</p>
            </div>

            <div className="desktop-sticky-button__rating-bars" aria-label="Rating distribution">
              {stickyReviewSummary.ratings.map(([label, count, value]) => (
                <div className="desktop-sticky-button__rating-row" key={label}>
                  <span>{label}</span>
                  <div className="desktop-sticky-button__rating-meter" aria-hidden="true">
                    <span style={{ transform: `scaleX(${value})` }} />
                  </div>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="desktop-sticky-button__review-carousel">
            <div className="desktop-sticky-button__review-carousel-header">
              <h4>Customer reviews</h4>
              <button className="desktop-sticky-button__review-button desktop-sticky-button__review-button--desktop" type="button">
                See all reviews
              </button>
            </div>
            <div className="desktop-sticky-button__review-card-viewport">
              <div
                className="desktop-sticky-button__review-card-row"
                ref={reviewRowRef}
                onPointerDown={handleReviewPointerDown}
                onPointerMove={handleReviewPointerMove}
                onPointerUp={handleReviewPointerUp}
                onPointerCancel={handleReviewPointerUp}
                aria-label="Positive customer reviews"
              >
                {stickyReviewCards.slice(0, 3).map((review) => (
                  <article className="desktop-sticky-button__review-card" key={review.title}>
                    <div className="desktop-sticky-button__review-card-top">
                      <div className="desktop-sticky-button__review-card-stars" aria-hidden="true">
                        {'\u2605\u2605\u2605\u2605\u2605'}
                      </div>
                      <h4>{review.title}</h4>
                    </div>

                    <div className="desktop-sticky-button__review-card-bottom">
                      <p>{review.body}</p>
                      <div className="desktop-sticky-button__review-card-meta">
                        <span>{review.author}</span>
                        <time dateTime={review.date}>{review.date}</time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="desktop-sticky-button__review-footer">
              <button className="desktop-sticky-button__review-button" type="button">
                See all reviews
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activePanel === 'compare') {
      return (
        <div className="desktop-sticky-button__compare-panel">
          {stickyCompareProducts.map((product, index) => (
            <section className="desktop-sticky-button__compare-product" key={product.name}>
              <div className="desktop-sticky-button__compare-heading">
                <div>
                  {product.eyebrow ? <p>{product.eyebrow}</p> : null}
                  <h4>{product.name}</h4>
                </div>
                {index === 0 ? (
                  <div className="desktop-sticky-button__compare-arrows">
                    <button
                      className="desktop-sticky-button__compare-arrow"
                      type="button"
                      aria-label="Show previous compare section"
                      disabled={compareStep === 0}
                      onClick={() => handleCompareStep(-1)}
                    >
                      &lsaquo;
                    </button>
                    <button
                      className="desktop-sticky-button__compare-arrow"
                      type="button"
                      aria-label="Show next compare section"
                      disabled={compareStep === compareStepCount - 1}
                      onClick={() => handleCompareStep(1)}
                    >
                      &rsaquo;
                    </button>
                    <span>&lsaquo;</span>
                    <span>&rsaquo;</span>
                  </div>
                ) : null}
              </div>

              <div
                className="desktop-sticky-button__compare-track"
                ref={(node) => {
                  compareTrackRefs.current[index] = node;
                }}
                aria-label={`${product.name} comparison details`}
              >
                <article className="desktop-sticky-button__compare-card desktop-sticky-button__compare-card--feature">
                  <figure>
                    <img src={product.image} alt="" />
                  </figure>
                  <div>
                    <h5>Features</h5>
                    <p>{product.features.join(' ')}</p>
                  </div>
                </article>

                <article className="desktop-sticky-button__compare-card desktop-sticky-button__compare-card--stat">
                  <span>Capacity</span>
                  <strong>{product.capacity}</strong>
                </article>

                <article className="desktop-sticky-button__compare-card desktop-sticky-button__compare-card--dimensions">
                  {['Width', 'Depth', 'Height'].map((label, dimensionIndex) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{product.dimensions[dimensionIndex]}</strong>
                    </div>
                  ))}
                </article>

                <article className="desktop-sticky-button__compare-card desktop-sticky-button__compare-card--swatches" aria-label={`${product.name} finishes`}>
                  {product.swatches.map((variant) => (
                    <span key={variant.name}>
                      <img src={variant.swatch} alt="" />
                    </span>
                  ))}
                </article>
              </div>
            </section>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <aside
      className={`desktop-sticky-button${className ? ` ${className}` : ''}${isMenuOpen ? ' is-menu-open' : ''}${isDetailPanelOpen ? ' is-detail-open' : ''}${activePanel === 'tech-specs' || activePanel === 'included' ? ' is-spec-open' : ''}${activePanel === 'reviews' ? ' is-reviews-open' : ''}${activePanel === 'compare' ? ' is-compare-open' : ''}`}
      aria-label="Product quick actions"
      ref={stickyRef}
      data-node-id={isMenuOpen ? '10242:11309' : '10242:11271'}
    >
      <div className="desktop-sticky-button__panel" data-node-id="10241:11220" data-name="Menu Expanded">
        <div className="desktop-sticky-button__menu-content" aria-hidden={!isMenuOpen || isDetailPanelOpen} data-node-id="10241:11221">
          <p className="desktop-sticky-button__menu-title" data-node-id="10241:11222">Menu</p>
          <nav className="desktop-sticky-button__menu-links" aria-label="Product sections" data-node-id="10241:11223">
            {stickyMenuLinks.map((link, index) => (
              <button
                className="desktop-sticky-button__menu-link"
                type="button"
                aria-label={link}
                onClick={() => {
                  setActivePanel(stickyPanelByLabel[link]);
                }}
                key={`${link}-${index}`}
              >
                {link === 'Support & Documentation' ? (
                  <>
                    Support &amp;
                    <br />
                    Documentation
                  </>
                ) : link}
              </button>
            ))}
          </nav>
        </div>

        <div
          className={`desktop-sticky-button__detail-content${activePanel === 'tech-specs' || activePanel === 'included' ? ' desktop-sticky-button__detail-content--spec' : ''}${activePanel === 'reviews' ? ' desktop-sticky-button__detail-content--reviews' : ''}${activePanel === 'compare' ? ' desktop-sticky-button__detail-content--compare' : ''}`}
          aria-hidden={!isDetailPanelOpen}
        >
          <div className={`desktop-sticky-button__detail-header${activePanel === 'shop' ? ' desktop-sticky-button__detail-header--shop' : ''}${activePanel === 'reviews' ? ' desktop-sticky-button__detail-header--reviews' : ''}${activePanel === 'compare' ? ' desktop-sticky-button__detail-header--compare' : ''}`}>
            <p className="desktop-sticky-button__menu-title">{stickyPanelTitles[activePanel]}</p>
            <button
              className="desktop-sticky-button__back"
              type="button"
              onClick={() => setActivePanel('menu')}
            >
              Menu
            </button>
          </div>
          {renderDetailPanel()}
        </div>

        <div className={`desktop-sticky-button__bottom-bar${activePanel === 'shop' || activePanel === 'reviews' || activePanel === 'compare' ? ' desktop-sticky-button__bottom-bar--cart' : ''}`}>
          {activePanel === 'shop' || activePanel === 'reviews' || activePanel === 'compare' ? (
            <button className="desktop-sticky-button__add-cart" type="button">
              Add to cart
            </button>
          ) : null}

          <div className="desktop-sticky-button__shell" data-node-id="10242:11283" data-name="Desktop Menu">
            <button
              className="desktop-sticky-button__shop"
              type="button"
              aria-label="Choose product color"
              aria-expanded={activePanel === 'shop'}
              onClick={() => {
                setIsMenuOpen(true);
                setActivePanel('shop');
              }}
              data-node-id="10242:11284"
            >
              <span className="desktop-sticky-button__swatch" aria-hidden="true" data-node-id="10242:11286">
                <img src={selectedVariant.swatch} alt="" />
              </span>
              <span className="desktop-sticky-button__price-lockup" data-node-id="10242:11287">
                <span className="desktop-sticky-button__price" data-node-id="10242:11288">{selectedVariant.price}</span>
                <span className="desktop-sticky-button__reviews" data-node-id="10242:11289">
                  <span className="desktop-sticky-button__star" aria-hidden="true" />
                  <span className="desktop-sticky-button__rating" data-node-id="10242:11291">4.5</span>
                </span>
              </span>
            </button>

            <button
              className="desktop-sticky-button__menu"
              type="button"
              aria-label={isMenuOpen ? 'Close product menu' : 'Open product menu'}
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
              data-node-id="10242:11292"
            >
              <span className="desktop-sticky-button__menu-icon" aria-hidden="true" data-node-id="10242:11293">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

