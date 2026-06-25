/**
 * Seed script — syncs all content from "Thc gummies German.docx" into Sanity.
 *
 * Run from thcgummiesgermany-sanity/:
 *   pnpm seed:content-doc
 *
 * This uses `sanity exec --with-user-token` so you must be logged in:
 *   pnpm exec sanity login
 *
 * OR set a token in thcgummiesgermany-sanity/.env:
 *   SANITY_AUTH_TOKEN=sk<your-editor-token>   ← Editor role, from sanity.io/manage
 *
 * Safe to re-run — uses createOrReplace (upsert) on every document.
 * After running: open Sanity Studio and PUBLISH each updated document.
 */

import 'dotenv/config'
import {getSanityWriteClient, isInsufficientSanityPermission, printSanityWritePermissionHelp} from './sanityWriteClient'

const client = getSanityWriteClient()

// ─── Singleton IDs (must match schemaTypes/singletons.ts) ─────────────────
const HOME_PAGE_ID     = 'ff42da08-7a52-4d28-9f62-016a68ca4167'
const WHOLESALE_PAGE_ID = 'wholesalePage'
const COMPLIANCE_PAGE_ID = 'compliancePage'
const ABOUT_PAGE_ID    = 'aboutPage'
const CONTACT_PAGE_ID  = 'contactPage'

// ─── Helpers ──────────────────────────────────────────────────────────────
let _keyCounter = 0
function key(prefix = 'k') {
  return `${prefix}${(++_keyCounter).toString(36).padStart(4, '0')}`
}

function blocks(...segments: Array<string | { bold: string }>) {
  const children = segments.map((seg) => {
    if (typeof seg === 'string') {
      return { _type: 'span' as const, _key: key('s'), marks: [] as string[], text: seg }
    }
    return { _type: 'span' as const, _key: key('s'), marks: ['strong'], text: seg.bold }
  })
  return [
    {
      _type: 'block' as const,
      _key: key('b'),
      style: 'normal',
      markDefs: [{ _type: 'strong', _key: key('m') }],
      children,
    },
  ]
}

function textBlock(text: string) {
  return {
    _type: 'block' as const,
    _key: key('b'),
    style: 'normal',
    markDefs: [] as never[],
    children: [{ _type: 'span' as const, _key: key('s'), marks: [] as string[], text }],
  }
}

function boldSpan(text: string) {
  return { _type: 'span' as const, _key: key('s'), marks: ['strong' as string], text }
}

function plainSpan(text: string) {
  return { _type: 'span' as const, _key: key('s'), marks: [] as string[], text }
}

function richBlock(...children: ReturnType<typeof boldSpan | typeof plainSpan>[]) {
  return {
    _type: 'block' as const,
    _key: key('b'),
    style: 'normal',
    markDefs: [] as never[],
    children,
  }
}

