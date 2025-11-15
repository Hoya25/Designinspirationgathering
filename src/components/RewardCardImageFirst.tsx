import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Ticket, Gift, Lock, Clock, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarketplaceReward {
  id: number;
  title: string;
  contributor: string;
  description: string;
  type: 'access-code' | 'discount-code' | 'ticket-code' | 'promo-code' | 'subscription' | 'token' | 'nft' | 'gift-card';
  claimPassCost: number;
  expiresIn?: string;
  totalSupply: number;
  remainingSupply: number;
  trending?: boolean;
  featured?: boolean;
  recentlyAdded?: boolean;
  redemptionDetails: string;
  deliveryTime: string;
  imageUrl?: string;
}

interface RewardCardProps {
  reward: MarketplaceReward;
  onClaim: (reward: MarketplaceReward) => void;
  canAfford: boolean;
  userBalance: number;
  typeConfig: {
    icon: any;
    label: string;
    color: string;
  };
}

export function RewardCardImageFirst({ 
  reward, 
  onClaim, 
  canAfford,
  userBalance,
  typeConfig
}: RewardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const TypeIcon = typeConfig.icon;
  const supplyPercentage = (reward.remainingSupply / reward.totalSupply) * 100;
  const lowSupply = supplyPercentage < 20;
  const outOfStock = reward.remainingSupply === 0;
  const passesNeeded = reward.claimPassCost - userBalance;

  return (
    <Card 
      className={`border-2 transition-all duration-300 overflow-hidden ${
        outOfStock 
          ? 'border-neutral-200 opacity-50' 
          : isHovered && canAfford 
          ? 'border-violet-400 shadow-xl scale-[1.02] -translate-y-1' 
          : canAfford
          ? 'border-neutral-200 hover:border-violet-200'
          : 'border-neutral-200 opacity-75'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hero Image Section - Primary Focus */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        {reward.imageUrl ? (
          <ImageWithFallback 
            src={reward.imageUrl}
            alt={reward.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100">
            <TypeIcon className="w-16 h-16 text-violet-300" />
          </div>
        )}
        
        {/* Floating Badges on Image */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className={`px-3 py-1.5 rounded-lg ${typeConfig.color} backdrop-blur-sm bg-opacity-95 flex items-center gap-1.5 shadow-lg`}>
            <TypeIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{typeConfig.label}</span>
          </div>
          
          <div className="flex flex-col gap-1.5 items-end">
            {reward.featured && (
              <Badge className="bg-violet-600 text-white text-xs px-2 py-1 shadow-lg">
                ⭐ Featured
              </Badge>
            )}
            {reward.trending && (
              <Badge className="bg-amber-500 text-white text-xs px-2 py-1 shadow-lg">
                🔥 Trending
              </Badge>
            )}
            {reward.recentlyAdded && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 shadow-lg">
                ✨ New
              </Badge>
            )}
          </div>
        </div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Claim Pass Cost - Prominent on Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <Ticket className="w-5 h-5 text-violet-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {reward.claimPassCost}
          </span>
          <span className="text-xs text-neutral-600">Claim{reward.claimPassCost > 1 ? 's' : ''}</span>
        </div>

        {/* Supply Warning Indicator */}
        {lowSupply && !outOfStock && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
            ⚠️ Limited Supply
          </div>
        )}
        {outOfStock && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-neutral-700 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section - Secondary to Image */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg mb-1.5 line-clamp-2">{reward.title}</CardTitle>
        
        {/* Contributor - Compact */}
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-xs bg-violet-100 text-violet-600">{reward.contributor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-neutral-500">by {reward.contributor}</span>
        </div>

        {/* Description - Smaller, Secondary */}
        <p className="text-xs text-neutral-500 line-clamp-2">{reward.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        {/* Compact Info Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-600">
            <Package className="w-3.5 h-3.5" />
            <span>{reward.remainingSupply}/{reward.totalSupply} left</span>
          </div>
          
          {reward.expiresIn && !outOfStock && (
            <div className="flex items-center gap-1.5 text-amber-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{reward.expiresIn}</span>
            </div>
          )}
        </div>

        {/* Supply Progress Bar - Compact */}
        <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all ${
              outOfStock ? 'bg-neutral-300' : lowSupply ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${supplyPercentage}%` }}
          />
        </div>

        {/* Claim Button - Prominent */}
        <Button 
          onClick={() => onClaim(reward)}
          className={`w-full gap-2 transition-all ${
            outOfStock
              ? 'bg-neutral-300 cursor-not-allowed'
              : canAfford 
              ? 'bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg' 
              : 'bg-neutral-300 cursor-not-allowed'
          }`}
          disabled={!canAfford || outOfStock}
        >
          {outOfStock ? (
            <>
              <Lock className="w-4 h-4" />
              Out of Stock
            </>
          ) : !canAfford ? (
            <>
              <Lock className="w-4 h-4" />
              Need {passesNeeded} more
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              Claim Reward
            </>
          )}
        </Button>

        {/* Hover Details Preview - Only for Affordable Items */}
        {isHovered && canAfford && !outOfStock && (
          <div className="pt-2 border-t border-neutral-200 text-xs text-neutral-500 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3 h-3" />
              <span className="font-medium">Delivery: {reward.deliveryTime}</span>
            </div>
            <p className="line-clamp-2 text-neutral-400">{reward.redemptionDetails}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}