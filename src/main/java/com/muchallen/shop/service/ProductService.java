package com.muchallen.shop.service;

import com.muchallen.shop.exception.ThrowIllegalProductException;
import com.muchallen.shop.product.Product;
import com.muchallen.shop.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProductService {

    private ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> getAllProducts(){
        return  productRepo.findAll();
    }

    public Product getProductById(Long id){
        return productRepo.getProductById(id).orElseThrow(() -> new ThrowIllegalProductException("Cannot find product with id"+id));
    }

    public Product insertProduct(Product product){
        product.setCode(UUID.randomUUID().toString());

        return productRepo.save(product);
    }

    public Product updateProduct(Product product){
        return productRepo.save(product);
    }

    public  void deleteProduct(Long id){

         productRepo.deleteProductById(id);
    }

    public String fileUpload (MultipartFile file) throws IllegalArgumentException, IOException {

        File path = new File(ResourceUtils.getURL("/target/classes/static").getPath());
        System.out.println(path.getAbsolutePath());
        // If the uploaded file is /static/successImage/content/ as follows
        File upload = new File(path.getAbsolutePath());
        if (!upload.exists()) upload.mkdirs();

        String imageName =""+ new Date().getTime()+ file.getOriginalFilename();

        file.transferTo(new File(upload+"/"+imageName));
        System.out.println(upload);
        return imageName;
    }
}
