using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Areas.Identity.Data;
using QanShop.Data;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("assignment")]
    public class AssignmentController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<QanShopUser> _userManager;
        private readonly QanShopUserContext _userContext;

        public AssignmentController(RoleManager<ApplicationRole> roleManager,
                                    UserManager<QanShopUser> userManager,
                                    QanShopUserContext userContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _userContext = userContext;
        }

        #region Roles
        [Route("roles")]
        public IActionResult Roles()
        {
            return View();
        }

        [Route("roles/all")]
        public async Task<IActionResult> GetAllRoles() 
        {
            var items = await _roleManager.Roles.ToListAsync();
            return Ok(items);
        }

        [Route("roles/{id}")]
        public async Task<IActionResult> GetRoleById(Guid id) 
        {
            var item = await _roleManager.FindByIdAsync(id.ToString());
            return Ok(item);
        }

        [Route("roles")]
        [HttpPost]
        public async Task<IActionResult> CreateRole(ApplicationRole role) 
        {
            role.NormalizedName = role.Name.ToUpper();
            var check = await _roleManager.FindByNameAsync(role.NormalizedName);
            if (check != null) return BadRequest("This Role already exist");
            var result = await _roleManager.CreateAsync(role);
            return Ok(result);
        }

        [Route("roles")]
        [HttpPut]
        public async Task<IActionResult> UpdateRole(ApplicationRole role) 
        {
            var oldRole = await _roleManager.FindByIdAsync(role.Id);
            if (oldRole == null) return NotFound();

            oldRole.Name = role.Name;
            oldRole.NormalizedName = role.Name.ToUpper();
            oldRole.Description = role.Description;
            oldRole.IsActive = role.IsActive;
            var result = await _roleManager.UpdateAsync(oldRole);
            return Ok(result);
        }

        [Route("roles")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRole(List<Guid> ids) 
        {
            foreach (var id in ids)
            {
                var check = await _roleManager.FindByIdAsync(id.ToString());
                if (check == null) return BadRequest("Delete Failed");
                await _roleManager.DeleteAsync(check);
            }
            return Ok();
        }

        #endregion

        #region Permission

        [Route("permission")]
        public async Task<IActionResult> Permission() 
        {
            return View();
        }

        [Route("permission/all")]
        public async Task<IActionResult> GetAllPermission() 
        {
            var query = from userrole in _userContext.UserRoles
                        join user in _userContext.Users on userrole.UserId equals user.Id
                        join role in _userContext.Roles on userrole.RoleId equals role.Id
                        select new
                        {
                            userrole.UserId,
                            user.UserName,
                            user.Email,
                            userrole.RoleId,
                            RoleName = role.Name,
                        };

            var result= await query.ToListAsync();
            return Ok(result);
        }

        [Route("permission/create")]
        public async Task<IActionResult> CreatePermission(string userId, string roleId) 
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roleName =  _roleManager.FindByIdAsync(roleId).Result?.Name;
            if (roleName == "") return BadRequest("Role Not Found");

            var result =await _userManager.AddToRoleAsync(user, roleName);
            if (result.Succeeded) return Ok();
            return BadRequest(result.Errors);
        }


        #endregion
    }
}
