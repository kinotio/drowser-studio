const seed = async () => {
  await import('@/server/db/seeds/plan')
}

seed()
  .then(() => console.log('[✓] seeds applied successfully!'))
  .catch((error) => console.error('[✗] seeds failed to apply:', error))
