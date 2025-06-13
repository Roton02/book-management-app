const calculatePenalty = (
  issueDate: Date,
  returnDate: Date,
  allowedHours: number,
): number => {
  // Calculate time difference in minutes
  const diffInMinutes = Math.ceil(
    (returnDate.getTime() - issueDate.getTime()) / (1000 * 60),
  )

  // Convert allowed hours to minutes
  const allowedMinutes = allowedHours * 60

  // If returned within allowed time, no penalty
  if (diffInMinutes <= allowedMinutes) {
    return 0
  }

  // Calculate overtime in minutes
  const overtimeMinutes = diffInMinutes - allowedMinutes

  // Define penalty rates
  const penaltyPerMinute = 0.5 // 1 TK per minute
  const penaltyPerHour = 50 // 50 TK per hour
  const penaltyPerDay = 200 // 200 TK per day

  // Calculate based on overtime duration
  if (overtimeMinutes <= 60) {
    // If overtime is less than an hour, charge per minute
    return overtimeMinutes * penaltyPerMinute
  } else if (overtimeMinutes <= 24 * 60) {
    // If overtime is less than a day, charge per hour
    const overtimeHours = Math.ceil(overtimeMinutes / 60)
    return overtimeHours * penaltyPerHour
  } else {
    // If overtime is more than a day, charge per day
    const overtimeDays = Math.ceil(overtimeMinutes / (24 * 60))
    return overtimeDays * penaltyPerDay
  }
}

export default calculatePenalty
