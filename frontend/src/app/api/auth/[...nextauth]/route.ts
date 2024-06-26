import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usernam', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await axios.post(`http://api:8080/api/account/login`, {
          username: credentials?.username,
          password: credentials?.password,
          confirmPassword: credentials?.password,
        });
        const user = await res.data;
        console.log(user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // desactivar regla de eslint
      /* eslint-disable @typescript-eslint/no-explicit-any */
      session.user = token as any;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/admin`; // Redirigir a la ruta específica después de iniciar sesión
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Utilizado para cifrar cookies
  pages: {
    signIn: '/login',
    signOut: '/',
  },
});

export { handler as GET, handler as POST };
