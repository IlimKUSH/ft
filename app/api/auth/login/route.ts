import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse("Email and password are required", { status: 400 });
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REQRES_API_KEY ?? ""
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: "Invalid credentials" }));
            return new NextResponse(error.error || "Invalid credentials", { status: 401 });
        }

        const data = await response.json();

        return NextResponse.json({ token: data.token });
    } catch (error) {
        console.error("[LOGIN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 