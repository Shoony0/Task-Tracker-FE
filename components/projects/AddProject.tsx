"use client";
import { useAppSelector } from '@/store/hooks';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import { useFetchUsers } from '@/api/users';
import Loader from '../Loader';




function AddProject() {
    const { userRole } = useAppSelector((state) => state.user);
    const { projectId } = useAppSelector((state) => state.editData)
    const { data: users, isLoading } = useFetchUsers();
    if(isLoading || !users) return <Loader message='Loading Users...' />;
    if(projectId !==0 ){
        return <UpdateForm projectId={projectId} users={users} />
    }else{
        if(["admin"].some((role) => userRole.includes(role))){

            return <AddForm users={users} />
        }
    }
};

export default AddProject;
