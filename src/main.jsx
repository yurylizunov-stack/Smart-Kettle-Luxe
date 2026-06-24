import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';
import BlankPage from './BlankPage.jsx';
import HeroOnlyPage from './HeroOnlyPage.jsx';
import StickyNavBlankPage from './StickyNavBlankPage.jsx';
import Update2Page from './Update2Page.jsx';
import ReviewHighlightsPage from './ReviewHighlightsPage.jsx';

const normalizeRoute = (value) => {
  const route = value?.startsWith('/') ? value : `/${value || ''}`;

  return route
    .toLowerCase()
    .replace(/\/+$/, '')
    .replace(/[\s_]+/g, '-') || '/';
};

const searchParams = new URLSearchParams(window.location.search);
const queryRoute = searchParams.get('page') || searchParams.get('view');
const normalizedPath = normalizeRoute(queryRoute || decodeURIComponent(window.location.pathname));

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
    <Analytics />
  </React.StrictMode>,
);
