import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Copy, Check, Share2, Gift, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReferralStats {
  totalReferrals: number;
  totalEarned: number;
  signupBonus: number;
  hasClaimedSignupBonus: boolean;
}

interface ReferralCardProps {
  stats: ReferralStats;
  referralCode: string;
}

export function ReferralCard({ stats, referralCode }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  
  const referralLink = `https://crescendo.app/signup?ref=${referralCode}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    const referralLink = `https://crescendo.app/invite/${referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Crescendo Rewards Alliance',
          text: 'Join me on Crescendo and we both earn 500 NCTR! Plus you get a 100 NCTR welcome bonus. Use my referral link to get started.',
          url: referralLink,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback to copying link
      await handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    await handleCopy(referralLink);
  };

  return (
    <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-violet-600" />
            Invite & Earn
          </CardTitle>
          <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
            <Gift className="w-3 h-3 mr-1" />
            500 NCTR each (you + friend)
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Signup Bonus Banner */}
        {!stats.hasClaimedSignupBonus && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Welcome Bonus: 100 NCTR</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Congrats! Your signup bonus of 100 NCTR has been added to your 360LOCK balance.
                </p>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <Lock className="w-3 h-3" />
                  <span>Locked in 360LOCK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-violet-200">
            <p className="text-sm text-neutral-600 mb-1">Total Invites</p>
            <p className="text-3xl">{stats.totalReferrals}</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-violet-200">
            <p className="text-sm text-neutral-600 mb-1">NCTR Earned</p>
            <p className="text-3xl">{stats.totalEarned.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-violet-600 mt-1">
              <Lock className="w-3 h-3" />
              <span>In 360LOCK</span>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="p-4 bg-white rounded-xl border border-violet-200 space-y-2">
          <h3 className="text-sm mb-3">How Invite Bonuses Work</h3>
          <div className="space-y-2 text-sm text-neutral-600">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-violet-600">1</span>
              </div>
              <p>Share your unique referral link with friends</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-violet-600">2</span>
              </div>
              <p>They sign up and get 100 NCTR welcome bonus + 500 NCTR referral bonus</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-violet-600">3</span>
              </div>
              <p>You also earn 500 NCTR — both added to 360LOCK</p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-3">
          <label className="text-sm">Your Referral Link</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-2.5 bg-white rounded-lg border border-neutral-300 text-sm truncate">
              {referralLink}
            </div>
            <Button
              onClick={() => handleCopy(referralLink)}
              variant="outline"
              className="gap-2 border-violet-300 hover:bg-violet-50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShare}
            className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            <Share2 className="w-4 h-4" />
            Share Link
          </Button>
          <Button
            onClick={() => handleCopy(referralCode)}
            variant="outline"
            className="gap-2 border-violet-300 hover:bg-violet-50"
          >
            <Copy className="w-4 h-4" />
            Copy Code
          </Button>
        </div>

        {/* Invite Breakdown */}
        {stats.totalReferrals > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm">Recent Invites</h3>
            <div className="space-y-2">
              {[
                { name: 'Sarah M.', date: '2 days ago', earned: 500 },
                { name: 'Mike T.', date: '5 days ago', earned: 500 },
                { name: 'Alex R.', date: '1 week ago', earned: 500 },
              ].slice(0, stats.totalReferrals).map((invite, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                  <div>
                    <p className="text-sm">{invite.name}</p>
                    <p className="text-xs text-neutral-500">{invite.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+{invite.earned} NCTR</p>
                    <p className="text-xs text-neutral-500">to 360LOCK</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}