import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Search, Filter, Ticket, Gift, Code, Sparkles, Trophy, CheckCircle2, Lock, ExternalLink, Calendar, Package, TrendingUp, Users, Star, Zap, Clock, AlertCircle, ShoppingCart, Tag, XCircle, Loader2, ArrowRight, Info, Shield, Bell, Download, Copy, Check, X, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RewardCardImageFirst } from './RewardCardImageFirst';
import { HeroCarousel } from './HeroCarousel';

interface RewardsMarketplaceProps {
  onBack: () => void;
  onContributorMode: () => void;
  userClaimPassBalance: number;
}

interface MarketplaceReward {
  id: number;
  title: string;
  contributor: string;
  contributorAvatar?: string;
  description: string;
  fullDescription: string;
  type: 'access-code' | 'discount-code' | 'ticket-code' | 'promo-code' | 'subscription' | 'token' | 'nft' | 'gift-card';
  claimPassCost: number;
  category: string;
  brand: string;
  expiresIn?: string;
  totalSupply: number;
  remainingSupply: number;
  trending?: boolean;
  featured?: boolean;
  heroFeatured?: boolean;
  recentlyAdded?: boolean;
  redemptionDetails: string;
  terms?: string;
  deliveryTime: string;
  imageUrl?: string;
}

