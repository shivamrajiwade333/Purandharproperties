export type Language = 'en' | 'mr' | 'hi';

export interface TranslationKeys {
  // Navigation
  navHome: string;
  navProperties: string;
  navBuy: string;
  navRent: string;
  navCommercial: string;
  navContact: string;
  navAdminPortal: string;
  navSavedFavorites: string;
  contactAgent: string;

  // Hero Section
  heroPill: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  allProperties: string;
  buyProperty: string;
  rentProperty: string;
  locationArea: string;
  locationPlaceholder: string;
  propertyType: string;
  allTypes: string;
  searchButton: string;

  // Property Card & Listing
  featured: string;
  forSale: string;
  forRent: string;
  priceOnRequest: string;
  beds: string;
  baths: string;
  area: string;
  viewDetails: string;
  videoTour: string;

  // Homepage Sections
  featuredTitle: string;
  featuredSubtitle: string;
  exploreFeatured: string;
  browseByTypeTitle: string;
  browseByTypeSubtitle: string;
  latestListingsTitle: string;
  latestListingsSubtitle: string;
  viewAllListings: string;
  exploreVillagesTitle: string;
  exploreVillagesSubtitle: string;
  advantageTitle: string;
  whyChooseUsTitle: string;
  
  // Advantage Points
  adv1Title: string;
  adv1Desc: string;
  adv2Title: string;
  adv2Desc: string;
  adv3Title: string;
  adv3Desc: string;
  adv4Title: string;
  adv4Desc: string;

  // Property Detail View
  keySpecs: string;
  bedrooms: string;
  bathrooms: string;
  builtUpArea: string;
  carpetArea: string;
  furnishing: string;
  parking: string;
  floor: string;
  listingTypeLabel: string;
  descriptionTitle: string;
  amenitiesTitle: string;
  locationMapTitle: string;
  contactAgentTitle: string;
  chatWhatsapp: string;
  callAgent: string;
  interestedTitle: string;
  fullNameReq: string;
  phoneReq: string;
  emailReq: string;
  messageReq: string;
  sendEnquiry: string;
  sendingEnquiry: string;
  enquirySuccessMsg: string;

  // Footer
  footerDesc: string;
  quickLinks: string;
  propertyTypes: string;
  contactInfo: string;
  allRightsReserved: string;
  
  // Search Page
  searchCatalogTitle: string;
  searchCatalogSubtitle: string;
  filterProperties: string;
  resetFilters: string;
  keywordSearch: string;
  priceRange: string;
  minPrice: string;
  maxPrice: string;
  anyBhk: string;
  anyFurnishing: string;
  clearFilters: string;
  noPropertiesFound: string;
  noPropertiesDesc: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation
    navHome: 'Home',
    navProperties: 'Properties',
    navBuy: 'Buy',
    navRent: 'Rent',
    navCommercial: 'Commercial',
    navContact: 'Contact',
    navAdminPortal: 'Admin Portal',
    navSavedFavorites: 'Saved Favorites',
    contactAgent: 'Contact Us',

    // Hero Section
    heroPill: 'Verified Real Estate Across Purandhar Taluka (Saswad, Jejuri, Dive...)',
    heroTitlePrefix: "Find a Place You'll Love in",
    heroTitleHighlight: 'Purandhar Taluka',
    heroSubtitle: 'Explore verified homes, apartments, villas, agricultural plots, and commercial spaces across Purandhar Taluka.',
    allProperties: 'ALL PROPERTIES',
    buyProperty: 'BUY PROPERTY',
    rentProperty: 'RENT PROPERTY',
    locationArea: 'Location / Area',
    locationPlaceholder: 'Saswad, Jejuri, Dive...',
    propertyType: 'Property Type',
    allTypes: 'All Types',
    searchButton: 'SEARCH',

    // Property Card & Listing
    featured: 'FEATURED',
    forSale: 'FOR SALE',
    forRent: 'FOR RENT',
    priceOnRequest: 'Price on Request',
    beds: 'Beds',
    baths: 'Baths',
    area: 'Area',
    viewDetails: 'View Details',
    videoTour: 'Video Tour',

