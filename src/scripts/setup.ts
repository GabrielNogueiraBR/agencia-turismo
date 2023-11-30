import { setupFlightApi } from './flight'
import { setupHotelApi } from './hotel'

const main = async () => {
  await setupHotelApi()
  await setupFlightApi()
}

main()
  .then(() => console.log('Executado com sucesso'))
  .catch((e) => console.error(e))
