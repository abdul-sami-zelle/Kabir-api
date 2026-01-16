import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

use(req: any, res: any, next: () => void) {
  console.log('Headers:', req.headers);
  console.log('Cookies:', req.cookies);

  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token && req.cookies?.access_token) {
    token = req.cookies.access_token;
  }

  console.log('Token found:', token);

  if (!token) {
    req.userId = null;
    req.roleId = null;
    return next();
  }

  try {
    const decoded = this.jwtService.verify(token, {
    secret: process.env.JWT_SECRET, // 🔑 add this
  });
    console.log('Decoded JWT:', decoded);
    req.userId = decoded.sub;
    req.roleId = decoded.roleId;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    throw new UnauthorizedException('Invalid or expired token');
  }
}

}
