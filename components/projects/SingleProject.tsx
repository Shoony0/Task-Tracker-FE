import { useDeleteProject } from '@/api/projects';
import { useAppDispatch } from '@/store/hooks';
import { setUpdateProject } from '@/store/slices/updateSlice';
import Link from 'next/link';
import React from 'react'
import Loader from '../Loader';

function SingleProject({ id, name, description, start_date, end_date, owner, users, task_set, userRole }) {
    const dispatch = useAppDispatch();
    const { deleteProject, isPending } = useDeleteProject(id);
    if (isPending) return <Loader message='Deleting...' />;
    return (
        <div className="project-card">
            <div>
                <h3>{name}</h3>
                <p className="project-details">{description}</p>
                <p><strong>Start Date:</strong> {start_date}</p>
                <p><strong>End Date:</strong> {end_date}</p>
                <p><strong>No of Tasks:</strong> {task_set.length}</p>
                <p className="project-owner">Owner: {owner.first_name} {owner.last_name}</p>
                <p className="project-owner">
                    Assigned Users:
                    {
                        users.map((user, index) => {
                            return <span key={user.id}>{user.first_name} {user.last_name}{users.length - 1 !== index && ', '}</span>;
                        })

                    }
                </p>
            </div>
            {/* Edit/Delete icons */}
            <div style={{ textAlignLast: "auto" }}>
                <button type='button' className="task-btn"><Link href={`/projects/${id}/tasks`}>Tasks</Link></button>
                {
                    ["admin"].some((role) => userRole.includes(role)) &&
                    <><button type='button' className="edit-btn" onClick={() => dispatch(setUpdateProject(id))}>Edit</button>
                    <button type='button' className="delete-btn" onClick={() => deleteProject()}>Delete</button></>
                }
            </div>
        </div >
    )
}

export default SingleProject
