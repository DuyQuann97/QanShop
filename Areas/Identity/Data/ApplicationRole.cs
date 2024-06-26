using Microsoft.AspNetCore.Identity;

namespace QanShop.Areas.Identity.Data
{
    public class ApplicationRole: IdentityRole
    {
        public string? Description { get; set; }
        public bool IsActive { get; set; }
    }
}
