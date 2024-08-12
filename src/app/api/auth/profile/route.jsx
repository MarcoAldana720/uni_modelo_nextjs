import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { conn } from '../../../../libs/db';
import bcrypt from 'bcrypt';

export async function GET(request) {
  try {
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      return NextResponse.json({ message: 'No cookies found' }, { status: 401 });
    }

    // Extraer el token JWT de las cookies
    const tokenMatch = cookies.match(/myTokenName=([^;]*)/);
    if (!tokenMatch) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = tokenMatch[1];

    // Verificar el token
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;

    // Consultar los datos del usuario
    const [userResult] = await conn.query(`
      SELECT 
        usuarios.us_nombres, 
        usuarios.us_apellidos, 
        usuarios.us_usuario, 
        usuarios.us_correo, 
        roles.rol_id, 
        roles.rol_descripcion
      FROM 
        usuarios
      JOIN 
        roles ON usuarios.us_rol_id = roles.rol_id
      WHERE 
        usuarios.us_usuario = ?
    `, [username]);

    if (!userResult) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userResult);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Tengo Que Ver Porque No Me Permite Actualizar La Contraseña
// ENDPOINT PARA QUE EL USUARIO PUEDA ACTUALIZAR SU PERFIL
export async function PUT(request) {
  try {
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      return NextResponse.json({ message: 'No cookies found' }, { status: 401 });
    }

    // Extraer el token JWT de las cookies
    const tokenMatch = cookies.match(/myTokenName=([^;]*)/);
    if (!tokenMatch) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = tokenMatch[1];
    const decoded = jwt.verify(token, 'secret');
    const username = decoded.username;

    // Obtener los datos actualizados desde el frontend
    const data = await request.json();

    let updatedPassword = data.us_contrasena;
    
    // Si se envía una nueva contraseña, encriptarla
    if (updatedPassword) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(updatedPassword, salt);
    }

    // Actualizar los datos del usuario en la base de datos
    await conn.query(`
      UPDATE usuarios SET 
        us_nombres = ?, 
        us_apellidos = ?, 
        us_usuario = ?, 
        us_correo = ?, 
        us_contrasena = IF(?, ?, us_contrasena)
      WHERE 
        us_usuario = ?
    `, [data.us_nombres, data.us_apellidos, data.us_usuario, data.us_correo, updatedPassword ? 1 : 0, updatedPassword, username]);

    return NextResponse.json({ message: 'User updated successfully' });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}