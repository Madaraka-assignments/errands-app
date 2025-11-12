export interface RegisterRequest {
    first_name:   string;
    last_name:    string;
    phone_number: string;
    email:        string;
    password:     string;
    confirmPassword: string;
}


export interface RegisterResponse {
    id:              number;
    customer_number: string;
    user:            User;
}

export interface User {
    id:              string;
    first_name:      string;
    last_name:       string;
    email:           string;
    phone_number:    string;
    customer_number: string;
    staff_id:        null;
    roles:           null;
}


export interface LoginRequest {
    email:        string;
    password:     string;
}


export interface LoginResponse {
    refresh: string;
    access:  string;
    user:    User;
}