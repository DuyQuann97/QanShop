using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QanShop.Data;
using QanShop.Models.Domains;

namespace QanShop.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("Store")]
    [Authorize]
    public class StoreController : Controller
    {
        private readonly QanShopDBContext _dbContext;
        public static List<Store> stores = new List<Store>();

        public StoreController(QanShopDBContext dBContext)
        {
            _dbContext = dBContext;
        }
        [Route("")]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        //Get all store
        [Route("all")]
        [HttpGet]
        public async Task<IActionResult> GetAllAsync() 
        {
            var stores = await _dbContext.stores.ToListAsync();
            return Ok(stores);
        }

        [Route("byid/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _dbContext.stores.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        //Create new store
        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync(Store store) 
        {
            Store newStore = new Store() 
            {
                Id = Guid.NewGuid(),
                Name = store.Name,
                Address = store.Address,
                PhoneNumber = store.PhoneNumber,
                TimeOpen = store.TimeOpen,
                TimeClose = store.TimeClose,
                Note = store.Note,
            };

            _dbContext.stores.Add(newStore);
            await _dbContext.SaveChangesAsync();
            return Ok(newStore);
        }

        //Update store
        [Route("edit")]
        [HttpPut]
        public async Task<IActionResult> EditAsync(Store store) 
        {
            var result = await _dbContext.stores.FirstOrDefaultAsync(x => x.Id == store.Id);
            if (result == null)
            {
                return NotFound();
            }

            result.Name = store.Name;
            result.Address = store.Address;
            result.PhoneNumber = store.PhoneNumber;
            result.TimeOpen = store.TimeOpen;
            result.TimeClose = store.TimeClose;
            result.Note = store.Note;

            _dbContext.stores.Update(result);
            await _dbContext.SaveChangesAsync();
            return Ok(result);

        }

        //Delete Store
        [Route("delete")]
        [HttpDelete]
        public async Task<IActionResult> Delete(List<Guid> ids) 
        {
            foreach (var id in ids)
            {
                var result = await _dbContext.stores.FirstOrDefaultAsync(x => x.Id == id);
                if (result == null)
                {
                    continue;
                }
                _dbContext.stores.Remove(result);
            }

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

    }
}
