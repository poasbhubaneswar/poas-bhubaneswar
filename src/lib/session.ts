import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "poas_admin_session";

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  const isHttps =
    process.env.NODE_ENV === "production" &&
    (process.env.NEXTAUTH_URL?.startsWith("https://") ||
      Boolean(process.env.VERCEL_URL) ||
      process.env.NETLIFY === "true");

  cookieStore.set(ADMIN_COOKIE_NAME, JSON.stringify({ email, time: Date.now() }), {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!sessionCookie) return null;
  try {
    const data = JSON.parse(sessionCookie.value);
    if (data?.email) return { email: data.email };
    return null;
  } catch {
    return null;
  }
}
