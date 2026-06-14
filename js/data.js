// ============================================
// IDEAL E-MALL — Product Data
// All prices in Sri Lankan Rupees (Rs.)
// ============================================
//
// HOW TO ADD MORE IMAGES TO A PRODUCT:
//   Each product has an `images` array with 3 slots.
//   - images[0]  → main / primary image (shown first)
//   - images[1]  → second angle / lifestyle shot  ← ADD PATH HERE WHEN READY
//   - images[2]  → third angle / detail shot      ← ADD PATH HERE WHEN READY
//
//   Example:
//     images: [
//       'img/my-product-front.jpg',   // slot 1 – filled
//       'img/my-product-side.jpg',    // slot 2 – filled
//       '',                           // slot 3 – leave blank until you have the image
//     ]
//
//   A blank ('') or missing slot simply won't render a thumbnail.
// ============================================

const CATEGORIES = [
  { id: 'gas-hobs',         name: 'Gas Hobs',           icon: '🔥', count: 4 },
  { id: 'kitchen-storage',  name: 'Kitchen Storage',    icon: '🍳', count: 8 },
  { id: 'laundry-storage',  name: 'Laundry & Storage',  icon: '👕', count: 4 },
  { id: 'stand-mixers',     name: 'Stand Mixers',       icon: '🥣', count: 6 },
  { id: 'coffee-machines',  name: 'Coffee Machines',    icon: '☕', count: 2 },
  { id: 'kitchen-hoods',    name: 'Kitchen Hoods',      icon: '💨', count: 1 },
  { id: 'home-essentials',  name: 'Home Essentials',    icon: '🏠', count: 2 },
];

