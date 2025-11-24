import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncLogin, clearError } from '../features/auth/authSlice';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, authUser } = useSelector((state) => state.auth);

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
    dispatch(asyncLogin({ email, password }));
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
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Login ke Akun Anda</h2>
          </CardHeader>

          <CardContent className="space-y-5">

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
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="nama@email.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Masukkan password Anda"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full"
                size="lg"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Memproses...
                  </span>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>
          </CardContent>

          {/* Register Link */}
          <CardFooter className="flex-col">
            <div className="w-full border-t border-border pt-6">
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
