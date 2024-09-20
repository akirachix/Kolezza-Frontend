
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const baseUrl = process.env.BASE_URL;
    try {
        const data = await request.json();
        const { firstName, lastName, hospital_name, phoneNumber, email, password, username } = data;
        if (!firstName || !lastName || !hospital_name || !phoneNumber || !email || !password || !username) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const response = await fetch(`${baseUrl}/api/therapist_registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                hospital_name,
                phoneNumber,
                email,
                password,
                username
            })
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: result.detail || 'Registration failed' }, { status: response.status });
        }

        return NextResponse.json(result, { status: 201, statusText: "Registration Successful" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}