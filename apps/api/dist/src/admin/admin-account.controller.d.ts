import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { AuthService } from '../auth/auth.service';
export declare class AdminAccountController {
    private readonly auth;
    constructor(auth: AuthService);
    changePassword(user: CurrentUserPayload, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
