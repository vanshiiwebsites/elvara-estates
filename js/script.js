/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 1
   Global Setup, Loader, Page Initialization and Scroll Lock
========================================================= */

"use strict";


/* =========================================================
   1. GLOBAL APPLICATION STATE
========================================================= */

const ElvaraApp = {
  isPageLoaded: false,
  isMenuOpen: false,
  isScrollLocked: false,
  lastScrollPosition: 0,
  currentTestimonial: 0,
  testimonialTimer: null,
  resizeTimer: null,
  scrollTimer: null,
  supportsTouch:
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0,
};


/* =========================================================
   2. DOM HELPER FUNCTIONS
========================================================= */

/**
 * Select one element safely.
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element|null}
 */
function selectElement(selector, scope = document) {
  return scope.querySelector(selector);
}


/**
 * Select multiple elements and return an array.
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element[]}
 */
function selectElements(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}


/**
 * Add an event listener only when the element exists.
 * @param {Element|null} element
 * @param {string} eventName
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} options
 */
function addSafeEventListener(
  element,
  eventName,
  handler,
  options = false
) {
  if (!element) return;

  element.addEventListener(
    eventName,
    handler,
    options
  );
}


/**
 * Run a function after DOM is ready.
 * @param {Function} callback
 */
function onDocumentReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      callback,
      { once: true }
    );

    return;
  }

  callback();
}


/**
 * Clamp a number between minimum and maximum values.
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function clampNumber(value, minimum, maximum) {
  return Math.min(
    Math.max(value, minimum),
    maximum
  );
}


/**
 * Format a number with Indian digit grouping.
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}


/* =========================================================
   3. IMPORTANT DOM ELEMENTS
========================================================= */

const siteLoader = selectElement("#siteLoader");
const pageTransition = selectElement("#pageTransition");

const mainHeader = selectElement("#mainHeader");

const menuToggle = selectElement("#menuToggle");
const mobileMenu = selectElement("#mobileMenu");
const mobileMenuClose = selectElement("#mobileMenuClose");
const mobileMenuOverlay = selectElement(
  "#mobileMenuOverlay"
);

const heroVideo = selectElement(".hero-video");
const heroSoundControl = selectElement(
  "#heroSoundControl"
);

const showcaseVideo = selectElement(
  ".property-showcase-video"
);

const showcasePlayButton = selectElement(
  "#showcasePlayButton"
);

const hotelVideo = selectElement(
  ".hotel-experience-video"
);

const hotelVideoControl = selectElement(
  "#hotelVideoControl"
);

const testimonialSlider = selectElement(
  "#testimonialSlider"
);

const testimonialPreviousButton = selectElement(
  "#testimonialPrev"
);

const testimonialNextButton = selectElement(
  "#testimonialNext"
);

const testimonialProgressBar = selectElement(
  "#testimonialProgressBar"
);

const newsletterForm = selectElement(
  "#newsletterForm"
);

const newsletterMessage = selectElement(
  "#newsletterMessage"
);

const cookieNotice = selectElement(
  "#cookieNotice"
);

const cookieAcceptButton = selectElement(
  "#cookieAccept"
);

const cookieDeclineButton = selectElement(
  "#cookieDecline"
);

const backToTopButton = selectElement(
  "#backToTop"
);

const scrollProgressCircle = selectElement(
  "#scrollProgressCircle"
);

const currentYearElement = selectElement(
  "#currentYear"
);

const customCursor = selectElement(
  "#customCursor"
);

const cursorFollower = selectElement(
  "#cursorFollower"
);


/* =========================================================
   4. SCROLL LOCK SYSTEM
========================================================= */

/**
 * Prevent page scrolling while preserving position.
 */
