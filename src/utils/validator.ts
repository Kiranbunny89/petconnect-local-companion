// Pet listing validator chatbot for PetConnect
export interface ValidationResult {
  isValid: boolean;
  messages: string[];
  suggestions: string[];
}

export interface PetFormData {
  name: string;
  breed: string;
  age: string;
  gender: string;
  healthInfo: string;
  description: string;
  image: string;
  sellerContact: string;
}

export class PetValidator {
  private static instance: PetValidator;
  
  static getInstance(): PetValidator {
    if (!PetValidator.instance) {
      PetValidator.instance = new PetValidator();
    }
    return PetValidator.instance;
  }

  validate(formData: PetFormData): ValidationResult {
    const messages: string[] = [];
    const suggestions: string[] = [];
    let isValid = true;

    // Required fields validation
    const requiredFields = [
      { field: 'name', label: 'Pet Name' },
      { field: 'breed', label: 'Breed' },
      { field: 'age', label: 'Age' },
      { field: 'gender', label: 'Gender' },
      { field: 'healthInfo', label: 'Health Information' },
      { field: 'description', label: 'Description' },
      { field: 'sellerContact', label: 'Contact Information' },
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field as keyof PetFormData]?.trim()) {
        isValid = false;
        messages.push(`🚫 ${label} is required`);
      }
    }

    // Image validation
    if (!formData.image) {
      isValid = false;
      messages.push('🚫 Pet photo is required');
      suggestions.push('📸 Upload a clear, recent photo of your pet');
    }

    // Specific field validations
    if (formData.name && formData.name.trim().length < 2) {
      isValid = false;
      messages.push('🚫 Pet name should be at least 2 characters long');
    }

    if (formData.breed && formData.breed.trim().length < 3) {
      isValid = false;
      messages.push('🚫 Please provide a valid breed name');
      suggestions.push('🐕 Examples: Labrador Retriever, Persian Cat, Mixed Breed');
    }

    if (formData.age && !this.isValidAge(formData.age)) {
      isValid = false;
      messages.push('🚫 Please provide a valid age format');
      suggestions.push('⏰ Examples: "2 years", "6 months", "1 year old"');
    }

    if (formData.description && formData.description.trim().length < 20) {
      isValid = false;
      messages.push('🚫 Description should be at least 20 characters');
      suggestions.push('📝 Tell us about your pet\'s personality, habits, and what makes them special!');
    }

    if (formData.healthInfo && formData.healthInfo.trim().length < 10) {
      isValid = false;
      messages.push('🚫 Health information should be more detailed');
      suggestions.push('🏥 Include vaccination status, any medical conditions, and general health');
    }

    if (formData.sellerContact && !this.isValidContact(formData.sellerContact)) {
      isValid = false;
      messages.push('🚫 Please provide valid contact information');
      suggestions.push('📞 Include email and/or phone number for interested buyers');
    }

    // Success validation
    if (isValid) {
      messages.push('✅ Great! Your pet listing looks perfect!');
      messages.push('🎉 All information is complete and ready for publication');
    }

    // Add helpful suggestions
    if (isValid) {
      suggestions.push('💡 Consider adding details about your pet\'s favorite activities');
      suggestions.push('🏠 Mention if your pet is good with kids or other animals');
    }

    return { isValid, messages, suggestions };
  }

  private isValidAge(age: string): boolean {
    const agePattern = /^\d+\s*(year|years|month|months|yr|yrs|mo|mos)(\s*old)?$/i;
    return agePattern.test(age.trim());
  }

  private isValidContact(contact: string): boolean {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phonePattern = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    return emailPattern.test(contact) || phonePattern.test(contact);
  }

  getChatbotResponse(result: ValidationResult): string[] {
    const responses: string[] = [];
    
    if (result.isValid) {
      responses.push('🤖 Wonderful! Your pet listing has passed all our checks!');
      responses.push('🌟 Your furry friend is ready to find their perfect match!');
    } else {
      responses.push('🤖 Hi there! I\'ve reviewed your pet listing and found a few things we can improve:');
      responses.push('');
      responses.push(...result.messages);
      
      if (result.suggestions.length > 0) {
        responses.push('');
        responses.push('💡 Here are some helpful suggestions:');
        responses.push(...result.suggestions);
      }
    }

    return responses;
  }
}

export const petValidator = PetValidator.getInstance();