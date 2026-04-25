export type Niche =
  | 'all-inclusive'
  | 'wellness'
  | 'family'
  | 'adults-only'
  | 'eco'
  | 'outdoor'
  | 'cool-climate'
  | 'remote-luxury';

export interface Resort {
  id: string;
  name: string;
  slug: string;
  destinationName: string;
  countryCode: string;
  starRating: number;
  boardBasisOptions: string[];
  adultsOnly: boolean;
  familyFriendly: boolean;
  wellnessTags: string[];
  sustainabilityTags: string[];
  adventureTags: string[];
  privacyTags: string[];
  amenities: string[];
  images: string[];
  description: string;
  editorialSummary: string;
  rankingSignals: Record<string, number>;
  niches: Niche[];
}

export interface RateQuote {
  id: string;
  resortId: string;
  liteApiOfferId: string;
  mealPlan: string;
  cancellationPolicy: string;
  currency: string;
  totalAmount: number;
  taxesAmount: number;
  includedItemsJson: string[];
  refundable: boolean;
}

export interface SearchResult {
  resort: Resort;
  rate: RateQuote;
  score: number;
  explanation: {
    reasons: string[];
    signals: Record<string, number>;
  };
}
