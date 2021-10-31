const LOCALE = 'de-DE'

export function formatDateTime(date: string): string {
  try {
    const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
      dateStyle: 'short',
      timeStyle: 'short'
    })

    const formattedDate = dateTimeFormat.format(new Date(date))

    return formattedDate
  } catch (error) {
    console.error(error)
    return '-'
  }
}
