export interface AuthToken {
    token : string|undefined;
    refreshToken?: string|undefined;
    expiresAt?: Date|undefined;
}
