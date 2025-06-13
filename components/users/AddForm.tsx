import { useCreateUser } from '@/api/users';
import { Role, UserForm } from '@/utils/types';
import React from 'react'

function AddForm({ roles }: Readonly<{roles: Role[]}>) {
    // Custom hook for creating a user via API
    const { createUser, isPending } = useCreateUser();

    // Handle form submission for creating a new user
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Prevent default form submission behavior
        // Extract form data
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // Extract selected roles from form data (multi-select)
        const roles = formData.getAll("roles") as string[];
        const role_ids = roles.map((item) => parseInt(item));
        // Prepare data payload matching backend API schema
        const newFormData = { ...data, role_ids: role_ids } as UserForm;
        // Trigger mutation to create user
        createUser(newFormData);
        // Reset form after submission
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
