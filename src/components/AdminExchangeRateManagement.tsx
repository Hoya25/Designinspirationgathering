import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Package, Activity, AlertTriangle, CheckCircle2, Info, Calendar, Clock, Shield, FileText, Eye, Calculator, LineChart, Zap, History, Edit, Lock } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AdminExchangeRateManagementProps {
  onBack: () => void;
}

interface ExchangeRateHistory {
  id: number;
  rate: number;
  effectiveDate: string;
  updatedBy: string;
  reason: string;
  impactedContributors: number;
  impactedRewards: number;
}

interface Transaction {
  id: number;
  timestamp: string;
  rewardTitle: string;
  contributor: string;
  claimPasses: number;
  nctrValue: number;
  type: 'claim' | 'earn';
}

const CURRENT_RATE = 100; // 1 Claim Pass = 100 NCTR

const EXCHANGE_HISTORY: ExchangeRateHistory[] = [
  {
    id: 1,
    rate: 100,
    effectiveDate: '2025-01-15',
    updatedBy: 'Admin Team',
    reason: 'Platform launch rate',
    impactedContributors: 0,
    impactedRewards: 0,
  },
];

const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    timestamp: '2025-11-15 14:32:00',
    rewardTitle: 'Premium Streaming 3-Month Access',
    contributor: 'StreamMax',
    claimPasses: 2,
    nctrValue: 200,
    type: 'earn',
  },
  {
    id: 2,
    timestamp: '2025-11-15 14:15:00',
    rewardTitle: '$25 Dining Credit',
    contributor: 'Restaurant Group',
    claimPasses: 1,
    nctrValue: 100,
    type: 'earn',
  },
  {
    id: 3,
    timestamp: '2025-11-15 13:48:00',
    rewardTitle: 'Premium Fitness App - Annual',
    contributor: 'FitLife Pro',
    claimPasses: 3,
    nctrValue: 300,
    type: 'earn',
  },
  {
    id: 4,
    timestamp: '2025-11-15 13:22:00',
    rewardTitle: '50% Off Next Purchase',
    contributor: 'Fashion Forward',
    claimPasses: 1,
    nctrValue: 100,
    type: 'earn',
  },
  {
    id: 5,
    timestamp: '2025-11-15 12:55:00',
    rewardTitle: '100 Reward Tokens',
    contributor: 'Crypto Rewards Inc.',
    claimPasses: 2,
    nctrValue: 200,
    type: 'earn',
  },
];

