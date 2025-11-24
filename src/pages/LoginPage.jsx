import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {asyncLogin, clearError} from '../features/auth/authSlice';
import {LogIn} from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error, authUser} = useSelector((state) => state.auth);

  // Navigate to home when login succeeds and authUser is set
  useEffect(() => {
    if (status === 'succeeded' && authUser) {
      dispatch(clearError());
      navigate('/');
    }
  }, [status, authUser, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(asyncLogin({email, password}));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-background px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-muted-foreground">
            Login untuk melanjutkan ke Forum Diskusi
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-md">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">Login ke Akun Anda</h2>

            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 bg-destructive/10 border
                border-destructive/20 rounded-lg text-destructive text-sm
                flex items-start gap-2"
              >
                <span className="font-medium">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 border border-input rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-ring
                    focus:border-transparent bg-background transition-all"
                  placeholder="nama@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 border border-input rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-ring
                    focus:border-transparent bg-background transition-all"
                  placeholder="Masukkan password Anda"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-primary-foreground
                  py-3 px-4 rounded-lg font-medium hover:bg-primary/90
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-sm hover:shadow-md"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Memproses...
                  </span>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>
          </div>

          {/* Register Link */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
            <div className="border-t border-border pt-6">
              <p className="text-center text-sm text-muted-foreground">
                Belum punya akun?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
