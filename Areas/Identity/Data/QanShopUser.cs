using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace QanShop.Areas.Identity.Data;

// Add profile data for application users by adding properties to the QanShopUser class
public class QanShopUser : IdentityUser
{
    [MaxLength(100)]
    public string? FullName { set; get; }

    [MaxLength(255)]
    public string? Address { set; get; }
}

