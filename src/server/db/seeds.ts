const main = async () => {
  await import('@/server/db/seeds/plan')
}

main().finally(() => console.log('[✓] seeds applied successfully!'))
