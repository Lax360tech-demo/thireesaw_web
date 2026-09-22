export type ProductCategory = 'sarees' | 'salwar' | 'gagra' | 'blouses' | 'bridal';

export type CraftType = 
  | 'Hand Embroidery'
  | 'Machine Embroidery'
  | 'Pattu Blouse Work'
  | 'Zardozi & Aari'
  | 'Zari Weave'
  | 'Kundan & Cutwork';

export type OccasionType = 'Wedding' | 'Reception' | 'Festive' | 'Party' | 'Casual';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  shortDescription: string;
  material: string;
  craftType: CraftType;
  occasion: OccasionType;
  isBridal: boolean;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  details: string[];
  careInstructions: string[];
}

export interface CartItem {
  id: string; // composite key (productId + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  customNotes?: string;
}

export interface FilterState {
  category: string;
  collection: string;
  priceRange: string;
  color: string;
  occasion: string;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'error';
}

export interface CustomBlouseConfig {
  neckline: string;
  embroideryStyle: string;
  fabric: string;
  color: string;
  sleeveLength: string;
  backDesign: string;
  tasselsDori: boolean;
  measurements: {
    bust: string;
    waist: string;
    shoulder: string;
    blouseLength: string;
    sleeveLength: string;
    armHole: string;
  };
  notes: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
}
