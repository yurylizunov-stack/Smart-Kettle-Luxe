import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import BlankPage from './BlankPage.jsx';
import HeroOnlyPage from './HeroOnlyPage.jsx';
import StickyNavBlankPage from './StickyNavBlankPage.jsx';
import Update2Page from './Update2Page.jsx';
import ReviewHighlightsPage from './ReviewHighlightsPage.jsx';

const pathname = decodeURIComponent(window.location.pathname);
const normalizedPath = pathname
  .toLowerCase()
  .replace(/\/+$/, '')
  .replace(/[\s_]+/g, '-');

const Page = ['/update-2', '/update2'].includes(normalizedPath)
  ? Update2Page
  : ['/update-3', '/update3'].includes(normalizedPath)
    ? BlankPage
  : ['/review-highlights', '/reviews-highlight', '/product-detail', '/buy'].includes(normalizedPath)
    ? ReviewHighlightsPage
  : ['/hero', '/hero-only', '/video-hero'].includes(normalizedPath)
    ? HeroOnlyPage
    : ['/sticky-nav', '/blank-sticky-nav', '/figma-sticky-nav'].includes(normalizedPath)
      ? StickyNavBlankPage
      : Update2Page;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
