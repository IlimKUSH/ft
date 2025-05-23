"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SignInDefaultValues} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useActionState} from "react";
import {signInWithCredentials} from "@/lib/actions/user.actions";
import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation";
import { useTranslations } from "next-intl";

const CredentialsSigninForm = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") ?? "/profile";

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ""
    });

    const SignInButton = () => {
        const t = useTranslations()
        const { pending } = useFormStatus()

        return <Button disabled={pending} className="w-full" variant="default">
            { pending ? t("SigningIn") : t("SignIn") }
        </Button>
    }

    return <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
            <div>
                <Label htmlFor="email">{t("Email")}</Label>
                <Input id="email" name="email" type="email" required autoComplete="email"
                       defaultValue={SignInDefaultValues.email}/>
            </div>
            <div>
                <Label htmlFor="password">{t("Password")}</Label>
                <Input id="password" name="password" type="password" required autoComplete="password"
                       defaultValue={SignInDefaultValues.password}/>
            </div>
            <div>
                <SignInButton />
            </div>

            {data && !data.success && (
                <div className="text-center text-destructive">{data.message}</div>
            )}

            <div className="text-sm text-center text-muted-foreground">
                {t("DontHaveAnAccount")}{" "}
                <Link href="/sign-up" target="_self" className="link">
                    {t("SignUp")}
                </Link>
            </div>

        </div>
    </form>
};

export default CredentialsSigninForm;