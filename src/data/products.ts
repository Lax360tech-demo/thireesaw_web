import type { Product } from '../types';
import { BRAND_CONFIG } from './brand';

// Saree Local Assets (Generated & Unique)
import kanchipuramBridalImg from '../assets/products/sarees/kanchipuram_bridal.jpg';
import roseOrganzaImg from '../assets/products/sarees/rose_organza.jpg';
import banarasiGeorgetteImg from '../assets/products/sarees/banarasi_georgette.jpg';
import kasavuTempleImg from '../assets/products/sarees/kasavu_temple.jpg';
import tealChanderiImg from '../assets/products/sarees/teal_chanderi.jpg';

// Salwar Local Assets (Generated & Unique)
import emeraldVelvetAnarkaliImg from '../assets/products/salwar/emerald_velvet_anarkali.jpg';
import dustyRoseAnarkaliImg from '../assets/products/salwar/dusty_rose_anarkali.jpg';
import mustardShararaImg from '../assets/products/salwar/mustard_sharara.jpg';
import lavenderStraightSuitImg from '../assets/products/salwar/lavender_straight_suit.jpg';

// Gagra Local Assets (Generated & Unique)
import burgundyBridalGagraImg from '../assets/products/gagra/burgundy_bridal_gagra.jpg';
import hotPinkMirrorGagraImg from '../assets/products/gagra/hot_pink_mirror_gagra.jpg';
import mintGreenGagraImg from '../assets/products/gagra/mint_green_gagra.jpg';
import navyZardoziGagraImg from '../assets/products/gagra/navy_zardozi_gagra.png';

// Blouse Local Assets (Unique Artisan Indian Embroidery)
import peacockAariBlouseImg from '../assets/products/blouses/peacock_aari_blouse.jpg';
import crimsonZardosiBlouseImg from '../assets/products/blouses/crimson_zardosi_blouse.jpg';
import emeraldMaggamBlouseImg from '../assets/products/blouses/emerald_maggam_blouse.jpg';
import plumVelvetBlouseImg from '../assets/products/blouses/plum_velvet_blouse.jpg';
import kasavuTempleBlouseImg from '../assets/products/blouses/kasavu_temple_blouse.jpg';
import coralCutworkBlouseImg from '../assets/products/blouses/coral_cutwork_blouse.jpg';
import yellowBullionBlouseImg from '../assets/products/blouses/yellow_bullion_blouse.jpg';

