using System.ComponentModel.DataAnnotations;

namespace QanShop.Models.Domains
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl {  get; set; }
        public int price { get; set; }
        public Guid CategoryId { get; set; }
        public bool IsActive { get; set; } = true; 

        //Navigation Properties
        public required Category Category { get; set; }
    }
}
