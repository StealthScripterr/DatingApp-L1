export interface DogDetails {
  id: string;
  age: number;
  gender: string;
  breed: string;
  color: string;
  description: string;
  displayName: string;
  profileImageUrl?: string | null;
  createdAt: string;
  lastActiveAt: string;
  city: string;
  country: string;
  photos: Photo[];
}

export interface Photo {
  id: number;
  url?: string | null;
  publicId?: string | null;
  dogDetailsId: string;
}