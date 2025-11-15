import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, ExternalLink, Sparkles, TrendingUp, DollarSign, Lock, Plus } from 'lucide-react';

interface ExternalEarnPageProps {
  onBack: () => void;
  isAdmin?: boolean;
  onManageLinks?: () => void;
}

interface EarnOpportunity {
  id: number;
  title: string;
  description: string;
  platform: string;
  estimatedEarnings: string;
  link: string;
  category: 'survey' | 'crypto' | 'rewards' | 'cashback' | 'other';
  featured?: boolean;
  logo?: string;
}

const EARN_OPPORTUNITIES: EarnOpportunity[] = [
  {
    id: 1,
    title: 'Complete Surveys on Swagbucks',
    description: 'Take surveys and earn points that can be converted to cash or gift cards',
    platform: 'Swagbucks',
    estimatedEarnings: '$5-50/day',
    link: 'https://www.swagbucks.com',
    category: 'survey',
    featured: true,
  },
  {
    id: 2,
    title: 'Earn Crypto on Coinbase',
    description: 'Learn about crypto and earn tokens by watching videos and completing quizzes',
    platform: 'Coinbase Learn & Earn',
    estimatedEarnings: '$30-50 one-time',
    link: 'https://www.coinbase.com/earn',
    category: 'crypto',
    featured: true,
  },
  {
    id: 3,
    title: 'Cashback on Rakuten',
    description: 'Shop at your favorite stores and earn cashback on every purchase',
    platform: 'Rakuten',
    estimatedEarnings: '1-15% cashback',
    link: 'https://www.rakuten.com',
    category: 'cashback',
  },
  {
    id: 4,
    title: 'Survey Junkie Rewards',
    description: 'Share your opinion through surveys and get paid in cash or gift cards',
    platform: 'Survey Junkie',
    estimatedEarnings: '$2-10/survey',
    link: 'https://www.surveyjunkie.com',
    category: 'survey',
  },
  {
    id: 5,
    title: 'Binance Learn & Earn',
    description: 'Complete educational courses about blockchain and earn cryptocurrency',
    platform: 'Binance',
    estimatedEarnings: '$5-20 per course',
    link: 'https://www.binance.com/en/learn-and-earn',
    category: 'crypto',
  },
  {
    id: 6,
    title: 'Honey Shopping Assistant',
    description: 'Automatically apply coupons and earn rewards while shopping online',
    platform: 'Honey',
    estimatedEarnings: 'Varies by store',
    link: 'https://www.joinhoney.com',
    category: 'cashback',
  },
  {
    id: 7,
    title: 'InboxDollars Tasks',
    description: 'Get paid for reading emails, taking surveys, and watching videos',
    platform: 'InboxDollars',
    estimatedEarnings: '$3-20/day',
    link: 'https://www.inboxdollars.com',
    category: 'rewards',
  },
  {
    id: 8,
    title: 'Fetch Rewards Scanning',
    description: 'Scan grocery receipts and earn points redeemable for gift cards',
    platform: 'Fetch Rewards',
    estimatedEarnings: 'Points per receipt',
    link: 'https://www.fetchrewards.com',
    category: 'rewards',
  },
];

const CATEGORY_COLORS = {
  survey: 'bg-blue-100 text-blue-700 border-blue-200',
  crypto: 'bg-purple-100 text-purple-700 border-purple-200',
  rewards: 'bg-green-100 text-green-700 border-green-200',
  cashback: 'bg-amber-100 text-amber-700 border-amber-200',
  other: 'bg-neutral-100 text-neutral-700 border-neutral-200',
};

export function ExternalEarnPage({ onBack, isAdmin = false, onManageLinks }: ExternalEarnPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredOpportunities = selectedCategory === 'all' 
    ? EARN_OPPORTUNITIES 
    : EARN_OPPORTUNITIES.filter(opp => opp.category === selectedCategory);

  const featuredOpportunities = EARN_OPPORTUNITIES.filter(opp => opp.featured);

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
                <h1 className="text-2xl">Earn NCTR</h1>
                <p className="text-sm text-neutral-600">Discover ways to earn rewards outside the platform</p>
              </div>
            </div>
            {isAdmin && onManageLinks && (
              <Button
                onClick={onManageLinks}
                className="gap-2 bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="w-4 h-4" />
                Manage Links
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2">Earn More NCTR Through Partners</h2>
                <p className="text-sm text-neutral-600 mb-4">
                  These partner opportunities let you earn real money and rewards through surveys, cashback, crypto education, and more. 
                  Convert your earnings and purchase NCTR to level up your Crescendo status!
                </p>
                <div className="flex gap-3">
                  <Badge className="bg-green-500 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Multiple earning methods
                  </Badge>
                  <Badge className="bg-blue-500 text-white">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Real cash rewards
                  </Badge>
                  <Badge className="bg-purple-500 text-white">
                    <Lock className="w-3 h-3 mr-1" />
                    Trusted partners
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Opportunities */}
        {featuredOpportunities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4">Featured Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-amber-500 text-white">Featured</Badge>
                          <Badge variant="outline" className={CATEGORY_COLORS[opportunity.category]}>
                            {opportunity.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-1">{opportunity.title}</CardTitle>
                        <CardDescription className="text-sm">{opportunity.platform}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-neutral-600">{opportunity.description}</p>
                    
                    <div className="p-3 bg-white rounded-lg border border-amber-200">
                      <p className="text-xs text-neutral-600 mb-1">Estimated Earnings</p>
                      <p className="text-lg text-amber-700">{opportunity.estimatedEarnings}</p>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                    >
                      <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Visit {opportunity.platform}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-xl mb-4">All Opportunities</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'survey' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('survey')}
              size="sm"
            >
              Surveys
            </Button>
            <Button
              variant={selectedCategory === 'crypto' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('crypto')}
              size="sm"
            >
              Crypto
            </Button>
            <Button
              variant={selectedCategory === 'rewards' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('rewards')}
              size="sm"
            >
              Rewards
            </Button>
            <Button
              variant={selectedCategory === 'cashback' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('cashback')}
              size="sm"
            >
              Cashback
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow border-neutral-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={CATEGORY_COLORS[opportunity.category]}>
                      {opportunity.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription className="text-sm">{opportunity.platform}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-neutral-600 line-clamp-2">{opportunity.description}</p>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-600 mb-1">Estimated Earnings</p>
                    <p className="text-sm">{opportunity.estimatedEarnings}</p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-violet-300 hover:bg-violet-50"
                  >
                    <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Use Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="mb-2">How to Use External Earn Opportunities</h3>
                <ol className="text-sm text-neutral-600 space-y-1 list-decimal list-inside">
                  <li>Click on any opportunity to visit the partner site</li>
                  <li>Sign up and complete tasks to earn real money or crypto</li>
                  <li>Once you've earned, return to Crescendo and purchase NCTR</li>
                  <li>Your purchased NCTR is automatically added to your 360LOCK account</li>
                  <li>Level up your status and unlock more Crescendo rewards!</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
