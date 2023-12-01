import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated  } from "./middlewares/isAuthenticated";

const router = Router();


//-- Rotas User --
router.post('/users', new CreateUserController().handle) // criar um usuário
router.post('/session', new AuthUserController().handle ) // logar um usuário 
router.get('/me', isAuthenticated, new DetailUserController().handle) // Detalhes do usuário

export { router };