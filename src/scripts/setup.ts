import { setupHotelApi } from './hotel'

const main = async () => {
  await setupHotelApi()
}

main()
  .then(() => console.log('Executado com sucesso'))
  .catch((e) => console.error(e))
