"use server";

import {signInFormSchema, signUpFormSchema} from "@/lib/validators";
import {signIn, signOut} from "@/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {formatErrors} from "@/lib/utils";

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        })

        await signIn("credentials", user);
        return { success: true, message: "Signed in successfully" };
    } catch (e) {
        if (isRedirectError(e)) {
            throw e;
        }

        return { success: false, message: "Invalid email or password" };
    }
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REQRES_API_KEY ?? ""
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            return { success: false, message: responseData.error || "Registration failed" };
        }

        const token = responseData.token;

        await signIn("credentials", {
            email: user.email,
            password: user.password,
            token: token
        });

        return { success: true, message: "Account created successfully" };
    } catch (e) {
        if (isRedirectError(e)) {
            throw e;
        }

        return { success: false, message: formatErrors(e) };
    }
}

export async function signOutUser() {
    await signOut();
}