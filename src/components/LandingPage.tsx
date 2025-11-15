import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Lock, Gift, Trophy, TrendingUp, Star, Users, Zap, Award, CheckCircle2, ExternalLink } from "lucide-react";
import { NCTRLogo } from "./NCTRLogo";
import { CrescendoLogo } from "./CrescendoLogo";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onJoin: () => void;
  onViewRewards: () => void;
  onSignIn: () => void;
  onViewLevelDetail?: (level: number) => void;
}

export function LandingPage({ onJoin, onViewRewards, onSignIn, onViewLevelDetail }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
        <div className="flex items-center gap-4">
          <CrescendoLogo />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onViewRewards}>
            Rewards
          </Button>
          <Button variant="ghost" onClick={onSignIn}>
            Sign in
          </Button>
          <Button onClick={onJoin} className="bg-violet-600 hover:bg-violet-700">
            Join Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 -z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyNCwgNTgsIDIzNywgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-violet-100 text-violet-700 hover:bg-violet-100">
            Member Built. Member Owned.
          </Badge>
          <h1 className="text-6xl tracking-tight mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Unlock Exclusive Rewards
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
            Commit NCTR to 360LOCK, claim your status NFT on Base, and access crowdsourced digital rewards from Crescendo brands.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={onJoin} size="lg" className="bg-violet-600 hover:bg-violet-700">
              Join Crescendo
            </Button>
            <Button onClick={onViewRewards} size="lg" variant="outline">
              View Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl tracking-tight mb-4">How It Works</h2>
            <p className="text-neutral-600">Three simple steps to unlock your rewards</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-violet-200 transition-colors">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Earn and Commit NCTR</h3>
                <p className="text-neutral-600">
                  Commit your NCTR tokens to 360LOCK to build your Crescendo member status and unlock benefits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-violet-200 transition-colors">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Claim Your Status NFT</h3>
                <p className="text-neutral-600">
                  Receive a status NFT on Base that represents your level and grants access to exclusive experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-violet-200 transition-colors">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Redeem Digital Rewards</h3>
                <p className="text-neutral-600">
                  Use your claims to access subscriptions, events, experiences, and exclusive brand discounts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Status Levels */}
      <section className="py-20 px-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl tracking-tight mb-4">Status Levels</h2>
            <p className="text-lg text-neutral-600">Higher levels unlock greater benefits and rewards</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { level: 1, name: 'BRONZE', nctr: '1.00K', multiplier: '1.1x', color: 'from-amber-600 to-orange-700' },
              { level: 2, name: 'SILVER', nctr: '2.50K', multiplier: '1.25x', color: 'from-slate-400 to-gray-500' },
              { level: 3, name: 'GOLD', nctr: '5.00K', multiplier: '1.4x', color: 'from-yellow-400 to-amber-500' },
              { level: 4, name: 'PLATINUM', nctr: '10.00K', multiplier: '1.5x', color: 'from-cyan-400 to-blue-500' },
              { level: 5, name: 'DIAMOND', nctr: '25.00K', multiplier: '2x', color: 'from-violet-400 to-purple-600' },
            ].map((status) => (
              <Card 
                key={status.level} 
                className="relative overflow-hidden border border-neutral-200 hover:border-violet-300 transition-all hover:shadow-lg bg-white cursor-pointer group"
                onClick={() => onViewLevelDetail?.(status.level)}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${status.color}`} />
                <CardContent className="pt-8 pb-6 px-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${status.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <span className="text-xl text-white">{status.level}</span>
                  </div>
                  <h3 className="text-lg text-center mb-2">{status.name}</h3>
                  <p className="text-sm text-neutral-600 text-center mb-6">{status.nctr} NCTR Required</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                      <span className="text-sm text-neutral-600">Earnings Multiplier</span>
                      <span className="text-sm">{status.multiplier}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-4 group-hover:bg-violet-50 group-hover:border-violet-300 transition-colors">
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl tracking-tight mb-4">Featured Rewards</h2>
            <p className="text-neutral-600">Digital experiences, subscriptions, and exclusive access</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Ian Carroll Twitch Subscription',
                level: 1,
                claims: 1,
                image: 'streaming subscription',
              },
              {
                title: 'GA Ticket to Gary Clark Jr',
                level: 2,
                claims: 5,
                image: 'concert music',
              },
              {
                title: '2 GA Tickets to Gary Clark Jr',
                level: 2,
                claims: 10,
                image: 'live music concert',
              },
              {
                title: '15-Minute Cameo with Bill Murray',
                level: 2,
                claims: 20,
                image: 'video call celebrity',
              },
            ].map((reward, idx) => (
              <RewardPreviewCard key={idx} {...reward} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button onClick={onViewRewards} size="lg" variant="outline">
              View All Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Alliance Brands */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl tracking-tight mb-4">Alliance Brands</h2>
          <p className="text-neutral-600 mb-12">
            Alliance brands sponsor tokens via Beacon and wholesale buys, powering the rewards ecosystem.
          </p>
          
          <div className="flex items-center justify-center gap-8 flex-wrap mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-32 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Users className="w-12 h-12 text-neutral-300" />
              </div>
            ))}
          </div>

          <Button size="lg" variant="outline">
            Sponsor Crescendo Alliance
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl tracking-tight">Crescendo Alliance</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-sm text-neutral-500">Powered by NCTR on Base</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface RewardPreviewCardProps {
  title: string;
  level: number;
  claims: number;
  image: string;
}

function RewardPreviewCard({ title, level, claims, image }: RewardPreviewCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all border border-neutral-200 hover:border-neutral-300 bg-white">
      <div className="relative h-48 bg-neutral-900 overflow-hidden">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop`}
          alt={title}
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs">
            Level {level}
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-sm">{title}</h3>
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
          <span className="text-xs text-neutral-600">{claims} {claims === 1 ? 'claim' : 'claims'}</span>
          <Button size="sm" variant="ghost" className="text-neutral-900 hover:text-neutral-700 text-xs">
            View →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}