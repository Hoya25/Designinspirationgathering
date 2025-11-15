import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowRight, Lock, Zap, TrendingUp, CreditCard, CheckCircle2 } from 'lucide-react';

interface LevelUpModalProps {
  currentLevel: number;
  lockedNCTR: number;
  availableNCTR: number;
  onClose: () => void;
  onCommit: (amount: number) => void;
  onPurchase: (amount: number) => void;
}

const LEVEL_REQUIREMENTS = [
  { level: 1, tier: 'Bronze', required: 1000, multiplier: '1.1x', claims: '1 annual claim', discount: '5%', color: 'from-emerald-400 to-green-500' },
  { level: 2, tier: 'Silver', required: 2500, multiplier: '1.25x', claims: '4 annual claims', discount: '10%', color: 'from-blue-400 to-cyan-500' },
  { level: 3, tier: 'Gold', required: 5000, multiplier: '1.4x', claims: '1 monthly claim', discount: '15%', color: 'from-purple-400 to-violet-500' },
  { level: 4, tier: 'Platinum', required: 10000, multiplier: '1.5x', claims: '2 monthly claims', discount: '20%', color: 'from-amber-400 to-yellow-500' },
  { level: 5, tier: 'Diamond', required: 25000, multiplier: '2x', claims: '5 monthly claims', discount: '25%', color: 'from-cyan-400 to-blue-600' },
];

