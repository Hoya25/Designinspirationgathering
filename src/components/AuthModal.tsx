import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Sparkles, Wallet, Gift } from 'lucide-react';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onAuth: (email: string, password: string) => void;
  onWalletAuth: () => void;
  onClose: () => void;
  onToggleMode: () => void;
}

export function AuthModal({ mode, onAuth, onWalletAuth, onClose, onToggleMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onAuth(email, password);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {mode === 'signin' ? 'Welcome Back' : 'Join Crescendo'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'signin' ? 'Sign in to your account' : 'Create an account to unlock exclusive rewards'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Signup Bonus Banner */}
          {mode === 'signup' && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="mb-1">Welcome Bonus!</p>
                  <p className="text-sm text-neutral-600">
                    Get 100 NCTR added to your 360LOCK when you sign up
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Connect Option */}
          <Button 
            onClick={onWalletAuth} 
            variant="outline" 
            className="w-full gap-2 border-2 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
          >
            <Wallet className="w-4 h-4" />
            {mode === 'signin' ? 'Sign in with Base Wallet' : 'Sign up with Base Wallet'}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onToggleMode}
                className="text-sm text-violet-600 hover:text-violet-700"
              >
                {mode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : 'Already a member? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}