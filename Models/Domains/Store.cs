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

        public TimeOnly TimeOpen { get; set; }
        public TimeOnly TimeClose { get; set; }

        public string? Note { get; set; }
    }
}
