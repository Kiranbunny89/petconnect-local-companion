// localStorage utilities for PetConnect
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  healthInfo: string;
  description: string;
  image: string;
  sellerContact: string;
  ownerId: string;
  createdAt: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | null;
}

// Storage keys
const STORAGE_KEYS = {
  USERS: 'petconnect_users',
  PETS: 'petconnect_pets',
  AUTH: 'petconnect_auth',
} as const;

// Initialize default data
export const initializeDefaultData = () => {
  // Add sample pets if none exist
  const pets = getPets();
  if (pets.length === 0) {
    const samplePets: Pet[] = [
      {
        id: '1',
        name: 'Buddy',
        breed: 'Golden Retriever',
        age: '2 years',
        gender: 'Male',
        healthInfo: 'Vaccinated, healthy, very active',
        description: 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He\'s great with kids and other dogs.',
        image: '/src/assets/pet-1.jpg',
        sellerContact: 'john@example.com | (555) 123-4567',
        ownerId: 'demo-user',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Whiskers',
        breed: 'Tabby Cat',
        age: '3 years',
        gender: 'Female',
        healthInfo: 'Spayed, all shots up to date',
        description: 'Whiskers is a calm and affectionate cat who loves to curl up on your lap. She\'s perfect for apartment living.',
        image: '/src/assets/pet-2.jpg',
        sellerContact: 'sarah@example.com | (555) 234-5678',
        ownerId: 'demo-user-2',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Max',
        breed: 'Border Collie',
        age: '1 year',
        gender: 'Male',
        healthInfo: 'Young, healthy, high energy',
        description: 'Max is an intelligent and trainable Border Collie puppy. He needs an active family who can keep up with his energy.',
        image: '/src/assets/pet-3.jpg',
        sellerContact: 'mike@example.com | (555) 345-6789',
        ownerId: 'demo-user-3',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(samplePets));
  }
};

// User management
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

// Pet management
export const getPets = (): Pet[] => {
  const pets = localStorage.getItem(STORAGE_KEYS.PETS);
  return pets ? JSON.parse(pets) : [];
};

export const savePet = (pet: Pet): void => {
  const pets = getPets();
  pets.push(pet);
  localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
};

export const getPetsByOwner = (ownerId: string): Pet[] => {
  const pets = getPets();
  return pets.filter(pet => pet.ownerId === ownerId);
};

export const getPetById = (id: string): Pet | null => {
  const pets = getPets();
  return pets.find(pet => pet.id === id) || null;
};

// Authentication
export const getAuthState = (): AuthState => {
  const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
  return auth ? JSON.parse(auth) : { isLoggedIn: false, currentUser: null };
};

export const setAuthState = (authState: AuthState): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authState));
};

export const login = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    setAuthState({ isLoggedIn: true, currentUser: user });
    return user;
  }
  return null;
};

export const logout = (): void => {
  setAuthState({ isLoggedIn: false, currentUser: null });
};

export const register = (name: string, email: string, password: string): User | null => {
  // Check if user already exists
  if (findUserByEmail(email)) {
    return null;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  saveUser(newUser);
  setAuthState({ isLoggedIn: true, currentUser: newUser });
  return newUser;
};

// Utility functions
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};