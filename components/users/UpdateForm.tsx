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

    const cancelUpdate = () => {
        // Reset update state in redux store
        dispatch(setUpdateUser(0));
    }

    return (
        <section className='form-container'>
            <div className='form-box'>
                <h2>Update User</h2>
                <form onSubmit={handleSubmit} className='form-layout'>
                    <div className="form-row">
                        <label htmlFor='first_name'>First Name</label>
                        <input type="text" name="first_name" id="first_name" placeholder="First Name" defaultValue={first_name} required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='last_name'>Last Name</label>
                        <input type="text" name="last_name" id='last_name' placeholder="Last Name" defaultValue={last_name} required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='email'>Email</label>
                        <input type="email" name='email' id="email" placeholder="Email Address" defaultValue={email} required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id='password' placeholder="Password" />
                    </div>
                    <div className="form-row">
                        <label htmlFor='roles'>Roles</label>
                        <select name="roles" id="roles" required defaultValue={userRoles.map((item) => String(item.id))} multiple>
                            {
                                roles.map((role) => {
                                    return <option key={role.id} value={role.id}>{role.name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Updating...' : 'Update User'}</button>
                    <button type="button" onClick={cancelUpdate}>Cancel</button>
                </form>
            </div>
        </section>
    );
};

export default UpdateForm;
