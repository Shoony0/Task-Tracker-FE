import { useCreateUser } from '@/api/users';
import { Role, UserForm } from '@/utils/types';
import React from 'react'

function AddForm({ roles }: Readonly<{roles: Role[]}>) {
    const { createUser, isPending } = useCreateUser();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const roles = formData.getAll("roles") as string[];
        const role_ids = roles.map((item) => parseInt(item));
        const newFormData = { ...data, role_ids: role_ids } as UserForm
        createUser(newFormData);
        e.currentTarget.reset();
    }



    return (
        <section>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" required />
                <input type="text" name="last_name" placeholder="Last Name" required />
                <input type="email" name='email' placeholder="Email Address" required />
                <input type="password" name="password" placeholder="Password" required />
                <select name="roles" required multiple>
                    {
                        roles.map((role) => {
                            return <option key={role.id} value={role.id}>{role.name}</option>;
                        })
                    }

                </select>
                <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add User'}</button>
            </form>
        </section>
    );
};

export default AddForm;
