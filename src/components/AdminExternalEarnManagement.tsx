import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { ArrowLeft, Plus, Edit, Trash2, ExternalLink, Star, StarOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminExternalEarnManagementProps {
  onBack: () => void;
}

interface EarnLink {
  id: number;
  title: string;
  description: string;
  platform: string;
  estimatedEarnings: string;
  link: string;
  category: 'survey' | 'crypto' | 'rewards' | 'cashback' | 'other';
  featured: boolean;
  status: 'active' | 'inactive';
  dateAdded: string;
}

const INITIAL_LINKS: EarnLink[] = [
  {
    id: 1,
    title: 'Complete Surveys on Swagbucks',
    description: 'Take surveys and earn points that can be converted to cash or gift cards',
    platform: 'Swagbucks',
    estimatedEarnings: '$5-50/day',
    link: 'https://www.swagbucks.com',
    category: 'survey',
    featured: true,
    status: 'active',
    dateAdded: '2024-01-15',
  },
  {
    id: 2,
    title: 'Earn Crypto on Coinbase',
    description: 'Learn about crypto and earn tokens by watching videos and completing quizzes',
    platform: 'Coinbase Learn & Earn',
    estimatedEarnings: '$30-50 one-time',
    link: 'https://www.coinbase.com/earn',
    category: 'crypto',
    featured: true,
    status: 'active',
    dateAdded: '2024-01-20',
  },
  {
    id: 3,
    title: 'Cashback on Rakuten',
    description: 'Shop at your favorite stores and earn cashback on every purchase',
    platform: 'Rakuten',
    estimatedEarnings: '1-15% cashback',
    link: 'https://www.rakuten.com',
    category: 'cashback',
    featured: false,
    status: 'active',
    dateAdded: '2024-02-01',
  },
];

export function AdminExternalEarnManagement({ onBack }: AdminExternalEarnManagementProps) {
  const [links, setLinks] = useState<EarnLink[]>(INITIAL_LINKS);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedLink, setSelectedLink] = useState<EarnLink | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    estimatedEarnings: '',
    link: '',
    category: 'other' as EarnLink['category'],
    featured: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      platform: '',
      estimatedEarnings: '',
      link: '',
      category: 'other',
      featured: false,
    });
  };

  const handleAddLink = () => {
    const newLink: EarnLink = {
      id: Math.max(...links.map(l => l.id), 0) + 1,
      ...formData,
      status: 'active',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setLinks([...links, newLink]);
    setShowAddDialog(false);
    resetForm();
    toast.success('External earn link added successfully!');
  };

  const handleEditLink = () => {
    if (!selectedLink) return;
    
    setLinks(links.map(link =>
      link.id === selectedLink.id
        ? { ...link, ...formData }
        : link
    ));
    setShowEditDialog(false);
    setSelectedLink(null);
    resetForm();
    toast.success('Link updated successfully!');
  };

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast.success('Link deleted successfully!');
  };

  const handleToggleStatus = (id: number) => {
    setLinks(links.map(link =>
      link.id === id
        ? { ...link, status: link.status === 'active' ? 'inactive' : 'active' }
        : link
    ));
    toast.success('Status updated!');
  };

  const handleToggleFeatured = (id: number) => {
    setLinks(links.map(link =>
      link.id === id
        ? { ...link, featured: !link.featured }
        : link
    ));
    toast.success('Featured status updated!');
  };

  const openEditDialog = (link: EarnLink) => {
    setSelectedLink(link);
    setFormData({
      title: link.title,
      description: link.description,
      platform: link.platform,
      estimatedEarnings: link.estimatedEarnings,
      link: link.link,
      category: link.category,
      featured: link.featured,
    });
    setShowEditDialog(true);
  };

  const filteredLinks = links.filter(link => {
    if (filterCategory !== 'all' && link.category !== filterCategory) return false;
    if (filterStatus !== 'all' && link.status !== filterStatus) return false;
    return true;
  });

  const LinkForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Complete Surveys on Swagbucks"
        />
      </div>

      <div>
        <Label htmlFor="platform">Platform Name</Label>
        <Input
          id="platform"
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          placeholder="e.g., Swagbucks"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the opportunity"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="link">URL Link</Label>
        <Input
          id="link"
          type="url"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="https://example.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: EarnLink['category']) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="survey">Survey</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
              <SelectItem value="rewards">Rewards</SelectItem>
              <SelectItem value="cashback">Cashback</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="earnings">Estimated Earnings</Label>
          <Input
            id="earnings"
            value={formData.estimatedEarnings}
            onChange={(e) => setFormData({ ...formData, estimatedEarnings: e.target.value })}
            placeholder="e.g., $5-50/day"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
        <div>
          <Label htmlFor="featured">Featured Opportunity</Label>
          <p className="text-xs text-neutral-600">Display prominently at the top</p>
        </div>
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setShowAddDialog(false);
            setShowEditDialog(false);
            resetForm();
          }}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="flex-1 bg-violet-600 hover:bg-violet-700"
          disabled={!formData.title || !formData.platform || !formData.link}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl">Manage External Earn Links</h1>
                <p className="text-sm text-neutral-600">Add and manage external earning opportunities</p>
              </div>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                  <Plus className="w-4 h-4" />
                  Add New Link
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add External Earn Link</DialogTitle>
                  <DialogDescription>
                    Create a new external earning opportunity for members
                  </DialogDescription>
                </DialogHeader>
                <LinkForm onSubmit={handleAddLink} submitLabel="Add Link" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-neutral-600 mb-1">Total Links</p>
              <p className="text-3xl">{links.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-neutral-600 mb-1">Active</p>
              <p className="text-3xl text-green-600">{links.filter(l => l.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-neutral-600 mb-1">Featured</p>
              <p className="text-3xl text-amber-600">{links.filter(l => l.featured).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-neutral-600 mb-1">Inactive</p>
              <p className="text-3xl text-neutral-400">{links.filter(l => l.status === 'inactive').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs mb-2 block">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="survey">Survey</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="rewards">Rewards</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs mb-2 block">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links List */}
        <div className="space-y-4">
          {filteredLinks.map((link) => (
            <Card key={link.id} className={link.status === 'inactive' ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg">{link.title}</h3>
                      {link.featured && (
                        <Badge className="bg-amber-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className={
                        link.status === 'active' ? 'border-green-200 text-green-700' : 'border-neutral-300 text-neutral-600'
                      }>
                        {link.status}
                      </Badge>
                      <Badge variant="outline">{link.category}</Badge>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{link.platform}</p>
                    <p className="text-sm text-neutral-600 mb-3">{link.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600">Earnings: </span>
                        <span>{link.estimatedEarnings}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">Added: </span>
                        <span>{link.dateAdded}</span>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="h-auto p-0 text-violet-600"
                      >
                        <a href={link.link} target="_blank" rel="noopener noreferrer" className="gap-1">
                          <ExternalLink className="w-3 h-3" />
                          View Link
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(link)}
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFeatured(link.id)}
                      className="gap-2"
                    >
                      {link.featured ? (
                        <>
                          <StarOff className="w-4 h-4" />
                          Unfeature
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4" />
                          Feature
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(link.id)}
                      className={link.status === 'active' ? 'text-amber-600' : 'text-green-600'}
                    >
                      {link.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteLink(link.id)}
                      className="gap-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLinks.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-neutral-600">No links found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit External Earn Link</DialogTitle>
            <DialogDescription>
              Update the external earning opportunity details
            </DialogDescription>
          </DialogHeader>
          <LinkForm onSubmit={handleEditLink} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
