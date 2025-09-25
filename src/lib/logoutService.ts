import { authApi } from './api';
import { resetUser } from '@/redux/authSlice';
import { persistor } from '@/redux';
import toast from 'react-hot-toast';

export interface LogoutOptions {
  showConfirmation?: boolean;
  redirectTo?: string;
  showToast?: boolean;
}

export class LogoutService {
  /**
   * Performs a complete logout process including API call, state cleanup, and navigation
   */
  static async logout(options: LogoutOptions = {}): Promise<void> {
    const {
      showConfirmation = true,
      redirectTo = '/sign-in',
      showToast = true
    } = options;

    try {
      // Show confirmation dialog if requested
      if (showConfirmation) {
        const confirmed = await this.createLogoutConfirmationDialog();
        if (!confirmed) return;
      }

      // Show loading toast
      if (showToast) {
        toast.loading('Logging out...', { id: 'logout' });
      }

      // Call logout API
      try {
        const response = await authApi.logout();
        if (showToast) {
          toast.success(response.message || 'Logged out successfully', { id: 'logout' });
        }
      } catch (error: unknown) {
        // Handle API errors gracefully
        const isAxiosError = error && typeof error === 'object' && 'response' in error;
        const status = isAxiosError ? (error as { response?: { status?: number } }).response?.status : undefined;
        
        if (status === 401) {
          // User is already unauthenticated, which is fine for logout
          if (showToast) {
            toast.success('Logged out successfully', { id: 'logout' });
          }
        } else {
          // Other API errors - still proceed with local logout
          console.warn('Logout API error:', error);
          if (showToast) {
            toast.error('Logout API error, but logged out locally', { id: 'logout' });
          }
        }
      }

      // Clear Redux state
      resetUser();

      // Clear persisted state
      await persistor.purge();

      // Clear any other local storage items
      this.clearLocalStorage();

      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }

    } catch (error) {
      console.error('Logout error:', error);
      if (showToast) {
        toast.error('An error occurred during logout', { id: 'logout' });
      }
      
      // Force logout even if there's an error
      resetUser();
      await persistor.purge();
      this.clearLocalStorage();
      
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
    }
  }

  /**
   * Shows a confirmation dialog for logout
   */
  private static showLogoutConfirmation(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.confirm) {
        const confirmed = window.confirm(
          'Are you sure you want to logout? You will need to sign in again to access the dashboard.'
        );
        resolve(confirmed);
      } else {
        // Fallback for environments without confirm dialog
        resolve(true);
      }
    });
  }

  /**
   * Creates a logout confirmation dialog element
   */
  static createLogoutConfirmationDialog(): Promise<boolean> {
    return new Promise((resolve) => {
      // Create modal backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50';
      
      // Create modal content
      const modal = document.createElement('div');
      modal.className = 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6';
      
      modal.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Confirm Logout</h3>
          <button id="cancel-btn" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="mb-6">
          <p class="text-gray-600">Are you sure you want to logout? You will need to sign in again to access the dashboard.</p>
        </div>
        <div class="flex gap-3 justify-end">
          <button id="cancel-btn-2" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button id="confirm-btn" class="px-4 py-2 bg-[#F6805C] text-white rounded-lg hover:bg-[#e6734a] transition-colors">
            Logout
          </button>
        </div>
      `;
      
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);
      
      // Add event listeners
      const handleCancel = () => {
        document.body.removeChild(backdrop);
        resolve(false);
      };
      
      const handleConfirm = () => {
        document.body.removeChild(backdrop);
        resolve(true);
      };
      
      document.getElementById('cancel-btn')?.addEventListener('click', handleCancel);
      document.getElementById('cancel-btn-2')?.addEventListener('click', handleCancel);
      document.getElementById('confirm-btn')?.addEventListener('click', handleConfirm);
      
      // Close on backdrop click
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          handleCancel();
        }
      });
    });
  }

  /**
   * Clears all local storage items related to the application
   */
  private static clearLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        // Clear all localStorage items that start with our app prefix
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('persist:') || key.includes('bible') || key.includes('admin'))) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
      } catch (error) {
        console.warn('Error clearing localStorage:', error);
      }
    }
  }

  /**
   * Force logout without API call (for cases like token expiration)
   */
  static async forceLogout(reason: string = 'Session expired'): Promise<void> {
    try {
      toast.error(reason, { id: 'force-logout' });
      
      // Clear Redux state
      resetUser();
      
      // Clear persisted state
      await persistor.purge();
      
      // Clear local storage
      this.clearLocalStorage();
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    } catch (error) {
      console.error('Force logout error:', error);
      // Even if there's an error, try to redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
  }

  /**
   * Silent logout without user interaction (for background cleanup)
   */
  static async silentLogout(): Promise<void> {
    try {
      // Try API logout but don't show errors to user
      try {
        await authApi.logout();
      } catch (error) {
        // Ignore API errors for silent logout
        console.warn('Silent logout API error:', error);
      }

      // Clear state
      resetUser();
      await persistor.purge();
      this.clearLocalStorage();
    } catch (error) {
      console.error('Silent logout error:', error);
    }
  }
}

export default LogoutService;
