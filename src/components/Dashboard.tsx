import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Sparkles, Lock, Gift, Trophy, TrendingUp, ChevronRight, Award, Plus, Calendar, UserPlus, Moon, Sun, Store, Wallet, User, Settings, ChevronDown, LogOut, Coins, CheckCircle2, Zap } from "lucide-react";
import { NCTRLogo } from "./NCTRLogo";
import { CrescendoLogo } from "./CrescendoLogo";
import { ThemeToggle } from "./ThemeToggle";
import { ReferralCard } from "./ReferralCard";
import { useTheme } from "./ThemeProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface DashboardProps {
  walletConnected: boolean;
  onConnectWallet: () => void;
  onLockTokens: () => void;
  onClaimNFT: () => void;
  onViewRewards: () => void;
  onEarnNCTR: () => void;
  onSignOut: () => void;
  onLevelUp: () => void;
  onAdminRewards?: () => void;
  onAdminBrands?: () => void;
  onAdminExternalEarn?: () => void;
  onViewStatusLevels: () => void;
  onViewProfile: () => void;
  onViewBrandPartners: () => void;
  onViewMarketplace?: () => void;
}

export function Dashboard({
  walletConnected,
  onConnectWallet,
  onLockTokens,
  onClaimNFT,
  onViewRewards,
  onEarnNCTR,
  onSignOut,
  onLevelUp,
  onAdminRewards,
  onAdminBrands,
  onAdminExternalEarn,
  onViewStatusLevels,
  onViewProfile,
  onViewBrandPartners,
  onViewMarketplace,
}: DashboardProps) {
  // Mock user data
  const userData = {
    level: 2,
    tier: 'Silver',
    lockedNCTR: 2500,
    nextLevelThreshold: 5000,
    multiplier: '1.25x',
    claimBalance: 3,
    claimsPerYear: 4,
    discount: '10%',
    hasStatusAccessPass: false,
  };

  // Mock referral data
  const referralStats = {
    totalReferrals: 3,
    totalEarned: 1600, // 100 signup + 3 x 500
    signupBonus: 100,
    hasClaimedSignupBonus: true,
  };
  
  const referralCode = 'CRES-A7X9K2';

  const progressToNextLevel = (userData.lockedNCTR / userData.nextLevelThreshold) * 100;

  const levelColors = {
    0: { gradient: 'from-slate-400 to-gray-500', bg: 'bg-slate-50', border: 'border-slate-200' },
    1: { gradient: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    2: { gradient: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    3: { gradient: 'from-purple-400 to-violet-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    4: { gradient: 'from-amber-400 to-yellow-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    5: { gradient: 'from-cyan-400 to-blue-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  };

  const currentLevelStyle = levelColors[userData.level as keyof typeof levelColors];

  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Mobile Layout - Stacked */}
          <div className="flex flex-col gap-4 md:hidden">
            <button 
              onClick={onViewMarketplace}
              className="hover:opacity-80 transition-opacity cursor-pointer self-center"
            >
              <CrescendoLogo />
            </button>
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button 
                variant="outline" 
                onClick={onViewBrandPartners}
                className="gap-2"
                size="sm"
              >
                <Store className="w-4 h-4" />
                Brands
              </Button>
              <Button 
                variant="outline" 
                onClick={onViewStatusLevels}
                className="gap-2"
                size="sm"
              >
                <Trophy className="w-4 h-4" />
                Status
              </Button>
              <Button 
                variant="outline" 
                onClick={onViewRewards}
                className="gap-2"
                size="sm"
              >
                <Gift className="w-4 h-4" />
                Rewards
              </Button>
              
              <ThemeToggle />
              
              {!walletConnected ? (
                <Button onClick={onConnectWallet} variant="outline" className="gap-2" size="sm">
                  <Wallet className="w-4 h-4" />
                  Connect
                </Button>
              ) : (
                <Badge className="gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Connected
                </Badge>
              )}
              
              <Button variant="ghost" onClick={onViewProfile} className="gap-2" size="sm">
                <User className="w-4 h-4" />
                Profile
              </Button>
              
              {(onAdminRewards || onAdminBrands || onAdminExternalEarn) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2" size="sm">
                      <Settings className="w-4 h-4" />
                      Admin
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {onAdminRewards && (
                      <DropdownMenuItem onClick={onAdminRewards}>
                        <Gift className="w-4 h-4 mr-2" />
                        Manage Rewards
                      </DropdownMenuItem>
                    )}
                    {onAdminBrands && (
                      <DropdownMenuItem onClick={onAdminBrands}>
                        <Store className="w-4 h-4 mr-2" />
                        Manage Brands
                      </DropdownMenuItem>
                    )}
                    {onAdminExternalEarn && (
                      <DropdownMenuItem onClick={onAdminExternalEarn}>
                        <Coins className="w-4 h-4 mr-2" />
                        External Earn Ops
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          
          {/* Desktop Layout - Horizontal */}
          <div className="hidden md:flex items-center justify-between">
            <button 
              onClick={onViewMarketplace}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <CrescendoLogo />
            </button>
            
            <div className="flex items-center gap-4">
              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={onViewBrandPartners}
                  className="gap-2"
                >
                  <Store className="w-4 h-4" />
                  Brands
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onViewStatusLevels}
                  className="gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Status
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onViewRewards}
                  className="gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Rewards
                </Button>
              </div>
              
              <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
              
              <ThemeToggle />
              
              <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
              
              {!walletConnected ? (
                <Button onClick={onConnectWallet} variant="outline" className="gap-2">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              ) : (
                <Badge className="gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Base Wallet Connected
                </Badge>
              )}
              
              <Button variant="ghost" onClick={onViewProfile} className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              
              {(onAdminRewards || onAdminBrands || onAdminExternalEarn) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <Settings className="w-4 h-4" />
                      Admin
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {onAdminRewards && (
                      <DropdownMenuItem onClick={(e) => {
                        e.preventDefault();
                        onAdminRewards();
                      }}>
                        <Gift className="w-4 h-4 mr-2" />
                        Manage Rewards
                      </DropdownMenuItem>
                    )}
                    {onAdminBrands && (
                      <DropdownMenuItem onClick={(e) => {
                        e.preventDefault();
                        onAdminBrands();
                      }}>
                        <Store className="w-4 h-4 mr-2" />
                        Manage Brands
                      </DropdownMenuItem>
                    )}
                    {onAdminExternalEarn && (
                      <DropdownMenuItem onClick={(e) => {
                        e.preventDefault();
                        onAdminExternalEarn();
                      }}>
                        <Coins className="w-4 h-4 mr-2" />
                        Manage External Earn
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <Button variant="ghost" onClick={onSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl tracking-tight mb-2">Welcome back</h1>
          <p className="text-neutral-600">Manage your status, claims, and rewards</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="lg:col-span-2">
            <Card className={`border-2 ${currentLevelStyle.border}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Status</CardTitle>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`bg-gradient-to-r ${currentLevelStyle.gradient} text-white text-lg px-4 py-1`}>
                      {userData.tier}
                    </Badge>
                    <span className="text-xs text-neutral-600">Level {userData.level}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NCTR Balance */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 flex items-center">
                      Total <NCTRLogo /> Balance
                    </p>
                    <p className="text-4xl tracking-tight">{(userData.lockedNCTR + 5420).toLocaleString()}</p>
                  </div>
                </div>

                {/* 360LOCK Progress */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center">
                      360LOCK <NCTRLogo />
                    </span>
                    <Button 
                      onClick={onLevelUp} 
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                    >
                      <Zap className="w-4 h-4" />
                      Level Up
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{userData.lockedNCTR.toLocaleString()} / {userData.nextLevelThreshold.toLocaleString()}</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3" />
                  <p className="text-sm text-neutral-500 mt-2">
                    {(userData.nextLevelThreshold - userData.lockedNCTR).toLocaleString()} NCTR to Level {userData.level + 1}
                  </p>
                </div>

                {/* Status Access Pass */}
                <div className={`p-4 rounded-xl ${currentLevelStyle.bg} border ${currentLevelStyle.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-violet-600" />
                      <span>Status Access Pass on Base</span>
                    </div>
                    {userData.hasStatusAccessPass ? (
                      <Badge className="bg-green-100 text-green-700 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Claimed
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700">
                        Not Claimed
                      </Badge>
                    )}
                  </div>
                  
                  {!userData.hasStatusAccessPass && (
                    <div className="space-y-3">
                      <p className="text-sm text-neutral-600">
                        Claim your status Access Pass to unlock exclusive opportunities, rewards and experiences.
                      </p>
                      {walletConnected ? (
                        <Button onClick={onClaimNFT} className="w-full bg-violet-600 hover:bg-violet-700">
                          Claim Status Access Pass
                        </Button>
                      ) : (
                        <Button onClick={onConnectWallet} variant="outline" className="w-full">
                          Connect Wallet to Claim
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {userData.hasStatusAccessPass && (
                    <div className="text-sm space-y-1">
                      <p className="text-neutral-600">Contract: 0x7a4c...3f9d</p>
                      <p className="text-neutral-600">Token ID: #1234</p>
                    </div>
                  )}
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-neutral-600">Multiplier</span>
                    </div>
                    <p className="text-2xl">{userData.multiplier}</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-violet-600" />
                      <span className="text-sm text-neutral-600">Claims</span>
                    </div>
                    <p className="text-2xl">{userData.claimsPerYear}/yr</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-neutral-600">Discount</span>
                    </div>
                    <p className="text-2xl">{userData.discount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Claims Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl mb-2">{userData.claimBalance}</div>
                  <p className="text-sm text-neutral-600">Available claims</p>
                </div>
                <Button onClick={onViewRewards} className="w-full bg-violet-600 hover:bg-violet-700">
                  Browse Rewards
                </Button>
              </CardContent>
            </Card>

            {/* Referral Card - Prominent Position */}
            <ReferralCard stats={referralStats} referralCode={referralCode} />

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={onViewStatusLevels} variant="outline" className="w-full justify-start gap-2">
                  <Award className="w-4 h-4" />
                  View All Status Levels
                </Button>
                
                <Button onClick={onEarnNCTR} variant="outline" className="w-full justify-start gap-2">
                  <Coins className="w-4 h-4" />
                  Earn NCTR
                </Button>
                
                <Button onClick={onLockTokens} variant="outline" className="w-full justify-start gap-2">
                  <Lock className="w-4 h-4" />
                  Commit to 360LOCK
                </Button>
                
                {!userData.hasStatusAccessPass && walletConnected && (
                  <Button onClick={onClaimNFT} variant="outline" className="w-full justify-start gap-2">
                    <Trophy className="w-4 h-4" />
                    Claim Status Access Pass
                  </Button>
                )}
                
                <Button onClick={onViewRewards} variant="outline" className="w-full justify-start gap-2">
                  <Gift className="w-4 h-4" />
                  View Rewards
                </Button>
                
                <Button onClick={onViewBrandPartners} variant="outline" className="w-full justify-start gap-2">
                  <Store className="w-4 h-4" />
                  Brand Partners
                </Button>
                
                {onViewMarketplace && (
                  <Button onClick={onViewMarketplace} variant="outline" className="w-full justify-start gap-2">
                    <Store className="w-4 h-4" />
                    Marketplace
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'lock', description: '360LOCK: Committed 15,000 NCTR', date: '2 days ago' },
                { type: 'level', description: 'Reached Level 2', date: '2 days ago' },
                { type: 'claim', description: 'Earned 1 claim', date: '1 week ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'lock' ? 'bg-violet-100' :
                      activity.type === 'level' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {activity.type === 'lock' && <Lock className="w-5 h-5 text-violet-600" />}
                      {activity.type === 'level' && <Trophy className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'claim' && <Gift className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-neutral-500">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}