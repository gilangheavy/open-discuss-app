import {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  asyncPopulateUsersAndThreads,
  asyncToggleVoteThread,
} from '../features/threads/threadsSlice';
import ThreadItem from '../components/ThreadItem';
import {Plus} from 'lucide-react';
import {Link} from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const {threads, status} = useSelector((state) => state.threads);
  const {authUser} = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onVote = (threadId, voteType) => {
    dispatch(asyncToggleVoteThread({threadId, voteType}));
  };

  // Extract unique categories from threads
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(threads.map((thread) => thread.category)),
    ];
    return uniqueCategories.sort();
  }, [threads]);

  // Filter threads by selected category
  const filteredThreads = useMemo(() => {
    if (!selectedCategory) return threads;
    return threads.filter((thread) => thread.category === selectedCategory);
  }, [threads, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Diskusi Terbaru
          </h2>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium
                  whitespace-nowrap transition-colors ${!selectedCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    whitespace-nowrap transition-colors ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                >
                  #{category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thread List */}
        <div className="grid gap-4">
          {status === 'loading' ? (
            <div className="text-center py-10 text-muted-foreground">
              Memuat diskusi...
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Tidak ada diskusi dalam kategori ini.
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <ThreadItem
                key={thread.id}
                thread={thread}
                authUserId={authUser?.id}
                onVote={onVote}
              />
            ))
          )}
        </div>
      </main>

      <Link
        to="/add-thread"
        className="fixed bottom-8 right-8 p-4 bg-primary
          text-primary-foreground rounded-full shadow-lg
          hover:bg-primary/90 transition-all hover:scale-105"
        title="Buat Diskusi Baru"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default HomePage;
