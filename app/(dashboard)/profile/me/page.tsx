"use client";
import { useFetchUserProfile } from '@/api/users';
import Loader from '@/components/Loader';
import Profile from '@/components/users/Profile';



const UserProfile = () => {
  // Fetching the user profile using custom hook
  const { data: profileData, isLoading } = useFetchUserProfile();
  // Show loader while data is being fetched or if no data
  if (isLoading || !profileData) return <Loader message='Loading profile...' />;
  return (
    <main>
      <Profile profileData={profileData} />
    </main>
  );
};

export default UserProfile;
