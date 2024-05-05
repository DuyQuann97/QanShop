using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("User")]
    public class UserController : Controller
    {
        private readonly QanShopDBContext _dbContext;

        public UserController(QanShopDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var users = _dbContext.users.ToList();
            return View(users);
        }

        [Route("Load-data")]
        [HttpGet]
        public async Task<IActionResult> LoadData()
        {
            var users = await _dbContext.users.ToListAsync();
            return Ok(users);
        }

        [Route("LoadDataById")]
        [HttpGet]
        public async Task<IActionResult> LoadDataById(Guid id)
        {
            var result = await _dbContext.users.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> AddUser(User user)
        {
            User newUser = new User
            {
                Id = Guid.NewGuid(),
                UserName = user.UserName,
                Password = user.Password,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Address = user.Address,
                Telephone = user.Telephone,
            };
            _dbContext.users.Add(newUser);
            await _dbContext.SaveChangesAsync();
            return Ok(newUser);
        }

        [HttpPut]
        [Route("EditUser")]
        public async Task<IActionResult> EditUser(User newUser)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(x => x.Id == newUser.Id);
            if (user != null)
            {
                user.UserName = newUser.UserName;
                user.Password = newUser.Password;
                user.FirstName = newUser.FirstName;
                user.LastName = newUser.LastName;
                user.Email = newUser.Email;
                user.Address = newUser.Address;
                user.Telephone = newUser.Telephone;

                _dbContext.users.Update(user);
                await _dbContext.SaveChangesAsync();
            }

            return Ok(user);
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _dbContext.users.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(result);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
