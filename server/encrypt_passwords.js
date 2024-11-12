const bcrypt = require('bcryptjs');
const User = require('./models/userModels'); // Asegúrate de que la ruta sea correcta

const encriptarContraseñas = async () => {
  try {
    // Si usas Sequelize, asegúrate de inicializar la conexión con la base de datos
    const sequelize = require('./config/database'); // Ajusta la ruta si es necesario
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Busca todos los usuarios en la base de datos
    const users = await User.findAll();
    for (const user of users) {
      // Verifica si la contraseña existe y si ya está encriptada
      if (!user.Contraseña) {
        console.log(`Usuario ${user.Email} no tiene contraseña asignada.`);
        continue; // Salta a la siguiente iteración si no hay contraseña
      }

      const contraseñaEsTextoPlano = !user.Contraseña.startsWith('$2a$'); // Comprueba si ya está encriptada
      if (contraseñaEsTextoPlano) {
        // Si no está encriptada, la encripta
        const hashedPassword = await bcrypt.hash(user.Contraseña, 10);
        user.Contraseña = hashedPassword;
        await user.save();
        console.log(`Contraseña de ${user.Email} encriptada.`);
      } else {
        console.log(`Contraseña de ${user.Email} ya está encriptada.`);
      }
    }
    console.log('Contraseñas encriptadas correctamente.');
  } catch (error) {
    console.error('Error al encriptar las contraseñas:', error);
  } finally {
    process.exit(); // Cierra el proceso una vez terminado
  }
};

encriptarContraseñas();

