using Microsoft.AspNetCore.Mvc;
using QanShop.Data;

namespace QanShop.Controllers
{
    public class ShopController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly QanShopDBContext _dbContext;
        public ShopController(ILogger<HomeController> logger, QanShopDBContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            var products = _dbContext.products.ToList();

            return View(products);
        }
    }
}
