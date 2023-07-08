
export interface ResponseUserDto {
    id: number

    email: string;

    username: string;

    firstName: string;

    lastName: string;

    isVerified: boolean;

    isEnabled: boolean;

    phoneNumber: string;

    telegramId: string;

    lastLoginAt: Date | null;

    updated_at: Date;

}

export interface CreateUserDto {

    email: string;

    username: string;

    password: string;

    firstName: string;

    lastName: string;

    phoneNumber: string;

    telegramId: string;



}

export interface UpdatePasswordDto {

    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}


export interface UpdateProfileDto {

    phoneNumber: string;

    firstName: string;

    lastName: string;

    telegramId: string;

}

export interface ResetPasswordDto {
    email: string;
}

