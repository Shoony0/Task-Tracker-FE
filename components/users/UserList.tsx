"use client";
import { useFetchUsers } from '@/api/users';
import SingleUser from './SingleUser';
import Loader from '../Loader';



function UserList() {
    const { data: users, isLoading, error } = useFetchUsers();
    
    if (isLoading || !users) return <Loader message='Loading User...' />;
    
    if (error) return <p>Error: {error.message}</p>;
    console.log("users")
    console.log(users)
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
                        users.map((user) => {
                            return <SingleUser key={user.id} user={user} />;
                        })
                    }
                </tbody>
            </table>
        </section>
    );
};

export default UserList;
