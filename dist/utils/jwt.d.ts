export type AccessTokenPayload = {
    sub: string;
    role: "customer" | "admin";
};
export type RefreshTokenPayload = {
    sub: string;
    jti: string;
};
export declare function signAccessToken(padload: AccessTokenPayload): string;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export declare function signRefreshToken(padload: RefreshTokenPayload): string;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
//# sourceMappingURL=jwt.d.ts.map