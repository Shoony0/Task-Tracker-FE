"use client";

import { useFetchProjects } from '@/api/projects';
import React, { useEffect } from 'react'
import SingleProject from './SingleProject';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProjectList } from '@/store/slices/projectSlice';
import { Project } from '@/utils/types';

function ProjectList() {
    const { userRole } = useAppSelector((state) => state.user);
    const { data: projects } = useFetchProjects()

    // saving project list into state
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setProjectList(projects))
    });

    console.log(projects)
    return (
        <section>
            <h2>Project List</h2>
            <div className="projects-grid">

                {
                    projects && projects.length !== 0  ?
                        projects.map((project: Project) => {
                            return <SingleProject key={project.id} project={project} userRole={userRole} task_set={projects.task_set} />;
                        }) :
                        <p>No project found.</p>
                }



            </div>
        </section>
    );
};

export default ProjectList;
