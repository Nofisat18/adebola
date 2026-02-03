import { Product, RoutineStep, SkinType, SkinConcern } from '@/types/skincare';

export const mockProducts: Product[] = [
  {
    id: 'cleanser-gentle',
    name: 'Gentle Hydrating Cleanser',
    brand: 'Zyrel Essentials',
    category: 'cleanser',
    image: '/placeholder.svg',
    description: 'A pH-balanced, creamy cleanser that removes impurities without stripping moisture.',
    usage: 'Massage onto damp skin for 60 seconds, then rinse with lukewarm water.',
    frequency: 'twice-daily',
  },
  {
    id: 'cleanser-foam',
    name: 'Purifying Foam Cleanser',
    brand: 'Zyrel Clear',
    category: 'cleanser',
    image: '/placeholder.svg',
    description: 'Oil-control foam cleanser with salicylic acid for acne-prone skin.',
    usage: 'Apply to wet skin, massage gently, rinse thoroughly.',
    frequency: 'twice-daily',
  },
  {
    id: 'toner-hydrating',
    name: 'Hydra-Balance Toner',
    brand: 'Zyrel Essentials',
    category: 'toner',
    image: '/placeholder.svg',
    description: 'Alcohol-free toner with hyaluronic acid to prep skin for serums.',
    usage: 'Pat onto clean skin with hands or cotton pad.',
    frequency: 'twice-daily',
  },
  {
    id: 'toner-exfoliating',
    name: 'AHA/BHA Clarifying Toner',
    brand: 'Zyrel Clear',
    category: 'toner',
    image: '/placeholder.svg',
    description: 'Gentle chemical exfoliant to unclog pores and smooth texture.',
    usage: 'Apply with cotton pad in the evening only. Start 2-3x weekly.',
    frequency: 'as-needed',
  },
  {
    id: 'serum-vitamin-c',
    name: 'Vitamin C Brightening Serum',
    brand: 'Zyrel Glow',
    category: 'serum',
    image: '/placeholder.svg',
    description: '15% Vitamin C serum for brightening and antioxidant protection.',
    usage: 'Apply 3-4 drops to face and neck after toner.',
    frequency: 'daily',
  },
  {
    id: 'serum-niacinamide',
    name: 'Niacinamide Pore Serum',
    brand: 'Zyrel Clear',
    category: 'serum',
    image: '/placeholder.svg',
    description: '10% Niacinamide to minimize pores and control oil production.',
    usage: 'Apply to face after cleansing, before moisturizer.',
    frequency: 'twice-daily',
  },
  {
    id: 'serum-hyaluronic',
    name: 'Hyaluronic Hydra Serum',
    brand: 'Zyrel Essentials',
    category: 'serum',
    image: '/placeholder.svg',
    description: 'Multi-weight hyaluronic acid for deep, lasting hydration.',
    usage: 'Apply to damp skin for best absorption.',
    frequency: 'twice-daily',
  },
  {
    id: 'serum-retinol',
    name: 'Retinol Renewal Serum',
    brand: 'Zyrel Age',
    category: 'serum',
    image: '/placeholder.svg',
    description: '0.5% encapsulated retinol for anti-aging without irritation.',
    usage: 'Apply in evening only. Start 2x weekly, increase gradually.',
    frequency: 'as-needed',
  },
  {
    id: 'moisturizer-light',
    name: 'Featherlight Gel Cream',
    brand: 'Zyrel Clear',
    category: 'moisturizer',
    image: '/placeholder.svg',
    description: 'Oil-free, lightweight gel moisturizer for oily and combination skin.',
    usage: 'Apply evenly to face and neck as final skincare step.',
    frequency: 'twice-daily',
  },
  {
    id: 'moisturizer-rich',
    name: 'Deep Comfort Cream',
    brand: 'Zyrel Essentials',
    category: 'moisturizer',
    image: '/placeholder.svg',
    description: 'Rich, nourishing cream with ceramides for dry and sensitive skin.',
    usage: 'Apply generously morning and evening.',
    frequency: 'twice-daily',
  },
  {
    id: 'sunscreen-daily',
    name: 'Invisible Shield SPF 50',
    brand: 'Zyrel Protect',
    category: 'sunscreen',
    image: '/placeholder.svg',
    description: 'Lightweight, non-greasy SPF 50 with no white cast.',
    usage: 'Apply as last morning step. Reapply every 2 hours in sun.',
    frequency: 'daily',
  },
  {
    id: 'treatment-spot',
    name: 'Targeted Spot Treatment',
    brand: 'Zyrel Clear',
    category: 'treatment',
    image: '/placeholder.svg',
    description: 'Fast-acting spot treatment with benzoyl peroxide.',
    usage: 'Dab directly on blemishes before moisturizer.',
    frequency: 'as-needed',
  },
  {
    id: 'mask-hydrating',
    name: 'Overnight Hydra Mask',
    brand: 'Zyrel Essentials',
    category: 'mask',
    image: '/placeholder.svg',
    description: 'Leave-on sleeping mask for intense overnight hydration.',
    usage: 'Apply thick layer before bed 2-3x weekly.',
    frequency: 'weekly',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

// Get recommended products based on skin type and concerns
export const getRecommendedRoutine = (
  skinType: SkinType,
  concerns: SkinConcern[]
): { morning: RoutineStep[]; evening: RoutineStep[] } => {
  const hasDryness = concerns.includes('dryness');
  const hasAcne = concerns.includes('acne');
  const hasPigmentation = concerns.includes('pigmentation');
  const hasAging = concerns.includes('aging');
  const isDry = skinType === 'dry';
  const isOily = skinType === 'oily';

  const morning: RoutineStep[] = [
    {
      order: 1,
      time: 'morning',
      product: getProductById(isDry ? 'cleanser-gentle' : 'cleanser-foam')!,
      instructions: 'Start with a gentle cleanse to remove overnight buildup.',
      duration: '60 seconds',
    },
    {
      order: 2,
      time: 'morning',
      product: getProductById('toner-hydrating')!,
      instructions: 'Balance your skin\'s pH and prep for serums.',
    },
    {
      order: 3,
      time: 'morning',
      product: getProductById(
        hasPigmentation ? 'serum-vitamin-c' : 
        hasAcne || isOily ? 'serum-niacinamide' : 
        'serum-hyaluronic'
      )!,
      instructions: 'Target your specific concerns with this active serum.',
    },
    {
      order: 4,
      time: 'morning',
      product: getProductById(isDry || hasDryness ? 'moisturizer-rich' : 'moisturizer-light')!,
      instructions: 'Lock in hydration and protect your skin barrier.',
    },
    {
      order: 5,
      time: 'morning',
      product: getProductById('sunscreen-daily')!,
      instructions: 'Essential protection from UV damage - never skip this step!',
    },
  ];

  const evening: RoutineStep[] = [
    {
      order: 1,
      time: 'evening',
      product: getProductById(isDry ? 'cleanser-gentle' : 'cleanser-foam')!,
      instructions: 'Double cleanse if wearing makeup or sunscreen.',
      duration: '60 seconds',
    },
    {
      order: 2,
      time: 'evening',
      product: getProductById(hasAcne || isOily ? 'toner-exfoliating' : 'toner-hydrating')!,
      instructions: hasAcne || isOily ? 'Use exfoliating toner 2-3x weekly only.' : 'Prep skin for evening treatments.',
    },
    {
      order: 3,
      time: 'evening',
      product: getProductById(
        hasAging ? 'serum-retinol' : 
        hasAcne ? 'serum-niacinamide' : 
        'serum-hyaluronic'
      )!,
      instructions: 'Apply your treatment serum on slightly damp skin.',
    },
  ];

  // Add spot treatment for acne
  if (hasAcne) {
    evening.push({
      order: 4,
      time: 'evening',
      product: getProductById('treatment-spot')!,
      instructions: 'Apply only to active blemishes.',
    });
  }

  evening.push({
    order: hasAcne ? 5 : 4,
    time: 'evening',
    product: getProductById(isDry || hasDryness ? 'moisturizer-rich' : 'moisturizer-light')!,
    instructions: 'Seal in all your treatments with a nourishing moisturizer.',
  });

  // Add mask for dry skin
  if (isDry || hasDryness) {
    evening.push({
      order: hasAcne ? 6 : 5,
      time: 'evening',
      product: getProductById('mask-hydrating')!,
      instructions: 'Use 2-3x weekly instead of moisturizer for extra hydration.',
    });
  }

  return { morning, evening };
};
