import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Lock, TrendingUp, Gift, Tag, Trophy, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LevelDetailPageProps {
  level: number;
  onBack: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToBrands?: () => void;
}

const LEVEL_DATA = [
  {
    level: 1,
    name: 'BRONZE',
    nctr: '1.00K',
    multiplier: '1.1x',
    color: 'from-amber-600 to-orange-700',
    description: 'Start your rewards journey with Bronze status and unlock exclusive digital experiences',
    perks: [
      '1.1x earnings multiplier on all activities',
      '1 reward claim per year',
      '5% discount on alliance partner brands',
      'Access to bronze-tier reward catalog',
      'Priority customer support',
      'Member-only community access',
    ],
    rewards: [
      {
        title: 'Ian Carroll Twitch Subscription',
        claims: 1,
        type: 'Subscription',
        sponsor: 'Ian Carroll',
        description: '1-month premium Twitch subscription with exclusive emotes and badge.',
        imageUrl: 'https://images.unsplash.com/photo-1639342405971-a428b16b0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBnYW1pbmd8ZW58MXx8fHwxNzYzMTM4ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Spotify Premium (3 Months)',
        claims: 1,
        type: 'Subscription',
        sponsor: 'Spotify',
        description: '3 months of ad-free music streaming with offline downloads.',
        imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZ3xlbnwxfHx8fDE3NjMxMzg5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Digital Magazine Bundle',
        claims: 1,
        type: 'Subscription',
        sponsor: 'Multiple Publishers',
        description: 'Access to 5 digital magazine subscriptions of your choice.',
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFnYXppbmV8ZW58MXx8fHwxNzYzMTM4OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    level: 2,
    name: 'SILVER',
    nctr: '2.50K',
    multiplier: '1.25x',
    color: 'from-slate-400 to-gray-500',
    description: 'Elevate your experience with Silver status and unlock premium rewards and quarterly claims',
    perks: [
      '1.25x earnings multiplier on all activities',
      '4 reward claims per year (quarterly)',
      '10% discount on alliance partner brands',
      'Access to premium silver-tier reward catalog',
      'Early access to new rewards',
      'Priority event notifications',
    ],
    rewards: [
      {
        title: 'GA Ticket to Gary Clark Jr',
        claims: 5,
        type: 'Ticket',
        sponsor: 'Gary Clark Jr',
        description: 'General admission digital ticket to upcoming Gary Clark Jr concert.',
        imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: '2 GA Tickets to Gary Clark Jr',
        claims: 10,
        type: 'Ticket',
        sponsor: 'Gary Clark Jr',
        description: '2 general admission digital tickets to upcoming Gary Clark Jr concert.',
        imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: '15-Minute Cameo with Bill Murray',
        claims: 20,
        type: 'Experience',
        sponsor: 'Bill Murray',
        description: 'Private 15-minute video call with Bill Murray.',
        imageUrl: 'https://images.unsplash.com/photo-1762330469789-cab18158504f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Vic2NyaXB0aW9ufGVufDF8fHx8MTc2MzEzODkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Netflix Premium (6 Months)',
        claims: 8,
        type: 'Subscription',
        sponsor: 'Netflix',
        description: '6 months of Netflix Premium with 4K streaming.',
        imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjB0dnxlbnwxfHx8fDE3NjMxMzg5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    level: 3,
    name: 'GOLD',
    nctr: '5.00K',
    multiplier: '1.4x',
    color: 'from-yellow-400 to-amber-500',
    description: 'Achieve Gold status and enjoy monthly claims with exclusive premium rewards',
    perks: [
      '1.4x earnings multiplier on all activities',
      '1 reward claim per month (12 per year)',
      '15% discount on alliance partner brands',
      'Access to exclusive gold-tier reward catalog',
      'VIP event invitations',
      'Dedicated account manager',
    ],
    rewards: [
      {
        title: 'X Premium Subscription (1 Year)',
        claims: 25,
        type: 'Subscription',
        sponsor: 'X Corp',
        description: 'Full year of X Premium with verification and extended posts.',
        imageUrl: 'https://images.unsplash.com/photo-1762330469789-cab18158504f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Vic2NyaXB0aW9ufGVufDF8fHx8MTc2MzEzODkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'VIP Discord Access + NFT',
        claims: 30,
        type: 'Access',
        sponsor: 'Crescendo Alliance',
        description: 'Exclusive access to VIP Discord channels and commemorative NFT badge.',
        imageUrl: 'https://images.unsplash.com/photo-1639342405971-a428b16b0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBnYW1pbmd8ZW58MXx8fHwxNzYzMTM4ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Exclusive Meet & Greet Experience',
        claims: 35,
        type: 'Experience',
        sponsor: 'Various Artists',
        description: 'VIP meet and greet with select artists and creators.',
        imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWV0JTIwZ3JlZXR8ZW58MXx8fHwxNzYzMTM4OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    level: 4,
    name: 'PLATINUM',
    nctr: '10.00K',
    multiplier: '1.5x',
    color: 'from-cyan-400 to-blue-500',
    description: 'Reach Platinum status with bi-monthly claims and premium exclusive benefits',
    perks: [
      '1.5x earnings multiplier on all activities',
      '2 reward claims per month (24 per year)',
      '20% discount on alliance partner brands',
      'Access to platinum-tier exclusive rewards',
      'Exclusive platinum-only experiences',
      'Governance voting rights',
      'Custom reward requests',
    ],
    rewards: [
      {
        title: 'Private Chef Experience',
        claims: 50,
        type: 'Experience',
        sponsor: 'Culinary Partners',
        description: 'Private chef dinner experience for 4 people.',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwY2hlZnxlbnwxfHx8fDE3NjMxMzg5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Luxury Hotel Weekend',
        claims: 60,
        type: 'Experience',
        sponsor: 'Hospitality Partners',
        description: '2-night stay at luxury hotel with breakfast included.',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjMxMzg5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'VIP Sports Event Package',
        claims: 75,
        type: 'Ticket',
        sponsor: 'Sports Partners',
        description: 'VIP box seats and hospitality at major sporting event.',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtfGVufDF8fHx8MTc2MzEzODkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
  {
    level: 5,
    name: 'DIAMOND',
    nctr: '25.00K',
    multiplier: '2x',
    color: 'from-violet-400 to-purple-600',
    description: 'The pinnacle of membership with maximum benefits, 2x earnings, and unlimited access',
    perks: [
      '2.0x earnings multiplier on all activities',
      '5 reward claims per month (60 per year)',
      '25% discount on alliance partner brands',
      'Unlimited access to all rewards',
      'Exclusive diamond-only experiences',
      'Full governance voting rights',
      'Priority custom reward requests',
      'Direct access to leadership team',
    ],
    rewards: [
      {
        title: 'Private Jet Experience',
        claims: 100,
        type: 'Experience',
        sponsor: 'Aviation Partners',
        description: 'Private jet charter for regional flight (up to 4 hours).',
        imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwamV0fGVufDF8fHx8MTc2MzEzODkwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Exclusive Event Access',
        claims: 125,
        type: 'Experience',
        sponsor: 'Event Partners',
        description: 'Backstage access and VIP treatment at exclusive events.',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNsdXNpdmUlMjBldmVudHxlbnwxfHx8fDE3NjMxMzg5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Luxury Vacation Package',
        claims: 150,
        type: 'Experience',
        sponsor: 'Travel Partners',
        description: '7-night luxury vacation package to destination of choice.',
        imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbnxlbnwxfHx8fDE3NjMxMzg5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        title: 'Custom Experience Creation',
        claims: 200,
        type: 'Experience',
        sponsor: 'Crescendo Alliance',
        description: 'Work with our team to create your dream custom experience.',
        imageUrl: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBleHBlcmllbmNlfGVufDF8fHx8MTc2MzEzODkxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  },
];

export function LevelDetailPage({ level, onBack, onNavigateToRewards, onNavigateToBrands }: LevelDetailPageProps) {
  const levelData = LEVEL_DATA.find(l => l.level === level);

  if (!levelData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Level not found</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Status Levels
          </Button>

          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 bg-gradient-to-br ${levelData.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-3xl text-white">{levelData.level}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl tracking-tight">{levelData.name}</h1>
                <Badge className="bg-violet-100 text-violet-900 border-violet-300">
                  Level {levelData.level}
                </Badge>
              </div>
              <p className="text-lg text-neutral-600 mb-3">{levelData.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{levelData.nctr} NCTR Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{levelData.multiplier} Earnings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Benefits Section */}
        <Card className={`mb-10 border-2 bg-gradient-to-br ${levelData.color.replace('from-', 'from-').replace('to-', 'to-')}/10 border-neutral-200`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-600" />
              {levelData.name} Status Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {levelData.perks.map((perk, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{perk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Available Rewards</h2>
              <p className="text-sm text-neutral-600">Exclusive rewards you can claim at {levelData.name} level</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levelData.rewards.map((reward, index) => (
              <Card key={index} className="border-2 border-neutral-200 hover:border-violet-200 hover:shadow-lg transition-all overflow-hidden group">
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/95 backdrop-blur-sm text-neutral-900 border-neutral-300">
                      {reward.claims} claims
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-base leading-tight flex-1">{reward.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{reward.type}</Badge>
                    <span className="text-xs text-neutral-600">by {reward.sponsor}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 mb-4">{reward.description}</p>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700" size="sm">
                    Claim Reward
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-violet-600 to-indigo-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl mb-2">Ready to unlock {levelData.name}?</h3>
            <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
              Commit {levelData.nctr} NCTR tokens to 360LOCK and gain access to all {levelData.name} benefits, 
              rewards, and exclusive experiences.
            </p>
            <Button size="lg" className="bg-white text-violet-600 hover:bg-neutral-100">
              Commit Tokens to 360LOCK
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}