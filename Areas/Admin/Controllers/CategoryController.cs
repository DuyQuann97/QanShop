using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Category")]
    public class CategoryController : Controller
    {
        private readonly QanShopDBContext _dbContext;
        public static List<Category> categories = new List<Category>();

        public CategoryController(QanShopDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        [Route("")]
        [HttpGet]
        public IActionResult Index()
        {
            var categories = _dbContext.categories.ToList();
            return View(categories);
        }

        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var items = await _dbContext.categories.OrderBy(x => x.Name).ToListAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Route("load-data")]
        [HttpGet]
        public async Task<IActionResult> LoadData()
        {
            var categories = await _dbContext.categories.ToListAsync();
            return Ok(categories);
        }

        [Route("byid/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var result = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddCategory(Category category)
        {
            Category newCategory = new Category
            {
                Id = Guid.NewGuid(),
                Name = category.Name
            };
            _dbContext.categories.Add(newCategory);
            await _dbContext.SaveChangesAsync();
            return Ok(newCategory);
        }


        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> EditCategory(Category category)
        {
            var item = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == category.Id);
            if (item != null)
            {
                item.Name = category.Name;
                _dbContext.categories.Update(item);
                await _dbContext.SaveChangesAsync();
            }

            return Ok(item);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteCategory(List<Guid> ids)
        {
            try 
            {
                foreach (var id in ids)
                {
                    var result = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == id);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    _dbContext.categories.Remove(result);
                }
                await _dbContext.SaveChangesAsync();
                return Ok();
            }catch (Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
            
        }
    }
}
