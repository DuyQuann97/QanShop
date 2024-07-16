using System.ComponentModel.DataAnnotations;

namespace QanShop.Models.Domains
{
    public class Store
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int PhoneNumber { get; set; }

        public DateTime Time { get; set; }

        public string? Note { get; set; }
    }
}
