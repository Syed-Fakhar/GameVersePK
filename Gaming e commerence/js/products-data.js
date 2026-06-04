// Products database for GameVerse PK
const productsData = [
  // Gaming Consoles
  {
    id: 1,
    name: "PlayStation 5 Console (Slim Edition)",
    category: "consoles",
    price: 185000,
    image: "images/products/playstation-5.jpg",
    rating: 4.8,
    reviewsCount: 142,
    isBestSeller: true,
    isNewArrival: false,
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    specifications: {
      "CPU": "x86-64-AMD Ryzen Zen 2, 8 Cores / 16 Threads @ 3.5GHz",
      "GPU": "AMD Radeon RDNA 2-based graphics engine @ 2.23GHz (10.3 TFLOPS)",
      "System Memory": "GDDR6 16GB",
      "SSD": "825GB Custom SSD (5.5GB/s Read Bandwidth)",
      "Video Out": "Support of 4K 120Hz TVs, 8K TVs, VRR (specified by HDMI ver.2.1)",
      "Audio": "\"Tempest\" 3D AudioTech"
    }
  },
  {
    id: 2,
    name: "Xbox Series X Console",
    category: "consoles",
    price: 175000,
    image: "images/products/xbox-series-x.jpg",
    rating: 4.7,
    reviewsCount: 98,
    isBestSeller: false,
    isNewArrival: false,
    description: "Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X.",
    specifications: {
      "CPU": "8X Cores @ 3.8 GHz (3.66 GHz w/ SMT) Custom Zen 2 CPU",
      "GPU": "12 TFLOPS, 52 CUs @ 1.825 GHz Custom RDNA 2 GPU",
      "Memory": "16GB GDDR6 w/ 320-bit-wide bus",
      "Internal Storage": "1TB Custom NVME SSD",
      "Gaming Resolution": "True 4K (Up to 120 FPS)",
      "Sound": "Dolby Digital 5.1, DTS 5.1, Dolby TrueHD with Atmos"
    }
  },
  {
    id: 3,
    name: "Nintendo Switch OLED Model",
    category: "consoles",
    price: 95000,
    image: "images/products/nintendo-switch.jpg",
    rating: 4.6,
    reviewsCount: 84,
    isBestSeller: false,
    isNewArrival: true,
    description: "Meet the newest member of the Nintendo Switch family. Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio.",
    specifications: {
      "Screen": "7.0\" OLED Multi-touch capacitive touch screen",
      "Resolution": "1280x720 (Handheld), 1920x1080 (TV Mode @ 60 FPS)",
      "Storage": "64 GB (expandable up to 2TB via microSD)",
      "Battery Life": "Approx. 4.5 - 9 hours depending on software usage",
      "Audio": "Stereo speakers, 3.5mm headphone jack",
      "Weight": "0.71 lbs (without Joy-Cons)"
    }
  },

  // Gaming Chairs
  {
    id: 4,
    name: "DXRacer Prince Series Gaming Chair",
    category: "chairs",
    price: 78000,
    image: "images/products/dxracer-chair.png",
    rating: 4.5,
    reviewsCount: 56,
    isBestSeller: true,
    isNewArrival: false,
    description: "The DXRacer Prince Series is designed for entry-level gamers who demand premium comfort and ergonomic excellence. Built with durable faux leather and high-density mold shaping foam.",
    specifications: {
      "Upholstery": "Premium PU Leather",
      "Armrests": "1D Adjustable Armrests",
      "Mechanism": "Conventional Tilt",
      "Gas Lift Class": "Class 4",
      "Base": "27.5\" Strong Nylon Base",
      "Weight Capacity": "Up to 120 kg / 265 lbs"
    }
  },
  {
    id: 5,
    name: "Razer Enki Premium Gaming Chair",
    category: "chairs",
    price: 115000,
    image: "images/products/razer-enki.png",
    rating: 4.7,
    reviewsCount: 39,
    isBestSeller: false,
    isNewArrival: true,
    description: "Achieve all-day gaming comfort with the Razer Enki. Through optimal weight distribution, this gaming chair hits a sweet spot that keeps you in the comfort zone all day long.",
    specifications: {
      "Lumbar Support": "Built-in lumbar arch support",
      "Recline": "Up to 152 degrees reactive recline",
      "Armrests": "4D Adjustable Armrests",
      "Material": "Eco-friendly synthetic leather",
      "Cushioning": "High-density molded foam",
      "Warranty": "3-Year Limited Warranty"
    }
  },
  {
    id: 6,
    name: "Secretlab Titan Evo (2024 Series)",
    category: "chairs",
    price: 145000,
    image: "images/products/secretlab-titan.png",
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: true,
    isNewArrival: false,
    description: "The most technologically advanced gaming chair in the world. Engineered for ultimate ergonomic support, featuring the proprietary L-ADAPT™ lumbar support system, customizable magnetic accessories, and hybrid leatherette.",
    specifications: {
      "Material": "Secretlab NEO™ Hybrid Leatherette",
      "Lumbar System": "L-ADAPT™ 4-way Adjustable Lumbar Support",
      "Pillow": "Magnetic Memory Foam Head Pillow with Cooling Gel",
      "Armrests": "4D Armrests with CloudSwap™ Magnetic System",
      "Base": "ADC12 Reinforced Aluminum Base",
      "Recline Range": "Up to 165 degrees"
    }
  },

  // Gaming PCs
  {
    id: 7,
    name: "GameVerse Ares I7 Gaming PC",
    category: "pcs",
    price: 395000,
    image: "images/products/ares-i7-pc.jpg",
    rating: 4.8,
    reviewsCount: 27,
    isBestSeller: false,
    isNewArrival: true,
    description: "Unleash high-framerate 2K gaming performance with the Ares i7 rig. Built in-house using premium components, optimal airflow layout, and mesmerizing custom ARGB lighting.",
    specifications: {
      "Processor": "Intel Core i7-13700F (16 Cores, 24 Threads, up to 5.2GHz)",
      "Graphics Card": "NVIDIA GeForce RTX 4070 12GB GDDR6X",
      "RAM": "32GB Corsair Vengeance DDR5 5600MHz",
      "Storage": "1TB Samsung 980 Pro PCIe 4.0 NVMe SSD",
      "Motherboard": "ASUS ROG Strix B760-F Gaming WiFi",
      "Power Supply": "750W 80+ Gold Fully Modular"
    }
  },
  {
    id: 8,
    name: "GameVerse Chronos Ultimate RTX 4090 PC",
    category: "pcs",
    price: 985000,
    image: "images/products/chronos-rtx4090-pc.png",
    rating: 5.0,
    reviewsCount: 15,
    isBestSeller: true,
    isNewArrival: false,
    description: "The absolute pinnacle of PC gaming. The Chronos Ultimate is engineered to dominate 4K resolution, virtual reality, and intensive rendering workloads with zero compromises.",
    specifications: {
      "Processor": "Intel Core i9-14900KF (24 Cores, 32 Threads, up to 6.0GHz)",
      "Graphics Card": "NVIDIA GeForce RTX 4090 24GB GDDR6X",
      "RAM": "64GB G.Skill Trident Z5 DDR5 6400MHz",
      "Storage": "2TB Crucial T700 Gen5 NVMe SSD (12,400 MB/s)",
      "Cooling": "Lian Li Galahad II Trinity 360mm AIO Liquid Cooler",
      "Power Supply": "1200W ASUS ROG Thor Platinum II ATX 3.0"
    }
  },

  // Monitors
  {
    id: 9,
    name: "ASUS ROG Swift PG27AQN 360Hz Gaming Monitor",
    category: "monitors",
    price: 165000,
    image: "images/products/asus-rog-monitor.jpg",
    rating: 4.9,
    reviewsCount: 33,
    isBestSeller: false,
    isNewArrival: true,
    description: "The world's fastest 1440p esports gaming monitor. Featuring a Fast IPS panel, a blazing 360Hz refresh rate, and NVIDIA G-SYNC processor with Reflex Analyzer.",
    specifications: {
      "Panel Size": "27-inch widescreen 16:9",
      "Resolution": "2560 x 1440 (WQHD)",
      "Refresh Rate": "360Hz",
      "Response Time": "1ms (GTG)",
      "HDR": "VESA DisplayHDR 600",
      "Connectivity": "1x DisplayPort 1.4, 3x HDMI 2.0, 2x USB 3.2"
    }
  },
  {
    id: 10,
    name: "Samsung Odyssey G7 Curved Gaming Monitor",
    category: "monitors",
    price: 140000,
    image: "images/products/samsung-odyssey.jpg",
    rating: 4.6,
    reviewsCount: 71,
    isBestSeller: true,
    isNewArrival: false,
    description: "Go deeper into the game with a 1000R curved display that matches the human eye's curvature, combined with a swift 240Hz refresh rate and Quantum Dot technology.",
    specifications: {
      "Panel Size": "31.5-inch 1000R Curved VA Panel",
      "Resolution": "2560 x 1440",
      "Refresh Rate": "240Hz",
      "Response Time": "1ms (GTG)",
      "HDR": "HDR600",
      "Sync Technology": "G-Sync Compatible & FreeSync Premium Pro"
    }
  },

  // Accessories
  {
    id: 11,
    name: "Sony PlayStation DualSense Edge Controller",
    category: "accessories",
    price: 24000,
    image: "images/products/dualsense-edge.jpg",
    rating: 4.7,
    reviewsCount: 89,
    isBestSeller: true,
    isNewArrival: false,
    description: "Built with high performance and personalization in mind, this new PS5 controller invites you to craft your own unique gaming experience so you can play your way.",
    specifications: {
      "Connectivity": "Bluetooth Wireless / USB Type-C Cable",
      "Key Features": "Changeable stick caps, remappable back buttons, adjustable triggers",
      "Haptics": "Dual actuators, adaptive triggers",
      "Battery": "Rechargeable Lithium-ion battery",
      "Profile Preset": "Customized profiles saved on-board"
    }
  },
  {
    id: 12,
    name: "Logitech G Pro X Superlight Wireless Headset",
    category: "accessories",
    price: 38000,
    image: "images/products/logitech-g-pro-headset.jpg",
    rating: 4.8,
    reviewsCount: 119,
    isBestSeller: true,
    isNewArrival: false,
    description: "Hear like a pro. Sound like a pro. Designed with and for esports professionals, featuring next-gen BLUE VO!CE microphone technology and DTS Headphone:X 2.0 surround sound.",
    specifications: {
      "Driver": "PRO-G 50 mm Hybrid mesh",
      "Wireless Tech": "LIGHTSPEED 2.4GHz (up to 15m range)",
      "Battery Life": "Up to 20 hours wireless",
      "Frequency Response": "20Hz-20KHz",
      "Impedance": "35 ohms",
      "Weight": "320g"
    }
  },
  {
    id: 13,
    name: "Razer DeathAdder V3 Pro Gaming Mouse",
    category: "accessories",
    price: 18500,
    image: "images/products/razer-deathadder-mouse.jpg",
    rating: 4.6,
    reviewsCount: 154,
    isBestSeller: false,
    isNewArrival: true,
    description: "Victory takes on a new shape with the Razer DeathAdder V3 Pro. Refined and reforged with the aid of top esports pros, its iconic ergonomic form is now more than 25% lighter than its predecessor.",
    specifications: {
      "Sensor": "Focus Pro 30K Optical Sensor (99.8% resolution accuracy)",
      "Weight": "63 grams (Ultra-lightweight)",
      "Switches": "Gen-3 Optical Mouse Switches (90-million click life)",
      "Polling Rate": "Supports up to 4000Hz via HyperPolling wireless dongle",
      "Battery Life": "Up to 90 hours"
    }
  },
  {
    id: 14,
    name: "SteelSeries Apex Pro Mechanical Keyboard",
    category: "accessories",
    price: 52000,
    image: "images/products/steelseries-keyboard.jpg",
    rating: 4.9,
    reviewsCount: 77,
    isBestSeller: true,
    isNewArrival: false,
    description: "The biggest leap in mechanical keyboards since the invention of the mechanical switch. The Apex Pro features OmniPoint adjustable mechanical switches for 11x faster response and 10x swifter actuation.",
    specifications: {
      "Key Switches": "OmniPoint Adjustable Mechanical Switches",
      "Actuation Point": "Fully customizable from 0.4mm to 3.6mm",
      "Frame": "Aircraft-grade aluminum alloy frame",
      "Display": "Integrated OLED Smart Display",
      "Wrist Rest": "Premium magnetic soft-touch wrist rest",
      "RGB": "Per-key dynamic RGB illumination"
    }
  }
];

// Helper functions for reading productsData globally
function getProductById(id) {
  return productsData.find(product => product.id === parseInt(id));
}

function getRelatedProducts(category, excludeId, limit = 4) {
  return productsData
    .filter(product => product.category === category && product.id !== parseInt(excludeId))
    .slice(0, limit);
}
