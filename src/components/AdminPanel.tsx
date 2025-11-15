import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { AdminEarnManagement } from './AdminEarnManagement';

interface AdminPanelProps {
  onBack: () => void;
}

interface Reward {
  id: number;
  title: string;
  level: number;
  claims: number;
  type: string;
  sponsor: string;
  status: 'active' | 'draft' | 'archived';
}

const mockRewards: Reward[] = [
  { id: 1, title: 'Ian Carroll Twitch Subscription', level: 1, claims: 1, type: 'Subscription', sponsor: 'Ian Carroll', status: 'active' },
  { id: 2, title: 'GA Ticket to Gary Clark Jr', level: 2, claims: 5, type: 'Ticket', sponsor: 'Gary Clark Jr', status: 'active' },
  { id: 3, title: '2 GA Tickets to Gary Clark Jr', level: 2, claims: 10, type: 'Ticket', sponsor: 'Gary Clark Jr', status: 'active' },
  { id: 4, title: '15-Minute Cameo with Bill Murray', level: 2, claims: 20, type: 'Experience', sponsor: 'Bill Murray', status: 'draft' },
];

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const filteredRewards = rewards.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.sponsor.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-xl">Admin Panel</h1>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs defaultValue="rewards">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="rewards">Rewards Management</TabsTrigger>
            <TabsTrigger value="earn">Earn Management</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Rewards Management</CardTitle>
                  <Button onClick={() => setShowCreateModal(true)} className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus className="w-4 h-4" />
                    Create Reward
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search rewards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b">
                      <tr>
                        <th className="text-left p-3 text-sm">Reward</th>
                        <th className="text-left p-3 text-sm">Level</th>
                        <th className="text-left p-3 text-sm">Claims</th>
                        <th className="text-left p-3 text-sm">Type</th>
                        <th className="text-left p-3 text-sm">Status</th>
                        <th className="text-left p-3 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRewards.map((reward) => (
                        <tr key={reward.id} className="border-b last:border-0 hover:bg-neutral-50">
                          <td className="p-3">
                            <div>
                              <p>{reward.title}</p>
                              <p className="text-sm text-neutral-600">{reward.sponsor}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`${getLevelColor(reward.level)} text-white`}>
                              Level {reward.level}
                            </Badge>
                          </td>
                          <td className="p-3">{reward.claims}</td>
                          <td className="p-3">
                            <Badge variant="outline">{reward.type}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge
                              className={
                                reward.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : reward.status === 'draft'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-neutral-100 text-neutral-700'
                              }
                            >
                              {reward.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingReward(reward)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setRewards(rewards.filter(r => r.id !== reward.id))}
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
          </TabsContent>

          <TabsContent value="earn">
            <AdminEarnManagement />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingReward) && (
        <RewardFormModal
          reward={editingReward}
          onClose={() => {
            setShowCreateModal(false);
            setEditingReward(null);
          }}
          onSave={(reward) => {
            if (editingReward) {
              setRewards(rewards.map(r => r.id === reward.id ? reward : r));
            } else {
              setRewards([...rewards, { ...reward, id: Date.now() }]);
            }
            setShowCreateModal(false);
            setEditingReward(null);
          }}
        />
      )}
    </div>
  );
}

interface RewardFormModalProps {
  reward: Reward | null;
  onClose: () => void;
  onSave: (reward: Reward) => void;
}

function RewardFormModal({ reward, onClose, onSave }: RewardFormModalProps) {
  const [formData, setFormData] = useState<Partial<Reward>>(
    reward || {
      title: '',
      level: 1,
      claims: 1,
      type: 'Subscription',
      sponsor: '',
      status: 'draft',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Reward);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {reward ? 'Edit Reward' : 'Create New Reward'}
          </DialogTitle>
          <DialogDescription>
            {reward ? 'Update reward details and settings' : 'Add a new digital reward to the pool'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Reward Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Describe the reward and fulfillment details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sponsor">Sponsor Name</Label>
              <Input
                id="sponsor"
                value={formData.sponsor}
                onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Subscription">Subscription</SelectItem>
                  <SelectItem value="Ticket">Ticket</SelectItem>
                  <SelectItem value="Experience">Experience</SelectItem>
                  <SelectItem value="Cameo">Cameo</SelectItem>
                  <SelectItem value="Access">Access</SelectItem>
                  <SelectItem value="Token Claim">Token Claim</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level Requirement</Label>
              <Select
                value={formData.level?.toString()}
                onValueChange={(value) => setFormData({ ...formData, level: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                  <SelectItem value="3">Level 3</SelectItem>
                  <SelectItem value="4">Level 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="claims">Claim Cost</Label>
              <Input
                id="claims"
                type="number"
                min="1"
                value={formData.claims}
                onChange={(e) => setFormData({ ...formData, claims: Number(e.target.value) })}
                required
              />
            </div>
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
              {reward ? 'Save Changes' : 'Create Reward'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getLevelColor(level: number): string {
  const colors = {
    1: 'bg-gradient-to-r from-emerald-400 to-green-500',
    2: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    3: 'bg-gradient-to-r from-purple-400 to-violet-500',
    4: 'bg-gradient-to-r from-amber-400 to-yellow-500',
  };
  return colors[level as keyof typeof colors] || colors[1];
}