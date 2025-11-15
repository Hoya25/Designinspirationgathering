import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Trophy, Wallet, Loader2, CheckCircle2 } from 'lucide-react';

interface ClaimAccessPassModalProps {
  walletConnected: boolean;
  onConnectWallet: () => void;
  onClose: () => void;
}

export function ClaimAccessPassModal({ walletConnected, onConnectWallet, onClose }: ClaimAccessPassModalProps) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  // Mock user data
  const userLevel = 2;
  const lockedNCTR = 15000;
  const isEligible = walletConnected && lockedNCTR >= 10000;

  const handleClaim = async () => {
    setClaiming(true);
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setClaiming(false);
    setClaimed(true);
  };

  const levelColor = getLevelColor(userLevel);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!claimed ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Claim Your Status Access Pass</DialogTitle>
              <DialogDescription className="text-sm text-center">Unlock token-gated rewards and experiences with your Crescendo status Access Pass on Base.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Access Pass Preview */}
              <div className="relative">
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${levelColor} p-8 flex flex-col items-center justify-center text-white`}>
                  <Trophy className="w-20 h-20 mb-4" />
                  <p className="text-sm opacity-90 mb-2">Crescendo Alliance</p>
                  <p className="text-3xl">Level {userLevel}</p>
                  <p className="text-sm opacity-75 mt-4">Status Access Pass</p>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-white text-neutral-900 shadow-lg px-4 py-1">
                    Base Network
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 pt-4">
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-xl">
                  <p className="text-sm text-violet-900">
                    This Access Pass represents your Crescendo Alliance status on Base and unlocks token-gated rewards and experiences.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-sm text-neutral-600">Your Level</span>
                    <Badge className={`${levelColor} text-white`}>Level {userLevel}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                    <span className="text-sm text-neutral-600">360LOCK NCTR</span>
                    <span className="text-sm">{lockedNCTR.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-neutral-600">Network</span>
                    <span className="text-sm">Base</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!walletConnected ? (
                <div className="space-y-3">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900">
                      Connect your Base wallet to claim your status Access Pass
                    </p>
                  </div>
                  <Button onClick={onConnectWallet} className="w-full bg-violet-600 hover:bg-violet-700 gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect Base Wallet
                  </Button>
                </div>
              ) : !isEligible ? (
                <div className="space-y-3">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm text-amber-900">
                      Commit more NCTR to 360LOCK to claim your status Access Pass
                    </p>
                  </div>
                  <Button variant="outline" onClick={onClose} className="w-full">
                    Commit to 360LOCK
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  {claiming ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Claiming on Base...
                    </>
                  ) : (
                    'Claim Access Pass on Base'
                  )}
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Access Pass Claimed!</DialogTitle>
              <DialogDescription className="text-center">
                Your status Access Pass has been successfully minted
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <p className="text-neutral-600 mb-4">
                  Your Status Access Pass has been successfully minted on Base
                </p>
                <Badge className={`${levelColor} text-white text-lg px-4 py-2`}>
                  Level {userLevel}
                </Badge>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Contract</span>
                  <span className="font-mono">0x7a4c...3f9d</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Token ID</span>
                  <span className="font-mono">#1234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Network</span>
                  <span>Base</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-left">
                <p className="text-sm text-green-900">
                  You can now access all token-gated rewards and experiences for Level {userLevel}!
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

function getLevelColor(level: number): string {
  const colors = {
    1: 'from-emerald-400 to-green-500',
    2: 'from-blue-400 to-cyan-500',
    3: 'from-purple-400 to-violet-500',
    4: 'from-amber-400 to-yellow-500',
  };
  return colors[level as keyof typeof colors] || colors[1];
}
