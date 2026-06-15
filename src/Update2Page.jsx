import React from 'react';
import BlankPage from './BlankPage.jsx';

export default function Update2Page() {
  return (
    <BlankPage
      hideDesktopContextualMenu
      showDesktopVarietalIntro
      showDesktopKeepWarmIntro
      showDesktopSoftOpeningIntro
      hideDesktopSoftLidSection
      showDesktopColorSelector
      showDesktopTechSpecs
      showDesktopWhatsIncluded
      showDesktopReviewHighlights
      showDesktopSupportDocumentation
      showDesktopFAQ
    />
  );
}
