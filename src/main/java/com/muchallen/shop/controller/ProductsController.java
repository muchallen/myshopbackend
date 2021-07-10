package com.muchallen.shop.controller;

import com.muchallen.shop.product.Product;
import com.muchallen.shop.service.ProductService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("api/v1/products/")
public class ProductsController {

    private ProductService productService;

    @Autowired
    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("all")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product prod = productService.insertProduct(product);
        return new ResponseEntity<>(prod,HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long id){
        Product prod = productService.updateProduct(product);
        return new ResponseEntity<>(prod, HttpStatus.ACCEPTED);
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<Product> getProduct (@PathVariable("id") Long id){
        Product product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteProduct (@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "uploadImage" ,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadImages (@RequestParam("file") MultipartFile file) throws IOException, URISyntaxException {
    String name = productService.fileUpload(file);
        JSONObject resp = new JSONObject();
        resp.put("image", name);
        return new ResponseEntity<>(resp.toString() ,HttpStatus.OK);

    }

}
