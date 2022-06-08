export interface EventGuestList {
  userIds: string[];
}

export type EventGuestLists = Record<string, EventGuestList | undefined>;
