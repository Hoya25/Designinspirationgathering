import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ArrowLeft, Lock, TrendingUp, Gift, Tag, Trophy, CheckCircle2, ArrowUpRight, Zap, Sparkles, Crown, Star, Award, ChevronRight, Info, Store, ShoppingCart, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface StatusLevelsPageProps {
  onBack: () => void;
  currentLevel: number;
  onNavigateToRewards?: () => void;
  onNavigateToBrands?: () => void;
}

const STATUS_TIERS = [
  {
    level: 1,
    tier: 'Bronze',
    required: 1000,
    price: 40,
    multiplier: '1.1x',
    claims: '1 annual claim',
    discount: '5%',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    description: 'Unlock your first tier with enhanced earning potential',
    perks: [
      'Access to bronze reward catalog',
      'Earn 1.1x NCTR on all activities',
      '1 reward claim per year',
      '5% discount on partner brands',
      'Priority customer support',
    ],
  },
  {
    level: 2,
    tier: 'Silver',
    required: 2500,
    price: 100,
    multiplier: '1.25x',
    claims: '4 annual claims',
    discount: '10%',
    color: 'from-blue-400 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    description: 'Unlock enhanced benefits with quarterly claim privileges',
    perks: [
      'Access to premium reward catalog',
      'Earn 1.25x NCTR on all activities',
      '4 reward claims per year',
      '10% discount on partner brands',
      'Early access to new rewards',
    ],
  },
  {
    level: 3,
    tier: 'Gold',
    required: 5000,
    price: 200,
    multiplier: '1.4x',
    claims: '1 monthly claim',
    discount: '15%',
    color: 'from-purple-400 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    description: 'Experience elite status with monthly claims and exclusive perks',
    perks: [
      'Access to exclusive reward catalog',
      'Earn 1.4x NCTR on all activities',
      '1 reward claim per month',
      '15% discount on partner brands',
      'VIP event invitations',
      'Dedicated account manager',
    ],
  },
  {
    level: 4,
    tier: 'Platinum',
    required: 10000,
    price: 400,
    multiplier: '1.5x',
    claims: '2 monthly claims',
    discount: '20%',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: 'Reach platinum status with bi-monthly claims and premium benefits',
    perks: [
      'Access to platinum reward catalog',
      'Earn 1.5x NCTR on all activities',
      '2 reward claims per month',
      '20% discount on partner brands',
      'Exclusive platinum-only experiences',
      'Governance voting rights',
      'Custom reward requests',
    ],
  },
  {
    level: 5,
    tier: 'Diamond',
    required: 25000,
    price: 1000,
    multiplier: '2x',
    claims: '5 monthly claims',
    discount: '25%',
    color: 'from-cyan-400 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    description: 'The pinnacle of Crescendo membership with maximum benefits and 2x earnings',
    perks: [
      'Unlimited access to all rewards',
      'Earn 2x NCTR on all activities',
      '5 reward claims per month',
      '25% discount on partner brands',
      'Exclusive diamond-only experiences',
      'Full governance voting rights',
      'Priority custom reward requests',
      'Direct access to leadership team',
    ],
  },
];

