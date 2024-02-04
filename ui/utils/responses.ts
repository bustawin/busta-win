export function raiseNotFound(): never {
  throw new Response(null, { status: 404 })
}
