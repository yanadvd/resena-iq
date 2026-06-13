import { withAuth } from "next-auth/middleware";

// Protege el área privada y redirige a /login si no hay sesión.
export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
