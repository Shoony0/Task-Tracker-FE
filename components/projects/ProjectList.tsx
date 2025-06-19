"use client";

import { useFetchProjects } from '@/api/projects';
import React, { useEffect } from 'react'
import SingleProject from './SingleProject';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProjectList } from '@/store/slices/projectSlice';
import { Project } from '@/utils/types';
import Loader from '../Loader';

function ProjectList() {
    // Get user roles from Redux 
    const { userRole } = useAppSelector((state) => state.user);
    // Fetch projects using React Query
    const { data: projects, isLoading } = useFetchProjects();

    // Redux dispatcher to store fetched projects globally
    const dispatch = useAppDispatch();

    // On data change, store projects in Redux state
    useEffect(() => {
        dispatch(setProjectList(projects))
    }, [projects, dispatch]);

    // Show loader while data is being fetched
    if (isLoading || !projects) {
        return <Loader message='Loading Projects...' />;
    }
    return (
        <section>
            <h2>Project List</h2>
            <div className="projects-grid">

                {
                    projects && projects.length !== 0 ?
                        projects.map((project: Project) => {
                            return <SingleProject key={project.id} project={project} userRole={userRole} task_set={project.task_set} />;
                        }) :
                        <p>No project found.</p>
                }



            </div>
        </section>
    );
};

export default ProjectList;