export function StatusLevelsPage({ onBack, currentLevel, onNavigateToRewards, onNavigateToBrands }: StatusLevelsPageProps) {
  // Mock user data - would come from props in real implementation
  // Convert level number to array index (level 1 = index 0, level 2 = index 1, etc.)
  const currentTierIndex = currentLevel - 1;
  const currentTier = STATUS_TIERS[currentTierIndex];
  const nextTier = STATUS_TIERS[currentTierIndex + 1];
  const lockedNCTR = 2500; // Mock data
  const progressToNext = nextTier ? ((lockedNCTR - currentTier.required) / (nextTier.required - currentTier.required)) * 100 : 100;
  
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<typeof STATUS_TIERS[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentLevelPrice = currentTier.price;
  
  const handleLevelUpClick = (tier: typeof STATUS_TIERS[0]) => {
    setSelectedTier(tier);
    setPurchaseDialogOpen(true);
  };
  
  const handlePurchaseConfirm = () => {
    if (!selectedTier) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseDialogOpen(false);
      alert(`Success! You've unlocked ${selectedTier.tier} status!\n\n${selectedTier.required.toLocaleString()} NCTR has been credited to your 360LOCK account.\n\nYour ${selectedTier.tier} NFT will be minted to your wallet shortly.`);
      setSelectedTier(null);
    }, 2000);
  };
  
  const getUpgradePrice = (targetTier: typeof STATUS_TIERS[0]) => {
    return targetTier.price - currentLevelPrice;
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
              {onNavigateToBrands && (
                <Button 
                  variant="outline" 
                  onClick={onNavigateToBrands}
                  className="gap-2"
                >
                  <Store className="w-4 h-4" />
                  Brands
                </Button>
              )}
              <Button 
                variant="outline" 
                className="gap-2 border-violet-200 hover:bg-violet-50"
              >
                <Trophy className="w-4 h-4 text-violet-600" />
                Status
              </Button>
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
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl tracking-tight">Status Levels & Benefits</h1>
              <p className="text-neutral-600">Build your status, unlock greater rewards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Current Status Summary */}
        <Card className="mb-8 border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${currentTier.color} rounded-2xl flex items-center justify-center shadow-md`}>
                  <span className="text-3xl text-white">{currentLevel}</span>
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Your Current Status</p>
                  <h2 className="text-4xl tracking-tight mb-1">{currentTier.tier}</h2>
                  <p className="text-sm text-neutral-600">{lockedNCTR.toLocaleString()} NCTR locked in 360LOCK</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-violet-600" />
                    <p className="text-sm text-neutral-600">Multiplier</p>
                  </div>
                  <p className="text-3xl">{currentTier.multiplier}</p>
                </div>
                <div className="h-12 w-px bg-neutral-200" />
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="w-4 h-4 text-violet-600" />
                    <p className="text-sm text-neutral-600">Claims</p>
                  </div>
                  <p className="text-xl">{currentTier.claims}</p>
                </div>
                <div className="h-12 w-px bg-neutral-200" />
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="w-4 h-4 text-violet-600" />
                    <p className="text-sm text-neutral-600">Discount</p>
                  </div>
                  <p className="text-3xl">{currentTier.discount}</p>
                </div>
              </div>
            </div>
            
            {nextTier && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm">Progress to {nextTier.tier}</p>
                  <p className="text-sm text-neutral-600">{nextTier.required - lockedNCTR} NCTR to go</p>
                </div>
                <Progress value={Math.max(0, Math.min(100, progressToNext))} className="h-3 mb-3" />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-600">{currentTier.required.toLocaleString()} NCTR</p>
                  <p className="text-xs text-neutral-600">{nextTier.required.toLocaleString()} NCTR</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Roadmap */}
        <Card className="mb-10 border-2 border-neutral-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-600" />
              Your Status Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Roadmap */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-neutral-200" />
                
                <div className="grid grid-cols-6 gap-4 relative">
                  {STATUS_TIERS.map((tier, index) => {
                    const isPast = index < currentTierIndex;
                    const isCurrent = index === currentTierIndex;
                    
                    return (
                      <div key={tier.level} className="flex flex-col items-center">
                        {/* Icon */}
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-3 relative z-10 transition-all ${
                          isCurrent 
                            ? `bg-gradient-to-br ${tier.color} shadow-lg ring-4 ring-violet-200` 
                            : isPast
                            ? `bg-gradient-to-br ${tier.color} opacity-60`
                            : 'bg-neutral-100 border-2 border-neutral-300'
                        }`}>
                          {isCurrent && <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>}
                          {isPast && <CheckCircle2 className="w-8 h-8 text-white" />}
                          {!isPast && <span className={`text-2xl ${isCurrent ? 'text-white' : 'text-neutral-400'}`}>{tier.level}</span>}
                        </div>
                        
                        {/* Label */}
                        <p className={`text-sm mb-1 ${isCurrent ? '' : 'text-neutral-600'}`}>{tier.tier}</p>
                        <p className="text-xs text-neutral-500 text-center">{tier.required.toLocaleString()} NCTR</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Mobile Roadmap */}
            <div className="md:hidden space-y-4">
              {STATUS_TIERS.map((tier, index) => {
                const isPast = index < currentTierIndex;
                const isCurrent = index === currentTierIndex;
                
                return (
                  <div key={tier.level} className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCurrent 
                        ? `bg-gradient-to-br ${tier.color} shadow-lg` 
                        : isPast
                        ? `bg-gradient-to-br ${tier.color} opacity-60`
                        : 'bg-neutral-100 border-2 border-neutral-300'
                    }`}>
                      {isPast && <CheckCircle2 className="w-6 h-6 text-white" />}
                      {!isPast && <span className={`text-xl ${isCurrent ? 'text-white' : 'text-neutral-400'}`}>{tier.level}</span>}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={isCurrent ? '' : 'text-neutral-600'}>{tier.tier}</p>
                        {isCurrent && (
                          <Badge className="bg-violet-600 text-white text-xs">Current</Badge>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">{tier.required.toLocaleString()} NCTR</p>
                    </div>
                    
                    {isCurrent && (
                      <ArrowRight className="w-5 h-5 text-violet-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-10 border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-600" />
              How Status Levels Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">1</span>
                </div>
                <div>
                  <p className="mb-1">Earn NCTR Tokens</p>
                  <p className="text-sm text-neutral-600">Complete activities, refer friends, and engage with partner brands</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">2</span>
                </div>
                <div>
                  <p className="mb-1">Commit to 360LOCK</p>
                  <p className="text-sm text-neutral-600">Lock your NCTR for 360 days to build your member status level</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white">3</span>
                </div>
                <div>
                  <p className="mb-1">Unlock Benefits</p>
                  <p className="text-sm text-neutral-600">Each level brings multipliers, monthly claims, and exclusive perks</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Tiers */}
        <div className="space-y-6">
          {STATUS_TIERS.map((tier) => (
            <Card 
              key={tier.level} 
              className={`border-2 transition-all ${
                tier.level === currentLevel 
                  ? `${tier.border} shadow-lg scale-[1.02]` 
                  : 'border-neutral-200 hover:border-violet-200'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center`}>
                      <span className="text-2xl text-white">{tier.level}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl">{tier.tier}</h3>
                        {tier.level === currentLevel && (
                          <Badge className="bg-violet-600 text-white gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Your Level
                          </Badge>
                        )}
                      </div>
                      <p className="text-neutral-600">{tier.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Requirements */}
                <div className={`p-4 rounded-xl ${tier.bg} border ${tier.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-5 h-5 text-neutral-700" />
                    <span className="text-sm">Commitment Requirements</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">360LOCK (360 days)</p>
                    <p className="text-2xl">{tier.required.toLocaleString()}</p>
                    <p className="text-xs text-neutral-500">NCTR minimum</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="mb-4">Key Benefits Overview</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-5 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-sm text-neutral-600">Earnings Multiplier</span>
                      </div>
                      <p className="text-3xl mb-1">{tier.multiplier}</p>
                      <p className="text-xs text-neutral-500">
                        {tier.level === 0 ? 'Base earning rate' :
                         tier.level === 1 ? '+10% boost on all earnings' :
                         tier.level === 2 ? '+25% boost on all earnings' :
                         tier.level === 3 ? '+40% boost on all earnings' :
                         tier.level === 4 ? '+50% boost on all earnings' :
                         '+100% boost on all earnings'}
                      </p>
                    </div>
                    
                    <div className="p-5 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                          <Gift className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-sm text-neutral-600">Reward Claims</span>
                      </div>
                      <p className="text-2xl mb-1">{tier.claims}</p>
                      <p className="text-xs text-neutral-500">
                        {tier.level === 0 ? 'Build status to unlock claims' :
                         tier.level === 1 ? 'Claim rewards annually' :
                         tier.level === 2 ? 'Claim rewards quarterly' :
                         tier.level === 3 ? 'Claim up to 12/year' :
                         tier.level === 4 ? 'Claim up to 24/year' :
                         'Claim up to 60/year'}
                      </p>
                    </div>
                    
                    <div className="p-5 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                          <Tag className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-sm text-neutral-600">Brand Discount</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors">
                              <Info className="w-3 h-3 text-neutral-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Your status level unlocks this discount amount with Alliance brands</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-3xl mb-1">{tier.discount}</p>
                      <p className="text-xs text-neutral-500">
                        {tier.level === 0 ? 'No discount available' : 'Off all partner brands'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* All Perks */}
                <div>
                  <h4 className="mb-4">Complete Benefits Package</h4>
                  <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl border-2 border-neutral-200 p-6">
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                      {tier.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <span className="text-sm">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* NFT Benefits */}
                {tier.level > 0 && (
                  <div className={`p-5 rounded-xl bg-gradient-to-br ${tier.bg} border-2 ${tier.border}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="mb-2">{tier.tier} Status NFT on Base</h4>
                        <p className="text-sm text-neutral-600 mb-3">
                          Unlock token-gated access to digital rewards, exclusive subscriptions, and member-only experiences
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-white/80">
                            🎯 Digital Rewards Access
                          </Badge>
                          <Badge variant="outline" className="bg-white/80">
                            🎟️ Event Access
                          </Badge>
                          {tier.level >= 3 && (
                            <Badge variant="outline" className="bg-white/80">
                              👑 VIP Experiences
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Level Up Button */}
                {tier.level > currentLevel && tier.price > 0 && (
                  <div className="p-6 rounded-xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="mb-3">Instant Upgrade to {tier.tier}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-white rounded-xl border-2 border-neutral-200">
                              <p className="text-xs text-neutral-600 mb-1">Upgrade Cost</p>
                              <p className="text-3xl">${getUpgradePrice(tier)}</p>
                            </div>
                            {currentLevelPrice > 0 && (
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-600 text-white gap-1 px-3 py-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  ${currentLevelPrice} credit applied
                                </Badge>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">
                            {tier.required.toLocaleString()} NCTR will be credited to your 360LOCK account
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleLevelUpClick(tier)}
                        className="bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 gap-2 ml-6"
                        size="lg"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy for ${getUpgradePrice(tier)}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="mt-10 bg-neutral-100 border-neutral-200">
          <CardHeader>
            <CardTitle>Status NFT on Base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-600">
              Each status level is represented by a unique NFT on the Base network. Your Status NFT:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Provides token-gated access to digital rewards and experiences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Automatically updates when you reach a new status level</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Can be displayed in your wallet and on NFT marketplaces</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Grants voting rights in Crescendo governance proposals (Gold & Platinum)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Purchase Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upgrade to {selectedTier?.tier} Status</DialogTitle>
            <DialogDescription>
              Upgrade to {selectedTier?.tier} status to unlock exclusive benefits and perks.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${selectedTier?.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-2xl text-white">{selectedTier?.level}</span>
              </div>
              <div>
                <h3 className="text-3xl">{selectedTier?.tier}</h3>
                <p className="text-sm text-neutral-600">{selectedTier?.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Earnings Multiplier</span>
                </div>
                <p className="text-3xl mb-1">{selectedTier?.multiplier}</p>
                <p className="text-xs text-neutral-500">
                  {selectedTier?.level === 0 ? 'Base earning rate' :
                   selectedTier?.level === 1 ? '+10% boost on all earnings' :
                   selectedTier?.level === 2 ? '+25% boost on all earnings' :
                   selectedTier?.level === 3 ? '+40% boost on all earnings' :
                   selectedTier?.level === 4 ? '+50% boost on all earnings' :
                   '+100% boost on all earnings'}
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Reward Claims</span>
                </div>
                <p className="text-2xl mb-1">{selectedTier?.claims}</p>
                <p className="text-xs text-neutral-500">
                  {selectedTier?.level === 0 ? 'Build status to unlock claims' :
                   selectedTier?.level === 1 ? 'Claim rewards annually' :
                   selectedTier?.level === 2 ? 'Claim rewards quarterly' :
                   selectedTier?.level === 3 ? 'Claim up to 12/year' :
                   selectedTier?.level === 4 ? 'Claim up to 24/year' :
                   'Claim up to 60/year'}
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border-2 border-neutral-200 hover:border-violet-200 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">Brand Discount</span>
                </div>
                <p className="text-3xl mb-1">{selectedTier?.discount}</p>
                <p className="text-xs text-neutral-500">
                  {selectedTier?.level === 0 ? 'No discount available' : 'Off all partner brands'}
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border-2 border-violet-200 hover:border-violet-300 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-violet-600" />
                  <span className="text-sm">NCTR Received</span>
                </div>
                <p className="text-3xl mb-1 text-violet-600">{selectedTier?.required.toLocaleString()}</p>
                <p className="text-xs text-neutral-500">Locked in 360LOCK for 360 days</p>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Your Upgrade Cost</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl">${selectedTier ? getUpgradePrice(selectedTier) : 0}</p>
                    {currentLevelPrice > 0 && (
                      <span className="text-sm text-neutral-500 line-through">${selectedTier?.price}</span>
                    )}
                  </div>
                </div>
                {currentLevelPrice > 0 && (
                  <Badge className="bg-green-600 text-white gap-1 px-4 py-2">
                    <CheckCircle2 className="w-4 h-4" />
                    ${currentLevelPrice} credit applied
                  </Badge>
                )}
              </div>
              <p className="text-xs text-neutral-500">
                {selectedTier?.required.toLocaleString()} NCTR will be credited to your 360LOCK account
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="text-sm">What's Included</p>
              </div>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• {selectedTier?.required.toLocaleString()} NCTR tokens locked in 360LOCK for 360 days</li>
                <li>• Instant {selectedTier?.tier} status NFT minted to your wallet</li>
                <li>• Immediate access to all {selectedTier?.tier} tier benefits and perks</li>
                <li>• {selectedTier?.multiplier} earning multiplier on all future activities</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPurchaseDialogOpen(false)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </Button>
            <Button 
              onClick={handlePurchaseConfirm}
              className="gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="animate-spin w-4 h-4 border-2 border-t-white border-b-white rounded-full" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Upgrade
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}