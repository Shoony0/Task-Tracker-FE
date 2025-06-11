"use client";
import { useFetchUserProfile } from '@/api/users';
import Loader from '@/components/Loader';
import Profile from '@/components/users/Profile';



const UserProfile = () => {
  const { data: profileData, isLoading } = useFetchUserProfile();
  if (isLoading || !profileData) return <Loader message='Loading profile...' />;
  return (
    <main>
      <Profile profileData={profileData} />
    </main>
  );
};

export default UserProfile;
