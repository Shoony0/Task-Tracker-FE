import AddUser from '@/components/users/AddUser';
import UserList from '@/components/users/UserList';
import React from 'react'

const Users = () => {
  return (
    <main>
      <AddUser />
      <UserList />
    </main>
  );
};

export default Users;
