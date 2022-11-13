const verificarCodigoEstado = (codigoEstado) => {
    if(codigoEstado === 500) {
        alert("Lo siento mucho!\n Ha habido un error 🤔 \n Inténtalo más tarde ")
    } else if(codigoEstado === 403) {
        alert("Lo lamentamos!\n Usted no tiene acceso a esta área")
    } else if(codigoEstado === 400) {
        alert("Lo siento mucho!\n Ha habido un error 🤔 \n Inténtalo más tarde ")
    } else if(codigoEstado === 201) {
        alert("Su tarea se ha completado con éxito!! 😀 ")
    } else if(codigoEstado === 200) {
        console.log("Petición hecha correctamente")
    }
}

module.exports = { verificarCodigoEstado }