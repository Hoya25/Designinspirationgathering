import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { RewardsPool } from "./components/RewardsPool";
import { EarnNCTR } from "./components/EarnNCTR";
import { AdminPanel } from "./components/AdminPanel";
import { AdminRewardsManagement } from "./components/AdminRewardsManagement";
import { AdminBrandsManagement } from "./components/AdminBrandsManagement";
import { AdminExternalEarnManagement } from "./components/AdminExternalEarnManagement";
import { AdminExchangeRateManagement } from "./components/AdminExchangeRateManagement";
import { StatusLevelsPage } from "./components/StatusLevelsPage";
import { LevelDetailPage } from "./components/LevelDetailPage";
import { MemberProfile } from "./components/MemberProfile";
import { BrandPartnersPage } from "./components/BrandPartnersPage";
import { LevelUpPage } from "./components/LevelUpPage";
import { ExternalEarnPage } from "./components/ExternalEarnPage";
import { RewardsMarketplace } from "./components/RewardsMarketplace";
import { ContributorSubmission } from "./components/ContributorSubmission";
import { AuthModal } from "./components/AuthModal";
import { LockTokensModal } from "./components/LockTokensModal";
import { ClaimAccessPassModal } from "./components/ClaimAccessPassModal";
import { LevelUpModal } from "./components/LevelUpModal";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "landing"
    | "dashboard"
    | "rewards"
    | "earn"
    | "admin"
    | "admin-rewards"
    | "admin-brands"
    | "admin-external-earn"
    | "admin-exchange-rate"
    | "status-levels"
    | "level-detail"
    | "profile"
    | "brand-partners"
    | "level-up"
    | "external-earn"
    | "marketplace"
    | "contributor-submit"
  >("marketplace");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">(
    "signup",
  );
  const [showLockModal, setShowLockModal] = useState(false);
  const [
    showClaimAccessPassModal,
    setShowClaimAccessPassModal,
  ] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] =
    useState(false);

  // Mock auth state and user data
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Start authenticated for demo purposes
  const [walletConnected, setWalletConnected] = useState(false);
  const [userData, setUserData] = useState({
    level: 2,
    lockedNCTR: 15000,
    availableNCTR: 5420,
  });

  const handleAuth = (email: string, password: string) => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setCurrentView("dashboard");
  };

  const handleWalletAuth = () => {
    setIsAuthenticated(true);
    setWalletConnected(true);
    setShowAuthModal(false);
    setCurrentView("dashboard");
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setWalletConnected(false);
    setCurrentView("landing");
  };

  const handleEarnNCTR = () => {
    console.log("Navigating to Earn NCTR page");
    setCurrentView("earn");
  };

  const handleCommitNCTR = (amount: number) => {
    setUserData({
      ...userData,
      lockedNCTR: userData.lockedNCTR + amount,
      availableNCTR: userData.availableNCTR - amount,
    });
  };

  const handlePurchaseNCTR = (amount: number) => {
    setUserData({
      ...userData,
      lockedNCTR: userData.lockedNCTR + amount,
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        {currentView === "landing" && (
          <LandingPage
            onJoin={() => {
              setAuthMode("signup");
              setShowAuthModal(true);
            }}
            onViewRewards={() => setCurrentView("marketplace")}
            onSignIn={() => {
              setAuthMode("signin");
              setShowAuthModal(true);
            }}
            onViewLevelDetail={(level) => {
              setSelectedLevel(level);
              setCurrentView("level-detail");
            }}
          />
        )}

        {currentView === "dashboard" && isAuthenticated && (
          <Dashboard
            walletConnected={walletConnected}
            onConnectWallet={handleConnectWallet}
            onLockTokens={() => setShowLockModal(true)}
            onClaimNFT={() => setShowClaimAccessPassModal(true)}
            onViewRewards={() => setCurrentView("marketplace")}
            onEarnNCTR={handleEarnNCTR}
            onSignOut={handleSignOut}
            onLevelUp={() => setCurrentView("level-up")}
            onAdminRewards={() =>
              setCurrentView("admin-rewards")
            }
            onAdminBrands={() => setCurrentView("admin-brands")}
            onAdminExternalEarn={() =>
              setCurrentView("admin-external-earn")
            }
            onAdminExchangeRate={() =>
              setCurrentView("admin-exchange-rate")
            }
            onViewStatusLevels={() =>
              setCurrentView("status-levels")
            }
            onViewProfile={() => setCurrentView("profile")}
            onViewBrandPartners={() =>
              setCurrentView("brand-partners")
            }
            onViewMarketplace={() =>
              setCurrentView("marketplace")
            }
          />
        )}

        {currentView === "rewards" && (
          <RewardsPool
            isAuthenticated={isAuthenticated}
            walletConnected={walletConnected}
            onBack={() =>
              setCurrentView(
                isAuthenticated ? "dashboard" : "landing",
              )
            }
            onConnectWallet={handleConnectWallet}
            onNavigateToStatus={() =>
              setCurrentView("status-levels")
            }
            onNavigateToBrands={() =>
              setCurrentView("brand-partners")
            }
          />
        )}

        {currentView === "earn" && (
          <EarnNCTR
            isAuthenticated={isAuthenticated}
            onBack={() =>
              setCurrentView(
                isAuthenticated ? "dashboard" : "landing",
              )
            }
            onNavigateToRewards={() =>
              setCurrentView("rewards")
            }
            onNavigateToStatus={() =>
              setCurrentView("status-levels")
            }
            onNavigateToBrands={() =>
              setCurrentView("brand-partners")
            }
          />
        )}

        {currentView === "admin" && (
          <AdminPanel
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "admin-rewards" && (
          <AdminRewardsManagement
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "admin-brands" && (
          <AdminBrandsManagement
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "admin-external-earn" && (
          <AdminExternalEarnManagement
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "admin-exchange-rate" && (
          <AdminExchangeRateManagement
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "status-levels" && (
          <StatusLevelsPage
            onBack={() => setCurrentView("dashboard")}
            currentLevel={userData.level}
            onNavigateToRewards={() =>
              setCurrentView("rewards")
            }
            onNavigateToBrands={() =>
              setCurrentView("brand-partners")
            }
          />
        )}

        {currentView === "level-detail" && (
          <LevelDetailPage
            onBack={() => setCurrentView("landing")}
            level={selectedLevel}
          />
        )}

        {currentView === "profile" && (
          <MemberProfile
            onBack={() => setCurrentView("dashboard")}
            walletConnected={walletConnected}
            onConnectWallet={handleConnectWallet}
            onNavigateToRewards={() =>
              setCurrentView("rewards")
            }
            onNavigateToStatus={() =>
              setCurrentView("status-levels")
            }
            onNavigateToBrands={() =>
              setCurrentView("brand-partners")
            }
          />
        )}

        {currentView === "brand-partners" && (
          <BrandPartnersPage
            onBack={() => setCurrentView("dashboard")}
            userMultiplier="1.25x"
            onNavigateToRewards={() =>
              setCurrentView("rewards")
            }
            onNavigateToStatus={() =>
              setCurrentView("status-levels")
            }
          />
        )}

        {currentView === "level-up" && (
          <LevelUpPage
            onBack={() => setCurrentView("dashboard")}
            onNavigateToEarnExternal={() =>
              setCurrentView("external-earn")
            }
            currentLevel={userData.level}
            lockedNCTR={userData.lockedNCTR}
            availableNCTR={userData.availableNCTR}
            onPurchase={(levelIndex) => {
              // Handle purchase - update user data based on level purchased
              const tier = [0, 1000, 2500, 5000, 10000, 25000][
                levelIndex
              ];
              handlePurchaseNCTR(tier);
              setUserData({ ...userData, level: levelIndex });
            }}
          />
        )}

        {currentView === "external-earn" && (
          <ExternalEarnPage
            onBack={() => setCurrentView("level-up")}
            isAdmin={true}
            onManageLinks={() =>
              setCurrentView("admin-external-earn")
            }
          />
        )}

        {currentView === "marketplace" && (
          <RewardsMarketplace
            onBack={() => setCurrentView("dashboard")}
            onContributorMode={() =>
              setCurrentView("contributor-submit")
            }
            userClaimPassBalance={5}
          />
        )}

        {currentView === "contributor-submit" && (
          <ContributorSubmission
            onBack={() => setCurrentView("marketplace")}
          />
        )}

        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onAuth={handleAuth}
            onWalletAuth={handleWalletAuth}
            onClose={() => setShowAuthModal(false)}
            onToggleMode={() =>
              setAuthMode(
                authMode === "signin" ? "signup" : "signin",
              )
            }
          />
        )}

        {showLockModal && (
          <LockTokensModal
            onClose={() => setShowLockModal(false)}
            onSuccess={() => {
              setShowLockModal(false);
            }}
          />
        )}

        {showClaimAccessPassModal && (
          <ClaimAccessPassModal
            walletConnected={walletConnected}
            onConnectWallet={handleConnectWallet}
            onClose={() => setShowClaimAccessPassModal(false)}
          />
        )}

        {showLevelUpModal && (
          <LevelUpModal
            currentLevel={userData.level}
            lockedNCTR={userData.lockedNCTR}
            availableNCTR={userData.availableNCTR}
            onClose={() => setShowLevelUpModal(false)}
            onCommit={handleCommitNCTR}
            onPurchase={handlePurchaseNCTR}
          />
        )}

        <Toaster />
      </div>
    </ThemeProvider>
  );
}