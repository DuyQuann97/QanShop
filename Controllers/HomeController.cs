using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models;
using QanShop.Models.Domains;
using System.Diagnostics;

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

        public IActionResult Shirt()
        {
            var products = _dbContext.products.ToList();
            return View(products);
        }

        public IActionResult Trouser()
        {
            var products = _dbContext.products.ToList();
            return View(products);
        }

        public IActionResult Cart()
        {
            return View();
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult PageDetail([FromRoute] Guid id) 
        {
            var productById = _dbContext.products.FirstOrDefault(x => x.Id == id);
            if (productById == null) 
            {
                return NotFound();
            }
            return View(productById);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
