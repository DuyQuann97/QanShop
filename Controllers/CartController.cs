using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Common;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Controllers
{
    [Route("cart")]
    public class CartController : Controller
    {
        
        private readonly QanShopDBContext _dbContext;

        public CartController(QanShopDBContext dBContext)
        {
            _dbContext = dBContext;
        }
        [Route("")]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var items = await _dbContext.carts.Include(x => x.Product).ToListAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(Guid productId, int quantity)
        {
            try
            {
                var item = await _dbContext.carts.FirstOrDefaultAsync(x => x.ProductId == productId);  
                if (item != null)
                {
                    item.Quantity++;
                    _dbContext.carts.Update(item);
                } else 
                {
                    item = new Cart
                    {
                        Id = Guid.NewGuid(),
                        ProductId = productId,
                        Quantity = quantity
                    };
                    await _dbContext.carts.AddAsync(item);
                }
                await _dbContext.SaveChangesAsync();
                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _dbContext.carts.FirstOrDefaultAsync(x => x.Id == id);
                if (result == null) return NotFound(id);
                _dbContext.carts.Remove(result);    
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

    }
}
