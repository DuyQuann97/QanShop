using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Areas.Identity.Data;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Account")]
    public class AccountController : Controller
    {
        private readonly UserManager<QanShopUser> _userManager;
        private readonly IUserStore<QanShopUser> _userStore;
        private readonly QanShopUserContext _userContext;

        public AccountController(UserManager<QanShopUser> userManager, IUserStore<QanShopUser> userStore, QanShopUserContext userContext)
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

        //Get: Admin/Account/All
        [Route("all")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _userContext.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Route("byid/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if (user == null) return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        //Post: Admin/Account/Create
        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> Create(string userName, string email, string passWord, bool emailConfirmed = false) 
        {
            var newUser = CreateUser();
            newUser.UserName = userName;
            newUser.Email = email;
            newUser.EmailConfirmed = emailConfirmed;
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

        //Put: Admin/Account/update/id
        [Route("update/{id}")]
        [HttpPut]
        public async Task<IActionResult> Update(Guid id, string? userName, string? email, bool emailConfirmed) 
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user != null) 
            {
                user.UserName = userName;
                user.Email = email;
                user.EmailConfirmed = emailConfirmed;
            };
            

            var result = await _userManager.UpdateAsync(user);
            return Ok(result);
        }

        //Delete: Admin/Account/delete/id
        [Route("delete")]
        [HttpDelete]
        public async Task<IActionResult> Delete(List<Guid> ids) 
        {
            foreach (var id in ids)
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if (user == null) return NotFound();
                await _userManager.DeleteAsync(user);
                
            }
            return Ok();
        }
    }
}
