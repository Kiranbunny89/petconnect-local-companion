import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PetCard } from '@/components/PetCard';
import { Search, Filter, Heart, SortAsc, Grid, List } from 'lucide-react';
import { getPets } from '@/utils/storage';
import type { Pet } from '@/utils/storage';

interface AllPetsPageProps {
  onNavigate: (path: string) => void;
}

export const AllPetsPage: React.FC<AllPetsPageProps> = ({ onNavigate }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const allPets = getPets();
    setPets(allPets);
    setFilteredPets(allPets);
  }, []);

  useEffect(() => {
    let filtered = pets.filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = selectedBreed === '' || pet.breed.toLowerCase().includes(selectedBreed.toLowerCase());
      const matchesGender = selectedGender === '' || pet.gender === selectedGender;
      
      return matchesSearch && matchesBreed && matchesGender;
    });

    // Sort pets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'breed':
          return a.breed.localeCompare(b.breed);
        default:
          return 0;
      }
    });

    setFilteredPets(filtered);
  }, [pets, searchTerm, selectedBreed, selectedGender, sortBy]);

  const handleViewPetDetails = (petId: string) => {
    onNavigate(`/pet-details?id=${petId}`);
  };

  const uniqueBreeds = Array.from(new Set(pets.map(pet => pet.breed))).sort();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                All Pets
              </h1>
              <p className="text-muted-foreground">
                Discover amazing pets looking for their forever homes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredPets.length} pets found
              </span>
              <div className="flex border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'hero' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'hero' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search pets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>

              {/* Breed Filter */}
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="px-3 py-2 bg-background/50 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Breeds</option>
                {uniqueBreeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>

              {/* Gender Filter */}
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="px-3 py-2 bg-background/50 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-background/50 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="breed">Breed A-Z</option>
              </select>
            </div>
          </Card>
        </div>

        {/* Pets Grid/List */}
        {filteredPets.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetails={handleViewPetDetails}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-card border-border/50">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Pets Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {pets.length === 0 
                ? "No pets have been listed yet. Be the first to add a pet!"
                : "No pets match your current filters. Try adjusting your search criteria."
              }
            </p>
            {pets.length === 0 && (
              <Button
                variant="hero"
                onClick={() => onNavigate('/add-pet')}
                className="flex items-center gap-2 mx-auto"
              >
                Add First Pet
              </Button>
            )}
          </Card>
        )}

        {/* Load More (Future Enhancement) */}
        {filteredPets.length > 0 && filteredPets.length >= 9 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Pets
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};