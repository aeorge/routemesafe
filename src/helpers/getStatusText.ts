import { SpotStatus } from '../types'

export const getStatusText = (status: SpotStatus): string => {
  return status === 'active'
    ? 'Active'
    : status === 'inactive'
      ? 'Inactive'
      : 'Pending'
}
