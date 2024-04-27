using Microsoft.AspNetCore.Mvc;
using QanShop.Models.Domains;

namespace QanShop.Views.Shared.Components.ItemCard
{
    public class ItemCardViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(Product product)
        {
            //logic

            return View(product);
        }
    }
}
