import { conn } from "../../../../../libs/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const pattern = '%'+params.id+'%';

    try {
      const result = await conn.query(`
        SELECT 
          usuarios.us_id,
          usuarios.us_nombres,
          usuarios.us_apellidos,
          generos.gen_descripcion AS gen_descripcion,
          roles.rol_descripcion AS rol_descripcion,
          estados.es_descripcion AS es_descripcion
        FROM 
          usuarios
        JOIN 
          generos ON usuarios.us_genero_id = generos.gen_id
        JOIN 
          roles ON usuarios.us_rol_id = roles.rol_id
        JOIN 
          estados ON usuarios.us_estado_id = estados.es_id 
        WHERE us_nombres LIKE ?  
        OR us_apellidos LIKE ?
        OR generos.gen_descripcion LIKE ?
        OR roles.rol_descripcion LIKE ?
        OR estados.es_descripcion LIKE ?
      `, [
        pattern,
        pattern,
        pattern,
        pattern,
        pattern
      ]);
      
  
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json({
        message: error.message,
      }, {
        status: 500,
      })
    }
  }