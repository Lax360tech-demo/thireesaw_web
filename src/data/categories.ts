import catSareesImg from '../assets/categories/cat_sarees.jpg';
import catSalwarImg from '../assets/categories/cat_salwar.jpg';
import catGagraImg from '../assets/categories/cat_gagra.jpg';
import catJewelleryImg from '../assets/categories/cat_jewellery.jpg';
import catBlousesImg from '../assets/categories/cat_blouses.jpg';
import catBridalImg from '../assets/categories/cat_bridal.jpg';

export interface CategoryMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'sarees',
    slug: 'sarees',
    name: 'SAREES',
    tagline: 'Timeless Six Yards of Pure Grace',
    description: 'Explore authentic Kanchipuram bridal silks, hand-embroidered organza, and festive tissue drapes crafted for monumental moments.',
    image: catSareesImg,
    badge: 'Heritage Silks'
  },
  {
    id: 'salwar',
    slug: 'salwar',
    name: 'SALWAR',
    tagline: 'Modern Silhouette, Classic Craftsmanship',
    description: 'Flared anarkalis, festive sharara sets, and tailored straight cuts detailed with delicate thread and mirror needlecraft.',
    image: catSalwarImg,
    badge: 'Festive Luxury'
  },
  {
    id: 'gagra',
    slug: 'gagra',
    name: 'GAGRA',
    tagline: 'Opulent Volume for Royal Celebrations',
    description: 'Handcrafted bridal lehengas and reception gagras loaded with zardozi, dabka, can-can volume, and signature twirl factor.',
    image: catGagraImg,
    badge: 'Bridal Grandeur'
  },
  {
    id: 'jewellery',
    slug: 'jewellery',
    name: 'JEWELLERY',
    tagline: 'Timeless Indian Jewellery Designed to Complete Your Celebration',
    description: 'Traditional South Indian temple gold sets, royal Kundan masterpieces, antique Lakshmi harams, ruby emerald jhumkas, and handcrafted bridal bangles.',
    image: catJewelleryImg,
    badge: 'Fine Jewellery'
  },
  {
    id: 'blouses',
    slug: 'blouses',
    name: 'BRIDAL BLOUSES',
    tagline: 'Salem Atelier Signature Craft',
    description: 'Our pride and hallmark: Bespoke pattu blouse embroidery, heavy aari work, kundan stone embellishment, and customized bridal patterns.',
    image: catBlousesImg,
    badge: 'Brand Specialization'
  },
  {
    id: 'bridal',
    slug: 'bridal',
    name: 'THE BRIDAL EDIT',
    tagline: 'Curated for the Indian Bride',
    description: 'A dedicated sanctuary of bridal silks, heirloom gagras, and intricate pattu blouses designed to make your wedding unforgettable.',
    image: catBridalImg,
    badge: 'Couture Selection'
  }
];
