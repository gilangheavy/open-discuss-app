import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../features/auth/authSlice';
import {LogOut} from 'lucide-react';

function Header() {
  const {authUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Forum Diskusi</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Halo, {authUser?.name}</span>
          <Link
            to="/leaderboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Klasemen
          </Link>
          <button
            onClick={onLogout}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
            title="Keluar"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
