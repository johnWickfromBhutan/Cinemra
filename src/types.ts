export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: string;
  duration: string;
  genre: string[];
  synopsis: string;
  director: string;
  cast: string[];
  releaseDate: string;
  isFeatured?: boolean;
}

export interface Showtime {
  id: string;
  time: string;
  type: 'IMAX 3D' | '4DX' | 'Standard';
  price: number;
}

export interface DateOption {
  date: string;
  day: string;
  fullDate: string;
}