    // Homepage Sections
    featuredTitle: 'Featured Properties in Purandhar',
    featuredSubtitle: 'Top verified homes, plots, and commercial units across Saswad, Jejuri, Narayanpur, and Dive.',
    exploreFeatured: 'Explore All Featured',
    browseByTypeTitle: 'Browse Properties by Type',
    browseByTypeSubtitle: 'Discover apartments, agricultural plots, and farmhouses tailored to Purandhar Taluka.',
    latestListingsTitle: 'Latest Property Listings in Purandhar',
    latestListingsSubtitle: 'Freshly added homes, apartments, plots, and shops across Purandhar Taluka.',
    viewAllListings: 'View All Listings',
    exploreVillagesTitle: 'Explore Properties Across Purandhar Taluka',
    exploreVillagesSubtitle: 'Discover real estate listings across the major towns and villages of Purandhar.',
    advantageTitle: 'THE PURANDHAR PROPERTIES ADVANTAGE',
    whyChooseUsTitle: 'Why Homebuyers & Investors Trust Purandhar Properties',

    // Advantage Points
    adv1Title: '100% Purandhar Local Focus',
    adv1Desc: 'Dedicated exclusively to verified properties, NA plots, and homes across Purandhar Taluka.',
    adv2Title: 'Direct Owner & Agent Contact',
    adv2Desc: 'Connect instantly via Call or WhatsApp directly with verified property owners and local agents in Purandhar.',
    adv3Title: 'HD Virtual Video Tours',
    adv3Desc: 'Experience full-screen property video tours before taking the time to schedule on-site visits in Saswad or Jejuri.',
    adv4Title: 'End-to-End Assistance',
    adv4Desc: 'From title verification to 7/12 land extract checks, our team guides you at every step in Purandhar.',

    // Property Detail View
    keySpecs: 'Key Property Specifications',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    builtUpArea: 'Built-up Area',
    carpetArea: 'Carpet Area',
    furnishing: 'Furnishing',
    parking: 'Parking',
    floor: 'Floor',
    listingTypeLabel: 'Listing Type',
    descriptionTitle: 'Property Description',
    amenitiesTitle: 'Amenities & Features',
    locationMapTitle: 'Property Location & Map',
    contactAgentTitle: 'CONTACT OWNER / AGENT',
    chatWhatsapp: 'WhatsApp Chat',
    callAgent: 'Call Agent',
    interestedTitle: 'Interested in this property?',
    fullNameReq: 'Your Full Name *',
    phoneReq: 'Phone Number *',
    emailReq: 'Email Address *',
    messageReq: 'Your Message *',
    sendEnquiry: 'Send Enquiry',
    sendingEnquiry: 'Sending...',
    enquirySuccessMsg: 'Enquiry Submitted Successfully!',

    // Footer
    footerDesc: 'Your trusted real estate portal for Purandhar Taluka & Pune region. We connect homebuyers, tenants, and investors with verified residential properties, farmhouses, commercial spaces, and NA plots.',
    quickLinks: 'Quick Links',
    propertyTypes: 'Property Types',
    contactInfo: 'Contact Info',
    allRightsReserved: 'All rights reserved.',

