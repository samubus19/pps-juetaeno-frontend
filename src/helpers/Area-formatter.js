const formatearArea = (area) => {
    if(area.toLowerCase() === "MIEMBROSJUNTA".toLowerCase()) {
        return "Miembros de Junta"
    }else if(area.toLowerCase() === "LEGALES".toLowerCase()) {
        return "Legales"
    }else if(area.toLowerCase() === "SECRETARIA".toLowerCase()) {
        return "Secretaria"
    }else if(area.toLowerCase() === "MESAENTRADA".toLowerCase()) {
        return "Mesa de Entrada"
    }
}

module.exports = { formatearArea }