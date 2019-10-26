export const base64url = (data) => {
  return Buffer.from(JSON.stringify(data)).toString('base64')
               .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

export const getJWT = () => {
  const header = { "alg": "HS256", "typ": "JWT" }
  const data = {
    id: 36,
    email: 'sample@test.io',
    exp: Date.now() / 1000  + 3800,
  }
  return  base64url(header) + "." + base64url(data) + ".random"
}
