
export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;

}
type StatBoxProps = {
    title: string;
    value: string;
    color: string;
    isNH?: boolean;
  };

export interface UsersFetchSuccessResponse {
    users: User[];
    total: number;
}


export interface UsersFetchErrorResponse {
    error: string;
}


export interface Child {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    date_of_birth: string;
    is_deleted: boolean;
    updated_at: string | null;
    level_of_stuttering_id: number;
    childmodule_id: number;
}
export interface FetchChildrenResponse {
    child: Child[];
}

export interface FetchUsersResponse {
    users: User[];
}
