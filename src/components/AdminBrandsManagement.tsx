import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Store, 
  Upload,
  ImageIcon,
  Star,
  X,
  Check,
  Save
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import kromaLogo from 'figma:asset/36cd3893245a3ad638e4c27f91410fe2895aed4b.png';

interface AdminBrandsManagementProps {
  onBack: () => void;
}

type Category = 'retail' | 'dining' | 'travel' | 'entertainment' | 'wellness' | 'technology' | 'lifestyle';

interface BrandPartner {
  id: number;
  name: string;
  category: Category;
  description: string;
  baseEarning: string;
  featured: boolean;
  logo: string;
  logoType: 'emoji' | 'image';
  color: string;
  website?: string;
  earnMultiplier: number;
  minPurchase?: number;
  maxEarning?: string;
}

const initialBrands: BrandPartner[] = [
  {
    id: 1,
    name: 'Kroma Wellness',
    category: 'wellness',
    description: 'Premium superfood wellness products and nutritional supplements for optimal health',
    baseEarning: '8 NCTR per $1',
    featured: true,
    logo: kromaLogo,
    logoType: 'image',
    color: 'from-neutral-900 to-neutral-700',
    website: 'https://kromafoods.com',
    earnMultiplier: 8,
    minPurchase: 25,
    maxEarning: '5000 NCTR/month',
  },
  {
    id: 2,
    name: 'Urban Outfitters',
    category: 'retail',
    description: 'Contemporary fashion and lifestyle brand offering trendy apparel, accessories, and home decor',
    baseEarning: '5 NCTR per $1',
    featured: true,
    logo: '🛍️',
    logoType: 'emoji',
    color: 'from-purple-500 to-pink-500',
    website: 'https://urbanoutfitters.com',
    earnMultiplier: 5,
    minPurchase: 50,
  },
  {
    id: 3,
    name: 'Whole Foods Market',
    category: 'dining',
    description: 'Premium organic groceries, fresh produce, and natural products for healthy living',
    baseEarning: '3 NCTR per $1',
    featured: true,
    logo: '🥗',
    logoType: 'emoji',
    color: 'from-green-500 to-emerald-500',
    earnMultiplier: 3,
    minPurchase: 20,
  },
  {
    id: 4,
    name: 'Delta Airlines',
    category: 'travel',
    description: 'Premium air travel experiences with worldwide destinations and exceptional service',
    baseEarning: '7 NCTR per $1',
    featured: false,
    logo: '✈️',
    logoType: 'emoji',
    color: 'from-blue-500 to-cyan-500',
    earnMultiplier: 7,
    minPurchase: 100,
  },
  {
    id: 5,
    name: 'Nike',
    category: 'retail',
    description: 'World-class athletic footwear, apparel, and equipment for every sport and lifestyle',
    baseEarning: '6 NCTR per $1',
    featured: true,
    logo: '👟',
    logoType: 'emoji',
    color: 'from-orange-500 to-red-500',
    earnMultiplier: 6,
    minPurchase: 30,
  },
];

