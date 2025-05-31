export interface SoundCategory {
  id: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  created_at: string;
}

export interface Sound {
  id: string;
  title: string;
  description: string | null;
  category_id: string;
  sound_url: string;
  frequency_type: string | null; // 'binaural', 'solfeggio', 'ambient'
  frequency_value: number | null; // actual frequency in Hz if applicable
  duration: number; // in seconds
  created_at: string;
  is_premium: boolean;
}

export interface NatureSound {
  id: string;
  title: string;
  description: string | null;
  sound_url: string;
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  duration: number | null; // in seconds
  sound_ids: string[];
}

export interface MoodJournalEntry {
  id: string;
  user_id: string;
  mood_rating: number; // e.g., 1-10 scale
  notes: string | null;
  created_at: string;
  session_id: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string | null;
}