export interface TaskRequest {
    task_type: string;
    details: string;
    description: string;
}

export interface TaskResponse {
    id:       string;
    customer: Customer;
    tasks:    any[];
    details:  string;
    created:  Date;
    modified: Date;
}

export interface Customer {
    id:              number;
    customer_number: string;
    user:            User;
}

export interface User {
    id:                  string;
    first_name:          string;
    last_name:           string;
    email:               string;
    phone_number:        string;
    is_staff:            boolean;
    is_active:           boolean;
    last_password_reset: null;
}
