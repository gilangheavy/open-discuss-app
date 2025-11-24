import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {asyncAddThread} from '../features/threads/threadsSlice';
import {ArrowLeft} from 'lucide-react';

function AddThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status} = useSelector((state) => state.threads);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(asyncAddThread({title, body, category}));
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
        <div className="bg-card border border-border rounded-lg shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Informasi Diskusi
              </h2>
              <p className="text-sm text-muted-foreground">
                Isi form dibawah untuk membuat diskusi baru
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Judul Diskusi <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={
                    'w-full px-4 py-2.5 border border-input rounded-lg ' +
                    'focus:outline-none focus:ring-2 focus:ring-ring ' +
                    'focus:border-transparent bg-background ' +
                    'transition-all'
                  }
                  placeholder="Masukkan judul diskusi yang menarik..."
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2"
                >
                  Kategori
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={
                    'w-full px-4 py-2.5 border border-input rounded-lg ' +
                    'focus:outline-none focus:ring-2 focus:ring-ring ' +
                    'focus:border-transparent bg-background ' +
                    'transition-all'
                  }
                  placeholder="Contoh: react, javascript, programming..."
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Kategori membantu pengguna menemukan diskusimu (opsional)
                </p>
              </div>

              {/* Body */}
              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium mb-2"
                >
                  Isi Diskusi <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={10}
                  className={
                    'w-full px-4 py-2.5 border border-input rounded-lg ' +
                    'focus:outline-none focus:ring-2 focus:ring-ring ' +
                    'focus:border-transparent bg-background resize-y ' +
                    'transition-all'
                  }
                  placeholder="Jelaskan diskusimu secara detail..."
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Minimal 20 karakter untuk isi diskusi
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-border pt-6">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={
                    'w-full bg-primary text-primary-foreground py-3 ' +
                    'rounded-lg font-medium hover:bg-primary/90 ' +
                    'transition-all disabled:opacity-50 ' +
                    'disabled:cursor-not-allowed shadow-sm ' +
                    'hover:shadow-md'
                  }
                >
                  {status === 'loading' ? 'Membuat Diskusi...' : 'Buat Diskusi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddThreadPage;
