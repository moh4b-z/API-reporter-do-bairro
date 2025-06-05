const AuxiliaryFunctions = require("../../utils/auxiliaryFunctions");

async function buscarCoordenadasComEndereco(endereco) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&addressdetails=1&limit=1`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': 'pt-BR', // Melhorar nome dos locais para pt
        }
      }
    )

    if (!response.ok) throw new Error('Erro ao buscar coordenadas.')

    const data = await response.json()
    if (data.length === 0) return null

    const { lat, lon, name = '', display_name } = data[0]
    const cep = AuxiliaryFunctions.extrairCEP(display_name)

    return {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      display_name,
      cep
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas com endereço:', error)
    return null
  }
}


module.exports = {
    buscarCoordenadasComEndereco
};