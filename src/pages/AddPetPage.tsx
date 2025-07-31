import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Camera, Bot, CheckCircle, AlertCircle, X } from 'lucide-react';
import { getAuthState, savePet, generateId } from '@/utils/storage';
import { petValidator } from '@/utils/validator';
import type { PetFormData } from '@/utils/validator';
import { useToast } from '@/hooks/use-toast';

interface AddPetPageProps {
  onNavigate: (path: string) => void;
}

export const AddPetPage: React.FC<AddPetPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    breed: '',
    age: '',
    gender: '',
    healthInfo: '',
    description: '',
    image: '',
    sellerContact: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; messages: string[]; suggestions: string[] } | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { currentUser } = getAuthState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateListing = () => {
    const result = petValidator.validate(formData);
    setValidationResult(result);
    setShowChatbot(true);
    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add a pet listing.",
        variant: "destructive",
      });
      return;
    }

    const isValid = validateListing();
    
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newPet = {
        id: generateId(),
        name: formData.name.trim(),
        breed: formData.breed.trim(),
        age: formData.age.trim(),
        gender: formData.gender as 'Male' | 'Female',
        healthInfo: formData.healthInfo.trim(),
        description: formData.description.trim(),
        image: formData.image,
        sellerContact: formData.sellerContact.trim(),
        ownerId: currentUser.id,
        createdAt: new Date().toISOString(),
      };

      savePet(newPet);

      toast({
        title: "Pet Listed Successfully!",
        description: `${newPet.name} has been added to your listings.`,
      });

      onNavigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pet listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Authentication Required
          </h2>
          <p className="text-muted-foreground mb-6">
            Please log in to add a pet listing.
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Add Your Pet
            </h1>
            <p className="text-muted-foreground">
              Create a listing to help your pet find a loving new home
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-gradient-card border-border/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pet Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Pet Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Buddy, Whiskers, Max"
                      className="bg-background/50"
                      required
                    />
                  </div>

                  {/* Breed and Age */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="breed" className="text-foreground font-medium">
                        Breed *
                      </Label>
                      <Input
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        placeholder="e.g., Golden Retriever, Persian Cat"
                        className="bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-foreground font-medium">
                        Age *
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="e.g., 2 years, 6 months"
                        className="bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-foreground font-medium">
                      Gender *
                    </Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background/50 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Health Information */}
                  <div className="space-y-2">
                    <Label htmlFor="healthInfo" className="text-foreground font-medium">
                      Health Information *
                    </Label>
                    <Textarea
                      id="healthInfo"
                      name="healthInfo"
                      value={formData.healthInfo}
                      onChange={handleInputChange}
                      placeholder="Vaccination status, medical conditions, recent vet visits..."
                      rows={3}
                      className="bg-background/50"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground font-medium">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your pet's personality, habits, favorite activities..."
                      rows={4}
                      className="bg-background/50"
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <Label htmlFor="sellerContact" className="text-foreground font-medium">
                      Contact Information *
                    </Label>
                    <Input
                      id="sellerContact"
                      name="sellerContact"
                      value={formData.sellerContact}
                      onChange={handleInputChange}
                      placeholder="Email and/or phone number for interested buyers"
                      className="bg-background/50"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Pet Photo *
                    </Label>
                    <div className="space-y-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Pet preview"
                            className="w-full h-64 object-cover rounded-xl border border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            Click to upload a photo of your pet
                          </p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG or JPEG (Max 5MB)
                          </p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={validateListing}
                      className="flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      Validate with AI
                    </Button>
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Publishing...
                        </div>
                      ) : (
                        'Publish Pet Listing'
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Chatbot Validator */}
            <div className="lg:col-span-1">
              <Card className={`p-6 border-border/50 transition-all duration-300 ${
                showChatbot ? 'bg-gradient-card' : 'bg-muted/20'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Validator</h3>
                    <p className="text-sm text-muted-foreground">
                      Listing quality checker
                    </p>
                  </div>
                </div>

                {showChatbot && validationResult ? (
                  <div className="space-y-4">
                    <Alert className={validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}>
                      <div className="flex items-center gap-2">
                        {validationResult.isValid ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        )}
                        <span className={`font-medium ${validationResult.isValid ? 'text-green-800' : 'text-amber-800'}`}>
                          {validationResult.isValid ? 'Ready to Publish!' : 'Needs Improvement'}
                        </span>
                      </div>
                    </Alert>

                    <div className="space-y-3">
                      {petValidator.getChatbotResponse(validationResult).map((message, index) => (
                        <div key={index} className="text-sm">
                          {message.includes('🤖') ? (
                            <p className="font-medium text-foreground">{message}</p>
                          ) : message.includes('💡') || message.includes('Here are some helpful suggestions:') ? (
                            <p className="font-medium text-primary mt-3">{message}</p>
                          ) : message.trim() === '' ? (
                            <div className="h-2" />
                          ) : (
                            <p className="text-muted-foreground ml-4">{message}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm mb-4">
                      Click "Validate with AI" to check your listing quality
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={validateListing}
                      className="flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      Start Validation
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};