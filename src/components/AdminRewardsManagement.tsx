import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Plus, Edit2, Trash2, Star, ArrowLeft, Search } from 'lucide-react';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Reward {
  id: number;
  title: string;
  level: number;
  claims: number;
  type: string;
  sponsor: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  tokenAmount?: number;
  tokenSymbol?: string;
  tokenLogo?: string;
}

interface AdminRewardsManagementProps {
  onBack: () => void;
}

const initialRewards: Reward[] = [
  {
    id: 1,
    title: 'Ian Carroll Twitch Subscription',
    level: 1,
    claims: 1,
    type: 'Subscription',
    sponsor: 'Ian Carroll',
    description: '1-month premium Twitch subscription with exclusive emotes and badge.',
    imageUrl: 'https://images.unsplash.com/photo-1639342405971-a428b16b0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBnYW1pbmd8ZW58MXx8fHwxNzYzMTM4ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 2,
    title: 'GA Ticket to Gary Clark Jr',
    level: 2,
    claims: 5,
    type: 'Ticket',
    sponsor: 'Gary Clark Jr',
    description: 'General admission digital ticket to upcoming Gary Clark Jr concert. Delivered via email.',
    imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 3,
    title: '2 GA Tickets to Gary Clark Jr',
    level: 2,
    claims: 10,
    type: 'Ticket',
    sponsor: 'Gary Clark Jr',
    description: '2 general admission digital tickets to upcoming Gary Clark Jr concert.',
    imageUrl: 'https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBsaXZlfGVufDF8fHx8MTc2MzA1MDgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: '15-Minute Cameo with Bill Murray',
    level: 2,
    claims: 20,
    type: 'Experience',
    sponsor: 'Bill Murray',
    description: 'Private 15-minute video call with Bill Murray. Scheduled via digital calendar link.',
    imageUrl: 'https://images.unsplash.com/photo-1762330469789-cab18158504f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Vic2NyaXB0aW9ufGVufDF8fHx8MTc2MzEzODkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: 5,
    title: 'X Premium Subscription (1 Year)',
    level: 3,
    claims: 25,
    type: 'Subscription',
    sponsor: 'X Corp',
    description: 'Full year of X Premium with verification, extended posts, and ad-free browsing.',
    imageUrl: 'https://images.unsplash.com/photo-1762330469789-cab18158504f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Vic2NyaXB0aW9ufGVufDF8fHx8MTc2MzEzODkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'VIP Discord Access + NFT',
    level: 3,
    claims: 30,
    type: 'Access',
    sponsor: 'Crescendo Alliance',
    description: 'Exclusive access to VIP Discord channels and a commemorative NFT badge.',
    imageUrl: 'https://images.unsplash.com/photo-1639342405971-a428b16b0f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBnYW1pbmd8ZW58MXx8fHwxNzYzMTM4ODk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const rewardTypes = ['Subscription', 'Ticket', 'Experience', 'Access', 'Discount', 'Product', 'Alliance Tokens'];

export function AdminRewardsManagement({ onBack }: AdminRewardsManagementProps) {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    level: 1,
    claims: 1,
    type: 'Subscription',
    sponsor: '',
    description: '',
    imageUrl: '',
    featured: false,
    tokenAmount: 0,
    tokenSymbol: '',
    tokenLogo: '',
  });

  const handleOpenModal = (reward?: Reward) => {
    if (reward) {
      setEditingReward(reward);
      setFormData({
        title: reward.title,
        level: reward.level,
        claims: reward.claims,
        type: reward.type,
        sponsor: reward.sponsor,
        description: reward.description,
        imageUrl: reward.imageUrl,
        featured: reward.featured || false,
        tokenAmount: reward.tokenAmount || 0,
        tokenSymbol: reward.tokenSymbol || '',
        tokenLogo: reward.tokenLogo || '',
      });
    } else {
      setEditingReward(null);
      setFormData({
        title: '',
        level: 1,
        claims: 1,
        type: 'Subscription',
        sponsor: '',
        description: '',
        imageUrl: '',
        featured: false,
        tokenAmount: 0,
        tokenSymbol: '',
        tokenLogo: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReward(null);
  };

  const handleSaveReward = () => {
    if (editingReward) {
      // Update existing reward
      setRewards(rewards.map(r => 
        r.id === editingReward.id 
          ? { ...formData, id: r.id }
          : r
      ));
    } else {
      // Add new reward
      const newReward = {
        ...formData,
        id: Math.max(...rewards.map(r => r.id), 0) + 1,
      };
      setRewards([...rewards, newReward]);
    }
    handleCloseModal();
  };

  const handleDeleteReward = (id: number) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      setRewards(rewards.filter(r => r.id !== id));
    }
  };

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === null || reward.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl tracking-tight leading-none">Crescendo</span>
                <span className="text-xs text-neutral-600 leading-none">Rewards Alliance</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl tracking-tight mb-2">Rewards Management</h1>
              <p className="text-lg text-neutral-600">Manage digital rewards, subscriptions, and exclusive access</p>
            </div>
            <Button onClick={() => handleOpenModal()} className="bg-violet-600 hover:bg-violet-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Reward
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Total Rewards</p>
                <p className="text-3xl">{rewards.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Featured</p>
                <p className="text-3xl">{rewards.filter(r => r.featured).length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Avg Claims</p>
                <p className="text-3xl">{Math.round(rewards.reduce((sum, r) => sum + r.claims, 0) / rewards.length)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Rewards Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-sm">Image</th>
                    <th className="text-left p-4 text-sm">Title</th>
                    <th className="text-left p-4 text-sm">Sponsor</th>
                    <th className="text-left p-4 text-sm">Type</th>
                    <th className="text-left p-4 text-sm">Claims</th>
                    <th className="text-left p-4 text-sm">Featured</th>
                    <th className="text-left p-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRewards.map((reward) => (
                    <tr key={reward.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                      <td className="p-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100">
                          <ImageWithFallback
                            src={reward.imageUrl}
                            alt={reward.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm max-w-xs line-clamp-2">{reward.title}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-neutral-600">{reward.sponsor}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{reward.type}</Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{reward.claims}</p>
                      </td>
                      <td className="p-4">
                        {reward.featured && (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(reward)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReward(reward.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredRewards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-600">No rewards found.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingReward ? 'Edit Reward' : 'Add New Reward'}</DialogTitle>
            <DialogDescription>
              {editingReward ? 'Update the reward details below' : 'Fill in the details to create a new reward'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Reward title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sponsor">Sponsor</Label>
                  <Input
                    id="sponsor"
                    placeholder="Sponsor name"
                    value={formData.sponsor}
                    onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rewardTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Reward description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                <p className="text-xs text-neutral-500 mt-1">Enter a direct image URL</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="level">Required Level</Label>
                  <Select 
                    value={formData.level.toString()} 
                    onValueChange={(value) => setFormData({ ...formData, level: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - BRONZE</SelectItem>
                      <SelectItem value="2">Level 2 - SILVER</SelectItem>
                      <SelectItem value="3">Level 3 - GOLD</SelectItem>
                      <SelectItem value="4">Level 4 - PLATINUM</SelectItem>
                      <SelectItem value="5">Level 5 - DIAMOND</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="claims">Claims Required</Label>
                  <Input
                    id="claims"
                    type="number"
                    min="1"
                    value={formData.claims}
                    onChange={(e) => setFormData({ ...formData, claims: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <Label htmlFor="featured" className="cursor-pointer">Featured Reward</Label>
                  <p className="text-xs text-neutral-600">Display in the hero carousel</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>

              {/* Alliance Tokens Specific Fields */}
              {formData.type === 'Alliance Tokens' && (
                <div className="p-4 bg-violet-50 rounded-lg border-2 border-violet-200 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-violet-900">Alliance Token Settings</p>
                      <p className="text-xs text-violet-700">Configure token reward details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tokenAmount">Token Amount</Label>
                      <Input
                        id="tokenAmount"
                        type="number"
                        min="0"
                        placeholder="1000"
                        value={formData.tokenAmount}
                        onChange={(e) => setFormData({ ...formData, tokenAmount: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tokenSymbol">Token Symbol</Label>
                      <Input
                        id="tokenSymbol"
                        placeholder="ETH, USDC, etc."
                        value={formData.tokenSymbol}
                        onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tokenLogo">Token Logo (Emoji)</Label>
                    <Input
                      id="tokenLogo"
                      placeholder="⟠, 💵, 🔴, etc."
                      value={formData.tokenLogo}
                      onChange={(e) => setFormData({ ...formData, tokenLogo: e.target.value })}
                      maxLength={2}
                    />
                    <p className="text-xs text-violet-700 mt-1">Use an emoji to represent the token</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSaveReward} 
                className="flex-1 bg-violet-600 hover:bg-violet-700"
                disabled={!formData.title || !formData.sponsor || !formData.imageUrl}
              >
                {editingReward ? 'Update Reward' : 'Create Reward'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getLevelBadgeColor(level: number): string {
  const colors = {
    1: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    2: 'bg-blue-100 text-blue-900 border-blue-300',
    3: 'bg-purple-100 text-purple-900 border-purple-300',
    4: 'bg-amber-100 text-amber-900 border-amber-300',
  };
  return colors[level as keyof typeof colors] || colors[1];
}