using Microsoft.AspNetCore.Mvc;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Admin")]
    public class HomeController : Controller
    {
        private readonly QanShopDBContext _dbContext;

        public HomeController(QanShopDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Get: Admin/Home
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

    }
}
