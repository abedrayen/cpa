import { User } from '@prisma/client';
export type CurrentUserPayload = Pick<User, 'id' | 'email' | 'role'>;
export declare const CurrentUser: (...dataOrPipes: ("id" | "email" | "role" | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
