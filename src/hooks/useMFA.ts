import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthMFAGetAuthenticatorAssuranceLevelResponse } from '@supabase/supabase-js';

export interface MFAStatus {
  isEnabled: boolean;
  isVerified: boolean;
  requiresVerification: boolean;
  loading: boolean;
}

export function useMFA() {
  const [status, setStatus] = useState<MFAStatus>({
    isEnabled: false,
    isVerified: false,
    requiresVerification: false,
    loading: true,
  });

  const checkMFAStatus = useCallback(async () => {
    try {
      // Get AAL (Authenticator Assurance Level)
      const { data: aalData, error: aalError }: AuthMFAGetAuthenticatorAssuranceLevelResponse = 
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalError) {
        console.error('Error checking AAL:', aalError);
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      // Get MFA factors
      const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();

      if (factorsError) {
        console.error('Error listing factors:', factorsError);
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      const hasVerifiedFactor = factorsData.totp.some(f => f.status === 'verified');
      const currentLevel = aalData.currentLevel;
      const nextLevel = aalData.nextLevel;

      setStatus({
        isEnabled: hasVerifiedFactor,
        isVerified: currentLevel === 'aal2',
        requiresVerification: hasVerifiedFactor && currentLevel !== 'aal2' && nextLevel === 'aal2',
        loading: false,
      });
    } catch (error) {
      console.error('Error checking MFA status:', error);
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    checkMFAStatus();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkMFAStatus();
    });

    return () => subscription.unsubscribe();
  }, [checkMFAStatus]);

  const disableMFA = async () => {
    try {
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      
      if (factorsData?.totp) {
        for (const factor of factorsData.totp) {
          await supabase.auth.mfa.unenroll({ factorId: factor.id });
        }
      }

      // Update profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({ mfa_enabled: false })
          .eq('user_id', user.id);
      }

      await checkMFAStatus();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    ...status,
    checkMFAStatus,
    disableMFA,
  };
}
