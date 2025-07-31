import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Share2, Calendar, Info, Phone, Mail, MapPin } from 'lucide-react';
import { getPetById, formatDate } from '@/utils/storage';
import type { Pet } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface PetDetailsPageProps {
  onNavigate: (path: string) => void;
}

export const PetDetailsPage: React.FC<PetDetailsPageProps> = ({ onNavigate }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get pet ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');
    
    if (petId) {
      const foundPet = getPetById(petId);
      setPet(foundPet);
    }
    setIsLoading(false);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400?text=Pet+Photo';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pet?.name} - PetConnect`,
        text: `Check out ${pet?.name}, a ${pet?.breed} looking for a new home!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Pet listing link copied to clipboard.",
      });
    }
  };

  const handleContact = () => {
    toast({
      title: "Contact Information",
      description: "Contact details are shown below. Please reach out directly to the seller.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Pet Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The pet you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="hero" onClick={() => onNavigate('/pets')}>
            View All Pets
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('/pets')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Pets
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pet Image */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  onError={handleImageError}
                />
              </Card>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="hero"
                  onClick={handleContact}
                  className="flex-1 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Contact Seller
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Pet Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {pet.name}
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium">
                      {pet.breed}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {pet.gender}
                  </Badge>
                </div>

                {/* Quick Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{pet.age}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    <span>Listed {formatDate(pet.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  About {pet.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pet.description}
                </p>
              </Card>

              {/* Health Information */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Health Information
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pet.healthInfo}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700">
                    Health status verified by owner
                  </span>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 bg-gradient-accent border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Get in Touch</p>
                      <p className="text-sm text-muted-foreground">
                        {pet.sellerContact}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800 mb-1">
                          Safety Reminder
                        </p>
                        <p className="text-xs text-amber-700">
                          Always meet in a safe, public location. Verify the pet's health 
                          and ask for vaccination records before finalizing any adoption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional Info */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Pet Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium text-foreground">{pet.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium text-foreground">{pet.breed}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <p className="font-medium text-foreground">{pet.age}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <p className="font-medium text-foreground">{pet.gender}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Listed on:</span>
                    <p className="font-medium text-foreground">{formatDate(pet.createdAt)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};