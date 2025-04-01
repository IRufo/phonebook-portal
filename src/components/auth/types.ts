export type TLogin = 'email' | 'password'

export interface IErrorLogin {
    email?: string;
    password?: string;
  }

  
export type TRegister = 'first_name' | 'last_name' | 'email' | 'password' | 'confirm_password'