import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { AlertCircle, CheckCircle2, Lock, Wallet } from 'lucide-react';

interface Reward {
  id: number;
  title: string;
  claims: number;
  type: string;
  sponsor: string;
  description: string;
  imageUrl: string;
}

interface RewardDetailModalProps {
  reward: Reward;
  isAuthenticated: boolean;
  walletConnected: boolean;
  userLevel: number;
  userClaims: number;
  onClose: () => void;
  onConnectWallet: () => void;
}

export function RewardDetailModal({
  reward,
  isAuthenticated,
  walletConnected,
  userLevel,
  userClaims,
  onClose,
  onConnectWallet,
}: RewardDetailModalProps) {
  const [claimStep, setClaimStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [redemptionCode, setRedemptionCode] = useState('');

  const canClaim = isAuthenticated && walletConnected && userClaims >= reward.claims;
  const insufficientClaims = isAuthenticated && userClaims < reward.claims;

  const handleClaim = () => {
    setClaimStep('confirm');
  };

  const handleConfirm = () => {
    // Generate mock redemption code
    setRedemptionCode(`NCTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setClaimStep('success');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {claimStep === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{reward.title}</DialogTitle>
              <DialogDescription>
                View details and eligibility for this reward
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Image */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={reward.imageUrl}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white">
                    Level {userLevel}
                  </Badge>
                  <Badge className="bg-white/90 text-neutral-900">Digital Fulfillment</Badge>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Sponsored by</p>
                    <p className="text-lg">{reward.sponsor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600 mb-1">Claim Cost</p>
                    <p className="text-lg">{reward.claims} {reward.claims === 1 ? 'claim' : 'claims'}</p>
                  </div>
                </div>

                <div>
                  <Badge variant="outline" className="mb-2">{reward.type}</Badge>
                  <p className="text-neutral-700">{reward.description}</p>
                </div>

                {/* Fulfillment Info */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Digital Fulfillment:</strong> This reward will be delivered via email or unique access link within 24 hours of claiming.
                  </p>
                </div>
              </div>

              {/* Eligibility Status */}
              <div className="space-y-3">
                {!isAuthenticated && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-900">
                        <strong>Sign in required:</strong> Create an account to claim rewards.
                      </p>
                    </div>
                  </div>
                )}

                {isAuthenticated && !walletConnected && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-amber-900 mb-2">
                        <strong>Wallet required:</strong> Connect your Base wallet to claim token-gated rewards.
                      </p>
                      <Button onClick={onConnectWallet} size="sm" variant="outline">
                        Connect Wallet
                      </Button>
                    </div>
                  </div>
                )}

                {insufficientClaims && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-900">
                        <strong>Insufficient claims:</strong> You have {userClaims} {userClaims === 1 ? 'claim' : 'claims'} but need {reward.claims}. Claims accrue based on your status level.
                      </p>
                    </div>
                  </div>
                )}

                {canClaim && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-900">
                        <strong>Eligible:</strong> You can claim this reward now.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleClaim}
                  disabled={!canClaim}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-neutral-300"
                >
                  {canClaim ? 'Claim Reward' : 'Cannot Claim'}
                </Button>
              </div>
            </div>
          </>
        )}

        {claimStep === 'confirm' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Confirm Claim</DialogTitle>
              <DialogDescription>
                Review your claim details before proceeding
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="text-lg mb-4">{reward.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Claim cost</span>
                    <span>{reward.claims} {reward.claims === 1 ? 'claim' : 'claims'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Your current balance</span>
                    <span>{userClaims} claims</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-neutral-600">Balance after claim</span>
                    <span>{userClaims - reward.claims} claims</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  By confirming, you'll spend {reward.claims} {reward.claims === 1 ? 'claim' : 'claims'} to unlock this digital reward. This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setClaimStep('details')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirm} className="flex-1 bg-violet-600 hover:bg-violet-700">
                  Confirm Claim
                </Button>
              </div>
            </div>
          </>
        )}

        {claimStep === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Reward Claimed!</DialogTitle>
              <DialogDescription>
                Your digital reward is ready to use
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <h3 className="text-xl mb-2">{reward.title}</h3>
                <p className="text-neutral-600">Your digital reward is ready!</p>
              </div>

              <div className="p-6 bg-violet-50 border-2 border-violet-200 rounded-xl">
                <p className="text-sm text-neutral-600 mb-2">Redemption Code</p>
                <p className="text-2xl tracking-wider mb-4 select-all">{redemptionCode}</p>
                <p className="text-sm text-neutral-600">
                  Detailed instructions have been sent to your email. You can also access this code from your dashboard.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
                <p className="text-sm text-blue-900">
                  <strong>Next steps:</strong> Check your email for detailed redemption instructions. Most digital rewards are activated within 24 hours.
                </p>
              </div>

              <Button onClick={onClose} className="w-full bg-violet-600 hover:bg-violet-700">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}