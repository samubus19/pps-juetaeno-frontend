import CryptoJS                       from 'crypto-js';

const desencriptarUsuario = (usuario, clave) => {
  
  let usuarioDecoded     = CryptoJS.enc.Base64.parse(usuario).toString(CryptoJS.enc.Utf8)
  const usuarioDesencrip = JSON.parse(CryptoJS.AES.decrypt(usuarioDecoded, clave).toString(CryptoJS.enc.Utf8))
  return usuarioDesencrip
}

export default desencriptarUsuario;