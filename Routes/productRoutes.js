const express=require('express')

const {
    authenticate,
    getUsers,
    updateUsersByPost,
    deleteUsersById,
    getAllProducts,
    getAllProductsById,
    deleteProductById,
    addProductByPost,
    updateProductByPut,
    productPatchUpdate,
    productDeleteBody
}=require('../controllers/product')

const router=express.Router()

router.get("/users",getUsers)

router.post("/users/add",authenticate,updateUsersByPost)

router.delete("/users/delete/:id",deleteUsersById)

router.get('/products',getAllProducts)

router.get("/products/:id",getAllProductsById)

router.delete("/products/delete/:productId",deleteProductById)

router.post('/products/add',addProductByPost)
//UPDATE ALWAYS FOLLOW UPSERT CONCEPT -- Update and Insert

router.put('/products/update-complete',updateProductByPut)


router.patch('/products/update-field',productPatchUpdate)

router.delete('/products/delete',productDeleteBody)

exports.router=router