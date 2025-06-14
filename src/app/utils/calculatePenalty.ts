const calculatePenalty = (
  issueDate: Date,
  returnDate: Date,
  allowedHours: number,
): number => {
  console.log('hit the calculatePenalty function')
  // Calculate time difference in minutes
  const diffInMinutes = Math.ceil(
    (returnDate.getTime() - issueDate.getTime()) / (1000 * 60 ),
  )
  console.log('diffInMinutes:', diffInMinutes)

  // Convert allowed hours to minutes
  const allowedMinutes = allowedHours * 60  // +30 Adding 30 minutes bonus period

  // If returned within allowed time, no penalty
  if (diffInMinutes <= allowedMinutes) {
    return 0
  }

  // Calculate overtime in minutes
  const overtimeHour = (diffInMinutes - allowedMinutes) / 60; // convert to hours
  console.log('overtimeHour:', overtimeHour)

  // Define penalty rates
  const penaltyPerHour = 10 // 10 TK per hour

  // Calculate based on overtime duration
  const penalty = Math.ceil(overtimeHour) * penaltyPerHour
  return penalty
}

export default calculatePenalty