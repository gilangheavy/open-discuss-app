import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegister, clearError } from '../features/auth/authSlice';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  // Navigate to login when registration succeeds
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearError());
      navigate('/login');
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(asyncRegister({ name, email, password }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-background px-4 py-8"
    >
      <div className="w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bergabung dengan Kami
          </h1>
          <p className="text-muted-foreground">
            Buat akun baru untuk mulai berdiskusi
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Daftar Akun Baru</h2>
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
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nama Lengkap <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Alamat Email <span className="text-destructive">*</span>
                </Label>
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
                <Label htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Minimal 6 karakter"
                />
                <p className="text-xs text-muted-foreground">
                  Gunakan kombinasi huruf, angka, dan simbol untuk keamanan
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-6"
                size="lg"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Mendaftar...
                  </span>
                ) : (
                  'Daftar Sekarang'
                )}
              </Button>
            </form>
          </CardContent>

          {/* Login Link */}
          <CardFooter className="flex-col">
            <div className="w-full border-t border-border pt-6">
              <p className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login Sekarang
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
