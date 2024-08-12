'use server'

import axios from 'axios'

// FUNCION PARA PODER AGREGAR UN NUEVO USUARIO
export async function registerUserAction(dataObject) {
  try {
    const res = await axios.post("http://localhost:3000/api/admin", {
      us_nombres: dataObject.us_nombres,
      us_apellidos: dataObject.us_apellidos,
      us_usuario: dataObject.us_usuario,
      us_correo: dataObject.us_correo,
      us_genero_id: dataObject.us_genero_id,
      us_rol_id: dataObject.us_rol_id,
    });
    
    return {
      status: 200,
      message: 'Se agrego correctamente',
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error('Error registering user:', error.response.data.message);
      return {
        status: 404,
        message: error.response.data.message,
      };
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
}

// FUNCION PARA PODER EDITAR LOS DATOS DE UN USUARIO
export async function updateUserAction(idUser,dataObject) {
  try {
    const res = await axios.put("http://localhost:3000/api/admin/" + idUser, dataObject);
    
    console.log(res.data);
    
    return {
      status: 200,
      message: 'Se edito correctamente',
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error('Error registering user:', error.response.data.message);
      return {
        status: 404,
        message: error.response.data.message,
      };
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
}