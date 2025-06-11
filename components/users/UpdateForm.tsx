import { useFetchUser, useUpdateUser } from '@/api/users';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateUser } from '@/store/slices/updateSlice';
import React from 'react'
import Loader from '../Loader';

function UpdateForm({ roles, userId }) {
    const dispatch = useAppDispatch();

    const { data: user, isLoading } = useFetchUser(userId);
    const { updateUser, isPending } = useUpdateUser(userId);

    if (isLoading || !user) return <Loader message='Loading user...' />;
    if (isPending) return <Loader message='Updating...' />;

    const { first_name, last_name, email, roles: userRoles } = user;


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // if user didn't enter the password, so removing
        if (data.password.toString().trim() == "") {
            delete data.password;
        }
        const roles = formData.getAll("roles");
        const role_ids = roles.map((item) => parseInt(item));
        const newFormData = { ...data, role_ids: role_ids }

        updateUser(newFormData);
        console.log(newFormData);
        e.currentTarget.reset();
        dispatch(setUpdateUser(0));
    }

    return (
        <section>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" defaultValue={first_name} required />
                <input type="text" name="last_name" placeholder="Last Name" defaultValue={last_name} required />
                <input type="email" name='email' placeholder="Email Address" defaultValue={email} required />
                <input type="password" name="password" placeholder="Password" />
                <select name="roles" required defaultValue={userRoles.map((item) => item.id)} multiple>
                    {
                        roles.map((role) => {
                            return <option key={role.id} value={role.id}>{role.name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update User'}</button>
            </form>
        </section>
    );
};

export default UpdateForm;
