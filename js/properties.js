/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 1
   Property Data, Categories, Helpers and Filter Foundation
========================================================= */

"use strict";


/* =========================================================
   1. PROPERTY APPLICATION STATE
========================================================= */

const ElvaraProperties = {
  properties: [],
  filteredProperties: [],
  activeCategory: "all",
  activeLocation: "all",
  activeStatus: "all",
  searchQuery: "",
  sortOption: "featured",
  selectedPropertyId: null,
  favorites: new Set(),
  comparison: new Set(),
  recentlyViewed: [],
};


/* =========================================================
   2. PROPERTY CATEGORY DEFINITIONS
========================================================= */

const propertyCategories = [
  {
    id: "all",
    label: "All Properties",
    icon: "fa-solid fa-border-all",
  },
  {
    id: "villa",
    label: "Luxury Villas",
    icon: "fa-solid fa-house-chimney-window",
  },
  {
    id: "penthouse",
    label: "Penthouses",
    icon: "fa-solid fa-building",
  },
  {
    id: "apartment",
    label: "Premium Apartments",
    icon: "fa-solid fa-city",
  },
  {
    id: "beach-house",
    label: "Beach Houses",
    icon: "fa-solid fa-water",
  },
  {
    id: "hotel",
    label: "Luxury Hospitality",
    icon: "fa-solid fa-hotel",
  },
  {
    id: "commercial",
    label: "Commercial Properties",
    icon: "fa-solid fa-briefcase",
  },
];


/* =========================================================
   3. COMPLETE PROPERTY DATA
========================================================= */

const elvaraPropertyData = [
  {
    id: "elv-uv-001",
    reference: "ELV–UV–001",

    title: "Aurelia Hillside Villa",
    slug: "aurelia-hillside-villa",

    category: "villa",
    categoryLabel: "Private Villa",

    location: "Udaipur, Rajasthan",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",

    price: 87500000,
    displayPrice: "₹8.75 Cr",
    priceLabel: "Starting from",

    bedrooms: 5,
    bathrooms: 6,
    area: 8400,
    areaLabel: "8,400 Sq. Ft.",

    status: "available",
    statusLabel: "Available",

    featured: true,
    exclusive: true,
    newListing: true,

    image: "images/property-villa.jpg",
    video: "videos/villa-exterior.mp4",

    gallery: [
      "images/property-villa.jpg",
      "images/interior-living-room.jpg",
      "images/interior-bedroom.jpg",
      "images/interior-kitchen.jpg",
      "images/interior-bathroom.jpg",
      "images/gallery-pool.jpg",
    ],

    shortDescription:
      "A private architectural retreat with panoramic views, expansive glass walls and seamless indoor-outdoor living.",

    description:
      "Aurelia Hillside Villa is a refined private residence designed around natural light, panoramic views and generous living spaces. Natural stone, warm wood, glass walls and landscaped outdoor areas create an elegant connection between architecture and its surroundings.",

    amenities: [
      "Private infinity pool",
      "Landscaped gardens",
      "Panoramic lake views",
      "Private parking",
      "Smart-home technology",
      "Home theatre",
      "Private gym",
      "24-hour security",
    ],

    coordinates: {
      latitude: 24.5854,
      longitude: 73.7125,
    },
  },

  {
    id: "elv-mp-002",
    reference: "ELV–MP–002",

    title: "Skyline Grand Penthouse",
    slug: "skyline-grand-penthouse",

    category: "penthouse",
    categoryLabel: "Penthouse",

    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",

    price: 125000000,
    displayPrice: "₹12.50 Cr",
    priceLabel: "Guide price",

    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    areaLabel: "5,200 Sq. Ft.",

    status: "available",
    statusLabel: "Available",

    featured: true,
    exclusive: false,
    newListing: false,

    image: "images/property-penthouse.jpg",
    video: "videos/penthouse-tour.mp4",

    gallery: [
      "images/property-penthouse.jpg",
      "images/interior-living-room.jpg",
      "images/interior-bedroom.jpg",
      "images/interior-kitchen.jpg",
      "images/gallery-balcony.jpg",
    ],

    shortDescription:
      "An expansive city penthouse with panoramic skyline views, refined interiors and private entertainment spaces.",

    description:
      "Skyline Grand Penthouse offers elevated city living through expansive interiors, panoramic glazing and carefully composed private spaces. The residence combines skyline views with premium finishes, generous entertaining areas and discreet resident services.",

    amenities: [
      "Panoramic skyline views",
      "Private lift access",
      "Designer kitchen",
      "Residents’ lounge",
      "Concierge service",
      "Private terrace",
      "Fitness studio",
      "Secure parking",
    ],

    coordinates: {
      latitude: 19.076,
      longitude: 72.8777,
    },
  },

  {
    id: "elv-gr-003",
    reference: "ELV–GR–003",

    title: "Élvara Grand Residences",
    slug: "elvara-grand-residences",

    category: "apartment",
    categoryLabel: "Premium Residence",

    location: "Gurugram, Haryana",
    city: "Gurugram",
    state: "Haryana",
    country: "India",

    price: 49000000,
    displayPrice: "₹4.90 Cr",
    priceLabel: "Starting from",

    bedrooms: 3,
    bathrooms: 4,
    area: 3100,
    areaLabel: "3,100 Sq. Ft.",

    status: "available",
    statusLabel: "Available",

    featured: true,
    exclusive: false,
    newListing: true,

    image: "images/property-apartment.jpg",
    video: "videos/architecture-background.mp4",

    gallery: [
      "images/property-apartment.jpg",
      "images/interior-living-room.jpg",
      "images/interior-bedroom.jpg",
      "images/interior-kitchen.jpg",
      "images/gallery-lobby.jpg",
    ],

    shortDescription:
      "Contemporary residences combining elegant architecture, landscaped surroundings and premium city connectivity.",

    description:
      "Élvara Grand Residences presents spacious urban apartments with refined interiors, landscaped amenities and carefully planned privacy. The development is designed for residents seeking modern comfort, connectivity and long-term value.",

    amenities: [
      "Clubhouse",
      "Landscaped gardens",
      "Swimming pool",
      "Residents’ gym",
      "Children’s activity zone",
      "Concierge desk",
      "Secure parking",
      "24-hour security",
    ],

    coordinates: {
      latitude: 28.4595,
      longitude: 77.0266,
    },
  },

  {
    id: "elv-go-004",
    reference: "ELV–GO–004",

    title: "Ocean Crest Beach House",
    slug: "ocean-crest-beach-house",

    category: "beach-house",
    categoryLabel: "Beach House",

    location: "Goa, India",
    city: "Goa",
    state: "Goa",
    country: "India",

    price: 98000000,
    displayPrice: "₹9.80 Cr",
    priceLabel: "Guide price",

    bedrooms: 4,
    bathrooms: 5,
    area: 6600,
    areaLabel: "6,600 Sq. Ft.",

    status: "available",
    statusLabel: "Available",

    featured: true,
    exclusive: true,
    newListing: false,

    image: "images/property-beach-house.jpg",
    video: "videos/villa-exterior.mp4",

    gallery: [
      "images/property-beach-house.jpg",
      "images/gallery-pool.jpg",
      "images/interior-living-room.jpg",
      "images/interior-bedroom.jpg",
      "images/gallery-balcony.jpg",
    ],

    shortDescription:
      "A contemporary oceanfront retreat with tropical landscaping, private decks and uninterrupted coastal views.",

    description:
      "Ocean Crest Beach House combines contemporary coastal architecture with privacy, ocean views and generous outdoor living. Expansive glazing, shaded terraces, an infinity pool and tropical gardens create a relaxed yet sophisticated residence.",

    amenities: [
      "Ocean frontage",
      "Infinity pool",
      "Private beach access",
      "Outdoor dining terrace",
      "Landscaped tropical garden",
      "Guest suites",
      "Private parking",
      "Security system",
    ],

    coordinates: {
      latitude: 15.2993,
      longitude: 74.124,
    },
  },

  {
    id: "elv-hp-005",
    reference: "ELV–HP–005",

    title: "The Élvara Pavilion Hotel",
    slug: "elvara-pavilion-hotel",

    category: "hotel",
    categoryLabel: "Boutique Hotel",

    location: "Jaipur, Rajasthan",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",

    price: 325000000,
    displayPrice: "₹32.50 Cr",
    priceLabel: "Investment opportunity",

    bedrooms: 42,
    bathrooms: 46,
    area: 48000,
    areaLabel: "48,000 Sq. Ft.",

    status: "investment",
    statusLabel: "Investment",

    featured: false,
    exclusive: true,
    newListing: true,

    image: "images/property-hotel.jpg",
    video: "videos/luxury-hotel.mp4",

    gallery: [
      "images/property-hotel.jpg",
      "images/gallery-lobby.jpg",
      "images/interior-bedroom.jpg",
      "images/interior-bathroom.jpg",
      "images/gallery-pool.jpg",
    ],

    shortDescription:
      "A refined boutique hospitality property with premium rooms, destination dining and strong investment potential.",

    description:
      "The Élvara Pavilion Hotel is a boutique hospitality opportunity combining modern architecture with regional material character. Guest rooms, dining spaces, landscaped courtyards and premium amenities position it as a distinctive destination property.",

    amenities: [
      "42 guest suites",
      "Fine-dining restaurant",
      "Luxury spa",
      "Event courtyard",
      "Swimming pool",
      "Private parking",
      "Commercial kitchen",
      "Management facilities",
    ],

    coordinates: {
      latitude: 26.9124,
      longitude: 75.7873,
    },
  },

  {
    id: "elv-cb-006",
    reference: "ELV–CB–006",

    title: "Élvara Central Business House",
    slug: "elvara-central-business-house",

    category: "commercial",
    categoryLabel: "Commercial Property",

    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",

    price: 145000000,
    displayPrice: "₹14.50 Cr",
    priceLabel: "Guide price",

    bedrooms: 0,
    bathrooms: 8,
    area: 18500,
    areaLabel: "18,500 Sq. Ft.",

    status: "available",
    statusLabel: "Available",

    featured: false,
    exclusive: false,
    newListing: false,

    image: "images/property-commercial.jpg",
    video: "videos/architecture-background.mp4",

    gallery: [
      "images/property-commercial.jpg",
      "images/gallery-lobby.jpg",
      "images/interior-kitchen.jpg",
      "images/gallery-balcony.jpg",
    ],

    shortDescription:
      "A premium commercial building offering flexible workspaces, architectural presence and excellent city connectivity.",

    description:
      "Élvara Central Business House is designed for organisations seeking a prestigious commercial address. Flexible office floors, premium common spaces, secure parking and strong urban connectivity support a wide range of professional uses.",

    amenities: [
      "Flexible office floors",
      "Premium reception lobby",
      "Meeting facilities",
      "High-speed lifts",
      "Secure parking",
      "Power backup",
      "Building management system",
      "24-hour security",
    ],

    coordinates: {
      latitude: 23.0225,
      longitude: 72.5714,
    },
  },
];


/* =========================================================
   4. COPY PROPERTY DATA INTO APPLICATION STATE
========================================================= */

function initializePropertyState() {
  ElvaraProperties.properties =
    elvaraPropertyData.map((property) => {
      return {
        ...property,

        gallery: Array.isArray(property.gallery)
          ? [...property.gallery]
          : [],

        amenities: Array.isArray(property.amenities)
          ? [...property.amenities]
          : [],
      };
    });

  ElvaraProperties.filteredProperties =
    [...ElvaraProperties.properties];
}


/* =========================================================
   5. PROPERTY DOM HELPERS
========================================================= */

/**
 * Select one element safely.
 * Uses the helper from script.js when available.
 *
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element|null}
 */
function propertySelect(
  selector,
  scope = document
) {
  if (
    typeof selectElement === "function"
  ) {
    return selectElement(
      selector,
      scope
    );
  }

  return scope.querySelector(selector);
}


/**
 * Select multiple elements as an array.
 *
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element[]}
 */
function propertySelectAll(
  selector,
  scope = document
) {
  if (
    typeof selectElements === "function"
  ) {
    return selectElements(
      selector,
      scope
    );
  }

  return Array.from(
    scope.querySelectorAll(selector)
  );
}


/**
 * Run after DOM is ready.
 *
 * @param {Function} callback
 */
function propertyDocumentReady(callback) {
  if (
    typeof onDocumentReady === "function"
  ) {
    onDocumentReady(callback);
    return;
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      callback,
      { once: true }
    );

    return;
  }

  callback();
}


/* =========================================================
   6. PROPERTY NUMBER FORMATTERS
========================================================= */

/**
 * Format numbers using Indian digit grouping.
 *
 * @param {number} value
 * @returns {string}
 */
function formatPropertyNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat(
    "en-IN"
  ).format(numericValue);
}


/**
 * Convert property price into Indian currency labels.
 *
 * @param {number} price
 * @returns {string}
 */
function formatPropertyPrice(price) {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "Price on request";
  }

  if (numericPrice >= 10000000) {
    const croreValue =
      numericPrice / 10000000;

    return `₹${croreValue.toFixed(2)} Cr`;
  }

  if (numericPrice >= 100000) {
    const lakhValue =
      numericPrice / 100000;

    return `₹${lakhValue.toFixed(2)} Lakh`;
  }

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(numericPrice);
}


/**
 * Format property area.
 *
 * @param {number} area
 * @returns {string}
 */
function formatPropertyArea(area) {
  const numericArea = Number(area);

  if (!Number.isFinite(numericArea)) {
    return "Area on request";
  }

  return `${formatPropertyNumber(
    numericArea
  )} Sq. Ft.`;
}


/* =========================================================
   7. PROPERTY LOOKUP HELPERS
========================================================= */

/**
 * Find a property by its exact ID.
 *
 * @param {string} propertyId
 * @returns {Object|null}
 */
function findPropertyById(propertyId) {
  if (!propertyId) return null;

  return (
    ElvaraProperties.properties.find(
      (property) =>
        property.id === propertyId
    ) || null
  );
}


/**
 * Find a property by its URL slug.
 *
 * @param {string} propertySlug
 * @returns {Object|null}
 */
function findPropertyBySlug(
  propertySlug
) {
  if (!propertySlug) return null;

  return (
    ElvaraProperties.properties.find(
      (property) =>
        property.slug === propertySlug
    ) || null
  );
}


/**
 * Return properties from one category.
 *
 * @param {string} category
 * @returns {Object[]}
 */
function getPropertiesByCategory(
  category
) {
  if (
    !category ||
    category === "all"
  ) {
    return [
      ...ElvaraProperties.properties,
    ];
  }

  return ElvaraProperties.properties.filter(
    (property) =>
      property.category === category
  );
}


/**
 * Return featured properties.
 *
 * @returns {Object[]}
 */
function getFeaturedProperties() {
  return ElvaraProperties.properties.filter(
    (property) =>
      property.featured === true
  );
}


/**
 * Return exclusive properties.
 *
 * @returns {Object[]}
 */
function getExclusiveProperties() {
  return ElvaraProperties.properties.filter(
    (property) =>
      property.exclusive === true
  );
}


/* =========================================================
   8. PROPERTY CATEGORY LOOKUP
========================================================= */

/**
 * Find category information by category ID.
 *
 * @param {string} categoryId
 * @returns {Object|null}
 */
function findPropertyCategory(
  categoryId
) {
  return (
    propertyCategories.find(
      (category) =>
        category.id === categoryId
    ) || null
  );
}


/**
 * Return category display label.
 *
 * @param {string} categoryId
 * @returns {string}
 */
function getPropertyCategoryLabel(
  categoryId
) {
  const category =
    findPropertyCategory(categoryId);

  return category
    ? category.label
    : "Properties";
}


/* =========================================================
   9. UNIQUE PROPERTY VALUES
========================================================= */

/**
 * Return unique property locations.
 *
 * @returns {string[]}
 */
function getUniquePropertyLocations() {
  return Array.from(
    new Set(
      ElvaraProperties.properties.map(
        (property) =>
          property.location
      )
    )
  ).sort((firstLocation, secondLocation) =>
    firstLocation.localeCompare(
      secondLocation
    )
  );
}


/**
 * Return unique property cities.
 *
 * @returns {string[]}
 */
function getUniquePropertyCities() {
  return Array.from(
    new Set(
      ElvaraProperties.properties.map(
        (property) =>
          property.city
      )
    )
  ).sort((firstCity, secondCity) =>
    firstCity.localeCompare(secondCity)
  );
}


/**
 * Return unique property statuses.
 *
 * @returns {string[]}
 */
function getUniquePropertyStatuses() {
  return Array.from(
    new Set(
      ElvaraProperties.properties.map(
        (property) =>
          property.status
      )
    )
  );
}


/* =========================================================
   10. SEARCH NORMALIZATION
========================================================= */

/**
 * Normalize text for reliable searching.
 *
 * @param {unknown} value
 * @returns {string}
 */
function normalizePropertySearchText(
  value
) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim();
}


/**
 * Create a combined searchable string.
 *
 * @param {Object} property
 * @returns {string}
 */
function createPropertySearchIndex(
  property
) {
  return normalizePropertySearchText(
    [
      property.title,
      property.reference,
      property.category,
      property.categoryLabel,
      property.location,
      property.city,
      property.state,
      property.country,
      property.statusLabel,
      property.shortDescription,
      property.description,
      ...(property.amenities || []),
    ].join(" ")
  );
}


/* =========================================================
   11. SINGLE PROPERTY FILTER CHECK
========================================================= */

/**
 * Check whether one property matches current filters.
 *
 * @param {Object} property
 * @returns {boolean}
 */
function propertyMatchesFilters(
  property
) {
  if (!property) return false;

  const matchesCategory =
    ElvaraProperties.activeCategory ===
      "all" ||
    property.category ===
      ElvaraProperties.activeCategory;

  const matchesLocation =
    ElvaraProperties.activeLocation ===
      "all" ||
    property.city ===
      ElvaraProperties.activeLocation ||
    property.location ===
      ElvaraProperties.activeLocation;
    const matchesStatus =
    ElvaraProperties.activeStatus ===
      "all" ||
    property.status ===
      ElvaraProperties.activeStatus;

  const normalizedQuery =
    normalizePropertySearchText(
      ElvaraProperties.searchQuery
    );

  const matchesSearch =
    !normalizedQuery ||
    createPropertySearchIndex(
      property
    ).includes(normalizedQuery);

  return (
    matchesCategory &&
    matchesLocation &&
    matchesStatus &&
    matchesSearch
  );
}


/* =========================================================
   12. PROPERTY SORTING
========================================================= */

/**
 * Sort a property array without changing original data.
 *
 * @param {Object[]} properties
 * @param {string} sortOption
 * @returns {Object[]}
 */
function sortProperties(
  properties,
  sortOption =
    ElvaraProperties.sortOption
) {
  const sortedProperties =
    [...properties];

  switch (sortOption) {
    case "price-low":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          firstProperty.price -
          secondProperty.price
      );
      break;

    case "price-high":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          secondProperty.price -
          firstProperty.price
      );
      break;

    case "area-large":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          secondProperty.area -
          firstProperty.area
      );
      break;

    case "area-small":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          firstProperty.area -
          secondProperty.area
      );
      break;

    case "newest":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          Number(secondProperty.newListing) -
          Number(firstProperty.newListing)
      );
      break;

    case "title":
      sortedProperties.sort(
        (firstProperty, secondProperty) =>
          firstProperty.title.localeCompare(
            secondProperty.title
          )
      );
      break;

    case "featured":
    default:
      sortedProperties.sort(
        (firstProperty, secondProperty) => {
          const featuredDifference =
            Number(
              secondProperty.featured
            ) -
            Number(
              firstProperty.featured
            );

          if (featuredDifference !== 0) {
            return featuredDifference;
          }

          const exclusiveDifference =
            Number(
              secondProperty.exclusive
            ) -
            Number(
              firstProperty.exclusive
            );

          if (exclusiveDifference !== 0) {
            return exclusiveDifference;
          }

          return (
            secondProperty.price -
            firstProperty.price
          );
        }
      );
      break;
  }

  return sortedProperties;
}


/* =========================================================
   13. APPLY ALL PROPERTY FILTERS
========================================================= */

/**
 * Apply active filters and sorting.
 *
 * @returns {Object[]}
 */
function applyPropertyFilters() {
  const matchingProperties =
    ElvaraProperties.properties.filter(
      propertyMatchesFilters
    );

  ElvaraProperties.filteredProperties =
    sortProperties(
      matchingProperties
    );

  return [
    ...ElvaraProperties.filteredProperties,
  ];
}


/* =========================================================
   14. FILTER STATE SETTERS
========================================================= */

function setActivePropertyCategory(
  category = "all"
) {
  const validCategory =
    propertyCategories.some(
      (item) =>
        item.id === category
    );

  ElvaraProperties.activeCategory =
    validCategory
      ? category
      : "all";

  return applyPropertyFilters();
}


function setActivePropertyLocation(
  location = "all"
) {
  ElvaraProperties.activeLocation =
    location || "all";

  return applyPropertyFilters();
}


function setActivePropertyStatus(
  status = "all"
) {
  ElvaraProperties.activeStatus =
    status || "all";

  return applyPropertyFilters();
}


function setPropertySearchQuery(
  query = ""
) {
  ElvaraProperties.searchQuery =
    String(query).trim();

  return applyPropertyFilters();
}


function setPropertySortOption(
  sortOption = "featured"
) {
  const allowedSortOptions = [
    "featured",
    "price-low",
    "price-high",
    "area-large",
    "area-small",
    "newest",
    "title",
  ];

  ElvaraProperties.sortOption =
    allowedSortOptions.includes(
      sortOption
    )
      ? sortOption
      : "featured";

  return applyPropertyFilters();
}


/* =========================================================
   15. RESET ALL PROPERTY FILTERS
========================================================= */

function resetPropertyFilters() {
  ElvaraProperties.activeCategory =
    "all";

  ElvaraProperties.activeLocation =
    "all";

  ElvaraProperties.activeStatus =
    "all";

  ElvaraProperties.searchQuery = "";
  ElvaraProperties.sortOption =
    "featured";

  return applyPropertyFilters();
}


/* =========================================================
   16. URL QUERY HELPERS
========================================================= */

/**
 * Read one property-related URL parameter.
 *
 * @param {string} parameterName
 * @returns {string|null}
 */
function getPropertyUrlParameter(
  parameterName
) {
  const parameters =
    new URLSearchParams(
      window.location.search
    );

  return parameters.get(
    parameterName
  );
}


/**
 * Read initial filters from the page URL.
 *
 * Supported examples:
 * properties.html?category=villa
 * properties.html?location=Goa
 * properties.html?search=penthouse
 */
function readPropertyFiltersFromUrl() {
  const categoryParameter =
    getPropertyUrlParameter("category");

  const locationParameter =
    getPropertyUrlParameter("location");

  const statusParameter =
    getPropertyUrlParameter("status");

  const searchParameter =
    getPropertyUrlParameter("search");

  const sortParameter =
    getPropertyUrlParameter("sort");

  if (categoryParameter) {
    const normalizedCategory =
      normalizePropertySearchText(
        categoryParameter
      ).replace(/\s+/g, "-");

    const categoryExists =
      propertyCategories.some(
        (category) =>
          category.id ===
          normalizedCategory
      );

    if (categoryExists) {
      ElvaraProperties.activeCategory =
        normalizedCategory;
    }
  }

  if (locationParameter) {
    ElvaraProperties.activeLocation =
      locationParameter;
  }

  if (statusParameter) {
    ElvaraProperties.activeStatus =
      statusParameter;
  }

  if (searchParameter) {
    ElvaraProperties.searchQuery =
      searchParameter;
  }

  if (sortParameter) {
    setPropertySortOption(
      sortParameter
    );
  }

  applyPropertyFilters();
}


/* =========================================================
   17. PROPERTY DATA VALIDATION
========================================================= */

/**
 * Confirm that important property fields exist.
 *
 * @param {Object} property
 * @returns {boolean}
 */
function isValidPropertyRecord(
  property
) {
  return Boolean(
    property &&
    property.id &&
    property.title &&
    property.category &&
    property.location &&
    Number.isFinite(property.price) &&
    property.image
  );
}


/**
 * Remove invalid records safely.
 */
function validatePropertyData() {
  const validProperties =
    ElvaraProperties.properties.filter(
      isValidPropertyRecord
    );

  if (
    validProperties.length !==
    ElvaraProperties.properties.length
  ) {
    console.warn(
      "Élvara Estates: Some invalid property records were ignored."
    );
  }

  ElvaraProperties.properties =
    validProperties;

  applyPropertyFilters();
}


/* =========================================================
   18. PUBLIC PROPERTY DATA ACCESS
========================================================= */

/**
 * Return a safe copy of all property data.
 *
 * @returns {Object[]}
 */
function getAllElvaraProperties() {
  return ElvaraProperties.properties.map(
    (property) => ({
      ...property,
      gallery: [...property.gallery],
      amenities: [...property.amenities],
    })
  );
}


/**
 * Return a safe copy of filtered results.
 *
 * @returns {Object[]}
 */
function getFilteredElvaraProperties() {
  return ElvaraProperties.filteredProperties.map(
    (property) => ({
      ...property,
      gallery: [...property.gallery],
      amenities: [...property.amenities],
    })
  );
}


/* =========================================================
   19. PROPERTY FOUNDATION INITIALIZATION
========================================================= */

function initializePropertyFoundation() {
  initializePropertyState();
  validatePropertyData();
  readPropertyFiltersFromUrl();

  document.dispatchEvent(
    new CustomEvent(
      "elvara:properties-ready",
      {
        detail: {
          totalProperties:
            ElvaraProperties.properties.length,

          filteredProperties:
            ElvaraProperties.filteredProperties
              .length,

          categories:
            propertyCategories.length - 1,
        },
      }
    )
  );
}


/* =========================================================
   20. RUN PROPERTY FOUNDATION
========================================================= */

propertyDocumentReady(() => {
  initializePropertyFoundation();
});


/* =========================================================
   END OF PROPERTIES.JS — PART 1
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 2A
   Property Card Rendering, Results and Empty State
========================================================= */


/* =========================================================
   21. PROPERTY LISTING DOM ELEMENTS
========================================================= */

const propertyListingGrid =
  propertySelect(
    "#propertyListingGrid"
  );

const propertyResultsCount =
  propertySelect(
    "#propertyResultsCount"
  );

const propertyEmptyState =
  propertySelect(
    "#propertyEmptyState"
  );

const propertyResetButton =
  propertySelect(
    "#propertyResetButton"
  );

const propertyLoadingState =
  propertySelect(
    "#propertyLoadingState"
  );


/* =========================================================
   22. HTML ESCAPING
========================================================= */

/**
 * Escape dynamic text before inserting it into HTML.
 *
 * @param {unknown} value
 * @returns {string}
 */
function escapePropertyHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   23. PROPERTY DETAILS URL
========================================================= */

/**
 * Create the details-page URL for one property.
 *
 * @param {Object} property
 * @returns {string}
 */
function createPropertyDetailsUrl(
  property
) {
  if (!property?.slug) {
    return "property-details.html";
  }

  return (
    "property-details.html?property=" +
    encodeURIComponent(property.slug)
  );
}


/* =========================================================
   24. PROPERTY BADGE MARKUP
========================================================= */

/**
 * Create badges for one property.
 *
 * @param {Object} property
 * @returns {string}
 */
function createPropertyBadgeMarkup(
  property
) {
  const badges = [];

  if (property.exclusive) {
    badges.push(`
      <span class="listing-property-badge listing-property-badge-gold">
        Exclusive
      </span>
    `);
  }

  if (property.newListing) {
    badges.push(`
      <span class="listing-property-badge">
        New Listing
      </span>
    `);
  }

  if (
    property.status === "investment"
  ) {
    badges.push(`
      <span class="listing-property-badge">
        Investment
      </span>
    `);
  }

  if (badges.length === 0) {
    badges.push(`
      <span class="listing-property-badge">
        ${escapePropertyHtml(
          property.categoryLabel
        )}
      </span>
    `);
  }

  return badges.join("");
}


/* =========================================================
   25. BEDROOM SPECIFICATION
========================================================= */

/**
 * Commercial and hotel properties need different labels.
 *
 * @param {Object} property
 * @returns {string}
 */
function createBedroomSpecification(
  property
) {
  if (property.category === "hotel") {
    return `
      <span>
        <i class="fa-solid fa-bed"></i>
        ${formatPropertyNumber(
          property.bedrooms
        )} Suites
      </span>
    `;
  }

  if (
    property.category === "commercial"
  ) {
    return `
      <span>
        <i class="fa-solid fa-building"></i>
        Commercial
      </span>
    `;
  }

  return `
    <span>
      <i class="fa-solid fa-bed"></i>
      ${formatPropertyNumber(
        property.bedrooms
      )} Beds
    </span>
  `;
}


/* =========================================================
   26. BATHROOM SPECIFICATION
========================================================= */

/**
 * Create bathroom label.
 *
 * @param {Object} property
 * @returns {string}
 */
function createBathroomSpecification(
  property
) {
  if (
    property.category === "commercial"
  ) {
    return `
      <span>
        <i class="fa-solid fa-restroom"></i>
        ${formatPropertyNumber(
          property.bathrooms
        )} Facilities
      </span>
    `;
  }

  return `
    <span>
      <i class="fa-solid fa-bath"></i>
      ${formatPropertyNumber(
        property.bathrooms
      )} Baths
    </span>
  `;
}


/* =========================================================
   27. PROPERTY CARD TEMPLATE
========================================================= */

/**
 * Create complete listing-card markup.
 *
 * @param {Object} property
 * @param {number} index
 * @returns {string}
 */
