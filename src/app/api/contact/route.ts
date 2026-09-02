import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "pstmichaeljohnson721@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "onboarding@resend.dev";

function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 100) return "Name is too long";
  if (/[<>{}\\n]/.test(trimmed)) return "Name contains invalid characters";
  return undefined;
}

function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
  if (trimmed.length > 254) return "Email is too long";
  return undefined;
}

function validateMessage(message: string): string | undefined {
  const trimmed = message.trim();
  if (!trimmed) return "Message is required";
  if (trimmed.length < 10) return "Message must be at least 10 characters";
  if (trimmed.length > 5000) return "Message is too long (max 5000 characters)";
  return undefined;
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name = "", email = "", message = "" } = body;

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const messageError = validateMessage(message);

  if (nameError || emailError || messageError) {
    return NextResponse.json(
      { error: { name: nameError, email: emailError, message: messageError } },
      { status: 422 }
    );
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: { form: "Contact form is not configured. Please contact directly via email." } },
      { status: 500 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: { form: "Failed to send message. Please try again or email directly." } },
      { status: 500 }
    );
  }
}