export function AdminExchangeRateManagement({ onBack }: AdminExchangeRateManagementProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newRate, setNewRate] = useState(CURRENT_RATE.toString());
  const [effectiveDate, setEffectiveDate] = useState('');
  const [updateReason, setUpdateReason] = useState('');
  const [calculatorPasses, setCalculatorPasses] = useState('1');
  const [showChangeLog, setShowChangeLog] = useState(false);

  const totalCirculatingPasses = 1247;
  const totalNCTRRepresented = totalCirculatingPasses * CURRENT_RATE;
  const activeRewards = 8;
  const activeContributors = 6;
  const pendingRewards = 3;

  const newRateNum = parseFloat(newRate) || 0;
  const rateDifference = newRateNum - CURRENT_RATE;
  const percentageChange = ((rateDifference / CURRENT_RATE) * 100).toFixed(2);
  const totalValueImpact = totalCirculatingPasses * rateDifference;

  const handleUpdateClick = () => {
    if (newRateNum > 0 && effectiveDate && updateReason) {
      setShowUpdateModal(false);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmUpdate = () => {
    // Simulate update
    setShowConfirmModal(false);
    setShowUpdateModal(false);
    setNewRate(CURRENT_RATE.toString());
    setEffectiveDate('');
    setUpdateReason('');
  };

  const calculatorNCTR = (parseFloat(calculatorPasses) || 0) * CURRENT_RATE;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl tracking-tight">Exchange Rate Management</h1>
              <p className="text-sm sm:text-base text-neutral-600">Control the Claim Pass to NCTR token conversion rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Current Rate - Prominent Display */}
        <Card className="mb-8 border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <p className="text-sm font-medium text-amber-900">Current Exchange Rate</p>
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    1
                  </p>
                  <p className="text-xl sm:text-2xl text-neutral-600">Claim Pass</p>
                  <p className="text-2xl sm:text-3xl text-neutral-400">=</p>
                  <p className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {CURRENT_RATE}
                  </p>
                  <p className="text-xl sm:text-2xl text-neutral-600">NCTR</p>
                </div>
                <p className="text-sm text-neutral-600">
                  Last updated: January 15, 2025 • By: Admin Team
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowChangeLog(true)}
                  className="gap-2 w-full sm:w-auto"
                >
                  <History className="w-4 h-4" />
                  View History
                </Button>
                <Button
                  onClick={() => setShowUpdateModal(true)}
                  className="gap-2 bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 w-full sm:w-auto"
                >
                  <Edit className="w-4 h-4" />
                  Update Rate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Circulating Passes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-1">{totalCirculatingPasses.toLocaleString()}</p>
              <p className="text-sm text-neutral-600">Total in circulation</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                NCTR Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-1">{totalNCTRRepresented.toLocaleString()}</p>
              <p className="text-sm text-neutral-600">Total NCTR represented</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-violet-600" />
                Active Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-1">{activeRewards}</p>
              <p className="text-sm text-neutral-600">{pendingRewards} pending approval</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-1">{activeContributors}</p>
              <p className="text-sm text-neutral-600">Active contributors</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Transactions
                  </CardTitle>
                  <Badge variant="outline">{RECENT_TRANSACTIONS.length} recent</Badge>
                </div>
                <CardDescription>Latest Claim Pass exchanges in the marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {RECENT_TRANSACTIONS.map(tx => (
                    <div key={tx.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-violet-200 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium mb-1 truncate">{tx.rewardTitle}</p>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Users className="w-3.5 h-3.5" />
                            <span className="truncate">{tx.contributor}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 whitespace-nowrap">
                          +{tx.claimPasses} Passes
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs">{tx.timestamp}</span>
                        </div>
                        <p className="text-xs font-medium text-violet-600">
                          {tx.nctrValue} NCTR value
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contributor Calculator Tool */}
          <div>
            <Card className="border-2 border-violet-200 bg-gradient-to-br from-white to-violet-50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-violet-600" />
                  Earnings Calculator
                </CardTitle>
                <CardDescription>For contributor education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="calc-passes">Claim Passes</Label>
                  <Input
                    id="calc-passes"
                    type="number"
                    min="1"
                    value={calculatorPasses}
                    onChange={(e) => setCalculatorPasses(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div className="p-4 bg-violet-600 text-white rounded-xl">
                  <p className="text-sm opacity-90 mb-1">NCTR Value</p>
                  <p className="text-3xl font-bold">{calculatorNCTR.toLocaleString()}</p>
                  <p className="text-xs opacity-75 mt-1">NCTR tokens</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-violet-200">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">How it works</p>
                      <p className="text-neutral-600 text-xs">
                        When members claim your rewards, you receive Claim Passes. Each pass converts to {CURRENT_RATE} NCTR tokens, which you can use in the ecosystem or convert.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Eye className="w-4 h-4" />
                  Share with Contributors
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Exchange Rate Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Historical Exchange Rate
            </CardTitle>
            <CardDescription>Track how the exchange rate has changed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300 text-center">
              <LineChart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-2">Exchange rate visualization</p>
              <p className="text-sm text-neutral-500">
                Currently showing: 1 Claim Pass = {CURRENT_RATE} NCTR (constant since launch)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Audit Trail
            </CardTitle>
            <CardDescription>Complete changelog of exchange rate modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {EXCHANGE_HISTORY.map((record, index) => (
                <div key={record.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={index === 0 ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'}>
                          {index === 0 ? 'Current' : 'Historical'}
                        </Badge>
                        <p className="text-sm font-medium">1 Pass = {record.rate} NCTR</p>
                      </div>
                      <p className="text-sm text-neutral-600 mb-1">{record.reason}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Effective: {record.effectiveDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>By: {record.updatedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-600 mb-1">Impact</p>
                      <p className="text-xs text-neutral-500">{record.impactedContributors} contributors</p>
                      <p className="text-xs text-neutral-500">{record.impactedRewards} rewards</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Rate Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Exchange Rate</DialogTitle>
            <DialogDescription>
              Set a new exchange rate for Claim Pass to NCTR token conversion
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Warning Banner */}
            <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Important Notice</p>
                  <p className="text-sm text-amber-700">
                    Changing the exchange rate affects all contributors and the value of circulating Claim Passes. This action requires careful consideration and proper communication.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-rate">New Exchange Rate (NCTR per 1 Claim Pass)</Label>
                <Input
                  id="new-rate"
                  type="number"
                  min="1"
                  step="1"
                  placeholder={CURRENT_RATE.toString()}
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="effective-date">Effective Date</Label>
                <Input
                  id="effective-date"
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="mt-1.5"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason for Change (Required)</Label>
                <textarea
                  id="reason"
                  value={updateReason}
                  onChange={(e) => setUpdateReason(e.target.value)}
                  placeholder="Explain the rationale for this rate change..."
                  className="mt-1.5 w-full min-h-24 px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Impact Preview */}
            {newRateNum > 0 && newRateNum !== CURRENT_RATE && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Impact Preview
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-600 mb-1">Rate Change</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">
                        {rateDifference > 0 ? '+' : ''}{rateDifference} NCTR
                      </p>
                      {rateDifference > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={rateDifference > 0 ? 'text-green-600' : 'text-red-600'}>
                        {percentageChange}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-1">Total Value Impact</p>
                    <p className="font-semibold text-lg">
                      {totalValueImpact > 0 ? '+' : ''}{totalValueImpact.toLocaleString()} NCTR
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-1">Active Contributors Affected</p>
                    <p className="font-semibold">{activeContributors} contributors</p>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-1">Active Rewards Affected</p>
                    <p className="font-semibold">{activeRewards} rewards</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateClick}
              disabled={!newRateNum || newRateNum === CURRENT_RATE || !effectiveDate || !updateReason}
              className="gap-2 bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <CheckCircle2 className="w-4 h-4" />
              Preview Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              Confirm Exchange Rate Update
            </DialogTitle>
            <DialogDescription>
              This is a critical action that affects the entire platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">Final Confirmation Required</p>
                  <p className="text-sm text-red-700">
                    You are about to change the exchange rate from {CURRENT_RATE} NCTR to {newRateNum} NCTR per Claim Pass. This will affect {activeContributors} contributors and {activeRewards} active rewards.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <h4 className="font-medium mb-3">Change Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Current Rate:</span>
                  <span className="font-medium">{CURRENT_RATE} NCTR / Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">New Rate:</span>
                  <span className="font-medium text-amber-600">{newRateNum} NCTR / Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Effective Date:</span>
                  <span className="font-medium">{effectiveDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Impact:</span>
                  <span className="font-medium">{activeContributors} contributors, {activeRewards} rewards</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Next Steps</p>
                  <ul className="text-neutral-600 space-y-1 list-disc list-inside">
                    <li>All contributors will be notified via email</li>
                    <li>Change will be logged in audit trail</li>
                    <li>Platform-wide announcement will be posted</li>
                    <li>Calculator tools will update automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpdate}
              className="gap-2 bg-red-600 hover:bg-red-700"
            >
              <Lock className="w-4 h-4" />
              Confirm Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Log Modal */}
      <Dialog open={showChangeLog} onOpenChange={setShowChangeLog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Exchange Rate History
            </DialogTitle>
            <DialogDescription>
              Complete timeline of all exchange rate changes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {EXCHANGE_HISTORY.map((record, index) => (
              <div key={record.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={index === 0 ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'}>
                        {index === 0 ? 'Current' : 'Historical'}
                      </Badge>
                      <p className="font-semibold">1 Claim Pass = {record.rate} NCTR</p>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{record.reason}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Effective: {record.effectiveDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Updated by: {record.updatedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 mb-1">Impacted</p>
                    <p className="text-sm font-medium">{record.impactedContributors} contributors</p>
                    <p className="text-sm font-medium">{record.impactedRewards} rewards</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowChangeLog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
