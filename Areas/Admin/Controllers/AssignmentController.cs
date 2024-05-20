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
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<QanShopUser> _userManager;
        private readonly QanShopUserContext _userContext;

        public AssignmentController(RoleManager<IdentityRole> roleManager,
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
        public async Task<IActionResult> CreateRole(IdentityRole role) 
        {
            role.NormalizedName = role.Name.ToUpper();
            var check = await _roleManager.FindByNameAsync(role.NormalizedName);
            if (check != null) return BadRequest("This Role already exist");
            var result = await _roleManager.CreateAsync(role);
            return Ok(result);
        }

        [Route("roles")]
        [HttpPut]
        public async Task<IActionResult> UpdateRole(Guid id, IdentityRole role) 
        {
            role.Id = id.ToString();
            var result = await _roleManager.UpdateAsync(role);
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
    }
}
