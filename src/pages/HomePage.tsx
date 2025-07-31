import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PetCard } from '@/components/PetCard';
import { Heart, Shield, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { getPets, getAuthState, initializeDefaultData } from '@/utils/storage';
import type { Pet } from '@/utils/storage';
import heroImage from '@/assets/hero-pets.jpg';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);
  const { isLoggedIn } = getAuthState();

  useEffect(() => {
    initializeDefaultData();
    const pets = getPets();
    setFeaturedPets(pets.slice(0, 3));
  }, []);

  const handleViewPets = () => {
    if (isLoggedIn) {
      onNavigate('/pets');
    } else {
      onNavigate('/login');
    }
  };

  const handleViewPetDetails = (petId: string) => {
    if (isLoggedIn) {
      onNavigate(`/pet-details?id=${petId}`);
    } else {
      onNavigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Happy pets in loving homes"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by 10,000+ Pet Lovers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Furry Friend
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Connect with loving pets looking for their forever homes. 
              Discover cats, dogs, and more from trusted sellers in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                onClick={handleViewPets}
                className="bg-white text-primary hover:bg-white/90 hover:shadow-2xl"
              >
                <Heart className="w-5 h-5" />
                Browse Pets
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/register')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Join PetConnect
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose PetConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make pet adoption safe, simple, and joyful for everyone involved.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Safe & Secure</h3>
              <p className="text-muted-foreground">
                All pet listings are verified and sellers are required to provide accurate information about their pets' health and history.
              </p>
            </Card>

            <Card className="p-8 text-center bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Trusted Community</h3>
              <p className="text-muted-foreground">
                Join thousands of pet lovers who have successfully found their perfect companions through our platform.
              </p>
            </Card>

            <Card className="p-8 text-center bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Easy to Use</h3>
              <p className="text-muted-foreground">
                Our intuitive platform makes it simple to browse pets, contact sellers, and find your new best friend.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Pets
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet some of the amazing pets looking for their forever homes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetails={handleViewPetDetails}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="hero"
              size="lg"
              onClick={handleViewPets}
              className="shadow-warm"
            >
              <Heart className="w-5 h-5" />
              See All Pets
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Rules */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Platform Guidelines
              </h2>
              <p className="text-xl text-muted-foreground">
                Ensuring a safe and trustworthy experience for all
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">For Sellers</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Provide accurate and complete pet information</li>
                      <li>• Include recent, clear photos of your pet</li>
                      <li>• Share honest health and behavioral details</li>
                      <li>• Respond promptly to interested buyers</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">For Buyers</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Meet pets in person before committing</li>
                      <li>• Ask detailed questions about health and care</li>
                      <li>• Verify seller contact information</li>
                      <li>• Ensure you're ready for pet ownership</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="mt-8 p-6 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-amber-700">
                    PetConnect serves as a platform to connect pet sellers and buyers. We are not responsible 
                    for the transactions, pet health verification, or any agreements made between parties. 
                    All communication and transactions occur outside our platform. Please exercise due diligence 
                    when adopting or purchasing pets.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};