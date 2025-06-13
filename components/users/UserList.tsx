"use client";
import { useFetchUsers } from '@/api/users';
import SingleUser from './SingleUser';
import Loader from '../Loader';
import { UserType } from '@/utils/types';



function UserList() {
    // Fetch users data using custom hook
    const { data: users, isLoading, error } = useFetchUsers();

    // Show loader while data is being fetched
    if (isLoading || !users) return <Loader message='Loading User...' />;

    // Display error message if fetching fails
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section>
            <h2>User List</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role(s)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user: UserType) => {
                            return <SingleUser key={user.id} user={user} />;
                        })
                    }
                </tbody>
            </table>
        </section>
    );
};

export default UserList;
