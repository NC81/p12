import MockStore from '../services/mock-store'

export default class Format {
  constructor(id) {
    const newMockStore = new MockStore(id)
    this._performance = newMockStore._performance
    this._weekSessions = newMockStore._weekSessions
    this._activity = newMockStore._activity
  }

  get performance() {
    const newKind = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité',
    }
    const { data } = this._performance

    data.map((el) => {
      return (el.type = newKind[el.kind])
    })

    return data.toReversed()
  }

  get weekSessions() {
    const days = {
      0: '',
      1: 'L',
      2: 'M',
      3: 'M',
      4: 'J',
      5: 'V',
      6: 'S',
      7: 'D',
    }
    const { sessions } = this._weekSessions

    if (sessions.length === 7) {
      sessions.unshift({ day: 0, sessionLength: sessions[0].sessionLength })
      sessions.push({ day: 0, sessionLength: sessions[7].sessionLength })
    }

    sessions.map((el) => {
      return (el.letter = days[el.day])
    })

    return sessions
  }

  get activity() {
    const { sessions } = this._activity

    sessions.map((el) => {
      const dayString = el.day.split('-')[2]
      return (el.number = dayString.includes('0')
        ? el.day.split('-')[2].replace('0', '')
        : null)
    })

    return sessions
  }
}
