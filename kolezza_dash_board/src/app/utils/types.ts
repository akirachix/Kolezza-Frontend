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
  
  export interface ChildrenResponse {
    child: Child[];
  }
  