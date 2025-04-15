const seed = async () => {}

seed()
  .then(() => console.log('[✓] seeds applied successfully!'))
  .catch((error) => console.error('[✗] seeds failed to apply:', error))
