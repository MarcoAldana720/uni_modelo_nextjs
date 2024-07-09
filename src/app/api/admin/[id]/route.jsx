import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

// FUNCION PARA OPTENER UN USUARIO
export async function GET(request, { params }) {
  try {
    const result = await conn.query(`
      SELECT 
        users.id, 
        users.nombres, 
        users.apellidos, 
        users.usuario, 
        users.correo, 
        users.contrasena, 
        roles.id AS rol_id,
        roles.rol_description AS rol_description,
        status.id AS status_id,
        status.status_description AS status_description
      FROM 
        users
      JOIN 
        roles ON users.rol_id = roles.id
      JOIN 
        status ON users.estado_id = status.id
      WHERE 
        users.id = ?
    `, [
      params.id,
    ]);
    
    if (result.length === 0) {
      return NextResponse.json(
        {
        message: "Usuario No Entontrado",
        }, {
        status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    }, {
      status: 500,
    })
  }
}

// FUNCION PARA ELIMINAR UN USUARIO
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM users WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario No Entontrado",
        }, {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
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

// FUNCION PARA EDITAR UN USUARIO
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      data,
      params.id
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario No Encontrado",
        }, {
          status: 404,
        }
      );
    }

    const updatedUser = await conn.query("SELECT * FROM users WHERE id = ?", [
      params.id,
    ]);

    return NextResponse.json({message: "Se Edito Correctamente"});
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    }, {
      status: 500,
    });
  }
}