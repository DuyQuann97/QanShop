using AspNetCoreHero.ToastNotification.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Admin")]
    [Authorize]
    public class HomeController : Controller
    {
        private readonly QanShopDBContext _dbContext;
        private readonly INotyfService _notyf;

        public HomeController(QanShopDBContext dbContext,INotyfService notyf)
        {
            _dbContext = dbContext;
            _notyf = notyf;
        }

        // Get: Admin/Home
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

    }
}
