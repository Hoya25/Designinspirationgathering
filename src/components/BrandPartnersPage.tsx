import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Store, TrendingUp, Sparkles, ExternalLink, ShoppingBag, Tag, Star, Award, ChevronLeft, ChevronRight, Trophy, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import kromaLogo from 'figma:asset/36cd3893245a3ad638e4c27f91410fe2895aed4b.png';

interface BrandPartnersPageProps {
  onBack: () => void;
  userMultiplier?: string;
  onNavigateToRewards?: () => void;
  onNavigateToStatus?: () => void;
}

type Category = 'all' | 'retail' | 'dining' | 'travel' | 'entertainment' | 'wellness' | 'technology' | 'lifestyle';

interface BrandPartner {
  id: number;
  name: string;
  category: Exclude<Category, 'all'>;
  description: string;
  baseEarning: string;
  featured: boolean;
  logo: string | typeof kromaLogo;
  logoType?: 'emoji' | 'image';
  color: string;
  imageQuery?: string;
  isKroma?: boolean;
  website?: string;
  earnMultiplier?: number;
  minPurchase?: number;
  maxEarning?: string;
}

const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: 1,
    name: 'Kroma Wellness',
    category: 'wellness',
    description: 'Premium superfood wellness products and nutritional supplements for optimal health',
    baseEarning: '8 NCTR per $1',
    featured: true,
    logo: kromaLogo,
    color: 'from-neutral-900 to-neutral-700',
    imageQuery: 'wellness supplements',
    isKroma: true,
  },
  {
    id: 2,
    name: 'Urban Outfitters',
    category: 'retail',
    description: 'Contemporary fashion and lifestyle brand offering trendy apparel, accessories, and home decor',
    baseEarning: '5 NCTR per $1',
    featured: true,
    logo: '🛍️',
    color: 'from-purple-500 to-pink-500',
    imageQuery: 'fashion store',
  },
  {
    id: 3,
    name: 'Whole Foods Market',
    category: 'dining',
    description: 'Premium organic groceries, fresh produce, and natural products for healthy living',
    baseEarning: '3 NCTR per $1',
    featured: true,
    logo: '🥗',
    color: 'from-green-500 to-emerald-500',
    imageQuery: 'organic food',
  },
  {
    id: 4,
    name: 'Delta Airlines',
    category: 'travel',
    description: 'Premium air travel experiences with worldwide destinations and exceptional service',
    baseEarning: '7 NCTR per $1',
    featured: false,
    logo: '✈️',
    color: 'from-blue-500 to-cyan-500',
    imageQuery: 'airplane travel',
  },
  {
    id: 5,
    name: 'Spotify Premium',
    category: 'entertainment',
    description: 'Music streaming and podcasts with ad-free listening and offline downloads',
    baseEarning: '4 NCTR per $1',
    featured: false,
    logo: '🎵',
    color: 'from-green-600 to-emerald-600',
    imageQuery: 'music streaming',
  },
  {
    id: 6,
    name: 'Nike',
    category: 'retail',
    description: 'World-class athletic footwear, apparel, and equipment for every sport and lifestyle',
    baseEarning: '6 NCTR per $1',
    featured: true,
    logo: '👟',
    color: 'from-orange-500 to-red-500',
    imageQuery: 'athletic shoes',
  },
  {
    id: 7,
    name: 'Hilton Hotels',
    category: 'travel',
    description: 'Luxury accommodations and hospitality experiences at destinations worldwide',
    baseEarning: '7 NCTR per $1',
    featured: false,
    logo: '🏨',
    color: 'from-indigo-500 to-blue-500',
    imageQuery: 'luxury hotel',
  },
  {
    id: 8,
    name: 'Equinox Fitness',
    category: 'wellness',
    description: 'Premium fitness clubs with state-of-the-art equipment and expert personal training',
    baseEarning: '5 NCTR per $1',
    featured: false,
    logo: '💪',
    color: 'from-red-500 to-pink-500',
    imageQuery: 'fitness gym',
  },
  {
    id: 9,
    name: 'Apple Store',
    category: 'retail',
    description: 'Innovative technology products including iPhone, iPad, Mac, and premium accessories',
    baseEarning: '4 NCTR per $1',
    featured: true,
    logo: '🍎',
    color: 'from-gray-600 to-slate-600',
    imageQuery: 'apple store',
  },
  {
    id: 10,
    name: 'Chipotle',
    category: 'dining',
    description: 'Fast-casual Mexican cuisine with fresh, responsibly-sourced ingredients',
    baseEarning: '4 NCTR per $1',
    featured: false,
    logo: '🌯',
    color: 'from-red-600 to-orange-600',
    imageQuery: 'mexican food',
  },
  {
    id: 11,
    name: 'AMC Theatres',
    category: 'entertainment',
    description: 'Premium movie theater experiences with IMAX, Dolby Cinema, and luxury seating',
    baseEarning: '5 NCTR per $1',
    featured: false,
    logo: '🎬',
    color: 'from-yellow-500 to-orange-500',
    imageQuery: 'movie theater',
  },
  {
    id: 12,
    name: 'Sephora',
    category: 'retail',
    description: 'Premium beauty products, cosmetics, skincare, and fragrance from top brands',
    baseEarning: '6 NCTR per $1',
    featured: true,
    logo: '💄',
    color: 'from-pink-500 to-rose-500',
    imageQuery: 'beauty cosmetics',
  },
  {
    id: 13,
    name: 'Peloton',
    category: 'wellness',
    description: 'Connected fitness equipment with live and on-demand workout classes',
    baseEarning: '7 NCTR per $1',
    featured: false,
    logo: '🚴',
    color: 'from-red-500 to-orange-500',
    imageQuery: 'fitness bike',
  },
  {
    id: 14,
    name: 'Samsung',
    category: 'technology',
    description: 'Innovative technology products including smartphones, tablets, and smart home devices',
    baseEarning: '5 NCTR per $1',
    featured: true,
    logo: '📱',
    color: 'from-blue-500 to-cyan-500',
    imageQuery: 'smartphone',
  },
  {
    id: 15,
    name: 'Lululemon',
    category: 'lifestyle',
    description: 'Premium athletic apparel and accessories for fitness and wellness',
    baseEarning: '6 NCTR per $1',
    featured: true,
    logo: '👟',
    color: 'from-green-500 to-emerald-500',
    imageQuery: 'athletic wear',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Partners', icon: Store },
  { id: 'retail', label: 'Retail', icon: ShoppingBag },
  { id: 'dining', label: 'Dining', icon: Tag },
  { id: 'travel', label: 'Travel', icon: Award },
  { id: 'entertainment', label: 'Entertainment', icon: Star },
  { id: 'wellness', label: 'Wellness', icon: TrendingUp },
  { id: 'technology', label: 'Technology', icon: ExternalLink },
  { id: 'lifestyle', label: 'Lifestyle', icon: Tag },
];

