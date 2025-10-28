export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Tomates Cherry Orgánicos',
    category: 'verduras',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
    description: 'Tomates cherry orgánicos, dulces y jugosos, perfectos para ensaladas.',
    stock: 25,
    unit: 'kg',
    featured: true
  },
  {
    id: 2,
    name: 'Palta Hass Premium',
    category: 'frutas',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    description: 'Paltas Hass maduras y cremosas, ideales para el desayuno.',
    stock: 30,
    unit: 'unidad',
    featured: true
  },
  {
    id: 3,
    name: 'Lechuga Mantecosa',
    category: 'verduras',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
    description: 'Lechuga fresca y crujiente, cultivada sin pesticidas.',
    stock: 20,
    unit: 'unidad',
    featured: false
  },
  {
    id: 4,
    name: 'Zanahorias Baby',
    category: 'verduras',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    description: 'Zanahorias baby tiernas y dulces, perfectas para snacks.',
    stock: 18,
    unit: 'bolsa',
    featured: true
  },
  {
    id: 5,
    name: 'Manzanas Rojas',
    category: 'frutas',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    description: 'Manzanas rojas crujientes y dulces, cultivadas localmente.',
    stock: 40,
    unit: 'kg',
    featured: true
  },
  {
    id: 6,
    name: 'Albahaca Fresca',
    category: 'hierbas',
    price: 800,
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
    description: 'Albahaca fresca aromática, perfecta para cocinar.',
    stock: 15,
    unit: 'manojo',
    featured: false
  },
  {
    id: 7,
    name: 'Papas Rosadas',
    category: 'tuberculos',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    description: 'Papas rosadas de excelente calidad, ideales para todo tipo de preparaciones.',
    stock: 50,
    unit: 'kg',
    featured: false
  },
  {
    id: 8,
    name: 'Perejil Crespo',
    category: 'hierbas',
    price: 600,
    image: 'https://images.unsplash.com/photo-1616694949049-5c18e76f1bb3?w=400',
    description: 'Perejil crespo fresco, rico en vitaminas y minerales.',
    stock: 12,
    unit: 'manojo',
    featured: false
  },
  {
    id: 9,
    name: 'Limones de Pica',
    category: 'frutas',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1590502593747-42a4e77a46bc?w=400',
    description: 'Limones frescos de Pica, muy jugosos y aromáticos.',
    stock: 35,
    unit: 'kg',
    featured: true
  },
  {
    id: 10,
    name: 'Brócoli Orgánico',
    category: 'verduras',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    description: 'Brócoli orgánico fresco, rico en nutrientes y fibra.',
    stock: 22,
    unit: 'unidad',
    featured: false
  },
  {
    id: 11,
    name: 'Cilantro Fresco',
    category: 'hierbas',
    price: 700,
    image: 'https://images.unsplash.com/photo-1628110770972-51bdfddc20b3?w=400',
    description: 'Cilantro fresco y aromático, esencial en la cocina chilena.',
    stock: 18,
    unit: 'manojo',
    featured: false
  },
  {
    id: 12,
    name: 'Cebollas Rojas',
    category: 'verduras',
    price: 900,
    image: 'https://images.unsplash.com/photo-1518471137722-47cf0d4f95e8?w=400',
    description: 'Cebollas rojas dulces, perfectas para ensaladas y guisos.',
    stock: 30,
    unit: 'kg',
    featured: false
  }
];

export const DEFAULT_USERS = [
  {
    id: 1,
    nombre: 'Administrador',
    apellidos: 'Sistema',
    email: 'admin@duoc.cl',
    password: 'admin123',
    run: '12345678-9',
    telefono: '+56912345678',
    direccion: 'Santiago, Chile',
    role: 'admin',
    active: true,
    created: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 2,
    nombre: 'Vendedor',
    apellidos: 'Demo',
    email: 'vendedor@duoc.cl',
    password: 'vend123',
    run: '87654321-0',
    telefono: '+56987654321',
    direccion: 'Valparaíso, Chile',
    role: 'vendedor',
    active: true,
    created: new Date().toISOString(),
    lastLogin: null
  },
  {
    id: 3,
    nombre: 'Cliente',
    apellidos: 'Demo',
    email: 'cliente@gmail.com',
    password: 'cli123',
    run: '11223344-5',
    telefono: '+56911223344',
    direccion: 'Concepción, Chile',
    role: 'cliente',
    active: true,
    created: new Date().toISOString(),
    lastLogin: null
  }
];
