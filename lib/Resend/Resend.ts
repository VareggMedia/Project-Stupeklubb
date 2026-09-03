import { Resend } from "resend";

interface mailType{
    from: string;
    to: string;
    subject: string;
    text: string;
}

export default async function sendSkjema(request: Request): Promise<mailType> {
    const data = await request.json()

    return data
}