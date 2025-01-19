export interface Property {
  _id: string;
  owner: {
    username: string;
    email: string;
    _id: string;
  };
  title: string;
  description: string;
  extraInfo: string;
  price: string;
  maxGuests: number;
  location: string;
  photos: { _id: string; url: string; publicId: string }[];
}

export interface PropertyContextType {
  properties: Property[];
  fetchProperties: () => Promise<void>;
  fetchPropertiesByOwner: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  createProperty: (property: any) => Promise<void>;
  updateProperty: (id: string, property: Property) => Promise<void>;
}
