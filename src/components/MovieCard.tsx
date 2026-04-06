import { Movie } from '../types';
import { motion } from 'motion/react';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  featured?: boolean;
}

export const MovieCard = ({ movie, onClick, featured = false }: MovieCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={() => onClick(movie)}
      className={`
        relative cursor-pointer group
        ${featured ? 'w-full aspect-[16/9]' : 'w-full aspect-[2/3]'}
      `}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <img
          src={featured ? movie.backdrop : movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex flex-wrap gap-2 mb-2">
          {movie.genre.slice(0, 2).map(g => (
            <span key={g} className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-surface-container-highest/80 rounded-sm text-secondary">
              {g}
            </span>
          ))}
        </div>
        <h3 className={`font-display font-extrabold leading-tight ${featured ? 'text-4xl' : 'text-xl'}`}>
          {movie.title}
        </h3>
        {featured && (
          <p className="text-on-surface-variant text-sm mt-2 line-clamp-2 max-w-xl">
            {movie.synopsis}
          </p>
        )}
      </div>
    </motion.div>
  );
};
