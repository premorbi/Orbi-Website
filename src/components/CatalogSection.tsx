import React, { useState } from 'react';
import {
  Download,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  Sun,
  Shield,
  Layers,
  Activity,
  Tv,
  Wifi,
  Radio,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { CATALOG_PRODUCTS, SENSORS_DATA, BRAND_INFO } from '../data/catalogData';
import { CatalogProduct } from '../types';

export const CatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductModal, setActiveProductModal] = useState<CatalogProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Catalog Modules' },
    { id: 'Intelligent Living', label: 'Lighting Solutions' },
    { id: 'Motorised Solutions', label: 'Curtains, Blinds & Gates' },
    { id: 'Security Solutions', label: 'Entrance & Security' },
    { id: 'Connected Living', label: 'AV & Networking' },
    { id: 'Intelligent Environment', label: 'Sensors' },
  ];

  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductImage = (productId: string, pageNumber: number) => {
    switch (productId) {
      case 'prod-1':
        return '/assets/web/smart_living_lighting.jpg';
      case 'prod-2':
        return '/assets/web/motorized_curtains.jpg';
      case 'prod-3':
        return '/assets/web/smart_lock_door.jpg';
      case 'prod-4':
        return '/assets/web/cctv_surveillance.jpg';
      case 'prod-5':
        return '/assets/web/home_theatre_cinema.jpg';
      case 'prod-6':
        return '/assets/web/network_server_rack.jpg';
      case 'prod-8':
        return '/assets/web/smart_living_lighting.jpg';
      default:
        return `/assets/catalog/page_${String(pageNumber).padStart(2, '0')}.png`;
    }
  };

  return (
    <section id="catalog" className="py-20 bg-[#FAF7F2] dark:bg-[#11161B] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Product Catalog · 17 Pages</span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
              Solutions & Hardware Catalog
            </h2>
            <p className="text-sm text-[#615544] dark:text-[#9BA3AF] max-w-xl">
              Engineered with world-class components: from DALI-2 dimming to motorized roller gates, biometric digital locks, enterprise Wi-Fi 6, and Dolby Atmos private screening rooms.
            </p>
          </div>

          {/* Download Official Brochure Button */}
          <div className="shrink-0">
            <a
              href={BRAND_INFO.catalogPdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#182330] to-[#0F4C81] hover:from-[#C59B27] hover:to-[#9E7A17] transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Full 17-Page Catalog</span>
            </a>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE2D5] dark:border-[#222B36]">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E2530] text-white shadow-sm ring-1 ring-[#C59B27]'
                    : 'bg-white/80 dark:bg-[#18202A] text-[#554A3B] dark:text-[#CBD5E1] border border-[#DDD3C4] dark:border-[#273240] hover:bg-[#F2ECE1] dark:hover:bg-[#202935]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#7C6C57] dark:text-[#9BA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solutions or protocols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-xs bg-white dark:bg-[#18202A] border border-[#DDD3C4] dark:border-[#273240] text-[#1E2229] dark:text-white placeholder-[#7C6C57] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#273241] p-6 shadow-md hover:shadow-xl hover:border-[#C59B27] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Real Product Web/Catalog Photograph */}
                <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-[#EAE2D5] dark:border-[#283340] shadow-sm">
                  <img
                    src={getProductImage(product.id, product.page)}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-['JetBrains_Mono']">
                    <span className="font-bold uppercase tracking-wider text-[#E2BE58]">
                      {product.category}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      Catalog Page {product.page}
                    </span>
                  </div>
                </div>

                {/* Title & Headline */}
                <h3 className="font-['Cinzel'] text-lg font-bold text-[#1E2229] dark:text-white group-hover:text-[#C59B27] transition-colors">
                  {product.title}
                </h3>
                <p className="font-['Cormorant_Garamond'] italic text-sm text-[#7C6C57] dark:text-[#D1D5DB] mt-1 line-clamp-2">
                  "{product.headline}"
                </p>

                <p className="text-xs text-[#5C5040] dark:text-[#9BA3AF] mt-3 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Feature Bullet Points */}
                <div className="my-5 space-y-2">
                  {product.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <div className="w-4 h-4 rounded bg-[#FAF7F2] dark:bg-[#202936] text-[#C59B27] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-[#332A1F] dark:text-[#E2E8F0] font-medium leading-tight">
                        <strong>{feat.title}:</strong> {feat.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Protocols & Details Button */}
              <div className="pt-4 border-t border-[#F0E8DD] dark:border-[#222B36] flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1">
                  {product.supportedProtocols.map((proto) => (
                    <span
                      key={proto}
                      className="text-[9px] font-['JetBrains_Mono'] font-bold px-1.5 py-0.5 rounded bg-[#F2ECE1] dark:bg-[#1E2734] text-[#635747] dark:text-[#CBD5E1]"
                    >
                      {proto}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveProductModal(product)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F4C81] dark:text-[#38BDF8] hover:text-[#C59B27] transition-colors cursor-pointer"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Sensor Matrix Feature (Catalog Page 16: Sense -> Decide -> Act) */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#F5EFEB] via-[#EBE2D5] to-[#E3D8C8] dark:from-[#18202A] dark:via-[#141B24] dark:to-[#0F141B] p-6 sm:p-10 border border-[#DDD3C4] dark:border-[#283342] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#DDD3C4] dark:border-[#242E3B] mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58]">
                Intelligent Environment · Page 16
              </span>
              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#1E2229] dark:text-white mt-1">
                The 8 Intelligent Sensor Families
              </h3>
            </div>
            <div className="px-4 py-2 rounded-lg bg-[#C59B27]/10 dark:bg-[#C59B27]/20 border border-[#C59B27]/40 text-xs font-bold text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono']">
              SENSE → DECIDE → ACT
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SENSORS_DATA.map((sensor) => (
              <div
                key={sensor.id}
                className="p-4 rounded-xl bg-white/90 dark:bg-[#19222E] border border-[#DDD3C4] dark:border-[#293444] space-y-2 hover:border-[#C59B27] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#9E7A17] dark:text-[#E2BE58]">
                    {sensor.number}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] dark:bg-[#222C3A] text-[#0F4C81] dark:text-[#38BDF8] flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="font-bold text-xs text-[#1E2229] dark:text-white">
                  {sensor.title}
                </h4>
                <p className="text-[11px] text-[#635747] dark:text-[#9BA3AF] leading-tight">
                  {sensor.description}
                </p>

                <div className="pt-2 border-t border-[#F2ECE1] dark:border-[#25303E] text-[10px] space-y-1">
                  <span className="text-[#9E7A17] dark:text-[#E2BE58] block font-semibold">
                    Trigger: {sensor.typicalTrigger}
                  </span>
                  <span className="text-[#1E2229] dark:text-[#E2E8F0] block">
                    Act: {sensor.actuationExample}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Deep-Dive Modal */}
        {activeProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="max-w-2xl w-full rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#2C3746] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveProductModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#202936] text-[#7C6C57] dark:text-[#CBD5E1] cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono']">
                  {activeProductModal.category} · Catalog Page {activeProductModal.page}
                </span>

                <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1E2229] dark:text-white">
                  {activeProductModal.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5040] dark:text-[#CBD5E1] leading-relaxed">
                  {activeProductModal.description}
                </p>

                {/* Key features */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E2229] dark:text-white block font-['JetBrains_Mono']">
                    Catalog Capabilities
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProductModal.features.map((feat, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#1D2531] border border-[#E8DFD3] dark:border-[#283342] text-xs"
                      >
                        <strong className="block text-[#1E2229] dark:text-white mb-0.5">
                          {feat.title}
                        </strong>
                        <span className="text-[#635747] dark:text-[#9BA3AF]">
                          {feat.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Specifications */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E2229] dark:text-white block font-['JetBrains_Mono']">
                    Engineering Specs
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#5C5040] dark:text-[#CBD5E1]">
                    {activeProductModal.specifications.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Use */}
                <div className="pt-3 border-t border-[#EAE2D5] dark:border-[#26313E] flex items-center justify-between text-xs">
                  <span className="text-[#7C6C57] dark:text-[#9BA3AF]">
                    Recommended:{' '}
                    <strong className="text-[#1E2229] dark:text-white">
                      {activeProductModal.recommendedUse}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
