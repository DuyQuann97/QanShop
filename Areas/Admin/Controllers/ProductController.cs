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

        [Route("byid/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try 
            {
                var result = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch(Exception ex) 
            {
                return StatusCode(500, ex.Message); 
            }
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
                product.Category = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == categoryId);
                product.Id = Guid.NewGuid();
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
        [Route("update")]
        public async Task<IActionResult> Update(Product product,IFormFile file, Guid categoryId) 
        {
            try
            {
                var item = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == product.Id);
                if (item == null) return NotFound();
                if (file != null)
                {
                    item.ImageUrl = FilesManagement.UploadImage(file);
                }
                item.Category = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == categoryId);
                item.Name = product.Name;
                item.Description = product.Description;
                item.price = product.price;
                item.IsActive = product.IsActive;   
                _dbContext.products.Update(item);
                await _dbContext.SaveChangesAsync();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(List<Guid> ids)
        {
            try 
            {
                foreach (var id in ids)
                {
                    var result = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == id);
                    if (result == null) return NotFound(id);
                    if (!string.IsNullOrEmpty(result.ImageUrl)) FilesManagement.RemoveImage(result.ImageUrl);
                    _dbContext.products.Remove(result);
                }
                await _dbContext.SaveChangesAsync();
                return Ok();
            } catch (Exception ex) 
            {
                return StatusCode(500,ex.Message);
            }
            
        }
    }
}
