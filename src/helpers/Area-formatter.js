const formatearArea = (area) => {
    if(area.toLowerCase() === "MiembrosJunta".toLowerCase()) {
        return "Miembros de Junta"
    }else if(area.toLowerCase() === "Legales".toLowerCase()) {
        return "Legales"
    }else if(area.toLowerCase() === "Secretaria".toLowerCase()) {
        return "Secretaria"
    }else if(area.toLowerCase() === "MesaEntrada".toLowerCase()) {
        return "Mesa de Entrada"
    }
}

module.exports = { formatearArea }