    // Search Page
    searchCatalogTitle: 'Search Properties',
    searchCatalogSubtitle: 'verified properties matching your filters',
    filterProperties: 'Filter Properties',
    resetFilters: 'Reset',
    keywordSearch: 'Keyword Search',
    priceRange: 'Price Range (₹)',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    anyBhk: 'Any BHK',
    anyFurnishing: 'Any Furnishing',
    clearFilters: 'Clear Filters',
    noPropertiesFound: 'No properties found',
    noPropertiesDesc: "We couldn't find any property listings matching your selected search criteria. Try adjusting or clearing your filters."
  },

  mr: {
    // Navigation
    navHome: 'मुख्यपृष्ठ',
    navProperties: 'सर्व मालमत्ता',
    navBuy: 'खरेदी करा',
    navRent: 'भाड्याने घ्या',
    navCommercial: 'व्यापारी जागा',
    navContact: 'संपर्क',
    navAdminPortal: 'ॲडमिन पोर्टल',
    navSavedFavorites: 'जतन केलेल्या मालमत्ता',
    contactAgent: 'संपर्क साधा',

    // Hero Section
    heroPill: 'पुरंदर तालुक्यात १००% पडताळणी केलेल्या मालमत्ता (सासवड, जेजुरी, दिवे...)',
    heroTitlePrefix: 'तुमच्या स्वप्नातील घर शोधा',
    heroTitleHighlight: 'पुरंदर तालुक्यात',
    heroSubtitle: 'सासवड, जेजुरी, नारायणपूर, दिवे, वेलसर आणि संपूर्ण पुरंदर तालुक्यातील घरे, फ्लॅट्स, शेतजमिनी, प्लॉट आणि दुकाने शोधा.',
    allProperties: 'सर्व मालमत्ता',
    buyProperty: 'खरेदी करा',
    rentProperty: 'भाड्याने घ्या',
    locationArea: 'ठिकाण / परिसर',
    locationPlaceholder: 'सासवड, जेजुरी, दिवे...',
    propertyType: 'मालमत्तेचा प्रकार',
    allTypes: 'सर्व प्रकार',
    searchButton: 'शोधा',

    // Property Card & Listing
    featured: 'खास मालमत्ता',
    forSale: 'विक्रीसाठी',
    forRent: 'भाड्याने देणे',
    priceOnRequest: 'किंमत विचारा',
    beds: 'बेडरूम',
    baths: 'बाथरूम',
    area: 'क्षेत्रफळ',
    viewDetails: 'तपशील पहा',
    videoTour: 'व्हिडिओ टूर',

    // Homepage Sections
    featuredTitle: 'पुरंदर तालुक्यातील प्रमुख मालमत्ता',
    featuredSubtitle: 'सासवड, जेजुरी, नारायणपूर आणि दिवे परिसरातील सर्वोत्तम पडताळणी केलेल्या मालमत्ता.',
    exploreFeatured: 'सर्व खास मालमत्ता पहा',
    browseByTypeTitle: 'प्रकारानुसार मालमत्ता शोधा',
    browseByTypeSubtitle: 'फ्लॅट्स, बंगले, एन.ए. प्लॉट्स, आणि शेतजमिनी तुमच्या पसंतीनुसार.',
    latestListingsTitle: 'पुरंदरमधील नवीन मालमत्ता',
    latestListingsSubtitle: 'नुकत्याच जोडलेल्या घरे, प्लॉट्स आणि व्यापारी जागा.',
    viewAllListings: 'सर्व जाहिराती पहा',
    exploreVillagesTitle: 'पुरंदर तालुक्यातील प्रमुख गावे व शहरे',
    exploreVillagesSubtitle: 'सासवड, जेजुरी, नारायणपूर, दिवे परिसरातील रिअल इस्टेट.',
    advantageTitle: 'पुरंदर प्रॉपर्टीजचे खास वैशिष्ट्य',
    whyChooseUsTitle: 'ग्राहक पुरंदर प्रॉपर्टीजवर विश्वास का ठेवतात?',

    // Advantage Points
    adv1Title: '१००% पुरंदर तालुका फोकस',
    adv1Desc: 'केवळ पुरंदर तालुक्यातील पडताळणी केलेल्या जागा, घरे आणि प्लॉट्स.',
    adv2Title: 'थेट मालक व एजंट संपर्क',
    adv2Desc: 'व्हॉट्सॲप किंवा फोनवरून थेट मालकांशी आणि स्थानिक एजंटशी संपर्क साधा.',
    adv3Title: 'एचडी व्हिडिओ टूर',
    adv3Desc: 'जागेवर जाण्यापूर्वी संपूर्ण मालमत्तेचा घरबसल्या व्हिडिओ पहा.',
    adv4Title: 'पूर्ण कायदेशीर मदत',
    adv4Desc: '७/१२ उतारा तपासणीपासून ते दस्त नोंदणीपर्यंत मोलाचे मार्गदर्शन.',

    // Property Detail View
    keySpecs: 'मालमत्तेची मुख्य वैशिष्ट्ये',
    bedrooms: 'बेडरूम्स',
    bathrooms: 'बाथरूम्स',
    builtUpArea: 'एकूण क्षेत्रफळ',
    carpetArea: 'कार्पेट क्षेत्रफळ',
    furnishing: 'फर्निशिंग स्थिती',
    parking: 'पार्किंग',
    floor: 'मजला',
    listingTypeLabel: 'प्रकार',
    descriptionTitle: 'मालमत्तेची माहिती',
    amenitiesTitle: 'सुविधा व वैशिष्ट्ये',
    locationMapTitle: 'नकाशा व अचूक ठिकाण',
    contactAgentTitle: 'मालक / एजंटशी संपर्क साधा',
    chatWhatsapp: 'व्हॉट्सॲप चॅट',
    callAgent: 'कॉल करा',
    interestedTitle: 'या मालमत्तेत रस आहे का?',
    fullNameReq: 'तुमचे पूर्ण नाव *',
    phoneReq: 'फोन नंबर *',
    emailReq: 'ईमेल पत्ता *',
    messageReq: 'तुमचा संदेश *',
    sendEnquiry: 'माहिती पाठवा',
    sendingEnquiry: 'पाठवत आहे...',
    enquirySuccessMsg: 'तुमची विचारणा यशस्वीरीत्या पाठवली गेली आहे!',

    // Footer
    footerDesc: 'पुरंदर तालुका आणि पुणे परिसरातील विश्वासार्ह रिअल इस्टेट पोर्टल. खरेदीदार, भाडेकरू आणि गुंतवणूकदारांना योग्य मालमत्ता मिळवून देणारी संस्था.',
    quickLinks: 'महत्त्वाच्या लिंक्स',
    propertyTypes: 'मालमत्ता प्रकार',
    contactInfo: 'संपर्क माहिती',
    allRightsReserved: 'सर्व हक्क राखीव.',

    // Search Page
    searchCatalogTitle: 'मालमत्ता शोधा',
    searchCatalogSubtitle: 'तुमच्या शोधानुसार उपलब्ध मालमत्ता',
    filterProperties: 'फिल्टर वापरा',
    resetFilters: 'रीसेट करा',
    keywordSearch: 'शब्दावरून शोधा',
    priceRange: 'किंमत मर्यादा (₹)',
    minPrice: 'किमान किंमत',
    maxPrice: 'कमाल किंमत',
    anyBhk: 'कोणतेही BHK',
    anyFurnishing: 'कोणतीही स्थिती',
    clearFilters: 'फिल्टर हटवा',
    noPropertiesFound: 'मालमत्ता सापडली नाही',
    noPropertiesDesc: 'तुमच्या शोधानुसार कोणतीही जाहिरात उपलब्ध नाही. कृपया फिल्टर बदलून पहा.'
  },

  hi: {
    // Navigation
    navHome: 'होम',
    navProperties: 'सभी प्रॉपर्टीज',
    navBuy: 'खरीदें',
    navRent: 'किराए पर लें',
    navCommercial: 'कमर्शियल',
    navContact: 'संपर्क',
    navAdminPortal: 'एडमिन पोर्टल',
    navSavedFavorites: 'सेव की गई प्रॉपर्टीज',
    contactAgent: 'संपर्क करें',

    // Hero Section
    heroPill: 'पुरंदर तालुका में 100% सत्यापित प्रॉपर्टीज (सासवड, जेजुरी, दिवे...)',
    heroTitlePrefix: 'अपने सपनों का घर खोजें',
    heroTitleHighlight: 'पुरंदर तालुका में',
    heroSubtitle: 'सासवड, जेजुरी, नारायणपुर और पूरे पुरंदर तालुका में सत्यापित घर, प्लॉट्स, विला और दुकानें खोजें।',
    allProperties: 'सभी प्रॉपर्टीज',
    buyProperty: 'खरीदें',
    rentProperty: 'किराए पर लें',
    locationArea: 'स्थान / क्षेत्र',
    locationPlaceholder: 'सासवड, जेजुरी, दिवे...',
    propertyType: 'प्रॉपर्टी का प्रकार',
    allTypes: 'सभी प्रकार',
    searchButton: 'खोजें',

    // Property Card & Listing
    featured: 'खास प्रॉपर्टी',
    forSale: 'बिक्री के लिए',
    forRent: 'किराए पर',
    priceOnRequest: 'कीमत पूछें',
    beds: 'कमरे',
    baths: 'बाथरूम',
    area: 'क्षेत्रफल',
    viewDetails: 'विवरण देखें',
    videoTour: 'वीडियो टूर',

    // Homepage Sections
    featuredTitle: 'पुरंदर तालुका की प्रमुख प्रॉपर्टीज',
    featuredSubtitle: 'सासवड, जेजुरी, नारायणपुर और दिवे की सर्वश्रेष्ठ सत्यापित प्रॉपर्टीज।',
    exploreFeatured: 'सभी खास प्रॉपर्टीज देखें',
    browseByTypeTitle: 'प्रकार के अनुसार खोजें',
    browseByTypeSubtitle: 'अपार्टमेंट्स, विला, एन.ए. प्लॉट्स और फार्महाउस अपनी पसंद के अनुसार।',
    latestListingsTitle: 'पुरंदर में नई प्रॉपर्टीज',
    latestListingsSubtitle: 'हाल ही में जोड़ी गई घर, प्लॉट्स और कमर्शियल दुकानें।',
    viewAllListings: 'सभी लिस्टिंग देखें',
    exploreVillagesTitle: 'पुरंदर तालुका के प्रमुख क्षेत्र',
    exploreVillagesSubtitle: 'सासवड, जेजुरी, नारायणपुर और दिवे में रियल एस्टेट।',
    advantageTitle: 'पुरंदर प्रॉपर्टीज की विशेषता',
    whyChooseUsTitle: 'लोग पुरंदर प्रॉपर्टीज पर भरोसा क्यों करते हैं?',

    // Advantage Points
    adv1Title: '100% पुरंदर लोकल फोकस',
    adv1Desc: 'विशेष रूप से पुरंदर तालुका की सत्यापित प्रॉपर्टीज और प्लॉट्स।',
    adv2Title: 'डायरेक्ट मालिक व एजेंट संपर्क',
    adv2Desc: 'व्हाट्सएप या कॉल के जरिए सीधे प्रॉपर्टी मालिक से संपर्क करें।',
    adv3Title: 'एचडी वीडियो टूर',
    adv3Desc: 'साइट विजिट करने से पहले घर बैठे पूरा वीडियो टूर देखें।',
    adv4Title: 'पूरी सहायता',
    adv4Desc: '7/12 खतौनी सत्यापन से लेकर रजिस्ट्री तक पूर्ण मार्गदर्शन।',

    // Property Detail View
    keySpecs: 'प्रॉपर्टी की मुख्य विशेषताएं',
    bedrooms: 'बेडरूम',
    bathrooms: 'बाथरूम',
    builtUpArea: 'कुल क्षेत्रफल',
    carpetArea: 'कारपेट क्षेत्रफल',
    furnishing: 'फर्निशिंग स्थिति',
    parking: 'पार्किंग',
    floor: 'मंजिल',
    listingTypeLabel: 'प्रकार',
    descriptionTitle: 'प्रॉपर्टी विवरण',
    amenitiesTitle: 'सुविधाएं व विशेषताएं',
    locationMapTitle: 'मैप व सटीक लोकेशन',
    contactAgentTitle: 'मालिक / एजेंट से संपर्क करें',
    chatWhatsapp: 'व्हाट्सएप चैट',
    callAgent: 'कॉल करें',
    interestedTitle: 'क्या आप इसमें रुचि रखते हैं?',
    fullNameReq: 'आपका पूरा नाम *',
    phoneReq: 'फोन नंबर *',
    emailReq: 'ईमेल पता *',
    messageReq: 'आपका संदेश *',
    sendEnquiry: 'जानकारी भेजें',
    sendingEnquiry: 'भेज रहे हैं...',
    enquirySuccessMsg: 'आपकी पूछताछ सफलतापूर्वक भेज दी गई है!',

    // Footer
    footerDesc: 'पुरंदर तालुका और पुणे क्षेत्र का विश्वसनीय रियल एस्टेट पोर्टल। खरीदारों और किरायेदारों को सही प्रॉपर्टी से जोड़ने वाला माध्यम।',
    quickLinks: 'महत्वपूर्ण लिंक्स',
    propertyTypes: 'प्रॉपर्टी प्रकार',
    contactInfo: 'संपर्क जानकारी',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',

    // Search Page
    searchCatalogTitle: 'प्रॉपर्टी खोजें',
    searchCatalogSubtitle: 'आपके सर्च फ़िल्टर के अनुसार उपलब्ध लिस्टिंग',
    filterProperties: 'फ़िल्टर लागू करें',
    resetFilters: 'रीसेट करें',
    keywordSearch: 'कीवर्ड से खोजें',
    priceRange: 'कीमत सीमा (₹)',
    minPrice: 'न्यूनतम कीमत',
    maxPrice: 'अधिकतम कीमत',
    anyBhk: 'कोई भी BHK',
    anyFurnishing: 'कोई भी स्थिति',
    clearFilters: 'फ़िल्टर हटाएं',
    noPropertiesFound: 'कोई प्रॉपर्टी नहीं मिली',
    noPropertiesDesc: 'आपकी सर्च के अनुसार कोई लिस्टिंग नहीं मिली। कृपया फ़िल्टर बदलकर देखें।'
  }
};