export function AdminBrandsManagement({ onBack }: AdminBrandsManagementProps) {
  // Load brands from localStorage or use initialBrands as fallback
  const [brands, setBrands] = useState<BrandPartner[]>(() => {
    const savedBrands = localStorage.getItem('crescendo-brands');
    if (savedBrands) {
      try {
        return JSON.parse(savedBrands);
      } catch (e) {
        console.error('Failed to parse saved brands:', e);
        return initialBrands;
      }
    }
    return initialBrands;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandPartner | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');

  // Save brands to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('crescendo-brands', JSON.stringify(brands));
  }, [brands]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'retail' as Category,
    description: '',
    baseEarning: '',
    featured: false,
    logo: '',
    logoType: 'emoji' as 'emoji' | 'image',
    color: 'from-violet-500 to-purple-500',
    website: '',
    earnMultiplier: 1,
    minPurchase: 0,
    maxEarning: '',
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save debounce timer
  useEffect(() => {
    if (!isModalOpen || !hasUnsavedChanges) return;

    setSaveStatus('saving');
    
    const debounceTimer = setTimeout(() => {
      if (editingBrand) {
        // Auto-save for editing
        setBrands(brands.map(b => 
          b.id === editingBrand.id 
            ? { ...formData, id: b.id }
            : b
        ));
        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        toast.success('Changes auto-saved', { duration: 2000 });
      }
    }, 2000); // Auto-save after 2 seconds of no changes

    return () => clearTimeout(debounceTimer);
  }, [formData, isModalOpen, editingBrand, hasUnsavedChanges]);

  const handleOpenModal = (brand?: BrandPartner) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        category: brand.category,
        description: brand.description,
        baseEarning: brand.baseEarning,
        featured: brand.featured,
        logo: brand.logo,
        logoType: brand.logoType,
        color: brand.color,
        website: brand.website || '',
        earnMultiplier: brand.earnMultiplier,
        minPurchase: brand.minPurchase || 0,
        maxEarning: brand.maxEarning || '',
      });
      setLogoPreview(brand.logoType === 'image' ? brand.logo : '');
    } else {
      setEditingBrand(null);
      setFormData({
        name: '',
        category: 'retail',
        description: '',
        baseEarning: '',
        featured: false,
        logo: '',
        logoType: 'emoji',
        color: 'from-violet-500 to-purple-500',
        website: '',
        earnMultiplier: 1,
        minPurchase: 0,
        maxEarning: '',
      });
      setLogoPreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
    setLogoPreview('');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData({
          ...formData,
          logo: result,
          logoType: 'image',
        });
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBrand = () => {
    if (!formData.name || !formData.description || !formData.logo) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingBrand) {
      // Update existing brand
      setBrands(brands.map(b => 
        b.id === editingBrand.id 
          ? { ...formData, id: b.id }
          : b
      ));
      toast.success(`${formData.name} updated successfully`);
    } else {
      // Add new brand
      const newBrand = {
        ...formData,
        id: Math.max(...brands.map(b => b.id), 0) + 1,
      };
      setBrands([...brands, newBrand]);
      toast.success(`${formData.name} added successfully`);
    }
    handleCloseModal();
  };

  const handleDeleteBrand = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setBrands(brands.filter(b => b.id !== id));
      toast.success(`${name} deleted successfully`);
    }
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || brand.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'retail', label: 'Retail' },
    { value: 'dining', label: 'Dining' },
    { value: 'travel', label: 'Travel' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  const gradientOptions = [
    { value: 'from-violet-500 to-purple-500', label: 'Violet to Purple' },
    { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
    { value: 'from-green-500 to-emerald-500', label: 'Green to Emerald' },
    { value: 'from-orange-500 to-red-500', label: 'Orange to Red' },
    { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
    { value: 'from-neutral-900 to-neutral-700', label: 'Dark Gray' },
    { value: 'from-amber-500 to-yellow-500', label: 'Amber to Yellow' },
    { value: 'from-pink-500 to-rose-500', label: 'Pink to Rose' },
  ];

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
                <Star className="w-5 h-5 text-white" />
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
              <h1 className="text-4xl tracking-tight mb-2">Brand Partners Management</h1>
              <p className="text-lg text-neutral-600">Manage alliance brands and earn opportunities</p>
            </div>
            <Button onClick={() => handleOpenModal()} className="bg-violet-600 hover:bg-violet-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Brand Partner
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Total Brands</p>
                <p className="text-3xl">{brands.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Featured</p>
                <p className="text-3xl">{brands.filter(b => b.featured).length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Categories</p>
                <p className="text-3xl">{new Set(brands.map(b => b.category)).size}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Avg Multiplier</p>
                <p className="text-3xl">{(brands.reduce((sum, b) => sum + b.earnMultiplier, 0) / brands.length).toFixed(1)}x</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as Category | 'all')}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brands Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-sm">Logo</th>
                    <th className="text-left p-4 text-sm">Brand Name</th>
                    <th className="text-left p-4 text-sm">Category</th>
                    <th className="text-left p-4 text-sm">Base Earning</th>
                    <th className="text-left p-4 text-sm">Multiplier</th>
                    <th className="text-left p-4 text-sm">Min Purchase</th>
                    <th className="text-left p-4 text-sm">Featured</th>
                    <th className="text-left p-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBrands.map((brand) => (
                    <tr key={brand.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                      <td className="p-4">
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                          brand.logoType === 'emoji' 
                            ? `bg-gradient-to-br ${brand.color}` 
                            : 'bg-white border-2 border-neutral-100'
                        }`}>
                          {brand.logoType === 'emoji' ? (
                            <span className="text-2xl">{brand.logo}</span>
                          ) : (
                            <ImageWithFallback
                              src={brand.logo}
                              alt={brand.name}
                              className="w-14 h-14 object-contain"
                            />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="max-w-xs line-clamp-1">{brand.name}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">{brand.category}</Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{brand.baseEarning}</p>
                      </td>
                      <td className="p-4">
                        <Badge className="bg-violet-100 text-violet-900 border-violet-300">
                          {brand.earnMultiplier}x
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-neutral-600">{brand.minPurchase ? `$${brand.minPurchase}` : 'None'}</p>
                      </td>
                      <td className="p-4">
                        {brand.featured && (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(brand)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBrand(brand.id, brand.name)}
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
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>
                {editingBrand ? 'Edit Brand Partner' : 'Add New Brand Partner'}
              </DialogTitle>
              {editingBrand && (
                <div className="flex items-center gap-2 text-sm">
                  {saveStatus === 'saving' && (
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                      Saving...
                    </div>
                  )}
                  {saveStatus === 'saved' && !hasUnsavedChanges && (
                    <div className="flex items-center gap-1.5 text-green-600">
                      <Check className="w-4 h-4" />
                      Saved
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogDescription>
              {editingBrand 
                ? 'Update brand details. Changes are auto-saved after 2 seconds.' 
                : 'Add a new brand partner to the alliance network.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Logo Upload Section */}
            <div className="space-y-3">
              <Label>Brand Logo</Label>
              <div className="flex items-center gap-4">
                <div className={`w-24 h-24 rounded-lg flex items-center justify-center ${
                  formData.logoType === 'emoji' 
                    ? `bg-gradient-to-br ${formData.color}` 
                    : 'bg-white border-2 border-neutral-200'
                }`}>
                  {formData.logoType === 'emoji' && formData.logo ? (
                    <span className="text-4xl">{formData.logo}</span>
                  ) : logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-contain" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-neutral-300" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <p className="text-xs text-neutral-600">
                    Recommended: 256×256px or 512×512px square PNG with transparent background
                  </p>
                  <p className="text-xs text-neutral-500">Or enter an emoji:</p>
                  <Input
                    placeholder="🏪"
                    value={formData.logoType === 'emoji' ? formData.logo : ''}
                    onChange={(e) => {
                      setFormData({ ...formData, logo: e.target.value, logoType: 'emoji' });
                      setLogoPreview('');
                      setHasUnsavedChanges(true);
                    }}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Brand Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  placeholder="Nike"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => {
                  setFormData({ ...formData, category: value as Category });
                  setHasUnsavedChanges(true);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== 'all').map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  setHasUnsavedChanges(true);
                }}
                placeholder="Brief description of the brand and offerings..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => {
                  setFormData({ ...formData, website: e.target.value });
                  setHasUnsavedChanges(true);
                }}
                placeholder="https://example.com"
              />
            </div>

            {/* Earning Details */}
            <div className="border-t pt-4">
              <h3 className="text-sm mb-4 flex items-center gap-2">
                <Store className="w-4 h-4" />
                Earning Opportunity Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="multiplier">Earn Multiplier *</Label>
                  <Input
                    id="multiplier"
                    type="number"
                    min="1"
                    step="0.1"
                    value={formData.earnMultiplier}
                    onChange={(e) => {
                      setFormData({ ...formData, earnMultiplier: parseFloat(e.target.value) || 1 });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="5"
                  />
                  <p className="text-xs text-neutral-500">NCTR earned per $1 spent</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseEarning">Base Earning Display *</Label>
                  <Input
                    id="baseEarning"
                    value={formData.baseEarning}
                    onChange={(e) => {
                      setFormData({ ...formData, baseEarning: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="5 NCTR per $1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="minPurchase">Min Purchase ($)</Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    min="0"
                    value={formData.minPurchase}
                    onChange={(e) => {
                      setFormData({ ...formData, minPurchase: parseInt(e.target.value) || 0 });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxEarning">Max Earning (Optional)</Label>
                  <Input
                    id="maxEarning"
                    value={formData.maxEarning}
                    onChange={(e) => {
                      setFormData({ ...formData, maxEarning: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="5000 NCTR/month"
                  />
                </div>
              </div>
            </div>

            {/* Visual Settings */}
            <div className="border-t pt-4">
              <h3 className="text-sm mb-4">Visual Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="color">Gradient Color</Label>
                <Select value={formData.color} onValueChange={(value) => {
                  setFormData({ ...formData, color: value });
                  setHasUnsavedChanges(true);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded bg-gradient-to-r ${option.value}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => {
                    setFormData({ ...formData, featured: e.target.checked });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-4 h-4 rounded border-neutral-300"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mark as Featured Brand
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveBrand} className="bg-violet-600 hover:bg-violet-700">
              {editingBrand ? 'Update Brand' : 'Add Brand'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}