// Jewellery Local Assets (Unique Curated & Generated)
import templeGoldNecklaceImg from '../assets/products/jewellery/temple_gold_necklace.jpg';
import kundanBridalNecklaceImg from '../assets/products/jewellery/kundan_bridal_necklace.jpg';
import lakshmiHaramImg from '../assets/products/jewellery/lakshmi_haram.jpg';
import rubyEmeraldJhumkaImg from '../assets/products/jewellery/ruby_emerald_jhumka.jpg';
import bridalBanglesImg from '../assets/products/jewellery/bridal_bangles.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // ==================== 1. SAREES (5 Products) ====================
  {
    id: 'td-sar-01',
    name: 'Royal Kanchipuram Pure Silk Bridal Saree',
    category: 'sarees',
    subcategory: 'Kanchipuram Silk',
    price: 24500,
    originalPrice: 28900,
    discount: 15,
    images: [kanchipuramBridalImg],
    colors: [
      { name: 'Bridal Crimson Red', hex: '#991b1b' },
      { name: 'Kanchi Gold', hex: '#ca8a04' },
      { name: 'Rani Hot Pink', hex: '#ff2a85' }
    ],
    sizes: ['Free Size (6.3m with Blouse Piece)'],
    description: 'A masterpiece from Thireeshaw Designers Salem atelier, this pure Kanchipuram silk saree features grand temple borders woven with 2-ply pure zari threads. Crafted for the bride seeking regal grace, complemented by a contrast brocade blouse piece with matching woven zari sleeves.',
    shortDescription: 'Pure Kanchipuram bridal silk with contrast korvai zari border and grand pallu.',
    material: '100% Pure Mulberry Silk & High-Grade Gold Zari',
    craftType: 'Zari Weave',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    details: [
      'Pure silk mark certified weave',
      'Intricate Korvai contrast gold border',
      'Heavy traditional temple motifs across pallu',
      'Includes 80cm unstitched pure silk blouse piece',
      'Finished with hand-knotted silk tassels'
    ],
    careInstructions: [
      'Strictly dry clean only',
      'Store wrapped in clean white cotton or muslin cloth',
      'Change folding lines every 4-6 months to preserve weave integrity'
    ]
  },
  {
    id: 'td-sar-02',
    name: 'Rose Embroidered Designer Organza Saree',
    category: 'sarees',
    subcategory: 'Organza & Silk',
    price: 8900,
    originalPrice: 11500,
    discount: 22,
    images: [roseOrganzaImg],
    colors: [
      { name: 'Blush Rose Pink', hex: '#f472b6' },
      { name: 'Champagne Ivory', hex: '#fef08a' }
    ],
    sizes: ['Free Size (5.5m + Unstitched Blouse)'],
    description: 'Delicate sheer luxury crafted for modern wedding festivities. Features gossamer-fine organza fabric hand-adorned with scalloped resham borders, subtle sequin highlights, and tone-on-tone threadwork floral trails designed at our Salem boutique.',
    shortDescription: 'Whisper-light designer organza saree with hand-embroidered floral scalloped borders.',
    material: 'Premium Semi-Sheer Organza with Resham Threadwork',
    craftType: 'Hand Embroidery',
    occasion: 'Reception',
    isBridal: false,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 28,
    details: [
      'Scalloped borders hand-cut with embroidery frame',
      'Feather-light organza drape',
      'Matching raw silk embroidered unstitched blouse included',
      'Subtle micro-sequin illumination'
    ],
    careInstructions: [
      'Professional dry clean only',
      'Low heat steam iron on reverse side'
    ]
  },
  {
    id: 'td-sar-03',
    name: 'Heritage Banarasi Katan Georgette Saree',
    category: 'sarees',
    subcategory: 'Banarasi Georgette',
    price: 18500,
    originalPrice: 22000,
    discount: 16,
    images: [banarasiGeorgetteImg],
    colors: [
      { name: 'Bottle Green', hex: '#14532d' },
      { name: 'Imperial Gold', hex: '#eab308' }
    ],
    sizes: ['Free Size (6.2m with Blouse Piece)'],
    description: 'A regal synthesis of Banarasi kadwa flora weaving on fluid katan georgette silk. Drapes effortlessly around the body, accented by a majestic gold zari pallu and artisanal meenakari touches in our signature South Indian boutique aesthetic.',
    shortDescription: 'Regal Banarasi katan georgette saree with intricate gold kadwa floral motifs.',
    material: 'Pure Katan Georgette with Antique Gold Zari',
    craftType: 'Zari Weave',
    occasion: 'Festive',
    isBridal: true,
    isNew: false,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 19,
    details: [
      'Fine 100% katan georgette silk',
      'Authentic Kadwa hand-weaving technique',
      'Contrast brocade blouse piece included',
      'Salem boutique certified quality'
    ],
    careInstructions: ['Dry clean only', 'Keep away from direct perfume sprays']
  },
  {
    id: 'td-sar-04',
    name: 'Traditional Kasavu Temple Border Saree',
    category: 'sarees',
    subcategory: 'Kasavu Handloom',
    price: 6500,
    originalPrice: 7900,
    discount: 17,
    images: [kasavuTempleImg],
    colors: [
      { name: 'Off-White Cream', hex: '#fefce8' },
      { name: 'Temple Gold', hex: '#ca8a04' }
    ],
    sizes: ['Free Size (6.25m with Blouse)'],
    description: 'Embodying sacred heritage, this pure cotton-silk Kasavu saree features opulent golden zari borders inspired by temple architecture. Pair it with our bespoke bridal blouses for auspicious muhurtham celebrations.',
    shortDescription: 'Classic off-white cream Kasavu saree with sacred temple gold zari borders.',
    material: 'Cotton-Silk Blend with Fine Zari',
    craftType: 'Zari Weave',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 31,
    details: [
      'Traditional Kerala/Tamil Nadu temple motif weave',
      'Comfortable lightweight all-day drape',
      'Comes with gold tissue blouse fabric'
    ],
    careInstructions: ['Hand wash gently in cold water or dry clean']
  },
  {
    id: 'td-sar-05',
    name: 'Teal Blue Chanderi Silk Zari Saree',
    category: 'sarees',
    subcategory: 'Chanderi Silk',
    price: 7800,
    originalPrice: 9500,
    discount: 18,
    images: [tealChanderiImg],
    colors: [
      { name: 'Peacock Teal Blue', hex: '#0e7490' },
      { name: 'Antique Gold', hex: '#ca8a04' }
    ],
    sizes: ['Free Size (5.5m + 80cm Blouse)'],
    description: 'Lustrous peacock teal hue woven with sheer Chanderi silk threads. Adorned with delicate gold coin buttas and a shimmering border, creating an understated yet captivating statement for reception evenings.',
    shortDescription: 'Lustrous peacock teal Chanderi silk saree with antique gold resham buttas.',
    material: 'Pure Chanderi Silk with Zari Work',
    craftType: 'Zari Weave',
    occasion: 'Party',
    isBridal: false,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 15,
    details: [
      'Glistening sheer texture',
      'Authentic Chanderi weave',
      'Running blouse piece included'
    ],
    careInstructions: ['Dry clean only']
  },

  // ==================== 2. SALWAR (4 Products) ====================
  {
    id: 'td-sal-01',
    name: 'Royal Emerald Velvet Embroidered Anarkali',
    category: 'salwar',
    subcategory: 'Anarkali Suit',
    price: 14500,
    originalPrice: 17500,
    discount: 17,
    images: [emeraldVelvetAnarkaliImg],
    colors: [
      { name: 'Emerald Forest Green', hex: '#064e3b' },
      { name: 'Gold Resham', hex: '#eab308' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    description: 'An ode to Mughal opulence, this floor-grazing Anarkali is cut from luxurious micro-velvet. Features heavy zardozi hand embroidery on the yoke and kalis, accompanied by an organza dupatta edged with scalloped gold lace.',
    shortDescription: 'Floor-length micro velvet Anarkali with intricate zardozi embroidery and organza dupatta.',
    material: 'Micro Velvet 9000 & Silk Organza Dupatta',
    craftType: 'Zardozi & Aari',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 23,
    details: [
      '36-panel voluminous flare',
      'Pure zardozi handwork with French bullion wire',
      'Full crepe lining for structured fit',
      'Custom sizing tailored in Salem workshop'
    ],
    careInstructions: ['Dry clean only', 'Store hung in garment bag']
  },
  {
    id: 'td-sal-02',
    name: 'Dusty Rose Floor-Length Bridal Anarkali',
    category: 'salwar',
    subcategory: 'Bridal Anarkali',
    price: 12900,
    originalPrice: 15000,
    discount: 14,
    images: [dustyRoseAnarkaliImg],
    colors: [
      { name: 'Dusty Rose Pink', hex: '#be185d' },
      { name: 'Rose Gold', hex: '#fb7185' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    description: 'Tailored from flowy heavy georgette, this bridal Anarkali features delicate pearl beads, tone-on-tone thread embroidery, and a sweeping silhouette designed for sangeet nights and destination weddings.',
    shortDescription: 'Heavy georgette bridal Anarkali adorned with tone-on-tone resham and pearl work.',
    material: 'Heavy Faux Georgette with Shantoon Lining',
    craftType: 'Machine Embroidery',
    occasion: 'Reception',
    isBridal: true,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 17,
    details: [
      'Embroidered sleeves and yoke',
      'Floor-sweeping flared hemline',
      'Includes matching churidar and embellished dupatta'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-sal-03',
    name: 'Mustard Yellow Handloom Chanderi Sharara',
    category: 'salwar',
    subcategory: 'Sharara Set',
    price: 9800,
    originalPrice: 11900,
    discount: 18,
    images: [mustardShararaImg],
    colors: [
      { name: 'Haldi Mustard Yellow', hex: '#eab308' },
      { name: 'Gota Silver', hex: '#e2e8f0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Radiate festive joy with this sunshine mustard yellow sharara set. Crafted with authentic gota-patti border detailing, layered flared pants, and a short peplum kurti designed for haldi ceremonies.',
    shortDescription: 'Festive mustard yellow Chanderi sharara set with traditional gota-patti borders.',
    material: 'Pure Handloom Chanderi Silk',
    craftType: 'Hand Embroidery',
    occasion: 'Festive',
    isBridal: false,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 36,
    details: [
      'Layered multi-tiered flared sharara',
      'Lightweight breathable festive silk',
      'Handcrafted gota-patti borders',
      'Tailored in Salem atelier'
    ],
    careInstructions: ['Gentle dry clean only']
  },
  {
    id: 'td-sal-04',
    name: 'Lavender Georgette Straight Cut Suit',
    category: 'salwar',
    subcategory: 'Straight Cut Suit',
    price: 6800,
    originalPrice: 8200,
    discount: 17,
    images: [lavenderStraightSuitImg],
    colors: [
      { name: 'Pastel Lavender', hex: '#a855f7' },
      { name: 'Silver Resham', hex: '#cbd5e1' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Chic, modern silhouette in soothing pastel lavender. Embellished with delicate threadwork neckline patterns and side slit accents, accompanied by straight cigarette pants and a printed dupatta.',
    shortDescription: 'Modern straight cut georgette suit with fine resham embroidery and cigarette pants.',
    material: 'Viscose Georgette with Silk Dupatta',
    craftType: 'Machine Embroidery',
    occasion: 'Casual',
    isBridal: false,
    isNew: false,
    isFeatured: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 14,
    details: [
      'Comfortable daily luxury fit',
      'Intricate computer embroidery neckline',
      'Pant with elasticated waistband and pockets'
    ],
    careInstructions: ['Machine wash gentle or dry clean']
  },

  // ==================== 3. GAGRA (4 Products) ====================
  {
    id: 'td-gag-01',
    name: 'Burgundy Velvet Heavy Bridal Gagra Choli',
    category: 'gagra',
    subcategory: 'Bridal Gagra',
    price: 32500,
    originalPrice: 38000,
    discount: 14,
    images: [burgundyBridalGagraImg],
    colors: [
      { name: 'Deep Burgundy Wine', hex: '#881337' },
      { name: 'Antique Gold Zari', hex: '#ca8a04' }
    ],
    sizes: ['Semi-Stitched (Custom tailoring available)'],
    description: 'The crowning jewel of our bridal trousseau collection. Rich micro-velvet gagra skirt lavishly adorned with traditional dori work, matte gold zardozi peacocks, and hand-placed kundan stones. Accompanied by a heavy matching blouse and double dupatta set.',
    shortDescription: 'Grand royal burgundy velvet bridal gagra with dense gold dori and zardozi needlework.',
    material: 'Micro Velvet 9000 with Satin Can-Can Underskirt',
    craftType: 'Zardozi & Aari',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 48,
    details: [
      'Full double-layer structured can-can for dramatic flare',
      'Heavy blouse with hand-crafted latkans and tassels',
      'Double dupatta: 1 velvet shoulder veil + 1 soft net head veil',
      'Custom sizing and blouse stitching in Salem'
    ],
    careInstructions: ['Strictly professional dry clean only']
  },
  {
    id: 'td-gag-02',
    name: 'Hot Pink Mirror Work Sangeet Gagra',
    category: 'gagra',
    subcategory: 'Sangeet Gagra',
    price: 19500,
    originalPrice: 24000,
    discount: 19,
    images: [hotPinkMirrorGagraImg],
    colors: [
      { name: 'Signature Hot Pink', hex: '#ff2a85' },
      { name: 'Mirror Silver', hex: '#e2e8f0' }
    ],
    sizes: ['Semi-Stitched (Waist up to 38 inches)'],
    description: 'Inspired by our brand signature color palette, this electrifying hot pink gagra features hundreds of hand-set glass mirrors framed by silver resham thread. Perfect for Sangeet dance performances and evening reception glamour.',
    shortDescription: 'Electrifying hot pink gagra with full mirror work and dazzling stage shimmer.',
    material: 'Heavy Faux Georgette with Satin Lining',
    craftType: 'Hand Embroidery',
    occasion: 'Reception',
    isBridal: false,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 22,
    details: [
      'High-impact glass mirror embellishments',
      'Flared 6-meter circular hemline',
      'Padded blouse piece with mirror work back'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-gag-03',
    name: 'Mint Green Floral Organza Wedding Gagra',
    category: 'gagra',
    subcategory: 'Contemporary Gagra',
    price: 16800,
    originalPrice: 20500,
    discount: 18,
    images: [mintGreenGagraImg],
    colors: [
      { name: 'Pastel Mint Green', hex: '#10b981' },
      { name: 'Pearl Ivory', hex: '#fefce8' }
    ],
    sizes: ['Semi-Stitched'],
    description: 'Subtle elegance reimagined for day weddings. Sheer mint green organza layered over silk, digitally illustrated with floral botanical art and enhanced by hand-embroidered sequin highlights.',
    shortDescription: 'Ethereal mint green organza gagra with delicate floral resham threadwork.',
    material: 'Pure Organza with Shantoon Inner',
    craftType: 'Hand Embroidery',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 19,
    details: [
      'Dreamy lightweight silhouette',
      'Handcrafted pearl border dupatta',
      'Includes unstitched designer blouse piece'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-gag-04',
    name: 'Royal Navy Blue Zardozi Velvet Gagra',
    category: 'gagra',
    subcategory: 'Evening Gagra',
    price: 24500,
    originalPrice: 29000,
    discount: 16,
    images: [navyZardoziGagraImg],
    colors: [
      { name: 'Royal Navy Blue', hex: '#1e3a8a' },
      { name: 'Silver Zari', hex: '#cbd5e1' }
    ],
    sizes: ['Semi-Stitched'],
    description: 'Midnight elegance captured in deep navy blue velvet. Lavish silver and gold zardozi work adorns the broad border, paired with an embroidered sweetheart-neckline choli.',
    shortDescription: 'Deep navy velvet reception gagra with antique silver and gold zardozi craft.',
    material: 'Micro Velvet with Raw Silk Blouse',
    craftType: 'Zardozi & Aari',
    occasion: 'Reception',
    isBridal: true,
    isNew: false,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 16,
    details: [
      'Contrast silver-gold dual tone zari work',
      'Structured flared silhouette',
      'Net dupatta with 4-side velvet embroidered lace'
    ],
    careInstructions: ['Dry clean only']
  },

  // ==================== 4. BRIDAL BLOUSES (4 Products) ====================
  {
    id: 'td-blo-01',
    name: 'Peacock Motif Heavy Bridal Aari Blouse',
    category: 'blouses',
    subcategory: 'Bridal Aari Work',
    price: 13900,
    originalPrice: 16500,
    discount: 16,
    images: [peacockAariBlouseImg],
    colors: [
      { name: 'Bridal Crimson Red', hex: '#991b1b' },
      { name: 'Pure Gold Zari', hex: '#ca8a04' }
    ],
    sizes: ['Custom Tailored to Measurements (Bust 32 to 44)'],
    description: 'Our Salem boutique master specialty. This pure silk bridal blouse features hand-crafted Aari needlework forming royal dancing peacock motifs along the elbow sleeves, back neckline, and front princess line. Accented with kundan stones, French bullion wire, and micro pearls.',
    shortDescription: 'Masterpiece bridal blouse with handcrafted dancing peacock Aari and zardozi embroidery.',
    material: '100% Pure Kanchipuram Raw Silk',
    craftType: 'Pattu Blouse Work',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 54,
    details: [
      'Over 48 hours of artisanal hand-embroidery work',
      'Padded cups and double cotton lining for maximum comfort',
      'Elbow sleeve length with heavy peacock medallion',
      'Deep U back with matching embroidered latkans/tassels',
      'Tailored to your exact size in our Salem atelier'
    ],
    careInstructions: [
      'Dry clean only',
      'Do not iron directly over embroidery',
      'Store padded to maintain cup structure'
    ]
  },
  {
    id: 'td-blo-02',
    name: 'Bridal Crimson Raw Silk Zardosi Blouse',
    category: 'blouses',
    subcategory: 'Zardosi Work',
    price: 11500,
    originalPrice: 13800,
    discount: 17,
    images: [crimsonZardosiBlouseImg],
    colors: [
      { name: 'Deep Crimson', hex: '#881337' },
      { name: 'Gold', hex: '#ca8a04' }
    ],
    sizes: ['Custom Tailored (32-44)'],
    description: 'Crafted on rich crimson raw silk, this blouse showcases dense floral vines embroidered with pure gold bullion wire and cutdana beads. Designed to seamlessly elevate your wedding silk saree.',
    shortDescription: 'Traditional South Indian bridal blouse with dense gold zardozi vine embroidery.',
    material: 'Pure Raw Silk with Gold Zari',
    craftType: 'Zardozi & Aari',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 29,
    details: [
      'Handcrafted zardozi floral border',
      'Sweetheart front neckline',
      'Hand-attached gold bead fringe edging'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-blo-03',
    name: 'Emerald Green Heavy Maggam Work Blouse',
    category: 'blouses',
    subcategory: 'Maggam Work',
    price: 12500,
    originalPrice: 14900,
    discount: 16,
    images: [emeraldMaggamBlouseImg],
    colors: [
      { name: 'Emerald Green', hex: '#064e3b' },
      { name: 'Antique Gold', hex: '#ca8a04' }
    ],
    sizes: ['Custom Tailored (32-44)'],
    description: 'An iconic South Indian bridal contrast blouse. The deep bottle green silk base is covered in traditional Maggam embroidery featuring temple architecture pillars, mango paisleys, and seed pearl borders.',
    shortDescription: 'Grand emerald green bridal blouse with temple motif Maggam and pearl handwork.',
    material: 'Pure Mulberry Silk with Pearl Embellishments',
    craftType: 'Pattu Blouse Work',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    details: [
      'Traditional South Indian Maggam needlework',
      'Real freshwater pearl accents',
      'Princess cut seam with superior bust support'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-blo-04',
    name: 'Royal Plum Velvet Hand Embroidery Blouse',
    category: 'blouses',
    subcategory: 'Velvet Blouse',
    price: 9900,
    originalPrice: 12000,
    discount: 18,
    images: [plumVelvetBlouseImg],
    colors: [
      { name: 'Royal Plum Purple', hex: '#581c87' },
      { name: 'Rose Gold', hex: '#fb7185' }
    ],
    sizes: ['Custom Tailored (32-42)'],
    description: 'Designed for evening winter receptions, this plush micro-velvet blouse features rose gold dabka work and intricate cutwork sleeves tailored for bridal elegance.',
    shortDescription: 'Plush plum purple velvet blouse with antique dabka and kasab handwork.',
    material: 'Micro Velvet with Soft Cotton Lining',
    craftType: 'Hand Embroidery',
    occasion: 'Reception',
    isBridal: true,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 21,
    details: [
      'Luxurious velvet texture',
      'Deep back neckline with Dori tie-up',
      'Padded bust line'
    ],
    careInstructions: ['Dry clean only']
  },

  // ==================== 5. CUSTOM / PATTU BLOUSES (3 Products) ====================
  {
    id: 'td-cst-01',
    name: 'Traditional Kasavu Gold Temple Blouse',
    category: 'blouses',
    subcategory: 'Custom Studio',
    price: 8500,
    originalPrice: 10500,
    discount: 19,
    images: [kasavuTempleBlouseImg],
    colors: [
      { name: 'Cream Tissue Gold', hex: '#fef08a' }
    ],
    sizes: ['Custom Tailored to Measurements'],
    description: 'Pure tissue silk blouse designed to match Kerala Kasavu and temple silk sarees. Adorned with sacred temple architecture gold thread borders and intricate coin motifs along the neckline.',
    shortDescription: 'Custom gold tissue silk blouse with temple architecture bullion embroidery.',
    material: 'Tissue Silk with Gold Thread',
    craftType: 'Pattu Blouse Work',
    occasion: 'Wedding',
    isBridal: true,
    isNew: false,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 25,
    details: [
      'Tailored to individual client measurements',
      'Salem boutique master cut',
      'Classic temple architecture border'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-cst-02',
    name: 'Coral Pink Cutwork Pattu Blouse',
    category: 'blouses',
    subcategory: 'Custom Studio',
    price: 9200,
    originalPrice: 11000,
    discount: 16,
    images: [coralCutworkBlouseImg],
    colors: [
      { name: 'Coral Rose Pink', hex: '#f43f5e' },
      { name: 'Gold', hex: '#ca8a04' }
    ],
    sizes: ['Custom Tailored to Measurements'],
    description: 'Precision cutwork embroidery crafted on coral pink pure silk. Features scalloped edging along the sleeves and back cutout, creating a delicate lace-like appearance.',
    shortDescription: 'Bespoke coral pink silk blouse with intricate laser cutwork and gold zari border.',
    material: 'Pure Raw Silk with Cutwork Embroidery',
    craftType: 'Kundan & Cutwork',
    occasion: 'Festive',
    isBridal: false,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 32,
    details: [
      'Artisanal hand-cut scalloped borders',
      'Custom back design options',
      'Breathable pre-shrunk cotton lining'
    ],
    careInstructions: ['Dry clean only']
  },
  {
    id: 'td-cst-03',
    name: 'Golden Yellow Bullion Stitch Blouse',
    category: 'blouses',
    subcategory: 'Custom Studio',
    price: 7900,
    originalPrice: 9500,
    discount: 17,
    images: [yellowBullionBlouseImg],
    colors: [
      { name: 'Turmeric Yellow', hex: '#eab308' },
      { name: 'Maroon Resham', hex: '#991b1b' }
    ],
    sizes: ['Custom Tailored to Measurements'],
    description: 'Festive turmeric yellow silk blouse adorned with fine French knot and bullion needle embroidery. Accented with tiny pearl droplets along the sleeve hem.',
    shortDescription: 'Custom turmeric yellow blouse with French knot bullion stitch needlework.',
    material: 'Pure Kanchipuram Silk with Resham Embroidery',
    craftType: 'Pattu Blouse Work',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 18,
    details: [
      'Traditional kasavu weave with three-dimensional bullion work',
      'Elbow sleeves with temple architecture borders',
      'Salem boutique bespoke fit'
    ],
    careInstructions: ['Dry clean only']
  },

  // ==================== 5. JEWELLERY (5 Products) ====================
  {
    id: 'td-jwl-01',
    name: 'Temple Gold Necklace Set',
    category: 'jewellery',
    subcategory: 'Necklaces',
    price: 48500,
    originalPrice: 58000,
    discount: 16,
    images: [templeGoldNecklaceImg],
    colors: [
      { name: 'Antique Matte Gold', hex: '#d4af37' },
      { name: 'Kemp Ruby Accent', hex: '#991b1b' }
    ],
    sizes: ['Standard / Adjustable Dori'],
    description: 'Traditional South Indian inspired temple jewellery necklace set with intricate divine motifs and rich gold detailing. Featuring Goddess Lakshmi motifs, delicate nakshi craftsmanship, and matching traditional jhumka earrings.',
    shortDescription: 'South Indian temple gold necklace set with divine Lakshmi nakshi work.',
    material: '22K Antique Matte Gold Plated Brass & Kemp Stones',
    craftType: 'Temple Jewellery Craft',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 38,
    details: [
      'Goddess Lakshmi centerpiece with floral nakshi detailing',
      'Accompanied by matching hanging temple jhumkas',
      'Adjustable pure zari braided dori for custom neckline length',
      'Anti-tarnish protective lacquer coat'
    ],
    careInstructions: [
      'Store in air-tight jewellery pouch',
      'Keep away from water, perfumes, and hair sprays',
      'Wipe with soft cotton cloth after use'
    ]
  },
  {
    id: 'td-jwl-02',
    name: 'Kundan Bridal Necklace Set',
    category: 'jewellery',
    subcategory: 'Necklaces',
    price: 36500,
    originalPrice: 44000,
    discount: 17,
    images: [kundanBridalNecklaceImg],
    colors: [
      { name: 'Royal Gold & Polki', hex: '#eab308' },
      { name: 'Emerald Green Drops', hex: '#047857' }
    ],
    sizes: ['Standard / Adjustable Choker'],
    description: 'Premium bridal Kundan necklace set featuring detailed stone work and an elegant royal finish. Handcrafted with layered polki stones, gold foil settings, and emerald bead drops for monumental wedding gala presence.',
    shortDescription: 'Royal Kundan bridal necklace set with uncut polki and emerald bead tassels.',
    material: '22K Gold Foil Meenakari, Uncut Kundan Glass Polki & Emerald Beads',
    craftType: 'Kundan Stone Setting',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 29,
    details: [
      'Authentic handcrafted Kundan setting with back meenakari enameling',
      'Natural hydro-emerald bead clusters and micro seed pearls',
      'Complete with statement matching drop earrings',
      'Tailored for royal wedding lehengas and reception attire'
    ],
    careInstructions: [
      'Store flat in a velvet-lined box',
      'Avoid moisture and direct perfume contact',
      'Clean gently with dry microfiber cloth'
    ]
  },
  {
    id: 'td-jwl-03',
    name: 'Lakshmi Haram Necklace',
    category: 'jewellery',
    subcategory: 'Haram',
    price: 62000,
    originalPrice: 75000,
    discount: 17,
    images: [lakshmiHaramImg],
    colors: [
      { name: 'Heritage Antique Gold', hex: '#ca8a04' }
    ],
    sizes: ['Long Haram (26-28 Inches)'],
    description: 'Traditional long Lakshmi haram inspired necklace featuring intricate motifs and a luxurious bridal aesthetic. Designed with embossed kasu coins and an imperial Lakshmi pendant symbolizing timeless prosperity.',
    shortDescription: 'Imperial long Lakshmi haram with embossed coin kasu motifs and antique finish.',
    material: '22K Heritage Gold Tone Alloy & Ruby Kemp Stones',
    craftType: 'Temple Jewellery Craft',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 42,
    details: [
      'Authentic South Indian Kasu Malai styling with grand medallion pendant',
      '26-inch length designed to drape elegantly over bridal Kanchipuram sarees',
      'Detailed peacocks flanking the divine deity throne',
      'Secure traditional screw-thread clasp'
    ],
    careInstructions: [
      'Store wrapped in mul-mul cotton cloth or zip lock',
      'Do not expose to chemicals or sweat',
      'Professional re-polish service available'
    ]
  },
  {
    id: 'td-jwl-04',
    name: 'Ruby Emerald Jhumka Set',
    category: 'jewellery',
    subcategory: 'Earrings',
    price: 18500,
    originalPrice: 22000,
    discount: 16,
    images: [rubyEmeraldJhumkaImg],
    colors: [
      { name: 'Antique Gold', hex: '#d4af37' },
      { name: 'Ruby & Emerald Multi', hex: '#881337' }
    ],
    sizes: ['Standard Pair'],
    description: 'Elegant traditional jhumka earrings featuring ruby and emerald-inspired stone detailing. Designed with tiered bell silhouettes, seed pearl hangings, and intricate filigree flourishes.',
    shortDescription: 'Traditional tiered jhumka earrings with vibrant ruby and emerald cabochons.',
    material: '22K Gold Tone Metal, Synthetic Rubies, Emeralds & Fresh Water Pearls',
    craftType: 'Antique Gold Polish',
    occasion: 'Festive',
    isBridal: false,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 51,
    details: [
      'Two-tier bell jhumka with delicate filigree lattice',
      'Studded with ruby and emerald-toned faceted stones',
      'Lightweight hollow bell construction for all-day comfort',
      'South Indian push-back closure with extra silicone stoppers'
    ],
    careInstructions: [
      'Keep away from hairspray and cosmetics',
      'Store in separate compartments to avoid scratching',
      'Clean with soft dry brush'
    ]
  },
  {
    id: 'td-jwl-05',
    name: 'Bridal Bangles & Bangle Set',
    category: 'jewellery',
    subcategory: 'Bangles',
    price: 29500,
    originalPrice: 35000,
    discount: 15,
    images: [bridalBanglesImg],
    colors: [
      { name: 'Bright Temple Gold', hex: '#eab308' }
    ],
    sizes: ['2.4', '2.6', '2.8'],
    description: 'Premium bridal bangle set with intricate traditional detailing and a rich festive finish. Crafted with embossed paisley and floral borders, this set of 4 statement kadas completes any festive muhurtham ensemble.',
    shortDescription: 'Set of 4 handcrafted bridal gold kadas with embossed floral chilai work.',
    material: '22K Yellow Gold Plated Brass with High-Relief Chilai Carvings',
    craftType: 'Antique Gold Polish',
    occasion: 'Wedding',
    isBridal: true,
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 34,
    details: [
      'Set of 4 heavy-look traditional bridal bangles',
      'Deeply carved floral vines and diamond chilai borders',
      'Smooth inner comfort finish preventing skin pinching',
      'Available in standard Indian sizes: 2.4, 2.6, 2.8'
    ],
    careInstructions: [
      'Store in velvet bangle box',
      'Avoid contact with alcohol-based sanitizers',
      'Wipe with soft lint-free flannel after wear'
    ]
  }
];

// Helper to get active products (merged with admin custom additions/edits)
export const getActiveProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem('thireeshaw_custom_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Invalidate old cache if it still contains unsplash URLs or lacks jewellery category
        const hasOldUnsplash = parsed.some(
          (p: Product) => p.images && p.images[0] && p.images[0].includes('unsplash.com')
        );
        const hasJewellery = parsed.some((p: Product) => p.category === 'jewellery');
        if (!hasOldUnsplash && hasJewellery) {
          return parsed;
        } else {
          localStorage.removeItem('thireeshaw_custom_products');
        }
      }
    }
  } catch (e) {
    console.error('Failed to parse custom products', e);
  }
  return INITIAL_PRODUCTS;
};

export const saveActiveProducts = (products: Product[]) => {
  try {
    localStorage.setItem('thireeshaw_custom_products', JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
};

export const PRODUCTS: Product[] = getActiveProducts();
export const BRAND_INFO = BRAND_CONFIG;