function createPropertyCardMarkup(
  property,
  index
) {
  const detailsUrl =
    createPropertyDetailsUrl(property);

  const formattedPrice =
    property.displayPrice ||
    formatPropertyPrice(
      property.price
    );

  const formattedArea =
    property.areaLabel ||
    formatPropertyArea(
      property.area
    );

  const cardNumber =
    String(index + 1).padStart(2, "0");

  return `
    <article
      class="listing-property-card reveal-up"
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
      data-property-category="${escapePropertyHtml(
        property.category
      )}"
    >

      <a
        href="${escapePropertyHtml(
          detailsUrl
        )}"
        class="listing-property-media tilt-card"
        aria-label="View ${escapePropertyHtml(
          property.title
        )} details"
      >

        <img
          src="${escapePropertyHtml(
            property.image
          )}"
          alt="${escapePropertyHtml(
            property.title
          )}"
          loading="lazy"
          decoding="async"
        >

        <div class="listing-property-overlay"></div>

        <div class="listing-property-badges">
          ${createPropertyBadgeMarkup(
            property
          )}
        </div>

        <span class="listing-property-number">
          ${cardNumber}
        </span>

        <span class="listing-property-arrow">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>

      </a>


      <div class="listing-property-content">

        <div class="listing-property-location">

          <i class="fa-solid fa-location-dot"></i>

          <span>
            ${escapePropertyHtml(
              property.location
            )}
          </span>

        </div>


        <div class="listing-property-heading">

          <div>

            <small>
              ${escapePropertyHtml(
                property.categoryLabel
              )}
            </small>

            <h3>
              <a href="${escapePropertyHtml(
                detailsUrl
              )}">
                ${escapePropertyHtml(
                  property.title
                )}
              </a>
            </h3>

          </div>


          <div class="listing-property-price">

            <small>
              ${escapePropertyHtml(
                property.priceLabel
              )}
            </small>

            <strong>
              ${escapePropertyHtml(
                formattedPrice
              )}
            </strong>

          </div>

        </div>


        <p class="listing-property-description">
          ${escapePropertyHtml(
            property.shortDescription
          )}
        </p>


        <div class="listing-property-specifications">

          ${createBedroomSpecification(
            property
          )}

          ${createBathroomSpecification(
            property
          )}

          <span>
            <i class="fa-solid fa-ruler-combined"></i>
            ${escapePropertyHtml(
              formattedArea
            )}
          </span>

        </div>


        <div class="listing-property-footer">

          <span class="listing-property-reference">
            ${escapePropertyHtml(
              property.reference
            )}
          </span>


          <a
            href="${escapePropertyHtml(
              detailsUrl
            )}"
            class="listing-property-link"
          >
            Explore Property

            <i class="fa-solid fa-arrow-right"></i>
          </a>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   28. PROPERTY LOADING STATE
========================================================= */

function showPropertyLoadingState() {
  if (propertyLoadingState) {
    propertyLoadingState.hidden = false;
  }

  if (propertyListingGrid) {
    propertyListingGrid.setAttribute(
      "aria-busy",
      "true"
    );
  }
}


function hidePropertyLoadingState() {
  if (propertyLoadingState) {
    propertyLoadingState.hidden = true;
  }

  if (propertyListingGrid) {
    propertyListingGrid.setAttribute(
      "aria-busy",
      "false"
    );
  }
}


/* =========================================================
   29. RESULTS COUNT
========================================================= */

/**
 * Update property-result summary.
 *
 * @param {number} visibleCount
 */
function updatePropertyResultsCount(
  visibleCount
) {
  if (!propertyResultsCount) return;

  const totalCount =
    ElvaraProperties.properties.length;

  if (visibleCount === totalCount) {
    propertyResultsCount.textContent =
      `${formatPropertyNumber(
        visibleCount
      )} curated properties`;
  } else {
    propertyResultsCount.textContent =
      `${formatPropertyNumber(
        visibleCount
      )} of ${formatPropertyNumber(
        totalCount
      )} properties`;
  }
}


/* =========================================================
   30. EMPTY STATE
========================================================= */

function updatePropertyEmptyState(
  visibleCount
) {
  if (!propertyEmptyState) return;

  const shouldShowEmptyState =
    visibleCount === 0;

  propertyEmptyState.hidden =
    !shouldShowEmptyState;

  propertyEmptyState.setAttribute(
    "aria-hidden",
    String(!shouldShowEmptyState)
  );
}


/* =========================================================
   31. RENDER PROPERTY CARDS
========================================================= */

/**
 * Render all currently filtered properties.
 *
 * @param {Object[]} properties
 */
function renderPropertyCards(
  properties =
    ElvaraProperties.filteredProperties
) {
  if (!propertyListingGrid) {
    return;
  }

  showPropertyLoadingState();

  const safeProperties =
    Array.isArray(properties)
      ? properties
      : [];

  window.requestAnimationFrame(() => {
    propertyListingGrid.innerHTML =
      safeProperties
        .map(createPropertyCardMarkup)
        .join("");

    updatePropertyResultsCount(
      safeProperties.length
    );

    updatePropertyEmptyState(
      safeProperties.length
    );

    hidePropertyLoadingState();

    initializeRenderedPropertyCards();
  });
}


/* =========================================================
   32. RENDERED CARD REVEAL
========================================================= */

function revealRenderedPropertyCards() {
  const renderedCards =
    propertySelectAll(
      ".listing-property-card",
      propertyListingGrid ||
        document
    );

  if (
    renderedCards.length === 0
  ) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    renderedCards.forEach((card) => {
      card.classList.add(
        "is-visible"
      );
    });

    return;
  }

  const cardObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.1,
        rootMargin:
          "0px 0px -40px 0px",
      }
    );

  renderedCards.forEach(
    (card, index) => {
      card.style.transitionDelay =
        `${(index % 3) * 80}ms`;

      cardObserver.observe(card);
    }
  );
}


/* =========================================================
   33. DYNAMIC CARD TILT
========================================================= */

function initializeRenderedCardTilt() {
  if (
    typeof initializeTiltCards !==
    "function"
  ) {
    return;
  }

  /*
   initializeTiltCards checks all cards currently
   available in the document.
  */
  initializeTiltCards();
}


/* =========================================================
   34. DYNAMIC CARD IMAGE DEPTH
========================================================= */

function initializeRenderedCardDepth() {
  if (
    typeof initializePropertyDepthEffects !==
    "function"
  ) {
    return;
  }

  initializePropertyDepthEffects();
}


/* =========================================================
   35. DYNAMIC INTERNAL LINKS
========================================================= */

function initializeRenderedPropertyLinks() {
  if (
    typeof prepareInternalPageLinks !==
    "function"
  ) {
    return;
  }

  /*
   This allows newly rendered detail links
   to use the premium page transition.
  */
  prepareInternalPageLinks();
}


/* =========================================================
   36. INITIALIZE NEW PROPERTY CARDS
========================================================= */

function initializeRenderedPropertyCards() {
  revealRenderedPropertyCards();
  initializeRenderedCardTilt();
  initializeRenderedCardDepth();
  initializeRenderedPropertyLinks();
}


/* =========================================================
   37. RESET PROPERTY BUTTON
========================================================= */

function initializePropertyResetButton() {
  if (!propertyResetButton) return;

  propertyResetButton.addEventListener(
    "click",
    () => {
      const resetResults =
        resetPropertyFilters();

      renderPropertyCards(
        resetResults
      );

      document.dispatchEvent(
        new CustomEvent(
          "elvara:property-filters-reset"
        )
      );
    }
  );
}


/* =========================================================
   38. PROPERTY RESULT EVENT
========================================================= */

/**
 * Notify other scripts when results change.
 *
 * @param {Object[]} results
 */
function dispatchPropertyResultsEvent(
  results
) {
  document.dispatchEvent(
    new CustomEvent(
      "elvara:property-results",
      {
        detail: {
          results: [...results],
          count: results.length,

          filters: {
            category:
              ElvaraProperties
                .activeCategory,

            location:
              ElvaraProperties
                .activeLocation,

            status:
              ElvaraProperties
                .activeStatus,

            search:
              ElvaraProperties
                .searchQuery,

            sort:
              ElvaraProperties
                .sortOption,
          },
        },
      }
    )
  );
}


/* =========================================================
   39. FILTER AND RENDER
========================================================= */

/**
 * Apply filters, render cards and emit an event.
 *
 * @returns {Object[]}
 */
function applyFiltersAndRenderProperties() {
  const results =
    applyPropertyFilters();

  renderPropertyCards(results);
  dispatchPropertyResultsEvent(results);

  return results;
}


/* =========================================================
   40. LISTING INITIALIZATION
========================================================= */

function initializePropertyListing() {
  if (!propertyListingGrid) {
    return;
  }

  initializePropertyResetButton();

  renderPropertyCards(
    ElvaraProperties.filteredProperties
  );
}


/* =========================================================
   41. RUN AFTER PROPERTY FOUNDATION
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializePropertyListing();
  },
  { once: true }
);


/* =========================================================
   FALLBACK FOR ALREADY-INITIALIZED STATE
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0 &&
    propertyListingGrid &&
    propertyListingGrid.children.length ===
      0
  ) {
    initializePropertyListing();
  }
});


/* =========================================================
   END OF PROPERTIES.JS — PART 2A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 2B
   Search, Categories, Location, Status and Sorting Controls
========================================================= */


/* =========================================================
   42. PROPERTY FILTER DOM ELEMENTS
========================================================= */

const propertySearchInput =
  propertySelect(
    "#propertySearchInput"
  );

const propertySearchButton =
  propertySelect(
    "#propertySearchButton"
  );

const propertyCategoryFilters =
  propertySelect(
    "#propertyCategoryFilters"
  );

const propertyLocationFilter =
  propertySelect(
    "#propertyLocationFilter"
  );

const propertyStatusFilter =
  propertySelect(
    "#propertyStatusFilter"
  );

const propertySortFilter =
  propertySelect(
    "#propertySortFilter"
  );

const propertyClearFiltersButton =
  propertySelect(
    "#propertyClearFilters"
  );

const propertyActiveFilters =
  propertySelect(
    "#propertyActiveFilters"
  );

const propertyMobileFilterToggle =
  propertySelect(
    "#propertyMobileFilterToggle"
  );

const propertyFilterPanel =
  propertySelect(
    "#propertyFilterPanel"
  );

const propertyFilterPanelClose =
  propertySelect(
    "#propertyFilterPanelClose"
  );

const propertyFilterOverlay =
  propertySelect(
    "#propertyFilterOverlay"
  );


/* =========================================================
   43. SEARCH DEBOUNCE
========================================================= */

let propertySearchTimer = null;

const propertySearchDelay = 280;


/**
 * Run property search after a short delay.
 *
 * @param {string} searchValue
 */
function debouncePropertySearch(
  searchValue
) {
  window.clearTimeout(
    propertySearchTimer
  );

  propertySearchTimer =
    window.setTimeout(() => {
      ElvaraProperties.searchQuery =
        searchValue.trim();

      applyFiltersAndRenderProperties();
      updatePropertyFilterInterface();
      updatePropertyUrl();
    }, propertySearchDelay);
}


/* =========================================================
   44. CATEGORY FILTER MARKUP
========================================================= */

/**
 * Create category-filter button markup.
 *
 * @param {Object} category
 * @returns {string}
 */
function createCategoryFilterMarkup(
  category
) {
  const isActive =
    category.id ===
    ElvaraProperties.activeCategory;

  const categoryCount =
    category.id === "all"
      ? ElvaraProperties.properties.length
      : ElvaraProperties.properties.filter(
          (property) =>
            property.category ===
            category.id
        ).length;

  return `
    <button
      class="property-category-filter${
        isActive ? " active" : ""
      }"
      type="button"
      data-category="${escapePropertyHtml(
        category.id
      )}"
      aria-pressed="${String(
        isActive
      )}"
    >

      <span class="property-category-filter-icon">
        <i class="${escapePropertyHtml(
          category.icon
        )}"></i>
      </span>

      <span class="property-category-filter-label">
        ${escapePropertyHtml(
          category.label
        )}
      </span>

      <span class="property-category-filter-count">
        ${formatPropertyNumber(
          categoryCount
        )}
      </span>

    </button>
  `;
}


/* =========================================================
   45. RENDER CATEGORY FILTERS
========================================================= */

function renderPropertyCategoryFilters() {
  if (!propertyCategoryFilters) {
    return;
  }

  propertyCategoryFilters.innerHTML =
    propertyCategories
      .map(createCategoryFilterMarkup)
      .join("");

  initializePropertyCategoryButtons();
}


/* =========================================================
   46. CATEGORY BUTTON EVENTS
========================================================= */

function initializePropertyCategoryButtons() {
  if (!propertyCategoryFilters) {
    return;
  }

  const categoryButtons =
    propertySelectAll(
      ".property-category-filter",
      propertyCategoryFilters
    );

  categoryButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const selectedCategory =
          button.dataset.category ||
          "all";

        ElvaraProperties.activeCategory =
          selectedCategory;

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  });
}


/* =========================================================
   47. LOCATION SELECT OPTIONS
========================================================= */

function populatePropertyLocationFilter() {
  if (!propertyLocationFilter) {
    return;
  }

  const cities =
    getUniquePropertyCities();

  const optionMarkup = [
    `
      <option value="all">
        All Locations
      </option>
    `,
    ...cities.map(
      (city) => `
        <option value="${escapePropertyHtml(
          city
        )}">
          ${escapePropertyHtml(city)}
        </option>
      `
    ),
  ].join("");

  propertyLocationFilter.innerHTML =
    optionMarkup;

  propertyLocationFilter.value =
    cities.includes(
      ElvaraProperties.activeLocation
    )
      ? ElvaraProperties.activeLocation
      : "all";
}


/* =========================================================
   48. STATUS SELECT OPTIONS
========================================================= */

function populatePropertyStatusFilter() {
  if (!propertyStatusFilter) {
    return;
  }

  const statusLabels = {
    available: "Available",
    investment: "Investment",
    reserved: "Reserved",
    sold: "Sold",
  };

  const statuses =
    getUniquePropertyStatuses();

  const optionMarkup = [
    `
      <option value="all">
        All Statuses
      </option>
    `,
    ...statuses.map(
      (status) => `
        <option value="${escapePropertyHtml(
          status
        )}">
          ${escapePropertyHtml(
            statusLabels[status] ||
              status
          )}
        </option>
      `
    ),
  ].join("");

  propertyStatusFilter.innerHTML =
    optionMarkup;

  propertyStatusFilter.value =
    statuses.includes(
      ElvaraProperties.activeStatus
    )
      ? ElvaraProperties.activeStatus
      : "all";
}


/* =========================================================
   49. SORT SELECT OPTIONS
========================================================= */

function populatePropertySortFilter() {
  if (!propertySortFilter) {
    return;
  }

  propertySortFilter.innerHTML = `
    <option value="featured">
      Featured First
    </option>

    <option value="price-low">
      Price: Low to High
    </option>

    <option value="price-high">
      Price: High to Low
    </option>

    <option value="area-large">
      Area: Largest First
    </option>

    <option value="area-small">
      Area: Smallest First
    </option>

    <option value="newest">
      New Listings First
    </option>

    <option value="title">
      Property Name
    </option>
  `;

  propertySortFilter.value =
    ElvaraProperties.sortOption;
}


/* =========================================================
   50. SEARCH CONTROL EVENTS
========================================================= */

function initializePropertySearchControls() {
  if (propertySearchInput) {
    propertySearchInput.value =
      ElvaraProperties.searchQuery;

    propertySearchInput.addEventListener(
      "input",
      (event) => {
        debouncePropertySearch(
          event.target.value
        );
      }
    );

    propertySearchInput.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Enter") {
          return;
        }

        event.preventDefault();

        window.clearTimeout(
          propertySearchTimer
        );

        ElvaraProperties.searchQuery =
          propertySearchInput.value.trim();

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  }

  if (propertySearchButton) {
    propertySearchButton.addEventListener(
      "click",
      () => {
        window.clearTimeout(
          propertySearchTimer
        );

        ElvaraProperties.searchQuery =
          propertySearchInput?.value.trim() ||
          "";

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  }
}


/* =========================================================
   51. SELECT FILTER EVENTS
========================================================= */

function initializePropertySelectFilters() {
  if (propertyLocationFilter) {
    propertyLocationFilter.addEventListener(
      "change",
      () => {
        ElvaraProperties.activeLocation =
          propertyLocationFilter.value ||
          "all";

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  }

  if (propertyStatusFilter) {
    propertyStatusFilter.addEventListener(
      "change",
      () => {
        ElvaraProperties.activeStatus =
          propertyStatusFilter.value ||
          "all";

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  }

  if (propertySortFilter) {
    propertySortFilter.addEventListener(
      "change",
      () => {
        ElvaraProperties.sortOption =
          propertySortFilter.value ||
          "featured";

        applyFiltersAndRenderProperties();
        updatePropertyFilterInterface();
        updatePropertyUrl();
      }
    );
  }
}


/* =========================================================
   52. ACTIVE FILTER LABELS
========================================================= */

/**
 * Return active filter chips.
 *
 * @returns {Object[]}
 */
function getActivePropertyFilters() {
  const activeFilters = [];

  if (
    ElvaraProperties.activeCategory !==
    "all"
  ) {
    activeFilters.push({
      type: "category",
      value:
        ElvaraProperties.activeCategory,
      label:
        getPropertyCategoryLabel(
          ElvaraProperties.activeCategory
        ),
    });
  }

  if (
    ElvaraProperties.activeLocation !==
    "all"
  ) {
    activeFilters.push({
      type: "location",
      value:
        ElvaraProperties.activeLocation,
      label:
        ElvaraProperties.activeLocation,
    });
  }

  if (
    ElvaraProperties.activeStatus !==
    "all"
  ) {
    const selectedProperty =
      ElvaraProperties.properties.find(
        (property) =>
          property.status ===
          ElvaraProperties.activeStatus
      );

    activeFilters.push({
      type: "status",
      value:
        ElvaraProperties.activeStatus,
      label:
        selectedProperty?.statusLabel ||
        ElvaraProperties.activeStatus,
    });
  }

  if (ElvaraProperties.searchQuery) {
    activeFilters.push({
      type: "search",
      value:
        ElvaraProperties.searchQuery,
      label: `Search: ${ElvaraProperties.searchQuery}`,
    });
  }

  return activeFilters;
}


/* =========================================================
   53. ACTIVE FILTER CHIP MARKUP
========================================================= */

function createActiveFilterMarkup(
  filter
) {
  return `
    <button
      class="property-active-filter"
      type="button"
      data-filter-type="${escapePropertyHtml(
        filter.type
      )}"
      aria-label="Remove ${escapePropertyHtml(
        filter.label
      )} filter"
    >

      <span>
        ${escapePropertyHtml(
          filter.label
        )}
      </span>

      <i class="fa-solid fa-xmark"></i>

    </button>
  `;
}


/* =========================================================
   54. RENDER ACTIVE FILTERS
========================================================= */

function renderActivePropertyFilters() {
  if (!propertyActiveFilters) {
    return;
  }

  const filters =
    getActivePropertyFilters();

  propertyActiveFilters.innerHTML =
    filters
      .map(createActiveFilterMarkup)
      .join("");

  propertyActiveFilters.hidden =
    filters.length === 0;

  initializeActiveFilterButtons();
}


/* =========================================================
   55. REMOVE ONE ACTIVE FILTER
========================================================= */

function removeActivePropertyFilter(
  filterType
) {
  switch (filterType) {
    case "category":
      ElvaraProperties.activeCategory =
        "all";
      break;

    case "location":
      ElvaraProperties.activeLocation =
        "all";
      break;

    case "status":
      ElvaraProperties.activeStatus =
        "all";
      break;

    case "search":
      ElvaraProperties.searchQuery = "";

      if (propertySearchInput) {
        propertySearchInput.value = "";
      }
      break;

    default:
      return;
  }

  applyFiltersAndRenderProperties();
  updatePropertyFilterInterface();
  updatePropertyUrl();
}


/* =========================================================
   56. ACTIVE FILTER BUTTON EVENTS
========================================================= */

function initializeActiveFilterButtons() {
  if (!propertyActiveFilters) {
    return;
  }

  propertySelectAll(
    ".property-active-filter",
    propertyActiveFilters
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        removeActivePropertyFilter(
          button.dataset.filterType
        );
      }
    );
  });
}


/* =========================================================
   57. CLEAR ALL FILTERS
========================================================= */

function clearAllPropertyFilters() {
  resetPropertyFilters();

  if (propertySearchInput) {
    propertySearchInput.value = "";
  }

  applyFiltersAndRenderProperties();
  updatePropertyFilterInterface();
  updatePropertyUrl();
}


function initializeClearFiltersButton() {
  if (!propertyClearFiltersButton) {
    return;
  }

  propertyClearFiltersButton.addEventListener(
    "click",
    clearAllPropertyFilters
  );
}


/* =========================================================
   58. UPDATE CATEGORY BUTTON STATE
========================================================= */

function updateCategoryButtonState() {
  if (!propertyCategoryFilters) {
    return;
  }

  propertySelectAll(
    ".property-category-filter",
    propertyCategoryFilters
  ).forEach((button) => {
    const isActive =
      button.dataset.category ===
      ElvaraProperties.activeCategory;

    button.classList.toggle(
      "active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


/* =========================================================
   59. UPDATE COMPLETE FILTER INTERFACE
========================================================= */

function updatePropertyFilterInterface() {
  updateCategoryButtonState();

  if (propertyLocationFilter) {
    propertyLocationFilter.value =
      ElvaraProperties.activeLocation;
  }

  if (propertyStatusFilter) {
    propertyStatusFilter.value =
      ElvaraProperties.activeStatus;
  }

  if (propertySortFilter) {
    propertySortFilter.value =
      ElvaraProperties.sortOption;
  }

  if (
    propertySearchInput &&
    document.activeElement !==
      propertySearchInput
  ) {
    propertySearchInput.value =
      ElvaraProperties.searchQuery;
  }

  renderActivePropertyFilters();
}


/* =========================================================
   60. UPDATE URL WITHOUT RELOAD
========================================================= */

function updatePropertyUrl() {
  if (
    !window.history ||
    typeof window.history.replaceState !==
      "function"
  ) {
    return;
  }

  const parameters =
    new URLSearchParams();

  if (
    ElvaraProperties.activeCategory !==
    "all"
  ) {
    parameters.set(
      "category",
      ElvaraProperties.activeCategory
    );
  }

  if (
    ElvaraProperties.activeLocation !==
    "all"
  ) {
    parameters.set(
      "location",
      ElvaraProperties.activeLocation
    );
  }

  if (
    ElvaraProperties.activeStatus !==
    "all"
  ) {
    parameters.set(
      "status",
      ElvaraProperties.activeStatus
    );
  }

  if (ElvaraProperties.searchQuery) {
    parameters.set(
      "search",
      ElvaraProperties.searchQuery
    );
  }

  if (
    ElvaraProperties.sortOption !==
    "featured"
  ) {
    parameters.set(
      "sort",
      ElvaraProperties.sortOption
    );
  }

  const currentPage =
    window.location.pathname;

  const queryString =
    parameters.toString();

  const updatedUrl =
    queryString
      ? `${currentPage}?${queryString}`
      : currentPage;

  window.history.replaceState(
    null,
    "",
    updatedUrl
  );
}


/* =========================================================
   61. MOBILE FILTER PANEL
========================================================= */

function openPropertyFilterPanel() {
  if (!propertyFilterPanel) {
    return;
  }

  propertyFilterPanel.classList.add(
    "is-open"
  );

  propertyFilterOverlay?.classList.add(
    "is-visible"
  );

  propertyMobileFilterToggle?.setAttribute(
    "aria-expanded",
    "true"
  );

  propertyFilterPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  if (
    typeof lockPageScroll ===
    "function"
  ) {
    lockPageScroll();
  }

  window.setTimeout(() => {
    propertyFilterPanelClose?.focus();
  }, 180);
}


function closePropertyFilterPanel() {
  if (!propertyFilterPanel) {
    return;
  }

  propertyFilterPanel.classList.remove(
    "is-open"
  );

  propertyFilterOverlay?.classList.remove(
    "is-visible"
  );

  propertyMobileFilterToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

  propertyFilterPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  if (
    typeof unlockPageScroll ===
    "function"
  ) {
    unlockPageScroll();
  }
}


/* =========================================================
   62. MOBILE FILTER EVENTS
========================================================= */

function initializeMobilePropertyFilters() {
  if (propertyFilterPanel) {
    propertyFilterPanel.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  propertyMobileFilterToggle?.setAttribute(
    "aria-expanded",
    "false"
  );

  propertyMobileFilterToggle?.addEventListener(
    "click",
    openPropertyFilterPanel
  );

  propertyFilterPanelClose?.addEventListener(
    "click",
    closePropertyFilterPanel
  );

  propertyFilterOverlay?.addEventListener(
    "click",
    closePropertyFilterPanel
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        propertyFilterPanel?.classList.contains(
          "is-open"
        )
      ) {
        closePropertyFilterPanel();
      }
    }
  );
}


/* =========================================================
   63. INITIALIZE ALL FILTER CONTROLS
========================================================= */

function initializePropertyFilterControls() {
  const hasFilterInterface =
    propertySearchInput ||
    propertyCategoryFilters ||
    propertyLocationFilter ||
    propertyStatusFilter ||
    propertySortFilter;

  if (!hasFilterInterface) {
    return;
  }

  renderPropertyCategoryFilters();
  populatePropertyLocationFilter();
  populatePropertyStatusFilter();
  populatePropertySortFilter();

  initializePropertySearchControls();
  initializePropertySelectFilters();
  initializeClearFiltersButton();
  initializeMobilePropertyFilters();

  updatePropertyFilterInterface();
}


/* =========================================================
   64. INITIALIZE AFTER PROPERTY DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializePropertyFilterControls();
  },
  { once: true }
);
/* =========================================================
   65. FALLBACK INITIALIZATION
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializePropertyFilterControls();
  }
});


/* =========================================================
   END OF PROPERTIES.JS — PART 2B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 3A
   Property Details Selection, Hero and Main Information
========================================================= */


/* =========================================================
   66. PROPERTY DETAILS DOM ELEMENTS
========================================================= */

const propertyDetailsPage =
  propertySelect(
    "#propertyDetailsPage"
  );

const propertyDetailsHero =
  propertySelect(
    "#propertyDetailsHero"
  );

const propertyDetailsVideo =
  propertySelect(
    "#propertyDetailsVideo"
  );

const propertyDetailsPoster =
  propertySelect(
    "#propertyDetailsPoster"
  );

const propertyDetailsCategory =
  propertySelect(
    "#propertyDetailsCategory"
  );

const propertyDetailsTitle =
  propertySelect(
    "#propertyDetailsTitle"
  );

const propertyDetailsLocation =
  propertySelect(
    "#propertyDetailsLocation"
  );

const propertyDetailsPriceLabel =
  propertySelect(
    "#propertyDetailsPriceLabel"
  );

const propertyDetailsPrice =
  propertySelect(
    "#propertyDetailsPrice"
  );

const propertyDetailsReference =
  propertySelect(
    "#propertyDetailsReference"
  );

const propertyDetailsDescription =
  propertySelect(
    "#propertyDetailsDescription"
  );

const propertyDetailsSpecifications =
  propertySelect(
    "#propertyDetailsSpecifications"
  );

const propertyDetailsAmenities =
  propertySelect(
    "#propertyDetailsAmenities"
  );

const propertyDetailsGallery =
  propertySelect(
    "#propertyDetailsGallery"
  );

const propertyDetailsMainImage =
  propertySelect(
    "#propertyDetailsMainImage"
  );

const propertyDetailsGalleryThumbs =
  propertySelect(
    "#propertyDetailsGalleryThumbs"
  );

const propertyDetailsBreadcrumbTitle =
  propertySelect(
    "#propertyDetailsBreadcrumbTitle"
  );

const propertyDetailsStatus =
  propertySelect(
    "#propertyDetailsStatus"
  );

const propertyDetailsEnquiryButton =
  propertySelect(
    "#propertyDetailsEnquiryButton"
  );

const propertyDetailsWhatsappButton =
  propertySelect(
    "#propertyDetailsWhatsappButton"
  );

const relatedPropertiesGrid =
  propertySelect(
    "#relatedPropertiesGrid"
  );

const propertyDetailsNotFound =
  propertySelect(
    "#propertyDetailsNotFound"
  );


/* =========================================================
   67. PROPERTY DETAILS PAGE CHECK
========================================================= */

/**
 * Return true when the current page contains
 * the property-details layout.
 *
 * @returns {boolean}
 */
function isPropertyDetailsPage() {
  return Boolean(
    propertyDetailsPage ||
    propertyDetailsTitle ||
    propertyDetailsHero
  );
}


/* =========================================================
   68. SELECT PROPERTY FROM URL
========================================================= */

/**
 * Read the property slug or ID from the URL.
 *
 * Supported examples:
 * property-details.html?property=aurelia-hillside-villa
 * property-details.html?id=elv-uv-001
 *
 * @returns {Object|null}
 */
function getSelectedPropertyFromUrl() {
  const slugParameter =
    getPropertyUrlParameter(
      "property"
    );

  const idParameter =
    getPropertyUrlParameter(
      "id"
    );

  if (slugParameter) {
    const propertyBySlug =
      findPropertyBySlug(
        slugParameter
      );

    if (propertyBySlug) {
      return propertyBySlug;
    }
  }

  if (idParameter) {
    const propertyById =
      findPropertyById(
        idParameter
      );

    if (propertyById) {
      return propertyById;
    }
  }

  /*
   Use the featured villa as a safe demo fallback
   when no query parameter is provided.
  */
  return (
    getFeaturedProperties()[0] ||
    ElvaraProperties.properties[0] ||
    null
  );
}


/* =========================================================
   69. PROPERTY DETAILS PAGE TITLE
========================================================= */

function updatePropertyDetailsDocumentTitle(
  property
) {
  if (!property) return;

  document.title =
    `${property.title} | Élvara Estates`;
}


/* =========================================================
   70. PROPERTY STATUS CLASS
========================================================= */

/**
 * Return a safe CSS modifier for status labels.
 *
 * @param {string} status
 * @returns {string}
 */
function getPropertyStatusClass(status) {
  const allowedStatuses = [
    "available",
    "investment",
    "reserved",
    "sold",
  ];

  return allowedStatuses.includes(
    status
  )
    ? status
    : "available";
}


/* =========================================================
   71. HERO VIDEO SOURCE UPDATE
========================================================= */

function updatePropertyDetailsVideo(
  property
) {
  if (!propertyDetailsVideo) return;

  const videoSource =
    propertySelect(
      "source",
      propertyDetailsVideo
    );

  if (
    videoSource &&
    property.video
  ) {
    videoSource.src =
      property.video;

    propertyDetailsVideo.poster =
      property.image;

    propertyDetailsVideo.load();

    propertyDetailsVideo.muted = true;
    propertyDetailsVideo.defaultMuted =
      true;
    propertyDetailsVideo.playsInline =
      true;

    if (
      typeof safelyPlayVideo ===
      "function"
    ) {
      safelyPlayVideo(
        propertyDetailsVideo
      );
    }
  }
}


/* =========================================================
   72. HERO POSTER FALLBACK
========================================================= */

function updatePropertyDetailsPoster(
  property
) {
  if (!propertyDetailsPoster) return;

  propertyDetailsPoster.src =
    property.image;

  propertyDetailsPoster.alt =
    property.title;
}


/* =========================================================
   73. MAIN TEXT CONTENT
========================================================= */

function updatePropertyDetailsText(
  property
) {
  if (propertyDetailsCategory) {
    propertyDetailsCategory.textContent =
      property.categoryLabel;
  }

  if (propertyDetailsTitle) {
    propertyDetailsTitle.textContent =
      property.title;
  }

  if (propertyDetailsLocation) {
    propertyDetailsLocation.innerHTML = `
      <i class="fa-solid fa-location-dot"></i>
      <span>
        ${escapePropertyHtml(
          property.location
        )}
      </span>
    `;
  }

  if (propertyDetailsPriceLabel) {
    propertyDetailsPriceLabel.textContent =
      property.priceLabel;
  }

  if (propertyDetailsPrice) {
    propertyDetailsPrice.textContent =
      property.displayPrice ||
      formatPropertyPrice(
        property.price
      );
  }

  if (propertyDetailsReference) {
    propertyDetailsReference.textContent =
      property.reference;
  }

  if (propertyDetailsDescription) {
    propertyDetailsDescription.textContent =
      property.description;
  }

  if (
    propertyDetailsBreadcrumbTitle
  ) {
    propertyDetailsBreadcrumbTitle.textContent =
      property.title;
  }

  if (propertyDetailsStatus) {
    propertyDetailsStatus.textContent =
      property.statusLabel;

    propertyDetailsStatus.className =
      `property-details-status property-details-status-${getPropertyStatusClass(
        property.status
      )}`;
  }
}


/* =========================================================
   74. DETAILS SPECIFICATION MARKUP
========================================================= */

/**
 * Create one property specification item.
 *
 * @param {string} icon
 * @param {string|number} value
 * @param {string} label
 * @returns {string}
 */
function createDetailsSpecificationMarkup(
  icon,
  value,
  label
) {
  return `
    <div class="property-detail-specification">

      <span class="property-detail-specification-icon">
        <i class="${escapePropertyHtml(
          icon
        )}"></i>
      </span>

      <div>
        <strong>
          ${escapePropertyHtml(value)}
        </strong>

        <small>
          ${escapePropertyHtml(label)}
        </small>
      </div>

    </div>
  `;
}


/* =========================================================
   75. PROPERTY TYPE SPECIFICATION
========================================================= */

function getPropertyPrimarySpecification(
  property
) {
  if (property.category === "hotel") {
    return {
      icon: "fa-solid fa-bed",
      value: formatPropertyNumber(
        property.bedrooms
      ),
      label: "Guest Suites",
    };
  }

  if (
    property.category === "commercial"
  ) {
    return {
      icon: "fa-solid fa-building",
      value: "Commercial",
      label: "Property Type",
    };
  }

  return {
    icon: "fa-solid fa-bed",
    value: formatPropertyNumber(
      property.bedrooms
    ),
    label: "Bedrooms",
  };
}


/* =========================================================
   76. BATHROOM DETAILS SPECIFICATION
========================================================= */

function getPropertyBathroomSpecification(
  property
) {
  if (
    property.category === "commercial"
  ) {
    return {
      icon: "fa-solid fa-restroom",
      value: formatPropertyNumber(
        property.bathrooms
      ),
      label: "Facilities",
    };
  }

  return {
    icon: "fa-solid fa-bath",
    value: formatPropertyNumber(
      property.bathrooms
    ),
    label: "Bathrooms",
  };
}


/* =========================================================
   77. RENDER DETAILS SPECIFICATIONS
========================================================= */

function renderPropertyDetailsSpecifications(
  property
) {
  if (
    !propertyDetailsSpecifications
  ) {
    return;
  }

  const primarySpecification =
    getPropertyPrimarySpecification(
      property
    );

  const bathroomSpecification =
    getPropertyBathroomSpecification(
      property
    );

  const specifications = [
    primarySpecification,
    bathroomSpecification,
    {
      icon:
        "fa-solid fa-ruler-combined",
      value:
        property.areaLabel ||
        formatPropertyArea(
          property.area
        ),
      label: "Interior Area",
    },
    {
      icon:
        "fa-solid fa-location-dot",
      value: property.city,
      label: property.state,
    },
  ];

  propertyDetailsSpecifications.innerHTML =
    specifications
      .map((specification) =>
        createDetailsSpecificationMarkup(
          specification.icon,
          specification.value,
          specification.label
        )
      )
      .join("");
}


/* =========================================================
   78. AMENITY MARKUP
========================================================= */

function createPropertyAmenityMarkup(
  amenity,
  index
) {
  return `
    <li class="property-amenity-item">

      <span class="property-amenity-number">
        ${String(
          index + 1
        ).padStart(2, "0")}
      </span>

      <span class="property-amenity-icon">
        <i class="fa-solid fa-check"></i>
      </span>

      <span class="property-amenity-label">
        ${escapePropertyHtml(
          amenity
        )}
      </span>

    </li>
  `;
}


/* =========================================================
   79. RENDER PROPERTY AMENITIES
========================================================= */

function renderPropertyDetailsAmenities(
  property
) {
  if (!propertyDetailsAmenities) {
    return;
  }

  const amenities =
    Array.isArray(property.amenities)
      ? property.amenities
      : [];

  propertyDetailsAmenities.innerHTML =
    amenities
      .map(
        createPropertyAmenityMarkup
      )
      .join("");
}


/* =========================================================
   80. ENQUIRY MESSAGE
========================================================= */

function createPropertyEnquiryMessage(
  property
) {
  return (
    `Hello Élvara Estates, I would like to enquire about ` +
    `${property.title} (${property.reference}).`
  );
}


/* =========================================================
   81. CONTACT AND WHATSAPP LINKS
========================================================= */

function updatePropertyContactLinks(
  property
) {
  const enquiryMessage =
    createPropertyEnquiryMessage(
      property
    );

  if (
    propertyDetailsEnquiryButton
  ) {
    propertyDetailsEnquiryButton.href =
      `contact.html?property=${encodeURIComponent(
        property.slug
      )}`;
  }

  if (
    propertyDetailsWhatsappButton
  ) {
    propertyDetailsWhatsappButton.href =
      `https://wa.me/919876543210?text=${encodeURIComponent(
        enquiryMessage
      )}`;

    propertyDetailsWhatsappButton.target =
      "_blank";

    propertyDetailsWhatsappButton.rel =
      "noopener noreferrer";
  }
}


/* =========================================================
   82. DETAILS PAGE NOT FOUND STATE
========================================================= */

function showPropertyDetailsNotFound() {
  if (propertyDetailsPage) {
    propertyDetailsPage.hidden = true;
  }

  if (propertyDetailsNotFound) {
    propertyDetailsNotFound.hidden =
      false;

    propertyDetailsNotFound.setAttribute(
      "aria-hidden",
      "false"
    );
  }
}


function hidePropertyDetailsNotFound() {
  if (propertyDetailsPage) {
    propertyDetailsPage.hidden = false;
  }

  if (propertyDetailsNotFound) {
    propertyDetailsNotFound.hidden =
      true;

    propertyDetailsNotFound.setAttribute(
      "aria-hidden",
      "true"
    );
  }
}


/* =========================================================
   83. SELECT ACTIVE PROPERTY
========================================================= */

function selectPropertyForDetails(
  property
) {
  if (!property) {
    showPropertyDetailsNotFound();
    return;
  }

  hidePropertyDetailsNotFound();

  ElvaraProperties.selectedPropertyId =
    property.id;

  updatePropertyDetailsDocumentTitle(
    property
  );

  updatePropertyDetailsVideo(
    property
  );

  updatePropertyDetailsPoster(
    property
  );

  updatePropertyDetailsText(
    property
  );

  renderPropertyDetailsSpecifications(
    property
  );

  renderPropertyDetailsAmenities(
    property
  );

  updatePropertyContactLinks(
    property
  );

  document.dispatchEvent(
    new CustomEvent(
      "elvara:property-selected",
      {
        detail: {
          property: {
            ...property,
            gallery: [
              ...property.gallery,
            ],
            amenities: [
              ...property.amenities,
            ],
          },
        },
      }
    )
  );
}


/* =========================================================
   84. DETAILS PAGE BASE INITIALIZATION
========================================================= */

function initializePropertyDetailsBase() {
  if (!isPropertyDetailsPage()) {
    return;
  }

  const selectedProperty =
    getSelectedPropertyFromUrl();

  selectPropertyForDetails(
    selectedProperty
  );
}


/* =========================================================
   85. RUN DETAILS BASE AFTER DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializePropertyDetailsBase();
  },
  { once: true }
);


/* =========================================================
   86. DETAILS BASE FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0 &&
    isPropertyDetailsPage()
  ) {
    initializePropertyDetailsBase();
  }
});


/* =========================================================
   END OF PROPERTIES.JS — PART 3A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 3B-1
   Dynamic Gallery, Thumbnails and Fullscreen Preview
========================================================= */


/* =========================================================
   87. PROPERTY GALLERY STATE
========================================================= */

const propertyGalleryState = {
  images: [],
  currentIndex: 0,
  isLightboxOpen: false,
  previousFocusedElement: null,
};


/* =========================================================
   88. PREPARE PROPERTY GALLERY IMAGES
========================================================= */

/**
 * Return unique and valid gallery images.
 *
 * @param {Object} property
 * @returns {string[]}
 */
function getPropertyGalleryImages(
  property
) {
  if (!property) return [];

  const galleryImages = [
    property.image,
    ...(Array.isArray(property.gallery)
      ? property.gallery
      : []),
  ].filter(Boolean);

  return Array.from(
    new Set(galleryImages)
  );
}


/* =========================================================
   89. GALLERY THUMBNAIL MARKUP
========================================================= */

/**
 * Create one gallery thumbnail button.
 *
 * @param {string} imageSource
 * @param {number} index
 * @param {Object} property
 * @returns {string}
 */
function createPropertyGalleryThumbnail(
  imageSource,
  index,
  property
) {
  const isActive =
    index ===
    propertyGalleryState.currentIndex;

  return `
    <button
      class="property-gallery-thumbnail${
        isActive ? " active" : ""
      }"
      type="button"
      data-gallery-index="${index}"
      aria-label="View image ${index + 1} of ${propertyGalleryState.images.length}"
      aria-pressed="${String(
        isActive
      )}"
    >

      <img
        src="${escapePropertyHtml(
          imageSource
        )}"
        alt="${escapePropertyHtml(
          `${property.title} gallery image ${index + 1}`
        )}"
        loading="lazy"
        decoding="async"
      >

      <span class="property-gallery-thumbnail-number">
        ${String(index + 1).padStart(
          2,
          "0"
        )}
      </span>

    </button>
  `;
}


/* =========================================================
   90. UPDATE MAIN GALLERY IMAGE
========================================================= */

function updatePropertyMainGalleryImage() {
  if (
    !propertyDetailsMainImage ||
    propertyGalleryState.images.length ===
      0
  ) {
    return;
  }

  const totalImages =
    propertyGalleryState.images.length;

  propertyGalleryState.currentIndex =
    (
      propertyGalleryState.currentIndex %
        totalImages +
      totalImages
    ) % totalImages;

  const currentImage =
    propertyGalleryState.images[
      propertyGalleryState.currentIndex
    ];

  const selectedProperty =
    findPropertyById(
      ElvaraProperties.selectedPropertyId
    );

  propertyDetailsMainImage.classList.add(
    "is-changing"
  );

  window.setTimeout(() => {
    propertyDetailsMainImage.src =
      currentImage;

    propertyDetailsMainImage.alt =
      selectedProperty
        ? `${selectedProperty.title} gallery image ${propertyGalleryState.currentIndex + 1}`
        : "Luxury property gallery image";

    propertyDetailsMainImage.classList.remove(
      "is-changing"
    );
  }, 140);

  updatePropertyGalleryThumbnailState();
  updatePropertyGalleryCounter();
}


/* =========================================================
   91. UPDATE THUMBNAIL ACTIVE STATE
========================================================= */

function updatePropertyGalleryThumbnailState() {
  if (!propertyDetailsGalleryThumbs) {
    return;
  }

  propertySelectAll(
    ".property-gallery-thumbnail",
    propertyDetailsGalleryThumbs
  ).forEach((thumbnail) => {
    const thumbnailIndex =
      Number(
        thumbnail.dataset.galleryIndex
      );

    const isActive =
      thumbnailIndex ===
      propertyGalleryState.currentIndex;

    thumbnail.classList.toggle(
      "active",
      isActive
    );

    thumbnail.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


/* =========================================================
   92. PROPERTY GALLERY COUNTER
========================================================= */

function updatePropertyGalleryCounter() {
  const galleryCounter =
    propertySelect(
      "#propertyGalleryCounter"
    );

  if (!galleryCounter) return;

  galleryCounter.textContent =
    `${String(
      propertyGalleryState.currentIndex +
        1
    ).padStart(2, "0")} / ${String(
      propertyGalleryState.images.length
    ).padStart(2, "0")}`;
}


/* =========================================================
   93. RENDER PROPERTY GALLERY
========================================================= */

function renderPropertyDetailsGallery(
  property
) {
  if (
    !propertyDetailsGalleryThumbs ||
    !propertyDetailsMainImage
  ) {
    return;
  }

  propertyGalleryState.images =
    getPropertyGalleryImages(property);

  propertyGalleryState.currentIndex = 0;

  if (
    propertyGalleryState.images.length ===
    0
  ) {
    if (propertyDetailsGallery) {
      propertyDetailsGallery.hidden =
        true;
    }

    return;
  }

  if (propertyDetailsGallery) {
    propertyDetailsGallery.hidden =
      false;
  }

  propertyDetailsGalleryThumbs.innerHTML =
    propertyGalleryState.images
      .map((imageSource, index) =>
        createPropertyGalleryThumbnail(
          imageSource,
          index,
          property
        )
      )
      .join("");

  propertyDetailsMainImage.src =
    propertyGalleryState.images[0];

  propertyDetailsMainImage.alt =
    `${property.title} gallery image 1`;

  initializePropertyGalleryThumbnails();
  updatePropertyGalleryCounter();
}


/* =========================================================
   94. GALLERY THUMBNAIL EVENTS
========================================================= */

function initializePropertyGalleryThumbnails() {
  if (!propertyDetailsGalleryThumbs) {
    return;
  }

  propertySelectAll(
    ".property-gallery-thumbnail",
    propertyDetailsGalleryThumbs
  ).forEach((thumbnail) => {
    thumbnail.addEventListener(
      "click",
      () => {
        const selectedIndex =
          Number(
            thumbnail.dataset.galleryIndex
          );

        if (
          !Number.isInteger(
            selectedIndex
          )
        ) {
          return;
        }

        propertyGalleryState.currentIndex =
          selectedIndex;

        updatePropertyMainGalleryImage();
      }
    );
  });
}


/* =========================================================
   95. PREVIOUS AND NEXT GALLERY IMAGE
========================================================= */

function showPreviousPropertyGalleryImage() {
  propertyGalleryState.currentIndex -= 1;

  updatePropertyMainGalleryImage();

  if (
    propertyGalleryState.isLightboxOpen
  ) {
    updatePropertyGalleryLightbox();
  }
}


function showNextPropertyGalleryImage() {
  propertyGalleryState.currentIndex += 1;

  updatePropertyMainGalleryImage();

  if (
    propertyGalleryState.isLightboxOpen
  ) {
    updatePropertyGalleryLightbox();
  }
}


/* =========================================================
   96. PROPERTY GALLERY NAVIGATION BUTTONS
========================================================= */

function initializePropertyGalleryNavigation() {
  const previousButton =
    propertySelect(
      "#propertyGalleryPrevious"
    );

  const nextButton =
    propertySelect(
      "#propertyGalleryNext"
    );

  previousButton?.addEventListener(
    "click",
    showPreviousPropertyGalleryImage
  );

  nextButton?.addEventListener(
    "click",
    showNextPropertyGalleryImage
  );
}


/* =========================================================
   97. CREATE PROPERTY GALLERY LIGHTBOX
========================================================= */

function createPropertyGalleryLightbox() {
  let lightbox =
    propertySelect(
      "#propertyGalleryLightbox"
    );

  if (lightbox) {
    return lightbox;
  }

  lightbox =
    document.createElement("div");

  lightbox.id =
    "propertyGalleryLightbox";

  lightbox.className =
    "property-gallery-lightbox";

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightbox.innerHTML = `
    <div class="property-gallery-lightbox-backdrop"></div>

    <div
      class="property-gallery-lightbox-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Property gallery preview"
    >

      <button
        class="property-gallery-lightbox-close"
        type="button"
        aria-label="Close gallery preview"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <button
        class="property-gallery-lightbox-control property-gallery-lightbox-previous"
        type="button"
        aria-label="View previous property image"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <figure class="property-gallery-lightbox-figure">

        <img
          class="property-gallery-lightbox-image"
          src=""
          alt=""
        >

        <figcaption class="property-gallery-lightbox-caption">

          <div>
            <small>
              Élvara Property Collection
            </small>

            <strong class="property-gallery-lightbox-title">
              Property image
            </strong>
          </div>

          <span class="property-gallery-lightbox-counter">
            01 / 01
          </span>

        </figcaption>

      </figure>

      <button
        class="property-gallery-lightbox-control property-gallery-lightbox-next"
        type="button"
        aria-label="View next property image"
      >
        <i class="fa-solid fa-arrow-right"></i>
      </button>

    </div>
  `;

  document.body.appendChild(
    lightbox
  );

  return lightbox;
}


/* =========================================================
   98. UPDATE PROPERTY GALLERY LIGHTBOX
========================================================= */

function updatePropertyGalleryLightbox() {
  const lightbox =
    propertySelect(
      "#propertyGalleryLightbox"
    );

  if (
    !lightbox ||
    propertyGalleryState.images.length ===
      0
  ) {
    return;
  }

  const totalImages =
    propertyGalleryState.images.length;

  propertyGalleryState.currentIndex =
    (
      propertyGalleryState.currentIndex %
        totalImages +
      totalImages
    ) % totalImages;

  const currentImage =
    propertyGalleryState.images[
      propertyGalleryState.currentIndex
    ];

  const property =
    findPropertyById(
      ElvaraProperties.selectedPropertyId
    );

  const imageElement =
    propertySelect(
      ".property-gallery-lightbox-image",
      lightbox
    );

  const titleElement =
    propertySelect(
      ".property-gallery-lightbox-title",
      lightbox
    );

  const counterElement =
    propertySelect(
      ".property-gallery-lightbox-counter",
      lightbox
    );

  if (imageElement) {
    imageElement.classList.add(
      "is-changing"
    );

    window.setTimeout(() => {
      imageElement.src =
        currentImage;

      imageElement.alt =
        property
          ? `${property.title} gallery image ${propertyGalleryState.currentIndex + 1}`
          : "Luxury property image";

      imageElement.classList.remove(
        "is-changing"
      );
    }, 120);
  }

  if (titleElement) {
    titleElement.textContent =
      property?.title ||
      "Élvara property";
  }

  if (counterElement) {
    counterElement.textContent =
      `${String(
        propertyGalleryState.currentIndex +
          1
      ).padStart(2, "0")} / ${String(
        totalImages
      ).padStart(2, "0")}`;
  }
}


/* =========================================================
   99. OPEN PROPERTY GALLERY LIGHTBOX
========================================================= */

function openPropertyGalleryLightbox() {
  if (
    propertyGalleryState.images.length ===
    0
  ) {
    return;
  }

  const lightbox =
    createPropertyGalleryLightbox();

  propertyGalleryState.isLightboxOpen =
    true;

  propertyGalleryState.previousFocusedElement =
    document.activeElement;

  updatePropertyGalleryLightbox();

  lightbox.classList.add(
    "is-open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  if (
    typeof lockPageScroll ===
    "function"
  ) {
    lockPageScroll();
  }

  window.setTimeout(() => {
    propertySelect(
      ".property-gallery-lightbox-close",
      lightbox
    )?.focus();
  }, 150);
}


/* =========================================================
   100. CLOSE PROPERTY GALLERY LIGHTBOX
========================================================= */

function closePropertyGalleryLightbox() {
  const lightbox =
    propertySelect(
      "#propertyGalleryLightbox"
    );

  if (
    !lightbox ||
    !propertyGalleryState.isLightboxOpen
  ) {
    return;
  }

  propertyGalleryState.isLightboxOpen =
    false;

  lightbox.classList.remove(
    "is-open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  if (
    typeof unlockPageScroll ===
    "function"
  ) {
    unlockPageScroll();
  }

  const previousElement =
    propertyGalleryState
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
   101. PROPERTY GALLERY LIGHTBOX EVENTS
========================================================= */

function initializePropertyGalleryLightbox() {
  if (!propertyDetailsMainImage) {
    return;
  }

  const lightbox =
    createPropertyGalleryLightbox();

  propertyDetailsMainImage.addEventListener(
    "click",
    openPropertyGalleryLightbox
  );

  propertyDetailsMainImage.setAttribute(
    "tabindex",
    "0"
  );

  propertyDetailsMainImage.setAttribute(
    "role",
    "button"
  );

  propertyDetailsMainImage.setAttribute(
    "aria-label",
    "Open property gallery preview"
  );

  propertyDetailsMainImage.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();

        openPropertyGalleryLightbox();
      }
    }
  );

  propertySelect(
    ".property-gallery-lightbox-close",
    lightbox
  )?.addEventListener(
    "click",
    closePropertyGalleryLightbox
  );

  propertySelect(
    ".property-gallery-lightbox-backdrop",
    lightbox
  )?.addEventListener(
    "click",
    closePropertyGalleryLightbox
  );

  propertySelect(
    ".property-gallery-lightbox-previous",
    lightbox
  )?.addEventListener(
    "click",
    showPreviousPropertyGalleryImage
  );

  propertySelect(
    ".property-gallery-lightbox-next",
    lightbox
  )?.addEventListener(
    "click",
    showNextPropertyGalleryImage
  );
}


/* =========================================================
   102. PROPERTY GALLERY KEYBOARD CONTROLS
========================================================= */

function handlePropertyGalleryKeyboard(
  event
) {
  if (
    !propertyGalleryState.isLightboxOpen
  ) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();

    closePropertyGalleryLightbox();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    showPreviousPropertyGalleryImage();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();

    showNextPropertyGalleryImage();
  }
}


/* =========================================================
   103. PROPERTY GALLERY SWIPE SUPPORT
========================================================= */

let propertyGalleryTouchStartX = 0;
let propertyGalleryTouchEndX = 0;


function handlePropertyGallerySwipe() {
  const swipeDistance =
    propertyGalleryTouchEndX -
    propertyGalleryTouchStartX;

  if (
    Math.abs(swipeDistance) < 45
  ) {
    return;
  }

  if (swipeDistance < 0) {
    showNextPropertyGalleryImage();
  } else {
    showPreviousPropertyGalleryImage();
  }
}


/* =========================================================
   104. INITIALIZE PROPERTY GALLERY SWIPE
========================================================= */

function initializePropertyGallerySwipe() {
  const lightbox =
    propertySelect(
      "#propertyGalleryLightbox"
    );

  if (!lightbox) return;

  lightbox.addEventListener(
    "touchstart",
    (event) => {
      propertyGalleryTouchStartX =
        event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      propertyGalleryTouchEndX =
        event.changedTouches[0].clientX;

      handlePropertyGallerySwipe();
    },
    { passive: true }
  );
}


/* =========================================================
   105. PROPERTY GALLERY STYLES
========================================================= */

function injectPropertyGalleryStyles() {
  if (
    propertySelect(
      "#propertyGalleryStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "propertyGalleryStyles";

  styleElement.textContent = `
    .property-details-main-image,
    .property-gallery-lightbox-image {
      transition:
        opacity 0.2s ease,
        transform 0.35s ease;
    }

    .property-details-main-image {
      cursor: zoom-in;
    }

    .property-details-main-image.is-changing,
    .property-gallery-lightbox-image.is-changing {
      opacity: 0.2;
    }

    .property-gallery-thumbnail {
      position: relative;
      overflow: hidden;
      border: 1px solid
        rgba(16, 17, 17, 0.12);
      border-radius: 14px;
      background: #101111;
      opacity: 0.62;
      transition:
        opacity 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
    }

    .property-gallery-thumbnail:hover,
    .property-gallery-thumbnail.active {
      opacity: 1;
      transform: translateY(-3px);
      border-color: #9b7a42;
    }

    .property-gallery-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .property-gallery-thumbnail-number {
      position: absolute;
      right: 8px;
      bottom: 7px;
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: #ffffff;
      background: rgba(8, 9, 9, 0.72);
      font-size: 7px;
      font-weight: 700;
    }

    .property-gallery-lightbox {
      position: fixed;
      inset: 0;
      z-index: 10030;
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

    .property-gallery-lightbox.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .property-gallery-lightbox-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(5, 6, 6, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .property-gallery-lightbox-dialog {
      position: relative;
      z-index: 2;
      width: min(1120px, 100%);
      transform:
        translateY(24px)
        scale(0.98);
      transition:
        transform 0.45s
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    .property-gallery-lightbox.is-open
    .property-gallery-lightbox-dialog {
      transform:
        translateY(0)
        scale(1);
    }

    .property-gallery-lightbox-figure {
      overflow: hidden;
      border: 1px solid
        rgba(255, 255, 255, 0.14);
      border-radius: 24px;
      background: #101111;
      box-shadow:
        0 35px 100px
        rgba(0, 0, 0, 0.48);
    }

    .property-gallery-lightbox-image {
      width: 100%;
      height: min(72vh, 700px);
            object-fit: cover;
    }

    .property-gallery-lightbox-caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      padding: 20px 24px;

      color: #ffffff;
      background: #101111;
    }

    .property-gallery-lightbox-caption div {
      display: flex;
      flex-direction: column;
    }

    .property-gallery-lightbox-caption small {
      color: #e0c58e;

      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .property-gallery-lightbox-title {
      margin-top: 6px;

      font-family:
        "Cormorant Garamond",
        serif;

      font-size: 25px;
      font-weight: 500;
    }

    .property-gallery-lightbox-counter {
      color:
        rgba(255, 255, 255, 0.52);

      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .property-gallery-lightbox-close,
    .property-gallery-lightbox-control {
      position: absolute;
      z-index: 4;

      display: grid;
      place-items: center;

      width: 48px;
      height: 48px;

      border: 1px solid
        rgba(255, 255, 255, 0.2);
      border-radius: 50%;

      color: #ffffff;
      background:
        rgba(8, 9, 9, 0.72);

      transition:
        transform 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .property-gallery-lightbox-close:hover,
    .property-gallery-lightbox-control:hover {
      background: #c8a96b;
      color: #080909;
    }

    .property-gallery-lightbox-close {
      top: -16px;
      right: -16px;
    }

    .property-gallery-lightbox-previous {
      top: 50%;
      left: -24px;

      transform: translateY(-50%);
    }

    .property-gallery-lightbox-next {
      top: 50%;
      right: -24px;

      transform: translateY(-50%);
    }

    @media (max-width: 767px) {
      .property-gallery-lightbox {
        padding: 14px;
      }

      .property-gallery-lightbox-image {
        height: 62vh;
      }

      .property-gallery-lightbox-caption {
        align-items: flex-start;
        padding: 16px;
      }

      .property-gallery-lightbox-close {
        top: 10px;
        right: 10px;
      }

      .property-gallery-lightbox-control {
        width: 42px;
        height: 42px;
      }

      .property-gallery-lightbox-previous {
        left: 10px;
      }

      .property-gallery-lightbox-next {
        right: 10px;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   106. INITIALIZE PROPERTY GALLERY
========================================================= */

function initializePropertyDetailsGallery(
  property
) {
  if (!property) return;

  injectPropertyGalleryStyles();

  renderPropertyDetailsGallery(
    property
  );

  initializePropertyGalleryNavigation();
  initializePropertyGalleryLightbox();
  initializePropertyGallerySwipe();

  document.addEventListener(
    "keydown",
    handlePropertyGalleryKeyboard
  );
}


/* =========================================================
   107. RUN GALLERY WHEN PROPERTY SELECTED
========================================================= */

document.addEventListener(
  "elvara:property-selected",
  (event) => {
    initializePropertyDetailsGallery(
      event.detail.property
    );
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 3B-1
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 3B-2A
   Related Properties Rendering and Card Controls
========================================================= */


/* =========================================================
   108. RELATED PROPERTY LIMIT
========================================================= */

const relatedPropertyLimit = 3;


/* =========================================================
   109. FIND RELATED PROPERTIES
========================================================= */

/**
 * Return properties related to the selected property.
 *
 * Priority:
 * 1. Same category
 * 2. Same state
 * 3. Featured properties
 * 4. Remaining properties
 *
 * @param {Object} selectedProperty
 * @param {number} limit
 * @returns {Object[]}
 */
function getRelatedProperties(
  selectedProperty,
  limit = relatedPropertyLimit
) {
  if (!selectedProperty) {
    return [];
  }

  const availableProperties =
    ElvaraProperties.properties.filter(
      (property) =>
        property.id !==
        selectedProperty.id
    );

  const scoredProperties =
    availableProperties.map(
      (property) => {
        let score = 0;

        if (
          property.category ===
          selectedProperty.category
        ) {
          score += 5;
        }

        if (
          property.state ===
          selectedProperty.state
        ) {
          score += 3;
        }

        if (
          property.city ===
          selectedProperty.city
        ) {
          score += 2;
        }

        if (property.featured) {
          score += 2;
        }

        if (property.exclusive) {
          score += 1;
        }

        if (property.newListing) {
          score += 1;
        }

        return {
          property,
          score,
        };
      }
    );

  scoredProperties.sort(
    (firstItem, secondItem) => {
      if (
        secondItem.score !==
        firstItem.score
      ) {
        return (
          secondItem.score -
          firstItem.score
        );
      }

      return (
        secondItem.property.price -
        firstItem.property.price
      );
    }
  );

  return scoredProperties
    .slice(0, limit)
    .map((item) => item.property);
}


/* =========================================================
   110. RELATED PROPERTY BADGES
========================================================= */

/**
 * Create compact badge markup.
 *
 * @param {Object} property
 * @returns {string}
 */
function createRelatedPropertyBadges(
  property
) {
  const badges = [];

  if (property.exclusive) {
    badges.push(`
      <span class="related-property-badge related-property-badge-gold">
        Exclusive
      </span>
    `);
  }

  if (property.newListing) {
    badges.push(`
      <span class="related-property-badge">
        New
      </span>
    `);
  }

  if (badges.length === 0) {
    badges.push(`
      <span class="related-property-badge">
        ${escapePropertyHtml(
          property.categoryLabel
        )}
      </span>
    `);
  }

  return badges.join("");
}


/* =========================================================
   111. RELATED PROPERTY PRIMARY SPEC
========================================================= */

/**
 * Return the correct first specification.
 *
 * @param {Object} property
 * @returns {string}
 */
function createRelatedPropertyPrimarySpec(
  property
) {
  if (property.category === "hotel") {
    return `
      <span>
        <i class="fa-solid fa-bed"></i>

        ${formatPropertyNumber(
          property.bedrooms
        )} Suites
      </span>
    `;
  }

  if (
    property.category === "commercial"
  ) {
    return `
      <span>
        <i class="fa-solid fa-building"></i>

        Commercial
      </span>
    `;
  }

  return `
    <span>
      <i class="fa-solid fa-bed"></i>

      ${formatPropertyNumber(
        property.bedrooms
      )} Beds
    </span>
  `;
}


/* =========================================================
   112. RELATED PROPERTY CARD MARKUP
========================================================= */

/**
 * Create one related-property card.
 *
 * @param {Object} property
 * @param {number} index
 * @returns {string}
 */
function createRelatedPropertyCardMarkup(
  property,
  index
) {
  const detailsUrl =
    createPropertyDetailsUrl(property);

  const displayPrice =
    property.displayPrice ||
    formatPropertyPrice(
      property.price
    );

  const displayArea =
    property.areaLabel ||
    formatPropertyArea(
      property.area
    );

  return `
    <article
      class="related-property-card reveal-up"
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
    >

      <a
        href="${escapePropertyHtml(
          detailsUrl
        )}"
        class="related-property-media tilt-card"
        aria-label="View ${escapePropertyHtml(
          property.title
        )}"
      >

        <img
          src="${escapePropertyHtml(
            property.image
          )}"
          alt="${escapePropertyHtml(
            property.title
          )}"
          loading="lazy"
          decoding="async"
        >

        <div class="related-property-overlay"></div>

        <div class="related-property-badges">
          ${createRelatedPropertyBadges(
            property
          )}
        </div>

        <span class="related-property-number">
          ${String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

        <span class="related-property-arrow">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>

      </a>


      <div class="related-property-content">

        <div class="related-property-location">

          <i class="fa-solid fa-location-dot"></i>

          <span>
            ${escapePropertyHtml(
              property.location
            )}
          </span>

        </div>


        <div class="related-property-heading">

          <h3>
            <a href="${escapePropertyHtml(
              detailsUrl
            )}">
              ${escapePropertyHtml(
                property.title
              )}
            </a>
          </h3>

          <strong>
            ${escapePropertyHtml(
              displayPrice
            )}
          </strong>

        </div>


        <div class="related-property-specifications">

          ${createRelatedPropertyPrimarySpec(
            property
          )}

          <span>
            <i class="fa-solid fa-bath"></i>

            ${formatPropertyNumber(
              property.bathrooms
            )}
            ${
              property.category ===
              "commercial"
                ? "Facilities"
                : "Baths"
            }
          </span>

          <span>
            <i class="fa-solid fa-ruler-combined"></i>

            ${escapePropertyHtml(
              displayArea
            )}
          </span>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   113. RENDER RELATED PROPERTIES
========================================================= */

/**
 * Render related properties for the selected property.
 *
 * @param {Object} selectedProperty
 */
function renderRelatedProperties(
  selectedProperty
) {
  if (!relatedPropertiesGrid) {
    return;
  }

  const relatedProperties =
    getRelatedProperties(
      selectedProperty
    );

  if (relatedProperties.length === 0) {
    relatedPropertiesGrid.innerHTML = `
      <div class="related-properties-empty">

        <i class="fa-regular fa-building"></i>

        <h3>
          More properties coming soon
        </h3>

        <p>
          New Élvara opportunities will appear here.
        </p>

      </div>
    `;

    return;
  }

  relatedPropertiesGrid.innerHTML =
    relatedProperties
      .map(
        createRelatedPropertyCardMarkup
      )
      .join("");

  initializeRelatedPropertyCards();
}


/* =========================================================
   114. RELATED CARD REVEAL
========================================================= */

function revealRelatedPropertyCards() {
  if (!relatedPropertiesGrid) {
    return;
  }

  const relatedCards =
    propertySelectAll(
      ".related-property-card",
      relatedPropertiesGrid
    );

  if (relatedCards.length === 0) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    relatedCards.forEach((card) => {
      card.classList.add(
        "is-visible"
      );
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries, cardObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          cardObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px",
      }
    );

  relatedCards.forEach(
    (card, index) => {
      card.style.transitionDelay =
        `${index * 90}ms`;

      observer.observe(card);
    }
  );
}


/* =========================================================
   115. RELATED CARD INTERACTIONS
========================================================= */

function initializeRelatedPropertyCards() {
  revealRelatedPropertyCards();

  if (
    typeof initializeTiltCards ===
    "function"
  ) {
    initializeTiltCards();
  }

  if (
    typeof initializePropertyDepthEffects ===
    "function"
  ) {
    initializePropertyDepthEffects();
  }

  if (
    typeof prepareInternalPageLinks ===
    "function"
  ) {
    prepareInternalPageLinks();
  }
}


/* =========================================================
   116. RELATED PROPERTIES STYLES
========================================================= */

function injectRelatedPropertyStyles() {
  if (
    propertySelect(
      "#relatedPropertyStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "relatedPropertyStyles";

  styleElement.textContent = `
    .related-properties-grid {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 22px;
    }

    .related-property-card {
      overflow: hidden;
      border: 1px solid
        rgba(16, 17, 17, 0.1);
      border-radius: 18px;
      background: #ffffff;
      box-shadow:
        0 16px 46px
        rgba(16, 17, 17, 0.08);
      transition:
        transform 0.4s ease,
        box-shadow 0.4s ease;
    }

    .related-property-card:hover {
      transform: translateY(-7px);
      box-shadow:
        0 28px 68px
        rgba(16, 17, 17, 0.14);
    }

    .related-property-media {
      position: relative;
      display: block;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #101111;
    }

    .related-property-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition:
        transform 0.9s
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    .related-property-card:hover
    .related-property-media img {
      transform: scale(1.075);
    }

    .related-property-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          180deg,
          rgba(8, 9, 9, 0.06),
          rgba(8, 9, 9, 0.12) 48%,
          rgba(8, 9, 9, 0.68)
        );
    }

    .related-property-badges {
      position: absolute;
      top: 16px;
      left: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }

    .related-property-badge {
      display: inline-flex;
      align-items: center;
      min-height: 29px;
      padding: 6px 11px;
      border: 1px solid
        rgba(255, 255, 255, 0.22);
      border-radius: 999px;
      background:
        rgba(8, 9, 9, 0.38);
      color: #ffffff;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .related-property-badge-gold {
      border-color: transparent;
      background: #c8a96b;
      color: #080909;
    }

    .related-property-number {
      position: absolute;
      top: 17px;
      right: 17px;
      color:
        rgba(255, 255, 255, 0.72);
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 21px;
    }

    .related-property-arrow {
      position: absolute;
      right: 17px;
      bottom: 17px;
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      background:
        rgba(255, 255, 255, 0.92);
      color: #101111;
      transition:
        transform 0.4s ease,
        background-color 0.25s ease;
    }

    .related-property-card:hover
    .related-property-arrow {
      transform: rotate(-35deg);
      background: #c8a96b;
    }

    .related-property-content {
      padding: 23px 21px 24px;
    }

    .related-property-location {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
      color: #9b7a42;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .related-property-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 21px;
    }

    .related-property-heading h3 {
      max-width: 230px;
      color: #101111;
      font-size: 28px;
      line-height: 1.04;
    }

    .related-property-heading strong {
      flex-shrink: 0;
      color: #9b7a42;
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 19px;
      font-weight: 600;
    }

    .related-property-specifications {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding-top: 17px;
      border-top: 1px solid
        rgba(16, 17, 17, 0.1);
    }

    .related-property-specifications span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #74746e;
      font-size: 8px;
      font-weight: 600;
    }

    .related-property-specifications i {
      color: #9b7a42;
    }

    .related-properties-empty {
      grid-column: 1 / -1;
      padding: 54px 24px;
      border: 1px solid
        rgba(16, 17, 17, 0.1);
      border-radius: 20px;
      background: #ffffff;
      text-align: center;
    }

    .related-properties-empty i {
      margin-bottom: 18px;
      color: #9b7a42;
      font-size: 34px;
    }

    .related-properties-empty h3 {
      color: #101111;
      font-size: 30px;
    }

    .related-properties-empty p {
      margin-top: 10px;
      color: #74746e;
      font-size: 12px;
    }

    @media (max-width: 991px) {
      .related-properties-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }

      .related-property-card:last-child {
        grid-column: span 2;
      }

      .related-property-card:last-child
      .related-property-media {
        aspect-ratio: 16 / 7;
      }
    }

    @media (max-width: 767px) {
      .related-properties-grid {
        grid-template-columns: 1fr;
      }

      .related-property-card:last-child {
        grid-column: auto;
      }

      .related-property-card:last-child
      .related-property-media {
        aspect-ratio: 4 / 3;
      }

      .related-property-heading {
        flex-direction: column;
        gap: 9px;
      }

      .related-property-heading strong {
        align-self: flex-start;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   117. RUN RELATED PROPERTIES
========================================================= */

document.addEventListener(
  "elvara:property-selected",
  (event) => {
    injectRelatedPropertyStyles();

    renderRelatedProperties(
      event.detail.property
    );
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 3B-2A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 3B-2B
   Detail Video Controls and Final Details Initialization
========================================================= */


/* =========================================================
   118. DETAIL VIDEO CONTROL ELEMENTS
========================================================= */

const propertyDetailsVideoControl =
  propertySelect(
    "#propertyDetailsVideoControl"
  );

const propertyDetailsSoundControl =
  propertySelect(
    "#propertyDetailsSoundControl"
  );


/* =========================================================
   119. DETAIL VIDEO PLAYBACK INTERFACE
========================================================= */

function updatePropertyDetailsVideoInterface() {
  if (
    !propertyDetailsVideo ||
    !propertyDetailsVideoControl
  ) {
    return;
  }

  const isPlaying =
    !propertyDetailsVideo.paused &&
    !propertyDetailsVideo.ended;

  const icon =
    propertySelect(
      "i",
      propertyDetailsVideoControl
    );

  const label =
    propertySelect(
      ".property-details-video-control-label",
      propertyDetailsVideoControl
    );

  propertyDetailsVideoControl.classList.toggle(
    "is-playing",
    isPlaying
  );

  propertyDetailsVideoControl.setAttribute(
    "aria-pressed",
    String(isPlaying)
  );

  propertyDetailsVideoControl.setAttribute(
    "aria-label",
    isPlaying
      ? "Pause property film"
      : "Play property film"
  );

  if (icon) {
    icon.className =
      isPlaying
        ? "fa-solid fa-pause"
        : "fa-solid fa-play";
  }

  if (label) {
    label.textContent =
      isPlaying
        ? "Pause Film"
        : "Play Film";
  }
}


/* =========================================================
   120. TOGGLE DETAIL VIDEO
========================================================= */

async function togglePropertyDetailsVideo() {
  if (!propertyDetailsVideo) {
    return;
  }

  if (
    propertyDetailsVideo.paused ||
    propertyDetailsVideo.ended
  ) {
    if (
      typeof safelyPlayVideo ===
      "function"
    ) {
      await safelyPlayVideo(
        propertyDetailsVideo
      );
    } else {
      try {
        await propertyDetailsVideo.play();
      } catch (error) {
        return;
      }
    }
  } else {
    propertyDetailsVideo.pause();
  }

  updatePropertyDetailsVideoInterface();
}


/* =========================================================
   121. DETAIL VIDEO SOUND INTERFACE
========================================================= */

function updatePropertyDetailsSoundInterface() {
  if (
    !propertyDetailsVideo ||
    !propertyDetailsSoundControl
  ) {
    return;
  }

  const isMuted =
    propertyDetailsVideo.muted;

  const icon =
    propertySelect(
      "i",
      propertyDetailsSoundControl
    );

  const label =
    propertySelect(
      ".property-details-sound-control-label",
      propertyDetailsSoundControl
    );

  propertyDetailsSoundControl.classList.toggle(
    "is-active",
    !isMuted
  );

  propertyDetailsSoundControl.setAttribute(
    "aria-pressed",
    String(!isMuted)
  );

  propertyDetailsSoundControl.setAttribute(
    "aria-label",
    isMuted
      ? "Enable property video sound"
      : "Mute property video sound"
  );

  if (icon) {
    icon.className =
      isMuted
        ? "fa-solid fa-volume-xmark"
        : "fa-solid fa-volume-high";
  }

  if (label) {
    label.textContent =
      isMuted
        ? "Sound Off"
        : "Sound On";
  }
}


/* =========================================================
   122. TOGGLE DETAIL VIDEO SOUND
========================================================= */

async function togglePropertyDetailsSound() {
  if (!propertyDetailsVideo) {
    return;
  }

  propertyDetailsVideo.muted =
    !propertyDetailsVideo.muted;

  propertyDetailsVideo.defaultMuted =
    propertyDetailsVideo.muted;

  if (!propertyDetailsVideo.muted) {
    if (
      typeof safelyPlayVideo ===
      "function"
    ) {
      const playbackStarted =
        await safelyPlayVideo(
          propertyDetailsVideo
        );

      if (!playbackStarted) {
        propertyDetailsVideo.muted =
          true;

        propertyDetailsVideo.defaultMuted =
          true;
      }
    }
  }

  updatePropertyDetailsSoundInterface();
}


/* =========================================================
   123. INITIALIZE DETAIL VIDEO CONTROLS
========================================================= */

let propertyDetailsVideoControlsInitialized =
  false;


function initializePropertyDetailsVideoControls() {
  if (
    !propertyDetailsVideo ||
    propertyDetailsVideoControlsInitialized
  ) {
    return;
  }

  propertyDetailsVideoControlsInitialized =
    true;

  propertyDetailsVideo.muted = true;
  propertyDetailsVideo.defaultMuted =
    true;
  propertyDetailsVideo.playsInline =
    true;

  updatePropertyDetailsVideoInterface();
  updatePropertyDetailsSoundInterface();

  propertyDetailsVideoControl?.addEventListener(
    "click",
    togglePropertyDetailsVideo
  );

  propertyDetailsSoundControl?.addEventListener(
    "click",
    togglePropertyDetailsSound
  );

  propertyDetailsVideo.addEventListener(
    "play",
    updatePropertyDetailsVideoInterface
  );

  propertyDetailsVideo.addEventListener(
    "pause",
    updatePropertyDetailsVideoInterface
  );

  propertyDetailsVideo.addEventListener(
    "ended",
    updatePropertyDetailsVideoInterface
  );

  propertyDetailsVideo.addEventListener(
    "volumechange",
    updatePropertyDetailsSoundInterface
  );
}


/* =========================================================
   124. DUPLICATE GALLERY INITIALIZATION PROTECTION
========================================================= */

let propertyGalleryNavigationInitialized =
  false;

let propertyGalleryLightboxInitialized =
  false;

let propertyGallerySwipeInitialized =
  false;

let propertyGalleryKeyboardInitialized =
  false;


/*
   These wrappers prevent duplicate listeners if a property
   is dynamically selected again on the same page.
*/

function initializePropertyGalleryNavigationOnce() {
  if (propertyGalleryNavigationInitialized) {
    return;
  }

  propertyGalleryNavigationInitialized =
    true;

  initializePropertyGalleryNavigation();
}


function initializePropertyGalleryLightboxOnce() {
  if (propertyGalleryLightboxInitialized) {
    return;
  }

  propertyGalleryLightboxInitialized =
    true;

  initializePropertyGalleryLightbox();
}


function initializePropertyGallerySwipeOnce() {
  if (propertyGallerySwipeInitialized) {
    return;
  }

  propertyGallerySwipeInitialized =
    true;

  initializePropertyGallerySwipe();
}


function initializePropertyGalleryKeyboardOnce() {
  if (propertyGalleryKeyboardInitialized) {
    return;
  }

  propertyGalleryKeyboardInitialized =
    true;

  document.addEventListener(
    "keydown",
    handlePropertyGalleryKeyboard
  );
}


/* =========================================================
   125. SAFE DETAILS GALLERY REFRESH
========================================================= */

function refreshPropertyDetailsGallery(
  property
) {
  if (!property) return;

  injectPropertyGalleryStyles();

  renderPropertyDetailsGallery(
    property
  );

  initializePropertyGalleryNavigationOnce();
  initializePropertyGalleryLightboxOnce();
  initializePropertyGallerySwipeOnce();
  initializePropertyGalleryKeyboardOnce();
}


/* =========================================================
   126. DETAILS PAGE SCROLL REVEAL REFRESH
========================================================= */

function refreshPropertyDetailsAnimations() {
  if (
    typeof initializeScrollReveal ===
    "function"
  ) {
    initializeScrollReveal();
  }

  if (
    typeof initializeTiltCards ===
    "function"
  ) {
    initializeTiltCards();
  }

  if (
    typeof initializePropertyDepthEffects ===
    "function"
  ) {
    initializePropertyDepthEffects();
  }

  if (
    typeof prepareInternalPageLinks ===
    "function"
  ) {
    prepareInternalPageLinks();
  }
}


/* =========================================================
   127. RELATED PROPERTY LINK STATE
========================================================= */

function markSelectedRelatedProperty() {
  if (!relatedPropertiesGrid) {
    return;
  }

  propertySelectAll(
    ".related-property-card",
    relatedPropertiesGrid
  ).forEach((card) => {
    const isSelected =
      card.dataset.propertyId ===
      ElvaraProperties.selectedPropertyId;

    card.classList.toggle(
      "is-selected",
      isSelected
    );
  });
}


/* =========================================================
   128. PROPERTY DETAILS READY EVENT
========================================================= */

function dispatchPropertyDetailsReady(
  property
) {
  document.dispatchEvent(
    new CustomEvent(
      "elvara:property-details-ready",
      {
        detail: {
          property: {
            ...property,

            gallery: Array.isArray(
              property.gallery
            )
              ? [...property.gallery]
              : [],

            amenities: Array.isArray(
              property.amenities
            )
              ? [...property.amenities]
              : [],
          },
        },
      }
    )
  );
}


/* =========================================================
   129. COMPLETE DETAILS PAGE RENDER
========================================================= */

function renderCompletePropertyDetails(
  property
) {
  if (
    !property ||
    !isPropertyDetailsPage()
  ) {
    return;
  }

  ElvaraProperties.selectedPropertyId =
    property.id;

  updatePropertyDetailsDocumentTitle(
    property
  );

  updatePropertyDetailsVideo(
    property
  );

  updatePropertyDetailsPoster(
    property
  );

  updatePropertyDetailsText(
    property
  );

  renderPropertyDetailsSpecifications(
    property
  );

  renderPropertyDetailsAmenities(
    property
  );

  updatePropertyContactLinks(
    property
  );

  refreshPropertyDetailsGallery(
    property
  );

  injectRelatedPropertyStyles();

  renderRelatedProperties(
    property
  );

  initializePropertyDetailsVideoControls();

  refreshPropertyDetailsAnimations();
  markSelectedRelatedProperty();

  dispatchPropertyDetailsReady(
    property
  );
}


/* =========================================================
   130. FINAL DETAILS INITIALIZATION GUARD
========================================================= */

let completePropertyDetailsInitialized =
  false;


function initializeCompletePropertyDetails() {
  if (
    completePropertyDetailsInitialized ||
    !isPropertyDetailsPage()
  ) {
    return;
  }

  const selectedProperty =
    getSelectedPropertyFromUrl();

  if (!selectedProperty) {
    showPropertyDetailsNotFound();
    return;
  }

  completePropertyDetailsInitialized =
    true;

  hidePropertyDetailsNotFound();

  renderCompletePropertyDetails(
    selectedProperty
  );
}


/* =========================================================
   131. PROPERTY SELECTED EVENT ENHANCEMENT
========================================================= */

document.addEventListener(
  "elvara:property-selected",
  (event) => {
    const property =
      event.detail?.property;

    if (!property) return;

    /*
     The base renderer from Part 3A already updates
     the main property content. These calls complete
     the gallery, related cards and video controls.
    */

    refreshPropertyDetailsGallery(
      property
    );

    injectRelatedPropertyStyles();

    renderRelatedProperties(
      property
    );

    initializePropertyDetailsVideoControls();

    refreshPropertyDetailsAnimations();

    dispatchPropertyDetailsReady(
      property
    );
  }
);


/* =========================================================
   132. INITIALIZE AFTER PROPERTY DATA
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializeCompletePropertyDetails();
  },
  { once: true }
);


/* =========================================================
   133. DETAILS PAGE FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0 &&
    isPropertyDetailsPage()
  ) {
    initializeCompletePropertyDetails();
  }
});


/* =========================================================
   134. DETAILS PAGE VIDEO VISIBILITY
========================================================= */

function initializePropertyDetailsVideoVisibility() {
  if (
    !propertyDetailsVideo ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const videoObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !(entry.target instanceof
              HTMLVideoElement)
          ) {
            return;
          }

          if (!entry.isIntersecting) {
            entry.target.pause();
            return;
          }

          if (
            entry.target.dataset
              .wasPlaying === "true"
          ) {
            if (
              typeof safelyPlayVideo ===
              "function"
            ) {
              safelyPlayVideo(
                entry.target
              );
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "100px 0px",
      }
    );

  propertyDetailsVideo.addEventListener(
    "pause",
    () => {
      propertyDetailsVideo.dataset.wasPlaying =
        "false";
    }
  );

  propertyDetailsVideo.addEventListener(
    "play",
    () => {
      propertyDetailsVideo.dataset.wasPlaying =
        "true";
    }
  );

  videoObserver.observe(
    propertyDetailsVideo
  );
}


/* =========================================================
   135. RUN VIDEO VISIBILITY HANDLING
========================================================= */

propertyDocumentReady(() => {
  initializePropertyDetailsVideoVisibility();
});


/* =========================================================
   END OF PROPERTIES.JS — PART 3B-2B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4A
   Favorites System and Local Storage
========================================================= */


/* =========================================================
   136. PROPERTY STORAGE KEYS
========================================================= */

const propertyFavoritesStorageKey =
  "elvara-property-favorites";

const propertyCompareStorageKey =
  "elvara-property-comparison";

const propertyRecentlyViewedStorageKey =
  "elvara-recently-viewed";


/* =========================================================
   137. SAFE PROPERTY STORAGE READ
========================================================= */

/**
 * Read and parse a stored property array safely.
 *
 * @param {string} storageKey
 * @returns {string[]}
 */
function readStoredPropertyIds(
  storageKey
) {
  try {
    const storedValue =
      window.localStorage.getItem(
        storageKey
      );

    if (!storedValue) {
      return [];
    }

    const parsedValue =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(
        (propertyId) =>
          typeof propertyId ===
          "string"
      )
      .filter(
        (propertyId, index, array) =>
          array.indexOf(propertyId) ===
          index
      );
  } catch (error) {
    return [];
  }
}


/* =========================================================
   138. SAFE PROPERTY STORAGE WRITE
========================================================= */

/**
 * Save a property-ID collection safely.
 *
 * @param {string} storageKey
 * @param {Iterable<string>} propertyIds
 */
function saveStoredPropertyIds(
  storageKey,
  propertyIds
) {
  try {
    const safeIds =
      Array.from(propertyIds)
        .filter(
          (propertyId) =>
            typeof propertyId ===
            "string"
        )
        .filter(
          (propertyId) =>
            Boolean(
              findPropertyById(propertyId)
            )
        );

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(safeIds)
    );
  } catch (error) {
    /*
     Some browsers can block local storage.
     The page will continue without persistence.
    */
  }
}


/* =========================================================
   139. LOAD SAVED FAVORITES
========================================================= */

function loadSavedPropertyFavorites() {
  const favoriteIds =
    readStoredPropertyIds(
      propertyFavoritesStorageKey
    );

  ElvaraProperties.favorites =
    new Set(
      favoriteIds.filter(
        (propertyId) =>
          Boolean(
            findPropertyById(propertyId)
          )
      )
    );
}


/* =========================================================
   140. SAVE FAVORITES
========================================================= */

function savePropertyFavorites() {
  saveStoredPropertyIds(
    propertyFavoritesStorageKey,
    ElvaraProperties.favorites
  );
}


/* =========================================================
   141. CHECK FAVORITE STATUS
========================================================= */

/**
 * Check whether a property is saved.
 *
 * @param {string} propertyId
 * @returns {boolean}
 */
function isPropertyFavorite(
  propertyId
) {
  return ElvaraProperties.favorites.has(
    propertyId
  );
}


/* =========================================================
   142. FAVORITE BUTTON LABEL
========================================================= */

function getFavoriteButtonLabel(
  propertyId
) {
  const property =
    findPropertyById(propertyId);

  const propertyName =
    property?.title ||
    "property";

  return isPropertyFavorite(propertyId)
    ? `Remove ${propertyName} from favorites`
    : `Save ${propertyName} to favorites`;
}


/* =========================================================
   143. UPDATE ONE FAVORITE BUTTON
========================================================= */

/**
 * Update one favorite button interface.
 *
 * @param {HTMLButtonElement} button
 */
function updateFavoriteButton(
  button
) {
  if (!button) return;

  const propertyId =
    button.dataset.propertyId;

  if (!propertyId) return;

  const isFavorite =
    isPropertyFavorite(propertyId);

  const icon =
    propertySelect("i", button);

  const label =
    propertySelect(
      ".favorite-button-label",
      button
    );

  button.classList.toggle(
    "is-favorite",
    isFavorite
  );

  button.setAttribute(
    "aria-pressed",
    String(isFavorite)
  );

  button.setAttribute(
    "aria-label",
    getFavoriteButtonLabel(
      propertyId
    )
  );

  if (icon) {
    icon.className =
      isFavorite
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";
  }

  if (label) {
    label.textContent =
      isFavorite
        ? "Saved"
        : "Save";
  }
}


/* =========================================================
   144. UPDATE ALL FAVORITE BUTTONS
========================================================= */

function updateAllFavoriteButtons() {
  propertySelectAll(
    "[data-favorite-button]"
  ).forEach((button) => {
    updateFavoriteButton(button);
  });

  updateFavoritesCounter();
}


/* =========================================================
   145. FAVORITES COUNTER
========================================================= */

function updateFavoritesCounter() {
  const favoriteCounters =
    propertySelectAll(
      "[data-favorites-count]"
    );

  const favoriteCount =
    ElvaraProperties.favorites.size;

  favoriteCounters.forEach(
    (counter) => {
      counter.textContent =
        formatPropertyNumber(
          favoriteCount
        );

      counter.setAttribute(
        "aria-label",
        `${favoriteCount} saved properties`
      );

      counter.hidden =
        favoriteCount === 0;
    }
  );
}


/* =========================================================
   146. FAVORITE CHANGE EVENT
========================================================= */

function dispatchFavoriteChangeEvent(
  propertyId,
  isFavorite
) {
  const property =
    findPropertyById(propertyId);

  document.dispatchEvent(
    new CustomEvent(
      "elvara:favorite-change",
      {
        detail: {
          propertyId,
          isFavorite,
          property: property
            ? {
                ...property,
                gallery: [
                  ...property.gallery,
                ],
                amenities: [
                  ...property.amenities,
                ],
              }
            : null,

          favorites:
            Array.from(
              ElvaraProperties.favorites
            ),
        },
      }
    )
  );
}


/* =========================================================
   147. FAVORITE FEEDBACK MESSAGE
========================================================= */

function showFavoriteFeedback(
  property,
  isFavorite
) {
  if (!property) return;

  let messageElement =
    propertySelect(
      "#propertyActionFeedback"
    );

  if (!messageElement) {
    messageElement =
      document.createElement("div");

    messageElement.id =
      "propertyActionFeedback";

    messageElement.className =
      "property-action-feedback";

    messageElement.setAttribute(
      "role",
      "status"
    );

    messageElement.setAttribute(
      "aria-live",
      "polite"
    );

    document.body.appendChild(
      messageElement
    );
  }

  messageElement.innerHTML = `
    <span class="property-action-feedback-icon">

      <i class="${
        isFavorite
          ? "fa-solid fa-heart"
          : "fa-regular fa-heart"
      }"></i>

    </span>

    <span>
      ${escapePropertyHtml(
        property.title
      )}

      ${
        isFavorite
          ? "was added to your favorites."
          : "was removed from your favorites."
      }
    </span>
  `;

  messageElement.classList.add(
    "is-visible"
  );

  window.clearTimeout(
    messageElement.hideTimer
  );

  messageElement.hideTimer =
    window.setTimeout(() => {
      messageElement.classList.remove(
        "is-visible"
      );
    }, 2800);
}


/* =========================================================
   148. TOGGLE PROPERTY FAVORITE
========================================================= */

/**
 * Add or remove one favorite.
 *
 * @param {string} propertyId
 * @returns {boolean}
 */
function togglePropertyFavorite(
  propertyId
) {
  const property =
    findPropertyById(propertyId);

  if (!property) {
    return false;
  }

  let isFavorite;

  if (
    ElvaraProperties.favorites.has(
      propertyId
    )
  ) {
    ElvaraProperties.favorites.delete(
      propertyId
    );

    isFavorite = false;
  } else {
    ElvaraProperties.favorites.add(
      propertyId
    );

    isFavorite = true;
  }

  savePropertyFavorites();
  updateAllFavoriteButtons();

  showFavoriteFeedback(
    property,
    isFavorite
  );

  dispatchFavoriteChangeEvent(
    propertyId,
    isFavorite
  );

  return isFavorite;
}


/* =========================================================
   149. FAVORITE BUTTON EVENT
========================================================= */

function handleFavoriteButtonClick(
  event
) {
  const favoriteButton =
    event.target.closest(
      "[data-favorite-button]"
    );

  if (!favoriteButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const propertyId =
    favoriteButton.dataset.propertyId;

  if (!propertyId) return;

  togglePropertyFavorite(
    propertyId
  );
}


/* =========================================================
   150. CREATE FAVORITE BUTTON MARKUP
========================================================= */

/**
 * Create a reusable favorite button.
 *
 * @param {Object} property
 * @param {"icon"|"label"} displayType
 * @returns {string}
 */
function createFavoriteButtonMarkup(
  property,
  displayType = "icon"
) {
  const isFavorite =
    isPropertyFavorite(property.id);

  if (displayType === "label") {
    return `
      <button
        class="property-favorite-button property-favorite-button-label${
          isFavorite
            ? " is-favorite"
            : ""
        }"
        type="button"
        data-favorite-button
        data-property-id="${escapePropertyHtml(
          property.id
        )}"
        aria-pressed="${String(
          isFavorite
        )}"
        aria-label="${escapePropertyHtml(
          getFavoriteButtonLabel(
            property.id
          )
        )}"
      >

        <i class="${
          isFavorite
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart"
        }"></i>

        <span class="favorite-button-label">
          ${
            isFavorite
              ? "Saved"
              : "Save"
          }
        </span>

      </button>
    `;
  }

  return `
    <button
      class="property-favorite-button property-favorite-button-icon${
        isFavorite
          ? " is-favorite"
          : ""
      }"
      type="button"
      data-favorite-button
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
      aria-pressed="${String(
        isFavorite
      )}"
      aria-label="${escapePropertyHtml(
        getFavoriteButtonLabel(
          property.id
        )
      )}"
    >

      <i class="${
        isFavorite
          ? "fa-solid fa-heart"
          : "fa-regular fa-heart"
      }"></i>

    </button>
  `;
}


/* =========================================================
   151. ADD FAVORITE BUTTONS TO LISTING CARDS
========================================================= */

function addFavoriteButtonsToListingCards() {
  propertySelectAll(
    ".listing-property-card"
  ).forEach((card) => {
    const propertyId =
      card.dataset.propertyId;

    const property =
      findPropertyById(propertyId);

    if (!property) return;

    const media =
      propertySelect(
        ".listing-property-media",
        card
      );

    if (
      !media ||
      propertySelect(
        "[data-favorite-button]",
        media
      )
    ) {
      return;
    }

    media.insertAdjacentHTML(
      "beforeend",
      createFavoriteButtonMarkup(
        property,
        "icon"
      )
    );
  });

  updateAllFavoriteButtons();
}


/* =========================================================
   152. ADD FAVORITE BUTTONS TO RELATED CARDS
========================================================= */

function addFavoriteButtonsToRelatedCards() {
  propertySelectAll(
    ".related-property-card"
  ).forEach((card) => {
    const propertyId =
      card.dataset.propertyId;

    const property =
      findPropertyById(propertyId);

    if (!property) return;

    const media =
      propertySelect(
        ".related-property-media",
        card
      );

    if (
      !media ||
      propertySelect(
        "[data-favorite-button]",
        media
      )
    ) {
      return;
    }

    media.insertAdjacentHTML(
      "beforeend",
      createFavoriteButtonMarkup(
        property,
        "icon"
      )
    );
  });

  updateAllFavoriteButtons();
}


/* =========================================================
   153. DETAILS PAGE FAVORITE BUTTON
========================================================= */

function renderPropertyDetailsFavoriteButton(
  property
) {
  const favoriteButtonContainer =
    propertySelect(
      "#propertyDetailsFavorite"
    );

  if (
    !favoriteButtonContainer ||
    !property
  ) {
    return;
  }

  favoriteButtonContainer.innerHTML =
    createFavoriteButtonMarkup(
      property,
      "label"
    );

  updateAllFavoriteButtons();
}


/* =========================================================
   154. FAVORITE BUTTON STYLES
========================================================= */

function injectPropertyFavoriteStyles() {
  if (
    propertySelect(
      "#propertyFavoriteStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "propertyFavoriteStyles";

  styleElement.textContent = `
    .property-favorite-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid
        rgba(255, 255, 255, 0.24);
      border-radius: 999px;

      background:
        rgba(8, 9, 9, 0.58);
      color: #ffffff;

      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);

      transition:
        transform 0.25s ease,
        background-color 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease;
    }

    .property-favorite-button:hover {
      transform: translateY(-3px);

      border-color: #c8a96b;
      background: #c8a96b;
      color: #080909;
    }

    .property-favorite-button.is-favorite {
      border-color: #c8a96b;
      background: #c8a96b;
      color: #080909;
    }

    .property-favorite-button-icon {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 5;

      width: 42px;
      height: 42px;

      font-size: 14px;
    }

    .listing-property-number,
    .related-property-number {
      right: 69px;
    }

    .property-favorite-button-label {
      min-height: 52px;
      gap: 10px;

      padding-inline: 20px;

      border-color:
        rgba(16, 17, 17, 0.15);

      background: #ffffff;
      color: #101111;

      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .property-favorite-button-label:hover,
    .property-favorite-button-label.is-favorite {
      background: #c8a96b;
      color: #080909;
    }

    .property-action-feedback {
      position: fixed;
      left: 50%;
      bottom: 28px;
      z-index: 10050;

      display: flex;
      align-items: center;
      gap: 12px;

      width: min(
        calc(100% - 32px),
        460px
      );

      padding: 14px 18px;

      opacity: 0;
      visibility: hidden;

      transform:
        translate(-50%, 18px);

      border: 1px solid
        rgba(255, 255, 255, 0.15);
      border-radius: 999px;

      background:
        rgba(8, 9, 9, 0.94);
      color: #ffffff;

      box-shadow:
        0 20px 55px
        rgba(0, 0, 0, 0.28);

      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);

      font-size: 10px;
      line-height: 1.5;

      transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        transform 0.3s ease;
    }

    .property-action-feedback.is-visible {
      opacity: 1;
      visibility: visible;

      transform:
        translate(-50%, 0);
    }

    .property-action-feedback-icon {
      display: grid;
      place-items: center;

      width: 34px;
      height: 34px;

      flex-shrink: 0;

      border-radius: 50%;

      background: #c8a96b;
      color: #080909;
    }

    @media (max-width: 767px) {
      .property-favorite-button-icon {
        top: 13px;
        right: 13px;

        width: 39px;
        height: 39px;
      }

      .listing-property-number,
      .related-property-number {
        right: 61px;
      }

      .property-action-feedback {
        bottom: 16px;

        border-radius: 18px;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   155. INITIALIZE FAVORITE SYSTEM
========================================================= */

function initializePropertyFavoriteSystem() {
  injectPropertyFavoriteStyles();
  loadSavedPropertyFavorites();

  document.addEventListener(
    "click",
    handleFavoriteButtonClick
  );

  addFavoriteButtonsToListingCards();
  addFavoriteButtonsToRelatedCards();

  const selectedProperty =
    findPropertyById(
      ElvaraProperties.selectedPropertyId
    );

  if (selectedProperty) {
    renderPropertyDetailsFavoriteButton(
      selectedProperty
    );
  }

  updateAllFavoriteButtons();
}


/* =========================================================
   156. REFRESH FAVORITES AFTER DYNAMIC RENDER
========================================================= */

document.addEventListener(
  "elvara:property-results",
  () => {
    addFavoriteButtonsToListingCards();
  }
);


document.addEventListener(
  "elvara:property-details-ready",
  (event) => {
    const property =
      event.detail?.property;

    if (!property) return;

    renderPropertyDetailsFavoriteButton(
      property
    );

    addFavoriteButtonsToRelatedCards();
  }
);


/* =========================================================
   157. RUN FAVORITE SYSTEM
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializePropertyFavoriteSystem();
  },
  { once: true }
);


/* =========================================================
   FAVORITE SYSTEM FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializePropertyFavoriteSystem();
  }
});


/* =========================================================
   END OF PROPERTIES.JS — PART 4A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-1A
   Comparison State, Storage and Button Interface
========================================================= */


/* =========================================================
   158. COMPARISON SETTINGS
========================================================= */

const maximumComparedProperties = 3;

let propertyComparisonInitialized =
  false;


/* =========================================================
   159. LOAD SAVED COMPARISON
========================================================= */

function loadSavedPropertyComparison() {
  const comparedPropertyIds =
    readStoredPropertyIds(
      propertyCompareStorageKey
    );

  ElvaraProperties.comparison =
    new Set(
      comparedPropertyIds
        .filter((propertyId) =>
          Boolean(
            findPropertyById(propertyId)
          )
        )
        .slice(
          0,
          maximumComparedProperties
        )
    );
}


/* =========================================================
   160. SAVE COMPARISON
========================================================= */

function savePropertyComparison() {
  saveStoredPropertyIds(
    propertyCompareStorageKey,
    ElvaraProperties.comparison
  );
}


/* =========================================================
   161. CHECK COMPARISON STATUS
========================================================= */

/**
 * Check whether a property is selected
 * for comparison.
 *
 * @param {string} propertyId
 * @returns {boolean}
 */
function isPropertyCompared(
  propertyId
) {
  return ElvaraProperties.comparison.has(
    propertyId
  );
}


/* =========================================================
   162. COMPARISON BUTTON LABEL
========================================================= */

/**
 * Create the accessible label for a
 * property comparison button.
 *
 * @param {string} propertyId
 * @returns {string}
 */
function getComparisonButtonLabel(
  propertyId
) {
  const property =
    findPropertyById(propertyId);

  const propertyName =
    property?.title ||
    "property";

  return isPropertyCompared(propertyId)
    ? `Remove ${propertyName} from comparison`
    : `Add ${propertyName} to comparison`;
}


/* =========================================================
   163. UPDATE ONE COMPARE BUTTON
========================================================= */

/**
 * Update one comparison button's appearance,
 * icon, label and accessibility state.
 *
 * @param {HTMLButtonElement} button
 */
function updateComparisonButton(button) {
  if (!button) return;

  const propertyId =
    button.dataset.propertyId;

  if (!propertyId) return;

  const isCompared =
    isPropertyCompared(propertyId);

  const icon =
    propertySelect(
      "i",
      button
    );

  const label =
    propertySelect(
      ".compare-button-label",
      button
    );

  button.classList.toggle(
    "is-compared",
    isCompared
  );

  button.setAttribute(
    "aria-pressed",
    String(isCompared)
  );

  button.setAttribute(
    "aria-label",
    getComparisonButtonLabel(
      propertyId
    )
  );

  if (icon) {
    icon.className =
      isCompared
        ? "fa-solid fa-code-compare"
        : "fa-solid fa-plus";
  }

  if (label) {
    label.textContent =
      isCompared
        ? "Added"
        : "Compare";
  }
}


/* =========================================================
   164. UPDATE ALL COMPARE BUTTONS
========================================================= */

function updateAllComparisonButtons() {
  propertySelectAll(
    "[data-compare-button]"
  ).forEach((button) => {
    updateComparisonButton(button);
  });

  updateComparisonCounter();
}


/* =========================================================
   165. COMPARISON COUNTER
========================================================= */

function updateComparisonCounter() {
  const comparisonCounters =
    propertySelectAll(
      "[data-comparison-count]"
    );

  const comparisonCount =
    ElvaraProperties.comparison.size;

  comparisonCounters.forEach(
    (counter) => {
      counter.textContent =
        formatPropertyNumber(
          comparisonCount
        );

      counter.setAttribute(
        "aria-label",
        `${comparisonCount} properties selected for comparison`
      );

      counter.hidden =
        comparisonCount === 0;
    }
  );
}


/* =========================================================
   166. COMPARISON FEEDBACK ELEMENT
========================================================= */

function getPropertyComparisonFeedback() {
  let feedbackElement =
    propertySelect(
      "#propertyCompareFeedback"
    );

  if (feedbackElement) {
    return feedbackElement;
  }

  feedbackElement =
    document.createElement("div");

  feedbackElement.id =
    "propertyCompareFeedback";

  feedbackElement.className =
    "property-compare-feedback";

  feedbackElement.setAttribute(
    "role",
    "status"
  );

  feedbackElement.setAttribute(
    "aria-live",
    "polite"
  );

  document.body.appendChild(
    feedbackElement
  );

  return feedbackElement;
}


/* =========================================================
   167. SHOW COMPARISON FEEDBACK
========================================================= */

/**
 * Display comparison feedback.
 *
 * @param {string} message
 * @param {"success"|"error"} type
 */
function showComparisonFeedback(
  message,
  type = "success"
) {
  const feedbackElement =
    getPropertyComparisonFeedback();

  feedbackElement.classList.remove(
    "is-success",
    "is-error"
  );

  feedbackElement.classList.add(
    type === "error"
      ? "is-error"
      : "is-success"
  );

  feedbackElement.innerHTML = `
    <span class="property-compare-feedback-icon">

      <i class="${
        type === "error"
          ? "fa-solid fa-triangle-exclamation"
          : "fa-solid fa-code-compare"
      }"></i>

    </span>

    <span>
      ${escapePropertyHtml(message)}
    </span>
  `;

  feedbackElement.classList.add(
    "is-visible"
  );

  window.clearTimeout(
    feedbackElement.hideTimer
  );

  feedbackElement.hideTimer =
    window.setTimeout(() => {
      feedbackElement.classList.remove(
        "is-visible"
      );
    }, 3000);
}


/* =========================================================
   168. COMPARISON CHANGE EVENT
========================================================= */

function dispatchComparisonChangeEvent(
  propertyId,
  isCompared
) {
  const property =
    findPropertyById(propertyId);

  document.dispatchEvent(
    new CustomEvent(
      "elvara:comparison-change",
      {
        detail: {
          propertyId,
          isCompared,

          property: property
            ? {
                ...property,

                gallery: [
                  ...property.gallery,
                ],

                amenities: [
                  ...property.amenities,
                ],
              }
            : null,

          comparison:
            Array.from(
              ElvaraProperties.comparison
            ),
        },
      }
    )
  );
}


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-1A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-1B
   Comparison Toggle Logic and Compare Buttons
========================================================= */


/* =========================================================
   169. TOGGLE PROPERTY COMPARISON
========================================================= */

/**
 * Add or remove a property from comparison.
 *
 * @param {string} propertyId
 * @returns {boolean}
 */
function togglePropertyComparison(
  propertyId
) {
  const property =
    findPropertyById(propertyId);

  if (!property) {
    return false;
  }

  let isCompared = false;

  if (
    ElvaraProperties.comparison.has(
      propertyId
    )
  ) {
    ElvaraProperties.comparison.delete(
      propertyId
    );

    showComparisonFeedback(
      `${property.title} was removed from comparison.`
    );
  } else {
    if (
      ElvaraProperties.comparison.size >=
      maximumComparedProperties
    ) {
      showComparisonFeedback(
        `You can compare up to ${maximumComparedProperties} properties at a time.`,
        "error"
      );

      return false;
    }

    ElvaraProperties.comparison.add(
      propertyId
    );

    isCompared = true;

    showComparisonFeedback(
      `${property.title} was added to comparison.`
    );
  }

  savePropertyComparison();
  updateAllComparisonButtons();

  if (
    typeof renderPropertyComparePanel ===
    "function"
  ) {
    renderPropertyComparePanel();
  }

  dispatchComparisonChangeEvent(
    propertyId,
    isCompared
  );

  return isCompared;
}


/* =========================================================
   170. COMPARE BUTTON CLICK HANDLER
========================================================= */

function handleComparisonButtonClick(
  event
) {
  const compareButton =
    event.target.closest(
      "[data-compare-button]"
    );

  if (!compareButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const propertyId =
    compareButton.dataset.propertyId;

  if (!propertyId) return;

  togglePropertyComparison(
    propertyId
  );
}


/* =========================================================
   171. CREATE COMPARE BUTTON MARKUP
========================================================= */

/**
 * Create a reusable compare button.
 *
 * @param {Object} property
 * @param {"icon"|"label"} displayType
 * @returns {string}
 */
function createComparisonButtonMarkup(
  property,
  displayType = "icon"
) {
  const isCompared =
    isPropertyCompared(property.id);

  const accessibleLabel =
    getComparisonButtonLabel(
      property.id
    );

  if (displayType === "label") {
    return `
      <button
        class="property-compare-button property-compare-button-label${
          isCompared
            ? " is-compared"
            : ""
        }"
        type="button"
        data-compare-button
        data-property-id="${escapePropertyHtml(
          property.id
        )}"
        aria-pressed="${String(
          isCompared
        )}"
        aria-label="${escapePropertyHtml(
          accessibleLabel
        )}"
      >

        <i class="${
          isCompared
            ? "fa-solid fa-code-compare"
            : "fa-solid fa-plus"
        }"></i>

        <span class="compare-button-label">
          ${
            isCompared
              ? "Added"
              : "Compare"
          }
        </span>

      </button>
    `;
  }

  return `
    <button
      class="property-compare-button property-compare-button-icon${
        isCompared
          ? " is-compared"
          : ""
      }"
      type="button"
      data-compare-button
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
      aria-pressed="${String(
        isCompared
      )}"
      aria-label="${escapePropertyHtml(
        accessibleLabel
      )}"
    >

      <i class="${
        isCompared
          ? "fa-solid fa-code-compare"
          : "fa-solid fa-plus"
      }"></i>

    </button>
  `;
}


/* =========================================================
   172. ADD COMPARE BUTTONS TO LISTING CARDS
========================================================= */

function addComparisonButtonsToListingCards() {
  propertySelectAll(
    ".listing-property-card"
  ).forEach((card) => {
    const propertyId =
      card.dataset.propertyId;

    const property =
      findPropertyById(propertyId);

    if (!property) return;

    const media =
      propertySelect(
        ".listing-property-media",
        card
      );

    if (
      !media ||
      propertySelect(
        "[data-compare-button]",
        media
      )
    ) {
      return;
    }

    media.insertAdjacentHTML(
      "beforeend",
      createComparisonButtonMarkup(
        property,
        "icon"
      )
    );
  });

  updateAllComparisonButtons();
}


/* =========================================================
   173. ADD COMPARE BUTTONS TO RELATED CARDS
========================================================= */

function addComparisonButtonsToRelatedCards() {
  propertySelectAll(
    ".related-property-card"
  ).forEach((card) => {
    const propertyId =
      card.dataset.propertyId;

    const property =
      findPropertyById(propertyId);

    if (!property) return;

    const media =
      propertySelect(
        ".related-property-media",
        card
      );

    if (
      !media ||
      propertySelect(
        "[data-compare-button]",
        media
      )
    ) {
      return;
    }

    media.insertAdjacentHTML(
      "beforeend",
      createComparisonButtonMarkup(
        property,
        "icon"
      )
    );
  });

  updateAllComparisonButtons();
}


/* =========================================================
   174. DETAILS PAGE COMPARE BUTTON
========================================================= */

function renderPropertyDetailsCompareButton(
  property
) {
  const comparisonContainer =
    propertySelect(
      "#propertyDetailsCompare"
    );

  if (
    !comparisonContainer ||
    !property
  ) {
    return;
  }

  comparisonContainer.innerHTML =
    createComparisonButtonMarkup(
      property,
      "label"
    );

  updateAllComparisonButtons();
}


/* =========================================================
   175. REFRESH COMPARE BUTTONS AFTER RENDER
========================================================= */

function refreshDynamicComparisonButtons() {
  addComparisonButtonsToListingCards();
  addComparisonButtonsToRelatedCards();

  const selectedProperty =
    findPropertyById(
      ElvaraProperties.selectedPropertyId
    );

  if (selectedProperty) {
    renderPropertyDetailsCompareButton(
      selectedProperty
    );
  }

  updateAllComparisonButtons();
}


/* =========================================================
   176. PROPERTY RESULTS REFRESH
========================================================= */

document.addEventListener(
  "elvara:property-results",
  () => {
    addComparisonButtonsToListingCards();
  }
);


/* =========================================================
   177. PROPERTY DETAILS REFRESH
========================================================= */

document.addEventListener(
  "elvara:property-details-ready",
  (event) => {
    const property =
      event.detail?.property;

    if (!property) return;

    renderPropertyDetailsCompareButton(
      property
    );

    addComparisonButtonsToRelatedCards();
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-1B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-2A
   Compare Panel Creation, Items and Open/Close Controls
========================================================= */


/* =========================================================
   178. CREATE COMPARE PANEL
========================================================= */

function createPropertyComparePanel() {
  let comparePanel =
    propertySelect(
      "#propertyComparePanel"
    );

  if (comparePanel) {
    return comparePanel;
  }

  comparePanel =
    document.createElement("aside");

  comparePanel.id =
    "propertyComparePanel";

  comparePanel.className =
    "property-compare-panel";

  comparePanel.setAttribute(
    "aria-label",
    "Selected property comparison"
  );

  comparePanel.setAttribute(
    "aria-hidden",
    "true"
  );

  comparePanel.innerHTML = `
    <div class="property-compare-panel-header">

      <div>
        <small>
          Property Comparison
        </small>

        <h3>
          Compare selected residences
        </h3>
      </div>

      <button
        class="property-compare-panel-close"
        type="button"
        aria-label="Close comparison panel"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

    </div>


    <div
      class="property-compare-panel-items"
      id="propertyComparePanelItems"
    ></div>


    <div class="property-compare-panel-footer">

      <button
        class="property-compare-clear"
        id="propertyCompareClear"
        type="button"
      >
        Clear All
      </button>

      <button
        class="property-compare-view"
        id="propertyCompareView"
        type="button"
      >
        <span>
          Compare Properties
        </span>

        <i class="fa-solid fa-arrow-right"></i>
      </button>

    </div>
  `;

  document.body.appendChild(
    comparePanel
  );

  return comparePanel;
}


/* =========================================================
   179. COMPARE PANEL ITEM MARKUP
========================================================= */

/**
 * Create one selected-property item for the panel.
 *
 * @param {Object} property
 * @returns {string}
 */
function createComparePanelItemMarkup(
  property
) {
  const displayPrice =
    property.displayPrice ||
    formatPropertyPrice(
      property.price
    );

  return `
    <article
      class="property-compare-panel-item"
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
    >

      <img
        src="${escapePropertyHtml(
          property.image
        )}"
        alt="${escapePropertyHtml(
          property.title
        )}"
        loading="lazy"
        decoding="async"
      >


      <div class="property-compare-panel-item-content">

        <small>
          ${escapePropertyHtml(
            property.location
          )}
        </small>

        <strong>
          ${escapePropertyHtml(
            property.title
          )}
        </strong>

        <span>
          ${escapePropertyHtml(
            displayPrice
          )}
        </span>

      </div>


      <button
        class="property-compare-remove"
        type="button"
        data-remove-comparison="${escapePropertyHtml(
          property.id
        )}"
        aria-label="Remove ${escapePropertyHtml(
          property.title
        )} from comparison"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

    </article>
  `;
}


/* =========================================================
   180. COMPARED PROPERTY COLLECTION
========================================================= */

/**
 * Return valid selected properties in saved order.
 *
 * @returns {Object[]}
 */
function getComparedProperties() {
  return Array.from(
    ElvaraProperties.comparison
  )
    .map((propertyId) =>
      findPropertyById(propertyId)
    )
    .filter(Boolean);
}


/* =========================================================
   181. COMPARE PANEL EMPTY STATE
========================================================= */

function createComparePanelEmptyMarkup() {
  return `
    <div class="property-compare-panel-empty">

      <i class="fa-solid fa-code-compare"></i>

      <p>
        Select two or more properties to compare their key details.
      </p>

    </div>
  `;
}


/* =========================================================
   182. RENDER COMPARE PANEL
========================================================= */

function renderPropertyComparePanel() {
  const comparePanel =
    createPropertyComparePanel();

  const panelItems =
    propertySelect(
      "#propertyComparePanelItems",
      comparePanel
    );

  const compareViewButton =
    propertySelect(
      "#propertyCompareView",
      comparePanel
    );

  const clearButton =
    propertySelect(
      "#propertyCompareClear",
      comparePanel
    );

  const comparedProperties =
    getComparedProperties();

  if (panelItems) {
    panelItems.innerHTML =
      comparedProperties.length === 0
        ? createComparePanelEmptyMarkup()
        : comparedProperties
            .map(
              createComparePanelItemMarkup
            )
            .join("");
  }

  comparePanel.classList.toggle(
    "has-properties",
    comparedProperties.length > 0
  );

  comparePanel.classList.toggle(
    "can-compare",
    comparedProperties.length >= 2
  );

  comparePanel.dataset.count =
    String(comparedProperties.length);

  if (compareViewButton) {
    compareViewButton.disabled =
      comparedProperties.length < 2;

    compareViewButton.setAttribute(
      "aria-disabled",
      String(
        comparedProperties.length < 2
      )
    );
  }

  if (clearButton) {
    clearButton.disabled =
      comparedProperties.length === 0;

    clearButton.setAttribute(
      "aria-disabled",
      String(
        comparedProperties.length === 0
      )
    );
  }

  updateComparisonCounter();
}


/* =========================================================
   183. OPEN COMPARE PANEL
========================================================= */

function openPropertyComparePanel() {
  const comparePanel =
    createPropertyComparePanel();

  renderPropertyComparePanel();

  comparePanel.classList.add(
    "is-open"
  );

  comparePanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.documentElement.classList.add(
    "comparison-panel-open"
  );

  window.setTimeout(() => {
    propertySelect(
      ".property-compare-panel-close",
      comparePanel
    )?.focus();
  }, 150);
}


/* =========================================================
   184. CLOSE COMPARE PANEL
========================================================= */

function closePropertyComparePanel() {
  const comparePanel =
    propertySelect(
      "#propertyComparePanel"
    );

  if (!comparePanel) return;

  comparePanel.classList.remove(
    "is-open"
  );

  comparePanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.documentElement.classList.remove(
    "comparison-panel-open"
  );
}


/* =========================================================
   185. TOGGLE COMPARE PANEL
========================================================= */

function togglePropertyComparePanel() {
  const comparePanel =
    createPropertyComparePanel();

  if (
    comparePanel.classList.contains(
      "is-open"
    )
  ) {
    closePropertyComparePanel();
  } else {
    openPropertyComparePanel();
  }
}


/* =========================================================
   186. CLEAR PROPERTY COMPARISON
========================================================= */

function clearPropertyComparison() {
  if (
    ElvaraProperties.comparison.size ===
    0
  ) {
    return;
  }

  ElvaraProperties.comparison.clear();

  savePropertyComparison();
  updateAllComparisonButtons();
  renderPropertyComparePanel();

  showComparisonFeedback(
    "Property comparison was cleared."
  );

  document.dispatchEvent(
    new CustomEvent(
      "elvara:comparison-cleared"
    )
  );
}


/* =========================================================
   187. REMOVE ONE PROPERTY FROM PANEL
========================================================= */

function removePropertyFromComparison(
  propertyId
) {
  if (
    !propertyId ||
    !ElvaraProperties.comparison.has(
      propertyId
    )
  ) {
    return;
  }

  togglePropertyComparison(
    propertyId
  );

  renderPropertyComparePanel();
}


/* =========================================================
   188. COMPARE PANEL CLICK HANDLER
========================================================= */

function handleComparePanelClick(
  event
) {
  const removeButton =
    event.target.closest(
      "[data-remove-comparison]"
    );

  if (removeButton) {
    const propertyId =
      removeButton.dataset
        .removeComparison;

    removePropertyFromComparison(
      propertyId
    );

    return;
  }

  if (
    event.target.closest(
      ".property-compare-panel-close"
    )
  ) {
    closePropertyComparePanel();
    return;
  }

  if (
    event.target.closest(
      "#propertyCompareClear"
    )
  ) {
    clearPropertyComparison();
    return;
  }

  if (
    event.target.closest(
      "#propertyCompareView"
    )
  ) {
    if (
      typeof openPropertyComparisonModal ===
      "function"
    ) {
      openPropertyComparisonModal();
    }
  }
}


/* =========================================================
   189. EXTERNAL OPEN-PANEL BUTTONS
========================================================= */

function initializeOpenComparisonButtons() {
  propertySelectAll(
    "[data-open-comparison]"
  ).forEach((button) => {
    if (
      button.dataset
        .comparisonListenerAttached ===
      "true"
    ) {
      return;
    }

    button.dataset
      .comparisonListenerAttached =
      "true";

    button.addEventListener(
      "click",
      () => {
        openPropertyComparePanel();
      }
    );
  });
}


/* =========================================================
   190. INITIALIZE PANEL EVENTS
========================================================= */

let comparePanelEventsInitialized =
  false;


function initializePropertyComparePanelEvents() {
  if (comparePanelEventsInitialized) {
    return;
  }

  comparePanelEventsInitialized =
    true;

  const comparePanel =
    createPropertyComparePanel();

  comparePanel.addEventListener(
    "click",
    handleComparePanelClick
  );

  initializeOpenComparisonButtons();
}


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-2A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-2B
   Comparison Modal, Table and Modal Controls
========================================================= */


/* =========================================================
   191. COMPARISON TABLE VALUE
========================================================= */

/**
 * Return a display value for one comparison field.
 *
 * @param {Object} property
 * @param {string} field
 * @returns {string}
 */
function createComparisonTableValue(
  property,
  field
) {
  switch (field) {
    case "price":
      return (
        property.displayPrice ||
        formatPropertyPrice(
          property.price
        )
      );

    case "location":
      return property.location;

    case "type":
      return property.categoryLabel;

    case "bedrooms":
      if (
        property.category ===
        "commercial"
      ) {
        return "Commercial";
      }

      if (
        property.category ===
        "hotel"
      ) {
        return `${formatPropertyNumber(
          property.bedrooms
        )} Suites`;
      }

      return `${formatPropertyNumber(
        property.bedrooms
      )} Bedrooms`;

    case "bathrooms":
      return `${formatPropertyNumber(
        property.bathrooms
      )} ${
        property.category ===
        "commercial"
          ? "Facilities"
          : "Bathrooms"
      }`;

    case "area":
      return (
        property.areaLabel ||
        formatPropertyArea(
          property.area
        )
      );

    case "status":
      return property.statusLabel;

    default:
      return "—";
  }
}


/* =========================================================
   192. CREATE COMPARISON MODAL
========================================================= */

function createPropertyComparisonModal() {
  let comparisonModal =
    propertySelect(
      "#propertyComparisonModal"
    );

  if (comparisonModal) {
    return comparisonModal;
  }

  comparisonModal =
    document.createElement("div");

  comparisonModal.id =
    "propertyComparisonModal";

  comparisonModal.className =
    "property-comparison-modal";

  comparisonModal.setAttribute(
    "aria-hidden",
    "true"
  );

  comparisonModal.innerHTML = `
    <div class="property-comparison-modal-backdrop"></div>

    <div
      class="property-comparison-modal-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Property comparison table"
    >

      <div class="property-comparison-modal-header">

        <div>
          <small>
            Élvara Comparison
          </small>

          <h2>
            Compare properties
          </h2>
        </div>

        <button
          class="property-comparison-modal-close"
          type="button"
          aria-label="Close property comparison"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>


      <div
        class="property-comparison-table-wrap"
        id="propertyComparisonTableWrap"
      ></div>

    </div>
  `;

  document.body.appendChild(
    comparisonModal
  );

  return comparisonModal;
}


/* =========================================================
   193. COMPARISON TABLE FIELD DEFINITIONS
========================================================= */

const propertyComparisonFields = [
  {
    key: "price",
    label: "Price",
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "type",
    label: "Property Type",
  },
  {
    key: "bedrooms",
    label: "Bedrooms / Suites",
  },
  {
    key: "bathrooms",
    label: "Bathrooms",
  },
  {
    key: "area",
    label: "Interior Area",
  },
  {
    key: "status",
    label: "Status",
  },
];


/* =========================================================
   194. COMPARISON PROPERTY HEADER MARKUP
========================================================= */

function createComparisonPropertyHeaderMarkup(
  property
) {
  return `
    <div class="property-comparison-table-property">

      <img
        src="${escapePropertyHtml(
          property.image
        )}"
        alt="${escapePropertyHtml(
          property.title
        )}"
        loading="lazy"
        decoding="async"
      >

      <small>
        ${escapePropertyHtml(
          property.categoryLabel
        )}
      </small>

      <strong>
        ${escapePropertyHtml(
          property.title
        )}
      </strong>

      <a
        href="${escapePropertyHtml(
          createPropertyDetailsUrl(
            property
          )
        )}"
      >
        View Property

        <i class="fa-solid fa-arrow-right"></i>
      </a>

    </div>
  `;
}


/* =========================================================
   195. COMPARISON ROW MARKUP
========================================================= */

function createComparisonRowMarkup(
  field,
  properties
) {
  return `
    <div class="property-comparison-table-row">

      <div class="property-comparison-table-label">
        ${escapePropertyHtml(
          field.label
        )}
      </div>

      ${properties
        .map(
          (property) => `
            <div class="property-comparison-table-value">

              ${escapePropertyHtml(
                createComparisonTableValue(
                  property,
                  field.key
                )
              )}

            </div>
          `
        )
        .join("")}

    </div>
  `;
}


/* =========================================================
   196. COMPLETE COMPARISON TABLE MARKUP
========================================================= */

function createPropertyComparisonTableMarkup(
  properties
) {
  return `
    <div
      class="property-comparison-table"
      style="--comparison-columns: ${properties.length};"
    >

      <div class="property-comparison-table-row property-comparison-table-properties">

        <div class="property-comparison-table-label">
          Property
        </div>

        ${properties
          .map(
            createComparisonPropertyHeaderMarkup
          )
          .join("")}

      </div>

      ${propertyComparisonFields
        .map((field) =>
          createComparisonRowMarkup(
            field,
            properties
          )
        )
        .join("")}

    </div>
  `;
}


/* =========================================================
   197. OPEN COMPARISON MODAL
========================================================= */

function openPropertyComparisonModal() {
  const comparedProperties =
    getComparedProperties();

  if (
    comparedProperties.length < 2
  ) {
    showComparisonFeedback(
      "Select at least two properties before comparing.",
      "error"
    );

    return;
  }

  const comparisonModal =
    createPropertyComparisonModal();

  const tableWrapper =
    propertySelect(
      "#propertyComparisonTableWrap",
      comparisonModal
    );

  if (tableWrapper) {
    tableWrapper.innerHTML =
      createPropertyComparisonTableMarkup(
        comparedProperties
      );
  }

  comparisonModal.classList.add(
    "is-open"
  );

  comparisonModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.documentElement.classList.add(
    "comparison-modal-open"
  );

  if (
    typeof lockPageScroll ===
    "function"
  ) {
    lockPageScroll();
  }

  window.setTimeout(() => {
    propertySelect(
      ".property-comparison-modal-close",
      comparisonModal
    )?.focus();
  }, 150);
}


/* =========================================================
   198. CLOSE COMPARISON MODAL
========================================================= */

function closePropertyComparisonModal() {
  const comparisonModal =
    propertySelect(
      "#propertyComparisonModal"
    );

  if (!comparisonModal) return;

  comparisonModal.classList.remove(
    "is-open"
  );

  comparisonModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.documentElement.classList.remove(
    "comparison-modal-open"
  );

  if (
    typeof unlockPageScroll ===
    "function"
  ) {
    unlockPageScroll();
  }
}


/* =========================================================
   199. COMPARISON MODAL CLICK HANDLER
========================================================= */

function handleComparisonModalClick(
  event
) {
  const closeButton =
    event.target.closest(
      ".property-comparison-modal-close"
    );

  const clickedBackdrop =
    event.target.classList.contains(
      "property-comparison-modal-backdrop"
    );

  if (
    closeButton ||
    clickedBackdrop
  ) {
    closePropertyComparisonModal();
  }
}


/* =========================================================
   200. COMPARISON KEYBOARD CONTROL
========================================================= */

function handleComparisonKeyboard(
  event
) {
  if (event.key !== "Escape") {
    return;
  }

  const comparisonModal =
    propertySelect(
      "#propertyComparisonModal"
    );

  if (
    comparisonModal?.classList.contains(
      "is-open"
    )
  ) {
    event.preventDefault();

    closePropertyComparisonModal();
    return;
  }

  const comparePanel =
    propertySelect(
      "#propertyComparePanel"
    );

  if (
    comparePanel?.classList.contains(
      "is-open"
    )
  ) {
    event.preventDefault();

    closePropertyComparePanel();
  }
}


/* =========================================================
   201. MODAL INTERNAL LINKS
========================================================= */

function initializeComparisonModalLinks() {
  if (
    typeof prepareInternalPageLinks !==
    "function"
  ) {
    return;
  }

  prepareInternalPageLinks();
}


/* =========================================================
   202. INITIALIZE MODAL EVENTS
========================================================= */

let comparisonModalEventsInitialized =
  false;


function initializePropertyComparisonModalEvents() {
  if (
    comparisonModalEventsInitialized
  ) {
    return;
  }

  comparisonModalEventsInitialized =
    true;

  const comparisonModal =
    createPropertyComparisonModal();

  comparisonModal.addEventListener(
    "click",
    handleComparisonModalClick
  );

  document.addEventListener(
    "keydown",
    handleComparisonKeyboard
  );
}


/* =========================================================
   203. MODAL READY REFRESH
========================================================= */

document.addEventListener(
  "elvara:comparison-change",
  () => {
    const comparisonModal =
      propertySelect(
        "#propertyComparisonModal"
      );

    if (
      !comparisonModal?.classList.contains(
        "is-open"
      )
    ) {
      return;
    }

    const comparedProperties =
      getComparedProperties();

    if (
      comparedProperties.length < 2
    ) {
      closePropertyComparisonModal();
      return;
    }

    const tableWrapper =
      propertySelect(
        "#propertyComparisonTableWrap",
        comparisonModal
      );

    if (tableWrapper) {
      tableWrapper.innerHTML =
        createPropertyComparisonTableMarkup(
          comparedProperties
        );

      initializeComparisonModalLinks();
    }
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-2B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-3A
   Comparison Styles: Buttons, Feedback and Floating Panel
========================================================= */


/* =========================================================
   204. INJECT COMPARISON STYLES — PART A
========================================================= */

function injectPropertyComparisonStylesPartA() {
  if (
    propertySelect(
      "#propertyComparisonStylesPartA"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "propertyComparisonStylesPartA";

  styleElement.textContent = `
    .property-compare-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid
        rgba(255, 255, 255, 0.24);
      border-radius: 999px;

      background:
        rgba(8, 9, 9, 0.58);
      color: #ffffff;

      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);

      transition:
        transform 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease,
        border-color 0.25s ease;
    }

    .property-compare-button:hover,
    .property-compare-button.is-compared {
      transform: translateY(-3px);

      border-color: #c8a96b;
      background: #c8a96b;
      color: #080909;
    }

    .property-compare-button-icon {
      position: absolute;
      top: 66px;
      right: 16px;
      z-index: 5;

      width: 42px;
      height: 42px;

      font-size: 12px;
    }

    .property-compare-button-label {
      min-height: 52px;
      gap: 10px;

      padding-inline: 20px;

      border-color:
        rgba(16, 17, 17, 0.15);

      background: #ffffff;
      color: #101111;

      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .property-compare-button-label:hover,
    .property-compare-button-label.is-compared {
      background: #c8a96b;
      color: #080909;
    }


    /* =====================================================
       COMPARISON FEEDBACK
    ===================================================== */

    .property-compare-feedback {
      position: fixed;
      left: 50%;
      bottom: 28px;
      z-index: 10055;

      display: flex;
      align-items: center;
      gap: 12px;

      width: min(
        calc(100% - 32px),
        470px
      );

      padding: 14px 18px;

      opacity: 0;
      visibility: hidden;

      transform:
        translate(-50%, 18px);

      border: 1px solid
        rgba(255, 255, 255, 0.14);
      border-radius: 999px;

      background: #101111;
      color: #ffffff;

      box-shadow:
        0 20px 55px
        rgba(0, 0, 0, 0.28);

      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);

      font-size: 10px;
      line-height: 1.5;

      transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        transform 0.3s ease;
    }

    .property-compare-feedback.is-visible {
      opacity: 1;
      visibility: visible;

      transform:
        translate(-50%, 0);
    }

    .property-compare-feedback-icon {
      display: grid;
      place-items: center;

      width: 34px;
      height: 34px;

      flex-shrink: 0;

      border-radius: 50%;

      background: #c8a96b;
      color: #080909;
    }

    .property-compare-feedback.is-error
    .property-compare-feedback-icon {
      background: #b65c52;
      color: #ffffff;
    }


    /* =====================================================
       FLOATING COMPARE PANEL
    ===================================================== */

    .property-compare-panel {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 10010;

      width: min(
        calc(100% - 48px),
        430px
      );

      padding: 22px;

      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      transform:
        translateY(28px)
        scale(0.97);

      border: 1px solid
        rgba(255, 255, 255, 0.14);
      border-radius: 24px;

      background:
        rgba(8, 9, 9, 0.96);
      color: #ffffff;

      box-shadow:
        0 30px 90px
        rgba(0, 0, 0, 0.38);

      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);

      transition:
        opacity 0.35s ease,
        visibility 0.35s ease,
        transform 0.35s ease;
    }

    .property-compare-panel.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform:
        translateY(0)
        scale(1);
    }

    .property-compare-panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;

      padding-bottom: 18px;

      border-bottom: 1px solid
        rgba(255, 255, 255, 0.12);
    }

    .property-compare-panel-header small {
      color: #e0c58e;

      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .property-compare-panel-header h3 {
      margin-top: 7px;

      color: #ffffff;

      font-family:
        "Cormorant Garamond",
        serif;

      font-size: 26px;
      font-weight: 500;
      line-height: 1.1;
    }

    .property-compare-panel-close,
    .property-compare-remove {
      display: grid;
      place-items: center;

      flex-shrink: 0;

      border-radius: 50%;

      color: #ffffff;
      background:
        rgba(255, 255, 255, 0.08);

      transition:
        transform 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .property-compare-panel-close {
      width: 40px;
      height: 40px;
    }

    .property-compare-panel-close:hover,
    .property-compare-remove:hover {
      transform: rotate(8deg);

      background: #c8a96b;
      color: #080909;
    }

    .property-compare-panel-items {
      display: flex;
      flex-direction: column;
      gap: 10px;

      max-height: 340px;

      margin-block: 18px;

      overflow-y: auto;
      overscroll-behavior: contain;

      scrollbar-width: thin;
      scrollbar-color:
        rgba(200, 169, 107, 0.55)
        rgba(255, 255, 255, 0.06);
    }

    .property-compare-panel-items::-webkit-scrollbar {
      width: 6px;
    }

    .property-compare-panel-items::-webkit-scrollbar-track {
      background:
        rgba(255, 255, 255, 0.05);
    }

    .property-compare-panel-items::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background:
        rgba(200, 169, 107, 0.55);
    }


    /* =====================================================
       COMPARE PANEL ITEMS
    ===================================================== */

    .property-compare-panel-item {
      position: relative;

      display: grid;
      grid-template-columns:
        72px 1fr auto;
      gap: 13px;
      align-items: center;

      padding: 9px;

      border: 1px solid
        rgba(255, 255, 255, 0.1);
      border-radius: 15px;

      background:
        rgba(255, 255, 255, 0.04);

      transition:
        border-color 0.25s ease,
        background-color 0.25s ease;
    }

    .property-compare-panel-item:hover {
      border-color:
        rgba(200, 169, 107, 0.4);

      background:
        rgba(255, 255, 255, 0.065);
    }

    .property-compare-panel-item img {
      width: 72px;
      height: 66px;

      border-radius: 10px;

      object-fit: cover;
    }

    .property-compare-panel-item-content {
      display: flex;
      flex-direction: column;

      min-width: 0;
    }

    .property-compare-panel-item-content small {
      overflow: hidden;

      color:
        rgba(255, 255, 255, 0.45);

      font-size: 7px;
      letter-spacing: 0.05em;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .property-compare-panel-item-content strong {
      margin-top: 4px;

      overflow: hidden;

      color: #ffffff;

      font-family:
        "Cormorant Garamond",
        serif;

      font-size: 18px;
      font-weight: 500;

      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .property-compare-panel-item-content span {
      margin-top: 4px;

      color: #e0c58e;

      font-size: 9px;
      font-weight: 600;
    }

    .property-compare-remove {
      width: 32px;
      height: 32px;

      font-size: 10px;
    }


    /* =====================================================
       PANEL EMPTY STATE
    ===================================================== */

    .property-compare-panel-empty {
      padding: 30px 15px;

      color:
        rgba(255, 255, 255, 0.54);

      text-align: center;
    }

    .property-compare-panel-empty i {
      margin-bottom: 13px;

      color: #e0c58e;

      font-size: 28px;
    }

    .property-compare-panel-empty p {
      max-width: 280px;

      margin-inline: auto;

      font-size: 10px;
      line-height: 1.7;
    }


    /* =====================================================
       PANEL FOOTER
    ===================================================== */

    .property-compare-panel-footer {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
    }

    .property-compare-clear,
    .property-compare-view {
      min-height: 48px;

      border-radius: 999px;

      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;

      transition:
        transform 0.25s ease,
        opacity 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .property-compare-clear {
      padding-inline: 17px;

      border: 1px solid
        rgba(255, 255, 255, 0.16);

      color:
        rgba(255, 255, 255, 0.72);
      background: transparent;
    }

    .property-compare-clear:hover:not(:disabled) {
      transform: translateY(-2px);

      border-color: #c8a96b;
      color: #ffffff;
    }

    .property-compare-view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      padding-inline: 20px;

      background: #c8a96b;
      color: #080909;
    }

    .property-compare-view:hover:not(:disabled) {
      transform: translateY(-2px);

      background: #e0c58e;
    }

    .property-compare-clear:disabled,
    .property-compare-view:disabled {
      opacity: 0.42;
      cursor: not-allowed;
    }


    /* =====================================================
       MOBILE PANEL
    ===================================================== */

    @media (max-width: 767px) {
      .property-compare-button-icon {
        top: 60px;
        right: 13px;

        width: 39px;
        height: 39px;
      }

      .property-compare-panel {
        right: 14px;
        bottom: 14px;

        width: calc(100% - 28px);

        padding: 18px;

        border-radius: 20px;
      }

      .property-compare-panel-header h3 {
        font-size: 23px;
      }

      .property-compare-panel-items {
        max-height: 290px;
      }

      .property-compare-panel-item {
        grid-template-columns:
          62px 1fr auto;

        gap: 10px;
      }

      .property-compare-panel-item img {
        width: 62px;
        height: 58px;
      }

      .property-compare-panel-footer {
        grid-template-columns: 1fr;
      }

      .property-compare-feedback {
        bottom: 16px;

        border-radius: 18px;
      }
    }


    /* =====================================================
       VERY SMALL MOBILE
    ===================================================== */

    @media (max-width: 420px) {
      .property-compare-panel-item {
        grid-template-columns:
          54px 1fr auto;
      }

      .property-compare-panel-item img {
        width: 54px;
        height: 54px;
      }

      .property-compare-panel-item-content strong {
        font-size: 16px;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-3A
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-3B
   Comparison Modal and Table Styles
========================================================= */


/* =========================================================
   205. INJECT COMPARISON STYLES — PART B
========================================================= */

function injectPropertyComparisonStylesPartB() {
  if (
    propertySelect(
      "#propertyComparisonStylesPartB"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "propertyComparisonStylesPartB";

  styleElement.textContent = `
    .property-comparison-modal {
      position: fixed;
      inset: 0;
      z-index: 10060;

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

    .property-comparison-modal.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .property-comparison-modal-backdrop {
      position: absolute;
      inset: 0;

      background:
        rgba(5, 6, 6, 0.95);

      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .property-comparison-modal-dialog {
      position: relative;
      z-index: 2;

      width: min(1200px, 100%);
      max-height: 88vh;

      overflow: hidden;

      transform:
        translateY(22px)
        scale(0.98);

      border: 1px solid
        rgba(255, 255, 255, 0.14);
      border-radius: 24px;

      background: #f5f1e8;
      color: #101111;

      box-shadow:
        0 35px 110px
        rgba(0, 0, 0, 0.5);

      transition:
        transform 0.45s
        cubic-bezier(0.22, 1, 0.36, 1);
    }

    .property-comparison-modal.is-open
    .property-comparison-modal-dialog {
      transform:
        translateY(0)
        scale(1);
    }


    /* =====================================================
       MODAL HEADER
    ===================================================== */

    .property-comparison-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;

      padding: 24px 28px;

      border-bottom: 1px solid
        rgba(16, 17, 17, 0.12);

      background:
        rgba(255, 255, 255, 0.64);
    }

    .property-comparison-modal-header small {
      color: #9b7a42;

      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .property-comparison-modal-header h2 {
      margin-top: 5px;

      color: #101111;

      font-family:
        "Cormorant Garamond",
        serif;

      font-size: 38px;
      font-weight: 600;
      line-height: 1;
    }

    .property-comparison-modal-close {
      display: grid;
      place-items: center;

      width: 44px;
      height: 44px;

      flex-shrink: 0;

      border-radius: 50%;

      background: #101111;
      color: #ffffff;

      transition:
        transform 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .property-comparison-modal-close:hover {
      transform: rotate(90deg);

      background: #c8a96b;
      color: #080909;
    }


    /* =====================================================
       TABLE WRAPPER
    ===================================================== */

    .property-comparison-table-wrap {
      max-height:
        calc(88vh - 102px);

      overflow: auto;
      overscroll-behavior: contain;

      scrollbar-width: thin;
      scrollbar-color:
        rgba(155, 122, 66, 0.55)
        rgba(16, 17, 17, 0.06);
    }

    .property-comparison-table-wrap::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .property-comparison-table-wrap::-webkit-scrollbar-track {
      background:
        rgba(16, 17, 17, 0.05);
    }

    .property-comparison-table-wrap::-webkit-scrollbar-thumb {
      border-radius: 999px;

      background:
        rgba(155, 122, 66, 0.55);
    }


    /* =====================================================
       COMPARISON TABLE
    ===================================================== */

    .property-comparison-table {
      min-width: 760px;
    }

    .property-comparison-table-row {
      display: grid;

      grid-template-columns:
        180px
        repeat(
          var(--comparison-columns),
          minmax(190px, 1fr)
        );

      border-bottom: 1px solid
        rgba(16, 17, 17, 0.1);
    }

    .property-comparison-table-row:last-child {
      border-bottom: 0;
    }

    .property-comparison-table-label,
    .property-comparison-table-value,
    .property-comparison-table-property {
      padding: 19px 20px;

      border-right: 1px solid
        rgba(16, 17, 17, 0.1);
    }

    .property-comparison-table-row > *:last-child {
      border-right: 0;
    }

    .property-comparison-table-label {
      position: sticky;
      left: 0;
      z-index: 2;

      background:
        rgba(200, 169, 107, 0.15);
      color: #101111;

      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .property-comparison-table-value {
      display: flex;
      align-items: center;

      min-height: 62px;

      color: #55554f;

      font-size: 12px;
      line-height: 1.6;

      background:
        rgba(255, 255, 255, 0.5);
    }

    .property-comparison-table-row:nth-child(even)
    .property-comparison-table-value {
      background:
        rgba(255, 255, 255, 0.78);
    }


    /* =====================================================
       PROPERTY HEADERS
    ===================================================== */

    .property-comparison-table-properties {
      align-items: stretch;
    }

    .property-comparison-table-properties
    .property-comparison-table-label {
      display: flex;
      align-items: center;
    }

    .property-comparison-table-property {
      display: flex;
      flex-direction: column;

      min-width: 0;

      background: #ffffff;
    }

    .property-comparison-table-property img {
      width: 100%;
      height: 150px;

      margin-bottom: 15px;

      border-radius: 13px;

      object-fit: cover;

      box-shadow:
        0 12px 30px
        rgba(16, 17, 17, 0.12);
    }

    .property-comparison-table-property small {
      color: #9b7a42;

      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .property-comparison-table-property strong {
      margin-top: 6px;

      color: #101111;

      font-family:
        "Cormorant Garamond",
        serif;

      font-size: 23px;
      font-weight: 600;
      line-height: 1.08;
    }

    .property-comparison-table-property a {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      width: fit-content;

      margin-top: 15px;

      color: #9b7a42;

      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;

      transition:
        color 0.25s ease,
        transform 0.25s ease;
    }

    .property-comparison-table-property a:hover {
      transform: translateX(4px);

      color: #101111;
    }


    /* =====================================================
       OPEN-STATE DOCUMENT FIXES
    ===================================================== */

    html.comparison-modal-open,
    html.comparison-panel-open {
      overscroll-behavior: none;
    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 991px) {
      .property-comparison-modal {
        padding: 18px;
      }

      .property-comparison-modal-dialog {
        max-height: 90vh;
      }

      .property-comparison-modal-header {
        padding: 21px 22px;
      }

      .property-comparison-modal-header h2 {
        font-size: 34px;
      }

      .property-comparison-table-wrap {
        max-height:
          calc(90vh - 94px);
      }

      .property-comparison-table-row {
        grid-template-columns:
          160px
          repeat(
            var(--comparison-columns),
            minmax(185px, 1fr)
          );
      }

      .property-comparison-table-label,
      .property-comparison-table-value,
      .property-comparison-table-property {
        padding: 17px;
      }
    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 767px) {
      .property-comparison-modal {
        padding: 12px;
      }

      .property-comparison-modal-dialog {
        max-height: 92vh;

        border-radius: 20px;
      }

      .property-comparison-modal-header {
        align-items: flex-start;

        padding: 18px;
      }

      .property-comparison-modal-header h2 {
        font-size: 30px;
      }

      .property-comparison-modal-close {
        width: 40px;
        height: 40px;
      }

      .property-comparison-table-wrap {
        max-height:
          calc(92vh - 88px);
      }

      .property-comparison-table {
        min-width: 700px;
      }

      .property-comparison-table-row {
        grid-template-columns:
          145px
          repeat(
            var(--comparison-columns),
            minmax(175px, 1fr)
          );
      }

      .property-comparison-table-label,
      .property-comparison-table-value,
      .property-comparison-table-property {
        padding: 15px;
      }

      .property-comparison-table-property img {
        height: 130px;
      }

      .property-comparison-table-property strong {
        font-size: 21px;
      }
    }


    /* =====================================================
       SMALL MOBILE
    ===================================================== */

    @media (max-width: 420px) {
      .property-comparison-modal-header {
        gap: 14px;
      }

      .property-comparison-modal-header h2 {
        font-size: 27px;
      }

      .property-comparison-table {
        min-width: 650px;
      }

      .property-comparison-table-row {
        grid-template-columns:
          135px
          repeat(
            var(--comparison-columns),
            minmax(165px, 1fr)
          );
      }

      .property-comparison-table-property img {
        height: 115px;
      }
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {
      .property-comparison-modal,
      .property-comparison-modal-dialog,
      .property-comparison-modal-close,
      .property-comparison-table-property a {
        transition: none;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   END OF PROPERTIES.JS — PART 4B-3B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4B-3C
   Comparison Styles, Events and Final Initialization
========================================================= */


/* =========================================================
   206. INJECT ALL COMPARISON STYLES
========================================================= */

function injectPropertyComparisonStyles() {
  injectPropertyComparisonStylesPartA();
  injectPropertyComparisonStylesPartB();
}


/* =========================================================
   207. INITIALIZE COMPARISON UI EVENTS
========================================================= */

function initializePropertyComparisonEvents() {
  initializePropertyComparePanelEvents();
  initializePropertyComparisonModalEvents();

  if (
    document.documentElement.dataset
      .comparisonButtonListener !== "true"
  ) {
    document.documentElement.dataset
      .comparisonButtonListener = "true";

    document.addEventListener(
      "click",
      handleComparisonButtonClick
    );
  }

  initializeOpenComparisonButtons();
}


/* =========================================================
   208. REFRESH OPEN COMPARISON PANEL
========================================================= */

function refreshOpenComparisonPanel() {
  const comparePanel =
    propertySelect(
      "#propertyComparePanel"
    );

  if (
    !comparePanel ||
    !comparePanel.classList.contains(
      "is-open"
    )
  ) {
    return;
  }

  renderPropertyComparePanel();
}


/* =========================================================
   209. REFRESH OPEN COMPARISON MODAL
========================================================= */

function refreshOpenComparisonModal() {
  const comparisonModal =
    propertySelect(
      "#propertyComparisonModal"
    );

  if (
    !comparisonModal ||
    !comparisonModal.classList.contains(
      "is-open"
    )
  ) {
    return;
  }

  const comparedProperties =
    getComparedProperties();

  if (
    comparedProperties.length < 2
  ) {
    closePropertyComparisonModal();
    return;
  }

  const tableWrapper =
    propertySelect(
      "#propertyComparisonTableWrap",
      comparisonModal
    );

  if (!tableWrapper) return;

  tableWrapper.innerHTML =
    createPropertyComparisonTableMarkup(
      comparedProperties
    );

  initializeComparisonModalLinks();
}


/* =========================================================
   210. COMPARISON CHANGE REFRESH
========================================================= */

function handleComparisonInterfaceRefresh() {
  updateAllComparisonButtons();
  renderPropertyComparePanel();
  refreshOpenComparisonPanel();
  refreshOpenComparisonModal();
}


/* =========================================================
   211. COMPARISON EVENT REFRESH
========================================================= */

document.addEventListener(
  "elvara:comparison-change",
  () => {
    handleComparisonInterfaceRefresh();
  }
);


document.addEventListener(
  "elvara:comparison-cleared",
  () => {
    handleComparisonInterfaceRefresh();
  }
);


/* =========================================================
   212. DYNAMIC LISTING REFRESH
========================================================= */

document.addEventListener(
  "elvara:property-results",
  () => {
    addComparisonButtonsToListingCards();
    initializeOpenComparisonButtons();
    updateAllComparisonButtons();
  }
);


/* =========================================================
   213. DYNAMIC DETAILS REFRESH
========================================================= */

document.addEventListener(
  "elvara:property-details-ready",
  (event) => {
    const property =
      event.detail?.property;

    if (!property) return;

    renderPropertyDetailsCompareButton(
      property
    );

    addComparisonButtonsToRelatedCards();
    initializeOpenComparisonButtons();
    updateAllComparisonButtons();
  }
);


/* =========================================================
   214. WINDOW STORAGE SYNCHRONIZATION
========================================================= */

function synchronizePropertyComparisonStorage(
  event
) {
  if (
    event.key !==
    propertyCompareStorageKey
  ) {
    return;
  }

  loadSavedPropertyComparison();

  handleComparisonInterfaceRefresh();
}


/* =========================================================
   215. INITIALIZE STORAGE SYNCHRONIZATION
========================================================= */

let comparisonStorageSyncInitialized =
  false;


function initializeComparisonStorageSync() {
  if (
    comparisonStorageSyncInitialized
  ) {
    return;
  }

  comparisonStorageSyncInitialized =
    true;

  window.addEventListener(
    "storage",
    synchronizePropertyComparisonStorage
  );
}


/* =========================================================
   216. INITIALIZE COMPLETE COMPARISON SYSTEM
========================================================= */

function initializePropertyComparisonSystem() {
  if (propertyComparisonInitialized) {
    refreshDynamicComparisonButtons();
    renderPropertyComparePanel();
    return;
  }

  propertyComparisonInitialized = true;

  injectPropertyComparisonStyles();
  loadSavedPropertyComparison();

  createPropertyComparePanel();
  createPropertyComparisonModal();

  initializePropertyComparisonEvents();
  initializeComparisonStorageSync();

  refreshDynamicComparisonButtons();
  renderPropertyComparePanel();
  updateAllComparisonButtons();
}


/* =========================================================
   217. RUN AFTER PROPERTY DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializePropertyComparisonSystem();
  },
  { once: true }
);


/* =========================================================
   218. COMPARISON FALLBACK INITIALIZATION
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializePropertyComparisonSystem();
  }
});


/* =========================================================
   219. PAGE RESTORE HANDLING
========================================================= */

window.addEventListener(
  "pageshow",
  (event) => {
    if (!event.persisted) return;

    loadSavedPropertyComparison();
    refreshDynamicComparisonButtons();
    renderPropertyComparePanel();
  }
);


/* =========================================================
   220. CLOSE COMPARISON UI BEFORE PAGE LEAVE
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    closePropertyComparePanel();
    closePropertyComparisonModal();
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 4B
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4C-1
   Recently Viewed Storage, Tracking and Data Helpers
========================================================= */


/* =========================================================
   221. RECENTLY VIEWED SETTINGS
========================================================= */

const maximumRecentlyViewedProperties = 6;

let recentlyViewedSystemInitialized =
  false;


/* =========================================================
   222. LOAD RECENTLY VIEWED PROPERTIES
========================================================= */

function loadRecentlyViewedProperties() {
  const storedPropertyIds =
    readStoredPropertyIds(
      propertyRecentlyViewedStorageKey
    );

  ElvaraProperties.recentlyViewed =
    storedPropertyIds
      .filter((propertyId) =>
        Boolean(
          findPropertyById(propertyId)
        )
      )
      .slice(
        0,
        maximumRecentlyViewedProperties
      );
}


/* =========================================================
   223. SAVE RECENTLY VIEWED PROPERTIES
========================================================= */

function saveRecentlyViewedProperties() {
  saveStoredPropertyIds(
    propertyRecentlyViewedStorageKey,
    ElvaraProperties.recentlyViewed
  );
}


/* =========================================================
   224. GET RECENTLY VIEWED PROPERTY OBJECTS
========================================================= */

/**
 * Convert stored property IDs into valid property objects.
 *
 * @param {string|null} excludedPropertyId
 * @returns {Object[]}
 */
function getRecentlyViewedProperties(
  excludedPropertyId = null
) {
  return ElvaraProperties.recentlyViewed
    .filter(
      (propertyId) =>
        propertyId !==
        excludedPropertyId
    )
    .map((propertyId) =>
      findPropertyById(propertyId)
    )
    .filter(Boolean);
}


/* =========================================================
   225. CHECK RECENTLY VIEWED STATUS
========================================================= */

/**
 * Check whether one property already exists
 * in the recently viewed collection.
 *
 * @param {string} propertyId
 * @returns {boolean}
 */
function isPropertyRecentlyViewed(
  propertyId
) {
  return ElvaraProperties.recentlyViewed.includes(
    propertyId
  );
}


/* =========================================================
   226. TRACK RECENTLY VIEWED PROPERTY
========================================================= */

/**
 * Add a property to the beginning of the
 * recently viewed collection.
 *
 * @param {string} propertyId
 * @returns {string[]}
 */
function trackRecentlyViewedProperty(
  propertyId
) {
  const property =
    findPropertyById(propertyId);

  if (!property) {
    return [
      ...ElvaraProperties.recentlyViewed,
    ];
  }

  /*
   Remove the property first so that reopening it
   moves it back to the beginning of the list.
  */
  ElvaraProperties.recentlyViewed =
    ElvaraProperties.recentlyViewed.filter(
      (storedPropertyId) =>
        storedPropertyId !== propertyId
    );

  ElvaraProperties.recentlyViewed.unshift(
    propertyId
  );

  ElvaraProperties.recentlyViewed =
    ElvaraProperties.recentlyViewed.slice(
      0,
      maximumRecentlyViewedProperties
    );

  saveRecentlyViewedProperties();

  dispatchRecentlyViewedChangeEvent(
    property
  );

  return [
    ...ElvaraProperties.recentlyViewed,
  ];
}


/* =========================================================
   227. RECENTLY VIEWED CHANGE EVENT
========================================================= */

function dispatchRecentlyViewedChangeEvent(
  property
) {
  document.dispatchEvent(
    new CustomEvent(
      "elvara:recently-viewed-change",
      {
        detail: {
          property: property
            ? {
                ...property,

                gallery: Array.isArray(
                  property.gallery
                )
                  ? [...property.gallery]
                  : [],

                amenities: Array.isArray(
                  property.amenities
                )
                  ? [...property.amenities]
                  : [],
              }
            : null,

          recentlyViewed: [
            ...ElvaraProperties
              .recentlyViewed,
          ],
        },
      }
    )
  );
}


/* =========================================================
   228. CLEAR RECENTLY VIEWED PROPERTIES
========================================================= */

function clearRecentlyViewedProperties() {
  if (
    ElvaraProperties.recentlyViewed
      .length === 0
  ) {
    return;
  }

  ElvaraProperties.recentlyViewed = [];

  saveRecentlyViewedProperties();

  document.dispatchEvent(
    new CustomEvent(
      "elvara:recently-viewed-cleared"
    )
  );
}


/* =========================================================
   229. REMOVE ONE RECENTLY VIEWED PROPERTY
========================================================= */

/**
 * Remove one property from recently viewed.
 *
 * @param {string} propertyId
 */
function removeRecentlyViewedProperty(
  propertyId
) {
  if (!propertyId) return;

  const previousLength =
    ElvaraProperties.recentlyViewed
      .length;

  ElvaraProperties.recentlyViewed =
    ElvaraProperties.recentlyViewed.filter(
      (storedPropertyId) =>
        storedPropertyId !== propertyId
    );

  if (
    previousLength ===
    ElvaraProperties.recentlyViewed
      .length
  ) {
    return;
  }

  saveRecentlyViewedProperties();

  document.dispatchEvent(
    new CustomEvent(
      "elvara:recently-viewed-removed",
      {
        detail: {
          propertyId,

          recentlyViewed: [
            ...ElvaraProperties
              .recentlyViewed,
          ],
        },
      }
    )
  );
}


/* =========================================================
   230. TRACK SELECTED DETAILS PROPERTY
========================================================= */

function trackSelectedPropertyAsViewed(
  property
) {
  if (
    !property ||
    !property.id ||
    !isPropertyDetailsPage()
  ) {
    return;
  }

  trackRecentlyViewedProperty(
    property.id
  );
}


/* =========================================================
   231. TRACK FROM DETAILS-READY EVENT
========================================================= */

document.addEventListener(
  "elvara:property-details-ready",
  (event) => {
    const property =
      event.detail?.property;

    if (!property) return;

    trackSelectedPropertyAsViewed(
      property
    );
  }
);


/* =========================================================
   232. TRACK FROM PROPERTY-SELECTED FALLBACK
========================================================= */

document.addEventListener(
  "elvara:property-selected",
  (event) => {
    const property =
      event.detail?.property;

    if (
      !property ||
      !isPropertyDetailsPage()
    ) {
      return;
    }

    /*
     Use a brief delay so the full property-details event
     gets the first opportunity to track the property.
    */
    window.setTimeout(() => {
      if (
        ElvaraProperties
          .recentlyViewed[0] !==
        property.id
      ) {
        trackRecentlyViewedProperty(
          property.id
        );
      }
    }, 80);
  }
);


/* =========================================================
   233. RECENTLY VIEWED STORAGE SYNCHRONIZATION
========================================================= */

function synchronizeRecentlyViewedStorage(
  event
) {
  if (
    event.key !==
    propertyRecentlyViewedStorageKey
  ) {
    return;
  }

  loadRecentlyViewedProperties();

  document.dispatchEvent(
    new CustomEvent(
      "elvara:recently-viewed-sync",
      {
        detail: {
          recentlyViewed: [
            ...ElvaraProperties
              .recentlyViewed,
          ],
        },
      }
    )
  );
}


/* =========================================================
   234. INITIALIZE RECENT STORAGE SYNC
========================================================= */

function initializeRecentlyViewedStorageSync() {
  window.addEventListener(
    "storage",
    synchronizeRecentlyViewedStorage
  );
}


/* =========================================================
   235. INITIALIZE RECENTLY VIEWED FOUNDATION
========================================================= */

function initializeRecentlyViewedFoundation() {
  if (
    recentlyViewedSystemInitialized
  ) {
    return;
  }

  recentlyViewedSystemInitialized =
    true;

  loadRecentlyViewedProperties();
  initializeRecentlyViewedStorageSync();

  const selectedProperty =
    findPropertyById(
      ElvaraProperties.selectedPropertyId
    );

  if (
    selectedProperty &&
    isPropertyDetailsPage()
  ) {
    trackSelectedPropertyAsViewed(
      selectedProperty
    );
  }
}


/* =========================================================
   236. RUN AFTER PROPERTY DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializeRecentlyViewedFoundation();
  },
  { once: true }
);


/* =========================================================
   237. RECENTLY VIEWED FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializeRecentlyViewedFoundation();
  }
});


/* =========================================================
   238. PAGE RESTORE SYNCHRONIZATION
========================================================= */

window.addEventListener(
  "pageshow",
  (event) => {
    if (!event.persisted) return;

    loadRecentlyViewedProperties();

    document.dispatchEvent(
      new CustomEvent(
        "elvara:recently-viewed-sync",
        {
          detail: {
            recentlyViewed: [
              ...ElvaraProperties
                .recentlyViewed,
            ],
          },
        }
      )
    );
  }
);


/* =========================================================
   END OF PROPERTIES.JS — PART 4C-1
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4C-2
   Recently Viewed Cards, Rendering and Clear Controls
========================================================= */


/* =========================================================
   239. RECENTLY VIEWED DOM ELEMENTS
========================================================= */

const recentlyViewedSection =
  propertySelect(
    "#recentlyViewedSection"
  );

const recentlyViewedGrid =
  propertySelect(
    "#recentlyViewedGrid"
  );

const recentlyViewedCount =
  propertySelect(
    "#recentlyViewedCount"
  );

const recentlyViewedClearButton =
  propertySelect(
    "#recentlyViewedClear"
  );

const recentlyViewedEmptyState =
  propertySelect(
    "#recentlyViewedEmpty"
  );


/* =========================================================
   240. RECENT CARD BADGE MARKUP
========================================================= */

function createRecentlyViewedBadgeMarkup(
  property
) {
  if (property.exclusive) {
    return `
      <span class="recent-property-badge recent-property-badge-gold">
        Exclusive
      </span>
    `;
  }

  if (property.newListing) {
    return `
      <span class="recent-property-badge">
        New Listing
      </span>
    `;
  }

  return `
    <span class="recent-property-badge">
      ${escapePropertyHtml(
        property.categoryLabel
      )}
    </span>
  `;
}


/* =========================================================
   241. RECENT PROPERTY PRIMARY SPEC
========================================================= */

function createRecentlyViewedPrimarySpec(
  property
) {
  if (property.category === "hotel") {
    return `
      <span>
        <i class="fa-solid fa-bed"></i>

        ${formatPropertyNumber(
          property.bedrooms
        )} Suites
      </span>
    `;
  }

  if (
    property.category === "commercial"
  ) {
    return `
      <span>
        <i class="fa-solid fa-building"></i>

        Commercial
      </span>
    `;
  }

  return `
    <span>
      <i class="fa-solid fa-bed"></i>

      ${formatPropertyNumber(
        property.bedrooms
      )} Beds
    </span>
  `;
}


/* =========================================================
   242. RECENT PROPERTY CARD MARKUP
========================================================= */

function createRecentlyViewedCardMarkup(
  property,
  index
) {
  const detailsUrl =
    createPropertyDetailsUrl(property);

  const displayPrice =
    property.displayPrice ||
    formatPropertyPrice(
      property.price
    );

  const displayArea =
    property.areaLabel ||
    formatPropertyArea(
      property.area
    );

  return `
    <article
      class="recent-property-card reveal-up"
      data-property-id="${escapePropertyHtml(
        property.id
      )}"
    >

      <a
        href="${escapePropertyHtml(
          detailsUrl
        )}"
        class="recent-property-media tilt-card"
        aria-label="View ${escapePropertyHtml(
          property.title
        )}"
      >

        <img
          src="${escapePropertyHtml(
            property.image
          )}"
          alt="${escapePropertyHtml(
            property.title
          )}"
          loading="lazy"
          decoding="async"
        >

        <div class="recent-property-overlay"></div>

        <div class="recent-property-badges">
          ${createRecentlyViewedBadgeMarkup(
            property
          )}
        </div>

        <span class="recent-property-number">
          ${String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

        <span class="recent-property-arrow">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>

      </a>


      <div class="recent-property-content">

        <div class="recent-property-location">

          <i class="fa-solid fa-location-dot"></i>

          <span>
            ${escapePropertyHtml(
              property.location
            )}
          </span>

        </div>


        <div class="recent-property-heading">

          <div>
            <small>
              ${escapePropertyHtml(
                property.categoryLabel
              )}
            </small>

            <h3>
              <a href="${escapePropertyHtml(
                detailsUrl
              )}">
                ${escapePropertyHtml(
                  property.title
                )}
              </a>
            </h3>
          </div>

          <strong>
            ${escapePropertyHtml(
              displayPrice
            )}
          </strong>

        </div>


        <div class="recent-property-specifications">

          ${createRecentlyViewedPrimarySpec(
            property
          )}

          <span>
            <i class="fa-solid fa-bath"></i>

            ${formatPropertyNumber(
              property.bathrooms
            )}

            ${
              property.category ===
              "commercial"
                ? "Facilities"
                : "Baths"
            }
          </span>

          <span>
            <i class="fa-solid fa-ruler-combined"></i>

            ${escapePropertyHtml(
              displayArea
            )}
          </span>

        </div>


        <div class="recent-property-footer">

          <span>
            ${escapePropertyHtml(
              property.reference
            )}
          </span>

          <button
            class="recent-property-remove"
            type="button"
            data-remove-recently-viewed="${escapePropertyHtml(
              property.id
            )}"
            aria-label="Remove ${escapePropertyHtml(
              property.title
            )} from recently viewed"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

        </div>

      </div>

    </article>
  `;
}


/* =========================================================
   243. UPDATE RECENTLY VIEWED COUNT
========================================================= */

function updateRecentlyViewedCount(
  count
) {
  if (!recentlyViewedCount) return;

  recentlyViewedCount.textContent =
    formatPropertyNumber(count);

  recentlyViewedCount.setAttribute(
    "aria-label",
    `${count} recently viewed properties`
  );
}


/* =========================================================
   244. UPDATE RECENTLY VIEWED EMPTY STATE
========================================================= */

function updateRecentlyViewedEmptyState(
  count
) {
  if (recentlyViewedEmptyState) {
    recentlyViewedEmptyState.hidden =
      count > 0;

    recentlyViewedEmptyState.setAttribute(
      "aria-hidden",
      String(count > 0)
    );
  }

  if (recentlyViewedSection) {
    recentlyViewedSection.classList.toggle(
      "has-recent-properties",
      count > 0
    );
  }

  if (recentlyViewedClearButton) {
    recentlyViewedClearButton.disabled =
      count === 0;

    recentlyViewedClearButton.setAttribute(
      "aria-disabled",
      String(count === 0)
    );
  }
}


/* =========================================================
   245. RENDER RECENTLY VIEWED PROPERTIES
========================================================= */

function renderRecentlyViewedProperties() {
  if (!recentlyViewedGrid) {
    return;
  }

  const currentPropertyId =
    isPropertyDetailsPage()
      ? ElvaraProperties
          .selectedPropertyId
      : null;

  const recentProperties =
    getRecentlyViewedProperties(
      currentPropertyId
    );

  recentlyViewedGrid.innerHTML =
    recentProperties
      .map(
        createRecentlyViewedCardMarkup
      )
      .join("");

  updateRecentlyViewedCount(
    recentProperties.length
  );

  updateRecentlyViewedEmptyState(
    recentProperties.length
  );

  initializeRecentlyViewedCards();
}


/* =========================================================
   246. RECENT CARD REVEAL
========================================================= */

function revealRecentlyViewedCards() {
  if (!recentlyViewedGrid) {
    return;
  }

  const recentCards =
    propertySelectAll(
      ".recent-property-card",
      recentlyViewedGrid
    );

  if (recentCards.length === 0) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    recentCards.forEach((card) => {
      card.classList.add(
        "is-visible"
      );
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries, cardObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          cardObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px",
      }
    );

  recentCards.forEach(
    (card, index) => {
      card.style.transitionDelay =
        `${(index % 3) * 80}ms`;

      observer.observe(card);
    }
  );
}


/* =========================================================
   247. INITIALIZE RECENT CARD INTERACTIONS
========================================================= */

function initializeRecentlyViewedCards() {
  revealRecentlyViewedCards();

  if (
    typeof initializeTiltCards ===
    "function"
  ) {
    initializeTiltCards();
  }

  if (
    typeof initializePropertyDepthEffects ===
    "function"
  ) {
    initializePropertyDepthEffects();
  }

  if (
    typeof prepareInternalPageLinks ===
    "function"
  ) {
    prepareInternalPageLinks();
  }
}


/* =========================================================
   248. REMOVE RECENT CARD CLICK
========================================================= */

function handleRecentlyViewedCardClick(
  event
) {
  const removeButton =
    event.target.closest(
      "[data-remove-recently-viewed]"
    );

  if (!removeButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const propertyId =
    removeButton.dataset
      .removeRecentlyViewed;

  if (!propertyId) return;

  removeRecentlyViewedProperty(
    propertyId
  );

  renderRecentlyViewedProperties();
}


/* =========================================================
   249. CLEAR RECENTLY VIEWED CLICK
========================================================= */

function initializeRecentlyViewedClearButton() {
  if (!recentlyViewedClearButton) {
    return;
  }

  if (
    recentlyViewedClearButton.dataset
      .listenerAttached === "true"
  ) {
    return;
  }

  recentlyViewedClearButton.dataset
    .listenerAttached = "true";

  recentlyViewedClearButton.addEventListener(
    "click",
    () => {
      clearRecentlyViewedProperties();
      renderRecentlyViewedProperties();
    }
  );
}


/* =========================================================
   250. INITIALIZE RECENT GRID EVENTS
========================================================= */

let recentlyViewedGridEventsInitialized =
  false;


function initializeRecentlyViewedGridEvents() {
  if (
    recentlyViewedGridEventsInitialized
  ) {
    return;
  }

  recentlyViewedGridEventsInitialized =
    true;

  recentlyViewedGrid?.addEventListener(
    "click",
    handleRecentlyViewedCardClick
  );

  initializeRecentlyViewedClearButton();
}


/* =========================================================
   251. RECENTLY VIEWED EVENT REFRESH
========================================================= */

function refreshRecentlyViewedInterface() {
  renderRecentlyViewedProperties();
}


/* =========================================================
   252. LISTEN FOR RECENTLY VIEWED CHANGES
========================================================= */

document.addEventListener(
  "elvara:recently-viewed-change",
  refreshRecentlyViewedInterface
);


document.addEventListener(
  "elvara:recently-viewed-removed",
  refreshRecentlyViewedInterface
);


document.addEventListener(
  "elvara:recently-viewed-cleared",
  refreshRecentlyViewedInterface
);


document.addEventListener(
  "elvara:recently-viewed-sync",
  refreshRecentlyViewedInterface
);


/* =========================================================
   253. RECENTLY VIEWED UI INITIALIZATION
========================================================= */

function initializeRecentlyViewedInterface() {
  const hasRecentlyViewedInterface =
    recentlyViewedSection ||
    recentlyViewedGrid ||
    recentlyViewedEmptyState;

  if (!hasRecentlyViewedInterface) {
    return;
  }

  initializeRecentlyViewedGridEvents();
  renderRecentlyViewedProperties();
}


/* =========================================================
   254. RUN AFTER PROPERTY DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializeRecentlyViewedInterface();
  },
  { once: true }
);


/* =========================================================
   255. RECENT UI FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializeRecentlyViewedInterface();
  }
});


/* =========================================================
   END OF PROPERTIES.JS — PART 4C-2
========================================================= */
/* =========================================================
   ÉLVARA ESTATES
   PROPERTIES JAVASCRIPT — PART 4C-3
   Recently Viewed Styles and Final properties.js Setup
========================================================= */


/* =========================================================
   256. INJECT RECENTLY VIEWED STYLES
========================================================= */

function injectRecentlyViewedStyles() {
  if (
    propertySelect(
      "#recentlyViewedStyles"
    )
  ) {
    return;
  }

  const styleElement =
    document.createElement("style");

  styleElement.id =
    "recentlyViewedStyles";

  styleElement.textContent = `
    .recently-viewed-section {
      position: relative;
      overflow: hidden;
      background: #f5f1e8;
    }

    .recently-viewed-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 42px;
    }

    .recently-viewed-header small {
      color: #9b7a42;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .recently-viewed-header h2 {
      margin-top: 8px;
      color: #101111;
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: clamp(
        40px,
        5vw,
        66px
      );
      font-weight: 500;
      line-height: 1;
    }

    .recently-viewed-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .recently-viewed-counter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      height: 42px;
      padding-inline: 12px;
      border: 1px solid
        rgba(16, 17, 17, 0.12);
      border-radius: 999px;
      background: #ffffff;
      color: #9b7a42;
      font-size: 9px;
      font-weight: 700;
    }

    .recently-viewed-clear {
      min-height: 42px;
      padding-inline: 17px;
      border: 1px solid
        rgba(16, 17, 17, 0.14);
      border-radius: 999px;
      background: transparent;
      color: #101111;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease,
        opacity 0.25s ease;
    }

    .recently-viewed-clear:hover:not(:disabled) {
      transform: translateY(-2px);
      border-color: #9b7a42;
      background: #101111;
      color: #ffffff;
    }

    .recently-viewed-clear:disabled {
      opacity: 0.42;
      cursor: not-allowed;
    }


    /* =====================================================
       RECENT GRID
    ===================================================== */

    .recently-viewed-grid {
      display: grid;
      grid-template-columns:
        repeat(3, minmax(0, 1fr));
      gap: 22px;
    }

    .recent-property-card {
      overflow: hidden;
      border: 1px solid
        rgba(16, 17, 17, 0.1);
      border-radius: 18px;
      background: #ffffff;
      box-shadow:
        0 16px 46px
        rgba(16, 17, 17, 0.08);
      transition:
        transform 0.4s ease,
        box-shadow 0.4s ease,
        border-color 0.4s ease;
    }

    .recent-property-card:hover {
      transform: translateY(-7px);
      border-color:
        rgba(155, 122, 66, 0.28);
      box-shadow:
        0 28px 68px
        rgba(16, 17, 17, 0.14);
    }

    .recent-property-media {
      position: relative;
      display: block;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #101111;
    }

    .recent-property-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition:
        transform 0.9s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        );
    }

    .recent-property-card:hover
    .recent-property-media img {
      transform: scale(1.075);
    }

    .recent-property-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          180deg,
          rgba(8, 9, 9, 0.06),
          rgba(8, 9, 9, 0.12) 48%,
          rgba(8, 9, 9, 0.7)
        );
    }


    /* =====================================================
       BADGES AND MEDIA ICONS
    ===================================================== */

    .recent-property-badges {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 2;
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }

    .recent-property-badge {
      display: inline-flex;
      align-items: center;
      min-height: 29px;
      padding: 6px 11px;
      border: 1px solid
        rgba(255, 255, 255, 0.22);
      border-radius: 999px;
      background:
        rgba(8, 9, 9, 0.4);
      color: #ffffff;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter:
        blur(10px);
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .recent-property-badge-gold {
      border-color: transparent;
      background: #c8a96b;
      color: #080909;
    }

    .recent-property-number {
      position: absolute;
      top: 17px;
      right: 17px;
      z-index: 2;
      color:
        rgba(255, 255, 255, 0.75);
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 21px;
    }

    .recent-property-arrow {
      position: absolute;
      right: 17px;
      bottom: 17px;
      z-index: 2;
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      background:
        rgba(255, 255, 255, 0.92);
      color: #101111;
      transition:
        transform 0.4s ease,
        background-color 0.25s ease;
    }

    .recent-property-card:hover
    .recent-property-arrow {
      transform: rotate(-35deg);
      background: #c8a96b;
    }


    /* =====================================================
       RECENT CARD CONTENT
    ===================================================== */

    .recent-property-content {
      padding: 23px 21px 22px;
    }

    .recent-property-location {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
      color: #9b7a42;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .recent-property-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 20px;
    }

    .recent-property-heading > div {
      min-width: 0;
    }

    .recent-property-heading small {
      color: #8a8a83;
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .recent-property-heading h3 {
      margin-top: 6px;
      color: #101111;
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 28px;
      font-weight: 600;
      line-height: 1.04;
    }

    .recent-property-heading strong {
      flex-shrink: 0;
      color: #9b7a42;
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 19px;
      font-weight: 600;
    }

    .recent-property-specifications {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding-top: 17px;
      border-top: 1px solid
        rgba(16, 17, 17, 0.1);
    }

    .recent-property-specifications span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #74746e;
      font-size: 8px;
      font-weight: 600;
    }

    .recent-property-specifications i {
      color: #9b7a42;
    }


    /* =====================================================
       RECENT CARD FOOTER
    ===================================================== */

    .recent-property-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-top: 18px;
      padding-top: 16px;
      border-top: 1px solid
        rgba(16, 17, 17, 0.08);
    }

    .recent-property-footer > span {
      color: #91918b;
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }

    .recent-property-remove {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      border: 1px solid
        rgba(16, 17, 17, 0.12);
      border-radius: 50%;
      background: #ffffff;
      color: #101111;
      font-size: 10px;
      transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease,
        color 0.25s ease;
    }

    .recent-property-remove:hover {
      transform: rotate(8deg);
      border-color: #9b7a42;
      background: #101111;
      color: #ffffff;
    }


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    .recently-viewed-empty {
      display: grid;
      place-items: center;
      min-height: 280px;
      padding: 48px 24px;
      border: 1px solid
        rgba(16, 17, 17, 0.1);
      border-radius: 22px;
      background:
        rgba(255, 255, 255, 0.7);
      text-align: center;
    }

    .recently-viewed-empty[hidden] {
      display: none;
    }

    .recently-viewed-empty i {
      margin-bottom: 18px;
      color: #9b7a42;
      font-size: 35px;
    }

    .recently-viewed-empty h3 {
      color: #101111;
      font-family:
        "Cormorant Garamond",
        serif;
      font-size: 32px;
      font-weight: 600;
    }

    .recently-viewed-empty p {
      max-width: 430px;
      margin-top: 10px;
      color: #74746e;
      font-size: 12px;
      line-height: 1.75;
    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 991px) {
      .recently-viewed-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
      }

      .recent-property-card:last-child:nth-child(odd) {
        grid-column: span 2;
      }

      .recent-property-card:last-child:nth-child(odd)
      .recent-property-media {
        aspect-ratio: 16 / 7;
      }
    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 767px) {
      .recently-viewed-header {
        align-items: flex-start;
        flex-direction: column;
        gap: 22px;
      }

      .recently-viewed-actions {
        width: 100%;
        justify-content: space-between;
      }

      .recently-viewed-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .recent-property-card:last-child:nth-child(odd) {
        grid-column: auto;
      }

      .recent-property-card:last-child:nth-child(odd)
      .recent-property-media {
        aspect-ratio: 4 / 3;
      }

      .recent-property-heading {
        flex-direction: column;
        gap: 9px;
      }

      .recent-property-heading strong {
        align-self: flex-start;
      }
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {
      .recent-property-card,
      .recent-property-media img,
      .recent-property-arrow,
      .recent-property-remove,
      .recently-viewed-clear {
        transition: none;
      }
    }
  `;

  document.head.appendChild(
    styleElement
  );
}


/* =========================================================
   257. REFRESH ALL PROPERTY ACTION BUTTONS
========================================================= */

function refreshAllPropertyActionButtons() {
  if (
    typeof addFavoriteButtonsToListingCards ===
    "function"
  ) {
    addFavoriteButtonsToListingCards();
  }

  if (
    typeof addFavoriteButtonsToRelatedCards ===
    "function"
  ) {
    addFavoriteButtonsToRelatedCards();
  }

  if (
    typeof addComparisonButtonsToListingCards ===
    "function"
  ) {
    addComparisonButtonsToListingCards();
  }

  if (
    typeof addComparisonButtonsToRelatedCards ===
    "function"
  ) {
    addComparisonButtonsToRelatedCards();
  }

  if (
    typeof updateAllFavoriteButtons ===
    "function"
  ) {
    updateAllFavoriteButtons();
  }

  if (
    typeof updateAllComparisonButtons ===
    "function"
  ) {
    updateAllComparisonButtons();
  }
}


/* =========================================================
   258. FINAL PROPERTY EVENT REFRESH
========================================================= */

document.addEventListener(
  "elvara:property-results",
  () => {
    refreshAllPropertyActionButtons();
  }
);


document.addEventListener(
  "elvara:property-details-ready",
  () => {
    refreshAllPropertyActionButtons();
    renderRecentlyViewedProperties();
  }
);


/* =========================================================
   259. INITIALIZE RECENTLY VIEWED COMPLETE SYSTEM
========================================================= */

function initializeCompleteRecentlyViewedSystem() {
  initializeRecentlyViewedFoundation();
  injectRecentlyViewedStyles();
  initializeRecentlyViewedInterface();
}


/* =========================================================
   260. FINAL PROPERTY STORAGE SYNCHRONIZATION
========================================================= */

function synchronizeAllPropertyStorage(
  event
) {
  if (
    event.key ===
    propertyFavoritesStorageKey
  ) {
    loadSavedPropertyFavorites();
    updateAllFavoriteButtons();
  }

  if (
    event.key ===
    propertyCompareStorageKey
  ) {
    loadSavedPropertyComparison();
    handleComparisonInterfaceRefresh();
  }

  if (
    event.key ===
    propertyRecentlyViewedStorageKey
  ) {
    loadRecentlyViewedProperties();
    renderRecentlyViewedProperties();
  }
}


/* =========================================================
   261. FINAL PROPERTIES APPLICATION EVENT
========================================================= */

function dispatchPropertiesApplicationReady() {
  document.dispatchEvent(
    new CustomEvent(
      "elvara:properties-application-ready",
      {
        detail: {
          totalProperties:
            ElvaraProperties.properties.length,

          filteredProperties:
            ElvaraProperties
              .filteredProperties.length,

          favorites:
            ElvaraProperties.favorites.size,

          comparison:
            ElvaraProperties.comparison.size,

          recentlyViewed:
            ElvaraProperties
              .recentlyViewed.length,

          selectedPropertyId:
            ElvaraProperties
              .selectedPropertyId,
        },
      }
    )
  );
}


/* =========================================================
   262. FINAL PROPERTIES INITIALIZATION GUARD
========================================================= */

let completePropertiesApplicationInitialized =
  false;


/* =========================================================
   263. INITIALIZE COMPLETE PROPERTIES APPLICATION
========================================================= */

function initializeCompletePropertiesApplication() {
  if (
    completePropertiesApplicationInitialized
  ) {
    refreshAllPropertyActionButtons();
    renderRecentlyViewedProperties();
    return;
  }

  completePropertiesApplicationInitialized =
    true;

  initializePropertyFavoriteSystem();
  initializePropertyComparisonSystem();
  initializeCompleteRecentlyViewedSystem();

  refreshAllPropertyActionButtons();

  window.addEventListener(
    "storage",
    synchronizeAllPropertyStorage
  );

  dispatchPropertiesApplicationReady();
}


/* =========================================================
   264. RUN COMPLETE APPLICATION AFTER DATA READY
========================================================= */

document.addEventListener(
  "elvara:properties-ready",
  () => {
    initializeCompletePropertiesApplication();
  },
  { once: true }
);


/* =========================================================
   265. COMPLETE APPLICATION FALLBACK
========================================================= */

propertyDocumentReady(() => {
  if (
    ElvaraProperties.properties.length >
      0
  ) {
    initializeCompletePropertiesApplication();
  }
});


/* =========================================================
   266. PAGE RESTORE REFRESH
========================================================= */

window.addEventListener(
  "pageshow",
  (event) => {
    if (!event.persisted) return;

    loadSavedPropertyFavorites();
    loadSavedPropertyComparison();
    loadRecentlyViewedProperties();

    refreshAllPropertyActionButtons();
    renderPropertyComparePanel();
    renderRecentlyViewedProperties();
  }
);


/* =========================================================
   267. FINAL CLEANUP
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    if (propertySearchTimer) {
      window.clearTimeout(
        propertySearchTimer
      );
    }

    savePropertyFavorites();
    savePropertyComparison();
    saveRecentlyViewedProperties();
  }
);


/* =========================================================
   END OF PROPERTIES.JS
========================================================= */
 
