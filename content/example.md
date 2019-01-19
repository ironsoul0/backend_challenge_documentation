## Marketplace

This is a documentation for API
which is a part of Shopify Backend
Challenge. Base URL for this API is
https://shopify-challenge-backend.herokuapp.com
Source code can be found at
https://github.com/ironsoul0/backend_challenge

### Get all products

Getting all products available in 
marketplace. Also you can pass an argument to only return products with available inventory. 


```endpoint
GET /products/all_products
```

#### Example request body

```json
{
  "only_available": "1"
}
```

Property | Description
---|---
`only_available` | (optional) should be equal to '1' if you want to only return products with available inventory.


#### Example response

```json
[
    {
        "_id": "5c3d627f2778a902af7c5696",
        "title": "water",
        "price": 30,
        "inventory_count": 4,
        "__v": 0
    },
    {
        "_id": "5c3d635a145ce802bd2dd095",
        "title": "bread",
        "price": 12,
        "inventory_count": 0,
        "__v": 0
    },
    {
        "_id": "5c3d65b71a0e3f0301c11d06",
        "title": "milk",
        "price": 5,
        "inventory_count": 9,
        "__v": 0
    }
]
```

### Single product

Returns information about one product
based on its title.

```endpoint
GET /products/single_product
```
#### Example request body

```json
{
  "title": "duck"
}
```

Property | Description
---|---
`title` | (required) title of the product.

#### Example response (product with such title exists)

```json
{
    "_id": "5c3d95655fea3302750818a3",
    "title": "duck",
    "price": 11,
    "inventory_count": 2,
    "__v": 0
}
```

#### Example response (product with such title does not exist)

```json
{
    "message": "No product with such title"
}
```

### Purchase a product

Decreasing the inventory count of the 
product by 1, if possible.

```endpoint
PUT /products/purchase_product
```

#### Example request body

```json
{
  "title": "milk"
}
```

Property | Description
---|---
`title` | (required) title of the product.


#### Example response (product with such title exists and inventory count is greater than 0)

```json
{
    "message": "Purchase completed",
    "new_inventory_count": 8
}
```

#### Example response (product with such title exists and inventory count equals to 0)

```json
{
    "message": "Inventory count of the product is zero"
}
```

#### Example response (product with such title does not exist)

```json
{
    "message": "No product with such title"
}
```