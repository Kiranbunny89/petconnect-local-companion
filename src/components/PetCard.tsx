import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Calendar, Info } from 'lucide-react';
import { Pet } from '@/utils/storage';

interface PetCardProps {
  pet: Pet;
  onViewDetails: (petId: string) => void;
  showOwnerInfo?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ 
  pet, 
  onViewDetails, 
  showOwnerInfo = false 
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x400?text=Pet+Photo';
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border/50 hover:shadow-warm hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      <div onClick={() => onViewDetails(pet.id)}>
        {/* Pet Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Heart Icon Overlay */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Pet Information */}
        <div className="p-4 space-y-3">
          {/* Name and Basic Info */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {pet.name}
              </h3>
              <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {pet.gender}
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {pet.breed}
            </p>
          </div>

          {/* Age and Health */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{pet.age}</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {pet.description}
          </p>

          {/* Health Status Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Healthy</span>
            </div>
          </div>

          {/* Contact Info (if showOwnerInfo) */}
          {showOwnerInfo && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Contact: {pet.sellerContact}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <Button
          variant="pet"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(pet.id);
          }}
        >
          <Info className="w-4 h-4" />
          View Details
        </Button>
      </div>
    </Card>
  );
};