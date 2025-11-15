import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Ticket, ChevronLeft, ChevronRight, Clock, Package, Star } from 'lucide-react';

interface HeroCarouselProps {
  rewards: any[];
  onClaimClick: (reward: any) => void;
  canAfford: (cost: number) => boolean;
  userBalance: number;
  typeConfig: any;
}

export function HeroCarousel({ rewards, onClaimClick, canAfford, userBalance, typeConfig }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || rewards.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rewards.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [isAutoPlaying, rewards.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rewards.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rewards.length) % rewards.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (rewards.length === 0) return null;

  const currentReward = rewards[currentSlide];
  const TypeIcon = typeConfig[currentReward.type]?.icon;

  return (
    <div className="relative w-full mb-10 group">
      {/* Hero Card */}
      <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
        {/* Background Image */}
        {currentReward.imageUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentReward.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-10">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm px-4 py-1.5 gap-2">
                <Star className="w-4 h-4" />
                Hero Featured
              </Badge>
              {currentReward.expiresIn && (
                <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentReward.expiresIn}
                </Badge>
              )}
              {TypeIcon && (
                <Badge className="bg-white/90 text-neutral-800 text-sm px-3 py-1">
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {typeConfig[currentReward.type]?.label}
                </Badge>
              )}
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl sm:text-5xl tracking-tight text-white mb-4 drop-shadow-lg">
              {currentReward.title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 line-clamp-2 drop-shadow">
              {currentReward.description}
            </p>

            {/* Contributor */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarFallback className="bg-violet-600 text-white">
                  {currentReward.contributor[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-white/70">Featured by</p>
                <p className="text-white font-medium">{currentReward.contributor}</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
              <div className="flex items-center gap-2 text-white">
                <Ticket className="w-5 h-5 text-violet-300" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">{currentReward.claimPassCost}</p>
                  <p className="text-xs text-white/70">Claim{currentReward.claimPassCost > 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <div className="w-px h-10 bg-white/30" />

              <div className="flex items-center gap-2 text-white">
                <Package className="w-5 h-5 text-violet-300" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{currentReward.remainingSupply}</p>
                  <p className="text-xs text-white/70">Available</p>
                </div>
              </div>

              <div className="w-px h-10 bg-white/30" />

              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-violet-300" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{currentReward.deliveryTime}</p>
                  <p className="text-xs text-white/70">Delivery</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => onClaimClick(currentReward)}
              disabled={!canAfford(currentReward.claimPassCost) || currentReward.remainingSupply === 0}
              className="text-lg px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentReward.remainingSupply === 0 ? (
                'Out of Stock'
              ) : !canAfford(currentReward.claimPassCost) ? (
                `Need ${currentReward.claimPassCost - userBalance} More Claim${currentReward.claimPassCost - userBalance > 1 ? 's' : ''}`
              ) : (
                'Claim This Reward →'
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {rewards.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Dots Navigation */}
      {rewards.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {rewards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-violet-600' 
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}