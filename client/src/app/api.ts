export const domain = 'https://api.popjonanek.napicu.eu';
export const GlobalUpdate = `${domain}/api/update`;
export const UserNameCheck = `${domain}/api/usernamecheck`;
export const UserRegister = `${domain}/api/reg`;
/**
 * Body: `email` - password reset request, sends an email and creates an entry in the PasswordReset table, code 0 = successful
 */
export const UserResetPass = `${domain}/api/resetpassword`;
export const UserResetPassCheck = `${domain}/api/resetpassword/check`;
