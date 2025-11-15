import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Zap, TrendingUp, Lock, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface LevelUpPageProps {
  onBack: () => void;
  onNavigateToEarnExternal: () => void;
  currentLevel: number;
  lockedNCTR: number;
  availableNCTR: number;
  onPurchase: (levelIndex: number) => void;
}

const STATUS_TIERS = [
  {
    level: 0,
    tier: 'Starter',
    required: 100,
    price: 0,
    multiplier: '1x',
    claims: 'No claims',
    color: 'from-slate-400 to-gray-500',
  },
  {
    level: 1,
    tier: 'Bronze',
    required: 1000,
    price: 40,
    multiplier: '1.1x',
    claims: '1 annual claim',
    color: 'from-emerald-400 to-green-500',
  },
  {
    level: 2,
    tier: 'Silver',
    required: 2500,
    price: 100,
    multiplier: '1.25x',
    claims: '4 annual claims',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    level: 3,
    tier: 'Gold',
    required: 5000,
    price: 200,
    multiplier: '1.4x',
    claims: '1 monthly claim',
    color: 'from-purple-400 to-violet-500',
  },
  {
    level: 4,
    tier: 'Platinum',
    required: 10000,
    price: 400,
    multiplier: '1.5x',
    claims: '2 monthly claims',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    level: 5,
    tier: 'Diamond',
    required: 25000,
    price: 1000,
    multiplier: '2x',
    claims: '5 monthly claims',
    color: 'from-cyan-400 to-blue-600',
  },
];

export function LevelUpPage({
  onBack,
  onNavigateToEarnExternal,
  currentLevel,
  lockedNCTR,
  availableNCTR,
  onPurchase,
}: LevelUpPageProps) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const currentTier = STATUS_TIERS[currentLevel];
  const nextTier = currentLevel < 5 ? STATUS_TIERS[currentLevel + 1] : null;
  const progressPercentage = nextTier ? (lockedNCTR / nextTier.required) * 100 : 100;

  const handlePurchaseClick = (tierIndex: number) => {
    setSelectedTier(tierIndex);
    setShowConfirmDialog(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedTier !== null) {
      onPurchase(selectedTier);
      setShowConfirmDialog(false);
      setSelectedTier(null);
    }
  };

  const getAdjustedPrice = (tier: typeof STATUS_TIERS[0]) => {
    // Calculate credit for current level
    const currentCredit = currentTier.price;
    const adjustedPrice = Math.max(0, tier.price - currentCredit);
    return { adjustedPrice, currentCredit };
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl">Level Up Your Status</h1>
                <p className="text-sm text-neutral-600">Purchase NCTR to upgrade your membership level</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status Banner */}
        <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${currentTier.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl text-white">{currentLevel}</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Current Status</p>
                    <h2 className="text-2xl">{currentTier.tier}</h2>
                    <Badge className="mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                      {currentTier.multiplier} Earnings
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-neutral-600 mb-1">Available NCTR</p>
                    <p className="text-xl">{availableNCTR.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-neutral-600 mb-1">360LOCK Balance</p>
                    <p className="text-xl">{lockedNCTR.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {nextTier && (
                <div>
                  <p className="text-sm text-neutral-600 mb-2">Progress to {nextTier.tier}</p>
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{lockedNCTR.toLocaleString()} NCTR</span>
                      <span>{nextTier.required.toLocaleString()} NCTR</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">
                    {(nextTier.required - lockedNCTR).toLocaleString()} NCTR needed
                  </p>
                  <div className="p-4 bg-white rounded-lg border border-violet-200">
                    <p className="text-xs text-neutral-600 mb-1">Next Level Benefits</p>
                    <p className="mb-1">{nextTier.tier}</p>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="outline">{nextTier.multiplier} Earnings</Badge>
                      <Badge variant="outline">{nextTier.claims}</Badge>
                    </div>
                  </div>
                </div>
              )}

              {!nextTier && (
                <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-cyan-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-2">Maximum Level! 💎</h3>
                    <p className="text-sm text-neutral-600">You've reached Diamond status</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Earn More CTA */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Earn NCTR Without Spending</h3>
                  <p className="text-sm text-neutral-600">
                    Complete tasks, refer friends, and earn from partner opportunities
                  </p>
                </div>
              </div>
              <Button
                onClick={onNavigateToEarnExternal}
                className="gap-2 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <TrendingUp className="w-5 h-5" />
                Earn NCTR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Levels */}
        <div className="mb-6">
          <h2 className="text-xl mb-2">Purchase Status Level</h2>
          <p className="text-sm text-neutral-600 mb-6">
            Buy your desired status level and receive NCTR credited directly to your 360LOCK account
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUS_TIERS.slice(1).map((tier, index) => {
              const tierIndex = index + 1;
              const isCurrentOrLower = tierIndex <= currentLevel;
              const { adjustedPrice, currentCredit } = getAdjustedPrice(tier);
              const hasCredit = currentCredit > 0 && !isCurrentOrLower;

              return (
                <Card
                  key={tier.level}
                  className={`relative overflow-hidden transition-all ${
                    isCurrentOrLower
                      ? 'opacity-60 border-neutral-300'
                      : 'border-2 border-violet-200 hover:border-violet-300 hover:shadow-lg'
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${tier.color}`} />
                  
                  {isCurrentOrLower && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Owned
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-xl text-white">{tier.level}</span>
                      </div>
                      <div>
                        <CardTitle>{tier.tier}</CardTitle>
                        <CardDescription>Level {tier.level}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">NCTR Required</span>
                        <span>{tier.required.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Earnings Multiplier</span>
                        <Badge variant="outline">{tier.multiplier}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Claims</span>
                        <span className="text-xs">{tier.claims}</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-200 pt-4">
                      {hasCredit && (
                        <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-xs text-green-700">
                            ${currentCredit} credit applied for {currentTier.tier} level
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-sm text-neutral-600">Price</span>
                        <div className="text-right">
                          {hasCredit && tier.price > 0 && (
                            <span className="text-sm text-neutral-400 line-through mr-2">
                              ${tier.price}
                            </span>
                          )}
                          <span className="text-2xl">
                            ${adjustedPrice}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handlePurchaseClick(tierIndex)}
                        disabled={isCurrentOrLower}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      >
                        {isCurrentOrLower ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Current Level
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Buy for ${adjustedPrice}
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-center text-neutral-500">
                      <Lock className="w-3 h-3 inline mr-1" />
                      NCTR credited to 360LOCK
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="mb-2">How Status Level Purchase Works</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Select your desired status level and complete payment</li>
                  <li>• NCTR tokens are automatically credited to your 360LOCK account</li>
                  <li>• Your status level updates immediately with new benefits</li>
                  <li>• Existing members receive automatic credits when upgrading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && selectedTier !== null && (
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                Complete your status level upgrade
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${STATUS_TIERS[selectedTier].color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white">{STATUS_TIERS[selectedTier].level}</span>
                  </div>
                  <div>
                    <p className="font-medium">{STATUS_TIERS[selectedTier].tier}</p>
                    <p className="text-sm text-neutral-600">Level {STATUS_TIERS[selectedTier].level}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">NCTR to Receive</span>
                    <span>{STATUS_TIERS[selectedTier].required.toLocaleString()} NCTR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Total Price</span>
                    <span className="text-xl">${getAdjustedPrice(STATUS_TIERS[selectedTier]).adjustedPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowConfirmDialog(false);
                    setSelectedTier(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPurchase}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Confirm Purchase
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
