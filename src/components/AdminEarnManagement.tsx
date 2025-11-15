import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Edit, Trash2, Search, Calendar, Share2, Users, Zap, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface EarnOpportunity {
  id: number;
  title: string;
  description: string;
  reward: number;
  category: 'daily' | 'social' | 'referral' | 'challenge' | 'partner';
  icon: string;
  recurring?: string;
  link?: string;
  status: 'active' | 'draft' | 'archived';
}

const mockOpportunities: EarnOpportunity[] = [
  {
    id: 1,
    title: 'Daily Check-In',
    description: 'Visit the platform daily and claim your check-in reward',
    reward: 10,
    category: 'daily',
    icon: 'calendar',
    recurring: 'Daily',
    status: 'active',
  },
  {
    id: 2,
    title: 'Follow on X (Twitter)',
    description: 'Follow @CrescendoAlliance on X and verify your account',
    reward: 50,
    category: 'social',
    icon: 'share',
    link: 'https://x.com',
    status: 'active',
  },
  {
    id: 3,
    title: 'Refer a Friend',
    description: 'Invite friends to join Crescendo Alliance',
    reward: 100,
    category: 'referral',
    icon: 'share',
    recurring: 'Per referral',
    status: 'active',
  },
  {
    id: 4,
    title: 'Complete Profile',
    description: 'Fill out your complete member profile',
    reward: 75,
    category: 'challenge',
    icon: 'zap',
    status: 'draft',
  },
];

export function AdminEarnManagement() {
  const [opportunities, setOpportunities] = useState<EarnOpportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<EarnOpportunity | null>(null);

  const filteredOpportunities = opportunities.filter(o =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Earn Opportunities Management</CardTitle>
              <p className="text-sm text-neutral-600 mt-1">
                Create and manage ways for members to earn NCTR tokens
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4" />
              Create Opportunity
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-neutral-600 mb-1">Total Opportunities</p>
                <p className="text-2xl">{opportunities.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-neutral-600 mb-1">Active</p>
                <p className="text-2xl text-green-600">
                  {opportunities.filter(o => o.status === 'active').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-neutral-600 mb-1">Draft</p>
                <p className="text-2xl text-amber-600">
                  {opportunities.filter(o => o.status === 'draft').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-neutral-600 mb-1">Total Rewards</p>
                <p className="text-2xl text-violet-600">
                  {opportunities.reduce((sum, o) => sum + o.reward, 0)} NCTR
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="text-left p-3 text-sm">Opportunity</th>
                  <th className="text-left p-3 text-sm">Category</th>
                  <th className="text-left p-3 text-sm">Reward</th>
                  <th className="text-left p-3 text-sm">Recurring</th>
                  <th className="text-left p-3 text-sm">Status</th>
                  <th className="text-left p-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpportunities.map((opportunity) => (
                  <tr key={opportunity.id} className="border-b last:border-0 hover:bg-neutral-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getIconComponent(opportunity.icon)}
                        </div>
                        <div>
                          <p>{opportunity.title}</p>
                          <p className="text-sm text-neutral-600 line-clamp-1">
                            {opportunity.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getCategoryColor(opportunity.category)}>
                        {opportunity.category}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-violet-600">+{opportunity.reward} NCTR</span>
                    </td>
                    <td className="p-3">
                      {opportunity.recurring ? (
                        <Badge variant="outline">{opportunity.recurring}</Badge>
                      ) : (
                        <span className="text-neutral-400">One-time</span>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge
                        className={
                          opportunity.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : opportunity.status === 'draft'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-neutral-100 text-neutral-700'
                        }
                      >
                        {opportunity.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingOpportunity(opportunity)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setOpportunities(opportunities.filter(o => o.id !== opportunity.id))}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
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

      {/* Create/Edit Modal */}
      {(showCreateModal || editingOpportunity) && (
        <OpportunityFormModal
          opportunity={editingOpportunity}
          onClose={() => {
            setShowCreateModal(false);
            setEditingOpportunity(null);
          }}
          onSave={(opportunity) => {
            if (editingOpportunity) {
              setOpportunities(opportunities.map(o => o.id === opportunity.id ? opportunity : o));
            } else {
              setOpportunities([...opportunities, { ...opportunity, id: Date.now() }]);
            }
            setShowCreateModal(false);
            setEditingOpportunity(null);
          }}
        />
      )}
    </div>
  );
}

interface OpportunityFormModalProps {
  opportunity: EarnOpportunity | null;
  onClose: () => void;
  onSave: (opportunity: EarnOpportunity) => void;
}

function OpportunityFormModal({ opportunity, onClose, onSave }: OpportunityFormModalProps) {
  const [formData, setFormData] = useState<Partial<EarnOpportunity>>(
    opportunity || {
      title: '',
      description: '',
      reward: 10,
      category: 'daily',
      icon: 'calendar',
      recurring: '',
      link: '',
      status: 'draft',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as EarnOpportunity);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {opportunity ? 'Edit Earn Opportunity' : 'Create New Earn Opportunity'}
          </DialogTitle>
          <DialogDescription>
            {opportunity ? 'Update opportunity details and settings' : 'Add a new way for members to earn NCTR'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Opportunity Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Daily Check-In"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe what users need to do to earn..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="challenge">Challenge</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="share">Share</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="zap">Zap</SelectItem>
                  <SelectItem value="sparkles">Sparkles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reward">NCTR Reward</Label>
              <Input
                id="reward"
                type="number"
                min="1"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurring">Recurring (Optional)</Label>
              <Input
                id="recurring"
                value={formData.recurring}
                onChange={(e) => setFormData({ ...formData, recurring: e.target.value })}
                placeholder="e.g., Daily, Weekly"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">External Link (Optional)</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-violet-600 hover:bg-violet-700">
              {opportunity ? 'Save Changes' : 'Create Opportunity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getIconComponent(icon: string) {
  switch (icon) {
    case 'calendar':
      return <Calendar className="w-5 h-5 text-violet-600" />;
    case 'share':
      return <Share2 className="w-5 h-5 text-violet-600" />;
    case 'users':
      return <Users className="w-5 h-5 text-violet-600" />;
    case 'zap':
      return <Zap className="w-5 h-5 text-violet-600" />;
    case 'sparkles':
      return <Sparkles className="w-5 h-5 text-violet-600" />;
    default:
      return <Sparkles className="w-5 h-5 text-violet-600" />;
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'daily':
      return 'bg-blue-100 text-blue-700';
    case 'social':
      return 'bg-purple-100 text-purple-700';
    case 'referral':
      return 'bg-green-100 text-green-700';
    case 'challenge':
      return 'bg-amber-100 text-amber-700';
    case 'partner':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-neutral-100 text-neutral-700';
  }
}
