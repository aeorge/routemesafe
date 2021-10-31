const LOCALE = 'de-DE'

export function formatDate(date: string): string {
  try {
    const dateFormat = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'short' })

    const formattedDate = dateFormat.format(new Date(date))

    return formattedDate
  } catch (error) {
    console.error(error)
    return '-'
  }
}
