export const GET = () => {
  return new Response(JSON.stringify({ message: 'Health is OK' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