const MARKETPLACE_REWARDS: MarketplaceReward[] = [
  {
    id: 1,
    title: 'Premium Streaming 3-Month Access',
    contributor: 'StreamMax',
    description: 'Get 3 months of premium streaming with no ads, 4K quality, and unlimited downloads',
    fullDescription: 'Enjoy three full months of our premium streaming service. Watch thousands of movies and TV shows in stunning 4K quality, with no advertisements. Download content for offline viewing on up to 5 devices. Access exclusive original content not available on the free tier.',
    type: 'access-code',
    claimPassCost: 2,
    category: 'Entertainment',
    brand: 'StreamMax',
    expiresIn: '14 days',
    totalSupply: 100,
    remainingSupply: 47,
    trending: true,
    featured: true,
    heroFeatured: true,
    redemptionDetails: 'Access code will be revealed immediately after claiming. Visit streammax.com/redeem and enter your code to activate.',
    terms: 'Valid for new accounts only. Code must be redeemed within 30 days. Not valid with other offers.',
    deliveryTime: 'Instant',
    imageUrl: 'https://images.unsplash.com/photo-1761044590687-29916cbe4203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBlbnRlcnRhaW5tZW50JTIwdHZ8ZW58MXx8fHwxNzYzMTM0NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '50% Off Next Purchase',
    contributor: 'Fashion Forward',
    description: 'Save 50% on your next purchase of $100 or more at Fashion Forward',
    fullDescription: 'Get an exclusive 50% discount on any purchase of $100 or more from our latest collection. Shop the newest trends in fashion, from casual wear to formal attire. Discount applies to sale items as well.',
    type: 'discount-code',
    claimPassCost: 1,
    category: 'Shopping',
    brand: 'Fashion Forward',
    expiresIn: '30 days',
    totalSupply: 500,
    remainingSupply: 342,
    trending: true,
    redemptionDetails: 'Discount code will be sent to your email within 1 hour. Use online or show in-store at checkout.',
    terms: 'Valid for 60 days from issue date. Cannot be combined with other promotions. Minimum purchase $100.',
    deliveryTime: 'Within 1 hour',
    imageUrl: 'https://images.unsplash.com/photo-1572533177115-5bea803c0f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvcHBpbmclMjBsdXh0cnl8ZW58MXx8fHwxNzYzMjIxMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'VIP Concert Access Pass',
    contributor: 'Live Events Co.',
    description: 'VIP access to upcoming concert series with meet & greet opportunity',
    fullDescription: 'Experience live music like never before with VIP access to our exclusive concert series. Includes premium seating, backstage meet & greet with artists, complimentary refreshments, and exclusive merchandise.',
    type: 'ticket-code',
    claimPassCost: 5,
    category: 'Events',
    brand: 'Live Events Co.',
    expiresIn: '7 days',
    totalSupply: 50,
    remainingSupply: 8,
    featured: true,
    heroFeatured: true,
    redemptionDetails: 'E-ticket will be sent to your email within 24 hours. Present QR code at venue entrance.',
    terms: 'Valid for select events only. Must be 18+ to attend. Non-transferable.',
    deliveryTime: 'Within 24 hours',
    imageUrl: 'https://images.unsplash.com/photo-1647168285321-7509a33bf1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwdmVudUUlMjBzdGFnZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NjMyMjEwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: '$25 Dining Credit',
    contributor: 'Restaurant Group',
    description: '$25 credit towards any restaurant in our network of 50+ locations',
    fullDescription: 'Enjoy $25 off your meal at any of our 50+ partner restaurants. From fine dining to casual eateries, explore diverse cuisines and enjoy quality meals across the city.',
    type: 'promo-code',
    claimPassCost: 1,
    category: 'Dining',
    brand: 'Restaurant Group',
    expiresIn: '45 days',
    totalSupply: 200,
    remainingSupply: 156,
    redemptionDetails: 'Promo code delivered instantly. Show to server before ordering or enter online when checking out.',
    terms: 'Valid at participating locations. Cannot be used for alcohol. One code per table.',
    deliveryTime: 'Instant',
    imageUrl: 'https://images.unsplash.com/photo-1676506129134-c8aef41eb4d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbGF0dGV8ZW58MXx8fHwxNzYzMTA0MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'Premium Fitness App - Annual',
    contributor: 'FitLife Pro',
    description: 'Full year access to premium workout plans, nutrition tracking, and personal coaching',
    fullDescription: 'Transform your fitness journey with a full year of FitLife Pro premium. Access 500+ workout plans, personalized nutrition tracking, AI-powered form analysis, and weekly check-ins with certified coaches.',
    type: 'subscription',
    claimPassCost: 3,
    category: 'Wellness',
    brand: 'FitLife Pro',
    expiresIn: '20 days',
    totalSupply: 75,
    remainingSupply: 61,
    trending: true,
    recentlyAdded: true,
    redemptionDetails: 'Account activation link sent to your email within 1 hour. Create account and subscription activates automatically.',
    terms: 'Valid for new users only. Auto-renewal can be disabled in settings. Full year commitment.',
    deliveryTime: 'Within 1 hour',
    imageUrl: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NjMyMDk0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: '100 Reward Tokens',
    contributor: 'Crypto Rewards Inc.',
    description: '100 utility tokens that can be used across partner platforms',
    fullDescription: '100 $REWARD tokens delivered directly to your wallet. These utility tokens can be used for purchases, staking, or traded on supported exchanges. Participate in governance and earn additional rewards.',
    type: 'token',
    claimPassCost: 2,
    category: 'Crypto',
    brand: 'Crypto Rewards Inc.',
    totalSupply: 1000,
    remainingSupply: 823,
    redemptionDetails: 'Tokens sent to your connected Base wallet instantly upon claim.',
    terms: 'Wallet must be connected. Gas fees may apply. Token value may fluctuate.',
    deliveryTime: 'Instant',
    recentlyAdded: true,
    imageUrl: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGJsb2NrY2hhaW58ZW58MXx8fHwxNzYzMjExODgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 7,
    title: 'Exclusive Member NFT',
    contributor: 'Digital Collectibles',
    description: 'Limited edition NFT with exclusive community benefits and future airdrops',
    fullDescription: 'Own a piece of digital art and join an exclusive community. This limited edition NFT grants access to holder-only events, future airdrops, and governance rights. Only 25 will ever be minted.',
    type: 'nft',
    claimPassCost: 4,
    category: 'Digital',
    brand: 'Digital Collectibles',
    expiresIn: '10 days',
    totalSupply: 25,
    remainingSupply: 12,
    featured: true,
    redemptionDetails: 'NFT minted and transferred to your wallet within 24 hours. Ensure wallet is connected.',
    terms: 'Limited to 1 per wallet. Gas fees covered by contributor. Non-refundable.',
    deliveryTime: 'Within 24 hours',
    imageUrl: 'https://images.unsplash.com/photo-1654183818269-22495f928eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbmZ0fGVufDF8fHx8MTc2MzEwOTg1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 8,
    title: 'Spa Day Package',
    contributor: 'Serenity Spa',
    description: 'Full day spa package including massage, facial, and access to all facilities',
    fullDescription: 'Treat yourself to a luxurious full-day spa experience. Includes 60-minute massage, facial treatment, access to sauna, steam room, and pool. Complimentary healthy lunch and refreshments included.',
    type: 'access-code',
    claimPassCost: 4,
    category: 'Wellness',
    brand: 'Serenity Spa',
    expiresIn: '60 days',
    totalSupply: 40,
    remainingSupply: 28,
    redemptionDetails: 'Booking code sent via email within 2 hours. Call to schedule your appointment.',
    terms: 'Advance booking required. Valid Monday-Thursday only. Gratuity not included.',
    deliveryTime: 'Within 2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NjMyMDk0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 9,
    title: '$50 Electronics Gift Card',
    contributor: 'Tech Gadgets Inc.',
    description: 'A $50 gift card to purchase electronics and accessories',
    fullDescription: 'Enjoy a $50 gift card to Tech Gadgets Inc. Use it to buy the latest gadgets, electronics, and accessories. Perfect for upgrading your tech setup or finding the perfect gift.',
    type: 'gift-card',
    claimPassCost: 3,
    category: 'Shopping',
    brand: 'Tech Gadgets Inc.',
    expiresIn: '90 days',
    totalSupply: 200,
    remainingSupply: 150,
    trending: true,
    redemptionDetails: 'Gift card code will be sent to your email within 1 hour. Use online or show in-store at checkout.',
    terms: 'Valid for 1 year from issue date. Cannot be redeemed for cash. No expiration fees.',
    deliveryTime: 'Within 1 hour',
    imageUrl: 'https://images.unsplash.com/photo-1605602079417-ae32b68599d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzIyMTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 10,
    title: '$100 Amazon Gift Card',
    contributor: 'Amazon Rewards',
    description: '$100 Amazon gift card valid for millions of products',
    fullDescription: 'Get a $100 Amazon gift card to use on millions of products including electronics, books, home goods, and more. No restrictions on categories, use it however you like!',
    type: 'gift-card',
    claimPassCost: 5,
    category: 'Shopping',
    brand: 'Amazon',
    totalSupply: 100,
    remainingSupply: 73,
    featured: true,
    recentlyAdded: true,
    redemptionDetails: 'Gift card code delivered instantly. Add to your Amazon account and start shopping immediately.',
    terms: 'Never expires. Can be combined with other gift cards. Not redeemable for cash.',
    deliveryTime: 'Instant',
    imageUrl: 'https://images.unsplash.com/photo-1591270551371-3401a1a9382f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBib3hlcyUyMHNob3BwaW5nfGVufDF8fHx8MTc2MzIyMTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 11,
    title: '$25 Coffee Shop Gift Card',
    contributor: 'Daily Brew',
    description: '$25 gift card for premium coffee, pastries, and more',
    fullDescription: 'Start your mornings right with a $25 gift card to Daily Brew. Enjoy artisan coffee, fresh pastries, sandwiches, and more at any of our 200+ locations nationwide.',
    type: 'gift-card',
    claimPassCost: 2,
    category: 'Dining',
    brand: 'Daily Brew',
    expiresIn: '60 days',
    totalSupply: 300,
    remainingSupply: 245,
    redemptionDetails: 'Digital gift card sent via email within 30 minutes. Show barcode at checkout or add to mobile wallet.',
    terms: 'Valid at all Daily Brew locations. Cannot be used for alcohol. One card per transaction.',
    deliveryTime: 'Within 30 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1676506129134-c8aef41eb4d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbGF0dGV8ZW58MXx8fHwxNjMxMDQxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const REWARD_TYPE_CONFIG = {
  'access-code': { icon: Lock, label: 'Access Code', color: 'text-blue-600 bg-blue-50' },
  'discount-code': { icon: Tag, label: 'Discount', color: 'text-green-600 bg-green-50' },
  'ticket-code': { icon: Ticket, label: 'Ticket', color: 'text-purple-600 bg-purple-50' },
  'promo-code': { icon: Gift, label: 'Promo', color: 'text-orange-600 bg-orange-50' },
  'subscription': { icon: Calendar, label: 'Subscription', color: 'text-indigo-600 bg-indigo-50' },
  'token': { icon: Sparkles, label: 'Token', color: 'text-amber-600 bg-amber-50' },
  'nft': { icon: Trophy, label: 'NFT', color: 'text-cyan-600 bg-cyan-50' },
  'gift-card': { icon: CreditCard, label: 'Gift Card', color: 'text-pink-600 bg-pink-50' },
};

type ClaimStep = 'details' | 'processing' | 'success' | 'error';

export function RewardsMarketplace({ onBack, onContributorMode, userClaimPassBalance }: RewardsMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedReward, setSelectedReward] = useState<MarketplaceReward | null>(null);
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);
  const [claimStep, setClaimStep] = useState<ClaimStep>('details');
  const [claimedReward, setClaimedReward] = useState<MarketplaceReward | null>(null);
  const [rewardCode, setRewardCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContributorNotification, setShowContributorNotification] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to minimize header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['all', 'Entertainment', 'Shopping', 'Events', 'Dining', 'Wellness', 'Crypto', 'Digital'];

  const filteredRewards = MARKETPLACE_REWARDS.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'lowest-price') return a.claimPassCost - b.claimPassCost;
    if (sortBy === 'highest-price') return b.claimPassCost - a.claimPassCost;
    if (sortBy === 'newest') return (b.recentlyAdded ? 1 : 0) - (a.recentlyAdded ? 1 : 0);
    return 0; // featured/default
  });

  const featuredRewards = MARKETPLACE_REWARDS.filter(r => r.featured);
  const trendingRewards = MARKETPLACE_REWARDS.filter(r => r.trending);
  const heroRewards = MARKETPLACE_REWARDS.filter(r => r.heroFeatured);

  const handleClaimClick = (reward: MarketplaceReward) => {
    setSelectedReward(reward);
    setClaimStep('details');
    setClaimDialogOpen(true);
  };

  const handleClaimConfirm = () => {
    if (!selectedReward) return;
    
    setClaimStep('processing');
    
    // Simulate claim processing
    setTimeout(() => {
      // Generate a random reward code
      const code = 'CRES-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setRewardCode(code);
      setClaimedReward(selectedReward);
      setClaimStep('success');
      
      // Show contributor notification after a delay
      setTimeout(() => {
        setShowContributorNotification(true);
        setTimeout(() => setShowContributorNotification(false), 5000);
      }, 1500);
    }, 2500);
  };

  const handleCloseDialog = () => {
    setClaimDialogOpen(false);
    setClaimStep('details');
    setSelectedReward(null);
    setClaimedReward(null);
    setRewardCode('');
    setCodeCopied(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(rewardCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const canAfford = (cost: number) => userClaimPassBalance >= cost;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Contributor Notification */}
      {showContributorNotification && claimedReward && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl max-w-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900 mb-1">You Received Claims! 🎉</p>
                  <p className="text-sm text-green-700 mb-2">
                    +{claimedReward.claimPassCost} Claims from "{claimedReward.title}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className={`bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Compact Header when Scrolled */}
          {isScrolled ? (
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              
              <div className="flex items-center gap-2">
                {/* Compact Balance Display */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg border border-violet-200">
                  <Ticket className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold">{userClaimPassBalance}</span>
                  <span className="text-xs text-neutral-600 hidden sm:inline">Claims</span>
                </div>
                
                <Button 
                  onClick={onContributorMode}
                  size="sm"
                  className="gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Full Header */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <Button variant="ghost" onClick={onBack} className="gap-2 self-start">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                
                <div className="flex items-center gap-2">
                  {/* Claim Pass Balance - Prominent Display */}
                  <Card className="border-2 border-violet-300 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                          <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 mb-0.5">Your Balance</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            {userClaimPassBalance} <span className="text-sm font-normal text-neutral-600">Claims</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    onClick={onContributorMode}
                    className="gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">Submit Reward</span>
                    <span className="sm:hidden">Submit</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl tracking-tight">Available Rewards</h1>
                  <p className="text-sm sm:text-base text-neutral-600">Browse and claim rewards with your Claim Passes</p>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search rewards by name, brand, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="lowest-price">Lowest Price</SelectItem>
                    <SelectItem value="highest-price">Highest Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize data-[state=active]:bg-violet-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Hero Carousel - Only on 'all' tab */}
        {selectedCategory === 'all' && heroRewards.length > 0 && (
          <HeroCarousel 
            rewards={heroRewards}
            onClaimClick={handleClaimClick}
            canAfford={canAfford}
            userBalance={userClaimPassBalance}
            typeConfig={REWARD_TYPE_CONFIG}
          />
        )}

        {/* Featured Section */}
        {selectedCategory === 'all' && featuredRewards.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl tracking-tight">Featured Rewards</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredRewards.map(reward => (
                <RewardCardImageFirst 
                  key={reward.id} 
                  reward={reward} 
                  onClaim={handleClaimClick}
                  canAfford={canAfford(reward.claimPassCost)}
                  userBalance={userClaimPassBalance}
                  typeConfig={REWARD_TYPE_CONFIG[reward.type]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trending Section */}
        {selectedCategory === 'all' && trendingRewards.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <h2 className="text-2xl tracking-tight">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {trendingRewards.map(reward => (
                <RewardCardImageFirst 
                  key={reward.id} 
                  reward={reward} 
                  onClaim={handleClaimClick}
                  canAfford={canAfford(reward.claimPassCost)}
                  userBalance={userClaimPassBalance}
                  typeConfig={REWARD_TYPE_CONFIG[reward.type]}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Rewards */}
        <div className="mb-10">
          <h2 className="text-2xl tracking-tight mb-4">
            {selectedCategory === 'all' ? 'All Rewards' : `${selectedCategory} Rewards`}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="border-2 border-neutral-200 animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-neutral-200 rounded mb-2" />
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-neutral-200 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredRewards.map(reward => (
                <RewardCardImageFirst 
                  key={reward.id} 
                  reward={reward} 
                  onClaim={handleClaimClick}
                  canAfford={canAfford(reward.claimPassCost)}
                  userBalance={userClaimPassBalance}
                  typeConfig={REWARD_TYPE_CONFIG[reward.type]}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredRewards.length === 0 && (
          <Card className="border-2 border-dashed border-neutral-300">
            <CardContent className="py-20 text-center">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No rewards available yet</h3>
              <p className="text-neutral-600 mb-6">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Be the first to add a reward to the marketplace!'}
              </p>
              {(searchQuery || selectedCategory !== 'all') ? (
                <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={onContributorMode}>
                  Submit a Reward
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Claim Transaction Dialog */}
      <Dialog open={claimDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className={`max-w-lg ${claimStep === 'success' ? 'max-w-2xl' : ''}`}>
          {/* Step 1: Reward Details */}
          {claimStep === 'details' && selectedReward && (
            <>
              <DialogHeader>
                <DialogTitle>Reward Details</DialogTitle>
                <DialogDescription>
                  Review the details before claiming this reward
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Reward Summary */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${REWARD_TYPE_CONFIG[selectedReward.type].color}`}>
                      {(() => {
                        const Icon = REWARD_TYPE_CONFIG[selectedReward.type].icon;
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{selectedReward.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">{selectedReward.contributor[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-neutral-600">{selectedReward.contributor}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{selectedReward.fullDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Exchange Details - Large & Prominent */}
                <div className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border-2 border-violet-300">
                  <div className="text-center mb-4">
                    <p className="text-sm text-neutral-600 mb-2">This reward costs</p>
                    <div className="flex items-center justify-center gap-3">
                      <Ticket className="w-8 h-8 text-violet-600" />
                      <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        {selectedReward.claimPassCost}
                      </p>
                      <p className="text-xl text-neutral-600">Claim{selectedReward.claimPassCost > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-violet-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Your current balance</span>
                      <span className="font-semibold">{userClaimPassBalance} Claims</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">After claiming</span>
                      <span className={`font-semibold ${userClaimPassBalance - selectedReward.claimPassCost < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {userClaimPassBalance - selectedReward.claimPassCost} Claims
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Redemption Info */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium">Delivery Time</p>
                    </div>
                    <p className="text-sm text-neutral-600">{selectedReward.deliveryTime}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium">Available</p>
                    </div>
                    <p className="text-sm text-neutral-600">{selectedReward.remainingSupply} of {selectedReward.totalSupply}</p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">How to Redeem</p>
                      <p className="text-sm text-neutral-600 mb-3">{selectedReward.redemptionDetails}</p>
                      {selectedReward.terms && (
                        <>
                          <p className="text-sm font-medium mb-1">Terms & Conditions</p>
                          <p className="text-xs text-neutral-500">{selectedReward.terms}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Insufficient Balance Warning */}
                {!canAfford(selectedReward.claimPassCost) && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900 mb-1">Insufficient Claims</p>
                        <p className="text-sm text-red-700">
                          You need {selectedReward.claimPassCost - userClaimPassBalance} more Claim(s) to claim this reward.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleCloseDialog}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleClaimConfirm}
                  className="w-full sm:w-auto gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  disabled={!canAfford(selectedReward.claimPassCost) || selectedReward.remainingSupply === 0}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Claim
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Step 2: Processing State */}
          {claimStep === 'processing' && selectedReward && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
                <div className="absolute inset-0 rounded-full border-4 border-violet-200 animate-pulse" />
              </div>
              
              <h2 className="text-2xl mb-3">Processing Your Claim...</h2>
              <p className="text-neutral-600 mb-6">
                Please wait while we process your transaction
              </p>

              <div className="max-w-sm mx-auto space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-left">Verifying Claim Pass balance</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <p className="text-left">Transferring Claim Passes to contributor</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <div className="w-6 h-6 border-2 border-neutral-300 rounded-full flex-shrink-0" />
                  <p className="text-left">Generating reward delivery</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success State */}
          {claimStep === 'success' && claimedReward && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping" />
              </div>
              
              <h2 className="text-3xl mb-3">Reward Claimed! 🎉</h2>
              <p className="text-neutral-600 mb-6">
                Your reward has been successfully claimed and is ready to use
              </p>

              <div className="space-y-4 mb-6">
                {/* Reward Code/Details */}
                <div className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border-2 border-violet-200">
                  <p className="text-sm text-neutral-600 mb-2">Your Reward Code</p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <code className="text-2xl font-mono font-bold bg-white px-4 py-2 rounded-lg border-2 border-violet-300">
                      {rewardCode}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyCode}
                      className="gap-2"
                    >
                      {codeCopied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {claimedReward.redemptionDetails}
                  </p>
                </div>

                {/* Transaction Summary */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left">
                  <h3 className="font-medium mb-3">Transaction Summary</h3>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Reward</span>
                      <span className="font-medium">{claimedReward.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Contributor</span>
                      <span className="font-medium">{claimedReward.contributor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Claim Passes Spent</span>
                      <span className="font-medium text-violet-600">-{claimedReward.claimPassCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Remaining Balance</span>
                      <span className="font-medium text-green-600">{userClaimPassBalance - claimedReward.claimPassCost}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>Transaction ID</span>
                      <span className="font-mono">TX{Math.random().toString(36).substring(7).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-left">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-2">What's Next?</p>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Save or copy your reward code above</li>
                        <li>• Check your email for detailed redemption instructions</li>
                        <li>• Follow the redemption steps to activate your reward</li>
                        <li> Contact support if you need any assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contributor Earned */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-medium">Secure Transaction</p>
                  </div>
                  <p className="text-xs text-neutral-600">
                    {claimedReward.contributor} received {claimedReward.claimPassCost} Claim Pass{claimedReward.claimPassCost > 1 ? 'es' : ''} ({claimedReward.claimPassCost * 100} NCTR tokens)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="w-full sm:flex-1"
                >
                  Close
                </Button>
                <Button 
                  onClick={handleCloseDialog}
                  className="w-full sm:flex-1 gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Browse More Rewards
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Error State */}
          {claimStep === 'error' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h2 className="text-3xl mb-3">Claim Failed</h2>
              <p className="text-neutral-600 mb-6">
                We encountered an error processing your claim
              </p>

              <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-left mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900 mb-1">Transaction Error</p>
                    <p className="text-sm text-red-700">
                      Your Claim Passes have not been deducted. Please try again or contact support if the issue persists.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="w-full sm:flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => setClaimStep('details')}
                  className="w-full sm:flex-1 gap-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reward Card Component
function RewardCard({ 
  reward, 
  onClaim, 
  canAfford,
  userBalance 
}: { 
  reward: MarketplaceReward; 
  onClaim: (reward: MarketplaceReward) => void; 
  canAfford: boolean;
  userBalance: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const typeConfig = REWARD_TYPE_CONFIG[reward.type];
  const TypeIcon = typeConfig.icon;
  const supplyPercentage = (reward.remainingSupply / reward.totalSupply) * 100;
  const lowSupply = supplyPercentage < 20;
  const outOfStock = reward.remainingSupply === 0;
  const passesNeeded = reward.claimPassCost - userBalance;

  return (
    <Card 
      className={`border-2 transition-all duration-300 ${
        outOfStock 
          ? 'border-neutral-200 opacity-50' 
          : isHovered && canAfford 
          ? 'border-violet-400 shadow-xl scale-[1.02] -translate-y-1' 
          : canAfford
          ? 'border-neutral-200 hover:border-violet-200'
          : 'border-neutral-200 opacity-75'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-3 py-1.5 rounded-lg ${typeConfig.color} flex items-center gap-1.5`}>
            <TypeIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{typeConfig.label}</span>
          </div>
          
          <div className="flex flex-col gap-1 items-end">
            {reward.recentlyAdded && (
              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                ✨ New
              </Badge>
            )}
            {reward.trending && (
              <Badge className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5">
                🔥 Trending
              </Badge>
            )}
            {reward.featured && (
              <Badge className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5">
                ⭐ Featured
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="text-lg mb-2 line-clamp-2">{reward.title}</CardTitle>
        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">{reward.description}</p>

        {/* Contributor */}
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs bg-violet-100 text-violet-600">{reward.contributor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-neutral-600">by {reward.contributor}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Supply Indicator */}
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-600 mb-1.5">
            <span>Available</span>
            <span className={lowSupply && !outOfStock ? 'text-red-600 font-medium' : ''}>
              {reward.remainingSupply} / {reward.totalSupply}
            </span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                outOfStock ? 'bg-neutral-300' : lowSupply ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${supplyPercentage}%` }}
            />
          </div>
          {lowSupply && !outOfStock && (
            <p className="text-xs text-red-600 mt-1 font-medium">⚠️ Limited supply!</p>
          )}
          {outOfStock && (
            <p className="text-xs text-neutral-500 mt-1">Out of stock</p>
          )}
        </div>

        {reward.expiresIn && !outOfStock && (
          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-amber-50 px-2 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Expires in {reward.expiresIn}</span>
          </div>
        )}

        {/* Exchange Rate - Large & Prominent */}
        <div className="pt-3 border-t border-neutral-200">
          <div className="mb-3">
            <p className="text-xs text-neutral-500 mb-2">Cost</p>
            <div className="flex items-center gap-2">
              <Ticket className="w-6 h-6 text-violet-600" />
              <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {reward.claimPassCost}
              </p>
              <p className="text-sm text-neutral-600">Claim Pass{reward.claimPassCost > 1 ? 'es' : ''}</p>
            </div>
          </div>

          <Button 
            onClick={() => onClaim(reward)}
            className={`w-full gap-2 transition-all ${
              outOfStock
                ? 'bg-neutral-300 cursor-not-allowed'
                : canAfford 
                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg' 
                : 'bg-neutral-300 cursor-not-allowed'
            }`}
            disabled={!canAfford || outOfStock}
          >
            {outOfStock ? (
              <>
                <Lock className="w-4 h-4" />
                Out of Stock
              </>
            ) : !canAfford ? (
              <>
                <Lock className="w-4 h-4" />
                Need {passesNeeded} more pass{passesNeeded > 1 ? 'es' : ''}
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                Claim Now
              </>
            )}
          </Button>
        </div>

        {/* Hover Details Preview */}
        {isHovered && canAfford && !outOfStock && (
          <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-600 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Delivery: {reward.deliveryTime}</span>
            </div>
            <p className="line-clamp-2 ml-5">{reward.redemptionDetails}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}