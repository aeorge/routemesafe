import { SpotSeverity } from '../types'

export const getSeverityColor = (severity: SpotSeverity): string => {
  return severity === 1
    ? '#FACC15'
    : severity === 2
      ? '#FB923C'
      : severity === 3
        ? '#F87171'
        : '#C084FC'
}
