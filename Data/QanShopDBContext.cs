using Microsoft.EntityFrameworkCore;
using QanShop.Models.Domains;

namespace QanShop.Data
{
    public class QanShopDBContext : DbContext
    {
        public QanShopDBContext(DbContextOptions<QanShopDBContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Cart> carts { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Product> products { get; set; }
       

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("name=Default");
        
    }
}
