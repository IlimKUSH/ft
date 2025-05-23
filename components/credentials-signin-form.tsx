"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SignInDefaultValues} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {useAuth} from "@/app/hooks/use-auth";
import {useState} from "react";

const CredentialsSigninForm = () => {
    const t = useTranslations();
    const { signIn } = useAuth();
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signIn.mutateAsync({ email, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        autoComplete="email"
                        defaultValue={SignInDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">{t("Password")}</Label>
                    <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        required 
                        autoComplete="password"
                        defaultValue={SignInDefaultValues.password}
                    />
                </div>
                <div>
                    <Button 
                        disabled={signIn.isPending} 
                        className="w-full" 
                        variant="default"
                    >
                        {signIn.isPending ? t("SigningIn") : t("SignIn")}
                    </Button>
                </div>

                {error && (
                    <div className="text-center text-destructive">{error}</div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    {t("DontHaveAnAccount")}{" "}
                    <Link href="/sign-up" target="_self" className="link">
                        {t("SignUp")}
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CredentialsSigninForm;