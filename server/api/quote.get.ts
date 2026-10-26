export default defineEventHandler((event) => {
  setResponseStatus(event, 405)
  return {
    error: true,
    statusCode: 405,
    statusMessage: 'Method Not Allowed: Bu uç nokta yalnızca POST isteklerini kabul etmektedir. Teklif verileri herkese açık sorgulanamaz.'
  }
})
