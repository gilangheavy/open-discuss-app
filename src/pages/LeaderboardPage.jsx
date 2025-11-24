import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  asyncReceiveLeaderboards,
} from '../features/leaderboards/leaderboardsSlice';
import {ArrowLeft} from 'lucide-react';
import {Link} from 'react-router-dom';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const {leaderboards, status} = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className={
              'p-2 -ml-2 text-muted-foreground ' +
                            'hover:text-foreground transition-colors'
            }
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold truncate">
            Klasemen Pengguna Aktif
          </h1>
        </div>
        <div
          className={
            'bg-card border border-border rounded-lg ' +
                        'shadow-sm overflow-hidden'
          }
        >
          <div className="p-6 border-b border-border bg-muted/30">
            <h2 className="text-lg font-semibold">10 Pengguna Teratas</h2>
          </div>

          {status === 'loading' ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat klasemen...
            </div>
          ) : (
            <div className="divide-y divide-border">
              {leaderboards.map((user, index) => (
                <div
                  key={user.user.id}
                  className={
                    'flex items-center justify-between p-4 ' +
                                        'hover:bg-muted/50 transition-colors'
                  }
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        'flex items-center justify-center w-8 h-8 ' +
                                                'text-lg font-bold text-muted-foreground'
                      }
                    >
                      {index + 1}
                    </span>
                    <img
                      src={user.user.avatar}
                      alt={user.user.name}
                      className="w-10 h-10 rounded-full border border-border"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {user.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-primary">
                      {user.score}
                    </span>
                    <span className="text-xs text-muted-foreground">skor</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default LeaderboardPage;
