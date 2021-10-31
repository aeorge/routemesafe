import { SpotStatus } from '../types'

export const getStatusText = (status: SpotStatus): string => {
  return status === SpotStatus.ACTIVE
    ? 'Active'
    : status === SpotStatus.INACTIVE
      ? 'Inactive'
      : 'Pending'
}
