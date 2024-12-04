const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require('cors')
const auth = require (`./routes/auth.route.js`)

app.use(`/api/auth`,auth)

// Middleware untuk mengizinkan permintaan dari domain lain (CORS)
app.use(cors())

// Mengimpor route user
const userRoute = require(`./routes/user.route.js`)
const attendance = require(`./routes/presensi.route`)

// Menggunakan route dengan prefix '/user'
app.use('/api/user', userRoute)
app.use('/api/attendance', attendance)

// Menjalankan server pada port yang telah ditentukan
app.listen(PORT, () => {
    console.log(`Server presensi online lagi jalan di port ${PORT}`)

})