using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Areas.Identity.Data;
using QanShop.Data;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly UserManager<QanShopUser> _userManager;
        private readonly IUserStore<QanShopUser> _userStore;
        private readonly QanShopUserContext _userContext;

        public AccountController(UserManager<QanShopUser> userManager, IUserStore<QanShopUser> userStore,QanShopUserContext userContext)
        {
            _userContext = userContext;
            _userManager = userManager;
            _userStore = userStore;
        }

        // Get: Admin/Account
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("all")]
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            try 
            {
                var users =await  _userContext.Users.ToListAsync();
                return Ok(users);
            }
            catch(Exception ex) 
            {
                return StatusCode(500, ex.Message);
            }
        }


        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> Create(string userName, string email, string passWord, bool EmailConfirmed = false) 
        {
            var newUser = CreateUser();
            newUser.UserName = userName;
            newUser.Email = email;
            newUser.EmailConfirmed = EmailConfirmed;
            newUser.NormalizedEmail = email.ToUpper();
            newUser.NormalizedUserName = userName.ToUpper();

            await _userStore.SetUserNameAsync(newUser, email, CancellationToken.None);
            var result = await _userManager.CreateAsync(newUser, passWord);
            if (result.Succeeded) 
            {
                return Ok(result);
            }
            return BadRequest(result);

        }

        private QanShopUser CreateUser()
        {
            try 
            {
                return Activator.CreateInstance<QanShopUser>();
            }
            catch(Exception ex) 
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(QanShopUser)}'. " +
                    $"Ensure that '{nameof(QanShopUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }
    }
}
