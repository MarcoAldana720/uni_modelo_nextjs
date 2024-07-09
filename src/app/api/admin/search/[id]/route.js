import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const pattern = '%'+params.id+'%';

    try {
      const result = await conn.query(`
        SELECT * FROM users 
        WHERE nombres LIKE ?  
        OR apellidos LIKE ?
      `, [
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