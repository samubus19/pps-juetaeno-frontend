const formatearArea = (area) => {
    if(area.toLowerCase() === "MiembrosJunta".toLowerCase()) {
        area = "Miembros de Junta"
    }else if(area.toLowerCase() === "Legales".toLowerCase()) {
        area = "Legales"
    }else if(area.toLowerCase() === "Secretaria".toLowerCase()) {
        area = "Secretaria"
    }else if(area.toLowerCase() === "MesaEntrada".toLowerCase()) {
        area = "Mesa de Entrada"
    }

    return area;
}

module.exports = { formatearArea }