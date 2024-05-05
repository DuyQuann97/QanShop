using Microsoft.AspNetCore.Mvc;

namespace QanShop.Controllers
{
    public class CartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