const PRODUCTS = [

  // ── GAS HOBS ──────────────────────────────────────
  {
    id: 'hob-001',
    name: '2 Burner Gas Hob',
    brand: 'KROME',
    category: 'gas-hobs',
    // images[0] = main image | images[1] = 2nd angle (add path when ready) | images[2] = 3rd angle (add path when ready)
    images: [
      'img/2 burner gas hob.jpg',
      '',
      '',
    ],
    price: 20500,
    shortDesc: 'Compact 2-burner gas hob with battery ignition and 7mm tempered heat-proof glass.',
    description: 'A compact 2-burner gas hob from KROME. The 7mm tempered glass surface is heat-proof and easy to wipe clean. Battery ignition means no need for a lighter. Good for smaller kitchens or as a second cooking station.',
    availability: 'In Stock',
    featured: true,
    specs: {
      'Burners':    '2',
      'Ignition':   'Battery Ignition',
      'Glass':      '7mm Tempered Glass',
      'Feature':    'Heat Proof',
      'Brand':      'KROME',
    }
  },
  {
    id: 'hob-002',
    name: '4 Burner Gas Hob — HOMEBASE',
    brand: 'HOMEBASE',
    category: 'gas-hobs',
    images: [
      'img/4 burner HOMEBASE.jpg',
      '',
      '',
    ],
    price: 28000,
    shortDesc: '4-burner HOMEBASE gas hob with matte finish. Suitable for large households and regular cooking.',
    description: 'A 4-burner gas hob from HOMEBASE. Suitable for households that cook regularly and need multiple burners running at the same time. Durable build and straightforward to clean.',
    availability: 'In Stock',
    featured: true,
    specs: {
      'Burners':  '4',
      'Brand':    'HOMEBASE',
    }
  },
  {
    id: 'hob-003',
    name: '4 Burner Stainless Steel Gas Hob',
    brand: 'Tech Toast',
    category: 'gas-hobs',
    images: [
      'img/4 burner stainless steel.jpg',
      '',
      '',
    ],
    price: 28000,
    shortDesc: 'Full 4-burner stainless steel gas hob. Reliable everyday cooking for larger households.',
    description: 'A 4-burner gas hob with a stainless steel body from Tech Toast. Suitable for households that cook regularly and need multiple burners running at the same time. Durable build and straightforward to clean.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Burners':  '4',
      'Material': 'Stainless Steel',
      'Brand':    'Tech Toast',
    }
  },
  {
    id: 'hob-004',
    name: '4 Burner Gas Hob — Tech Toast',
    brand: 'Tech Toast',
    category: 'gas-hobs',
    images: [
      'img/4 burner techtoast.jpg',
      '',
      '',
    ],
    price: 28000,
    shortDesc: '4-burner Tech Toast gas hob with plug-in current ignition for reliable, consistent lighting.',
    description: 'A 4-burner gas hob from Tech Toast with plug-in current ignition. The electric ignition is more reliable than battery-based systems and eliminates the need to replace batteries. Suitable for everyday cooking in a busy kitchen.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Burners':   '4',
      'Ignition':  'Plug-in Current Ignition',
      'Brand':     'Tech Toast',
    }
  },

  // ── KITCHEN HOODS ─────────────────────────────────
  {
    id: 'hood-001',
    name: 'Cooker Hood',
    brand: 'HOMEBASE',
    category: 'kitchen-hoods',
    images: [
      'img/cooker hood.jpg',
      '',
      '',
    ],
    price: 22500,
    shortDesc: 'Heat-proof cooker hood with charcoal filter. Removes smoke, steam and cooking odours. 1-year warranty.',
    description: 'A cooker hood from HOMEBASE that removes smoke, steam, and cooking odours from your kitchen. The charcoal filter traps grease and keeps the air clean. Heat-proof construction. Comes with a 1-year warranty.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Filter':   'Charcoal Filter',
      'Feature':  'Heat Proof',
      'Warranty': '1 Year',
      'Brand':    'HOMEBASE',
    }
  },

  // ── KITCHEN STORAGE ───────────────────────────────
  {
    id: 'kst-001',
    name: 'Multifunctional Kitchen Storage Shelf',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/kitchen storage shelf.jpg',
      '',
      '',
    ],
    price: 16500,
    shortDesc: '5-tier kitchen storage shelf. Height 125cm, Length 80cm, Width 32cm.',
    description: 'A tall multifunctional storage shelf for kitchens. Five tiers give plenty of space for pots, pans, appliances, and dry goods. The slim 32cm depth keeps it from taking up too much floor space.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '125 cm',
      'Length':  '80 cm',
      'Width':   '32 cm',
    }
  },
  {
    id: 'kst-002',
    name: '4 Layer Kitchen Storage Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/4 layer kitchen rack.jpg',
      '',
      '',
    ],
    price: 10900,
    shortDesc: '4-tier kitchen rack. Height 102cm, Length 50cm, Width 32cm. Compact and practical.',
    description: 'A 4-tier kitchen storage rack for organising pots, pans, condiments, and kitchen essentials. The compact footprint of 50cm × 32cm fits into tight spaces.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '102 cm',
      'Length':  '50 cm',
      'Width':   '32 cm',
      'Tiers':   '4',
    }
  },
  {
    id: 'kst-003',
    name: '5 Layer Kitchen Storage Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/5 layer kitchen rack.jpg',
      '',
      '',
    ],
    price: 11900,
    shortDesc: '5-tier kitchen rack. Height 127cm, Length 50cm, Width 32cm.',
    description: 'A 5-tier kitchen storage rack. One tier taller than the 4-layer version, giving you additional storage space for the same floor footprint.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '127 cm',
      'Length':  '50 cm',
      'Width':   '32 cm',
      'Tiers':   '5',
    }
  },
  {
    id: 'kst-004',
    name: '5 Layer Bamboo Storage Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/5 layer bamboo rack.jpg',
      '',
      '',
    ],
    price: 28500,
    shortDesc: 'Tall 5-tier bamboo rack. Height 172cm, Length 79cm, Width 32cm. Natural finish.',
    description: 'A tall 5-tier bamboo storage rack with a natural finish. Bamboo is sturdy, lightweight, and moisture-resistant — well suited for kitchen environments.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':    '172 cm',
      'Length':    '79 cm',
      'Width':     '32 cm',
      'Tiers':     '5',
      'Material':  'Bamboo',
    }
  },
  {
    id: 'kst-005',
    name: 'Bamboo Brew Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/Bamboo brew rack.jpg',
      '',
      '',
    ],
    price: 16900,
    shortDesc: 'Compact bamboo brew rack. Height 61cm, Length 67cm, Width 28cm.',
    description: 'A compact bamboo rack designed for storing mugs, tea, coffee, and brewing accessories. The smaller footprint fits comfortably on a kitchen counter or in a corner.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':    '61 cm',
      'Length':    '67 cm',
      'Width':     '28 cm',
      'Material':  'Bamboo',
    }
  },
  {
    id: 'kst-006',
    name: 'Over Sink Dish Drying Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/over sink drying rack.jpg',
      '',
      '',
    ],
    price: 12800,
    shortDesc: 'Large over-sink drying rack. Height 80cm, Length 95cm, Width 30cm.',
    description: 'A dish drying rack designed to sit over your kitchen sink, saving counter space. At 95cm long it can hold plates, pots, glasses, and utensils. Water drips directly into the sink below.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '80 cm',
      'Length':  '95 cm',
      'Width':   '30 cm',
    }
  },
  {
    id: 'kst-007',
    name: '3 Tier Pot Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/pot rack.jpg',
      '',
      '',
    ],
    price: 3900,
    shortDesc: 'Compact 3-tier pot rack. Height 10cm, Length 27cm, Width 22cm.',
    description: 'A small 3-tier rack for organising pots and lids on a countertop or inside a cabinet. Compact size fits neatly into most kitchen layouts.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '10 cm',
      'Length':  '27 cm',
      'Width':   '22 cm',
      'Tiers':   '3',
    }
  },
  {
    id: 'kst-008',
    name: 'Multifunctional Bamboo Rack',
    brand: 'No Brand',
    category: 'kitchen-storage',
    images: [
      'img/bamboo rack.jpg',
      '',
      '',
    ],
    price: 12850,
    shortDesc: 'Large multifunctional bamboo rack. Height 140cm, Length 130cm, Width 40cm.',
    description: 'A wide multifunctional bamboo rack suitable for the kitchen, pantry, or utility area. The 130cm length and 5-tier design provide generous storage.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':    '140 cm',
      'Length':    '130 cm',
      'Width':     '40 cm',
      'Material':  'Bamboo',
    }
  },

  // ── LAUNDRY & STORAGE ────────────────────────────
  {
    id: 'lst-001',
    name: 'Garment and Laundry Dryer Rack',
    brand: 'No Brand',
    category: 'laundry-storage',
    images: [
      'img/dryer rack.jpg',
      '',
      '',
    ],
    price: 5900,
    shortDesc: 'Large freestanding laundry dryer rack. Height 155cm, Length 150cm, Width 42cm.',
    description: 'A large freestanding dryer rack for air-drying clothes indoors or outdoors. The generous size handles a full load of laundry at once. Folds flat for storage when not in use.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':  '155 cm',
      'Length':  '150 cm',
      'Width':   '42 cm',
    }
  },
  {
    id: 'lst-002',
    name: 'Foldable Cloth Drying Rack — Stainless Steel',
    brand: 'No Brand',
    category: 'laundry-storage',
    images: [
      'img/foldable cloth drying rack.jpg',
      '',
      '',
    ],
    price: 5900,
    shortDesc: 'Stainless steel foldable drying rack. Height 131cm, Length 148cm, Width 64cm.',
    description: 'A foldable stainless steel clothes drying rack. Stainless steel bars resist rust and are easy to wipe clean. Folds compactly for storage. Suitable for indoor and outdoor use.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':    '131 cm',
      'Length':    '148 cm',
      'Width':     '64 cm',
      'Material':  'Stainless Steel',
    }
  },
  {
    id: 'lst-003',
    name: '5 Tier Wooden Foldable Rack — Vanta Black',
    brand: 'No Brand',
    category: 'laundry-storage',
    images: [
      'img/wooden foldable rack.jpg',
      '',
      '',
    ],
    price: 16000,
    shortDesc: 'Tall 5-tier foldable wooden rack in Vanta Black. Height 170cm, Length 71cm, Width 33cm.',
    description: 'A tall 5-tier foldable rack finished in Vanta Black. Wooden construction with a clean dark finish that works in most rooms. Five tiers provide ample storage. Folds flat for easy storage.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Height':    '170 cm',
      'Length':    '71 cm',
      'Width':     '33 cm',
      'Tiers':     '5',
      'Color':     'Vanta Black',
      'Material':  'Wood',
    }
  },
  {
    id: 'lst-004',
    name: 'Luxury Floor Standing Coat Hanger — Black',
    brand: 'No Brand',
    category: 'home-essentials',
    images: [
      'img/black stand.jpg',
      'img/gold stand.jpg',  // gold variant shown as second view
      '',
    ],
    price: 15250,
    shortDesc: 'Modern floor-standing coat hanger in black. Stylish for hallways, bedrooms, or offices.',
    description: 'A modern floor-standing coat hanger. Suitable for hallways, bedrooms, or office spaces. Holds coats, bags, hats, and accessories. Clean, minimal design. Available in black and gold finishes.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Type':      'Floor Standing',
      'Color':     'Black / Gold',
      'Style':     'Modern',
      'Use':       'Coats, Bags, Hats',
    }
  },

  // ── STAND MIXERS ─────────────────────────────────
  {
    id: 'mix-001',
    name: 'Stand Mixer 4L — 800W',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/stand mixer 4l.jpg',
      '',
      '',
    ],
    price: 29900,
    shortDesc: '4-litre stand mixer with 800W motor. Good for small batches of dough, batter, and cream.',
    description: 'A compact 4-litre stand mixer from Sokany with an 800W motor. Suitable for small households or occasional baking. Handles dough, batter, and whipping cream without any trouble.',
    availability: 'In Stock',
    featured: true,
    specs: {
      'Capacity':  '4 Litres',
      'Power':     '800W',
      'Brand':     'Sokany',
    }
  },
  {
    id: 'mix-002',
    name: 'Stand Mixer 5L — 1000W',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/stand mixer 5l.jpg',
      '',
      '',
    ],
    price: 33500,
    shortDesc: '5-litre stand mixer with 1000W motor. Handles everyday baking comfortably.',
    description: 'A 5-litre stand mixer from Sokany with a 1000W motor. The extra capacity over the 4L model makes it better suited for regular baking.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Capacity':  '5 Litres',
      'Power':     '1000W',
      'Brand':     'Sokany',
    }
  },
  {
    id: 'mix-003',
    name: 'Stand Mixer 8L — 1500W',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/stand mixer 8l.png',
      '',
      '',
    ],
    price: 45000,
    shortDesc: '8-litre stand mixer with 1500W motor. Suitable for larger batches and regular use.',
    description: 'An 8-litre stand mixer from Sokany with a 1500W motor. Well suited for households that bake regularly or need larger batch sizes. The extra power handles heavier doughs with ease.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Capacity':  '8 Litres',
      'Power':     '1500W',
      'Brand':     'Sokany',
    }
  },
  {
    id: 'mix-004',
    name: 'Stand Mixer 10L — 2000W',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/mixer 10l.jpg',
      '',
      '',
    ],
    price: 65000,
    shortDesc: '10-litre stand mixer with 2000W motor. For frequent baking and large batch work.',
    description: 'A 10-litre stand mixer from Sokany with a 2000W motor. Designed for frequent, heavy-duty mixing. The large capacity and high power make it suitable for commercial-style home baking.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Capacity':  '10 Litres',
      'Power':     '2000W',
      'Brand':     'Sokany',
    }
  },
  {
    id: 'mix-005',
    name: 'Stand Mixer 12L — 2000W',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/stand mixer 12l.jpg',
      '',
      '',
    ],
    price: 69000,
    shortDesc: '12-litre stand mixer with 2000W motor. Large capacity for high-volume mixing.',
    description: 'A 12-litre stand mixer from Sokany with a 2000W motor. The largest standard capacity in the Sokany range, suitable for high-volume home baking or small food businesses.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Capacity':  '12 Litres',
      'Power':     '2000W',
      'Brand':     'Sokany',
    }
  },
  {
    id: 'mix-006',
    name: 'Stand Mixer 12L — 2200W Touch Screen',
    brand: 'Sokany',
    category: 'stand-mixers',
    images: [
      'img/mixer 12l touch.jpg',
      '',
      '',
    ],
    price: 75000,
    shortDesc: '12-litre stand mixer with 2200W motor and touch screen controls. Top of the range.',
    description: 'The top-of-the-range Sokany stand mixer with a 12-litre bowl, 2200W motor, and touch screen control panel. Best suited for heavy, frequent use or small bakery operations.',
    availability: 'In Stock',
    featured: true,
    specs: {
      'Capacity':  '12 Litres',
      'Power':     '2200W',
      'Controls':  'Touch Screen',
      'Brand':     'Sokany',
    }
  },

  // ── COFFEE MACHINES ──────────────────────────────
  {
    id: 'cof-001',
    name: 'Espresso Coffee Maker',
    brand: 'No Brand',
    category: 'coffee-machines',
    images: [
      'img/espresso maker.jpg',
      '',
      '',
    ],
    price: 37500,
    shortDesc: 'Espresso coffee maker for home use. Makes rich, concentrated espresso shots.',
    description: 'A home espresso coffee maker that produces rich, concentrated espresso. Good for people who want proper espresso at home without visiting a café.',
    availability: 'In Stock',
    featured: false,
    specs: {
      'Type': 'Espresso',
    }
  },
  {
    id: 'cof-002',
    name: 'Espresso Coffee Maker with Grinder',
    brand: 'No Brand',
    category: 'coffee-machines',
    images: [
      'img/coffee maker with grinder.jpg',
      '',
      '',
    ],
    price: 97500,
    shortDesc: 'Espresso machine with built-in grinder. Grind fresh beans directly into the machine.',
    description: 'An espresso machine with a built-in coffee grinder. Grinding fresh beans immediately before brewing gives a noticeably better flavour compared to pre-ground coffee.',
    availability: 'In Stock',
    featured: true,
    specs: {
      'Type':    'Espresso with Built-in Grinder',
      'Feature': 'Fresh Grind Before Brew',
    }
  },

];
