import { useFetchUser, useUpdateUser } from '@/api/users';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateUser } from '@/store/slices/updateSlice';
import React from 'react'
import Loader from '../Loader';
import { Role, UserForm, UserType } from '@/utils/types';

function UpdateForm({ roles, userId }: Readonly<{ roles: Role[], userId: number }>) {
    const dispatch = useAppDispatch();

    // Fetch user data for given userId
    const { data: user, isLoading } = useFetchUser(userId);
    // Hook to update user data
    const { updateUser, isPending } = useUpdateUser(userId);

    // Display loader while fetching or updating
    if (isLoading || !user) return <Loader message='Loading user...' />;
    if (isPending) return <Loader message='Updating...' />;

    // Destructure fetched user data
    const { first_name, last_name, email, roles: userRoles } = user as UserType;

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // cast entire data to Record<string, string>
        // Convert form data to key-value object
        const data = Object.fromEntries(formData) as Record<string, string>;;
        // If password field is empty, exclude it from request
        if (data.password.trim() == "") {
            delete data.password;
        }
        // Extract roles from form and convert to integer array
        const roles = formData.getAll("roles") as string[];
        const role_ids = roles.map((item) => parseInt(item));
        // Construct final form data object matching UserForm type
        const newFormData = { ...data, role_ids: role_ids } as UserForm
        // Call updateUser mutation
        updateUser(newFormData);
        // Reset form after submission
        e.currentTarget.reset();
        // Reset update state in redux store
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
                <select name="roles" required defaultValue={userRoles.map((item) => String(item.id))} multiple>
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
