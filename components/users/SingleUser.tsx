import { useDeleteUser } from '@/api/users';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateUser } from '@/store/slices/updateSlice';
import React from 'react'
import Loader from '../Loader';
import { UserType } from '@/utils/types';



function SingleUser({ user }: Readonly<{user: UserType}>) {
    const dispatch = useAppDispatch();
    const { email, first_name, last_name, id, roles } = user;
    const { deleteUser, isPending } = useDeleteUser(id);
    if (isPending) return <Loader message='Deleting User...' />;
    return (
        <tr key={id}>
            <td>{first_name} {last_name}</td>
            <td>{email}</td>
            <td>
                {
                    roles.map((role, index) => {
                        return <span key={role.id}>{role.name}{roles.length-1 !== index && ', '}</span>
                    })
                }
            </td>
            <td>
                <button type="button" className='edit-btn' onClick={() => dispatch(setUpdateUser(id))}>Edit</button>
                <button type="button" className='delete-btn' onClick={() => deleteUser()}>Delete</button>
            </td>
        </tr>
    );

}

export default SingleUser
