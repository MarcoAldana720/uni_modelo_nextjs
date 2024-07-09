import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    // const results = await conn.query("SELECT * FROM users");
    const results = await conn.query(`
      SELECT 
        users.id, 
        users.nombres, 
        users.apellidos, 
        users.usuario, 
        users.correo, 
        users.contrasena, 
        roles.rol_description AS rol_description, 
        status.status_description AS status_description
      FROM 
        users
      JOIN 
        roles ON users.rol_id = roles.id
      JOIN 
        status ON users.estado_id = status.id
    `);
    
    return NextResponse.json(results);
    
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      }, {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const { nombres, apellidos, usuario, correo, contrasena, rol_id, estado_id } = data;

    console.log(data);

    const result = await conn.query("INSERT INTO users SET ?", {
      nombres, apellidos, usuario, correo, contrasena, rol_id, estado_id
    });

    return NextResponse.json({
      nombres,
      apellidos,
      usuario,
      correo,
      contrasena,
      rol_id,
      estado_id,
      id: result.insertId,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      }, {
        status: 500,
      }
    );
  }
}
