import { SpotStatus } from '../types'

export const getStatusColor = (status: SpotStatus): string => {
  return status === SpotStatus.ACTIVE
    ? '#BBF7D0'
    : status === SpotStatus.INACTIVE
      ? '#FECACA'
      : '#FEF08A'
}
