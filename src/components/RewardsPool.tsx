import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Gift, Trophy, ArrowLeft, Check, Users, Calendar, ExternalLink, Store, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CrescendoLogo } from "./CrescendoLogo";
import { RewardDetailModal } from "./RewardDetailModal";

interface RewardsPoolProps {
  isAuthenticated: boolean;
  walletConnected: boolean;
  onBack: () => void;
  onConnectWallet: () => void;
  onNavigateToStatus?: () => void;
  onNavigateToBrands?: () => void;
}

interface Reward {
  id: number;
  title: string;
  claims: number;
  type: string;
  sponsor: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  tokenAmount?: number;
  tokenSymbol?: string;
  tokenLogo?: string;
}

const mockRewards: Reward[] = [
  // Alliance Tokens (Low claim token rewards)
  {
    id: 101,
    title: '500 ETH Tokens',
    claims: 3,
    type: 'Alliance Tokens',
    sponsor: 'Ethereum Foundation',
    description: 'Receive 500 ETH tokens directly to your connected wallet. Instantly claimable and transferable on Base network.',
    imageUrl: 'https://images.unsplash.com/photo-1707075891530-30f9b3a6577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRva2Vuc3xlbnwxfHx8fDE3NjMxNTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    tokenAmount: 500,
    tokenSymbol: 'ETH',
    tokenLogo: '⟠',
  },
  {
    id: 102,
    title: '1,000 USDC Stablecoin',
    claims: 7,
    type: 'Alliance Tokens',
    sponsor: 'Circle',
    description: 'Get 1,000 USDC stablecoin pegged 1:1 with USD. Perfect for stable value storage or DeFi opportunities on Base.',
    imageUrl: 'https://images.unsplash.com/photo-1707075891530-30f9b3a6577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRva2Vuc3xlbnwxfHx8fDE3NjMxNTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tokenAmount: 1000,
    tokenSymbol: 'USDC',
    tokenLogo: '💵',
  },
  {
    id: 103,
    title: '2,500 OP Tokens',
    claims: 15,
    type: 'Alliance Tokens',
    sponsor: 'Optimism Collective',
    description: 'Claim 2,500 OP tokens from the Optimism ecosystem. Participate in governance and earn rewards across Layer 2.',
    imageUrl: 'https://images.unsplash.com/photo-1707075891530-30f9b3a6577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRva2Vuc3xlbnwxfHx8fDE3NjMxNTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    tokenAmount: 2500,
    tokenSymbol: 'OP',
    tokenLogo: '🔴',
  },
  {
    id: 104,
    title: '5,000 ARB Tokens',
    claims: 35,
    type: 'Alliance Tokens',
    sponsor: 'Arbitrum Foundation',
    description: 'Receive 5,000 ARB tokens from Arbitrum. Unlock governance rights and participate in the fastest growing L2 ecosystem.',
    imageUrl: 'https://images.unsplash.com/photo-1707075891530-30f9b3a6577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRva2Vuc3xlbnwxfHx8fDE3NjMxNTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tokenAmount: 5000,
    tokenSymbol: 'ARB',
    tokenLogo: '🔵',
  },
  {
    id: 105,
    title: '10,000 BASE Tokens',
    claims: 50,
    type: 'Alliance Tokens',
    sponsor: 'Base Network',
    description: 'Exclusive BASE token allocation of 10,000 tokens. Early supporter reward for Crescendo members building on Base.',
    imageUrl: 'https://images.unsplash.com/photo-1707075891530-30f9b3a6577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRva2Vuc3xlbnwxfHx8fDE3NjMxNTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    tokenAmount: 10000,
    tokenSymbol: 'BASE',
    tokenLogo: '🔷',
  },
  
  // Low Claim Rewards (1-5 claims)
  {
    id: 1,
    title: 'Premium Twitch Subscription',
    claims: 1,
    type: 'Subscription',
    sponsor: 'Ian Carroll',
    description: 'One month of premium Twitch subscription access with exclusive emotes, badges, and ad-free viewing. Instantly delivered to your account.',
    imageUrl: 'https://images.unsplash.com/photo-1639342405971-a428b16b0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBnYW1pbmd8ZW58MXx8fHwxNzYzMTM4ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: '20% Off Base Ecosystem Merch',
    claims: 1,
    type: 'Deal',
    sponsor: 'Base',
    description: 'Exclusive discount code for official Base merchandise including apparel, accessories, and collectibles. Valid for 90 days.',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjaCUyMGZhc2hpb258ZW58MHx8fHwxNzMxNTkzMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Digital Art Collection NFT',
    claims: 2,
    type: 'Access',
    sponsor: 'Crescendo Artists',
    description: 'Limited edition digital art NFT from emerging Web3 artists. Includes commercial usage rights and access to exclusive artist community.',
    imageUrl: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZnQlMjBkaWdpdGFsJTIwYXJ0fGVufDB8fHx8MTczMTU5MzI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Gary Clark Jr. Concert Experience',
    claims: 5,
    type: 'Ticket',
    sponsor: 'Gary Clark Jr.',
    description: 'General admission digital ticket to an upcoming Gary Clark Jr. live performance. Includes access to exclusive pre-show content and digital memorabilia.',
    imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  
  // Medium Claim Rewards (6-20 claims)
  {
    id: 5,
    title: 'Spotify Premium - 6 Months',
    claims: 8,
    type: 'Subscription',
    sponsor: 'Spotify',
    description: 'Six months of Spotify Premium with ad-free listening, offline downloads, and high-quality audio streaming across all devices.',
    imageUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZ3xlbnwwfHx8fDE3MzE1OTMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'VIP Concert Package - Double Pass',
    claims: 10,
    type: 'Ticket',
    sponsor: 'Gary Clark Jr.',
    description: 'Two general admission tickets to Gary Clark Jr. concert plus exclusive digital photo opportunities and backstage content access.',
    imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    title: 'Web3 Developer Workshop Access',
    claims: 12,
    type: 'Opportunity',
    sponsor: 'Base Builders',
    description: 'Virtual access to exclusive Web3 development workshops featuring industry experts. Includes certificate of completion and networking opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRlY2h8ZW58MHx8fHwxNzMxNTkzMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    title: 'Professional Headshot Session',
    claims: 18,
    type: 'Experience',
    sponsor: 'Portrait Studios',
    description: 'Virtual professional headshot session with expert guidance, digital retouching, and high-resolution files. Perfect for Web3 profiles and professional branding.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3MzE1OTMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    title: 'Private Virtual Meet & Greet',
    claims: 20,
    type: 'Experience',
    sponsor: 'Bill Murray',
    description: 'Exclusive 15-minute private video call with Bill Murray. Perfect for personal messages, Q&A, or casual conversation. Scheduled at your convenience.',
    imageUrl: 'https://images.unsplash.com/photo-1762330469789-cab18158504f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Vic2NyaXB0aW9ufGVufDF8fHx8MTc2MzEzODkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  
  // High Claim Rewards (21-50 claims)
  {
    id: 10,
    title: 'X Premium - Annual Subscription',
    claims: 25,
    type: 'Subscription',
    sponsor: 'X Corp',
    description: 'Full year of X Premium featuring verified checkmark, extended character limits, ad-free browsing, and priority customer support.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8fDE3MzE1OTMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 11,
    title: 'Exclusive DAO Governance Access',
    claims: 30,
    type: 'Access',
    sponsor: 'Crescendo Alliance',
    description: 'VIP access to Crescendo DAO governance channels, private Discord community, and commemorative governance NFT badge. Includes voting rights on platform decisions.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG8lMjBjb21tdW5pdHl8ZW58MHx8fHwxNzMxNTkzMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 12,
    title: 'Masterclass All-Access Annual Pass',
    claims: 45,
    type: 'Subscription',
    sponsor: 'Masterclass',
    description: 'One year unlimited access to Masterclass platform featuring courses from industry leaders in business, creativity, and technology. Includes downloadable resources.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZ3xlbnwwfHx8fDE3MzE1OTMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 13,
    title: 'VIP Festival Weekend Pass',
    claims: 50,
    type: 'Ticket',
    sponsor: 'Major Music Festivals',
    description: 'All-access digital pass to premium music festival featuring exclusive artist livestreams, behind-the-scenes content, and limited edition NFT collectibles.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsfGVufDB8fHx8MTczMTU5MzI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  
  // Premium Claim Rewards (50+ claims)
  {
    id: 14,
    title: 'Private Mentor Session with Web3 Leader',
    claims: 60,
    type: 'Opportunity',
    sponsor: 'Base Leadership',
    description: 'One-on-one 60-minute mentorship session with a Web3 industry leader. Perfect for career guidance, project feedback, or strategic advice.',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjBtZWV0aW5nfGVufDB8fHx8MTczMTU5MzI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 15,
    title: 'Luxury Travel Experience Package',
    claims: 75,
    type: 'Experience',
    sponsor: 'Elite Travel Partners',
    description: 'Curated luxury travel package with concierge services, exclusive accommodations, and unique local experiences. Redeemable at select destinations worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWx8ZW58MHx8fHwxNzMxNTkzMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 16,
    title: 'Founders Circle Membership',
    claims: 100,
    type: 'Access',
    sponsor: 'Crescendo Alliance',
    description: 'Lifetime membership to exclusive Founders Circle with early access to new features, direct input on platform development, and special recognition NFT.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNsdXNpdmUlMjBjbHVifGVufDB8fHx8MTczMTU5MzI4MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function RewardsPool({ isAuthenticated, walletConnected, onBack, onConnectWallet, onNavigateToStatus, onNavigateToBrands }: RewardsPoolProps) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sort rewards by claim amount (low to high)
  const sortedRewards = [...mockRewards].sort((a, b) => a.claims - b.claims);
  const featuredRewards = mockRewards.filter(r => r.featured);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredRewards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredRewards.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredRewards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredRewards.length) % featuredRewards.length);
  };

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
            <Button 
              variant="outline" 
              className="gap-2 border-violet-200 hover:bg-violet-50"
            >
              <Gift className="w-4 h-4 text-violet-600" />
              Rewards
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl tracking-tight mb-2">Rewards and Benefits</h1>
          <p className="text-lg text-neutral-600">Opportunities, Experiences, Subscriptions, Exclusive Access and Deals</p>
        </div>

        {/* Featured Rewards Carousel */}
        <div className="mb-12 -mx-6 md:mx-0">
          <div className="flex items-center justify-between mb-4 px-6 md:px-0">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl tracking-tight">Featured Rewards</h2>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] group">
            {featuredRewards.map((reward, index) => (
              <div 
                key={reward.id} 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div 
                  className="relative w-full h-full bg-neutral-900 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedReward(reward)}
                >
                  <ImageWithFallback
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <Badge className="bg-white/20 backdrop-blur-sm border-white/40 text-white px-3 py-1">
                          <Star className="w-3 h-3 mr-1 inline" />
                          Featured
                        </Badge>
                        <Badge className="bg-white/20 backdrop-blur-sm border-white/40 text-white px-3 py-1">
                          {reward.type}
                        </Badge>
                      </div>
                      <h3 className="text-3xl md:text-5xl mb-4">{reward.title}</h3>
                      <p className="text-lg md:text-xl text-neutral-200 mb-6 line-clamp-2">{reward.description}</p>
                      <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Sponsored by</p>
                          <p className="text-lg">{reward.sponsor}</p>
                        </div>
                        <div className="h-8 w-px bg-white/20 hidden md:block" />
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Claims Required</p>
                          <p className="text-lg">{reward.claims}</p>
                        </div>
                        <Button 
                          className="md:ml-auto bg-white text-neutral-900 hover:bg-neutral-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReward(reward);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button
              className="absolute left-4 md:left-6 top-1/3 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <button
              className="absolute right-4 md:right-6 top-1/3 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {featuredRewards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRewards.map((reward) => (
            <Card
              key={reward.id}
              className="overflow-hidden group hover:shadow-md transition-all border border-neutral-200 hover:border-neutral-300 cursor-pointer bg-white"
              onClick={() => setSelectedReward(reward)}
            >
              <div className="relative h-56 bg-neutral-900 overflow-hidden">
                <ImageWithFallback
                  src={reward.imageUrl}
                  alt={reward.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                {reward.tokenLogo && (
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white/50">
                    {reward.tokenLogo}
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <span className="text-xs text-neutral-600">{reward.type}</span>
                </div>
                <h3 className="text-lg mb-3 line-clamp-2 min-h-[3.5rem]">{reward.title}</h3>
                {reward.tokenAmount && reward.tokenSymbol && (
                  <div className="mb-3 p-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg border border-violet-200">
                    <p className="text-xs text-violet-600 mb-1">Token Amount</p>
                    <p className="text-xl">
                      {reward.tokenAmount.toLocaleString()} {reward.tokenSymbol}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Claims required</p>
                    <p className="text-lg">{reward.claims}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReward(reward);
                    }}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedRewards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600">No rewards found for this level.</p>
          </div>
        )}
      </div>

      {/* Reward Detail Modal */}
      {selectedReward && (
        <RewardDetailModal
          reward={selectedReward}
          isAuthenticated={isAuthenticated}
          walletConnected={walletConnected}
          userLevel={2}
          userClaims={3}
          onClose={() => setSelectedReward(null)}
          onConnectWallet={onConnectWallet}
        />
      )}
    </div>
  );
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