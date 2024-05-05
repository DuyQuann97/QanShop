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

        [Route("Load-data")]
        [HttpGet]
        public async Task<IActionResult> LoadData()
        {
            var categories = await _dbContext.categories.ToListAsync();
            return Ok(categories);
        }

        [Route("LoadDataById")]
        public async Task<IActionResult> LoadDataById(Guid id)
        {
            var result = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpPost]
        [Route("AddCategory")]
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
        [Route("EditCategory")]
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
        [Route("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result = await _dbContext.categories.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            _dbContext.categories.Remove(result);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
