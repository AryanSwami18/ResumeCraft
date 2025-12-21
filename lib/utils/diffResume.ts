export function diffResume(
  current: Record<string, any>,
  lastSaved: Record<string, any>
) {
  const changes: Record<string, any> = {}

  for (const key in current) {
    const currentValue = current[key]
    const lastValue = lastSaved[key]

    // If field did not exist before, treat as changed
    if (lastValue === undefined && currentValue !== undefined) {
      changes[key] = currentValue
      continue
    }

    // Compare values 
    if (
      JSON.stringify(currentValue) !==
      JSON.stringify(lastValue)
    ) {
      changes[key] = currentValue
    }
  }

  return changes
}
