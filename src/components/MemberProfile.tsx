import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Wallet, 
  Trophy, 
  TrendingUp, 
  Gift, 
  Users, 
  Activity,
  Lock,
  Award,
  Copy,
  CheckCircle2,
  Edit,
  Settings,
  Share2,
  Store
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface MemberProfileProps {
  onBack: () => void;
  walletConnected: boolean;
  onConnectWallet: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToStatus?: () => void;
  onNavigateToBrands?: () => void;
}

export function MemberProfile({ onBack, walletConnected, onConnectWallet, onNavigateToRewards, onNavigateToStatus, onNavigateToBrands }: MemberProfileProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock user data
  const userData = {
    username: 'CrescendoMember',
    email: 'member@crescendo.app',
    memberSince: 'January 2024',
    level: 2,
    tier: 'Silver',
    walletAddress: '0x742d...3f9d',
    totalNCTR: 20420,
    lockedNCTR: 15000,
    availableNCTR: 5420,
    lifetimeEarned: 25840,
    multiplier: '1.25x',
    claimBalance: 3,
    claimsPerYear: 4,
    discount: '10%',
    hasStatusNFT: false,
    referralCode: 'CRES-A7X9K2',
    totalReferrals: 3,
    referralEarnings: 850,
  };

  const levelColors = {
    0: { gradient: 'from-slate-400 to-gray-500', bg: 'bg-slate-50', border: 'border-slate-200' },
    1: { gradient: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    2: { gradient: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    3: { gradient: 'from-purple-400 to-violet-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    4: { gradient: 'from-amber-400 to-yellow-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    5: { gradient: 'from-cyan-400 to-blue-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  };

  const currentLevelStyle = levelColors[userData.level as keyof typeof levelColors];

  const achievements = [
    { id: 1, name: 'First Lock', description: 'Committed NCTR to 360LOCK', icon: Lock, unlocked: true, date: '2 days ago' },
    { id: 2, name: 'Level Up', description: 'Reached Silver status', icon: Trophy, unlocked: true, date: '2 days ago' },
    { id: 3, name: 'Referral Master', description: 'Invited 3 friends', icon: Users, unlocked: true, date: '1 week ago' },
    { id: 4, name: 'Early Adopter', description: 'Joined Crescendo Beta', icon: Award, unlocked: true, date: '3 weeks ago' },
    { id: 5, name: 'NFT Collector', description: 'Claim your Status NFT', icon: Trophy, unlocked: false, date: null },
    { id: 6, name: 'Gold Rush', description: 'Reach Gold status', icon: Award, unlocked: false, date: null },
  ];

  const activityLog = [
    { type: 'lock', description: 'Committed 15,000 NCTR to 360LOCK', date: '2 days ago', amount: '+15,000 NCTR' },
    { type: 'level', description: 'Reached Silver Level (Level 2)', date: '2 days ago', amount: null },
    { type: 'referral', description: 'Friend joined via referral', date: '1 week ago', amount: '+500 NCTR' },
    { type: 'earn', description: 'Completed partner activity', date: '1 week ago', amount: '+500 NCTR' },
    { type: 'claim', description: 'Earned 1 claim credit', date: '2 weeks ago', amount: '+1 Claim' },
  ];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
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
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl tracking-tight">{userData.username}</h1>
              <p className="text-neutral-600">Member since {userData.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Invite Friends Banner - Top Placement */}
        <Card className="mb-6 border-2 border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-600 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-1">Invite Friends, Earn Easy</h3>
                  <p className="text-violet-100">Get 500 NCTR for every friend who joins with your link</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <p className="text-sm text-violet-100">You've earned</p>
                  <p className="text-3xl">{userData.referralEarnings}</p>
                  <p className="text-xs text-violet-100">NCTR from referrals</p>
                </div>
                <Button 
                  onClick={() => handleCopy(`crescendo.app/join/${userData.referralCode}`, 'Referral link')}
                  className="bg-white text-violet-600 hover:bg-violet-50 gap-2 px-6 py-6"
                >
                  {copiedField === 'Referral link' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Account Information</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="text-sm text-neutral-600">Username</p>
                      <p>{userData.username}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="text-sm text-neutral-600">Email</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="text-sm text-neutral-600">Member Since</p>
                      <p>{userData.memberSince}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-neutral-600" />
                    <div>
                      <p className="text-sm text-neutral-600">Connected Wallet</p>
                      {walletConnected ? (
                        <div className="flex items-center gap-2">
                          <p>{userData.walletAddress}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(userData.walletAddress, 'Wallet address')}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === 'Wallet address' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={onConnectWallet} variant="outline" size="sm" className="mt-1">
                          Connect Wallet
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NCTR Overview */}
            <Card>
              <CardHeader>
                <CardTitle>NCTR Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Total Balance</p>
                    <p className="text-3xl">{userData.totalNCTR.toLocaleString()}</p>
                    <p className="text-xs text-neutral-500 mt-1">NCTR</p>
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-1">Lifetime Earned</p>
                    <p className="text-3xl">{userData.lifetimeEarned.toLocaleString()}</p>
                    <p className="text-xs text-neutral-500 mt-1">NCTR</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-violet-600" />
                      <p className="text-sm text-neutral-600">360LOCK</p>
                    </div>
                    <p className="text-2xl">{userData.lockedNCTR.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-neutral-600">Available</p>
                    </div>
                    <p className="text-2xl">{userData.availableNCTR.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border ${
                        achievement.unlocked
                          ? 'bg-white border-violet-200'
                          : 'bg-neutral-50 border-neutral-200 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.unlocked
                              ? 'bg-violet-100'
                              : 'bg-neutral-200'
                          }`}
                        >
                          <achievement.icon
                            className={`w-5 h-5 ${
                              achievement.unlocked ? 'text-violet-600' : 'text-neutral-400'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm">{achievement.name}</p>
                            {achievement.unlocked && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-600">{achievement.description}</p>
                          {achievement.date && (
                            <p className="text-xs text-neutral-500 mt-1">{achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'lock' ? 'bg-violet-100' :
                            activity.type === 'level' ? 'bg-blue-100' :
                            activity.type === 'referral' ? 'bg-green-100' :
                            activity.type === 'earn' ? 'bg-amber-100' :
                            'bg-purple-100'
                          }`}
                        >
                          {activity.type === 'lock' && <Lock className="w-5 h-5 text-violet-600" />}
                          {activity.type === 'level' && <Trophy className="w-5 h-5 text-blue-600" />}
                          {activity.type === 'referral' && <Users className="w-5 h-5 text-green-600" />}
                          {activity.type === 'earn' && <TrendingUp className="w-5 h-5 text-amber-600" />}
                          {activity.type === 'claim' && <Gift className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-neutral-500">{activity.date}</p>
                        </div>
                      </div>
                      {activity.amount && (
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className={`border-2 ${currentLevelStyle.border}`}>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${currentLevelStyle.gradient} rounded-2xl flex items-center justify-center`}>
                    <span className="text-4xl text-white">{userData.level}</span>
                  </div>
                  <h3 className="text-2xl mb-1">{userData.tier}</h3>
                  <p className="text-sm text-neutral-600">Level {userData.level}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-neutral-600">Multiplier</span>
                    </div>
                    <span>{userData.multiplier}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-neutral-600">Claims</span>
                    </div>
                    <span>{userData.claimsPerYear}/year</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-neutral-600">Discount</span>
                    </div>
                    <span>{userData.discount}</span>
                  </div>
                </div>

                <Separator />

                {!userData.hasStatusNFT && (
                  <div className={`p-3 rounded-lg ${currentLevelStyle.bg} border ${currentLevelStyle.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-violet-600" />
                      <span className="text-sm">Status NFT</span>
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      Claim your NFT to unlock token-gated rewards
                    </p>
                    <Badge className="bg-amber-100 text-amber-700 w-full justify-center">
                      Not Claimed
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Referral Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Referral Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-violet-600" />
                      <span className="text-sm text-neutral-600">Total Referrals</span>
                    </div>
                    <span className="text-2xl">{userData.totalReferrals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Total Earned</span>
                    <span>{userData.referralEarnings} NCTR</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-2">Your Referral Code</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                      <code className="text-sm">{userData.referralCode}</code>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(userData.referralCode, 'Referral code')}
                    >
                      {copiedField === 'Referral code' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}