import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../features/threads/threadsSlice';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function AddThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.threads);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncAddThread({ title, body, category }));
    if (asyncAddThread.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className={
              'p-2 -ml-2 text-muted-foreground ' +
              'hover:text-foreground transition-colors'
            }
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Buat Diskusi Baru</h1>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">
              Informasi Diskusi
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Isi form dibawah untuk membuat diskusi baru
            </p>
          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Judul Diskusi <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Masukkan judul diskusi yang menarik..."
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Contoh: react, javascript, programming..."
                />
                <p className="text-xs text-muted-foreground">
                  Kategori membantu pengguna menemukan diskusimu (opsional)
                </p>
              </div>

              {/* Body */}
              <div className="space-y-2">
                <Label htmlFor="body">
                  Isi Diskusi <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={10}
                  placeholder="Jelaskan diskusimu secara detail..."
                />
                <p className="text-xs text-muted-foreground">
                  Minimal 20 karakter untuk isi diskusi
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-border pt-6">
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full"
                  size="lg"
                >
                  {status === 'loading' ? 'Membuat Diskusi...' : 'Buat Diskusi'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default AddThreadPage;
