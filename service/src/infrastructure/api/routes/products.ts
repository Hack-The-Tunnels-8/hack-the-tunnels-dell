import express, { Request, Response } from "express";
import { ProductService } from "../../../services";
import { success, error, verifyAuthorization } from "../utils";

const router = express.Router();

const getProducts = async (_: Request, response: Response) => {
  const products = await ProductService.all();

  return success(response, {
    data: {
      products: products,
    },
    statusCode: 200,
  });
};

const getProduct = async (request: Request, response: Response) => {
  const id = request.params.id;
  const product = await ProductService.find(id);

  if (product === null) {
    return error(response, {
      error: "Product not found.",
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 200,
  });
};

const createProduct = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization,
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const product = await ProductService.create(
    request.body.title,
    request.body.description,
    request.body.price,
  );

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 201,
  });
};

const update = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization,
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const id = request.params.id;

  const originalProduct = await ProductService.find(id);

  if (originalProduct === null) {
    return error(response, {
      error: "Product not found.",
      statusCode: 404,
    });
  }

  const title = request.params.title === null ?
                originalProduct.title :
                request.params.title;
  const description = request.params.description === null ?
                      originalProduct.description :
                      request.params.description;
  const price = request.params.price === null ?
                originalProduct.price :
                parseFloat(request.params.price);
  const imageUrl = request.params.imageUrl === null ?
                   originalProduct.imageUrl :
                   request.params.imageUrl;

  const updatedProduct = await ProductService.update(
    id,
    title,
    description,
    price,
    imageUrl,
  );

  if (updatedProduct === null) {
    return error(response, {
      error: "Product not found.",
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      product: updatedProduct,
    },
    statusCode: 200,
  });
}

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", update)
router.post("/", createProduct);

export default router;
