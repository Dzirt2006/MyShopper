const app= require ('./server')
const PORT = process.env.PORT || 8080;



  app.listen(PORT, () =>
    console.log(
      `studiously serving silly sounds on port http://localhost:${PORT}`
    )
  )
 