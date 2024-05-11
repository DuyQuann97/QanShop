using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Common;
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
        public IActionResult Index()
        {
            return View();
        }

        [Route("all")]
        public async Task<IActionResult> GetAll() 
        {
            try 
            {
                var items = await _dbContext.products.Include(x => x.Category).OrderBy(x => x.Name).ToListAsync();
                return Ok(items);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
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
        [Route("create")]
        public async Task<IActionResult> Create(Product product,IFormFile file, Guid categoryId) 
        {
            try 
            {
                if (file != null)
                {
                    product.ImageUrl = FilesManagement.UploadImage(file);
                }
                product.Id = Guid.NewGuid();
                product.Category =await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == categoryId);
                await _dbContext.AddAsync(product);
                await _dbContext.SaveChangesAsync();
                return Ok(product);
            } 
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }

        }


        [HttpPut]
        [Route("EditProduct")]
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
        [Route("DeleteProduct")]
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
