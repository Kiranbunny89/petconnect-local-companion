import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PetCard } from '@/components/PetCard';
import { User, Mail, Plus, Heart, Calendar, Settings } from 'lucide-react';
import { getAuthState, getPetsByOwner, formatDate } from '@/utils/storage';
import type { Pet } from '@/utils/storage';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const { currentUser } = getAuthState();

  useEffect(() => {
    if (currentUser) {
      const pets = getPetsByOwner(currentUser.id);
      setUserPets(pets);
    }
  }, [currentUser]);

  const handleViewPetDetails = (petId: string) => {
    onNavigate(`/pet-details?id=${petId}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your profile.
          </p>
          <Button variant="hero" onClick={() => onNavigate('/login')}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="p-8 bg-gradient-card border-border/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-warm">
                <User className="w-12 h-12 text-white" />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentUser.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Mail className="w-4 h-4" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(currentUser.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="hero"
                  onClick={() => onNavigate('/add-pet')}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Pet
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{userPets.length}</h3>
                <p className="text-sm text-muted-foreground">Pets Listed</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">24</h3>
                <p className="text-sm text-muted-foreground">Profile Views</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">5</h3>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
            </div>
          </Card>
        </div>

        {/* My Pets Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">My Pets</h2>
              <p className="text-muted-foreground">
                Manage your pet listings and track their status
              </p>
            </div>
            <Button
              variant="hero"
              onClick={() => onNavigate('/add-pet')}
              className="hidden sm:flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Pet
            </Button>
          </div>

          {userPets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onViewDetails={handleViewPetDetails}
                  showOwnerInfo={true}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-gradient-card border-border/50">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Pets Listed Yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start by adding your first pet to connect with potential adopters 
                and find them loving homes.
              </p>
              <Button
                variant="hero"
                onClick={() => onNavigate('/add-pet')}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add Your First Pet
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};