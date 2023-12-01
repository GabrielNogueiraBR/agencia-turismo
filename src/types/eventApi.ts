export type Event = {
  id: number
  category: string
  name: string
  startTime: string
  emailContact: string
  priceTicket: number
  place: {
    id: number
    city: string
    address: string
  }
}
