import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from  "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController }  from "./controllers/order/DetailOrderController"; 
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated  } from "./middlewares/isAuthenticated";

import uploadConfig  from "./config/multer";


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));


//-- Rotas User --
router.post('/users', new CreateUserController().handle) // criar um usuário
router.post('/session', new AuthUserController().handle ) // logar um usuário 
router.get('/me', isAuthenticated, new DetailUserController().handle) // Detalhes do usuário

// -- ROTAS CATEGORY 
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // Criando uma categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle)    // Listando uma categoria

// -- ROTAS PRODUTOS 
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)  // Cadastrar um produto
router.get('/category/product',isAuthenticated, new ListByCategoryController().handle)       // Listando todos os produtos em uma Categoria

// -- ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle) // Criando uma Order
router.delete('/order', isAuthenticated, new RemoveOrderController().handle) // Deletando uma Order

router.post('/order/add', isAuthenticated, new AddItemController().handle) // Adicionando produto numa order
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle) // Removendo um produto da Mesa

router.put('/order/send', isAuthenticated, new SendOrderController().handle) // Enviar um pedido

router.get('/orders', isAuthenticated, new ListOrdersController().handle) // Chamando  os ultimos pedidos
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle) //  Ver os detalhes do pedido

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) // Finalizanndo a order

export { router }; 


 