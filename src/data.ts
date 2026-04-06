import { Movie, Showtime, DateOption } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'NEON GENESIS',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop',
    rating: 'PG-13',
    duration: '2h 15m',
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    synopsis: 'In a future where light is the only currency, a group of rebels must steal the sun to save humanity from eternal darkness. A visually stunning journey into the heart of a neon-drenched dystopia.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Oscar Isaac'],
    releaseDate: '2024-05-15',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'THE SILENT VOID',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1920&auto=format&fit=crop',
    rating: 'R',
    duration: '1h 58m',
    genre: ['Thriller', 'Space', 'Drama'],
    synopsis: 'A lone astronaut stranded on a derelict space station discovers that silence is not the only thing haunting the corridors. A psychological thriller that pushes the boundaries of isolation.',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway'],
    releaseDate: '2024-06-01',
  },
  {
    id: '3',
    title: 'CYBERPUNK 2088',
    poster: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1920&auto=format&fit=crop',
    rating: 'MA',
    duration: '2h 45m',
    genre: ['Action', 'Cyberpunk', 'Crime'],
    synopsis: 'Night City is burning. A mercenary with a death wish takes on the biggest heist in history, only to find themselves at the center of a corporate war that could rewrite the soul of the city.',
    director: 'Ridley Scott',
    cast: ['Keanu Reeves', 'Ana de Armas'],
    releaseDate: '2024-06-20',
  },
  {
    id: '4',
    title: 'MIDNIGHT CHASE',
    poster: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1920&auto=format&fit=crop',
    rating: 'PG-13',
    duration: '1h 45m',
    genre: ['Action', 'Thriller'],
    synopsis: 'A high-stakes car chase through the neon-lit streets of Tokyo. One night, one car, and a secret that everyone wants to kill for.',
    director: 'Justin Lin',
    cast: ['Sung Kang', 'Gal Gadot'],
    releaseDate: '2024-07-10',
  }
];

export const SHOWTIMES: Showtime[] = [
  { id: 's1', time: '10:30 AM', type: 'Standard', price: 12 },
  { id: 's2', time: '01:45 PM', type: 'IMAX 3D', price: 22 },
  { id: 's3', time: '04:15 PM', type: '4DX', price: 25 },
  { id: 's4', time: '07:30 PM', type: 'IMAX 3D', price: 22 },
  { id: 's5', time: '10:15 PM', type: 'Standard', price: 12 },
];

export const DATES: DateOption[] = [
  { date: '15', day: 'MON', fullDate: 'May 15, 2024' },
  { date: '16', day: 'TUE', fullDate: 'May 16, 2024' },
  { date: '17', day: 'WED', fullDate: 'May 17, 2024' },
  { date: '18', day: 'THU', fullDate: 'May 18, 2024' },
  { date: '19', day: 'FRI', fullDate: 'May 19, 2024' },
  { date: '20', day: 'SAT', fullDate: 'May 20, 2024' },
];
