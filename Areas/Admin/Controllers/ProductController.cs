using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Product")]
    public class ProductController : Controller
    {
        private readonly QanShopDBContext _dbContext;
        public static List<Product> products = new List<Product>();

        public ProductController(QanShopDBContext dBContext) 
        {
            _dbContext = dBContext;
        }

        [Route("")]
        [HttpGet]
        public IActionResult Product()
        {
            var products = _dbContext.products.ToList();
            return View(products);
        }


        [Route("Load-data")]
        [HttpGet]
        public async Task<IActionResult> LoadData() 
        {
            var products = await _dbContext.products.ToListAsync();
            return Ok(products);
        }

        [Route("LoadDataById")]
        public async Task<IActionResult> LoadDataById(Guid id)
        {
            var result = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct(Product product) 
        {
            Product newProduct = new Product 
            {
                Id = Guid.NewGuid(),
                Name = product.Name,
                price = product.price,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                CategoryId = product.CategoryId,
            };
            _dbContext.products.Add(newProduct);
            await _dbContext.SaveChangesAsync();
            return Ok(newProduct);
        }


        [HttpPut]
        [Route("EditProdcut")]
        public async Task<IActionResult> EditProduct(Product product) 
        {
            var item = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == product.Id);
            if (item != null) 
            {
                item.Name = product.Name;
                item.price = product.price;
                item.Description = product.Description;
                item.ImageUrl = product.ImageUrl;
                item.CategoryId = product.CategoryId;
                _dbContext.products.Update(item);
                await _dbContext.SaveChangesAsync();
            }

            return Ok(item);
        }

        [HttpDelete]
        [Route("delete-product")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            _dbContext.products.Remove(result);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
