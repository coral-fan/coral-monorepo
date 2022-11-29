export type OffsetPercentages = [number, number];

export type NullableString = string | null;

export interface Photo {
  src: string;
  offsetPercentages: OffsetPercentages;
  scale: number;
}

export interface SocialHandles {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  spotify?: string;
  tiktok?: string;
  soundcloud?: string;
  discogs?: string;
  youtube?: string;
}
