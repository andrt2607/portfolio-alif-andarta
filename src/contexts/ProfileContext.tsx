import React, { createContext, useEffect, useState } from "react";
import { portfolioService } from "../lib/supabase";
import { Profile } from "../types";

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  error: null,
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await portfolioService.getProfile();
        console.log("Fetched profile data:", data);
        setProfile(data[0]);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};
