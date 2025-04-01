export type TLogin = 'email' | 'password'

export interface IErrorLogin {
    email?: string;
    password?: string;
}
  
export type TRegister = 'first_name' | 'last_name' | 'email' | 'password' | 'confirm_password'

export interface IErrorRegister {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}