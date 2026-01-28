import { GOOGLE_SCRIPT_URL, DB_GOOGLE_SCRIPT_URL } from '../config/constants.js';
import { httpGet, httpPost } from '../utils/http.js';

export const fetchAllUsers = async () => {
  const data = await httpGet(`${GOOGLE_SCRIPT_URL}?accion=listar`);
  if (!data || !Array.isArray(data.usuarios)) throw new Error('Respuesta inválida');
  return data.usuarios.map((item, index) => ({
    id: item.id ?? index + 1,
    userName: item.Usuario || item.username || '',
    userPassword: item.Contraseña || item.password || '',
    puesto: item.Puesto || item.puesto || item.Cargo || '-',
    tests: parseTestValue(item.Test || item.test || [])
  }));
};

const parseTestValue = (testValue) => {
  let testsArray = [];
  if (testValue === undefined || testValue === null || testValue === '') return testsArray;
  if (typeof testValue === 'number') {
    const testStr = testValue.toString();
    if (testStr.includes('.')) {
      testStr.split('.').forEach(part => { if (part && part !== '0') testsArray.push(part); });
    } else {
      testsArray.push(testStr);
    }
  } else if (typeof testValue === 'string') {
    if (testValue.includes(',')) {
      testsArray = testValue.split(',').map(t => t.trim()).filter(t => t);
    } else if (testValue.includes('.')) {
      testValue.split('.').forEach(part => { if (part && part !== '0') testsArray.push(part.trim()); });
    } else {
      testsArray.push(testValue.trim());
    }
  }
  return testsArray;
};

export const saveUser = async (userData) => {
  const params = new URLSearchParams({
    accion: 'guardar',
    username: userData.username,
    password: userData.password,
    puesto: userData.puesto,
    tests: Array.isArray(userData.tests) ? userData.tests.join(',') : ''
  });
  const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
  const result = await httpGet(url);
  if (result.estado === 'limite') throw new Error(result.mensaje || 'Límite de usuarios alcanzado');
  if (result.estado !== 'exito') throw new Error(result.mensaje || 'Error al guardar');
  return true;
};

export const updateUser = async (updateData) => {
  const payload = {
    accion: 'actualizar',
    username: updateData.username,
    password: updateData.password,
    puesto: updateData.puesto,
    tests: Array.isArray(updateData.tests) ? updateData.tests.join(',') : updateData.tests
  };
  Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);
  const result = await httpPost(GOOGLE_SCRIPT_URL, payload);
  if (!result || result.estado !== 'exito') throw new Error(result?.mensaje || 'Error al actualizar');
  return result;
};

export const saveUserToDB = async (userData) => {
  const params = new URLSearchParams({
    accion: 'guardar',
    username: userData.username,
    password: userData.password,
    puesto: userData.puesto,
    pack: userData.pack,
    admin: userData.admin,
    tests: Array.isArray(userData.tests) ? userData.tests.join(',') : ''
  });
  const url = `${DB_GOOGLE_SCRIPT_URL}?${params.toString()}`;
  const result = await httpGet(url);
  if (result.estado !== 'exito') throw new Error(result.mensaje || 'Error al guardar en BD');
  return true;
};