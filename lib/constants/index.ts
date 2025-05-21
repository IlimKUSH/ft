export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Test task';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Frontend';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const SignInDefaultValues = {
    email: "eve.holt@reqres.in",
    password: "pistol",
}
export const SignUpDefaultValues = {
    name: "Eve Holt",
    email: "eve.holt@reqres.in",
    password: "pistol",
    confirmPassword: "pistol",
}