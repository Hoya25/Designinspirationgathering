import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ArrowLeft, Package, Ticket, Gift, Code, Lock, Calendar, Sparkles, Trophy, CheckCircle2, AlertCircle, Info, Upload, DollarSign, Users, Clock, Zap, Shield, Eye, Save, FileText, Image as ImageIcon, Link as LinkIcon, Mail, AlertTriangle, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

interface ContributorSubmissionProps {
  onBack: () => void;
}

interface RewardFormData {
  title: string;
  description: string;
  type: string;
  category: string;
  brand: string;
  claimPassCost: string;
  totalSupply: string;
  expirationDays: string;
  redemptionDetails: string;
  // Conditional delivery fields
  deliveryMethod: 'code' | 'email' | 'url' | 'file' | 'wallet' | '';
  rewardCode?: string;
  rewardUrl?: string;
  deliveryEmail?: string;
  treasuryWalletAddress?: string;
  termsAccepted: boolean;
  lockPeriod: '360' | '90';
  // Image upload
  rewardImage?: string;
  rewardImageFile?: File;
}

interface FormErrors {
  [key: string]: string;
}

const REWARD_TYPES = [
  { value: 'access-code', label: 'Access Code', icon: Lock, description: 'Exclusive access to content or services', deliveryMethod: 'code' },
  { value: 'discount-code', label: 'Discount Code', icon: Gift, description: 'Percentage or dollar amount off purchases', deliveryMethod: 'code' },
  { value: 'gift-card', label: 'Gift Card', icon: CreditCard, description: 'Prepaid gift cards or store credit', deliveryMethod: 'code' },
  { value: 'ticket-code', label: 'Ticket Code', icon: Ticket, description: 'Event tickets or passes', deliveryMethod: 'code' },
  { value: 'promo-code', label: 'Promo Code', icon: Code, description: 'Special promotional offers', deliveryMethod: 'code' },
  { value: 'subscription', label: 'Subscription', icon: Calendar, description: 'Recurring access to services', deliveryMethod: 'email' },
  { value: 'token', label: 'Token', icon: Sparkles, description: 'Digital tokens or currency', deliveryMethod: 'wallet' },
  { value: 'nft', label: 'NFT', icon: Trophy, description: 'Non-fungible token collectibles', deliveryMethod: 'wallet' },
];

const CATEGORIES = [
  'Entertainment',
  'Shopping', 
  'Events',
  'Dining',
  'Wellness',
  'Crypto',
  'Digital',
  'Travel',
  'Education',
  'Technology',
];

// Conversion rates for Claim Passes
// NCTR is the token - 360LOCK and 90LOCK refer to days tokens are locked
const CONVERSION_RATES = {
  short_lock: {
    nctr: 75,
    lockDays: 90,
    label: '90-Day Lock'
  },
  long_lock: {
    nctr: 200,
    lockDays: 360,
    label: '360-Day Lock'
  }
};

// Default to long lock rate for display
const CLAIM_PASS_TO_NCTR = CONVERSION_RATES.long_lock.nctr;

