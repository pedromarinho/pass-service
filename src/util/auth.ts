import { Request } from 'express';

export function extractToken(req: Request): string {
    let token = '';
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'ApplePass') {
            token = parts[1];
        }
    }
    return token;
}