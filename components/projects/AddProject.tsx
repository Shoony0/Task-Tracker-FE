"use client";
import { useAppSelector } from '@/store/hooks';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import { useFetchUsers } from '@/api/users';
import Loader from '../Loader';
import { getAccessJWTTokenData } from '@/utils/actions';




function AddProject() {
    // Get current user role from local storage store
    const { roles:userRole } = getAccessJWTTokenData();    
    // Get projectId to determine Add or Edit mode
    const { projectId } = useAppSelector((state) => state.editData)
    // Fetch all users for form options
    const { data: users, isLoading } = useFetchUsers();

    // Show loader while users are loading
    if(isLoading || !users) return <Loader message='Loading Users...' />;

    // If projectId exists, render update form
    if(projectId !==0 ){
        return <UpdateForm projectId={projectId} users={users} />
    }else{
        // If admin, render add form
        if(["admin"].some((role) => userRole.includes(role))){

            return <AddForm users={users} />
        }
    }
};

export default AddProject;
