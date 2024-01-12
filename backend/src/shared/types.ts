export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  adultCount: number;
  childCount: number;
  facility: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};
