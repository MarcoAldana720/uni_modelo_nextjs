import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('secret');
const publicRoutes = ['/']; // Define las rutas públicas (sin autenticación necesaria)
// Define los roles requeridos para cada tipo de ruta
const roleRequired = {
  '/main': 1,       // Administradores
  '/visualizador': 2, // Visualizadores
  '/usuario': 3     // Usuarios
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Si la ruta es pública, no se requiere autenticación
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Obtener la cookie del token JWT
  const token = req.cookies.get('myTokenName')?.value;

  if (!token || typeof token !== 'string') {
    // Si no hay token o no es una cadena, redirigir a la página de inicio
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // Verificar el token JWT
    const { payload } = await jwtVerify(token, secret);
    req.user = payload; // Puedes usar req.user en tus manejadores de rutas

    // Determinar el rol requerido para la ruta actual
    const requiredRole = Object.keys(roleRequired).find(route => pathname.startsWith(route));
    
    if (requiredRole && req.user.role.id !== roleRequired[requiredRole]) {
      // Si la ruta requiere un rol específico y el usuario no tiene el rol adecuado
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    // Si la verificación falla, redirigir a la página de inicio
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/main/:path*', '/visualizador/:path*', '/usuario/:path*'],
};
