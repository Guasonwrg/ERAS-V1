const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModels');
const InformeCambios = require('../models/cambiosPesticidasModels');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, family_name } = ticket.getPayload();
    const apellido = family_name || 'Sin Apellido';

    let user = await User.findOne({ where: { Email: email } });

    if (!user) {
      user = await User.create({
        Nombre: name,
        Apellido: apellido,
        Email: email,
        Empresa: 'Sin Asignar',
        Rol: 'Comun',
        Contraseña: '',
      });
    }

    const jwtToken = jwt.sign(
      { Id: user.Id, email: user.Email, role: user.Rol, Empresa: user.Empresa },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    const cambiosPendientes = await InformeCambios.findOne({ where: { estado: 'pendiente' } });
    const tieneCambiosPendientes = !!cambiosPendientes;

    res.json({ token: jwtToken, user, tieneCambiosPendientes });
  } catch (error) {
    console.error('Error en Google login:', error);
    res.status(500).json({ message: 'Error de autenticación' });
  }
};

module.exports = { googleLogin };