export function LevelUpModal({
  currentLevel,
  lockedNCTR,
  availableNCTR,
  onClose,
  onCommit,
  onPurchase,
}: LevelUpModalProps) {
  const [commitAmount, setCommitAmount] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [activeTab, setActiveTab] = useState('purchase');
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetLevel, setTargetLevel] = useState(currentLevel < 5 ? currentLevel + 1 : currentLevel);

  const currentLevelData = LEVEL_REQUIREMENTS[currentLevel - 1];
  const targetLevelData = LEVEL_REQUIREMENTS[targetLevel - 1];
  
  const neededForTargetLevel = targetLevelData.required - lockedNCTR;
  const progressPercentage = (lockedNCTR / targetLevelData.required) * 100;
  const pricePerNCTR = 0.04;
  const totalCost = neededForTargetLevel * pricePerNCTR;

  const handleCommit = () => {
    const amount = parseInt(commitAmount);
    if (amount > 0 && amount <= availableNCTR) {
      onCommit(amount);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  };

  const handlePurchase = () => {
    const amount = parseInt(purchaseAmount);
    if (amount > 0) {
      onPurchase(amount);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }
  };

  const handleCommitMax = () => {
    const maxCommit = Math.min(availableNCTR, neededForTargetLevel);
    setCommitAmount(maxCommit.toString());
  };

  const handlePurchaseNeeded = () => {
    setPurchaseAmount(neededForTargetLevel.toString());
  };

  if (showSuccess) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Transaction completed successfully</DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl mb-2">Success!</h3>
            <p className="text-neutral-600">Your NCTR has been committed to 360LOCK</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Level Up Your Status</DialogTitle>
          <DialogDescription>
            Commit NCTR to 360LOCK to increase your member status and unlock greater benefits
          </DialogDescription>
        </DialogHeader>

        {/* Current Progress */}
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${currentLevelData.color} rounded-xl flex items-center justify-center`}>
                <span className="text-xl text-white">{currentLevel}</span>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Current Status</p>
                <p className="text-lg">{currentLevelData.tier}</p>
                <p className="text-xs text-neutral-500">Level {currentLevel}</p>
              </div>
            </div>
            {currentLevel < 5 && (
              <>
                <ArrowRight className="w-5 h-5 text-neutral-400" />
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${targetLevelData.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-xl text-white">{targetLevelData.level}</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Target Status</p>
                    <p className="text-lg">{targetLevelData.tier}</p>
                    <p className="text-xs text-neutral-500">Level {targetLevelData.level}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {currentLevel < 5 && (
            <>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-600">360LOCK Progress</span>
                  <span>{lockedNCTR.toLocaleString()} / {targetLevelData.required.toLocaleString()} NCTR</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              <p className="text-sm text-neutral-600">
                <span className="text-neutral-900">{neededForTargetLevel.toLocaleString()} NCTR</span> needed to reach Level {targetLevelData.level}
              </p>
            </>
          )}

          {currentLevel === 5 && (
            <div className="text-center py-4">
              <Badge className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-lg px-6 py-2">
                Maximum Level Reached! 💎
              </Badge>
            </div>
          )}
        </div>

        {targetLevelData && (
          <>
            {/* Benefits Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${currentLevelData.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-sm text-white">{currentLevel}</span>
                  </div>
                  <span className="text-sm text-neutral-600">Current Benefits</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-neutral-600">Earnings Multiplier</p>
                    <p className="text-lg">{currentLevelData.multiplier}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">Monthly Claims</p>
                    <p className="text-lg">{currentLevelData.claims}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">Partner Discount</p>
                    <p className="text-lg">{currentLevelData.discount}</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-violet-200 bg-violet-50/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${targetLevelData.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-sm text-white">{targetLevelData.level}</span>
                  </div>
                  <span className="text-sm text-violet-900">Next Level Benefits</span>
                  <Zap className="w-4 h-4 text-violet-600 ml-auto" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-violet-700">Earnings Multiplier</p>
                    <p className="text-lg text-violet-900">{targetLevelData.multiplier}</p>
                  </div>
                  <div>
                    <p className="text-xs text-violet-700">Monthly Claims</p>
                    <p className="text-lg text-violet-900">{targetLevelData.claims}</p>
                  </div>
                  <div>
                    <p className="text-xs text-violet-700">Partner Discount</p>
                    <p className="text-lg text-violet-900">{targetLevelData.discount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="commit" className="gap-2">
                  <Lock className="w-4 h-4" />
                  Commit Available
                </TabsTrigger>
                <TabsTrigger value="purchase" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Purchase NCTR
                </TabsTrigger>
              </TabsList>

              <TabsContent value="commit" className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-900 mb-1">Available Balance: {availableNCTR.toLocaleString()} NCTR</p>
                      <p className="text-xs text-blue-700">
                        Commit your available NCTR to 360LOCK to progress toward the next level
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="commit-amount">Amount to Commit</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="commit-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={commitAmount}
                        onChange={(e) => setCommitAmount(e.target.value)}
                        max={availableNCTR}
                      />
                      <Button
                        variant="outline"
                        onClick={handleCommitMax}
                        className="whitespace-nowrap"
                      >
                        Max
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm p-3 bg-neutral-50 rounded-lg">
                    <span className="text-neutral-600">New 360LOCK Balance</span>
                    <span className="font-medium">
                      {(lockedNCTR + (parseInt(commitAmount) || 0)).toLocaleString()} NCTR
                    </span>
                  </div>

                  <Button
                    onClick={handleCommit}
                    disabled={!commitAmount || parseInt(commitAmount) <= 0 || parseInt(commitAmount) > availableNCTR}
                    className="w-full bg-neutral-900 hover:bg-neutral-800"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Commit to 360LOCK
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="purchase" className="space-y-4">
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-violet-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-violet-900 mb-1">Purchase Rate: $0.04 per NCTR</p>
                      <p className="text-xs text-violet-700">
                        Select your target level or enter custom amount. Purchase and automatically commit to 360LOCK.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Level Selector */}
                {currentLevel < 5 && (
                  <div className="space-y-3">
                    <Label>Select Target Level</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEVEL_REQUIREMENTS.slice(currentLevel).map((level) => {
                        const nctrNeeded = level.required - lockedNCTR;
                        const cost = nctrNeeded * pricePerNCTR;
                        const isSelected = targetLevel === level.level;
                        
                        return (
                          <button
                            key={level.level}
                            onClick={() => {
                              setTargetLevel(level.level);
                              setPurchaseAmount(nctrNeeded.toString());
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              isSelected
                                ? 'border-violet-500 bg-violet-50'
                                : 'border-neutral-200 bg-white hover:border-violet-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 bg-gradient-to-br ${level.color} rounded-lg flex items-center justify-center`}>
                                <span className="text-xs text-white">{level.level}</span>
                              </div>
                              <span className="text-sm">{level.tier}</span>
                            </div>
                            <p className="text-xs text-neutral-600 mb-1">{nctrNeeded.toLocaleString()} NCTR</p>
                            <p className="text-violet-600">${cost.toFixed(2)}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="purchase-amount">NCTR to Purchase</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="purchase-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handlePurchaseNeeded}
                        className="whitespace-nowrap"
                      >
                        Needed
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-3 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-600">NCTR Amount</span>
                      <span className="font-medium">
                        {(parseInt(purchaseAmount) || 0).toLocaleString()} NCTR
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-lg">
                      <span className="text-violet-900">Total Cost</span>
                      <span className="text-xl text-violet-900">
                        ${((parseInt(purchaseAmount) || 0) * pricePerNCTR).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 bg-neutral-50 rounded-lg">
                      <span className="text-neutral-600">New 360LOCK Balance</span>
                      <span className="font-medium">
                        {(lockedNCTR + (parseInt(purchaseAmount) || 0)).toLocaleString()} NCTR
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    disabled={!purchaseAmount || parseInt(purchaseAmount) <= 0}
                    className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Pay ${((parseInt(purchaseAmount) || 0) * pricePerNCTR).toFixed(2)} to Level Up
                  </Button>
                  <p className="text-xs text-center text-neutral-500">
                    NCTR will be automatically committed to 360LOCK
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* All Levels Reference */}
        <div className="border-t border-neutral-200 pt-6 mt-2">
          <h4 className="text-sm mb-4 text-neutral-600">All Status Levels</h4>
          <div className="grid grid-cols-4 gap-3">
            {LEVEL_REQUIREMENTS.map((level) => (
              <div
                key={level.level}
                className={`p-3 rounded-lg border text-center ${
                  level.level === currentLevel
                    ? 'border-violet-300 bg-violet-50'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${level.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-sm text-white">{level.level}</span>
                </div>
                <p className="text-xs mb-1">{level.tier}</p>
                <p className="text-xs text-neutral-900">{level.required.toLocaleString()}</p>
                <p className="text-xs text-neutral-600">NCTR</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}