import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Lock, TrendingUp, Gift, AlertCircle } from 'lucide-react';

interface LockTokensModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function LockTokensModal({ onClose, onSuccess }: LockTokensModalProps) {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState<90 | 360>(360);
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');

  const estimatedLevel = getEstimatedLevel(Number(amount), duration);

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleLock = () => {
    setStep('success');
  };

  const handleDone = () => {
    onSuccess();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        {step === 'input' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Commit NCTR to 360LOCK</DialogTitle>
              <DialogDescription>
                Lock your NCTR tokens to build your member status and unlock greater benefits
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Commit</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                />
                <p className="text-sm text-neutral-600">Minimum: 1,000 NCTR</p>
              </div>

              <div className="space-y-3">
                <Label>Commitment Duration</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration(90)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      duration === 90
                        ? 'border-violet-600 bg-violet-50'
                        : 'border-neutral-200 hover:border-violet-300'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-2xl mb-1">90</p>
                      <p className="text-sm text-neutral-600">days</p>
                      <Badge variant="outline" className="mt-2">90LOCK</Badge>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuration(360)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      duration === 360
                        ? 'border-violet-600 bg-violet-50'
                        : 'border-neutral-200 hover:border-violet-300'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-2xl mb-1">360</p>
                      <p className="text-sm text-neutral-600">days</p>
                      <Badge variant="outline" className="mt-2">360LOCK</Badge>
                    </div>
                  </button>
                </div>
              </div>

              {amount && Number(amount) >= 1000 && (
                <div className="p-4 bg-violet-50 border-2 border-violet-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-violet-600" />
                    <span>Estimated Status Impact</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Estimated Level</span>
                      <Badge className={`${getLevelColor(estimatedLevel)} text-white`}>
                        Level {estimatedLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Token Multiplier</span>
                      <span className="text-sm">{getMultiplier(estimatedLevel)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Monthly Claims</span>
                      <span className="text-sm">{getClaims(estimatedLevel)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Brand Discount</span>
                      <span className="text-sm">{getDiscount(estimatedLevel)}</span>
                    </div>
                  </div>
                </div>
              )}

              {amount && Number(amount) < 1000 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900">
                    Minimum commitment is 1,000 NCTR
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!amount || Number(amount) < 1000}
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Confirm Commitment</DialogTitle>
              <DialogDescription>
                Review your commitment details before proceeding
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Amount</span>
                    <span>{Number(amount).toLocaleString()} NCTR</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Duration</span>
                    <span>{duration} days ({duration === 90 ? '90LOCK' : '360LOCK'})</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-neutral-600">Estimated Level</span>
                    <Badge className={`${getLevelColor(estimatedLevel)} text-white`}>
                      Level {estimatedLevel}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  Your tokens will be committed to 360LOCK for {duration} days. During this period, you cannot withdraw them. This commitment builds your Crescendo member status to Level {estimatedLevel}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setStep('input')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleLock} className="flex-1 bg-violet-600 hover:bg-violet-700">
                  Confirm Commitment
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Commitment Successful!</DialogTitle>
              <DialogDescription>
                Your NCTR has been committed to 360LOCK
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-10 h-10 text-violet-600" />
              </div>

              <div>
                <p className="text-neutral-600 mb-4">
                  Successfully committed {Number(amount).toLocaleString()} NCTR to 360LOCK for {duration} days
                </p>
                <Badge className={`${getLevelColor(estimatedLevel)} text-white text-lg px-4 py-2`}>
                  Level {estimatedLevel}
                </Badge>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-left">
                <p className="text-sm text-green-900 mb-2">
                  <strong>Next step:</strong> Claim your Status NFT on Base to unlock token-gated rewards and experiences.
                </p>
              </div>

              <Button onClick={handleDone} className="w-full bg-violet-600 hover:bg-violet-700">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function getEstimatedLevel(amount: number, duration: number): number {
  if (duration === 360) {
    if (amount >= 250000) return 4;
    if (amount >= 100000) return 3;
    if (amount >= 25000) return 2;
    if (amount >= 5000) return 1;
    return 1;
  }
  // 90LOCK has lower impact - requires higher amounts for same level
  if (amount >= 350000) return 4;
  if (amount >= 150000) return 3;
  if (amount >= 35000) return 2;
  if (amount >= 7500) return 1;
  return 1;
}

function getLevelColor(level: number): string {
  const colors = {
    1: 'bg-gradient-to-r from-emerald-400 to-green-500',
    2: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    3: 'bg-gradient-to-r from-purple-400 to-violet-500',
    4: 'bg-gradient-to-r from-amber-400 to-yellow-500',
  };
  return colors[level as keyof typeof colors] || colors[1];
}

function getMultiplier(level: number): string {
  const multipliers = { 1: '1.1x', 2: '1.25x', 3: '1.5x', 4: '1.75x' };
  return multipliers[level as keyof typeof multipliers] || '1.1x';
}

function getClaims(level: number): string {
  const claims = { 1: '2/year', 2: '1/month', 3: '2/month', 4: '3/month' };
  return claims[level as keyof typeof claims] || '2/year';
}

function getDiscount(level: number): string {
  const discounts = { 1: '0%', 2: '10%', 3: '15%', 4: '20%' };
  return discounts[level as keyof typeof discounts] || '0%';
}