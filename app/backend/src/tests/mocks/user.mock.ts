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
  email: "validEmail@gmail.com",
  username: "validUsername"
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJ1c2VybmFtZSI6IlVzZXIiLCJpYXQiOjE2OTU3NTE5NzUsImV4cCI6MTY5NjM1Njc3NX0.5aYiiKd5gz-q-NS9Ilbpc-QsbBYYut1aPU4OLGbI74I'

export { user, payload, token};