async function upsert(doc: Record<string, unknown>) {
  const result = await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✅  ${result._type}  (${result._id})`)
  return result
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱  Seeding content document into Sanity…\n')

  // ── 1. Homepage ──────────────────────────────────────────────────────────
  // Doc: H1 "THC Gummies Germany - Your #1 Wholesale & Bulk Source"
  // Doc: Sub-H1 "Premium Edibles, Unbeatable Prices, and Guaranteed 48h Delivery Across Europe."
  // Doc: Meta Title "THC Gummies Germany | Buy Bulk Edibles & Wholesale Brands"
  // Doc: Meta Desc "THC gummies in Germany are available for bulk purchase..."
  await upsert({
    _id: HOME_PAGE_ID,
    _type: 'homePage',
    seoTitle: 'THC Gummies Germany | Buy Bulk Edibles & Wholesale Brands',
    seoDescription:
      'THC gummies in Germany are available for bulk purchase. Order top-tier brands with 48h delivery. Secure the best market prices for retail and wholesale supply now.',
    heroBadge: 'THCGummiesGermany.com',
    heroHeading: 'THC Gummies Germany - Your #1 Wholesale & Bulk Source',
    heroSubheading: 'Premium Edibles, Unbeatable Prices, and Guaranteed 48h Delivery Across Europe.',
    heroPrimaryCtaLabel: 'Shop THC Gummies',
    heroPrimaryCtaHref: '/category/thc-gummies',
    heroSecondaryCtaLabel: 'Apply for Wholesale',
    heroSecondaryCtaHref: '/wholesale',
    trustStripItems: [
      { _type: 'homeTrustItem', _key: key('t'), title: 'Guaranteed 48h EU Delivery',   iconKey: 'truck',          accent: 'cyan'   },
      { _type: 'homeTrustItem', _key: key('t'), title: 'COA-Verified Authentic Stock',  iconKey: 'badgeCheck',     accent: 'purple' },
      { _type: 'homeTrustItem', _key: key('t'), title: 'CanG Compliant',                iconKey: 'shieldCheck',    accent: 'cyan'   },
      { _type: 'homeTrustItem', _key: key('t'), title: '50-Unit Minimum Orders',         iconKey: 'calendarCheck2', accent: 'purple' },
      { _type: 'homeTrustItem', _key: key('t'), title: 'Dedicated B2B Support',          iconKey: 'headset',        accent: 'cyan'   },
    ],
    // Authority block body = doc body content (bold keywords preserved via ** markers)
    authorityEyebrow: 'Why Choose Our Wholesale Network?',
    authorityHeading: 'THC Gummies Germany - Your #1 Wholesale & Bulk Source',
    // Use ** markers — the HomeAuthorityBlock component parses them via renderTextWithBold
    authorityIntro:
      '**THC gummies in Germany** are the core of our high-volume distribution network, providing retailers with instant access to the world\'s most sought-after brands. At **thcgummiesgermany.com**, we bridge the gap between global manufacturers and the European market, offering an "Omni-Trust" supply chain that guarantees quality, compliance, and speed. Whether you are looking to **buy** for a boutique dispensary or **order** for large-scale retail, our pricing is engineered to maximize your margins.',
    authorityPoints: [
      {
        _type: 'homeAuthorityPoint', _key: key('ap'),
        title: 'Top Brands',
        description: 'Direct access to Canapuff, Tyson 2.0, Cookies, and more.',
        iconKey: 'badgeCheck',
      },
      {
        _type: 'homeAuthorityPoint', _key: key('ap'),
        title: '48h Delivery',
        description: 'We ship from local hubs to ensure your stock never runs low.',
        iconKey: 'shieldCheck',
      },
      {
        _type: 'homeAuthorityPoint', _key: key('ap'),
        title: 'Best Price Guarantee',
        description: 'High-volume discounts for **bulk** buyers.',
        iconKey: 'walletCards',
      },
    ],
    authorityCtaLabel: 'Browse All Products',
    authorityCtaHref: '/products',
    // FAQ section labels
    faqEyebrow: 'Related FAQs',
    faqHeading: 'THC Gummies Germany — Bulk Ordering, Compliance & Delivery',
    faqDescription:
      'Straight answers on sourcing authentic THC gummies in Germany, wholesale ordering, and our 48h tracked EU delivery.',
    faqViewAllLabel: 'View full FAQ page',
    // Crypto / payment section
    cryptoEyebrow: 'Payment Incentives',
    cryptoHeading: 'Pay with Crypto - Get 10% Off Instantly',
    cryptoDescription:
      'We accept BTC, ETH, and USDT for a 10% discount on qualified wholesale orders. Prefer Revolut? Receive 5% off with fast invoice turnaround.',
    cryptoCtaLabel: 'How It Works',
    cryptoCtaHref: '/how-to-buy',
    // How-to section
    howToBadge: 'Simple Process',
    howToHeading: 'How to Order',
    howToSteps: [
      { _type: 'homeHowToStep', _key: key('step'), title: 'Browse the Catalog', description: 'Explore our THC gummies, weed gummies, and cannabis edibles by brand, potency, and format.', iconKey: 'search' },
      { _type: 'homeHowToStep', _key: key('step'), title: 'Submit Inquiry',    description: 'Send your business details and product requirements through our wholesale application form.', iconKey: 'send' },
      { _type: 'homeHowToStep', _key: key('step'), title: 'Receive Invoice',   description: 'Receive a proforma invoice with COA documentation and payment options within one business day.', iconKey: 'mail' },
      { _type: 'homeHowToStep', _key: key('step'), title: '48h EU Dispatch',   description: 'Orders are packaged and dispatched within 48 hours with tracked delivery across Germany, DACH, and Europe.', iconKey: 'packageCheck' },
    ],
    howToCtaLabel: 'Start Your Order',
    howToCtaHref: '/wholesale-request',
    // Brands section
    brandsEyebrow: 'Brand Partners',
    brandsHeading: 'Brands We Carry',
    // Blog section
    blogEyebrow: 'Latest Insights',
    blogHeading: 'From the Blog',
    blogDescription:
      'Cannabis edibles industry news, German CanG compliance guides, brand deep-dives, and wholesale buying tips for European retailers.',
    blogViewAllLabel: 'View All Posts',
    // Testimonials
    testimonialsBadge: 'Trusted by Buyers',
    testimonialsHeading: 'Trusted by Thousands',
    testimonialsIntro:
      'Real feedback from dispensaries, smoke shops, and wholesale partners sourcing THC gummies and edibles from THCGummiesGermany.',
    // Compliance band
    complianceShopCtaLabel: 'Visit Shop',
    complianceShopCtaHref: '/products',
    complianceContactCtaLabel: 'Contact Sales Manager',
    complianceContactCtaHref: '/contact',
    complianceDisclaimerPlain:
      'All products distributed by thcgummiesgermany.com comply with the German Cannabis Act (CanG). Products are for adult use only (18+). Buyers are responsible for ensuring compliance with local jurisdiction laws before resale.',
  })

  // ── 2. FAQ Items (doc Related FAQs — homepage + cross-page) ─────────────
  const faqItems = [
    {
      _id: 'faq-doc-bulk-order',
      question: 'Can I order THC gummies in bulk for delivery in Germany?',
      answer: 'Yes, we specialize in high-volume wholesale orders with guaranteed 48h shipping.',
      category: 'Ordering',
      order: 10,
    },
    {
      _id: 'faq-doc-genuine-brands',
      question: 'Are the brands on your site genuine?',
      answer: 'We only supply authentic products from top-tier brands like Canapuff and Camino.',
      category: 'Products',
      order: 20,
    },
    {
      _id: 'faq-doc-wholesale-pricing',
      question: 'How do I qualify for wholesale pricing?',
      answer: 'Simply register your business account to unlock our "GEO-MAX" tier pricing.',
      category: 'Ordering',
      order: 30,
    },
    {
      _id: 'faq-doc-weed-shelf-life',
      question: 'What is the shelf life of your weed gummies?',
      answer: 'Our products are fresh-stock only, typically offering a 12-month shelf life.',
      category: 'Products',
      order: 40,
    },
    {
      _id: 'faq-doc-white-label',
      question: 'Do you offer white-label weed gummies?',
      answer: 'Yes, contact our sales team for custom branding options.',
      category: 'General',
      order: 50,
    },
    {
      _id: 'faq-doc-cannabis-lab-tested',
      question: 'Are these cannabis gummies lab-tested?',
      answer: 'Yes, every batch is accompanied by a Certificate of Analysis (COA).',
      category: 'Products',
      order: 60,
    },
    {
      _id: 'faq-doc-cannabis-packaging',
      question: 'How are the gummies packaged for wholesale?',
      answer: 'They are available in retail-ready display boxes or bulk-packed bags.',
      category: 'Products',
      order: 70,
    },
    {
      _id: 'faq-doc-moq',
      question: 'What is the minimum order quantity (MOQ) for wholesale?',
      answer: 'Our MOQs vary by brand but typically start at 50 units.',
      category: 'Ordering',
      order: 80,
    },
    {
      _id: 'faq-doc-bulk-shipping-discount',
      question: 'Do you offer shipping discounts on bulk orders?',
      answer: 'Orders over €1,000 qualify for free express 48h shipping.',
      category: 'Shipping',
      order: 90,
    },
  ]

  console.log('\n  Seeding FAQ items…')
  for (const faq of faqItems) {
    await upsert({
      _id: faq._id,
      _type: 'faqItem',
      question: faq.question,
      answer: [textBlock(faq.answer)],
      category: faq.category,
      order: faq.order,
      isActive: true,
    })
  }

  // ── 3. Weed Gummies — Supporting Page ────────────────────────────────────
  // Doc URL: /weed-gummies
  // Doc H1: "Weed Gummies for Sale - Bulk Wholesale Solutions"
  // Doc Sub-H1: "Source High-Potency Edibles for Your Retail Store at the Best Prices."
  console.log('\n  Seeding /weed-gummies supporting page…')
  await upsert({
    _id: 'supporting-page-weed-gummies',
    _type: 'supportingPage',
    title: 'Weed Gummies for Sale - Bulk Wholesale Solutions',
    slug: { _type: 'slug', current: 'weed-gummies' },
    exactKeyword: 'Weed gummies for sale',
    subH1: 'Source High-Potency Edibles for Your Retail Store at the Best Prices.',
    metaTitle: 'Weed Gummies for Sale | Wholesale Bulk Supply in Germany',
    metaDescription:
      'Weed gummies for sale at wholesale prices. Secure bulk orders of premium edibles with fast 48h shipping. The best source for retailers in Germany and Europe.',
    // Bold keywords in introParagraphs are parsed by renderTextWithBold in SupportingPageHero
    introParagraphs: [
      '**Weed gummies for sale** through our wholesale portal are curated for potency, flavor, and consumer demand. We understand that as a retailer, you need consistent stock and reliable delivery. Our **weed gummies** category features everything from classic bears to modern fruit chews, all lab-tested and ready for immediate dispatch. **Buy** in bulk today to take advantage of our current inventory of top-selling brands.',
    ],
    pageFaqs: [
      {
        _key: key('fq'),
        question: 'What is the shelf life of your weed gummies?',
        answer: 'Our products are fresh-stock only, typically offering a 12-month shelf life.',
      },
      {
        _key: key('fq'),
        question: 'Do you offer white-label weed gummies?',
        answer: 'Yes, contact our sales team for custom branding options.',
      },
    ],
    primaryCtaLabel: 'Shop Weed Gummies',
    primaryCtaHref: '/products',
    secondaryCtaLabel: 'Apply for Wholesale',
    secondaryCtaHref: '/wholesale',
    // No parentPage = root level → served at /weed-gummies
  })

  // ── 4. Cannabis Gummies — Supporting Page ─────────────────────────────────
  // Doc URL: /cannabis-gummies
  // Doc H1: "Cannabis Gummies - Premium Wholesale Distribution"
  // Doc Sub-H1: "European Supply of Lab-Tested Cannabis Edibles for Professional Retailers."
  console.log('\n  Seeding /cannabis-gummies supporting page…')
  await upsert({
    _id: 'supporting-page-cannabis-gummies',
    _type: 'supportingPage',
    title: 'Cannabis Gummies - Premium Wholesale Distribution',
    slug: { _type: 'slug', current: 'cannabis-gummies' },
    exactKeyword: 'Cannabis gummies',
    subH1: 'European Supply of Lab-Tested Cannabis Edibles for Professional Retailers.',
    metaTitle: 'Cannabis Gummies Wholesale | Order Bulk Edibles Germany',
    metaDescription:
      'Cannabis gummies are available for wholesale orders. Get the best prices on top-quality brands with 48h delivery across Europe. Secure your bulk supply now.',
    introParagraphs: [
      '**Cannabis gummies** from our distribution center represent the gold standard in the European market. When you **order** through our platform, you are securing products that have passed rigorous quality control standards. These **cannabis gummies** are available for **sale** to registered businesses looking for a competitive edge in the rapidly expanding German market.',
    ],
    pageFaqs: [
      {
        _key: key('fq'),
        question: 'Are these cannabis gummies lab-tested?',
        answer: 'Yes, every batch is accompanied by a Certificate of Analysis (COA).',
      },
      {
        _key: key('fq'),
        question: 'How are the gummies packaged for wholesale?',
        answer: 'They are available in retail-ready display boxes or bulk-packed bags.',
      },
    ],
    primaryCtaLabel: 'Shop Cannabis Gummies',
    primaryCtaHref: '/products',
    secondaryCtaLabel: 'Apply for Wholesale',
    secondaryCtaHref: '/wholesale',
  })

  // ── 5. Wholesale Page ─────────────────────────────────────────────────────
  // Doc URL: /wholesale-bulk (the /wholesale route also uses these defaults)
  // Doc H1: "Wholesale & Bulk THC Gummies - B2B Distribution"
  // Doc Sub-H1: "Unlock Tiered Pricing and Priority 48h Shipping on All Bulk Orders."
  console.log('\n  Seeding wholesale page…')
  await upsert({
    _id: WHOLESALE_PAGE_ID,
    _type: 'wholesalePage',
    seoTitle: 'Wholesale THC Gummies | Bulk Order Pricing & 48h Shipping',
    seoDescription:
      'Wholesale THC gummies at the lowest market rates. Order bulk quantities for your retail business with 48h delivery guaranteed. Join Germany\'s top supply network.',
    heroBadge: 'B2B Wholesale',
    heroHeading: 'Wholesale & Bulk THC Gummies - B2B Distribution',
    heroSubhead: 'Unlock Tiered Pricing and Priority 48h Shipping on All Bulk Orders.',
    heroTrustLine1: '50-Unit Minimum Orders',
    heroTrustLine2: 'Guaranteed 48h EU Delivery',
    whyHeading: 'Why Choose Our Wholesale Network?',
    whyIntro:
      '**Wholesale THC gummies** are our specialty, offering a streamlined "7-Box Micro-Silo" ordering system for business owners. We provide the most aggressive pricing in the EU for those looking to **buy** in significant quantities. This **bulk** program is designed for long-term partnerships, ensuring your shelves are always stocked with the latest high-demand products.',
    benefits: [
      { _type: 'wholesaleBenefit', _key: key('b'), title: 'Top Brands',            description: 'Direct access to Canapuff, Tyson 2.0, Cookies, and more.',                                         iconKey: 'badgePercent' },
      { _type: 'wholesaleBenefit', _key: key('b'), title: '48h Delivery',           description: 'We ship from local hubs to ensure your stock never runs low.',                                      iconKey: 'truck'        },
      { _type: 'wholesaleBenefit', _key: key('b'), title: 'Best Price Guarantee',   description: 'High-volume discounts for **bulk** buyers.',                                                        iconKey: 'wallet'       },
      { _type: 'wholesaleBenefit', _key: key('b'), title: 'COA-Verified Stock',     description: 'Every batch ships with a Certificate of Analysis from an accredited lab.',                          iconKey: 'shieldCheck'  },
      { _type: 'wholesaleBenefit', _key: key('b'), title: 'CanG Compliant',         description: 'All products comply with the German Cannabis Act and applicable EU regulations.',                   iconKey: 'package'      },
      { _type: 'wholesaleBenefit', _key: key('b'), title: 'Dedicated B2B Support',  description: 'A dedicated account manager for every wholesale partner.',                                          iconKey: 'headphones'   },
    ],
    howHeading: 'How to Place a Bulk Order',
    howIntro: 'Getting started is straightforward. Follow these four steps to secure your first order.',
    steps: [
      { _type: 'wholesaleStep', _key: key('st'), title: 'Browse the Catalog', description: 'Explore our THC gummies, weed gummies, and cannabis edibles by brand, potency, and format.', iconKey: 'search'      },
      { _type: 'wholesaleStep', _key: key('st'), title: 'Submit Inquiry',     description: 'Send your business details and requirements through our wholesale application form.',          iconKey: 'send'        },
      { _type: 'wholesaleStep', _key: key('st'), title: 'Receive Invoice',    description: 'Receive a proforma invoice with COA documentation within one business day.',                   iconKey: 'fileText'    },
      { _type: 'wholesaleStep', _key: key('st'), title: '48h EU Dispatch',    description: 'Orders are packaged and dispatched within 48 hours with tracked delivery across Germany, DACH, and Europe.', iconKey: 'truck' },
    ],
    discountHeading: 'Payment & Volume Discounts',
    discountIntro: 'We offer competitive discounts for crypto payments and high-volume bulk orders.',
    paymentCardTitle: 'Crypto Payment Discount',
    paymentCardDescription: 'Pay with BTC, ETH, or USDT and receive an instant 10% discount on your wholesale order.',
    cryptoRowLabel: 'Crypto (BTC / ETH / USDT)',
    cryptoDiscountLabel: '10% off',
    revolutRowLabel: 'Revolut',
    revolutDiscountLabel: '5% off',
    volumeCardTitle: 'Volume Pricing Tiers',
    volumeCardDescription: 'The more you order, the lower your per-unit cost.',
    volumeTiers: [
      { _type: 'volumeTier', _key: key('vt'), tier: '50–199 units',   note: 'Standard wholesale pricing.' },
      { _type: 'volumeTier', _key: key('vt'), tier: '200–499 units',  note: '5% volume discount.'        },
      { _type: 'volumeTier', _key: key('vt'), tier: '500–999 units',  note: '10% volume discount.'       },
      { _type: 'volumeTier', _key: key('vt'), tier: '1,000+ units',   note: 'Best rate — contact us for a custom quote.' },
    ],
    formHeading: 'Apply for a Wholesale Account',
    formIntro:
      'Register your business to unlock tiered pricing, COA documentation, and priority 48h dispatch across Germany, DACH, and Europe.',
    wholesaleRequestPage: {
      badge: 'B2B Wholesale',
      heading: 'Apply for Wholesale Access',
      intro:
        'Complete the form below to register your business account. A dedicated account manager will follow up within one business day with your proforma invoice and COA documentation.',
      thankYouHeading: 'Application Received',
      thankYouIntro:
        'Thank you for applying for a wholesale account with THC Gummies Germany. A team member will follow up within one business day.',
      thankYouNextStepsTitle: 'What happens next',
      thankYouUrgentHelpTitle: 'Need urgent assistance?',
      thankYouUrgentHelpBody:
        'For time-sensitive inquiries, reply to your confirmation email or contact us directly at sales@thcgummiesgermany.com.',
      supportEmail: 'sales@thcgummiesgermany.com',
    },
    testimonialsHeading: 'Trusted by Wholesale Partners',
    testimonialsIntro:
      'Real feedback from dispensaries, smoke shops, and wholesale partners sourcing THC gummies from THC Gummies Germany.',
    faqHeading: 'Related FAQs',
    faqIntro: 'Common questions about our wholesale and bulk ordering programme.',
    faqs: [
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'What is the minimum order quantity (MOQ) for wholesale?', answer: 'Our MOQs vary by brand but typically start at 50 units.' },
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'Do you offer shipping discounts on bulk orders?',         answer: 'Orders over €1,000 qualify for free express 48h shipping.' },
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'Can I order THC gummies in bulk for delivery in Germany?', answer: 'Yes, we specialize in high-volume wholesale orders with guaranteed 48h shipping.' },
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'Are the brands on your site genuine?',                    answer: 'We only supply authentic products from top-tier brands like Canapuff and Camino.' },
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'How do I qualify for wholesale pricing?',                 answer: 'Simply register your business account to unlock our "GEO-MAX" tier pricing.' },
      { _type: 'wholesaleFaq', _key: key('wf'), question: 'Do your THC gummies come with a Certificate of Analysis?', answer: 'Yes. Every SKU ships with a COA from an accredited third-party lab confirming cannabinoid potency and residual contaminant levels.' },
    ],
  })

  // ── 6. About Page ─────────────────────────────────────────────────────────
  // Doc: "THC Gummies Germany is the leading B2B supplier of premium cannabinoid edibles
  //       in the DACH region... Omni-Trust... Quality, Price, Speed."
  console.log('\n  Seeding about page…')
  await upsert({
    _id: ABOUT_PAGE_ID,
    _type: 'aboutPage',
    seoTitle: 'About THC Gummies Germany — B2B Wholesale Cannabis Edibles Distributor',
    seoDescription:
      'THC Gummies Germany is the leading B2B supplier of premium cannabinoid edibles in the DACH region, providing the Omni-Trust standard of service to retailers across Europe.',
    pageHeading: 'About THC Gummies Germany',
    introLead:
      '**THC Gummies Germany** is the leading B2B supplier of premium cannabinoid edibles in the DACH region. Founded by experts in programmatic logistics and SEO-driven commerce, our mission is to provide the "Omni-Trust" standard of service to retailers across Europe. We focus on three pillars: **Quality, Price, and Speed.**',
    storyHeading: 'Our Foundational Mission',
    storyBody: [
      richBlock(
        boldSpan('THC Gummies Germany'),
        plainSpan(' was founded to eliminate the bottleneck facing European cannabis retailers. When demand for THC gummies, weed gummies, and premium cannabis edibles surges, dispensaries and head shops are left waiting weeks for back-ordered stock. We bridge the gap between global manufacturers and the European market.'),
      ),
      textBlock(
        'Our platform was established to dismantle that bottleneck permanently. We operate as a premier, dedicated distribution network, taking on the complex operational burdens of international freight sourcing, customs clearance, and regulatory compliance.',
      ),
    ],
    missionHeading: 'What Sets Our Distribution Apart',
    missionBody: [
      textBlock('We don\'t operate as a standard middleman broker. We maintain end-to-end control over our product pipeline to offer a completely unified supply solution built on three pillars:'),
      richBlock(boldSpan('Quality:'), plainSpan(' Every batch ships with a Certificate of Analysis from an accredited third-party lab, confirming cannabinoid potency and compliance with the German Cannabis Act (CanG).')),
      richBlock(boldSpan('Price:'), plainSpan(' We leverage high-volume purchasing power directly at the manufacturer level to offer the most aggressive wholesale pricing in the EU, with tiered discounts that scale with your order size.')),
      richBlock(boldSpan('Speed:'), plainSpan(' Orders confirmed before our daily cutoff are packaged and dispatched within 48 hours with tracked delivery across Germany, DACH, and Europe.')),
    ],
    stats: [
      { _type: 'object', _key: key('st'), value: '48H',  label: 'Guaranteed Delivery' },
      { _type: 'object', _key: key('st'), value: '50+',  label: 'Min Order Units'      },
      { _type: 'object', _key: key('st'), value: 'COA',  label: 'Every Batch'          },
      { _type: 'object', _key: key('st'), value: 'CanG', label: 'Compliant'            },
    ],
    complianceHeading: 'Our Three Pillars',
    complianceIntro: 'Everything we do is guided by three core commitments to our wholesale partners.',
    compliancePoints: [
      {
        _type: 'object', _key: key('cp'),
        title: 'Quality',
        description: 'Every batch of **THC gummies** and cannabis edibles ships with a Certificate of Analysis from an accredited third-party lab.',
      },
      {
        _type: 'object', _key: key('cp'),
        title: 'Price',
        description: 'We offer the most aggressive wholesale pricing in the EU, with tiered discounts that scale with your order size.',
      },
      {
        _type: 'object', _key: key('cp'),
        title: 'Speed',
        description: 'Orders are packaged and dispatched within 48 hours with tracked delivery across Germany, DACH, and Europe.',
      },
    ],
    ctaLabel: 'Start Your Wholesale Order →',
    ctaHref: '/wholesale-request',
  })

  // ── 7. Contact Page ───────────────────────────────────────────────────────
  // Doc: "Get in touch with our wholesale specialists today..."
  // Doc: Email sales@thcgummiesgermany.com | Response time: Under 2 hours
  console.log('\n  Seeding contact page…')
  await upsert({
    _id: CONTACT_PAGE_ID,
    _type: 'contactPage',
    seoTitle: 'Contact THC Gummies Germany | B2B Wholesale Support',
    seoDescription:
      'Get in touch with our wholesale specialists. Whether you have questions about a specific bulk order or need assistance with your business account, our team is ready to help.',
    pageHeading: 'Get in Touch with Our Wholesale Specialists',
    introLead:
      '**Get in touch** with our wholesale specialists today. Whether you have questions about a specific **bulk order** or need assistance with your business account, our team is ready to help.',
    formHeading: 'Send Us a Message',
    formIntro:
      'Fill in the form below and a member of our wholesale team will respond within 2 hours during business hours.',
    nameFieldLabel: 'Full name',
    emailFieldLabel: 'Email address',
    subjectFieldLabel: 'Subject',
    messageFieldLabel: 'Message',
    submitButtonLabel: 'Send message',
    subjectOptions: [
      { _type: 'object', _key: key('so'), value: 'general',   label: 'General question'   },
      { _type: 'object', _key: key('so'), value: 'order',     label: 'Order & invoice'    },
      { _type: 'object', _key: key('so'), value: 'wholesale', label: 'Wholesale / B2B'    },
      { _type: 'object', _key: key('so'), value: 'logistics', label: 'Freight & logistics' },
    ],
    successTitle: 'Message received',
    successMessage:
      'Thanks for contacting THC Gummies Germany. A team member will follow up within 2 hours. If your request is urgent, reply to your confirmation email.',
    detailsHeading: 'Contact details',
    contactEmail: 'sales@thcgummiesgermany.com',
    businessHours: 'Monday–Friday, 09:00–18:00 CET. Priority same-day response for active wholesale accounts.',
    responsePromise: 'Under 2 hours during business hours.',
  })

  // ── 8. Compliance Page ────────────────────────────────────────────────────
  // Doc: "Compliance Notice: All products distributed by thcgummiesgermany.com
  //       comply with the German Cannabis Act (CanG)..."
  // Doc: "Warning: Products are for adult use only (18+)..."
  console.log('\n  Seeding compliance page…')
  await upsert({
    _id: COMPLIANCE_PAGE_ID,
    _type: 'compliancePage',
    title: 'Legality, Compliance & Warning',
    description:
      'All products distributed by thcgummiesgermany.com comply with the German Cannabis Act (CanG) and relevant EU regulations. Products are for adult use only (18+).',
    lastUpdated: new Date().toISOString().split('T')[0],
    sections: [
      {
        _type: 'legalSection',
        _key: key('ls'),
        title: 'Compliance Notice',
        paragraphs: [
          '**Compliance Notice:** All products distributed by **thcgummiesgermany.com** comply with the German Cannabis Act (CanG) and relevant EU regulations regarding industrial hemp and THC thresholds (typically <0.3% or <0.2% depending on the specific product category).',
        ],
      },
      {
        _type: 'legalSection',
        _key: key('ls'),
        title: 'Warning',
        paragraphs: [
          '**Warning:** Products are for adult use only (18+). Keep out of reach of children. Do not operate heavy machinery or drive after consumption. Our products are sold for authorized retail purposes only; buyers are responsible for ensuring compliance with local jurisdiction laws before resale.',
        ],
      },
      {
        _type: 'legalSection',
        _key: key('ls'),
        title: 'Age Verification & Buyer Qualification',
        paragraphs: [
          'All wholesale accounts are subject to business verification and must confirm that they operate in a jurisdiction where the sale and distribution of THC products is legally permitted. THC Gummies Germany does not sell to individuals under 18 years of age, nor to unlicensed retailers.',
        ],
      },
      {
        _type: 'legalSection',
        _key: key('ls'),
        title: 'COA Verification & Quality Assurance',
        paragraphs: [
          'Every product in our catalog is supported by a Certificate of Analysis (COA) from an accredited third-party laboratory. Our QA process includes:',
        ],
        bullets: [
          'Verification of cannabinoid potency (THC, CBD, and minor cannabinoids) against labeled specifications.',
          'Residual contaminant testing to confirm compliance with safety thresholds.',
          'Batch number reconciliation between manufacturer documentation and COA records.',
        ],
      },
    ],
  })

  console.log('\n🎉  Seed complete! All content document pages are now in Sanity.')
  console.log('   → Open Sanity Studio and PUBLISH each document to make it live.')
  console.log('   → /weed-gummies and /cannabis-gummies need a hero image (upload in Studio).')
  console.log('   → About page requires a story image (upload in Studio — it is a required field).')
}

seed().catch((err: unknown) => {
  if (isInsufficientSanityPermission(err)) {
    printSanityWritePermissionHelp()
  } else {
    console.error('\n❌  Seed failed:', err)
  }
  process.exit(1)
})
