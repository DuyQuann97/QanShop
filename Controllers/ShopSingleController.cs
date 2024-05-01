using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Controllers
{
    public class ShopSingleController : Controller
    {
        private readonly QanShopDBContext _dbContext;
        public ShopSingleController(ILogger<HomeController> logger, QanShopDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Index([FromRoute] Guid id)
        {
            var result = await _dbContext.products.FirstOrDefaultAsync(x => x.Id == id);

            if (result == null)
            {
                return NotFound();
            }
            return View(result);
        }
    }
}
