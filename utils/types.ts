export type Role = {
    id: number,
    name: string,
}

export type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles: Role[];
}

export type UserForm = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    role_ids?: number[];
}

export type Project = {
    task_set: number[];
    id: number,
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    owner: UserType;
    users: UserType[];
    owner_id: number;
    user_ids: number[];
}
export type Tasks = { id: number; description: string; due_date: string; status: string; owner: UserType; project: Project; creator: UserType; }
export type TasksForm = { description: string; due_date: string; status: string; owner: string; project: string; project_id: number; owner_id: number; }

export type taskUpdateStatus = {
    status: string;
}

export type SidebarLink = {
    id: string;
    name: string;
}
export type JWTToken = {
    access: string;
    refresh: string;
}

export type LoginFormData = {
    email: string;
    password: string;
}

export type ProjectFormData = {
    email: string;
    password: string;
}
export type JWTTokenData = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
}

export type ProjectForm = {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    users: string[];
    owner_id: number;
    user_ids: number[];
}