export function ContributorSubmission({ onBack }: ContributorSubmissionProps) {
  const [currentStep, setCurrentStep] = useState<'form' | 'preview' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showDraftSaved, setShowDraftSaved] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [hasStartedForm, setHasStartedForm] = useState(false);
  
  const [formData, setFormData] = useState<RewardFormData>({
    title: '',
    description: '',
    type: '',
    category: '',
    brand: '',
    claimPassCost: '',
    totalSupply: '',
    expirationDays: '',
    redemptionDetails: '',
    deliveryMethod: '',
    rewardCode: '',
    rewardUrl: '',
    deliveryEmail: '',
    treasuryWalletAddress: '',
    termsAccepted: false,
    lockPeriod: '360', // Default to 360LOCK
    // Image upload
    rewardImage: '',
    rewardImageFile: undefined,
  });

  const updateFormData = (field: keyof RewardFormData, value: string | boolean | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Mark that user has started interacting with form
    if (!hasStartedForm) {
      setHasStartedForm(true);
    }
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const markFieldAsTouched = (field: string) => {
    setTouchedFields(prev => new Set([...prev, field]));
  };

  const validateField = (field: keyof RewardFormData, value: any): string => {
    switch (field) {
      case 'title':
        if (!value || value.trim().length === 0) return 'Reward title is required';
        if (value.length < 10) return 'Title should be at least 10 characters';
        if (value.length > 100) return 'Title should be less than 100 characters';
        return '';
      case 'description':
        if (!value || value.trim().length === 0) return 'Description is required';
        if (value.length < 20) return 'Description should be at least 20 characters';
        if (value.length > 500) return 'Description should be less than 500 characters';
        return '';
      case 'type':
        if (!value) return 'Please select a reward type';
        return '';
      case 'category':
        if (!value) return 'Please select a category';
        return '';
      case 'brand':
        if (!value || value.trim().length === 0) return 'Brand/Company name is required';
        return '';
      case 'claimPassCost':
        if (!value) return 'Exchange rate is required';
        const cost = parseInt(value);
        if (isNaN(cost) || cost < 1) return 'Exchange rate must be at least 1 Claim Pass';
        if (cost > 100) return 'Exchange rate cannot exceed 100 Claim Passes';
        return '';
      case 'totalSupply':
        if (!value) return 'Quantity is required';
        const supply = parseInt(value);
        if (isNaN(supply) || supply < 1) return 'Quantity must be at least 1';
        if (supply > 10000) return 'Quantity cannot exceed 10,000';
        return '';
      case 'redemptionDetails':
        if (!value || value.trim().length === 0) return 'Redemption details are required';
        if (value.length < 20) return 'Please provide more detailed redemption instructions';
        return '';
      case 'treasuryWalletAddress':
        // Only validate if reward type is token or nft
        if (formData.type === 'token' || formData.type === 'nft') {
          if (!value || value.trim().length === 0) return 'Treasury wallet address is required for token/NFT rewards';
          // Basic validation for wallet address format (0x followed by 40 hex characters)
          if (!/^0x[a-fA-F0-9]{40}$/.test(value.trim())) return 'Please enter a valid wallet address';
        }
        return '';
      case 'termsAccepted':
        if (!value) return 'You must accept the terms and conditions';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate all required fields
    Object.keys(formData).forEach(key => {
      const field = key as keyof RewardFormData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof RewardFormData) => {
    markFieldAsTouched(field);
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const isFormValid = () => {
    const basicValid = formData.title &&
           formData.description &&
           formData.type &&
           formData.category &&
           formData.brand &&
           formData.claimPassCost &&
           formData.totalSupply &&
           formData.redemptionDetails &&
           formData.termsAccepted &&
           Object.keys(errors).length === 0;
    
    // Additional validation for token/NFT rewards
    if (formData.type === 'token' || formData.type === 'nft') {
      return basicValid && formData.treasuryWalletAddress;
    }
    
    return basicValid;
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    
    // Simulate saving draft
    setTimeout(() => {
      setIsSavingDraft(false);
      setShowDraftSaved(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowDraftSaved(false);
      }, 3000);
    }, 1000);
  };

  const handlePreview = () => {
    if (validateForm()) {
      setCurrentStep('preview');
    } else {
      // Mark all fields as touched to show errors
      const allFields = new Set(Object.keys(formData));
      setTouchedFields(allFields);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('success');
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      category: '',
      brand: '',
      claimPassCost: '',
      totalSupply: '',
      expirationDays: '',
      redemptionDetails: '',
      deliveryMethod: '',
      rewardCode: '',
      rewardUrl: '',
      deliveryEmail: '',
      treasuryWalletAddress: '',
      termsAccepted: false,
      lockPeriod: '360',
      // Image upload
      rewardImage: '',
      rewardImageFile: undefined,
    });
    setErrors({});
    setTouchedFields(new Set());
    setCurrentStep('form');
  };

  const selectedType = REWARD_TYPES.find(t => t.value === formData.type);
  const claimPassValue = formData.claimPassCost ? parseInt(formData.claimPassCost) : 0;
  const activeRate = formData.lockPeriod === '360' ? CONVERSION_RATES.long_lock : CONVERSION_RATES.short_lock;
  const nctrValue = claimPassValue * activeRate.nctr;
  const lockDays = activeRate.lockDays;
  const totalPotentialNCTR = formData.totalSupply && formData.claimPassCost 
    ? parseInt(formData.totalSupply) * parseInt(formData.claimPassCost) * activeRate.nctr 
    : 0;

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-white to-green-50">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl mb-4">Reward Submitted Successfully! 🎉</h1>
              <p className="text-neutral-600 mb-2">
                Your reward has been submitted and is now under review.
              </p>
              <p className="text-sm text-neutral-500 mb-8">
                Most rewards are reviewed and approved within 24-48 hours.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 sm:p-6 bg-white rounded-xl border border-neutral-200 text-left">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg mb-1">{formData.title}</h3>
                      <Badge variant="outline">{selectedType?.label}</Badge>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700">Under Review</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-600 mb-1">Exchange Rate</p>
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4 text-violet-600" />
                        <p className="font-medium">{formData.claimPassCost} Claims</p>
                      </div>
                      <p className="text-xs text-violet-600 mt-0.5">{nctrValue.toLocaleString()} NCTR</p>
                      <p className="text-xs text-neutral-500">({lockDays}-day lock)</p>
                    </div>
                    <div>
                      <p className="text-neutral-600 mb-1">Total Supply</p>
                      <p className="font-medium">{formData.totalSupply} rewards</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-600 mb-0.5">Potential Earnings</p>
                        <p className="text-xs text-neutral-500">If all rewards are claimed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl text-green-600 font-semibold">
                          {parseInt(formData.claimPassCost) * parseInt(formData.totalSupply)} <span className="text-sm">Claims</span>
                        </p>
                        <p className="text-xs text-green-700">{totalPotentialNCTR.toLocaleString()} NCTR</p>
                        <p className="text-xs text-neutral-500">({lockDays}-day lock)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-left">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-2">What Happens Next?</p>
                      <ul className="text-neutral-600 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">1.</span>
                          <span>Our team reviews your reward submission for quality and compliance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">2.</span>
                          <span>You'll receive an email notification once approved or if changes are needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">3.</span>
                          <span>Approved rewards appear in the marketplace immediately</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">4.</span>
                          <span>Track claims and earnings in your Contributor Dashboard</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-violet-50 rounded-xl border border-violet-200 text-left">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Quality Standards Reminder</p>
                      <p className="text-neutral-600">
                        High-quality rewards with clear descriptions and fair exchange rates get approved faster and receive more claims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:flex-1 gap-2"
                >
                  <Package className="w-4 h-4" />
                  Submit Another Reward
                </Button>
                <Button 
                  onClick={onBack}
                  className="w-full sm:flex-1 gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <Eye className="w-4 h-4" />
                  View Marketplace
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'preview') {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-neutral-50">
          <div className="bg-white border-b border-neutral-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <Button variant="ghost" onClick={() => setCurrentStep('form')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Edit
              </Button>
              
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-4xl tracking-tight">Preview Your Reward</h1>
                    <p className="text-sm sm:text-base text-neutral-600">Review before submitting to marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Preview Card */}
              <div>
                <h2 className="text-xl mb-4">How Members Will See It</h2>
                <Card className="border-2 border-violet-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="px-3 py-1.5 bg-violet-50 text-violet-600 rounded-lg flex items-center gap-1.5">
                        {selectedType && (() => {
                          const Icon = selectedType.icon;
                          return <Icon className="w-3.5 h-3.5" />;
                        })()}
                        <span className="text-xs font-medium">{selectedType?.label}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 text-xs">New</Badge>
                    </div>
                    
                    <CardTitle className="text-lg mb-2">{formData.title}</CardTitle>
                    <p className="text-sm text-neutral-600">{formData.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {formData.rewardImage && (
                      <div className="mb-3 -mx-6 -mt-3">
                        <img 
                          src={formData.rewardImage} 
                          alt={formData.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Contributor</span>
                      <span className="font-medium">{formData.brand}</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-600 mb-1.5">
                        <span>Available</span>
                        <span>{formData.totalSupply} / {formData.totalSupply}</span>
                      </div>
                      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-full" />
                      </div>
                    </div>

                    {formData.expirationDays && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Clock className="w-4 h-4" />
                        <span>Expires in {formData.expirationDays} days</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-neutral-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-neutral-600 mb-0.5">Exchange Rate</p>
                          <div className="flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-violet-600" />
                            <p className="text-xl">
                              {formData.claimPassCost} <span className="text-sm text-neutral-600">Claims</span>
                            </p>
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">{nctrValue.toLocaleString()} NCTR value</p>
                        </div>
                      </div>

                      <Button className="w-full gap-2 bg-gradient-to-br from-violet-600 to-indigo-600">
                        <Gift className="w-4 h-4" />
                        Claim Reward
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Details Summary */}
              <div>
                <h2 className="text-xl mb-4">Submission Summary</h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Reward Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <p className="text-neutral-600 mb-1">Title</p>
                        <p className="font-medium">{formData.title}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600 mb-1">Description</p>
                        <p className="font-medium">{formData.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-neutral-600 mb-1">Type</p>
                          <p className="font-medium">{selectedType?.label}</p>
                        </div>
                        <div>
                          <p className="text-neutral-600 mb-1">Category</p>
                          <p className="font-medium">{formData.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50">
                    <CardHeader>
                      <CardTitle className="text-base">Value & Economics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-white rounded-lg border border-violet-200">
                          <p className="text-neutral-600 mb-1">Per Claim</p>
                          <div className="flex items-center gap-1">
                            <Ticket className="w-4 h-4 text-violet-600" />
                            <p className="text-lg">{formData.claimPassCost}</p>
                          </div>
                          <p className="text-xs text-violet-600 mt-0.5">{nctrValue.toLocaleString()} NCTR</p>
                          <p className="text-xs text-neutral-500">({lockDays}-day lock)</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-violet-200">
                          <p className="text-neutral-600 mb-1">Total Supply</p>
                          <p className="text-lg">{formData.totalSupply}</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-violet-600 text-white rounded-lg">
                        <p className="text-sm opacity-90 mb-1">Max Potential Earnings</p>
                        <p className="text-2xl mb-1">
                          {parseInt(formData.claimPassCost) * parseInt(formData.totalSupply)} <span className="text-sm">Claims</span>
                        </p>
                        <p className="text-xs opacity-90">{totalPotentialNCTR.toLocaleString()} NCTR</p>
                        <p className="text-xs opacity-75">({lockDays}-day lock)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Redemption Details</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="text-neutral-600">{formData.redemptionDetails}</p>
                      {formData.expirationDays && (
                        <p className="text-neutral-600 mt-2">⏱️ Expires in {formData.expirationDays} days</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Treasury Escrow Info - Only for Token/NFT */}
                  {(formData.type === 'token' || formData.type === 'nft') && formData.treasuryWalletAddress && (
                    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-600" />
                          Escrow Confirmation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div>
                          <p className="text-neutral-600 mb-1">Proof of Transfer</p>
                          <p className="font-mono text-xs bg-white p-2 rounded border border-amber-200 break-all">
                            {formData.treasuryWalletAddress}
                          </p>
                        </div>
                        <p className="text-amber-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          {formData.type === 'token' ? 'Tokens' : 'NFTs'} ready for distribution
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('form')}
                className="w-full sm:flex-1 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Details
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:flex-1 gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-t-white border-white/30 rounded-full" />
                    Submitting for Review...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Submit for Review
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </Button>

              <div className="flex items-center gap-2">
                {showDraftSaved && (
                  <Badge className="bg-green-100 text-green-700 gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3 h-3" />
                    Draft Saved
                  </Badge>
                )}
                <Button 
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft}
                  className="gap-2"
                >
                  {isSavingDraft ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-t-neutral-600 border-neutral-300 rounded-full" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Draft
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl tracking-tight">Submit a Reward</h1>
                <p className="text-sm sm:text-base text-neutral-600">Earn Claims when members claim your reward</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* Conversion Rates Banner */}
          <Card 
            className={`mb-6 border-2 border-violet-300 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 transition-all duration-500 ease-in-out overflow-hidden relative cursor-pointer hover:opacity-100 ${hasStartedForm ? 'max-h-32 opacity-60' : 'max-h-[600px] opacity-100'}`}
            onClick={() => hasStartedForm && setHasStartedForm(false)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg mb-1">Claim Pass Conversion Rates</h3>
                      <p className="text-sm text-neutral-600">Choose between higher NCTR with longer lock or lower NCTR with shorter lock</p>
                    </div>
                    {hasStartedForm && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-violet-600 hover:text-violet-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHasStartedForm(false);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Expand
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* 360-Day Lock Option */}
                <div className="p-4 bg-white rounded-xl border-2 border-violet-300 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-violet-600 text-white">360LOCK Rate</Badge>
                    <Badge variant="outline" className="text-xs">Higher Reward</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <Ticket className="w-5 h-5 text-violet-600 flex-shrink-0" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">1</span>
                      <span className="text-sm text-neutral-600">Claim Pass =</span>
                    </div>
                    <div className="ml-7 p-3 bg-violet-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <span className="text-xl font-bold text-violet-600">{CONVERSION_RATES.long_lock.nctr} NCTR</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Lock className="w-4 h-4 text-blue-500" />
                        <span>Locked for {CONVERSION_RATES.long_lock.lockDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 90-Day Lock Option */}
                <div className="p-4 bg-white rounded-xl border-2 border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-neutral-700">90LOCK Rate</Badge>
                    <Badge variant="outline" className="text-xs">Faster Access</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <Ticket className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                      <span className="text-2xl font-bold text-neutral-700">1</span>
                      <span className="text-sm text-neutral-600">Claim Pass =</span>
                    </div>
                    <div className="ml-7 p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <span className="text-xl font-bold text-neutral-700">{CONVERSION_RATES.short_lock.nctr} NCTR</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Lock className="w-4 h-4 text-blue-500" />
                        <span>Locked for {CONVERSION_RATES.short_lock.lockDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-600">
                    <span className="font-medium text-blue-900">You choose:</span> Select <span className="font-medium text-blue-900">360LOCK</span> to earn {CONVERSION_RATES.long_lock.nctr} NCTR per pass (locked 360 days), or <span className="font-medium text-blue-900">90LOCK</span> to earn {CONVERSION_RATES.short_lock.nctr} NCTR per pass (locked 90 days). Your choice applies to all claims of this reward.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Banner */}
          <Card 
            className={`mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 transition-all duration-500 ease-in-out overflow-hidden relative cursor-pointer hover:opacity-100 ${hasStartedForm ? 'max-h-20 opacity-60' : 'max-h-[400px] opacity-100'}`}
            onClick={() => hasStartedForm && setHasStartedForm(false)}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg">How It Works</h3>
                    {hasStartedForm && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-blue-600 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHasStartedForm(false);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Expand
                      </Button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</div>
                      <p className="text-neutral-600">Submit your reward with an exchange rate in Claims</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</div>
                      <p className="text-neutral-600">Members claim your reward using their Claims</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</div>
                      <p className="text-neutral-600">You receive NCTR tokens with a lock period (360LOCK or 90LOCK)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Details</CardTitle>
                  <CardDescription>Complete all required fields to list your reward in the marketplace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Reward Type Selection */}
                  <div className="space-y-3">
                    <Label>
                      Reward Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {REWARD_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.type === type.value;
                        const hasError = touchedFields.has('type') && errors.type;
                        return (
                          <button
                            key={type.value}
                            onClick={() => {
                              updateFormData('type', type.value);
                              markFieldAsTouched('type');
                            }}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? 'border-violet-600 bg-violet-50'
                                : hasError
                                ? 'border-red-300 bg-red-50'
                                : 'border-neutral-200 hover:border-violet-200'
                            }`}
                          >
                            <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-violet-600' : hasError ? 'text-red-600' : 'text-neutral-600'}`} />
                            <p className="text-sm font-medium mb-1">{type.label}</p>
                            <p className="text-xs text-neutral-500">{type.description}</p>
                          </button>
                        );
                      })}
                    </div>
                    {touchedFields.has('type') && errors.type && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.type}
                      </p>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">
                        Reward Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Premium Streaming 3-Month Access"
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        onBlur={() => handleBlur('title')}
                        className={`mt-1.5 ${touchedFields.has('title') && errors.title ? 'border-red-500' : ''}`}
                      />
                      <p className="text-xs text-neutral-500 mt-1.5">
                        {formData.title.length}/100 characters - Make it clear and appealing
                      </p>
                      {touchedFields.has('title') && errors.title && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">
                        Reward Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what members will receive, key features, and what makes this reward valuable..."
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        onBlur={() => handleBlur('description')}
                        rows={4}
                        className={`mt-1.5 ${touchedFields.has('description') && errors.description ? 'border-red-500' : ''}`}
                      />
                      <p className="text-xs text-neutral-500 mt-1.5">
                        {formData.description.length}/500 characters - Be specific and honest
                      </p>
                      {touchedFields.has('description') && errors.description && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => {
                            updateFormData('category', value);
                            markFieldAsTouched('category');
                          }}
                        >
                          <SelectTrigger className={`mt-1.5 ${touchedFields.has('category') && errors.category ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touchedFields.has('category') && errors.category && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="brand">
                          Brand/Company Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="brand"
                          placeholder="Your brand name"
                          value={formData.brand}
                          onChange={(e) => updateFormData('brand', e.target.value)}
                          onBlur={() => handleBlur('brand')}
                          className={`mt-1.5 ${touchedFields.has('brand') && errors.brand ? 'border-red-500' : ''}`}
                        />
                        {touchedFields.has('brand') && errors.brand && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.brand}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                      <Label htmlFor="reward-image" className="flex items-center gap-2">
                        Reward Image (Optional)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors">
                              <Info className="w-3 h-3 text-neutral-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Upload an image that represents your reward. Supported: JPG, PNG, WebP. Max size: 5MB.</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      
                      <div className="mt-1.5">
                        {formData.rewardImage ? (
                          <div className="relative">
                            <img 
                              src={formData.rewardImage} 
                              alt="Reward preview" 
                              className="w-full h-48 object-cover rounded-xl border-2 border-violet-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateFormData('rewardImage', '');
                                updateFormData('rewardImageFile', undefined);
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg">
                              <p className="font-medium">✓ Image uploaded</p>
                              <p className="opacity-75">Click the X to remove</p>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor="reward-image"
                            className="block w-full p-8 border-2 border-dashed border-neutral-300 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all cursor-pointer"
                          >
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                              <p className="text-sm font-medium text-neutral-700 mb-1">
                                Click to upload reward image
                              </p>
                              <p className="text-xs text-neutral-500">
                                JPG, PNG, or WebP • Max 5MB • Recommended: 1200x630px
                              </p>
                            </div>
                            <input
                              id="reward-image"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Validate file size (5MB max)
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('Image file size must be less than 5MB');
                                    return;
                                  }
                                  
                                  // Validate file type
                                  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
                                  if (!validTypes.includes(file.type)) {
                                    alert('Please upload a JPG, PNG, or WebP image');
                                    return;
                                  }
                                  
                                  // Create preview URL
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    updateFormData('rewardImage', reader.result as string);
                                    updateFormData('rewardImageFile', file);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5">
                        Adding an attractive image increases claim rates by up to 50%!
                      </p>
                    </div>
                  </div>

                  {/* Exchange Rate & Supply */}
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border-2 border-violet-200 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-violet-600" />
                      <h3 className="font-medium">Exchange Rate & Supply</h3>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-violet-200 hover:bg-violet-300 transition-colors">
                            <Info className="w-3 h-3 text-violet-700" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="font-medium mb-1">NCTR Conversion Rates</p>
                          <p className="text-sm mb-1">Choose 360LOCK:</p>
                          <p className="text-xs ml-2">• {CONVERSION_RATES.long_lock.nctr} NCTR per pass, locked for {CONVERSION_RATES.long_lock.lockDays} days</p>
                          <p className="text-sm mt-1 mb-1">Choose 90LOCK:</p>
                          <p className="text-xs ml-2">• {CONVERSION_RATES.short_lock.nctr} NCTR per pass, locked for {CONVERSION_RATES.short_lock.lockDays} days</p>
                          <p className="text-xs mt-2 opacity-80">Select your preferred lock period when setting up your reward</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div>
                      <Label htmlFor="claimPassCost" className="flex items-center gap-2">
                        I will accept <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="relative flex-1">
                          <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-violet-600" />
                          <Input
                            id="claimPassCost"
                            type="number"
                            min="1"
                            max="100"
                            placeholder="1"
                            value={formData.claimPassCost}
                            onChange={(e) => updateFormData('claimPassCost', e.target.value)}
                            onBlur={() => handleBlur('claimPassCost')}
                            className={`pl-10 ${touchedFields.has('claimPassCost') && errors.claimPassCost ? 'border-red-500' : ''}`}
                          />
                        </div>
                        <span className="text-sm text-neutral-600 whitespace-nowrap">Claim(s) for this reward</span>
                      </div>

                      {/* Lock Period Selector */}
                      <div className="mt-3">
                        <Label className="text-sm text-neutral-700 mb-2 block">Choose Your Lock Period</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => updateFormData('lockPeriod', '360')}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${
                              formData.lockPeriod === '360'
                                ? 'border-violet-600 bg-violet-50'
                                : 'border-neutral-200 bg-white hover:border-violet-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.lockPeriod === '360' ? 'border-violet-600' : 'border-neutral-300'
                              }`}>
                                {formData.lockPeriod === '360' && (
                                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                                )}
                              </div>
                              <Badge className="bg-violet-600 text-white text-xs">360LOCK</Badge>
                            </div>
                            <p className="text-sm font-semibold text-neutral-900">200 NCTR</p>
                            <p className="text-xs text-neutral-600">per pass • 360-day lock</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateFormData('lockPeriod', '90')}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${
                              formData.lockPeriod === '90'
                                ? 'border-violet-600 bg-violet-50'
                                : 'border-neutral-200 bg-white hover:border-violet-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.lockPeriod === '90' ? 'border-violet-600' : 'border-neutral-300'
                              }`}>
                                {formData.lockPeriod === '90' && (
                                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                                )}
                              </div>
                              <Badge variant="outline" className="text-neutral-700 text-xs">90LOCK</Badge>
                            </div>
                            <p className="text-sm font-semibold text-neutral-900">75 NCTR</p>
                            <p className="text-xs text-neutral-600">per pass • 90-day lock</p>
                          </button>
                        </div>
                      </div>

                      {formData.claimPassCost && !errors.claimPassCost && (
                        <div className="mt-3 p-4 bg-white rounded-lg border-2 border-violet-300">
                          <p className="text-sm font-medium text-neutral-700 mb-3">Token Equivalent</p>
                          <div className="p-3 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-5 h-5 text-amber-500" />
                              <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                {nctrValue.toLocaleString()} NCTR
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-neutral-500">OR</span>
                              <Lock className="w-4 h-4 text-blue-500" />
                              <p className="font-semibold text-indigo-600">
                                {(claimPassValue * (formData.lockPeriod === '360' ? CONVERSION_RATES.short_lock.nctr : CONVERSION_RATES.long_lock.nctr)).toLocaleString()} {formData.lockPeriod === '360' ? '90' : '360'}LOCK
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-neutral-500 mt-2">
                            {formData.lockPeriod === '360' ? 'You selected: Higher NCTR, 360-day lock period' : 'You selected: Standard NCTR, 90-day lock period'}
                          </p>
                        </div>
                      )}
                      {touchedFields.has('claimPassCost') && errors.claimPassCost && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.claimPassCost}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="totalSupply">
                        Quantity Available <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-violet-600" />
                        <Input
                          id="totalSupply"
                          type="number"
                          min="1"
                          max="10000"
                          placeholder="e.g., 100"
                          value={formData.totalSupply}
                          onChange={(e) => updateFormData('totalSupply', e.target.value)}
                          onBlur={() => handleBlur('totalSupply')}
                          className={`pl-10 ${touchedFields.has('totalSupply') && errors.totalSupply ? 'border-red-500' : ''}`}
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5">
                        Total number of rewards you can fulfill
                      </p>
                      {touchedFields.has('totalSupply') && errors.totalSupply && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.totalSupply}
                        </p>
                      )}
                    </div>

                    {formData.claimPassCost && formData.totalSupply && !errors.claimPassCost && !errors.totalSupply && (
                      <div className="p-4 bg-violet-600 text-white rounded-lg">
                        <p className="text-sm opacity-90 mb-1">Your Maximum Potential Earnings</p>
                        <p className="text-2xl mb-1">
                          {parseInt(formData.claimPassCost) * parseInt(formData.totalSupply)} <span className="text-sm">Claims</span>
                        </p>
                        <p className="text-sm opacity-75">
                          = {totalPotentialNCTR.toLocaleString()} NCTR tokens (if all rewards claimed)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="expirationDays" className="flex items-center gap-2">
                        Expiration Period (Optional)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors">
                              <Info className="w-3 h-3 text-neutral-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>How many days until this reward offer expires and is removed from the marketplace</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="relative mt-1.5">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <Input
                          id="expirationDays"
                          type="number"
                          min="1"
                          placeholder="e.g., 30"
                          value={formData.expirationDays}
                          onChange={(e) => updateFormData('expirationDays', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1.5">
                        Leave empty for no expiration. Limited-time offers create urgency!
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="redemptionDetails">
                        Redemption Instructions <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="redemptionDetails"
                        placeholder="Explain how members will receive and redeem this reward. Be clear and specific about the delivery process, timeline, and any steps they need to take..."
                        value={formData.redemptionDetails}
                        onChange={(e) => updateFormData('redemptionDetails', e.target.value)}
                        onBlur={() => handleBlur('redemptionDetails')}
                        rows={4}
                        className={`mt-1.5 ${touchedFields.has('redemptionDetails') && errors.redemptionDetails ? 'border-red-500' : ''}`}
                      />
                      <p className="text-xs text-neutral-500 mt-1.5">
                        Example: "Access code will be sent to your email within 24 hours. Visit our website and enter the code to activate."
                      </p>
                      {touchedFields.has('redemptionDetails') && errors.redemptionDetails && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.redemptionDetails}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Treasury Wallet Address - Only for Token/NFT rewards */}
                  {(formData.type === 'token' || formData.type === 'nft') && (
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 space-y-4">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-900 mb-1">Escrow Requirement</h3>
                          <p className="text-sm text-amber-800">
                            For {formData.type === 'token' ? 'token' : 'NFT'} rewards, you must send your {formData.type === 'token' ? 'tokens' : 'NFTs'} to the Crescendo Treasury wallet to be held in escrow. They will be automatically distributed to members when they claim.
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="treasuryWalletAddress" className="flex items-center gap-2">
                          Treasury Wallet Address <span className="text-red-500">*</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-200 hover:bg-amber-300 transition-colors">
                                <Info className="w-3 h-3 text-amber-700" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="font-medium mb-2">How Escrow Works</p>
                              <ol className="text-sm space-y-1 list-decimal list-inside">
                                <li>Send your {formData.type === 'token' ? 'tokens' : 'NFTs'} to the address shown</li>
                                <li>We hold them securely in escrow</li>
                                <li>When members claim, we automatically distribute</li>
                                <li>You earn NCTR for each successful claim</li>
                              </ol>
                            </TooltipContent>
                          </Tooltip>
                        </Label>
                        
                        <div className="mt-3 p-3 bg-white rounded-lg border border-amber-200">
                          <p className="text-xs text-amber-800 mb-2 font-medium">Send {formData.totalSupply || 'your'} {formData.type === 'token' ? 'tokens' : 'NFTs'} to:</p>
                          <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded font-mono text-sm break-all">
                            <span className="text-neutral-700">0xCRESCENDO1234567890TREASURY0WALLET0</span>
                          </div>
                          <p className="text-xs text-amber-700 mt-2">⚠️ Base network only • Verify address before sending</p>
                        </div>

                        <div className="relative mt-3">
                          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600" />
                          <Input
                            id="treasuryWalletAddress"
                            type="text"
                            placeholder="Paste transaction hash or wallet address you sent from..."
                            value={formData.treasuryWalletAddress}
                            onChange={(e) => updateFormData('treasuryWalletAddress', e.target.value)}
                            onBlur={() => handleBlur('treasuryWalletAddress')}
                            className={`pl-10 ${touchedFields.has('treasuryWalletAddress') && errors.treasuryWalletAddress ? 'border-red-500' : ''}`}
                          />
                        </div>
                        <p className="text-xs text-amber-700 mt-1.5">
                          Paste your wallet address or transaction hash as proof of transfer
                        </p>
                        {touchedFields.has('treasuryWalletAddress') && errors.treasuryWalletAddress && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.treasuryWalletAddress}
                          </p>
                        )}
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-900">
                          <p className="font-medium mb-1">Why Escrow?</p>
                          <p>This ensures members receive their {formData.type === 'token' ? 'tokens' : 'NFTs'} instantly when they claim, creating trust and improving the experience for everyone in the Crescendo community.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="p-4 bg-neutral-50 rounded-xl border-2 border-neutral-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => {
                          updateFormData('termsAccepted', e.target.checked);
                          markFieldAsTouched('termsAccepted');
                        }}
                        className={`mt-1 ${touchedFields.has('termsAccepted') && errors.termsAccepted ? 'border-red-500' : ''}`}
                      />
                      <div>
                        <label htmlFor="terms" className="text-sm text-neutral-600 cursor-pointer">
                          <span className="font-medium">I confirm that:</span>
                          <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>I have the legal right to distribute this reward</li>
                            <li>I will fulfill all claimed rewards promptly as described</li>
                            <li>The reward description is accurate and not misleading</li>
                            <li>I understand Claims convert to NCTR tokens with lock periods (360LOCK or 90LOCK)</li>
                          </ul>
                        </label>
                        {touchedFields.has('termsAccepted') && errors.termsAccepted && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                            <AlertCircle className="w-4 h-4" />
                            {errors.termsAccepted}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Checklist */}
              <Card className="border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50">
                <CardHeader>
                  <CardTitle className="text-base">Submission Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <ProgressItem completed={!!formData.type && !errors.type} label="Select reward type" />
                  <ProgressItem completed={!!formData.title && !!formData.description && !errors.title && !errors.description} label="Add title & description" />
                  <ProgressItem completed={!!formData.category && !!formData.brand && !errors.category && !errors.brand} label="Set category & brand" />
                  <ProgressItem completed={!!formData.claimPassCost && !!formData.totalSupply && !errors.claimPassCost && !errors.totalSupply} label="Define pricing & supply" />
                  <ProgressItem completed={!!formData.redemptionDetails && !errors.redemptionDetails} label="Add redemption details" />
                  {(formData.type === 'token' || formData.type === 'nft') && (
                    <ProgressItem completed={!!formData.treasuryWalletAddress && !errors.treasuryWalletAddress} label="Send to treasury escrow" />
                  )}
                  <ProgressItem completed={formData.termsAccepted} label="Accept terms" />
                </CardContent>
              </Card>

              {/* Value Calculator */}
              {formData.claimPassCost && formData.totalSupply && (
                <Card className="border-2 border-green-200 bg-gradient-to-br from-white to-green-50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      Earnings Preview
                    </CardTitle>
                    <Badge className={`text-xs w-fit mt-1 ${formData.lockPeriod === '360' ? 'bg-violet-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}>
                      {formData.lockPeriod}LOCK Rate
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="text-neutral-600 mb-1">Per Claim</p>
                      <p className="text-xl font-semibold">{formData.claimPassCost} Claims</p>
                      <div className="mt-2 p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold text-green-700">{nctrValue.toLocaleString()} NCTR</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <Lock className="w-3.5 h-3.5 text-blue-500" />
                          <span>Locked for {lockDays} days</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-green-200">
                      <p className="text-neutral-600 mb-1">If All {formData.totalSupply} Claimed</p>
                      <p className="text-2xl font-semibold text-green-600">
                        {parseInt(formData.claimPassCost) * parseInt(formData.totalSupply)} Claims
                      </p>
                      <div className="mt-2 p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold text-green-700">{totalPotentialNCTR.toLocaleString()} NCTR</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <Lock className="w-3.5 h-3.5 text-blue-500" />
                          <span>Locked for {lockDays} days</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-green-200">
                      <p className="text-xs text-neutral-500">
                        {formData.lockPeriod === '360' ? '360-day lock period selected' : '90-day lock period selected'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quality Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Quality Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-neutral-600 space-y-2">
                  <p>✓ Clear, specific titles get 3x more claims</p>
                  <p>✓ Detailed descriptions build trust</p>
                  <p>✓ Fair pricing attracts more members</p>
                  <p>✓ Quick fulfillment earns better ratings</p>
                </CardContent>
              </Card>

              {/* Contributor Protection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-600" />
                    Contributor Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-neutral-600 space-y-2">
                  <p>✓ Claims held in escrow</p>
                  <p>✓ Dispute resolution support</p>
                  <p>✓ Rating system protects reputation</p>
                  <p>✓ Automatic claim tracking</p>
                </CardContent>
              </Card>

              {/* Preview Button */}
              <Button
                onClick={handlePreview}
                disabled={!isFormValid()}
                className="w-full gap-2 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye className="w-4 h-4" />
                {isFormValid() ? 'Preview & Submit' : 'Complete Required Fields'}
              </Button>

              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-900 font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? 's' : ''} need{Object.keys(errors).length === 1 ? 's' : ''} attention
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </TooltipProvider>
    );
}

// Progress Item Component
function ProgressItem({ completed, label }: { completed: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 ${completed ? 'text-green-600' : 'text-neutral-400'}`}>
      {completed ? (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 border-2 border-current rounded-full flex-shrink-0" />
      )}
      <span>{label}</span>
    </div>
  );
}