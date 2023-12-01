import { setupFlightApi } from './flight'
import { setupHotelApi } from './hotel'
import { bootstrap } from './seed'

const main = async () => {
  setupHotelApi()
    .then(() => console.log('Hotel API - SUCCESS'))
    .catch(() => console.log('Hotel API - FAIL'))
  setupFlightApi()
    .then(() => console.log('Flight API - SUCCESS'))
    .catch(() => console.log('Flight API - FAIL'))

  bootstrap()
    .then(() => console.log('Flight Seed API - SUCCESS'))
    .catch(() => console.log('Flight Seed API - FAIL'))
}

main()
  .then(() => console.log('Executado com sucesso'))
  .catch((e) => console.error(e))
