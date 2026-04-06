import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  ChevronLeft, 
  Star, 
  Play, 
  Info,
  User,
  Home,
  Heart
} from 'lucide-react';
import { Movie, Showtime, DateOption } from './types';
import { MOVIES, SHOWTIMES, DATES } from './data';
import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';
import { SeatMap } from './components/SeatMap';

type Screen = 'home' | 'detail' | 'booking' | 'confirmation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateOption>(DATES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentScreen('detail');
    window.scrollTo(0, 0);
  };

  const handleBookNow = () => {
    setCurrentScreen('booking');
    window.scrollTo(0, 0);
  };

  const handleConfirmBooking = () => {
    setCurrentScreen('confirmation');
    window.scrollTo(0, 0);
  };

  const resetApp = () => {
    setCurrentScreen('home');
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="pb-32">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={MOVIES[0].backdrop} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-sm border border-primary/30">
                Featured Today
              </span>
              <div className="flex items-center gap-1 text-secondary">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">4.9</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-display font-extrabold leading-[0.9] mb-6 tracking-tighter">
              {MOVIES[0].title}
            </h1>
            
            <p className="text-on-surface-variant text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              {MOVIES[0].synopsis}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => handleMovieClick(MOVIES[0])} className="flex items-center gap-2">
                <Play size={20} fill="currentColor" />
                Watch Trailer
              </Button>
              <Button variant="glass" onClick={() => handleMovieClick(MOVIES[0])} className="flex items-center gap-2">
                <Info size={20} />
                View Details
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Now Playing */}
      <section className="container mx-auto px-6 -mt-20 relative z-10 max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Now Playing</h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>
          <button className="text-secondary text-sm font-bold hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MOVIES.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-6 mt-24 max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Coming Soon</h2>
            <div className="h-1 w-12 bg-secondary rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MovieCard movie={MOVIES[2]} onClick={handleMovieClick} featured />
          <MovieCard movie={MOVIES[1]} onClick={handleMovieClick} featured />
        </div>
      </section>
    </div>
  );

  const renderDetail = () => {
    if (!selectedMovie) return null;
    return (
      <div className="pb-32">
        <div className="relative h-[60vh] w-full">
          <img 
            src={selectedMovie.backdrop} 
            alt={selectedMovie.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          <button 
            onClick={resetApp}
            className="absolute top-8 left-8 p-3 bg-surface-container-high/60 backdrop-blur-md rounded-full text-on-surface hover:bg-primary hover:text-on-primary transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="container mx-auto px-6 -mt-32 relative z-10 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left: Poster */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full md:w-80 shrink-0"
            >
              <div className="rounded-3xl overflow-hidden ambient-shadow border-4 border-surface-container-highest">
                <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full" referrerPolicy="no-referrer" />
              </div>
            </motion.div>

            {/* Right: Info */}
            <div className="flex-1 pt-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {selectedMovie.genre.map(g => (
                  <span key={g} className="px-3 py-1 bg-surface-container-highest text-secondary text-xs font-bold rounded-full">
                    {g}
                  </span>
                ))}
                <div className="flex items-center gap-2 text-on-surface-variant text-sm border-l border-outline-variant/30 pl-4">
                  <Clock size={16} />
                  <span>{selectedMovie.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm border-l border-outline-variant/30 pl-4">
                  <Star size={16} className="text-secondary" fill="currentColor" />
                  <span>{selectedMovie.rating}</span>
                </div>
              </div>

              <h1 className="text-6xl font-display font-extrabold mb-8 tracking-tighter">
                {selectedMovie.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div className="md:col-span-2">
                  <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Synopsis</h3>
                  <p className="text-lg leading-relaxed text-on-surface/80">
                    {selectedMovie.synopsis}
                  </p>
                </div>
                <div>
                  <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Director</h3>
                  <p className="text-lg font-bold mb-6">{selectedMovie.director}</p>
                  
                  <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-4">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.cast.map(c => (
                      <span key={c} className="text-sm font-medium text-on-surface/70">{c}, </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleBookNow} className="w-full md:w-auto px-12 py-5 text-xl">
                Book Tickets Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBooking = () => {
    if (!selectedMovie) return null;
    return (
      <div className="pt-32 pb-32 container mx-auto px-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => setCurrentScreen('detail')} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-4xl font-display font-bold">Select Seats</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {/* Date Selection */}
            <div className="mb-12">
              <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-6">Select Date</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {DATES.map(d => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d)}
                    className={`
                      flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl transition-all duration-300
                      ${selectedDate.date === d.date ? 'bg-secondary text-on-secondary neon-glow-secondary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}
                    `}
                  >
                    <span className="text-[10px] font-bold mb-1">{d.day}</span>
                    <span className="text-2xl font-display font-extrabold">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showtime Selection */}
            <div className="mb-12">
              <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-6">Select Showtime</h3>
              <div className="flex flex-wrap gap-4">
                {SHOWTIMES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShowtime(s)}
                    className={`
                      px-6 py-4 rounded-xl transition-all duration-300 flex flex-col items-start
                      ${selectedShowtime?.id === s.id ? 'bg-primary text-on-primary neon-glow-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}
                    `}
                  >
                    <span className="text-lg font-bold">{s.time}</span>
                    <span className="text-[10px] font-bold opacity-70 tracking-wider uppercase">{s.type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Map */}
            <div className="bg-surface-container-low rounded-3xl p-8">
              <SeatMap onSeatSelect={setSelectedSeats} />
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-container-high rounded-3xl p-8 sticky top-32 ambient-shadow">
              <h2 className="text-2xl font-display font-bold mb-8">Summary</h2>
              
              <div className="flex gap-4 mb-8">
                <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-20 h-28 object-cover rounded-lg" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold mb-1">{selectedMovie.title}</h4>
                  <p className="text-xs text-on-surface-variant">{selectedMovie.genre.join(', ')}</p>
                  <p className="text-xs text-secondary mt-2 font-bold">{selectedMovie.rating}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 border-t border-outline-variant/20 pt-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant flex items-center gap-2"><Calendar size={14} /> Date</span>
                  <span className="font-bold">{selectedDate.fullDate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant flex items-center gap-2"><Clock size={14} /> Time</span>
                  <span className="font-bold">{selectedShowtime?.time || 'Not selected'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant flex items-center gap-2"><Ticket size={14} /> Seats</span>
                  <span className="font-bold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl font-display font-extrabold mb-8 pt-8 border-t border-outline-variant/20">
                <span>Total</span>
                <span className="text-secondary">${(selectedSeats.length * (selectedShowtime?.price || 0)).toFixed(2)}</span>
              </div>

              <Button 
                onClick={handleConfirmBooking} 
                disabled={!selectedShowtime || selectedSeats.length === 0}
                className="w-full py-4"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="pt-32 pb-32 container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] max-w-2xl text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 neon-glow-secondary"
      >
        <Ticket size={48} className="text-on-secondary" />
      </motion.div>
      
      <h1 className="text-5xl font-display font-extrabold mb-4">Booking Confirmed!</h1>
      <p className="text-on-surface-variant text-lg mb-12">
        Your tickets for <span className="text-on-surface font-bold">{selectedMovie?.title}</span> have been reserved. 
        A confirmation email has been sent to your registered address.
      </p>

      <div className="w-full bg-surface-container-high rounded-3xl p-8 mb-12 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl -ml-16 -ms-16" />
        
        <div className="grid grid-cols-2 gap-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Date</p>
            <p className="font-bold">{selectedDate.fullDate}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Time</p>
            <p className="font-bold">{selectedShowtime?.time}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Seats</p>
            <p className="font-bold">{selectedSeats.join(', ')}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Hall</p>
            <p className="font-bold">Cinema 04</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col items-center">
          <div className="w-full h-24 bg-on-surface/10 rounded-lg flex items-center justify-center mb-4">
            {/* Mock Barcode */}
            <div className="flex gap-1 h-12">
              {[...Array(40)].map((_, i) => (
                <div key={i} className={`w-1 bg-on-surface/40 ${Math.random() > 0.5 ? 'h-full' : 'h-2/3'}`} />
              ))}
            </div>
          </div>
          <p className="text-[10px] font-mono text-on-surface-variant">VN-9823-4412-0091</p>
        </div>
      </div>

      <Button onClick={resetApp} variant="outline" className="px-12">
        Back to Home
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-glow-primary rotate-12">
              <Play size={24} fill="currentColor" className="text-on-primary" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter italic">VOLT</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Movies', 'Cinemas', 'Offers', 'Membership'].map(item => (
              <a key={item} href="#" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen + (selectedMovie?.id || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentScreen === 'home' && renderHome()}
            {currentScreen === 'detail' && renderDetail()}
            {currentScreen === 'booking' && renderBooking()}
            {currentScreen === 'confirmation' && renderConfirmation()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="glass-nav rounded-3xl p-4 flex items-center justify-around ambient-shadow">
          <button onClick={resetApp} className={`p-2 rounded-xl ${currentScreen === 'home' ? 'text-primary' : 'text-on-surface-variant'}`}>
            <Home size={24} />
          </button>
          <button className="p-2 text-on-surface-variant">
            <Search size={24} />
          </button>
          <button className="p-2 text-on-surface-variant">
            <Heart size={24} />
          </button>
          <button className="p-2 text-on-surface-variant">
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-low py-20 border-t border-outline-variant/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-12">
                  <Play size={18} fill="currentColor" className="text-on-primary" />
                </div>
                <span className="text-xl font-display font-black tracking-tighter italic">VOLT CINEMA</span>
              </div>
              <p className="text-on-surface-variant max-w-sm leading-relaxed">
                Experience cinema like never before. High-contrast visuals, immersive sound, and the most comfortable seats in the galaxy.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-on-surface-variant text-sm">
                <li><a href="#" className="hover:text-secondary">Now Playing</a></li>
                <li><a href="#" className="hover:text-secondary">Coming Soon</a></li>
                <li><a href="#" className="hover:text-secondary">Cinemas</a></li>
                <li><a href="#" className="hover:text-secondary">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-on-surface-variant text-sm">
                <li><a href="#" className="hover:text-secondary">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary">Contact Us</a></li>
                <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-on-surface-variant">© 2024 Volt Cinema. All rights reserved.</p>
            <div className="flex gap-6">
              <MapPin size={16} className="text-on-surface-variant" />
              <span className="text-xs text-on-surface-variant">Global Headquarters, Neo-Tokyo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
