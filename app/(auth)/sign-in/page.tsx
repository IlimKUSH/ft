import { Metadata } from "next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {APP_NAME} from "@/lib/constants";
import CredentialsSigninForm from "@/components/credentials-signin-form";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Sign In"
}

const SignInPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string;
    }>
}) => {
    const t = await getTranslations();
    const { callbackUrl }  = await props.searchParams;
    const session = await auth()

    if (session) {
        return redirect(callbackUrl || "/");
    }


    return <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader className="space-y-4">
                <Link href="/" className="flex-center">
                    <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} width={100} height={100} priority />
                </Link>
                <CardTitle className="text-center">
                    {t("SignIn")}
                </CardTitle>
                <CardDescription className="text-center">
                    {t("SignInToYourAccount")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CredentialsSigninForm />
            </CardContent>
        </Card>
    </div>
};

export default SignInPage;