const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
}


const payload = {
  id: 1,
  role: "admin",
  email: "admin@admin.com",
  username: "validUsername"
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjk1OTM5ODMwLCJleHAiOjE2OTY1NDQ2MzB9.lEATaKlFGk2KzVn4wDdcR999HBbd8lwQ6E7zKBYR7Lc'

export { user, payload, token};