export function BrandPartnersPage({ onBack, userMultiplier = '1.25x', onNavigateToRewards, onNavigateToStatus }: BrandPartnersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Load brands from localStorage or use BRAND_PARTNERS as fallback
  const [brands, setBrands] = useState<BrandPartner[]>(() => {
    const savedBrands = localStorage.getItem('crescendo-brands');
    if (savedBrands) {
      try {
        return JSON.parse(savedBrands);
      } catch (e) {
        console.error('Failed to parse saved brands:', e);
        return BRAND_PARTNERS;
      }
    }
    return BRAND_PARTNERS;
  });

  // Reload brands from localStorage when component mounts
  useEffect(() => {
    const savedBrands = localStorage.getItem('crescendo-brands');
    if (savedBrands) {
      try {
        setBrands(JSON.parse(savedBrands));
      } catch (e) {
        console.error('Failed to parse saved brands:', e);
      }
    }
  }, []);

  // Listen for storage changes to update brands when admin makes changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedBrands = localStorage.getItem('crescendo-brands');
      if (savedBrands) {
        try {
          setBrands(JSON.parse(savedBrands));
        } catch (e) {
          console.error('Failed to parse saved brands:', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check localStorage periodically in case changes happen in same tab
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredBrands = selectedCategory === 'all' 
    ? brands 
    : brands.filter(brand => brand.category === selectedCategory);

  const featuredBrands = brands.filter(brand => brand.featured);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBrands.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBrands.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBrands.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBrands.length) % featuredBrands.length);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="gap-2 border-violet-200 hover:bg-violet-50"
              >
                <Store className="w-4 h-4 text-violet-600" />
                Brands
              </Button>
              {onNavigateToStatus && (
                <Button 
                  variant="outline" 
                  onClick={onNavigateToStatus}
                  className="gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Status
                </Button>
              )}
              {onNavigateToRewards && (
                <Button 
                  variant="outline" 
                  onClick={onNavigateToRewards}
                  className="gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Rewards
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl tracking-tight">Alliance Brand Partners</h1>
              <p className="text-neutral-600">Brands that honor your Crescendo Status Benefits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* How Shop & Earn Works */}
        <Card className="mb-10 border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-600" />
              How Shop & Earn Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">1</span>
                </div>
                <div>
                  <p className="mb-1">Browse Partners</p>
                  <p className="text-sm text-neutral-600">Discover brands across retail, dining, travel, and more</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">2</span>
                </div>
                <div>
                  <p className="mb-1">Shop & Link</p>
                  <p className="text-sm text-neutral-600">Click through to shop and link your purchase to your account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">3</span>
                </div>
                <div>
                  <p className="mb-1">Earn NCTR</p>
                  <p className="text-sm text-neutral-600">Base rate × your status multiplier ({userMultiplier})</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Multiplier Banner */}
        <Card className="mb-10 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-violet-100 mb-1">Your Current Earnings Multiplier</p>
                <p className="text-3xl">{userMultiplier}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-violet-100 mb-1">Example: 5 NCTR base rate</p>
                <p className="text-2xl">= {parseFloat(userMultiplier) * 5} NCTR per $1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Partners Carousel */}
        <div className="mb-12 -mx-6 md:mx-0">
          <div className="flex items-center justify-between mb-4 px-6 md:px-0">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl tracking-tight">Featured Partners</h2>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] group">
            {featuredBrands.map((brand, index) => (
              <div 
                key={brand.id} 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="relative w-full h-full bg-neutral-900 cursor-pointer overflow-hidden">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200`}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <Badge className="bg-white/20 backdrop-blur-sm border-white/40 text-white px-3 py-1">
                          <Star className="w-3 h-3 mr-1 inline" />
                          Featured Partner
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm border-white/40 text-white px-3 py-1">
                          {brand.category.charAt(0).toUpperCase() + brand.category.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        {brand.isKroma || brand.logoType === 'image' ? (
                          <div className="w-40 h-24 bg-white rounded-2xl flex items-center justify-center p-6 shadow-md border border-neutral-200">
                            <img src={brand.logo as string} alt={brand.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`w-24 h-24 bg-gradient-to-br ${brand.color} rounded-2xl flex items-center justify-center text-5xl shadow-md`}>
                            {brand.logo}
                          </div>
                        )}
                        <div>
                          <h3 className="text-3xl md:text-5xl mb-2">{brand.name}</h3>
                        </div>
                      </div>
                      <p className="text-lg md:text-xl text-neutral-200 mb-6 line-clamp-2">{brand.description}</p>
                      <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Base Earning Rate</p>
                          <p className="text-2xl">{brand.baseEarning}</p>
                        </div>
                        <div className="h-8 w-px bg-white/20 hidden md:block" />
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">With Your {userMultiplier} Multiplier</p>
                          <p className="text-2xl">{(parseFloat(brand.baseEarning.split(' ')[0]) * parseFloat(userMultiplier)).toFixed(1)} NCTR per $1</p>
                        </div>
                        <Button 
                          className="md:ml-auto bg-white text-neutral-900 hover:bg-neutral-100 gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Shop Now
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <button
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {featuredBrands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id as Category)}
                  className={`gap-2 ${
                    selectedCategory === category.id 
                      ? 'bg-violet-600 hover:bg-violet-700' 
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* All Partners Grid */}
        <div>
          <h2 className="text-2xl mb-6">
            {selectedCategory === 'all' ? 'All Partners' : `${CATEGORIES.find(c => c.id === selectedCategory)?.label} Partners`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Card key={brand.id} className="border-2 border-neutral-200 hover:border-violet-200 hover:shadow-lg transition-all">
                <CardHeader>
                  {brand.isKroma || brand.logoType === 'image' ? (
                    <div className="w-full h-20 bg-white border-2 border-neutral-200 rounded-2xl flex items-center justify-center p-4 mb-4 shadow-sm">
                      <img src={brand.logo as string} alt={brand.name} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className={`w-20 h-20 bg-gradient-to-br ${brand.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-sm`}>
                      {brand.logo}
                    </div>
                  )}
                  <CardTitle className="text-lg mb-2">{brand.name}</CardTitle>
                  <p className="text-sm text-neutral-600">{brand.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-600 mb-0.5">Base Rate</p>
                    <p className="text-sm">{brand.baseEarning}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full gap-2">
                    <ExternalLink className="w-3 h-3" />
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <Card className="mt-10 bg-neutral-100 border-neutral-200">
          <CardHeader>
            <CardTitle>Earning Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="mb-1">Status Multiplier Applies</p>
                  <p className="text-sm text-neutral-600">Your status level multiplier automatically applies to all partner earnings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="mb-1">Stack with Promotions</p>
                  <p className="text-sm text-neutral-600">Earn even more during special promotional periods and bonus events</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="mb-1">Higher Tiers, Better Rates</p>
                  <p className="text-sm text-neutral-600">Some partners offer exclusive higher rates for Gold, Platinum, and Diamond members</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tag className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="mb-1">Link Your Accounts</p>
                  <p className="text-sm text-neutral-600">Connect your payment methods for automatic earning tracking</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Become a Partner CTA */}
        <Card className="mt-10 border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
          <CardContent className="py-8 text-center">
            <Store className="w-12 h-12 text-violet-600 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">Are You a Brand?</h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join the Crescendo Rewards Alliance and connect with our engaged community of members. 
              Drive sales while rewarding loyal customers with NCTR tokens.
            </p>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Award className="w-4 h-4" />
              Become a Partner
              <ExternalLink className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}