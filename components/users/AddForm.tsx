import { useCreateUser } from '@/api/users';
import { Role, UserForm } from '@/utils/types';
import React from 'react'

function AddForm({ roles }: Readonly<{ roles: Role[] }>) {
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
        <section className='form-container'>
            <div className='form-box'>
                <h2>Add New User</h2>
                <form onSubmit={handleSubmit} className="form-layout">
                    <div className="form-row">
                        <label htmlFor='first_name'>First Name</label>
                        <input type="text" name="first_name" id="first_name" placeholder="First Name" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='last_name'>Last Name</label>
                        <input type="text" name="last_name" id="last_name" placeholder="Last Name" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='email'>Email</label>
                        <input type="email" name='email' id="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <div className="form-row">
                        <label htmlFor='roles'>Roles</label>
                        <select name="roles" id='roles' required multiple>
                            {
                                roles.map((role) => {
                                    return <option key={role.id} value={role.id}>{role.name}</option>;
                                })
                            }

                        </select>
                    </div>
                    <button type="submit" disabled={isPending}>{isPending ? 'Adding...' : 'Add User'}</button>
                </form>
            </div>
        </section>
    );
};

export default AddForm;
