using Microsoft.AspNetCore.Mvc;

namespace QanShop.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
