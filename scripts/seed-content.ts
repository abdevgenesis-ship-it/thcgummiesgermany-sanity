import 'dotenv/config'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '1ebrlrsf',
  dataset: 'production',
  apiVersion: '2025-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function rng() {
  return Math.random().toString(36).slice(2, 9)
}

function blocks(...texts: string[]) {
  return texts.map((text) => ({
    _type: 'block' as const,
    _key: `b${rng()}`,
    style: 'normal',
    markDefs: [] as never[],
    children: [{_type: 'span' as const, _key: `s${rng()}`, marks: [] as never[], text}],
  }))
}

async function upsert(doc: Record<string, unknown>) {
  const result = await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✅ ${result._type} (${result._id})`)
  return result
}

async function seed() {
  console.log('🌱 Seeding THCGummiesGermany content into Sanity…\n')

  // ─── 1. Site Settings ────────────────────────────────────────────────────
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    announcementBar:
      'Fast 48-hour tracked delivery across Germany, DACH & Europe — priority same-day dispatch available.',
    announcementHref: '/shipping',
    footerWarningText:
      'All products on THCGummiesGermany.com are intended strictly for distribution to licensed commercial business entities and adult consumers of legal age (18+). Not for sale to minors. THC products may cause impairment. Do not drive or operate heavy machinery. Keep out of reach of children.',
    footerComplianceText:
      'THCGUMMIESGERMANY operates as a B2B master distributor of premium THC gummies and cannabis edibles in compliance with the German Cannabis Act (CanG) and applicable EU regulations. Buyers are responsible for local compliance in their jurisdiction.',
    homepageBadge: 'THCGummiesGermany',
    homepageHeading: 'THC Gummies Germany — Your #1 Wholesale & Bulk Source for Premium Cannabis Edibles',
    homepageSubheading:
      'Buy Premium THC Gummies, Weed Gummies, and Cannabis Edibles at the Best Wholesale Prices with Guaranteed 48-Hour EU Delivery.',
    homepageNextStepTitle: 'Shop Our Bulk Gummies Inventory',
    homepageNextStepDescription:
      'Browse bulk THC gummies, weed gummies, and cannabis edibles for B2B retailers and distributors across Germany, DACH, and Europe.',
  })

  // ─── 2. Home Page ────────────────────────────────────────────────────────
  await upsert({
    _id: 'ff42da08-7a52-4d28-9f62-016a68ca4167',
    _type: 'homePage',
    heroBadge: 'THCGummiesGermany.com',
    heroHeading: 'THC Gummies Germany — Your #1 Wholesale & Bulk Source for Premium Edibles',
    heroSubheading:
      'Premium Edibles, Unbeatable Prices, and Guaranteed 48h Delivery Across Germany and Europe. Buy Canapuff, Tyson 2.0, Cookies, and Camino at wholesale prices.',
    heroPrimaryCtaLabel: 'Shop THC Gummies',
    heroPrimaryCtaHref: '/category/thc-gummies',
    heroSecondaryCtaLabel: 'Apply for Wholesale',
    heroSecondaryCtaHref: '/wholesale',
    trustStripItems: [
      {_type: 'homeTrustItem', _key: 'trust-0', title: 'Guaranteed 48h EU Delivery', iconKey: 'truck', accent: 'cyan'},
      {_type: 'homeTrustItem', _key: 'trust-1', title: 'CanG Compliant', iconKey: 'shieldCheck', accent: 'purple'},
      {_type: 'homeTrustItem', _key: 'trust-2', title: 'COA-Verified Authentic Stock', iconKey: 'badgeCheck', accent: 'cyan'},
      {_type: 'homeTrustItem', _key: 'trust-3', title: '50-Unit Minimum Orders', iconKey: 'packageCheck', accent: 'purple'},
      {_type: 'homeTrustItem', _key: 'trust-4', title: 'Dedicated B2B Support', iconKey: 'headset', accent: 'cyan'},
    ],
    categoriesEyebrow: 'Product Categories',
    categoriesHeading: 'Shop by Category',
    categoriesDescription: 'Browse our complete B2B bulk edibles inventory by product type.',
    categoriesEmptyMessage: 'No categories available yet.',
    authorityEyebrow: 'Premium Wholesale Edibles Supply',
    authorityHeading: 'High-Margin Wholesale THC Gummies for German and European B2B Retailers',
    authorityIntro:
      'When it comes to sourcing bulk THC gummies or complete cannabis edibles wholesale arrays, consistency is the key differentiator for profitable operations. We supply major distributors across Germany and the DACH region with premium THC gummies, weed gummies, and cannabis edibles from the world\'s most trusted brands — all COA-verified and CanG-compliant.',
    authorityPoints: [
      {_type: 'homeAuthorityPoint', _key: 'ap-0', title: 'COA-Verified Quality', description: 'Every batch of THC gummies and cannabis edibles ships with third-party lab COA confirming cannabinoid potency and purity.', iconKey: 'badgeCheck'},
      {_type: 'homeAuthorityPoint', _key: 'ap-1', title: 'CanG Compliant Distribution', description: 'All shipments across Germany and Europe are fully compliant with the German Cannabis Act (CanG) and applicable EU regulations.', iconKey: 'shieldCheck'},
      {_type: 'homeAuthorityPoint', _key: 'ap-2', title: 'Best Wholesale Pricing in the EU', description: 'Pay with BTC, ETH, or USDT and save 10%. Revolut payments qualify for 5% off your invoice total.', iconKey: 'walletCards'},
      {_type: 'homeAuthorityPoint', _key: 'ap-3', title: '48h EU Delivery Guaranteed', description: 'Every order ships within 48 hours. Same-day priority dispatch available for qualifying high-volume accounts across Germany and DACH.', iconKey: 'truck'},
    ],
    authorityCtaLabel: 'Browse All Products',
    authorityCtaHref: '/products',
    cryptoEyebrow: 'Payment Savings',
    cryptoHeading: 'Save With Crypto Payments',
    cryptoDescription:
      'Pay with cryptocurrency and save 10% on your wholesale gummies order. Revolut payments qualify for 5% off. Savings stack with your quoted line.',
    cryptoCtaLabel: 'Apply for Wholesale',
    cryptoCtaHref: '/wholesale',
    deliveryEyebrow: 'Logistics',
    deliveryHeading: 'Guaranteed 48-Hour EU Priority Shipping',
    deliveryDescription:
      'Every order is packaged securely in heavy-duty commercial master boxes to eliminate damage during transit. Guaranteed 48-hour shipping across Germany and Europe with available same-day priority dispatch.',
    deliveryCtaLabel: 'View Shipping Policy',
    deliveryCtaHref: '/shipping',
    howToBadge: 'Simple B2B Ordering',
    howToHeading: 'How to Order in 4 Steps',
    howToIntro: 'From catalog browse to delivered gummies inventory in four streamlined steps.',
    howToSteps: [
      {_type: 'homeHowToStep', _key: 'step-0', title: 'Browse', description: 'Explore our THC gummies, weed gummies, and cannabis edibles categories to find the right SKUs for your store or distribution channel.', iconKey: 'search'},
      {_type: 'homeHowToStep', _key: 'step-1', title: 'Submit', description: 'Send your business details, product interests, and estimated volume via our wholesale application form.', iconKey: 'send'},
      {_type: 'homeHowToStep', _key: 'step-2', title: 'Invoice', description: 'Receive a formal quote or invoice with payment options (crypto, Revolut, or bank transfer) in EUR.', iconKey: 'packageCheck'},
      {_type: 'homeHowToStep', _key: 'step-3', title: 'Ship', description: 'Orders ship after confirmation with guaranteed 48-hour EU delivery and full tracking provided.', iconKey: 'packageCheck'},
    ],
    howToCtaLabel: 'Start Your Order',
    howToCtaHref: '/wholesale',
    wholesaleMidEyebrow: 'Bulk Edibles Supply',
    wholesaleMidHeading: 'Secure Bulk Gummies Shipments Across Germany and the EU',
    wholesaleMidDescription:
      'For major operators scaling up their supply chains across Germany, Austria, and Switzerland, we specialize in deep commercial edibles distribution. Order THC gummies in bulk or cannabis edibles wholesale. Our platform provides clean, authentic product batches that safeguard your reputation and protect your margins.',
    wholesaleMidCtaLabel: 'Apply for Wholesale',
    wholesaleMidCtaHref: '/wholesale',
    brandsEyebrow: 'Top Brands',
    brandsHeading: 'Featured Brands',
    brandsEmptyMessage: 'No featured brands at this time.',
    testimonialsBadge: 'Verified Partners',
    testimonialsHeading: 'What Our B2B Partners Say',
    testimonialsIntro: 'Feedback from verified wholesale distributors and retailers across Germany and Europe.',
    blogEyebrow: 'Industry Insights',
    blogHeading: 'Latest from the Blog',
    blogDescription:
      'Stay updated with the latest in THC gummies, cannabis edibles, CanG compliance news, and B2B distribution strategies for Germany and Europe.',
    blogEmptyMessage: 'No blog posts available yet.',
    blogViewAllLabel: 'View All Posts',
    faqEyebrow: 'Common Questions',
    faqHeading: 'Frequently Asked Questions',
    faqDescription: 'Quick answers on MOQ, EU delivery, COA documentation, CanG compliance, and ordering.',
    faqViewAllLabel: 'View All FAQs',
    complianceShopCtaLabel: 'Shop Products',
    complianceShopCtaHref: '/products',
    complianceContactCtaLabel: 'Contact Us',
    complianceContactCtaHref: '/contact',
    complianceDisclaimerPlain:
      'All products are intended for licensed B2B buyers and adult consumers (18+) only. Products are distributed in compliance with the German Cannabis Act (CanG) and applicable EU regulations. Buyers are responsible for local compliance in their jurisdiction.',
    seoTitle: 'THC Gummies Germany | Buy Bulk Edibles & Wholesale Brands | THCGummiesGermany',
    seoDescription:
      'THC gummies in Germany for bulk wholesale purchase. Order top-tier brands like Canapuff, Tyson 2.0, Cookies, and Camino with 48h EU delivery. Best wholesale prices for German and European retailers.',
  })

  // ─── 3. Wholesale Page ───────────────────────────────────────────────────
  await upsert({
    _id: 'wholesalePage',
    _type: 'wholesalePage',
    seoTitle: 'Wholesale THC Gummies & Bulk Cannabis Edibles | THCGummiesGermany B2B',
    seoDescription:
      'Apply for our premium wholesale THC gummies and cannabis edibles program. Get distributor pricing, tier discounts, and guaranteed 48-hour CanG-compliant shipping across Germany and the EU.',
    heroBadge: 'B2B Wholesale Program',
    heroHeading: 'Wholesale THC Gummies and Cannabis Edibles Distribution Program for Verified German and EU Businesses',
    heroSecondaryHeading: 'Wholesale THC gummies account registration for professional retailers and distributors.',
    heroSubhead:
      'At THCGummiesGermany.com, our wholesale program is built on the pillars of Consistency, Quality, and Speed. We provide a streamlined B2B portal where you can buy wholesale THC gummies, weed gummies, and cannabis edibles at manufacturer-direct pricing with guaranteed 48-hour priority shipping across Germany and Europe.',
    heroTrustLine1: 'CanG Compliant · COA-Verified Stock',
    heroTrustLine2: '48h EU Priority Shipping · DACH Distribution',
    whyHeading: 'Why Partner With Us?',
    whyIntro:
      'Our wholesale partnership model is built for retailers and distributors in Germany and Europe who need depth, pricing discipline, and responsive logistics support.',
    benefits: [
      {_type: 'wholesaleBenefit', _key: 'ben-0', title: 'Manufacturer-Direct Pricing', description: 'We eliminate secondary broker fees, passing massive capital savings straight to your bottom line so you can offer competitive retail pricing across Germany and the EU.', iconKey: 'badgePercent'},
      {_type: 'wholesaleBenefit', _key: 'ben-1', title: 'CanG Compliance', description: 'All shipments across Germany and Europe are fully compliant with the German Cannabis Act (CanG). Zero legal friction for your B2B distribution.', iconKey: 'shieldCheck'},
      {_type: 'wholesaleBenefit', _key: 'ben-2', title: 'Dedicated Account Managers', description: 'Every verified commercial client is assigned a dedicated B2B account manager to oversee orders from placement to final EU delivery.', iconKey: 'headphones'},
    ],
    howHeading: 'How It Works',
    howIntro: 'Four steps from catalog browse to delivered gummies inventory.',
    steps: [
      {_type: 'wholesaleStep', _key: 'ws-0', title: 'Browse', description: 'Explore our bulk THC gummies, weed gummies, and cannabis edibles categories and SKUs that fit your store or distribution channel.', iconKey: 'search'},
      {_type: 'wholesaleStep', _key: 'ws-1', title: 'Submit', description: 'Send your business details, product interests, and estimated volume via the wholesale application form below.', iconKey: 'send'},
      {_type: 'wholesaleStep', _key: 'ws-2', title: 'Invoice', description: 'Receive a formal quote or invoice in EUR with payment options (crypto, Revolut, or bank transfer).', iconKey: 'fileText'},
      {_type: 'wholesaleStep', _key: 'ws-3', title: 'Ship', description: 'Orders ship after confirmation with guaranteed 48-hour EU priority delivery and full tracking for all shipments.', iconKey: 'truck'},
    ],
    discountHeading: 'Discount Structure',
    discountIntro: 'Savings stack with your quoted line — your invoice reflects the method you confirm at checkout.',
    paymentCardTitle: 'Payment Method Savings',
    paymentCardDescription: 'Applied to qualifying wholesale orders at invoice.',
    cryptoRowLabel: 'Cryptocurrency (BTC, ETH, USDT)',
    cryptoDiscountLabel: '10% off',
    revolutRowLabel: 'Revolut',
    revolutDiscountLabel: '5% off',
    volumeCardTitle: 'Optional Volume Tiers',
    volumeCardDescription: 'Illustrative brackets — exact pricing is quote-based.',
    volumeTiers: [
      {_type: 'volumeTier', _key: 'vt-0', tier: '€500 – €1,500', note: 'Entry MOQ — full category mix'},
      {_type: 'volumeTier', _key: 'vt-1', tier: '€1,500 – €5,000', note: 'Improved line-sheet pricing on select brands'},
      {_type: 'volumeTier', _key: 'vt-2', tier: '€5,000 – €10,000', note: 'Priority allocation on high-demand SKUs'},
      {_type: 'volumeTier', _key: 'vt-3', tier: '€10,000+', note: 'Custom brackets — ask your account manager'},
    ],
    formHeading: 'Apply for Wholesale Access',
    formIntro: 'Prefer a dedicated page? Use the',
    wholesaleRequestPage: {
      badge: 'Wholesale Application',
      heading: 'B2B Wholesale Application',
      intro: 'Complete the form and our team will follow up with pricing and onboarding steps.',
      thankYouHeading: 'Thanks, your inquiry is in.',
      thankYouIntro:
        'Our B2B team will review your request and typically reply within one business day with pricing and onboarding steps.',
      thankYouNextStepsTitle: 'Next Steps',
      thankYouUrgentHelpTitle: 'Need Urgent Help?',
      thankYouUrgentHelpBody: 'Email us and reference your business name.',
      supportEmail: 'sales@thcgummiesgermany.com',
    },
    testimonialsHeading: 'Wholesale Buyer Testimonials',
    testimonialsIntro: 'Feedback from verified wholesale partners across Germany and Europe.',
    faqHeading: 'Wholesale FAQ',
    faqIntro: 'Quick answers on MOQ, terms, payments, shipping, and CanG compliance.',
    faqs: [
      {_type: 'wholesaleFaq', _key: 'wf-0', question: 'How do I open a commercial B2B account with THCGummiesGermany?', answer: 'To gain full access to our tiered wholesale pricing matrices and place orders, complete our digital B2B application form. Businesses must provide valid business registration and VAT credentials for compliance verification under the German Cannabis Act (CanG).'},
      {_type: 'wholesaleFaq', _key: 'wf-1', question: 'What are your wholesale tier minimum order thresholds?', answer: 'Our master distribution pricing tiers start with a minimum of 50 units per SKU. Volume price breaks apply from 200 units and 500+ units per SKU. Free shipping is included on orders over €1,000.'},
      {_type: 'wholesaleFaq', _key: 'wf-2', question: 'Are all your wholesale THC gummies CanG compliant for Germany?', answer: 'Yes. We operate in strict compliance with the German Cannabis Act (CanG) and applicable EU regulations. All shipments across Germany, Austria, Switzerland, and wider Europe travel fully documented and CanG-compliant.'},
      {_type: 'wholesaleFaq', _key: 'wf-3', question: 'Can we arrange custom logistics for multi-country EU distribution?', answer: 'Absolutely. Our specialized commercial logistics team excels at managing complex, multi-destination shipments for enterprise retail groups and regional chains across Germany and Europe. Speak directly with your dedicated account manager to establish a custom rolling delivery schedule.'},
    ],
  })

  // ─── 4. About Page ───────────────────────────────────────────────────────
  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    seoTitle: 'About THCGummiesGermany — B2B Wholesale Cannabis Edibles Distributor',
    seoDescription:
      'Learn how THCGummiesGermany became the leading B2B wholesale distributor of THC gummies and cannabis edibles across Germany, DACH, and European markets.',
    pageHeading: 'About THCGummiesGermany: Driving B2B Cannabis Edibles Distribution Across Germany and Europe',
    introLead:
      'Empowering Retailers, Brands, and Regional Distributors with Manufacturer-Direct Pricing and Reliable 48-Hour EU Shipping Logistics.',
    storyHeading: 'Our Story',
    storyBody: blocks(
      'Founded by a dedicated network of cannabis logistics experts and edibles specialists, THCGummiesGermany.com was built to solve the German and European market\'s biggest pain points: inconsistent product quality, hidden broker markups, and slow shipping times for cannabis edibles.',
      'Today, we stand as a premier B2B distribution hub for Germany and Europe, connecting licensed manufacturers directly with dispensaries, head shops, and master brokers throughout the DACH region and wider EU markets.',
    ),
    missionHeading: 'Our Mission: Zero Friction, Maximum Profit Margins',
    missionBody: blocks(
      'Our business model is simple: we provide your brand with the market\'s highest-quality THC gummies and cannabis edibles at prices that allow your retail business to thrive. By maintaining direct equity stakes and exclusive partnerships with top-tier brands like Canapuff, Tyson 2.0, Cookies, and Camino, we completely bypass traditional distribution middlemen.',
      'This allows us to pass deep, tier-one savings directly down to your supply chain, ensuring that whether you purchase a single case of THC gummies or an entire pallet of bulk cannabis edibles, your cost per unit remains the lowest in the German and European market.',
    ),
    teamHeading: 'Operations & Fulfillment',
    teamBody: blocks(
      'We operate fully optimized fulfillment hubs that guarantee 48-hour priority cargo shipping on all standard wholesale orders across Germany and Europe, alongside priority same-day dispatch for high-velocity operations.',
    ),
    stats: [
      {_key: 'stat-0', value: '48h', label: 'Guaranteed EU Delivery'},
      {_key: 'stat-1', value: '1,000+', label: 'SKUs Available'},
      {_key: 'stat-2', value: '18+', label: 'Age Compliance'},
      {_key: 'stat-3', value: '15+', label: 'EU Markets'},
    ],
    complianceHeading: 'Built on Two Inflexible Core Guarantees',
    complianceIntro: 'Every product and shipment is backed by our uncompromising quality and fulfillment commitments.',
    compliancePoints: [
      {_key: 'cp-0', title: 'Uncompromised Edibles Quality', description: 'We strictly source THC gummies and cannabis edibles from brands with rigorous QC standards. Every batch is COA-verified by independent third-party labs confirming cannabinoid potency, residual contaminants, and product safety.'},
      {_key: 'cp-1', title: 'Fulfillment Speed', description: 'In the fast-moving B2B market, empty shelves mean lost revenue. We guarantee 48-hour priority shipping on all standard wholesale orders across Germany and Europe, alongside priority same-day dispatch for high-velocity operations.'},
    ],
    ctaLabel: 'Apply for Wholesale',
    ctaHref: '/wholesale',
  })

  // ─── 5. Contact Page ─────────────────────────────────────────────────────
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    seoTitle: 'Contact Our B2B Sales & Support Team | THCGummiesGermany',
    seoDescription:
      'Get in touch with THCGummiesGermany. Connect with a dedicated B2B account manager for custom volume quotes, bulk pricing sheets, and EU freight routing.',
    pageHeading: 'Contact the THCGummiesGermany B2B Distribution Desk',
    introLead:
      'Reach Out Directly to Open a Corporate Account, Secure Custom Volume Quotes, or Coordinate Priority EU Delivery Logistics.',
    formHeading: 'Send Us a Message',
    formIntro: 'Complete the form below and our team will respond within 2 business hours.',
    nameFieldLabel: 'Full Name',
    emailFieldLabel: 'Business Email',
    subjectFieldLabel: 'Subject',
    messageFieldLabel: 'Message',
    submitButtonLabel: 'Send Message',
    subjectOptions: [
      {_key: 'sub-0', value: 'wholesale-inquiry', label: 'Wholesale Inquiry'},
      {_key: 'sub-1', value: 'order-support', label: 'Order Support'},
      {_key: 'sub-2', value: 'custom-quote', label: 'Custom Volume Quote'},
      {_key: 'sub-3', value: 'compliance', label: 'Compliance & Documentation'},
      {_key: 'sub-4', value: 'general', label: 'General Question'},
    ],
    successTitle: 'Message Sent',
    successMessage:
      'Thank you for reaching out to THCGummiesGermany. A senior sales coordinator will contact you within 2 business hours.',
    detailsHeading: 'Connect with Our Enterprise Sales Division',
    contactEmail: 'sales@thcgummiesgermany.com',
    contactPhone: '',
    businessHours: 'Mon–Fri, 9:00 AM – 6:00 PM CET',
    responsePromise: 'A senior sales coordinator will follow up within 2 business hours.',
    paymentsNote:
      'For established corporate accounts and qualifying high-volume orders placed before 12:00 PM CET, same-day priority dispatch is available across Germany and the EU.',
  })

  // ─── 6. Compliance Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'compliancePage',
    _type: 'compliancePage',
    title: 'Legality, Compliance, and Regulatory Frameworks',
    description:
      'Maintaining 100% German Cannabis Act (CanG) Compliance, Age Verification, and EU Regulatory Adherence Across All Wholesale Channels.',
    sections: [
      {
        _type: 'legalSection',
        _key: 'cs-0',
        title: 'Overview',
        paragraphs: [
          'THCGummiesGermany.com operates in absolute alignment with all local, national, and EU laws governing the distribution of commercial THC gummies and cannabis edibles across Germany, the DACH region, and wider European markets.',
          'We protect our commercial partners by implementing rigorous verification practices, ensuring that your edibles inventory moves safely and legally through Germany and European transit networks without legal friction.',
        ],
      },
      {
        _type: 'legalSection',
        _key: 'cs-1',
        title: 'German Cannabis Act (CanG) Compliance',
        paragraphs: [
          'All THC gummies and cannabis edibles distributed through our B2B catalog comply with the German Cannabis Act (CanG) and applicable EU regulations governing cannabis product distribution.',
          'Every single batch is accompanied by an accessible, verifiable Certificate of Analysis (COA) from an independent, accredited third-party laboratory. These lab results confirm legal cannabinoid compliance, product purity, and the total absence of harmful heavy metals, residual solvents, pesticides, or unauthorized additives.',
        ],
      },
      {
        _type: 'legalSection',
        _key: 'cs-2',
        title: 'Mandatory B2B Buyer Prerequisites',
        bullets: [
          'Age Verification: We strictly enforce 18+ age limits under German and EU law. We do not sell to consumers. All digital accounts must pass verification to prove they are a licensed commercial business entity selling to adults of legal age (18+).',
          'Business Registration: All B2B buyers must provide valid German or EU business registration and VAT credentials for compliance verification.',
          'Buyer Responsibility: International buyers are responsible for knowing and adhering to their local customs regulations and applicable cannabis laws. Buyers are solely responsible for compliance in their jurisdiction.',
        ],
      },
    ],
  })

  // ─── 7. Legal Content ────────────────────────────────────────────────────
  await upsert({
    _id: 'legalContent',
    _type: 'legalContent',
    supportEmail: 'support@thcgummiesgermany.com',
    pactActNotice: '',
    nicotineWarning: '',
    thcWarning:
      'THC and cannabis products are only available where legally permitted. Products are distributed in compliance with the German Cannabis Act (CanG) and applicable EU regulations. Customers are responsible for knowing and complying with local laws.',
    fdaDisclaimer:
      'These statements have not been evaluated by any regulatory authority. These products are not intended to diagnose, treat, cure, or prevent any disease.',
    privacyTitle: 'Privacy Policy',
    privacyDescription: 'THCGummiesGermany Privacy Policy — How we collect, use, and protect your personal information in compliance with GDPR.',
    privacySections: [
      {_type: 'legalSection', _key: 'prv-0', title: '1. Introduction', paragraphs: ['THCGummiesGermany ("we," "our," or "us") is committed to protecting your privacy in compliance with the EU General Data Protection Regulation (GDPR). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.']},
      {_type: 'legalSection', _key: 'prv-1', title: '2. Information We Collect', paragraphs: ['We collect information you provide directly to us, such as:'], bullets: ['Name and contact information (email, phone, address)', 'Business registration and VAT information', 'Payment and billing information', 'Order and shipping history', 'Communication preferences']},
      {_type: 'legalSection', _key: 'prv-2', title: '3. How We Use Your Information', paragraphs: ['We use collected information to:'], bullets: ['Process and fulfill your orders', 'Verify your age (18+) and business credentials', 'Send transactional emails (order confirmations, shipment updates)', 'Improve our website and services', 'Comply with CanG, GDPR, and applicable EU laws']},
      {_type: 'legalSection', _key: 'prv-3', title: '4. Data Security', paragraphs: ['We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction, in accordance with GDPR requirements.']},
      {_type: 'legalSection', _key: 'prv-4', title: '5. Contact Us', paragraphs: ['If you have questions about this Privacy Policy or wish to exercise your GDPR rights, please contact us at support@thcgummiesgermany.com.']},
    ],
    termsTitle: 'Terms of Service',
    termsDescription: 'THCGummiesGermany Terms of Service — Read our complete terms and conditions for purchasing and using our site.',
    termsSections: [
      {_type: 'legalSection', _key: 'trm-0', title: '1. Acceptance of Terms', paragraphs: ['By accessing and using this website, you accept and agree to be bound by these terms. This platform is for licensed B2B buyers only.']},
      {_type: 'legalSection', _key: 'trm-1', title: '2. Eligibility & Business Requirements', paragraphs: ['You must be a licensed commercial business entity and 18 years or older to purchase products from THCGummiesGermany. All accounts must pass business verification before orders are processed.']},
      {_type: 'legalSection', _key: 'trm-2', title: '3. Product Compliance', paragraphs: ['All products are distributed in compliance with the German Cannabis Act (CanG) and applicable EU regulations. Buyers are solely responsible for compliance with local, national, and EU laws in their jurisdiction.']},
      {_type: 'legalSection', _key: 'trm-3', title: '4. Ordering & Payment', paragraphs: ['By placing an order, you warrant that you are a licensed business operator legally able to enter into binding contracts. We reserve the right to refuse or cancel any order at our sole discretion.']},
      {_type: 'legalSection', _key: 'trm-4', title: '5. Shipping & Delivery', paragraphs: ['Standard wholesale orders are dispatched with guaranteed 48-hour priority shipping across Germany and the EU. CanG-compliant packaging is used on all outbound shipments.']},
      {_type: 'legalSection', _key: 'trm-5', title: '6. Contact & Disputes', paragraphs: ['For any questions or disputes regarding these terms, please contact us at support@thcgummiesgermany.com.']},
    ],
    refundsTitle: 'Refund Policy',
    refundsDescription: 'THCGummiesGermany Refund Policy — Learn about our return, exchange, and refund procedures for B2B orders.',
    refundsSections: [
      {_type: 'legalSection', _key: 'ref-0', title: 'Our Refund Policy', paragraphs: ['At THCGummiesGermany, we stand behind the quality of our products. Please read our refund and return policy carefully before making a purchase.']},
      {_type: 'legalSection', _key: 'ref-1', title: '1. Eligibility for Returns', paragraphs: ['Items may be returned within 30 days of delivery if:'], bullets: ['The item is unopened and in original, resellable condition', 'The original receipt or order confirmation is provided', 'The item is defective or damaged upon arrival', 'We made an error in your order']},
      {_type: 'legalSection', _key: 'ref-2', title: '2. Return Process', paragraphs: ['To initiate a return:'], ordered: ['Contact us at support@thcgummiesgermany.com with your order number', 'Obtain a return authorization number (RMA)', 'Ship the item back in original packaging', 'Refund will be processed within 7–10 business days of receipt']},
      {_type: 'legalSection', _key: 'ref-3', title: '3. Defective Items', paragraphs: ['If you receive a defective or damaged product, contact us within 7 days of delivery with photos or video evidence. We will replace the item at no cost or issue a full refund.']},
    ],
    agePolicyTitle: 'Age Verification & Mandatory Safety Warning',
    agePolicyDescription: 'Read our mandatory commercial safety disclaimer, age verification requirements (18+), and product usage guidelines.',
    agePolicySections: [
      {_type: 'legalSection', _key: 'age-0', title: 'Mandatory Commercial Safety & Liability Disclaimer', paragraphs: ['All products available on THCGummiesGermany.com are intended strictly for distribution to licensed commercial business entities and adult consumers of legal age. They are not for sale to minors or individuals under the age of 18.']},
      {_type: 'legalSection', _key: 'age-1', title: 'Health & Safety Warnings', paragraphs: ['THC products may cause impairment. Do not drive or operate heavy machinery after consumption. Consult a physician before use if you have a serious medical condition or use prescription medications. Do not use these products if you are pregnant or nursing. Keep out of reach of children.']},
      {_type: 'legalSection', _key: 'age-2', title: 'Legal Compliance Responsibility', paragraphs: ['THCGummiesGermany distributes cannabis edibles in compliance with the German Cannabis Act (CanG) and applicable EU regulations. It is the sole responsibility of the wholesale buyer to ensure complete compliance with local laws before placing a volume purchase order.']},
    ],
  })

  // ─── 8. Categories ───────────────────────────────────────────────────────
  await upsert({
    _id: 'category-thc-gummies',
    _type: 'category',
    name: 'THC Gummies',
    slug: {_type: 'slug', current: 'thc-gummies'},
    group: 'THC Gummies',
    shortDescription:
      'Order High-Quality THC Gummy Wholesale Batches and Volume Cases at the Absolute Lowest Market Prices in Germany and Europe.',
    description:
      'THC gummies are the fastest-growing segment in the German and European cannabis market, making them a crucial asset for profitable retail operations. At THCGummiesGermany.com, we stock an uncompromised collection of top-shelf THC gummies from leading brands including Canapuff, Tyson 2.0, Cookies, and Camino — all COA-verified and CanG-compliant for B2B distributors in Germany and across the EU.',
    seoTitle: 'Buy Bulk THC Gummies Germany | Wholesale Cannabis Edibles | THCGummiesGermany',
    seoDescription:
      'Buy bulk THC gummies in Germany at direct wholesale prices. Stock Canapuff, Tyson 2.0, Cookies, and Camino brands with 48h EU delivery. Best B2B prices for German and European retailers.',
    categoryHeroEyebrow: 'THC Gummies Germany',
    categoryHeroHeading: 'Bulk THC Gummies and Wholesale Cannabis Edibles for B2B Retailers in Germany and Europe',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy bulk THC gummies in Germany at direct wholesale prices with guaranteed 48-hour EU priority shipping.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'THC Gummies',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling Bulk THC Gummies',
    categoryBestsellersDescription: 'Our most popular bulk THC gummy products for B2B distributors in Germany and Europe.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about bulk THC gummies orders in Germany.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other bulk edibles categories.',
    isActive: true,
    navOrder: 1,
    showInHeader: true,
  })

  await upsert({
    _id: 'category-weed-gummies',
    _type: 'category',
    name: 'Weed Gummies',
    slug: {_type: 'slug', current: 'weed-gummies'},
    group: 'Weed Gummies',
    shortDescription:
      'Order Premium Weed Gummy Wholesale Packs and Volume Cases at Unbeatable Commercial Prices for Germany and European Markets.',
    description:
      'Weed gummies remain a top-selling cannabis edibles format across Germany and Europe, acting as an essential anchor for high-margin dispensary and head shop inventory. At THCGummiesGermany.com, we stock the market\'s most complete B2B collection of premium weed gummies from trusted wholesale brands — all COA-verified and CanG-compliant for high-volume distributors across the DACH region and EU.',
    seoTitle: 'Buy Weed Gummies Germany | Wholesale Bulk Orders | THCGummiesGermany',
    seoDescription:
      'Buy weed gummies in Germany at direct wholesale prices. Stock premium brands with COA verification and 48h EU delivery. Best B2B wholesale pricing for German and European retailers.',
    categoryHeroEyebrow: 'Weed Gummies Germany',
    categoryHeroHeading: 'Weed Gummies Wholesale and Bulk Orders for German and European B2B Supply',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy weed gummies in Germany at direct wholesale prices with guaranteed 48-hour EU priority shipping.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'Weed Gummies',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling Weed Gummies',
    categoryBestsellersDescription: 'Our most popular wholesale weed gummy products for B2B distributors.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about wholesale weed gummies orders in Germany.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other bulk edibles categories.',
    isActive: true,
    navOrder: 2,
    showInHeader: true,
  })

  await upsert({
    _id: 'category-cannabis-gummies',
    _type: 'category',
    name: 'Cannabis Gummies',
    slug: {_type: 'slug', current: 'cannabis-gummies'},
    group: 'Cannabis Gummies',
    shortDescription:
      'Order Premium Cannabis Gummy Wholesale Packs and Volume Cases at Manufacturer-Direct Prices with 48h EU Delivery.',
    description:
      'Cannabis gummies are a premium edibles format delivering consistent, reliable consumer experiences across Germany and the wider EU market. At THCGummiesGermany.com, we offer an extensive B2B wholesale range of cannabis gummies from top brands — COA-verified, CanG-compliant, and ready for 48-hour EU dispatch to dispensaries, health stores, and cannabis retailers across Germany, Austria, Switzerland, and Europe.',
    seoTitle: 'Cannabis Gummies Germany | Wholesale Bulk Orders | THCGummiesGermany',
    seoDescription:
      'Buy cannabis gummies in Germany at direct wholesale prices. COA-verified stock with 48h EU delivery. Best B2B wholesale pricing for German and European retailers.',
    categoryHeroEyebrow: 'Cannabis Gummies Germany',
    categoryHeroHeading: 'Cannabis Gummies Wholesale and Bulk Orders for German and EU B2B Retailers',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy cannabis gummies in Germany at direct wholesale prices with guaranteed 48-hour EU priority shipping.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'Cannabis Gummies',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling Cannabis Gummies',
    categoryBestsellersDescription: 'Our most popular wholesale cannabis gummy products for B2B distributors across Germany and Europe.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about wholesale cannabis gummies orders in Germany.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other bulk edibles categories.',
    isActive: true,
    navOrder: 3,
    showInHeader: true,
  })

  // ─── 9. FAQ Items ────────────────────────────────────────────────────────
  const faqs = [
    {
      _id: 'faq-moq',
      _type: 'faqItem',
      question: 'What is your minimum order quantity for bulk THC gummies in Germany?',
      answer: blocks(
        'Our minimum order quantity is 50 units per SKU for all B2B wholesale THC gummies and cannabis edibles orders. Volume price breaks apply from 200 units per SKU, and master case pricing unlocks at 500+ units. Free shipping is included on orders over €1,000 across Germany and the EU.',
      ),
      category: 'Ordering',
      order: 10,
      isActive: true,
    },
    {
      _id: 'faq-brands',
      _type: 'faqItem',
      question: 'Which THC gummy brands do you stock for wholesale in Germany?',
      answer: blocks(
        'We stock a premium range of wholesale THC gummies from leading global brands including Canapuff, Tyson 2.0, Cookies, and Camino. All brands in our catalog are COA-verified by independent third-party labs and CanG-compliant for distribution across Germany and the wider EU.',
      ),
      category: 'Products',
      order: 20,
      isActive: true,
    },
    {
      _id: 'faq-coa',
      _type: 'faqItem',
      question: 'Do your wholesale THC gummies come with a Certificate of Analysis?',
      answer: blocks(
        'Yes. Every SKU in our catalog ships with a Certificate of Analysis (COA) from an accredited independent third-party laboratory, confirming cannabinoid potency, residual contaminant levels, and product purity. COA documentation is available on request prior to placing your order.',
      ),
      category: 'Products',
      order: 30,
      isActive: true,
    },
    {
      _id: 'faq-eu-shipping',
      _type: 'faqItem',
      question: 'How fast do you deliver wholesale gummies across Germany and Europe?',
      answer: blocks(
        'We guarantee 48-hour dispatch on all standard wholesale gummies orders across Germany and the EU. Same-day priority dispatch is available for established accounts placing orders before our daily cutoff. All Germany and EU shipments ship fully tracked with CanG-compliant packaging.',
      ),
      category: 'Shipping',
      order: 40,
      isActive: true,
    },
    {
      _id: 'faq-cang-compliance',
      _type: 'faqItem',
      question: 'Are your wholesale THC gummies compliant with the German Cannabis Act (CanG)?',
      answer: blocks(
        'Yes. All THC gummies and cannabis edibles distributed through our B2B catalog comply fully with the German Cannabis Act (CanG) and applicable EU regulations. Every batch includes third-party COA documentation confirming legal compliance, and all shipments travel with complete CanG-compliant documentation.',
      ),
      category: 'Compliance',
      order: 50,
      isActive: true,
    },
    {
      _id: 'faq-shelf-life',
      _type: 'faqItem',
      question: 'What is the shelf life of your wholesale THC gummies?',
      answer: blocks(
        'Most THC gummies and cannabis edibles in our wholesale catalog have a shelf life of 12 months from production date when stored correctly in a cool, dry environment away from direct sunlight. Exact shelf life varies by brand and product — details are available on each product\'s COA and packaging.',
      ),
      category: 'Products',
      order: 60,
      isActive: true,
    },
    {
      _id: 'faq-white-label',
      _type: 'faqItem',
      question: 'Do you offer white-label or private-label THC gummies for Germany?',
      answer: blocks(
        'Yes, we support white-label and private-label edibles programs for qualified B2B partners in Germany and the EU. Minimum order quantities apply for custom branding. Contact our sales team at sales@thcgummiesgermany.com to discuss your white-label requirements and MOQ.',
      ),
      category: 'General',
      order: 70,
      isActive: true,
    },
    {
      _id: 'faq-crypto-payment',
      _type: 'faqItem',
      question: 'Can I pay for bulk THC gummies with cryptocurrency?',
      answer: blocks(
        'Yes. We accept BTC, ETH, and USDT for wholesale gummies orders and offer a 10% discount for crypto payment. Revolut payments qualify for 5% off your invoice total. Payment method discounts stack with your quoted line and are applied at invoice confirmation.',
      ),
      category: 'Ordering',
      order: 80,
      isActive: true,
    },
  ]

  for (const faq of faqs) {
    await upsert(faq)
  }

  // ─── 10. Shipping Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'shippingPage',
    _type: 'shippingPage',
    title: 'Shipping Policy',
    description: 'THCGummiesGermany shipping policy covering processing time, EU delivery expectations, CanG compliance, and tracking guidance.',
    lastUpdated: '2026-06-01',
    sections: [
      {_type: 'legalSection', title: '1. Processing Time', paragraphs: ['Wholesale orders are typically reviewed, verified, and prepared within 24 to 48 hours on business days after payment confirmation.', 'During high-volume periods or compliance review checks, processing may take longer. Our team will notify you by email if timing changes.']},
      {_type: 'legalSection', title: '2. Germany & DACH Shipping', paragraphs: ['We ship across Germany, Austria, and Switzerland via compliant carrier options.', 'Estimated transit windows for Germany:'], bullets: ['Next-day delivery available for orders placed before 12:00 PM CET', 'Standard: 1–2 business days across all Germany regions', 'Austria and Switzerland: 2–3 business days after dispatch']},
      {_type: 'legalSection', title: '3. EU & International Shipping', paragraphs: ['We support B2B wholesale delivery across all major EU markets.', 'Contact our team for country-specific guidance on transit windows and product eligibility.'], bullets: ['Western Europe (France, Netherlands, Belgium): 2–3 business days', 'Central Europe (Poland, Czech Republic): 3–4 business days', 'Southern Europe (Italy, Spain): 3–5 business days', 'All shipments fully tracked and insured']},
      {_type: 'legalSection', title: '4. CanG Compliance', paragraphs: ['All shipments across Germany and the EU comply with the German Cannabis Act (CanG) and applicable EU regulations.', 'All outbound packages use CanG-compliant packaging and documentation.']},
      {_type: 'legalSection', title: '5. Restricted Products & Destinations', paragraphs: ['Some product categories may be restricted in specific countries or local jurisdictions.', 'Buyers are responsible for confirming local rules before ordering.'], bullets: ['THC-related products are limited to jurisdictions where sale and shipment are legally permitted', 'Age verification (18+) is mandatory for all restricted products', 'Destination restrictions are checked before fulfillment']},
      {_type: 'legalSection', title: '6. Tracking and Delivery Updates', paragraphs: ['Tracking details are sent once your order is dispatched. Use the provided carrier link to monitor shipment milestones.', 'If a package is delayed, returned, or undeliverable, contact support@thcgummiesgermany.com with your order details for assistance.']},
    ],
  })

  // ─── 11. MOQ Page ────────────────────────────────────────────────────────
  await upsert({
    _id: 'moqPage',
    _type: 'moqPage',
    title: 'Wholesale MOQ',
    description: 'Understand THCGummiesGermany minimum order requirements, mix-and-match rules, and practical examples for first and repeat wholesale gummies orders.',
    heroTitle: 'What Is the Minimum Order Quantity for Wholesale THC Gummies in Germany?',
    heroIntro: 'Our minimum order quantity is 50 units per SKU. Volume price breaks apply from 200 units and 500+ units per SKU. Free shipping on orders over €1,000. Submit a wholesale inquiry to receive a proforma invoice within one business day.',
    lastUpdated: '2026-06-01',
    moqExamples: [
      {_type: 'object', title: 'Starter Order', totalBadge: '50 units', description: 'Minimum 50 units per SKU for first-time B2B buyers. Mix categories to test shelf velocity before scaling.'},
      {_type: 'object', title: 'Volume Tier', totalBadge: '200 units', description: 'Volume discount unlocks from 200 units per SKU. Reduced per-unit cost with fast 48-hour EU dispatch.'},
      {_type: 'object', title: 'Master Case', totalBadge: '500+ units', description: 'Best per-unit pricing on 500+ units. Preferred for high-volume dispensaries and head shop chains.'},
    ],
    sections: [
      {_type: 'legalSection', title: '1. Standard MOQ', paragraphs: ['THCGummiesGermany requires a minimum of 50 units per SKU for all B2B wholesale orders.', 'This minimum supports wholesale pricing integrity, stable fulfillment logistics, and dedicated account support for our B2B partners across Germany and Europe.']},
      {_type: 'legalSection', title: '2. Mix-and-Match Policy', paragraphs: ['You may combine eligible SKUs across our THC Gummies, Weed Gummies, and Cannabis Gummies categories to reach your order volume.', 'Final basket approval depends on destination compliance and product eligibility.'], bullets: ['Mix THC gummies and cannabis edibles across compatible categories', 'Build trial assortments for first orders before scaling reorders', 'Contact our sales team for help balancing your initial inventory basket']},
      {_type: 'legalSection', title: '3. Volume Price Tiers', paragraphs: ['Starter tier: 50–199 units per SKU at standard wholesale pricing.', 'Volume tier: 200–499 units per SKU with reduced per-unit cost.', 'Master case tier: 500+ units per SKU at best available pricing.', 'Free shipping applies on orders over €1,000.']},
      {_type: 'legalSection', title: '4. Payment and Invoice Timing', paragraphs: ['MOQ is validated before invoice finalization.', 'Eligible payment-method discounts (10% crypto, 5% Revolut) are applied during invoice confirmation.']},
    ],
  })

  // ─── 12. Locations Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'locationsPage',
    _type: 'locationsPage',
    title: 'Locations & Coverage',
    description: 'See THCGummiesGermany wholesale coverage across Germany, DACH, and approved European markets, with region-specific compliance notes.',
    heroTitle: 'Wholesale Gummies Shipping Locations and EU Coverage',
    heroIntro: 'We support B2B wholesale delivery across Germany, Austria, Switzerland, and wider EU markets. Every order is reviewed against destination-specific compliance and product eligibility rules before dispatch.',
    lastUpdated: '2026-06-01',
    mapEmbedUrl: 'https://www.google.com/maps?q=Germany&output=embed',
    usStates: [],
    internationalCoverage: [
      {_type: 'object', title: 'Germany', details: 'Primary market. Guaranteed 48-hour dispatch to all Germany regions. CanG-compliant packaging and documentation on all outbound shipments.'},
      {_type: 'object', title: 'Austria & Switzerland (DACH)', details: 'DACH wholesale orders shipped via fully tracked, insured freight. Compliance documentation provided for cross-border shipments.'},
      {_type: 'object', title: 'EU Markets', details: 'Case-by-case support for approved EU countries including France, Netherlands, Belgium, Poland, Czech Republic, Italy, and Spain. Contact us for eligibility and transit windows.'},
    ],
    complianceNotes: [
      {_type: 'object', region: 'Germany (Primary)', note: 'All shipments CanG-compliant. Buyers are responsible for local licensing, age-gating (18+), and retail compliance.'},
      {_type: 'object', region: 'EU & International', note: 'Import approvals, duty structure, and SKU eligibility are validated before invoice confirmation. Buyers responsible for local import compliance.'},
    ],
    sections: [
      {_type: 'legalSection', title: '1. Germany Coverage', paragraphs: ['THCGummiesGermany supports B2B wholesale shipping across all German regions for eligible product categories.', 'All shipments are CanG-compliant with guaranteed 48-hour dispatch.'], bullets: ['All shipments reviewed for destination eligibility before release', 'Adult delivery (18+) workflow applied where required', 'CanG-compliant freight carriers and packaging used for all orders']},
      {_type: 'legalSection', title: '2. DACH & EU Shipping', paragraphs: ['DACH and EU orders ship via fully tracked and insured freight on approved lanes.', 'Product-category legality must be confirmed before invoice finalization.'], bullets: ['Austria and Switzerland available with full compliance documentation', 'EU routing available for approved markets', 'Importer-of-record responsibilities remain with the buyer']},
      {_type: 'legalSection', title: '3. Regional Compliance Notes', paragraphs: ['Cannabis laws and local regulations differ across EU member states.', 'Buyers are responsible for confirming local rules, licensing requirements, and retail restrictions in their jurisdictions.']},
    ],
  })

  // ─── 13. Wholesale Form Config ───────────────────────────────────────────
  await upsert({
    _id: 'wholesaleFormConfig',
    _type: 'wholesaleFormConfig',
    estimatedOrderValues: [
      {_key: 'range-500', rangeLabel: '€500 – €1,500', rangeValue: 'range-500', sortOrder: 0},
      {_key: 'range-1500', rangeLabel: '€1,500 – €5,000', rangeValue: 'range-1500', sortOrder: 1},
      {_key: 'range-5000', rangeLabel: '€5,000 – €10,000', rangeValue: 'range-5000', sortOrder: 2},
      {_key: 'range-10000', rangeLabel: '€10,000+', rangeValue: 'range-10000', sortOrder: 3},
    ],
    paymentMethods: [
      {_key: 'crypto', label: 'Cryptocurrency (BTC, ETH, USDT)', methodValue: 'crypto', helpText: '10% discount available', sortOrder: 0},
      {_key: 'revolut', label: 'Revolut', methodValue: 'revolut', helpText: '5% discount available', sortOrder: 1},
      {_key: 'bank', label: 'Bank Transfer', methodValue: 'bank', helpText: 'Contact our team for terms', sortOrder: 2},
    ],
    formLabels: {
      businessNameLabel: 'Business Name', businessNameHelp: 'Your company or business name',
      contactNameLabel: 'Contact Name', contactNameHelp: 'Primary contact person',
      emailLabel: 'Email Address', emailHelp: "We'll send confirmation to this address",
      phoneLabel: 'Phone Number', phoneHelp: 'Your business or personal phone number',
      countryStateLabel: 'Country / Region', countryStateHelp: 'Your location in Germany or the EU',
      productInterestsLabel: 'Product Interests', productInterestsHelp: 'Select at least one option',
      orderValueLabel: 'Estimated Order Value', orderValueHelp: 'Your typical monthly order range in EUR',
      paymentMethodLabel: 'Preferred Payment Method', paymentMethodHelp: "How you'd prefer to pay",
      notesLabel: 'Additional Notes (Optional)', notesHelp: 'Any additional information for our team',
      submitButtonText: 'Submit Inquiry',
    },
  })

  console.log('\n🎉 Seed complete! All THCGummiesGermany content has been created in Sanity.')
  console.log('   → Open Sanity Studio and publish each document to make it live.')
  console.log('   → Add a hero image to the About Page (required field — Studio will prompt you).')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
