import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import { isAuthenticated  } from "./middlewares/isAuthenticated";

import uploadConfig  from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));


//-- Rotas User --
router.post('/users', new CreateUserController().handle) // criar um usuário
router.post('/session', new AuthUserController().handle ) // logar um usuário 
router.get('/me', isAuthenticated, new DetailUserController().handle) // Detalhes do usuário

// -- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // Criando uma categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle)    // Listando uma categoria

// -- ROTAS PRODUTOS 
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)  // Cadastrar um produto

export { router };