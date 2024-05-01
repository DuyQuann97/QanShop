using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models;
using QanShop.Models.Domains;
using System.Diagnostics;
using System.Drawing.Drawing2D;

namespace QanShop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly QanShopDBContext _dbContext;
        public HomeController(ILogger<HomeController> logger, QanShopDBContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        
        public IActionResult Index() 
        {
            var products = _dbContext.products.ToList();
            
            return View(products);
        }

      
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
