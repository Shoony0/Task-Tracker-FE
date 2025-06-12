"use client";
import { useFetchUsersRole } from '@/api/users';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
import { useAppSelector } from '@/store/hooks';
import Loader from '../Loader';

function AddUser() {
    const { userId } = useAppSelector((state) => state.editData);
    const { data: roles, isLoading } = useFetchUsersRole();
    if (isLoading || !roles) return <Loader message='Loading roles...' />;

    if (userId !== 0) {
        return <UpdateForm roles={roles} userId={userId} />
    } else {
        return <AddForm roles={roles} />
    }

};

export default AddUser;
