import express from 'express'
import router from './routes';

const app = express();

app.use(express.json())
app.use(router)

// app.post('/users', (request, response) => {
//   const {name, email} = request.body;

//   const user = {
//     name,
//     email
//   }

//   return response.json({message: 'Cássio Almeron is back again!!!', user})
// });

app.listen(3333, () => console.log("Server started!!!"))
