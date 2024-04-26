import userDTOResponse from "../dto/responses/user.response.dto.js";
class AuthController {
  async viewLogin(req, res) {
    try {
      res.render("login");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async viewRegister(req, res) {
    try {
      res.render("register");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getCurrentUser(req, res) {
    /**No consulta a la DB, sino que obtiene el user del req
     * (passport lo guarda en el req luego del login)
     */
    try {
      const user = await req.user;
      const userDTO = new userDTOResponse(user);
      res.json(userDTO);
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
  async logout(req, res) {
    // Hace logout y elimina la sesión del usuario autenticado
    req.logout(function (err) {
      if (err) {
        // Maneja el error de logout
        console.error(err);
        // Redirige a una página de error o manejo de errores
        return res.redirect("/error");
      }

      // Redirige al usuario a la ruta de autenticación
      res.render("login");
    });
  }

  async redirectToHome(req, res) {
    res.redirect("/home");
  }
}

const authController = new AuthController();
const { viewLogin, viewRegister, getCurrentUser, logout, redirectToHome } =
  authController;
export { viewLogin, viewRegister, getCurrentUser, logout, redirectToHome };
