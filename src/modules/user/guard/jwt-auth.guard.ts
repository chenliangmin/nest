/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-14 14:38:04
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-14 16:55:33
 */
/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/utils/public';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService:JwtService,
    private readonly configService: ConfigService
  ){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>{
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    
    if (this.checkWhite(this.whiteList, request.url)) {
      return true
    }
    
    if (!token) {
      throw new UnauthorizedException('登录token错误，请重新登录')
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET')
      })
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('身份过期，请重新登录')
    }
    return true;
  }

  private whiteList: string[] = []

  private checkWhite(whiteList: string[], url: string): boolean {
    const flag = whiteList.indexOf(url) >= 0
    return flag
  }

  private extractTokenFromHeader(request:Request): string | undefined {
    const [type,token] = request.headers.authorization?.split(' ')??[]
    return type === 'Bearer'? token : undefined
  }
}
