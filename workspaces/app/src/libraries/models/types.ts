export type OffsetPercentages = [number, number];

export type NullableString = string | null;

export interface Photo {
  src: string;
  offsetPercentages: OffsetPercentages;
  scale: number;
}

export interface SocialHandles {
  facebook: NullableString;
  twitter: NullableString;
  instagram: NullableString;
  spotify: NullableString;
  tiktok: NullableString;
  soundcloud: NullableString;
  discogs: NullableString;
}
