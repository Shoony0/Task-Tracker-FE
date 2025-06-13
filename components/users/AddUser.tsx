"use client";
import { useFetchUsersRole } from '@/api/users';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import { useAppSelector } from '@/store/hooks';
import Loader from '../Loader';

function AddUser() {
    // Get userId from Redux store 
    const { userId } = useAppSelector((state) => state.editData);
    // Fetch list of available roles from backend
    const { data: roles, isLoading } = useFetchUsersRole();
    // Show loading state while roles are being fetched
    if (isLoading || !roles) return <Loader message='Loading roles...' />;

    // Conditional rendering: If userId exists, show UpdateForm else show AddForm
    if (userId !== 0) {
        return <UpdateForm roles={roles} userId={userId} />
    } else {
        return <AddForm roles={roles} />
    }

};

export default AddUser;
