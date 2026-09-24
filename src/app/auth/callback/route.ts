import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/student/dashboard";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method is called from a Server Component.
              // This can be ignored if you have middleware refreshing sessions.
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the user's profile to determine role
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch role from profile table
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const role = profile?.role ?? "student";

        // Set the role cookie for middleware
        cookieStore.set("alphabetz-role", role, {
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        // Redirect based on role
        if (role === "admin" || role === "faculty") {
          return NextResponse.redirect(`${origin}/admin/dashboard`);
        }
        return NextResponse.redirect(`${origin}/student/dashboard`);
      }

      // Fallback: redirect to the `next` param or student dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If code exchange fails, redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_error`);
}
