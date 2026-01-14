// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // -------------------------------
  // REGISTER USER
  // -------------------------------
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  // -------------------------------
  // LOGIN → generate OTP
  // -------------------------------
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  // -------------------------------
  // VERIFY OTP → set JWT in cookie
  // -------------------------------
  @Post('verify-otp')
  async verifyOtp(
    @Body() body: any,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { token, user } = await this.authService.verifyOtp(body);

    // ✅ Store JWT in HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true, // set false in dev if no https
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return {
      success: true,
      message: 'Login successful',
      user,
    };
  }

  // -------------------------------
  // LOGOUT → clear cookie
  // -------------------------------
  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true, // false in dev
      sameSite: 'strict',
    });
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  // -------------------------------
  // ME → get current logged-in user
  // -------------------------------
  @Get('me')
  async me(@Req() req: express.Request) {
    const token = req.cookies['access_token'];
    if (!token) return { success: false, user: null };

    try {
      const { sub } = this.authService.jwtService.verify(token);
      const user = await this.authService.usersService.findById(sub);
      if (!user) return { success: false, user: null };

      // Remove sensitive fields
      const { password, otp, otpExpires, ...safeUser } = user.toObject();
      return { success: true, user: safeUser };
    } catch (error) {
      return { success: false, user: null };
    }
  }
}
