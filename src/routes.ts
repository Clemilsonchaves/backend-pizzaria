import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { isAuthenticated  } from "./middlewares/isAuthenticated";

const router = Router();


//-- Rotas User --
router.post('/users', new CreateUserController().handle) // criar um usuário
router.post('/session', new AuthUserController().handle ) // logar um usuário 
router.get('/me', isAuthenticated, new DetailUserController().handle) // Detalhes do usuário

// -- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // Criando uma categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle)    // Listando uma categoria

export { router };