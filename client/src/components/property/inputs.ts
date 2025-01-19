export interface Photo {
  url: string;
  publicId: string;
}

export interface Inputs {
  title: string;
  description: string;
  extraInfo: string;
  price: number;
  maxGuests: number;
  location: string;
  photos?: Photo[];
}
