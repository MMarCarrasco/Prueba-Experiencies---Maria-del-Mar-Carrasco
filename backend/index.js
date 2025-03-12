const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Datos de ejemplo (simulan una base de datos)
const usuarios = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    email: `admin${i + 1}@yopmail.com`,
    name: `admin${i + 1}`,
    surname1: `admin${i + 1}`,
    surname2: `admin${i + 1}`
}));

// Endpoint para obtener usuarios paginados y filtrados
app.post('/api/usuarios', (req, res) => {
    const { page = 1, search = '' } = req.body;
  
    // Filtrar usuarios por nombre, apellidos o correo electrónico
    const filteredUsers = usuarios.filter(user => {
      const lowerCaseSearch = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user.surname1.toLowerCase().includes(lowerCaseSearch) ||
        user.surname2.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch)
      );
    });
  
    // Paginación (5 usuarios por página)
    const pageSize = 5;
    const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  
    // Enviar la respuesta al frontend con los usuarios filtrados y paginados
    res.json({
      usuarios: paginatedUsers,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / pageSize),
      currentPage: Number(page)
    });
  });
  
  // Iniciar el servidor en el puerto 3000
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });