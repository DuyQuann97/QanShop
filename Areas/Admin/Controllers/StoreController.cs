using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("admin/{controller}")]
    [Authorize]
    public class StoreController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
