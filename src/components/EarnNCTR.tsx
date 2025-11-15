import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Sparkles, TrendingUp, CheckCircle2, ExternalLink, Users, Share2, Calendar, Zap, Store, Trophy, Gift } from 'lucide-react';

interface EarnNCTRProps {
  isAuthenticated: boolean;
  onBack: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToStatus?: () => void;
  onNavigateToBrands?: () => void;
}

interface EarnOpportunity {
  id: number;
  title: string;
  description: string;
  reward: number;
  category: 'daily' | 'social' | 'referral' | 'challenge' | 'partner';
  isCompleted?: boolean;
  link?: string;
  icon: string;
  recurring?: string;
}

const mockOpportunities: EarnOpportunity[] = [
  {
    id: 1,
    title: 'Daily Check-In',
    description: 'Visit the platform daily and claim your check-in reward',
    reward: 10,
    category: 'daily',
    icon: 'calendar',
    recurring: 'Daily',
  },
  {
    id: 2,
    title: 'Follow on X (Twitter)',
    description: 'Follow @CrescendoAlliance on X and verify your account',
    reward: 50,
    category: 'social',
    icon: 'share',
    link: 'https://x.com',
  },
  {
    id: 3,
    title: 'Join Discord Community',
    description: 'Join our Discord server and verify your membership',
    reward: 50,
    category: 'social',
    icon: 'users',
    link: 'https://discord.com',
  },
  {
    id: 4,
    title: 'Refer a Friend',
    description: 'You and your friend both earn 500 NCTR when they sign up using your referral link',
    reward: 500,
    category: 'referral',
    icon: 'share',
    recurring: 'Per referral',
  },
  {
    id: 5,
    title: 'Share on Social Media',
    description: 'Share Crescendo Alliance on your social media platforms',
    reward: 25,
    category: 'social',
    icon: 'share',
    recurring: 'Weekly',
  },
  {
    id: 6,
    title: 'Complete Profile',
    description: 'Fill out your complete member profile with avatar and bio',
    reward: 75,
    category: 'challenge',
    icon: 'zap',
  },
  {
    id: 7,
    title: 'Attend Virtual Event',
    description: 'Join our monthly community virtual events',
    reward: 150,
    category: 'challenge',
    icon: 'calendar',
    recurring: 'Monthly',
  },
  {
    id: 8,
    title: 'Partner Purchase: Gary Clark Jr Merch',
    description: 'Purchase official merchandise from alliance partners',
    reward: 200,
    category: 'partner',
    icon: 'zap',
    link: 'https://example.com',
  },
  {
    id: 9,
    title: 'Stream on Twitch',
    description: 'Watch partner streams and earn NCTR for engagement',
    reward: 30,
    category: 'partner',
    icon: 'zap',
    recurring: 'Per hour',
  },
];

export function EarnNCTR({ isAuthenticated, onBack, onNavigateToRewards, onNavigateToStatus, onNavigateToBrands }: EarnNCTRProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { value: 'daily', label: 'Daily Tasks', icon: Calendar },
    { value: 'social', label: 'Social', icon: Share2 },
    { value: 'referral', label: 'Referrals', icon: Users },
    { value: 'challenge', label: 'Challenges', icon: Zap },
    { value: 'partner', label: 'Partners', icon: Sparkles },
  ];

  const filteredOpportunities = selectedCategory
    ? mockOpportunities.filter(o => o.category === selectedCategory)
    : mockOpportunities;

  const totalAvailable = mockOpportunities.reduce((sum, opp) => sum + opp.reward, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl tracking-tight leading-none">Crescendo</span>
                <span className="text-xs text-neutral-600 leading-none">Rewards Alliance</span>
              </div>
            </div>
          </div>
          
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
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl tracking-tight mb-3">Earn NCTR</h1>
          <p className="text-lg text-neutral-600">
            Complete tasks and engage with the community to grow your balance
          </p>
        </div>

        {/* Category Filter - Pill Style */}
        <div className="mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <EarnCard
              key={opportunity.id}
              opportunity={opportunity}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600">No opportunities found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface EarnCardProps {
  opportunity: EarnOpportunity;
  isAuthenticated: boolean;
}

function EarnCard({ opportunity, isAuthenticated }: EarnCardProps) {
  const [completed, setCompleted] = useState(opportunity.isCompleted || false);

  const handleClaim = () => {
    setCompleted(true);
  };

  const getIcon = () => {
    switch (opportunity.icon) {
      case 'calendar':
        return <Calendar className="w-8 h-8 text-neutral-700" />;
      case 'share':
        return <Share2 className="w-8 h-8 text-neutral-700" />;
      case 'users':
        return <Users className="w-8 h-8 text-neutral-700" />;
      case 'zap':
        return <Zap className="w-8 h-8 text-neutral-700" />;
      default:
        return <Sparkles className="w-8 h-8 text-neutral-700" />;
    }
  };

  return (
    <Card className={`relative overflow-hidden bg-white border transition-all ${
      completed 
        ? 'border-neutral-200 opacity-60' 
        : 'border-neutral-200 hover:shadow-md hover:border-neutral-300'
    }`}>
      <CardContent className="p-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center">
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg mb-2">{opportunity.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {opportunity.description}
          </p>
        </div>

        {/* Reward */}
        <div className="mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-neutral-900">+{opportunity.reward}</span>
            <span className="text-sm text-neutral-600">NCTR</span>
          </div>
          {opportunity.recurring && (
            <p className="text-xs text-neutral-500 mt-1">{opportunity.recurring}</p>
          )}
        </div>

        {/* Action */}
        {!completed ? (
          isAuthenticated ? (
            opportunity.link ? (
              <Button
                onClick={() => window.open(opportunity.link, '_blank')}
                variant="outline"
                className="w-full border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                Start
              </Button>
            ) : (
              <Button 
                onClick={handleClaim} 
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                Claim
              </Button>
            )
          ) : (
            <Button variant="outline" disabled className="w-full">
              Sign in to claim
            </Button>
          )
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-neutral-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}