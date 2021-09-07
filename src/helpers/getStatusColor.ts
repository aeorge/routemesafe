import { SpotStatus } from '../types'

export const getStatusColor = (status: SpotStatus): string => {
  return status === 'active'
    ? '#BBF7D0'
    : status === 'inactive'
      ? '#FECACA'
      : '#FEF08A'
}
