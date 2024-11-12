const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const InformeCambios = require('../models/cambiosPesticidasModels');

// Controlador para manejar el inicio de sesióncls
const loginUser = async (req, res) => {
  const { Email, Contraseña } = req.body;

  try {
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { Id: user.Id, Email: user.Email, Rol: user.Rol, Empresa: user.Empresa },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    // Verificar si hay cambios pendientes
    const cambiosPendientes = await InformeCambios.findOne({ where: { estado: 'pendiente' } });
    console.log(cambiosPendientes);
    const tieneCambiosPendientes = !!cambiosPendientes; // true si hay cambios
    console.log(tieneCambiosPendientes);
    res.json({
      token,
      user: {
        Id: user.Id,
        Nombre: user.Nombre,
        Apellido: user.Apellido,
        Email: user.Email,
        Rol: user.Rol,
        Empresa: user.Empresa,
      },
      tieneCambiosPendientes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al autenticar' });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  console.log("Solicitud para crear usuario recibida");
  const { Nombre, Apellido, Email, Contraseña, Empresa, Rol } = req.body;
  try {
    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    // Crear el usuario
    const newUser = await User.create({
      Nombre,
      Apellido,
      Email,
      Contraseña: hashedPassword,
      Empresa,
      Rol
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};


// Actualizar un usuario
const updateUser = async (req, res) => {
  const { Nombre, Apellido, Email, Contraseña, Empresa, Rol } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const hashedPassword = Contraseña ? await bcrypt.hash(Contraseña, 10) : user.Contraseña;

    await user.update({
      Nombre,
      Apellido,
      Email,
      Contraseña: hashedPassword,
      Empresa,
      Rol
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
};

// Controlador para que los usuarios comunes actualicen su perfil
const updateUserProfile = async (req, res) => {
  const { Nombre, Apellido, Email, Contraseña, Empresa } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que el usuario esté actualizando su propio perfil
    if (user.Id !== req.user.id) {
      return res.status(403).json({ message: 'No puedes actualizar este perfil' });
    }

    // Actualizar solo los campos permitidos
    const hashedPassword = Contraseña ? await bcrypt.hash(Contraseña, 10) : user.Contraseña;

    await user.update({
      Nombre,
      Apellido,
      Email,
      Contraseña: hashedPassword,
      Empresa,
    });

    res.status(200).json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil', error });
  }
};


// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};


module.exports = {
  loginUser,
  createUser,   
  getUsers,
  getUserById,
  updateUser,
  updateUserProfile,
  deleteUser,
};