function lockPageScroll() {
  if (ElvaraApp.isScrollLocked) return;

  ElvaraApp.lastScrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop;

  document.body.style.position = "fixed";
  document.body.style.top =
    `-${ElvaraApp.lastScrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  document.body.classList.add("menu-open");

  ElvaraApp.isScrollLocked = true;
}


/**
 * Restore page scrolling and previous position.
 */
function unlockPageScroll() {
  if (!ElvaraApp.isScrollLocked) return;

  const savedPosition =
    ElvaraApp.lastScrollPosition;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  document.body.classList.remove("menu-open");

  window.scrollTo({
    top: savedPosition,
    left: 0,
    behavior: "instant",
  });

  ElvaraApp.isScrollLocked = false;
}


/* =========================================================
   5. LOADER FALLBACK
========================================================= */

let loaderFallbackTimer = null;


/**
 * Hide the premium website loader.
 */
function hideSiteLoader() {
  if (ElvaraApp.isPageLoaded) return;

  ElvaraApp.isPageLoaded = true;

  if (loaderFallbackTimer) {
    window.clearTimeout(loaderFallbackTimer);
  }

  document.body.classList.remove("loading");
  document.body.classList.add("page-loaded");

  if (siteLoader) {
    siteLoader.classList.add("loader-hidden");

    window.setTimeout(() => {
      siteLoader.setAttribute(
        "aria-hidden",
        "true"
      );
    }, 850);
  }

  if (
    document.body.style.position === "fixed" &&
    !ElvaraApp.isMenuOpen
  ) {
    unlockPageScroll();
  }
}


/**
 * Start a loader safety timer.
 * This prevents the website from remaining blocked
 * if a video or image fails to load.
 */
function startLoaderFallback() {
  loaderFallbackTimer = window.setTimeout(
    hideSiteLoader,
    4500
  );
}


/* =========================================================
   6. MEDIA PREPARATION
========================================================= */

/**
 * Prepare background videos for reliable autoplay.
 */
function prepareWebsiteVideos() {
  const websiteVideos = selectElements("video");

  websiteVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const playPromise = video.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch(() => {
        /*
         Autoplay can be blocked by some browsers.
         The poster image will remain visible.
        */
      });
    }
  });
}


/* =========================================================
   7. DYNAMIC CURRENT YEAR
========================================================= */

function updateCurrentYear() {
  if (!currentYearElement) return;

  currentYearElement.textContent =
    String(new Date().getFullYear());
}


/* =========================================================
   8. PAGE TRANSITION PREPARATION
========================================================= */

/**
 * Remove any transition state left by navigation.
 */
function resetPageTransition() {
  if (!pageTransition) return;

  pageTransition.classList.remove(
    "is-active"
  );
}


/**
 * Start the visual transition before internal navigation.
 * @param {string} destination
 */
function beginPageTransition(destination) {
  if (
    !pageTransition ||
    !destination
  ) {
    window.location.href = destination;
    return;
  }

  pageTransition.classList.add(
    "is-active"
  );

  window.setTimeout(() => {
    window.location.href = destination;
  }, 560);
}


/* =========================================================
   9. INTERNAL PAGE LINK PREPARATION
========================================================= */

function prepareInternalPageLinks() {
  const links = selectElements("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      link.hasAttribute("download") ||
      link.target === "_blank"
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

      const destinationPage =
        href.split("#")[0];

      if (
        destinationPage === currentPage &&
        !href.includes("#")
      ) {
        return;
      }

      event.preventDefault();

      beginPageTransition(href);
    });
  });
}


/* =========================================================
   10. BASIC ACCESSIBILITY PREPARATION
========================================================= */

function prepareAccessibility() {
  if (siteLoader) {
    siteLoader.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  if (mobileMenu) {
    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  document.documentElement.classList.add(
    ElvaraApp.supportsTouch
      ? "touch-device"
      : "pointer-device"
  );
}


/* =========================================================
   11. INITIAL PAGE SETUP
========================================================= */

function initializeBaseWebsite() {
  document.body.classList.add("loading");

  prepareAccessibility();
  updateCurrentYear();
  resetPageTransition();
  prepareWebsiteVideos();
  prepareInternalPageLinks();
  startLoaderFallback();
}


/* =========================================================
   12. DOM READY EVENT
========================================================= */

onDocumentReady(() => {
  initializeBaseWebsite();
});


/* =========================================================
   13. WINDOW LOAD EVENT
========================================================= */

window.addEventListener(
  "load",
  () => {
    /*
     A small delay allows fonts and the first video frame
     to settle before revealing the page.
    */

    window.setTimeout(
      hideSiteLoader,
      650
    );
  },
  { once: true }
);


/* =========================================================
   14. PAGE RESTORE EVENT
========================================================= */

window.addEventListener(
  "pageshow",
  (event) => {
    /*
     Fixes the transition overlay when returning through
     the browser's back-forward cache.
    */

    if (event.persisted) {
      resetPageTransition();

      document.body.classList.remove(
        "loading"
      );

      document.body.classList.add(
        "page-loaded"
      );

      if (siteLoader) {
        siteLoader.classList.add(
          "loader-hidden"
        );
      }
    }
  }
);


/* =========================================================
   END OF SCRIPT.JS — PART 1
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 2
   Header, Mobile Menu, Navigation and Smooth Scrolling
========================================================= */


/* =========================================================
   15. HEADER SCROLL STATE
========================================================= */

let previousScrollPosition =
  window.scrollY ||
  document.documentElement.scrollTop;


/**
 * Update header appearance based on scroll position.
 */
function updateHeaderOnScroll() {
  if (!mainHeader) return;

  const currentScrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop;

  const scrollDifference =
    currentScrollPosition -
    previousScrollPosition;

  mainHeader.classList.toggle(
    "header-scrolled",
    currentScrollPosition > 40
  );

  /*
   Hide the header only while scrolling downward.
   Keep it visible near the top and while the menu is open.
  */
  if (
    currentScrollPosition > 260 &&
    scrollDifference > 8 &&
    !ElvaraApp.isMenuOpen
  ) {
    mainHeader.classList.add(
      "header-hidden"
    );
  } else if (
    scrollDifference < -6 ||
    currentScrollPosition < 260 ||
    ElvaraApp.isMenuOpen
  ) {
    mainHeader.classList.remove(
      "header-hidden"
    );
  }

  previousScrollPosition =
    currentScrollPosition;
}


/* =========================================================
   16. MOBILE MENU OPEN
========================================================= */

function openMobileMenu() {
  if (
    !mobileMenu ||
    ElvaraApp.isMenuOpen
  ) {
    return;
  }

  ElvaraApp.isMenuOpen = true;

  mobileMenu.classList.add("is-open");

  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.add(
      "is-visible"
    );
  }

  if (menuToggle) {
    menuToggle.classList.add("is-active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Close navigation menu"
    );
  }

  mobileMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  mainHeader?.classList.remove(
    "header-hidden"
  );

  lockPageScroll();

  /*
   Move keyboard focus to the close button.
  */
  window.setTimeout(() => {
    mobileMenuClose?.focus();
  }, 300);
}


/* =========================================================
   17. MOBILE MENU CLOSE
========================================================= */

function closeMobileMenu({
  restoreFocus = true,
} = {}) {
  if (
    !mobileMenu ||
    !ElvaraApp.isMenuOpen
  ) {
    return;
  }

  ElvaraApp.isMenuOpen = false;

  mobileMenu.classList.remove("is-open");

  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove(
      "is-visible"
    );
  }

  if (menuToggle) {
    menuToggle.classList.remove(
      "is-active"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  mobileMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  unlockPageScroll();

  if (restoreFocus) {
    window.setTimeout(() => {
      menuToggle?.focus();
    }, 150);
  }
}


/* =========================================================
   18. MOBILE MENU TOGGLE
========================================================= */

function toggleMobileMenu() {
  if (ElvaraApp.isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}


/* =========================================================
   19. MOBILE MENU EVENT LISTENERS
========================================================= */

function initializeMobileMenu() {
  addSafeEventListener(
    menuToggle,
    "click",
    toggleMobileMenu
  );

  addSafeEventListener(
    mobileMenuClose,
    "click",
    () => {
      closeMobileMenu();
    }
  );

  addSafeEventListener(
    mobileMenuOverlay,
    "click",
    () => {
      closeMobileMenu();
    }
  );

  /*
   Close menu after selecting any mobile navigation link.
  */
  selectElements(
    ".mobile-navigation a, .mobile-enquiry-btn"
  ).forEach((link) => {
    link.addEventListener("click", () => {
      if (ElvaraApp.isMenuOpen) {
        closeMobileMenu({
          restoreFocus: false,
        });
      }
    });
  });
}


/* =========================================================
   20. MOBILE MENU KEYBOARD CONTROL
========================================================= */

function handleMobileMenuKeyboard(event) {
  if (!ElvaraApp.isMenuOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();

    closeMobileMenu();

    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements =
    selectElements(
      `
        a[href],
        button:not([disabled]),
        input:not([disabled]),
        textarea:not([disabled]),
        select:not([disabled]),
        [tabindex]:not([tabindex="-1"])
      `,
      mobileMenu
    ).filter((element) => {
      return (
        element.offsetWidth > 0 ||
        element.offsetHeight > 0
      );
    });

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstFocusableElement =
    focusableElements[0];

  const lastFocusableElement =
    focusableElements[
      focusableElements.length - 1
    ];

  if (
    event.shiftKey &&
    document.activeElement ===
      firstFocusableElement
  ) {
    event.preventDefault();

    lastFocusableElement.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement ===
      lastFocusableElement
  ) {
    event.preventDefault();

    firstFocusableElement.focus();
  }
}


/* =========================================================
   21. CLOSE MENU ON DESKTOP RESIZE
========================================================= */

function closeMenuOnLargeScreen() {
  if (
    window.innerWidth > 1100 &&
    ElvaraApp.isMenuOpen
  ) {
    closeMobileMenu({
      restoreFocus: false,
    });
  }
}


/* =========================================================
   22. SAME-PAGE SMOOTH SCROLL
========================================================= */

/**
 * Smoothly scroll to an element while considering
 * the fixed header height.
 *
 * @param {Element} targetElement
 */
function scrollToPageSection(targetElement) {
  if (!targetElement) return;

  const headerHeight =
    mainHeader?.offsetHeight || 0;

  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    headerHeight +
    2;

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior: "smooth",
  });
}


/**
 * Prepare links such as href="#featured-properties".
 */
function initializeSmoothScrollLinks() {
  const anchorLinks = selectElements(
    'a[href^="#"]'
  );

  anchorLinks.forEach((link) => {
    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }

    const targetElement =
      selectElement(targetId);

    if (!targetElement) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (ElvaraApp.isMenuOpen) {
        closeMobileMenu({
          restoreFocus: false,
        });
      }

      scrollToPageSection(targetElement);

      /*
       Update URL hash without an abrupt browser jump.
      */
      if (
        window.history &&
        typeof window.history.pushState ===
          "function"
      ) {
        window.history.pushState(
          null,
          "",
          targetId
        );
      }
    });
  });
}


/* =========================================================
   23. HASH LINK ON INITIAL LOAD
========================================================= */

function handleInitialPageHash() {
  const pageHash =
    window.location.hash;

  if (!pageHash) return;

  const targetElement =
    selectElement(pageHash);

  if (!targetElement) return;

  window.setTimeout(() => {
    scrollToPageSection(targetElement);
  }, 850);
}


/* =========================================================
   24. ACTIVE NAVIGATION LINK
========================================================= */

/**
 * Highlight navigation links matching current page.
 */
function updateActiveNavigationLinks() {
  const currentPath =
    window.location.pathname;

  const currentPage =
    currentPath.split("/").pop() ||
    "index.html";

  const navigationLinks =
    selectElements(
      `
        .desktop-nav a[href],
        .mobile-navigation a[href]
      `
    );

  navigationLinks.forEach((link) => {
    const linkHref =
      link.getAttribute("href");

    if (!linkHref) return;

    const linkPage =
      linkHref
        .split("#")[0]
        .split("/")
        .pop() ||
      "index.html";

    const isCurrentPage =
      linkPage === currentPage;

    link.classList.toggle(
      "active",
      isCurrentPage
    );

    if (isCurrentPage) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      link.removeAttribute(
        "aria-current"
      );
    }
  });
}


/* =========================================================
   25. HEADER LOGO HOME BEHAVIOUR
========================================================= */

function initializeHomeLogoBehaviour() {
  const homeLogoLinks =
    selectElements(
      `
        .brand-logo[href="index.html"],
        .mobile-brand-logo[href="index.html"],
        .footer-logo[href="index.html"]
      `
    );

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() ||
    "index.html";

  if (currentPage !== "index.html") {
    return;
  }

  homeLogoLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        if (
          window.scrollY <= 5 &&
          !window.location.hash
        ) {
          return;
        }

        event.preventDefault();

        if (ElvaraApp.isMenuOpen) {
          closeMobileMenu({
            restoreFocus: false,
          });
        }

        window.history.replaceState(
          null,
          "",
          "index.html"
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    );
  });
}


/* =========================================================
   26. SCROLL EVENT OPTIMIZATION
========================================================= */

let headerScrollTicking = false;

function requestHeaderScrollUpdate() {
  if (headerScrollTicking) return;

  headerScrollTicking = true;

  window.requestAnimationFrame(() => {
    updateHeaderOnScroll();

    headerScrollTicking = false;
  });
}


/* =========================================================
   27. NAVIGATION INITIALIZATION
========================================================= */

function initializeNavigationSystem() {
  initializeMobileMenu();
  initializeSmoothScrollLinks();
  initializeHomeLogoBehaviour();
  updateActiveNavigationLinks();
  updateHeaderOnScroll();

  document.addEventListener(
    "keydown",
    handleMobileMenuKeyboard
  );

  window.addEventListener(
    "scroll",
    requestHeaderScrollUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        ElvaraApp.resizeTimer
      );

      ElvaraApp.resizeTimer =
        window.setTimeout(() => {
          closeMenuOnLargeScreen();
          updateHeaderOnScroll();
        }, 150);
    },
    { passive: true }
  );
}


/* =========================================================
   28. RUN NAVIGATION AFTER DOM READY
========================================================= */

onDocumentReady(() => {
  initializeNavigationSystem();
  handleInitialPageHash();
});


/* =========================================================
   END OF SCRIPT.JS — PART 2
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 3
   Hero Sound, Penthouse Video and Hotel Video Controls
========================================================= */


/* =========================================================
   29. GENERIC VIDEO PLAYBACK HELPER
========================================================= */

/**
 * Safely play a video.
 * @param {HTMLVideoElement|null} video
 * @returns {Promise<boolean>}
 */
async function safelyPlayVideo(video) {
  if (!video) return false;

  try {
    await video.play();
    return true;
  } catch (error) {
    return false;
  }
}


/**
 * Pause a video safely.
 * @param {HTMLVideoElement|null} video
 */
function safelyPauseVideo(video) {
  if (!video) return;

  video.pause();
}


/* =========================================================
   30. HERO SOUND CONTROL
========================================================= */

function updateHeroSoundInterface() {
  if (
    !heroVideo ||
    !heroSoundControl
  ) {
    return;
  }

  const isMuted = heroVideo.muted;

  const soundLabel =
    selectElement(
      ".sound-label",
      heroSoundControl
    );

  heroSoundControl.classList.toggle(
    "is-active",
    !isMuted
  );

  heroSoundControl.setAttribute(
    "aria-pressed",
    String(!isMuted)
  );

  heroSoundControl.setAttribute(
    "aria-label",
    isMuted
      ? "Enable hero video sound"
      : "Mute hero video sound"
  );

  if (soundLabel) {
    soundLabel.textContent =
      isMuted
        ? "Sound off"
        : "Sound on";
  }
}


/**
 * Toggle hero video sound.
 */
async function toggleHeroSound() {
  if (
    !heroVideo ||
    !heroSoundControl
  ) {
    return;
  }

  heroVideo.muted =
    !heroVideo.muted;

  heroVideo.defaultMuted =
    heroVideo.muted;

  if (!heroVideo.muted) {
    const playbackStarted =
      await safelyPlayVideo(heroVideo);

    if (!playbackStarted) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
    }
  }

  updateHeroSoundInterface();
}


/* =========================================================
   31. GENERIC VIDEO BUTTON INTERFACE
========================================================= */

/**
 * Update a play/pause control button.
 *
 * @param {HTMLVideoElement|null} video
 * @param {HTMLButtonElement|null} button
 * @param {string} labelSelector
 * @param {string} iconSelector
 */
function updateVideoControlInterface(
  video,
  button,
  labelSelector,
  iconSelector
) {
  if (
    !video ||
    !button
  ) {
    return;
  }

  const isPlaying =
    !video.paused &&
    !video.ended;

  const label =
    selectElement(
      labelSelector,
      button
    );

  const icon =
    selectElement(
      iconSelector,
      button
    );

  button.classList.toggle(
    "is-playing",
    isPlaying
  );

  button.setAttribute(
    "aria-pressed",
    String(isPlaying)
  );

  button.setAttribute(
    "aria-label",
    isPlaying
      ? "Pause property video"
      : "Play property video"
  );

  if (label) {
    label.textContent =
      isPlaying
        ? "Pause Film"
        : "Play Film";
  }

  if (icon) {
    icon.className =
      isPlaying
        ? "fa-solid fa-pause"
        : "fa-solid fa-play";
  }
}


/**
 * Toggle play and pause for a video.
 *
 * @param {HTMLVideoElement|null} video
 * @param {HTMLButtonElement|null} button
 * @param {string} labelSelector
 * @param {string} iconSelector
 */
async function toggleVideoPlayback(
  video,
  button,
  labelSelector,
  iconSelector
) {
  if (
    !video ||
    !button
  ) {
    return;
  }

  if (video.paused || video.ended) {
    await safelyPlayVideo(video);
  } else {
    safelyPauseVideo(video);
  }

  updateVideoControlInterface(
    video,
    button,
    labelSelector,
    iconSelector
  );
}


/* =========================================================
   32. PENTHOUSE SHOWCASE VIDEO
========================================================= */

function initializeShowcaseVideoControl() {
  if (
    !showcaseVideo ||
    !showcasePlayButton
  ) {
    return;
  }

  const labelSelector =
    ".video-play-label";

  const iconSelector =
    ".video-play-icon i";

  updateVideoControlInterface(
    showcaseVideo,
    showcasePlayButton,
    labelSelector,
    iconSelector
  );

  showcasePlayButton.addEventListener(
    "click",
    () => {
      toggleVideoPlayback(
        showcaseVideo,
        showcasePlayButton,
        labelSelector,
        iconSelector
      );
    }
  );

  showcaseVideo.addEventListener(
    "play",
    () => {
      updateVideoControlInterface(
        showcaseVideo,
        showcasePlayButton,
        labelSelector,
        iconSelector
      );
    }
  );

  showcaseVideo.addEventListener(
    "pause",
    () => {
      updateVideoControlInterface(
        showcaseVideo,
        showcasePlayButton,
        labelSelector,
        iconSelector
      );
    }
  );

  showcaseVideo.addEventListener(
    "ended",
    () => {
      updateVideoControlInterface(
        showcaseVideo,
        showcasePlayButton,
        labelSelector,
        iconSelector
      );
    }
  );
}


/* =========================================================
   33. HOTEL VIDEO CONTROL
========================================================= */

function initializeHotelVideoControl() {
  if (
    !hotelVideo ||
    !hotelVideoControl
  ) {
    return;
  }

  const labelSelector =
    ".hotel-video-control-text";

  const iconSelector =
    ".hotel-video-control-icon i";

  updateVideoControlInterface(
    hotelVideo,
    hotelVideoControl,
    labelSelector,
    iconSelector
  );

  hotelVideoControl.addEventListener(
    "click",
    () => {
      toggleVideoPlayback(
        hotelVideo,
        hotelVideoControl,
        labelSelector,
        iconSelector
      );
    }
  );

  hotelVideo.addEventListener(
    "play",
    () => {
      updateVideoControlInterface(
        hotelVideo,
        hotelVideoControl,
        labelSelector,
        iconSelector
      );
    }
  );

  hotelVideo.addEventListener(
    "pause",
    () => {
      updateVideoControlInterface(
        hotelVideo,
        hotelVideoControl,
        labelSelector,
        iconSelector
      );
    }
  );

  hotelVideo.addEventListener(
    "ended",
    () => {
      updateVideoControlInterface(
        hotelVideo,
        hotelVideoControl,
        labelSelector,
        iconSelector
      );
    }
  );
}


/* =========================================================
   34. AUTO-PAUSE OFFSCREEN VIDEOS
========================================================= */

const autoplayVideoStates =
  new WeakMap();


/**
 * Store whether a video was playing before
 * it moved outside the viewport.
 *
 * @param {HTMLVideoElement} video
 */
function saveAutoplayVideoState(video) {
  autoplayVideoStates.set(
    video,
    !video.paused
  );
}


/**
 * Restore playback only if the video was
 * playing before it became hidden.
 *
 * @param {HTMLVideoElement} video
 */
async function restoreAutoplayVideoState(video) {
  const wasPlaying =
    autoplayVideoStates.get(video);

  if (!wasPlaying) return;

  await safelyPlayVideo(video);
}


/**
 * Pause large background videos when they are
 * outside the viewport to improve performance.
 */
function initializeVideoVisibilityObserver() {
  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const videos =
    selectElements(
      `
        .hero-video,
        .about-background-video,
        .property-showcase-video,
        .hotel-experience-video
      `
    );

  if (videos.length === 0) return;

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (
            !(video instanceof HTMLVideoElement)
          ) {
            return;
          }

          if (entry.isIntersecting) {
            restoreAutoplayVideoState(
              video
            );
          } else {
            saveAutoplayVideoState(video);

            safelyPauseVideo(video);
          }
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: "100px 0px",
      }
    );

  videos.forEach((video) => {
    observer.observe(video);
  });
}


/* =========================================================
   35. PAGE VISIBILITY VIDEO HANDLING
========================================================= */

const pageVisibilityVideoStates =
  new WeakMap();


function pauseVideosWhenPageHidden() {
  const videos =
    selectElements("video");

  videos.forEach((video) => {
    pageVisibilityVideoStates.set(
      video,
      !video.paused
    );

    safelyPauseVideo(video);
  });
}


function restoreVideosWhenPageVisible() {
  const videos =
    selectElements("video");

  videos.forEach((video) => {
    const wasPlaying =
      pageVisibilityVideoStates.get(
        video
      );

    if (wasPlaying) {
      safelyPlayVideo(video);
    }
  });
}


function initializePageVisibilityHandling() {
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        pauseVideosWhenPageHidden();
      } else {
        restoreVideosWhenPageVisible();
      }
    }
  );
}


/* =========================================================
   36. VIDEO ERROR FALLBACK
========================================================= */

function initializeVideoErrorFallbacks() {
  const videos =
    selectElements("video");

  videos.forEach((video) => {
    video.addEventListener(
      "error",
      () => {
        video.classList.add(
          "video-load-error"
        );

        video.setAttribute(
          "aria-hidden",
          "true"
        );
      }
    );
  });
}


/* =========================================================
   37. VIDEO CONTROLS INITIALIZATION
========================================================= */

function initializeVideoControls() {
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    updateHeroSoundInterface();
  }

  addSafeEventListener(
    heroSoundControl,
    "click",
    toggleHeroSound
  );

  initializeShowcaseVideoControl();
  initializeHotelVideoControl();
  initializeVideoVisibilityObserver();
  initializePageVisibilityHandling();
  initializeVideoErrorFallbacks();
}


/* =========================================================
   38. RUN VIDEO CONTROLS
========================================================= */

onDocumentReady(() => {
  initializeVideoControls();
});


/* =========================================================
   END OF SCRIPT.JS — PART 3
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 4
   Scroll Reveal, Counters, Back-to-Top and Scroll Progress
========================================================= */


/* =========================================================
   39. SCROLL REVEAL OBSERVER
========================================================= */

/**
 * Reveal animated elements when they enter the viewport.
 */
function initializeScrollReveal() {
  const revealElements =
    selectElements(".reveal-up");

  if (revealElements.length === 0) {
    return;
  }

  /*
   Older browser fallback.
  */
  if (
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -55px 0px",
      }
    );

  revealElements.forEach(
    (element, index) => {
      /*
       Add a small stagger to nearby elements.
      */
      const staggerDelay =
        (index % 5) * 70;

      element.style.transitionDelay =
        `${staggerDelay}ms`;

      revealObserver.observe(element);
    }
  );
}


/* =========================================================
   40. COUNTER ANIMATION STATE
========================================================= */

const animatedCounters = new WeakSet();


/**
 * Animate a number from zero to its target.
 *
 * @param {HTMLElement} counterElement
 */
function animateCounter(counterElement) {
  if (
    !counterElement ||
    animatedCounters.has(counterElement)
  ) {
    return;
  }

  animatedCounters.add(counterElement);

  const targetValue =
    Number(
      counterElement.dataset.target
    );

  if (!Number.isFinite(targetValue)) {
    return;
  }

  const animationDuration = 1700;
  const startingTime =
    performance.now();

  function updateCounter(currentTime) {
    const elapsedTime =
      currentTime - startingTime;

    const rawProgress =
      clampNumber(
        elapsedTime / animationDuration,
        0,
        1
      );

    /*
     Ease-out cubic animation.
    */
    const easedProgress =
      1 - Math.pow(1 - rawProgress, 3);

    const currentValue =
      Math.round(
        targetValue * easedProgress
      );

    counterElement.textContent =
      formatNumber(currentValue);

    if (rawProgress < 1) {
      window.requestAnimationFrame(
        updateCounter
      );
    } else {
      counterElement.textContent =
        formatNumber(targetValue);
    }
  }

  window.requestAnimationFrame(
    updateCounter
  );
}


/* =========================================================
   41. COUNTER INTERSECTION OBSERVER
========================================================= */

function initializeCounters() {
  const counterElements =
    selectElements(".counter[data-target]");

  if (counterElements.length === 0) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    counterElements.forEach(
      animateCounter
    );

    return;
  }

  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.45,
      }
    );

  counterElements.forEach((counter) => {
    counterObserver.observe(counter);
  });
}


/* =========================================================
   42. BACK-TO-TOP PROGRESS CONFIGURATION
========================================================= */

const scrollCircleRadius = 22;
const scrollCircleCircumference =
  2 * Math.PI * scrollCircleRadius;


/**
 * Prepare the SVG progress-circle values.
 */
function prepareScrollProgressCircle() {
  if (!scrollProgressCircle) return;

  scrollProgressCircle.style.strokeDasharray =
    String(scrollCircleCircumference);

  scrollProgressCircle.style.strokeDashoffset =
    String(scrollCircleCircumference);
}


/* =========================================================
   43. PAGE SCROLL PROGRESS
========================================================= */

/**
 * Return page-scroll progress between zero and one.
 *
 * @returns {number}
 */
function calculatePageScrollProgress() {
  const documentElement =
    document.documentElement;

  const scrollTop =
    window.scrollY ||
    documentElement.scrollTop;

  const scrollableHeight =
    documentElement.scrollHeight -
    window.innerHeight;

  if (scrollableHeight <= 0) {
    return 0;
  }

  return clampNumber(
    scrollTop / scrollableHeight,
    0,
    1
  );
}


/**
 * Update back-to-top visibility and progress ring.
 */
function updateBackToTopButton() {
  if (!backToTopButton) return;

  const scrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop;

  const progress =
    calculatePageScrollProgress();

  backToTopButton.classList.toggle(
    "is-visible",
    scrollPosition > 520
  );

  if (scrollProgressCircle) {
    const progressOffset =
      scrollCircleCircumference -
      progress *
        scrollCircleCircumference;

    scrollProgressCircle.style.strokeDashoffset =
      String(progressOffset);
  }
}


/* =========================================================
   44. BACK-TO-TOP CLICK
========================================================= */

function initializeBackToTop() {
  if (!backToTopButton) return;

  prepareScrollProgressCircle();
  updateBackToTopButton();

  backToTopButton.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  );
}


/* =========================================================
   45. HERO PARALLAX EFFECT
========================================================= */

/**
 * Apply a subtle scroll effect to the hero background.
 */
function updateHeroScrollEffect() {
  const heroSection =
    selectElement(".hero-section");

  if (
    !heroSection ||
    !heroVideo ||
    window.innerWidth <= 767 ||
    ElvaraApp.supportsTouch
  ) {
    return;
  }

  const heroHeight =
    heroSection.offsetHeight;

  const scrollPosition =
    window.scrollY;

  if (
    scrollPosition < 0 ||
    scrollPosition > heroHeight
  ) {
    return;
  }

  const scrollRatio =
    scrollPosition / heroHeight;

  const translateValue =
    scrollRatio * 55;

  const scaleValue =
    1.02 + scrollRatio * 0.035;

  heroVideo.style.transform =
    `translate3d(0, ${translateValue}px, 0) scale(${scaleValue})`;
}


/* =========================================================
   46. FLOATING ELEMENT SCROLL EFFECT
========================================================= */

function updateFloatingScrollElements() {
  if (
    window.innerWidth <= 767 ||
    ElvaraApp.supportsTouch
  ) {
    return;
  }

  const floatingElements =
    selectElements(
      `
        .about-floating-label,
        .lifestyle-floating-card,
        .hero-property-label
      `
    );

  floatingElements.forEach(
    (element, index) => {
      const elementRectangle =
        element.getBoundingClientRect();

      if (
        elementRectangle.bottom < 0 ||
        elementRectangle.top >
          window.innerHeight
      ) {
        return;
      }

      const viewportCenter =
        window.innerHeight / 2;

      const elementCenter =
        elementRectangle.top +
        elementRectangle.height / 2;

      const distanceFromCenter =
        elementCenter - viewportCenter;

      const movementMultiplier =
        index % 2 === 0
          ? -0.025
          : 0.025;

      const movement =
        clampNumber(
          distanceFromCenter *
            movementMultiplier,
          -14,
          14
        );

      element.style.translate =
        `0 ${movement}px`;
    }
  );
}


/* =========================================================
   47. SECTION SCROLL ATTRIBUTES
========================================================= */

/**
 * Add a page-scroll CSS variable for future visual effects.
 */
function updateDocumentScrollVariable() {
  const scrollProgress =
    calculatePageScrollProgress();

  document.documentElement.style.setProperty(
    "--page-scroll-progress",
    scrollProgress.toFixed(4)
  );
}


/* =========================================================
   48. SHARED SCROLL UPDATE
========================================================= */

let visualScrollTicking = false;

function updateScrollVisuals() {
  updateBackToTopButton();
  updateHeroScrollEffect();
  updateFloatingScrollElements();
  updateDocumentScrollVariable();
}


/**
 * Request one optimized animation-frame update.
 */
function requestVisualScrollUpdate() {
  if (visualScrollTicking) return;

  visualScrollTicking = true;

  window.requestAnimationFrame(() => {
    updateScrollVisuals();

    visualScrollTicking = false;
  });
}


/* =========================================================
   49. RESET PARALLAX ON SMALL SCREENS
========================================================= */

function resetScrollEffectsOnSmallScreens() {
  if (window.innerWidth > 767) {
    return;
  }

  if (heroVideo) {
    heroVideo.style.transform = "";
  }

  selectElements(
    `
      .about-floating-label,
      .lifestyle-floating-card,
      .hero-property-label
    `
  ).forEach((element) => {
    element.style.translate = "";
  });
}


/* =========================================================
   50. SCROLL EFFECT INITIALIZATION
========================================================= */

function initializeScrollEffects() {
  initializeScrollReveal();
  initializeCounters();
  initializeBackToTop();
  updateScrollVisuals();

  window.addEventListener(
    "scroll",
    requestVisualScrollUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        ElvaraApp.scrollTimer
      );

      ElvaraApp.scrollTimer =
        window.setTimeout(() => {
          resetScrollEffectsOnSmallScreens();
          updateScrollVisuals();
        }, 140);
    },
    { passive: true }
  );
}


/* =========================================================
   51. RUN SCROLL EFFECTS
========================================================= */

onDocumentReady(() => {
  initializeScrollEffects();
});


/* =========================================================
   END OF SCRIPT.JS — PART 4
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 5
   3D Tilt, Mouse Parallax, Magnetic Buttons and Custom Cursor
========================================================= */


/* =========================================================
   52. DESKTOP INTERACTION CHECK
========================================================= */

/**
 * Return true only when advanced pointer effects
 * should be enabled.
 *
 * @returns {boolean}
 */
function canUseDesktopEffects() {
  return (
    window.innerWidth > 991 &&
    !ElvaraApp.supportsTouch &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  );
}


/* =========================================================
   53. 3D TILT SETTINGS
========================================================= */

const tiltSettings = {
  maximumRotation: 6,
  perspective: 1100,
  scale: 1.015,
  transitionDuration: 180,
};


/**
 * Reset one tilt card to its original position.
 *
 * @param {HTMLElement} card
 */
function resetTiltCard(card) {
  if (!card) return;

  card.style.transform =
    "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";

  card.style.transition =
    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
}


/**
 * Apply a 3D tilt based on pointer position.
 *
 * @param {PointerEvent} event
 * @param {HTMLElement} card
 */
function updateTiltCard(event, card) {
  if (
    !card ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  const rectangle =
    card.getBoundingClientRect();

  const pointerX =
    event.clientX - rectangle.left;

  const pointerY =
    event.clientY - rectangle.top;

  const horizontalRatio =
    pointerX / rectangle.width;

  const verticalRatio =
    pointerY / rectangle.height;

  const rotateY =
    (horizontalRatio - 0.5) *
    tiltSettings.maximumRotation *
    2;

  const rotateX =
    (0.5 - verticalRatio) *
    tiltSettings.maximumRotation *
    2;

  card.style.transition =
    `transform ${tiltSettings.transitionDuration}ms ease-out`;

  card.style.transform =
    `
      perspective(${tiltSettings.perspective}px)
      rotateX(${rotateX.toFixed(2)}deg)
      rotateY(${rotateY.toFixed(2)}deg)
      scale(${tiltSettings.scale})
    `;
}


/* =========================================================
   54. INITIALIZE 3D TILT CARDS
========================================================= */

function initializeTiltCards() {
  const tiltCards =
    selectElements(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        updateTiltCard(event, card);
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        resetTiltCard(card);
      }
    );

    card.addEventListener(
      "pointercancel",
      () => {
        resetTiltCard(card);
      }
    );
  });
}


/* =========================================================
   55. PROPERTY CARD IMAGE DEPTH
========================================================= */

/**
 * Add a subtle image-depth movement inside property cards.
 *
 * @param {PointerEvent} event
 * @param {HTMLElement} card
 */
function updatePropertyImageDepth(
  event,
  card
) {
  if (
    !card ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  const image =
    selectElement("img", card);

  if (!image) return;

  const rectangle =
    card.getBoundingClientRect();

  const horizontalPosition =
    (
      event.clientX -
      rectangle.left
    ) / rectangle.width;

  const verticalPosition =
    (
      event.clientY -
      rectangle.top
    ) / rectangle.height;

  const translateX =
    (horizontalPosition - 0.5) * 10;

  const translateY =
    (verticalPosition - 0.5) * 10;

  image.style.transform =
    `
      scale(1.08)
      translate3d(
        ${translateX.toFixed(2)}px,
        ${translateY.toFixed(2)}px,
        0
      )
    `;
}


/**
 * Reset card image movement.
 *
 * @param {HTMLElement} card
 */
function resetPropertyImageDepth(card) {
  const image =
    selectElement("img", card);

  if (!image) return;

  image.style.transform = "";
}


/* =========================================================
   56. INITIALIZE PROPERTY DEPTH
========================================================= */

function initializePropertyDepthEffects() {
  const propertyMediaElements =
    selectElements(
      `
        .featured-property-media,
        .property-card-media,
        .lifestyle-main-image
      `
    );

  propertyMediaElements.forEach(
    (mediaElement) => {
      mediaElement.addEventListener(
        "pointermove",
        (event) => {
          updatePropertyImageDepth(
            event,
            mediaElement
          );
        }
      );

      mediaElement.addEventListener(
        "pointerleave",
        () => {
          resetPropertyImageDepth(
            mediaElement
          );
        }
      );
    }
  );
}


/* =========================================================
   57. MAGNETIC BUTTON EFFECT
========================================================= */

/**
 * Move a button subtly toward the pointer.
 *
 * @param {PointerEvent} event
 * @param {HTMLElement} button
 */
function updateMagneticButton(
  event,
  button
) {
  if (
    !button ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  const rectangle =
    button.getBoundingClientRect();

  const pointerX =
    event.clientX -
    rectangle.left -
    rectangle.width / 2;

  const pointerY =
    event.clientY -
    rectangle.top -
    rectangle.height / 2;

  const movementStrength = 0.14;

  button.style.transform =
    `
      translate3d(
        ${(pointerX * movementStrength).toFixed(2)}px,
        ${(pointerY * movementStrength).toFixed(2)}px,
        0
      )
    `;
}


/**
 * Restore magnetic button position.
 *
 * @param {HTMLElement} button
 */
function resetMagneticButton(button) {
  if (!button) return;

  button.style.transform =
    "translate3d(0, 0, 0)";
}


/* =========================================================
   58. INITIALIZE MAGNETIC BUTTONS
========================================================= */

function initializeMagneticButtons() {
  const magneticButtons =
    selectElements(".magnetic-btn");

  magneticButtons.forEach((button) => {
    button.addEventListener(
      "pointermove",
      (event) => {
        updateMagneticButton(
          event,
          button
        );
      }
    );

    button.addEventListener(
      "pointerleave",
      () => {
        resetMagneticButton(button);
      }
    );
  });
}


/* =========================================================
   59. CUSTOM CURSOR STATE
========================================================= */

const cursorState = {
  targetX: 0,
  targetY: 0,
  followerX: 0,
  followerY: 0,
  animationFrame: null,
};


/**
 * Update cursor position target.
 *
 * @param {PointerEvent} event
 */
function trackCursorPosition(event) {
  cursorState.targetX = event.clientX;
  cursorState.targetY = event.clientY;

  if (customCursor) {
    customCursor.style.transform =
      `translate3d(
        ${event.clientX}px,
        ${event.clientY}px,
        0
      ) translate(-50%, -50%)`;
  }
}


/**
 * Smoothly animate the cursor follower.
 */
function animateCursorFollower() {
  if (!cursorFollower) return;

  const easing = 0.16;

  cursorState.followerX +=
    (
      cursorState.targetX -
      cursorState.followerX
    ) * easing;

  cursorState.followerY +=
    (
      cursorState.targetY -
      cursorState.followerY
    ) * easing;

  cursorFollower.style.transform =
    `translate3d(
      ${cursorState.followerX}px,
      ${cursorState.followerY}px,
      0
    ) translate(-50%, -50%)`;

  cursorState.animationFrame =
    window.requestAnimationFrame(
      animateCursorFollower
    );
}


/* =========================================================
   60. CURSOR HOVER STATES
========================================================= */

function initializeCursorHoverStates() {
  if (
    !cursorFollower ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  const interactiveElements =
    selectElements(
      `
        a,
        button,
        input,
        textarea,
        select,
        .tilt-card,
        .property-card,
        .service-card,
        .gallery-preview-item,
        .experience-card
      `
    );

  interactiveElements.forEach(
    (element) => {
      element.addEventListener(
        "pointerenter",
        () => {
          cursorFollower.classList.add(
            "cursor-hover"
          );
        }
      );

      element.addEventListener(
        "pointerleave",
        () => {
          cursorFollower.classList.remove(
            "cursor-hover"
          );
        }
      );
    }
  );
}


/* =========================================================
   61. CUSTOM CURSOR INITIALIZATION
========================================================= */

function initializeCustomCursor() {
  if (
    !customCursor ||
    !cursorFollower ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  document.addEventListener(
    "pointermove",
    trackCursorPosition,
    { passive: true }
  );

  document.addEventListener(
    "pointerleave",
    () => {
      customCursor.style.opacity = "0";
      cursorFollower.style.opacity = "0";
    }
  );

  document.addEventListener(
    "pointerenter",
    () => {
      customCursor.style.opacity = "1";
      cursorFollower.style.opacity = "1";
    }
  );

  initializeCursorHoverStates();

  cursorState.animationFrame =
    window.requestAnimationFrame(
      animateCursorFollower
    );
}


/* =========================================================
   62. HERO MOUSE PARALLAX
========================================================= */

function initializeHeroMouseParallax() {
  const heroSection =
    selectElement(".hero-section");

  const heroContent =
    selectElement(".hero-content");

  const heroLabel =
    selectElement(
      ".hero-property-label"
    );

  if (
    !heroSection ||
    !canUseDesktopEffects()
  ) {
    return;
  }

  heroSection.addEventListener(
    "pointermove",
    (event) => {
      const rectangle =
        heroSection.getBoundingClientRect();

      const horizontalRatio =
        (
          event.clientX -
          rectangle.left
        ) / rectangle.width - 0.5;

      const verticalRatio =
        (
          event.clientY -
          rectangle.top
        ) / rectangle.height - 0.5;

      if (heroContent) {
        heroContent.style.transform =
          `
            translate3d(
              ${(horizontalRatio * 8).toFixed(2)}px,
              ${(verticalRatio * 6).toFixed(2)}px,
              0
            )
          `;
      }

      if (heroLabel) {
        heroLabel.style.marginRight =
          `${(horizontalRatio * -7).toFixed(2)}px`;

        heroLabel.style.marginTop =
          `${(verticalRatio * -5).toFixed(2)}px`;
      }
    }
  );

  heroSection.addEventListener(
    "pointerleave",
    () => {
      if (heroContent) {
        heroContent.style.transform = "";
      }

      if (heroLabel) {
        heroLabel.style.marginRight = "";
        heroLabel.style.marginTop = "";
      }
    }
  );
}


/* =========================================================
   63. RESET DESKTOP EFFECTS
========================================================= */

function resetDesktopInteractionEffects() {
  if (canUseDesktopEffects()) {
    return;
  }

  selectElements(".tilt-card").forEach(
    (card) => {
      card.style.transform = "";
      card.style.transition = "";
    }
  );

  selectElements(".magnetic-btn").forEach(
    (button) => {
      button.style.transform = "";
    }
  );

  selectElements(
    `
      .featured-property-media img,
      .property-card-media img,
      .lifestyle-main-image img
    `
  ).forEach((image) => {
    image.style.transform = "";
  });

  if (customCursor) {
    customCursor.style.opacity = "0";
  }

  if (cursorFollower) {
    cursorFollower.style.opacity = "0";
  }
}


/* =========================================================
   64. ADVANCED INTERACTION INITIALIZATION
========================================================= */

function initializeAdvancedInteractions() {
  initializeTiltCards();
  initializePropertyDepthEffects();
  initializeMagneticButtons();
  initializeCustomCursor();
  initializeHeroMouseParallax();

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        ElvaraApp.resizeTimer
      );

      ElvaraApp.resizeTimer =
        window.setTimeout(() => {
          resetDesktopInteractionEffects();
        }, 180);
    },
    { passive: true }
  );
}


/* =========================================================
   65. RUN ADVANCED INTERACTIONS
========================================================= */

onDocumentReady(() => {
  initializeAdvancedInteractions();
});


/* =========================================================
   END OF SCRIPT.JS — PART 5
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 6
   Testimonials Slider, Gallery Lightbox and Keyboard Controls
========================================================= */


/* =========================================================
   66. TESTIMONIAL ELEMENTS
========================================================= */

const testimonialSlides =
  selectElements(".testimonial-slide");

const testimonialCurrentNumber =
  selectElement(
    ".testimonial-progress-current"
  );

const testimonialTotalNumber =
  selectElement(
    ".testimonial-progress-total"
  );

const testimonialAutoPlayDelay = 6500;


/* =========================================================
   67. FORMAT SLIDER NUMBER
========================================================= */

/**
 * Convert a number into a two-digit slider label.
 *
 * @param {number} value
 * @returns {string}
 */
function formatSliderNumber(value) {
  return String(value).padStart(2, "0");
}


/* =========================================================
   68. TESTIMONIAL INTERFACE UPDATE
========================================================= */

/**
 * Display a testimonial by index.
 *
 * @param {number} requestedIndex
 */
function showTestimonial(requestedIndex) {
  if (testimonialSlides.length === 0) {
    return;
  }

  const totalSlides =
    testimonialSlides.length;

  const normalizedIndex =
    (
      requestedIndex % totalSlides +
      totalSlides
    ) % totalSlides;

  testimonialSlides.forEach(
    (slide, index) => {
      const isActive =
        index === normalizedIndex;

      slide.classList.toggle(
        "active",
        isActive
      );

      slide.setAttribute(
        "aria-hidden",
        String(!isActive)
      );

      if (isActive) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
    }
  );

  ElvaraApp.currentTestimonial =
    normalizedIndex;

  if (testimonialCurrentNumber) {
    testimonialCurrentNumber.textContent =
      formatSliderNumber(
        normalizedIndex + 1
      );
  }

  if (testimonialTotalNumber) {
    testimonialTotalNumber.textContent =
      formatSliderNumber(totalSlides);
  }

  if (testimonialProgressBar) {
    const progressPercentage =
      (
        (normalizedIndex + 1) /
        totalSlides
      ) * 100;

    testimonialProgressBar.style.width =
      `${progressPercentage}%`;
  }
}


/* =========================================================
   69. TESTIMONIAL NEXT AND PREVIOUS
========================================================= */

function showNextTestimonial() {
  showTestimonial(
    ElvaraApp.currentTestimonial + 1
  );
}


function showPreviousTestimonial() {
  showTestimonial(
    ElvaraApp.currentTestimonial - 1
  );
}


/* =========================================================
   70. TESTIMONIAL AUTO PLAY
========================================================= */

function stopTestimonialAutoPlay() {
  if (!ElvaraApp.testimonialTimer) {
    return;
  }

  window.clearInterval(
    ElvaraApp.testimonialTimer
  );

  ElvaraApp.testimonialTimer = null;
}


function startTestimonialAutoPlay() {
  if (
    testimonialSlides.length <= 1 ||
    document.hidden
  ) {
    return;
  }

  stopTestimonialAutoPlay();

  ElvaraApp.testimonialTimer =
    window.setInterval(
      showNextTestimonial,
      testimonialAutoPlayDelay
    );
}


function restartTestimonialAutoPlay() {
  stopTestimonialAutoPlay();
  startTestimonialAutoPlay();
}


/* =========================================================
   71. TESTIMONIAL SWIPE SUPPORT
========================================================= */

let testimonialTouchStartX = 0;
let testimonialTouchEndX = 0;


function handleTestimonialSwipe() {
  const swipeDistance =
    testimonialTouchEndX -
    testimonialTouchStartX;

  const minimumSwipeDistance = 45;

  if (
    Math.abs(swipeDistance) <
    minimumSwipeDistance
  ) {
    return;
  }

  if (swipeDistance < 0) {
    showNextTestimonial();
  } else {
    showPreviousTestimonial();
  }

  restartTestimonialAutoPlay();
}


/* =========================================================
   72. TESTIMONIAL KEYBOARD CONTROL
========================================================= */

function handleTestimonialKeyboard(event) {
  if (!testimonialSlider) return;

  if (
    event.key === "ArrowRight"
  ) {
    event.preventDefault();

    showNextTestimonial();
    restartTestimonialAutoPlay();
  }

  if (
    event.key === "ArrowLeft"
  ) {
    event.preventDefault();

    showPreviousTestimonial();
    restartTestimonialAutoPlay();
  }
}


/* =========================================================
   73. INITIALIZE TESTIMONIAL SLIDER
========================================================= */

function initializeTestimonialSlider() {
  if (
    !testimonialSlider ||
    testimonialSlides.length === 0
  ) {
    return;
  }

  testimonialSlider.setAttribute(
    "role",
    "region"
  );

  testimonialSlider.setAttribute(
    "aria-label",
    "Client testimonials"
  );

  testimonialSlider.setAttribute(
    "tabindex",
    "0"
  );

  testimonialSlides.forEach(
    (slide, index) => {
      slide.setAttribute(
        "role",
        "group"
      );

      slide.setAttribute(
        "aria-label",
        `Testimonial ${index + 1} of ${testimonialSlides.length}`
      );
    }
  );

  showTestimonial(0);

  addSafeEventListener(
    testimonialPreviousButton,
    "click",
    () => {
      showPreviousTestimonial();
      restartTestimonialAutoPlay();
    }
  );

  addSafeEventListener(
    testimonialNextButton,
    "click",
    () => {
      showNextTestimonial();
      restartTestimonialAutoPlay();
    }
  );

  testimonialSlider.addEventListener(
    "keydown",
    handleTestimonialKeyboard
  );

  testimonialSlider.addEventListener(
    "mouseenter",
    stopTestimonialAutoPlay
  );

  testimonialSlider.addEventListener(
    "mouseleave",
    startTestimonialAutoPlay
  );

  testimonialSlider.addEventListener(
    "focusin",
    stopTestimonialAutoPlay
  );

  testimonialSlider.addEventListener(
    "focusout",
    startTestimonialAutoPlay
  );

  testimonialSlider.addEventListener(
    "touchstart",
    (event) => {
      testimonialTouchStartX =
        event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  testimonialSlider.addEventListener(
    "touchend",
    (event) => {
      testimonialTouchEndX =
        event.changedTouches[0].clientX;

      handleTestimonialSwipe();
    },
    { passive: true }
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        stopTestimonialAutoPlay();
      } else {
        startTestimonialAutoPlay();
      }
    }
  );

  startTestimonialAutoPlay();
}


/* =========================================================
   74. GALLERY LIGHTBOX STATE
========================================================= */

const galleryLightboxState = {
  isOpen: false,
  currentIndex: 0,
  items: [],
  previousFocusedElement: null,
};


/* =========================================================
   75. CREATE GALLERY LIGHTBOX
========================================================= */

function createGalleryLightbox() {
  if (
    selectElement("#galleryLightbox")
  ) {
    return selectElement(
      "#galleryLightbox"
    );
  }

  const lightbox =
    document.createElement("div");

  lightbox.id = "galleryLightbox";
  lightbox.className =
    "gallery-lightbox";

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightbox.innerHTML = `
    <div class="gallery-lightbox-backdrop"></div>

    <div
      class="gallery-lightbox-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Property gallery preview"
    >
      <button
        class="gallery-lightbox-close"
        type="button"
        aria-label="Close gallery preview"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <button
        class="gallery-lightbox-control gallery-lightbox-previous"
        type="button"
        aria-label="View previous image"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <figure class="gallery-lightbox-figure">

        <img
          class="gallery-lightbox-image"
          src=""
          alt=""
        >

        <figcaption class="gallery-lightbox-caption">

          <div>
            <small class="gallery-lightbox-category">
              Élvara Collection
            </small>

            <strong class="gallery-lightbox-title">
              Property experience
            </strong>
          </div>

          <span class="gallery-lightbox-counter">
            01 / 01
          </span>

        </figcaption>

      </figure>

      <button
        class="gallery-lightbox-control gallery-lightbox-next"
        type="button"
        aria-label="View next image"
      >
        <i class="fa-solid fa-arrow-right"></i>
      </button>

    </div>
  `;

  document.body.appendChild(lightbox);

  return lightbox;
}


/* =========================================================
   76. COLLECT GALLERY ITEMS
========================================================= */

function collectGalleryLightboxItems() {
  const galleryLinks =
    selectElements(
      ".gallery-preview-item"
    );

  galleryLightboxState.items =
    galleryLinks
      .map((link) => {
        const image =
          selectElement("img", link);

        const title =
          selectElement("h3", link);

        const category =
          selectElement(
            ".gallery-preview-category",
            link
          );

        if (!image) return null;

        return {
          element: link,
          source:
            image.currentSrc ||
            image.src,
          alternativeText:
            image.alt ||
            "Luxury property image",
          title:
            title?.textContent.trim() ||
            "Élvara property experience",
          category:
            category?.textContent.trim() ||
            "Élvara Collection",
        };
      })
      .filter(Boolean);
}


/* =========================================================
   77. UPDATE LIGHTBOX CONTENT
========================================================= */

function updateGalleryLightbox() {
  const lightbox =
    selectElement("#galleryLightbox");

  if (
    !lightbox ||
    galleryLightboxState.items.length === 0
  ) {
    return;
  }

  const totalItems =
    galleryLightboxState.items.length;

  galleryLightboxState.currentIndex =
    (
      galleryLightboxState.currentIndex %
        totalItems +
      totalItems
    ) % totalItems;

  const currentItem =
    galleryLightboxState.items[
      galleryLightboxState.currentIndex
    ];

  const image =
    selectElement(
      ".gallery-lightbox-image",
      lightbox
    );

  const title =
    selectElement(
      ".gallery-lightbox-title",
      lightbox
    );

  const category =
    selectElement(
      ".gallery-lightbox-category",
      lightbox
    );

  const counter =
    selectElement(
      ".gallery-lightbox-counter",
      lightbox
    );

  if (image) {
    image.classList.add(
      "is-changing"
    );

    window.setTimeout(() => {
      image.src = currentItem.source;
      image.alt =
        currentItem.alternativeText;

      image.classList.remove(
        "is-changing"
      );
    }, 140);
  }

  if (title) {
    title.textContent =
      currentItem.title;
  }

  if (category) {
    category.textContent =
      currentItem.category;
  }

  if (counter) {
    counter.textContent =
      `${formatSliderNumber(
        galleryLightboxState.currentIndex + 1
      )} / ${formatSliderNumber(
        totalItems
      )}`;
  }
}


/* =========================================================
   78. OPEN GALLERY LIGHTBOX
========================================================= */

function openGalleryLightbox(index) {
  const lightbox =
    createGalleryLightbox();

  collectGalleryLightboxItems();

  if (
    galleryLightboxState.items.length === 0
  ) {
    return;
  }

  galleryLightboxState.currentIndex =
    index;

  galleryLightboxState.isOpen = true;

  galleryLightboxState.previousFocusedElement =
    document.activeElement;

  updateGalleryLightbox();

  lightbox.classList.add("is-open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  lockPageScroll();

  window.setTimeout(() => {
    selectElement(
      ".gallery-lightbox-close",
      lightbox
    )?.focus();
  }, 150);
}


/* =========================================================
   79. CLOSE GALLERY LIGHTBOX
========================================================= */

function closeGalleryLightbox() {
  const lightbox =
    selectElement("#galleryLightbox");

  if (
    !lightbox ||
    !galleryLightboxState.isOpen
  ) {
    return;
  }

  galleryLightboxState.isOpen = false;

  lightbox.classList.remove("is-open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  unlockPageScroll();

  const previousElement =
    galleryLightboxState
      .previousFocusedElement;

  if (
    previousElement instanceof HTMLElement
  ) {
    window.setTimeout(() => {
      previousElement.focus();
    }, 120);
  }
}


/* =========================================================
   80. LIGHTBOX NAVIGATION
========================================================= */

function showNextGalleryImage() {
  galleryLightboxState.currentIndex += 1;

  updateGalleryLightbox();
}


function showPreviousGalleryImage() {
  galleryLightboxState.currentIndex -= 1;

  updateGalleryLightbox();
}


/* =========================================================
   81. LIGHTBOX KEYBOARD CONTROL
========================================================= */

function handleGalleryLightboxKeyboard(
  event
) {
  if (!galleryLightboxState.isOpen) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();

    closeGalleryLightbox();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();

    showNextGalleryImage();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    showPreviousGalleryImage();
  }

  if (event.key !== "Tab") return;

  const lightbox =
    selectElement("#galleryLightbox");

  if (!lightbox) return;

  const focusableElements =
    selectElements(
      "button:not([disabled]), a[href]",
      lightbox
    ).filter((element) => {
      return (
        element.offsetWidth > 0 ||
        element.offsetHeight > 0
      );
    });

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement =
    focusableElements[0];

  const lastElement =
    focusableElements[
      focusableElements.length - 1
    ];

  if (
    event.shiftKey &&
    document.activeElement ===
      firstElement
  ) {
    event.preventDefault();

    lastElement.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement ===
      lastElement
  ) {
    event.preventDefault();

    firstElement.focus();
  }
}


/* =========================================================
   82. LIGHTBOX SWIPE SUPPORT
========================================================= */

let galleryTouchStartX = 0;
let galleryTouchEndX = 0;


function handleGallerySwipe() {
  const swipeDistance =
    galleryTouchEndX -
    galleryTouchStartX;

  if (
    Math.abs(swipeDistance) < 45
  ) {
    return;
  }

  if (swipeDistance < 0) {
    showNextGalleryImage();
  } else {
    showPreviousGalleryImage();
  }
}


/* =========================================================
   83. INITIALIZE GALLERY LIGHTBOX
========================================================= */

function initializeGalleryLightbox() {
  const galleryItems =
    selectElements(
      ".gallery-preview-item"
    );

  if (galleryItems.length === 0) {
    return;
  }

  const lightbox =
    createGalleryLightbox();

  collectGalleryLightboxItems();

  galleryItems.forEach(
    (item, index) => {
      item.addEventListener(
        "click",
        (event) => {
          event.preventDefault();

          openGalleryLightbox(index);
        }
      );
    }
  );

  const closeButton =
    selectElement(
      ".gallery-lightbox-close",
      lightbox
    );

  const previousButton =
    selectElement(
      ".gallery-lightbox-previous",
      lightbox
    );

  const nextButton =
    selectElement(
      ".gallery-lightbox-next",
      lightbox
    );

  const backdrop =
    selectElement(
      ".gallery-lightbox-backdrop",
      lightbox
    );

  addSafeEventListener(
    closeButton,
    "click",
    closeGalleryLightbox
  );

  addSafeEventListener(
    previousButton,
    "click",
    showPreviousGalleryImage
  );

  addSafeEventListener(
    nextButton,
    "click",
    showNextGalleryImage
  );

  addSafeEventListener(
    backdrop,
    "click",
    closeGalleryLightbox
  );

  lightbox.addEventListener(
    "touchstart",
    (event) => {
      galleryTouchStartX =
        event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      galleryTouchEndX =
        event.changedTouches[0].clientX;

      handleGallerySwipe();
    },
    { passive: true }
  );

  document.addEventListener(
    "keydown",
    handleGalleryLightboxKeyboard
  );
}


/* =========================================================
   84. ADD LIGHTBOX STYLES
========================================================= */

function injectGalleryLightboxStyles() {
  if (
    selectElement(
      "#galleryLightboxStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "galleryLightboxStyles";

  styleElement.textContent = `
    .gallery-lightbox {
      position: fixed;
      inset: 0;
      z-index: 10020;
      display: grid;
      place-items: center;
      padding: 24px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition:
        opacity 0.35s ease,
        visibility 0.35s ease;
    }

    .gallery-lightbox.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .gallery-lightbox-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(5, 6, 6, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .gallery-lightbox-dialog {
      position: relative;
      z-index: 2;
      width: min(1100px, 100%);
      transform: translateY(24px) scale(0.98);
      transition:
        transform 0.45s
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    .gallery-lightbox.is-open
    .gallery-lightbox-dialog {
      transform: translateY(0) scale(1);
    }

    .gallery-lightbox-figure {
      overflow: hidden;
      border: 1px solid
        rgba(255, 255, 255, 0.14);
      border-radius: 24px;
      background: #101111;
      box-shadow:
        0 35px 100px rgba(0, 0, 0, 0.45);
    }

    .gallery-lightbox-image {
      width: 100%;
      height: min(70vh, 680px);
      object-fit: cover;
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    .gallery-lightbox-image.is-changing {
      opacity: 0.2;
    }

    .gallery-lightbox-caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 20px 24px;
      color: #ffffff;
      background: #101111;
    }

    .gallery-lightbox-caption div {
      display: flex;
      flex-direction: column;
    }

    .gallery-lightbox-category {
      color: #e0c58e;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .gallery-lightbox-title {
      margin-top: 6px;
      font-family: "Cormorant Garamond", serif;
      font-size: 25px;
      font-weight: 500;
    }

    .gallery-lightbox-counter {
      color: rgba(255, 255, 255, 0.55);
      font-size: 9px;
      font-weight: 700;
            letter-spacing: 0.13em;
    }

    .gallery-lightbox-close,
    .gallery-lightbox-control {
      position: absolute;
      z-index: 4;

      display: grid;
      place-items: center;

      width: 48px;
      height: 48px;

      border: 1px solid
        rgba(255, 255, 255, 0.2);
      border-radius: 50%;

      background: rgba(8, 9, 9, 0.68);
      color: #ffffff;

      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .gallery-lightbox-close:hover,
    .gallery-lightbox-control:hover {
      border-color: #c8a96b;
      background: #c8a96b;
      color: #080909;
    }

    .gallery-lightbox-close {
      top: -16px;
      right: -16px;
    }

    .gallery-lightbox-close:hover {
      transform: rotate(90deg);
    }

    .gallery-lightbox-previous {
      top: 50%;
      left: -24px;

      transform: translateY(-50%);
    }

    .gallery-lightbox-next {
      top: 50%;
      right: -24px;

      transform: translateY(-50%);
    }

    .gallery-lightbox-previous:hover {
      transform:
        translateY(-50%)
        translateX(-3px);
    }

    .gallery-lightbox-next:hover {
      transform:
        translateY(-50%)
        translateX(3px);
    }

    @media (max-width: 767px) {
      .gallery-lightbox {
        padding: 14px;
      }

      .gallery-lightbox-image {
        height: 62vh;
      }

      .gallery-lightbox-caption {
        align-items: flex-start;
        padding: 16px;
      }

      .gallery-lightbox-title {
        font-size: 21px;
      }

      .gallery-lightbox-close {
        top: 10px;
        right: 10px;
      }

      .gallery-lightbox-control {
        width: 42px;
        height: 42px;
      }

      .gallery-lightbox-previous {
        left: 10px;
      }

      .gallery-lightbox-next {
        right: 10px;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   85. SLIDER AND LIGHTBOX INITIALIZATION
========================================================= */

function initializeSliderAndGallery() {
  initializeTestimonialSlider();
  injectGalleryLightboxStyles();
  initializeGalleryLightbox();
}


/* =========================================================
   86. RUN SLIDER AND GALLERY
========================================================= */

onDocumentReady(() => {
  initializeSliderAndGallery();
});


/* =========================================================
   END OF SCRIPT.JS — PART 6
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 7
   Newsletter Validation, Cookie Notice, WhatsApp and Feedback
========================================================= */


/* =========================================================
   87. EMAIL VALIDATION
========================================================= */

/**
 * Check whether an email address has a valid basic format.
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmailAddress(email) {
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailPattern.test(
    email.trim()
  );
}


/* =========================================================
   88. NEWSLETTER MESSAGE
========================================================= */

/**
 * Show newsletter form feedback.
 *
 * @param {string} message
 * @param {"success"|"error"|"neutral"} type
 */
function showNewsletterMessage(
  message,
  type = "neutral"
) {
  if (!newsletterMessage) return;

  newsletterMessage.textContent =
    message;

  newsletterMessage.classList.remove(
    "is-success",
    "is-error",
    "is-neutral"
  );

  newsletterMessage.classList.add(
    `is-${type}`
  );
}


/* =========================================================
   89. NEWSLETTER FORM VALIDATION
========================================================= */

function handleNewsletterSubmission(event) {
  event.preventDefault();

  if (!newsletterForm) return;

  const emailInput =
    selectElement(
      "#newsletterEmail",
      newsletterForm
    );

  const consentInput =
    selectElement(
      "#newsletterConsent",
      newsletterForm
    );

  if (!emailInput) return;

  const emailValue =
    emailInput.value.trim();

  if (!emailValue) {
    showNewsletterMessage(
      "Please enter your email address.",
      "error"
    );

    emailInput.focus();
    return;
  }

  if (
    !isValidEmailAddress(emailValue)
  ) {
    showNewsletterMessage(
      "Please enter a valid email address.",
      "error"
    );

    emailInput.focus();
    return;
  }

  if (
    consentInput &&
    !consentInput.checked
  ) {
    showNewsletterMessage(
      "Please accept the consent option before subscribing.",
      "error"
    );

    consentInput.focus();
    return;
  }

  showNewsletterMessage(
    "Thank you. You have joined the Élvara private list.",
    "success"
  );

  newsletterForm.reset();

  /*
   This is a front-end demo.
   A real project would send the email to a server here.
  */
}


/* =========================================================
   90. CLEAR NEWSLETTER ERROR WHILE TYPING
========================================================= */

function initializeNewsletterInputFeedback() {
  if (!newsletterForm) return;

  const emailInput =
    selectElement(
      "#newsletterEmail",
      newsletterForm
    );

  const consentInput =
    selectElement(
      "#newsletterConsent",
      newsletterForm
    );

  addSafeEventListener(
    emailInput,
    "input",
    () => {
      if (
        newsletterMessage?.classList.contains(
          "is-error"
        )
      ) {
        showNewsletterMessage(
          "",
          "neutral"
        );
      }
    }
  );

  addSafeEventListener(
    consentInput,
    "change",
    () => {
      if (
        newsletterMessage?.classList.contains(
          "is-error"
        )
      ) {
        showNewsletterMessage(
          "",
          "neutral"
        );
      }
    }
  );
}


/* =========================================================
   91. COOKIE PREFERENCE KEYS
========================================================= */

const cookiePreferenceKey =
  "elvara-cookie-preference";

const cookieNoticeDelay = 1700;


/* =========================================================
   92. SAFE LOCAL STORAGE HELPERS
========================================================= */

/**
 * Read local storage safely.
 *
 * @param {string} key
 * @returns {string|null}
 */
function getStoredPreference(key) {
  try {
    return window.localStorage.getItem(
      key
    );
  } catch (error) {
    return null;
  }
}


/**
 * Save local storage safely.
 *
 * @param {string} key
 * @param {string} value
 */
function saveStoredPreference(
  key,
  value
) {
  try {
    window.localStorage.setItem(
      key,
      value
    );
  } catch (error) {
    /*
     Some browsers can block local storage.
     The website will continue normally.
    */
  }
}


/* =========================================================
   93. COOKIE NOTICE DISPLAY
========================================================= */

function showCookieNotice() {
  if (!cookieNotice) return;

  cookieNotice.classList.add(
    "is-visible"
  );

  cookieNotice.setAttribute(
    "aria-hidden",
    "false"
  );
}


function hideCookieNotice() {
  if (!cookieNotice) return;

  cookieNotice.classList.remove(
    "is-visible"
  );

  cookieNotice.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* =========================================================
   94. COOKIE PREFERENCE ACTION
========================================================= */

/**
 * Save and close the cookie preference notice.
 *
 * @param {"accepted"|"declined"} preference
 */
function setCookiePreference(preference) {
  saveStoredPreference(
    cookiePreferenceKey,
    preference
  );

  hideCookieNotice();
}


/* =========================================================
   95. INITIALIZE COOKIE NOTICE
========================================================= */

function initializeCookieNotice() {
  if (!cookieNotice) return;

  cookieNotice.setAttribute(
    "aria-hidden",
    "true"
  );

  const existingPreference =
    getStoredPreference(
      cookiePreferenceKey
    );

  if (existingPreference) {
    hideCookieNotice();
    return;
  }

  window.setTimeout(
    showCookieNotice,
    cookieNoticeDelay
  );

  addSafeEventListener(
    cookieAcceptButton,
    "click",
    () => {
      setCookiePreference(
        "accepted"
      );
    }
  );

  addSafeEventListener(
    cookieDeclineButton,
    "click",
    () => {
      setCookiePreference(
        "declined"
      );
    }
  );
}


/* =========================================================
   96. FLOATING WHATSAPP BUTTON
========================================================= */

function initializeFloatingContactButton() {
  const floatingContactButton =
    selectElement(
      ".floating-contact-button"
    );

  if (!floatingContactButton) {
    return;
  }

  /*
   Add a subtle pulse only after the visitor
   has scrolled beyond the hero section.
  */
  function updateFloatingContactState() {
    floatingContactButton.classList.toggle(
      "is-prominent",
      window.scrollY > 700
    );
  }

  updateFloatingContactState();

  window.addEventListener(
    "scroll",
    updateFloatingContactState,
    { passive: true }
  );
}


/* =========================================================
   97. SIMPLE FORM STATUS RESET
========================================================= */

function resetFormMessageAfterDelay(
  messageElement,
  delay = 6000
) {
  if (!messageElement) return;

  window.setTimeout(() => {
    messageElement.textContent = "";

    messageElement.classList.remove(
      "is-success",
      "is-error",
      "is-neutral"
    );
  }, delay);
}


/* =========================================================
   98. NEWSLETTER INITIALIZATION
========================================================= */

function initializeNewsletterForm() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener(
    "submit",
    (event) => {
      handleNewsletterSubmission(event);

      if (
        newsletterMessage?.classList.contains(
          "is-success"
        )
      ) {
        resetFormMessageAfterDelay(
          newsletterMessage
        );
      }
    }
  );

  initializeNewsletterInputFeedback();
}


/* =========================================================
   99. FEEDBACK STYLES
========================================================= */

function injectFormFeedbackStyles() {
  if (
    selectElement(
      "#elvaraFormFeedbackStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "elvaraFormFeedbackStyles";

  styleElement.textContent = `
    .newsletter-message.is-success {
      color: #6f8f55;
    }

    .newsletter-message.is-error {
      color: #b65c52;
    }

    .newsletter-message.is-neutral {
      color: #9b7a42;
    }

    .floating-contact-button.is-prominent
    .floating-contact-icon {
      animation:
        elvaraWhatsAppPulse
        2.4s ease-in-out infinite;
    }

    @keyframes elvaraWhatsAppPulse {
      0%,
      100% {
        box-shadow:
          0 15px 35px
          rgba(0, 0, 0, 0.22);
      }

      50% {
        box-shadow:
          0 15px 35px
          rgba(0, 0, 0, 0.22),
          0 0 0 10px
          rgba(37, 211, 102, 0.08);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .floating-contact-button.is-prominent
      .floating-contact-icon {
        animation: none;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   100. FORM AND PREFERENCE INITIALIZATION
========================================================= */

function initializeFormsAndPreferences() {
  injectFormFeedbackStyles();
  initializeNewsletterForm();
  initializeCookieNotice();
  initializeFloatingContactButton();
}


/* =========================================================
   101. RUN FORMS AND PREFERENCES
========================================================= */

onDocumentReady(() => {
  initializeFormsAndPreferences();
});


/* =========================================================
   END OF SCRIPT.JS — PART 7
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   MAIN JAVASCRIPT — PART 8
   Lazy Loading, Accessibility, Performance and Final Setup
========================================================= */


/* =========================================================
   102. LAZY IMAGE PREPARATION
========================================================= */

/**
 * Add safe loading and decoding preferences
 * to images that do not already define them.
 */
function prepareLazyImages() {
  const images = selectElements("img");

  images.forEach((image, index) => {
    /*
     Keep the first few visible images eager
     for faster initial rendering.
    */
    if (
      !image.hasAttribute("loading") &&
      index > 2
    ) {
      image.loading = "lazy";
    }

    if (!image.hasAttribute("decoding")) {
      image.decoding = "async";
    }

    image.addEventListener(
      "load",
      () => {
        image.classList.add(
          "image-loaded"
        );
      },
      { once: true }
    );

    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-load-error"
        );

        image.setAttribute(
          "aria-hidden",
          "true"
        );
      },
      { once: true }
    );

    if (image.complete) {
      image.classList.add(
        image.naturalWidth > 0
          ? "image-loaded"
          : "image-load-error"
      );
    }
  });
}


/* =========================================================
   103. LAZY VIDEO SOURCE PREPARATION
========================================================= */

/**
 * Reduce unnecessary preload usage for videos
 * outside the hero section.
 */
function optimizeVideoPreloading() {
  const videos = selectElements("video");

  videos.forEach((video) => {
    const isHeroVideo =
      video.classList.contains(
        "hero-video"
      );

    video.preload = isHeroVideo
      ? "metadata"
      : "none";

    if (!isHeroVideo) {
      video.setAttribute(
        "preload",
        "none"
      );
    }
  });
}


/* =========================================================
   104. LOAD VIDEO WHEN NEAR VIEWPORT
========================================================= */

function initializeDeferredVideoLoading() {
  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const deferredVideos =
    selectElements(
      `
        .about-background-video,
        .property-showcase-video,
        .hotel-experience-video
      `
    );

  if (deferredVideos.length === 0) {
    return;
  }

  const videoLoadObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const video = entry.target;

          if (
            !(video instanceof HTMLVideoElement)
          ) {
            return;
          }

          if (video.preload === "none") {
            video.preload = "metadata";
            video.load();

            safelyPlayVideo(video);
          }

          observer.unobserve(video);
        });
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: "500px 0px",
      }
    );

  deferredVideos.forEach((video) => {
    videoLoadObserver.observe(video);
  });
}


/* =========================================================
   105. BROKEN IMAGE FALLBACK
========================================================= */

function injectMediaFallbackStyles() {
  if (
    selectElement(
      "#elvaraMediaFallbackStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "elvaraMediaFallbackStyles";

  styleElement.textContent = `
    img {
      opacity: 1;
      transition:
        opacity 0.35s ease,
        filter 0.35s ease;
    }

    img:not(.image-loaded):not(.image-load-error) {
      opacity: 0.72;
    }

    img.image-loaded {
      opacity: 1;
    }

    img.image-load-error,
    video.video-load-error {
      opacity: 0;
    }

    .featured-property-media,
    .property-card-media,
    .gallery-preview-item,
    .experience-card,
    .lifestyle-main-image,
    .about-video-wrap {
      background:
        linear-gradient(
          135deg,
          #171818,
          #2a2823
        );
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   106. EXTERNAL LINK ACCESSIBILITY
========================================================= */

function prepareExternalLinks() {
  const links = selectElements("a[href]");

  links.forEach((link) => {
    const href =
      link.getAttribute("href");

    if (
      !href ||
      !href.startsWith("http")
    ) {
      return;
    }

    let linkUrl;

    try {
      linkUrl = new URL(
        href,
        window.location.href
      );
    } catch (error) {
      return;
    }

    const isExternal =
      linkUrl.origin !==
      window.location.origin;

    if (!isExternal) return;

    if (!link.hasAttribute("target")) {
      link.target = "_blank";
    }

    link.rel = "noopener noreferrer";
  });
}


/* =========================================================
   107. EMPTY DEMO LINK PROTECTION
========================================================= */

/**
 * Prevent links using only "#" from jumping
 * abruptly to the top of the page.
 */
function initializeEmptyLinkProtection() {
  const emptyLinks =
    selectElements('a[href="#"]');

  emptyLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
      }
    );
  });
}


/* =========================================================
   108. KEYBOARD INPUT MODE
========================================================= */

function initializeKeyboardFocusMode() {
  function enableKeyboardMode(event) {
    if (
      event.key !== "Tab"
    ) {
      return;
    }

    document.documentElement.classList.add(
      "keyboard-navigation"
    );
  }

  function disableKeyboardMode() {
    document.documentElement.classList.remove(
      "keyboard-navigation"
    );
  }

  document.addEventListener(
    "keydown",
    enableKeyboardMode
  );

  document.addEventListener(
    "pointerdown",
    disableKeyboardMode
  );
}


/* =========================================================
   109. ARIA LABEL FALLBACKS
========================================================= */

function prepareAccessibleLabels() {
  const iconOnlyLinks =
    selectElements(
      `
        .footer-social-links a,
        .mobile-social-links a,
        .gallery-preview-icon,
        .property-card-arrow
      `
    );

  iconOnlyLinks.forEach((element) => {
    if (
      !element.hasAttribute(
        "aria-label"
      ) &&
      !element.textContent.trim()
    ) {
      element.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  });

  const decorativeIcons =
    selectElements(
      `
        .section-eyebrow-line,
        .eyebrow-line,
        .about-caption-line,
        .experience-signature-line,
        .hotel-experience-label-line
      `
    );

  decorativeIcons.forEach((element) => {
    element.setAttribute(
      "aria-hidden",
      "true"
    );
  });
}


/* =========================================================
   110. VIDEO REDUCED MOTION SUPPORT
========================================================= */

function respectReducedMotionPreference() {
  const reducedMotionQuery =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  function updateReducedMotionState(event) {
    const shouldReduceMotion =
      event.matches;

    document.documentElement.classList.toggle(
      "reduced-motion",
      shouldReduceMotion
    );

    if (shouldReduceMotion) {
      selectElements("video").forEach(
        (video) => {
          safelyPauseVideo(video);
        }
      );

      stopTestimonialAutoPlay();

      selectElements(
        ".reveal-up"
      ).forEach((element) => {
        element.classList.add(
          "is-visible"
        );
      });
    } else {
      startTestimonialAutoPlay();

      selectElements(
        "video[autoplay]"
      ).forEach((video) => {
        safelyPlayVideo(video);
      });
    }
  }

  updateReducedMotionState(
    reducedMotionQuery
  );

  if (
    typeof reducedMotionQuery
      .addEventListener === "function"
  ) {
    reducedMotionQuery.addEventListener(
      "change",
      updateReducedMotionState
    );
  }
}


/* =========================================================
   111. ONLINE AND OFFLINE STATUS
========================================================= */

function createConnectionStatusMessage() {
  let statusMessage =
    selectElement(
      "#connectionStatusMessage"
    );

  if (statusMessage) {
    return statusMessage;
  }

  statusMessage =
    document.createElement("div");

  statusMessage.id =
    "connectionStatusMessage";

  statusMessage.className =
    "connection-status-message";

  statusMessage.setAttribute(
    "role",
    "status"
  );

  statusMessage.setAttribute(
    "aria-live",
    "polite"
  );

  document.body.appendChild(
    statusMessage
  );

  return statusMessage;
}


function showConnectionStatus(
  message,
  status
) {
  const statusMessage =
    createConnectionStatusMessage();

  statusMessage.textContent =
    message;

  statusMessage.classList.remove(
    "is-online",
    "is-offline",
    "is-visible"
  );

  statusMessage.classList.add(
    status === "online"
      ? "is-online"
      : "is-offline",
    "is-visible"
  );

  window.clearTimeout(
    statusMessage.hideTimer
  );

  statusMessage.hideTimer =
    window.setTimeout(() => {
      statusMessage.classList.remove(
        "is-visible"
      );
    }, 3500);
}


function initializeConnectionMonitoring() {
  window.addEventListener(
    "offline",
    () => {
      showConnectionStatus(
        "You are offline. Some videos may not load.",
        "offline"
      );
    }
  );

  window.addEventListener(
    "online",
    () => {
      showConnectionStatus(
        "Connection restored.",
        "online"
      );
    }
  );
}


/* =========================================================
   112. CONNECTION MESSAGE STYLES
========================================================= */

function injectConnectionStatusStyles() {
  if (
    selectElement(
      "#elvaraConnectionStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "elvaraConnectionStyles";

  styleElement.textContent = `
    .connection-status-message {
      position: fixed;
      left: 50%;
      top: 105px;
      z-index: 10040;

      max-width:
        calc(100% - 32px);

      padding: 11px 18px;

      opacity: 0;
      visibility: hidden;
      transform:
        translate(-50%, -12px);

      border-radius: 999px;

      color: #ffffff;
      background: #101111;

      box-shadow:
        0 15px 40px
        rgba(0, 0, 0, 0.24);

      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-align: center;

      transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        transform 0.3s ease;
    }

    .connection-status-message.is-visible {
      opacity: 1;
      visibility: visible;
      transform:
        translate(-50%, 0);
    }

    .connection-status-message.is-online {
      background: #536e45;
    }

    .connection-status-message.is-offline {
      background: #8b4b44;
    }

    @media (max-width: 767px) {
      .connection-status-message {
        top: 82px;

        width:
          calc(100% - 28px);
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   113. PAGE ORIENTATION HANDLING
========================================================= */

function initializeOrientationHandling() {
  function updateOrientationClass() {
    const isLandscape =
      window.innerWidth >
      window.innerHeight;

    document.documentElement.classList.toggle(
      "landscape-orientation",
      isLandscape
    );

    document.documentElement.classList.toggle(
      "portrait-orientation",
      !isLandscape
    );
  }

  updateOrientationClass();

  window.addEventListener(
    "orientationchange",
    () => {
      window.setTimeout(
        updateOrientationClass,
        150
      );
    }
  );

  window.addEventListener(
    "resize",
    updateOrientationClass,
    { passive: true }
  );
}


/* =========================================================
   114. INITIAL DOCUMENT HEIGHT VARIABLE
========================================================= */

/**
 * Store one percent of the actual viewport height.
 * Useful for mobile browsers with dynamic toolbars.
 */
function updateViewportHeightVariable() {
  const viewportHeight =
    window.innerHeight * 0.01;

  document.documentElement.style.setProperty(
    "--viewport-height",
    `${viewportHeight}px`
  );
}


function initializeViewportHeightHandling() {
  updateViewportHeightVariable();

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        ElvaraApp.resizeTimer
      );

      ElvaraApp.resizeTimer =
        window.setTimeout(
          updateViewportHeightVariable,
          120
        );
    },
    { passive: true }
  );

  window.addEventListener(
    "orientationchange",
    () => {
      window.setTimeout(
        updateViewportHeightVariable,
        200
      );
    }
  );
}


/* =========================================================
   115. FINAL APPLICATION READY EVENT
========================================================= */

function dispatchElvaraReadyEvent() {
  const readyEvent =
    new CustomEvent(
      "elvara:ready",
      {
        detail: {
          page:
            window.location.pathname
              .split("/")
              .pop() ||
            "index.html",

          touchDevice:
            ElvaraApp.supportsTouch,

          loadedAt:
            new Date().toISOString(),
        },
      }
    );

  document.dispatchEvent(
    readyEvent
  );
}


/* =========================================================
   116. FINAL OPTIMIZATION INITIALIZATION
========================================================= */

function initializeFinalOptimizations() {
  injectMediaFallbackStyles();
  injectConnectionStatusStyles();

  prepareLazyImages();
  optimizeVideoPreloading();
  initializeDeferredVideoLoading();

  prepareExternalLinks();
  initializeEmptyLinkProtection();
  initializeKeyboardFocusMode();
  prepareAccessibleLabels();

  respectReducedMotionPreference();
  initializeConnectionMonitoring();
  initializeOrientationHandling();
  initializeViewportHeightHandling();

  dispatchElvaraReadyEvent();
}


/* =========================================================
   117. RUN FINAL OPTIMIZATIONS
========================================================= */

onDocumentReady(() => {
  initializeFinalOptimizations();
});


/* =========================================================
   118. FINAL PAGE CLEANUP
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    stopTestimonialAutoPlay();

    if (
      cursorState.animationFrame
    ) {
      window.cancelAnimationFrame(
        cursorState.animationFrame
      );
    }

    if (loaderFallbackTimer) {
      window.clearTimeout(
        loaderFallbackTimer
      );
    }
  }
);


/* =========================================================
   END OF SCRIPT.JS
========================================================= */
    
